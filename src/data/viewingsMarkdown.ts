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

const viewingsData = JSON.parse(
  fs.readFileSync(process.cwd() + "/content/data/viewings.json", "utf8"),
) as { sequence: number; slug: string }[];

const reviewedTitlesData = JSON.parse(
  fs.readFileSync(process.cwd() + "/content/data/reviewed-titles.json", "utf8"),
) as { imdbId: string; slug: string }[];

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
  slug: string;
  venue: string | null;
  venueNotes: string | null;
  medium: string | null;
  mediumNotes: string | null;
  viewingNotes: string | null;
}

const DataSchema = z.object({
  date: z.date(),
  sequence: z.number(),
  slug: z.string(),
  venue: z.nullable(z.string()),
  medium: z.nullable(z.string()),
  venueNotes: z.nullable(z.string()),
  mediumNotes: z.nullable(z.string()),
});

const viewingsDirectory = join(process.cwd(), "content", "viewings");

export function getViewingsForSlug(slug: string): MarkdownViewing[] {
  const viewingMeta = viewingsData.filter((data) => {
    return data.slug === slug;
  });

  return viewingMeta.map(({ sequence, slug }) => {
    const fullPath = join(
      viewingsDirectory,
      `${sequence.toString().padStart(4, "0")}-${slug}.md`,
    );
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    const greyMatter = DataSchema.parse(data);

    return {
      sequence: sequence,
      date: greyMatter.date,
      slug: slug,
      venue: greyMatter.venue,
      venueNotes: getHtmlAsSpan(greyMatter.venueNotes),
      medium: greyMatter.medium,
      mediumNotes: getHtmlAsSpan(greyMatter.mediumNotes),
      viewingNotes: getHtml(content),
    };
  });
}
