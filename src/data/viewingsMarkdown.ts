import fs from "fs";
import matter from "gray-matter";
import { join } from "path";
import { z } from "zod";
import type { Root as HastRoot } from "hast";
import rehypeRaw from "rehype-raw";
import remarkRehype from "remark-rehype";
import remarkGfm from "remark-gfm";
import smartypants from "remark-smartypants";
import rehypeStringify from "rehype-stringify";
import { remark } from "remark";

const reviewedTitlesData = JSON.parse(
  fs.readFileSync(process.cwd() + "/content/data/reviewed-titles.json", "utf8"),
) as { imdbId: string; slug: string }[];

const viewingsMarkdownDir = join(process.cwd(), "content", "viewings");

const DataSchema = z.object({
  imdbId: z.string(),
  date: z.date(),
  sequence: z.number(),
  venue: z.nullable(z.string()),
  medium: z.nullable(z.string()),
  venueNotes: z.nullable(z.string()),
  mediumNotes: z.nullable(z.string()),
});

const allViewingsMarkdown = fs
  .readdirSync(viewingsMarkdownDir, { withFileTypes: true })
  .filter((item) => !item.isDirectory() && item.name.endsWith(".md"))
  .map((item) => {
    const fileContents = fs.readFileSync(
      `${viewingsMarkdownDir}/${item.name}`,
      "utf8",
    );
    const { data, content } = matter(fileContents);

    const greyMatter = DataSchema.parse(data);

    return {
      sequence: greyMatter.sequence,
      date: greyMatter.date,
      venue: greyMatter.venue,
      imbdbId: greyMatter.imdbId,
      medium: greyMatter.medium,
      venueNotes: getHtmlAsSpan(greyMatter.venueNotes),
      mediumNotes: getHtmlAsSpan(greyMatter.mediumNotes),
      viewingNotes: getHtml(content),
    };
  });

function linkReviewedMovies(
  text: string,
  reviewedTitles: { imdbId: string; slug: string }[],
) {
  let result = text;

  const re = RegExp(/(<span data-imdb-id="(tt\d+)">)(.*?)(<\/span>)/, "g");

  const matches = [...text.matchAll(re)];

  for (const match of matches) {
    const reviewedMovie = reviewedTitles.find(
      (title) => title.imdbId === match[2],
    );

    if (!reviewedMovie) {
      result = result.replace(
        `<span data-imdb-id="${match[2]}">${match[3]}</span>`,
        match[3],
      );
    } else {
      result = result.replace(
        `<span data-imdb-id="${match[2]}">${match[3]}</span>`,
        `<a href="/reviews/${reviewedMovie.slug}/">${match[3]}</a>`,
      );
    }
  }

  return result;
}

function rootAsSpan() {
  return (tree: HastRoot) => {
    const firstChild = tree.children[0];

    if (firstChild && firstChild.type === "element") {
      firstChild.tagName = "span";
    }
  };
}

function getHtmlAsSpan(content: string | null) {
  if (!content) {
    return null;
  }

  const html = remark()
    .use(remarkGfm)
    .use(smartypants)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rootAsSpan)
    .use(rehypeStringify)
    .processSync(content)
    .toString();

  return linkReviewedMovies(html, reviewedTitlesData);
}

function getHtml(content: string | null) {
  if (!content) {
    return null;
  }

  const html = remark()
    .use(remarkGfm)
    .use(smartypants)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeStringify)
    .processSync(content)
    .toString();

  return linkReviewedMovies(html, reviewedTitlesData);
}

interface MarkdownViewing {
  sequence: number;
  date: Date;
  venue: string | null;
  venueNotes: string | null;
  medium: string | null;
  mediumNotes: string | null;
  viewingNotes: string | null;
}

export function getViewingsForImdbId(imdbId: string): MarkdownViewing[] {
  return allViewingsMarkdown.filter((item) => {
    return item.imbdbId === imdbId;
  });
}
