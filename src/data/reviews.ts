import fs from "fs";
import matter from "gray-matter";
import { join } from "path";
import { z } from "zod";
import { remark } from "remark";
import { Root, RootContent } from "mdast";
import rehypeRaw from "rehype-raw";
import remarkParse from "remark-parse";
import { unified } from "unified";
import remarkRehype from "remark-rehype";
import { toHast } from "mdast-util-to-hast";
import { toHtml } from "hast-util-to-html";

export default async function markdownToHtml(markdown: string) {
  const result = await remark().use(rehypeRaw).parse(markdown);

  return result.toString();
}

function getExcerptAst(tree: Root, excerptSeparator: string) {
  const excerptSeparatorIndex = tree.children.findIndex((node: RootContent) => {
    return node.type === "html" && node.value.trim() === excerptSeparator;
  });

  if (excerptSeparatorIndex !== -1) {
    tree.children.splice(excerptSeparatorIndex);
    return tree;
  }

  return tree;
}

function getExcerptHtml(content: string, excerptSeparator: string) {
  const ast = unified()
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .parse(content);

  const excerptAST = getExcerptAst(ast, excerptSeparator);

  const excerptHast = toHast(excerptAST);

  return toHtml(excerptHast);
}

interface Review {
  slug: string;
  title: string;
  date: Date;
  grade: string;
  imdbId: string;
  excerpt: string;
  content: string;
}

const DataSchema = z.object({
  title: z.string(),
  date: z.date(),
  grade: z.string(),
  imdb_id: z.string(),
});

const reviewsDirectory = join(process.cwd(), "content", "reviews");

export function getReviewBySlug(slug: string): Review {
  const fullPath = join(reviewsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const greyMatter = DataSchema.parse(data);

  return {
    slug: slug,
    title: greyMatter.title,
    date: greyMatter.date,
    grade: greyMatter.grade,
    imdbId: greyMatter.imdb_id,
    excerpt: getExcerptHtml(content, "<!-- end -->"),
    content,
  };
}
