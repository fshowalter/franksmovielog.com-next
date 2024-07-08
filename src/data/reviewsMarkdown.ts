import fs from "fs";
import matter from "gray-matter";
import { join } from "path";
import { z } from "zod";
import type { Root, RootContent, Node, Parent } from "mdast";
import rehypeRaw from "rehype-raw";
import type { Processor } from "unified";
import remarkRehype from "remark-rehype";
import remarkGfm from "remark-gfm";
import smartypants from "remark-smartypants";
import { visit, SKIP, CONTINUE } from "unist-util-visit";
import rehypeStringify from "rehype-stringify";
import { remark } from "remark";

const reviewedTitlesData = JSON.parse(
  fs.readFileSync(process.cwd() + "/content/data/reviewed-titles.json", "utf8"),
) as { imdbId: string; slug: string }[];

function removeFootnotes() {
  return (tree: Node) => {
    visit(
      tree,
      "footnoteReference",
      function (
        node: Node,
        index: number | undefined,
        parent: Parent | undefined,
      ) {
        if (parent && index && node.type === "footnoteReference") {
          parent.children.splice(index, 1);
          return [SKIP, index];
        }
        return CONTINUE;
      },
    );

    return tree;
  };
}

function trimToExcerpt({ separator }: { separator: string }) {
  return (tree: Root) => {
    const separatorIndex = tree.children.findIndex((node: RootContent) => {
      return node.type === "html" && node.value.trim() === separator;
    });

    if (separatorIndex !== -1) {
      tree.children.splice(separatorIndex);
    }
  };
}

function getMastProcessor() {
  return remark().use(remarkGfm).use(removeFootnotes).use(smartypants);
}

function processorToHtml(
  processor: Processor<Root, Node, Node, Root, string>,
  content: string,
) {
  return processor
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeStringify)
    .processSync(content)
    .toString();
}

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

function getExcerptHtml(
  content: string,
  excerptSeparator: string,
  slug: string,
) {
  let excerptHtml = processorToHtml(
    getMastProcessor().use(trimToExcerpt, { separator: excerptSeparator }),
    content,
  );

  const hasExcerptBreak = content.includes(excerptSeparator);

  if (hasExcerptBreak) {
    excerptHtml = excerptHtml.replace(/\n+$/, "");
    excerptHtml = excerptHtml.replace(
      /<\/p>$/,
      ` <a data-continue-reading href="/reviews/${slug}/">Continue reading...</a></p>`,
    );
  }

  return linkReviewedMovies(excerptHtml, reviewedTitlesData);
}

function getHtml(content: string) {
  const html = remark()
    .use(remarkGfm)
    .use(removeFootnotes)
    .use(smartypants)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeStringify)
    .processSync(content)
    .toString();

  return linkReviewedMovies(html, reviewedTitlesData);
}

interface MarkdownReview {
  slug: string;
  date: Date;
  grade: string;
  imdbId: string;
  excerpt: string;
  content: string;
}

const DataSchema = z.object({
  date: z.date(),
  grade: z.string(),
  imdb_id: z.string(),
});

const reviewsDirectory = join(process.cwd(), "content", "reviews");

export function getReviewBySlug(slug: string): MarkdownReview {
  const fullPath = join(reviewsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const greyMatter = DataSchema.parse(data);

  return {
    slug: slug,
    date: greyMatter.date,
    grade: greyMatter.grade,
    imdbId: greyMatter.imdb_id,
    excerpt: getExcerptHtml(content, "<!-- end -->", slug),
    content: getHtml(content),
  };
}
