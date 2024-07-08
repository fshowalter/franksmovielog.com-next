import fs from "fs";
import matter from "gray-matter";
import { join } from "path";
import { z } from "zod";
import rehypeRaw from "rehype-raw";
import remarkRehype from "remark-rehype";
import remarkGfm from "remark-gfm";
import smartypants from "remark-smartypants";
import rehypeStringify from "rehype-stringify";
import { remark } from "remark";

function getHtml(content: string) {
  return remark()
    .use(remarkGfm)
    .use(smartypants)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeStringify)
    .processSync(content)
    .toString();
}

interface MarkdownPage {
  slug: string;
  title: string;
  content: string;
}

const DataSchema = z.object({
  title: z.string(),
});

const pagesDirectory = join(process.cwd(), "content", "pages");

export function getPageBySlug(slug: string): MarkdownPage {
  const fullPath = join(pagesDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const greyMatter = DataSchema.parse(data);

  return {
    slug: slug,
    title: greyMatter.title,
    content: getHtml(content),
  };
}
