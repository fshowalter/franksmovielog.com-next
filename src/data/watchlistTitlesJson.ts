import { promises as fs } from "node:fs";
import { z } from "zod";
import { join } from "path";

const watchlistTitlesFile = join(
  process.cwd(),
  "content",
  "data",
  "watchlist-titles.json",
);

const JsonWatchlistTitlesSchema = z.object({
  imdbId: z.string(),
  title: z.string(),
  year: z.string(),
  sortTitle: z.string(),
  releaseSequence: z.string(),
  viewed: z.boolean(),
  directorNames: z.array(z.string()),
  performerNames: z.array(z.string()),
  writerNames: z.array(z.string()),
  collectionNames: z.array(z.string()),
});

export type JsonWatchlistTitles = z.infer<typeof JsonWatchlistTitlesSchema>;

export async function getWatchlistTitlesJsonData(): Promise<
  JsonWatchlistTitles[]
> {
  const json = await fs.readFile(watchlistTitlesFile, "utf8");
  const data = JSON.parse(json) as any[];

  return data.map((title) => {
    return JsonWatchlistTitlesSchema.parse(title);
  });
}
