import fs from "fs";
import matter from "gray-matter";
import { join } from "path";
import { z } from "zod";
import { Root, RootContent, Node, Parent } from "mdast";
import rehypeRaw from "rehype-raw";
import remarkParse from "remark-parse";
import { unified } from "unified";
import remarkRehype from "remark-rehype";
import { toHast } from "mdast-util-to-hast";
import { toHtml } from "hast-util-to-html";
import remarkGfm from "remark-gfm";
import { visit, SKIP, CONTINUE } from "unist-util-visit";

export function removeFootnotes<T extends Node>(node: T) {
  visit(
    node,
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

  return node;
}

function getExcerptSeparatorIndex(tree: Root, excerptSeparator: string) {
  return tree.children.findIndex((node: RootContent) => {
    return node.type === "html" && node.value.trim() === excerptSeparator;
  });
}

function getExcerptHtml(
  content: string,
  excerptSeparator: string,
  slug: string,
) {
  let ast = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .parse(content);

  const excerptSeparatorIndex = getExcerptSeparatorIndex(ast, excerptSeparator);

  if (excerptSeparatorIndex !== -1) {
    ast.children.splice(excerptSeparatorIndex);
  }

  ast = removeFootnotes(ast);

  const excerptHast = toHast(ast);

  let excerptHtml = toHtml(excerptHast);

  if (excerptSeparatorIndex !== -1) {
    excerptHtml = excerptHtml.replace(/\n+$/, "");
    excerptHtml = excerptHtml.replace(
      /<\/p>$/,
      ` <a data-continue-reading href="/reviews/${slug}/">Continue reading...</a></p>`,
    );
  }

  return excerptHtml;
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
    content,
  };
}
