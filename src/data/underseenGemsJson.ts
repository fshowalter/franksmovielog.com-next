import { promises as fs } from "node:fs";
import { z } from "zod";
import { join } from "path";

const underseenGemsFile = join(
  process.cwd(),
  "content",
  "data",
  "underseen-gems.json",
);

const UnderseenGemsJsonSchema = z.object({
  imdbId: z.string(),
  title: z.string(),
  year: z.string(),
  slug: z.string(),
  grade: z.string(),
  genres: z.array(z.string()),
  sortTitle: z.string(),
  gradeValue: z.number(),
  releaseSequence: z.string(),
});

export type UnderseenGemsJson = z.infer<typeof UnderseenGemsJsonSchema>;

export async function getUnderseenGemsJson(): Promise<UnderseenGemsJson[]> {
  const json = await fs.readFile(underseenGemsFile, "utf8");
  const data = JSON.parse(json) as any[];

  return data.map((item) => {
    return UnderseenGemsJsonSchema.parse(item);
  });
}
