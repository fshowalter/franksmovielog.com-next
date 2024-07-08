import { promises as fs } from "node:fs";
import { z } from "zod";
import { join } from "path";

const allTimeStatsFile = join(
  process.cwd(),
  "content",
  "data",
  "all-time-stats.json",
);

const Distribution = z.object({
  name: z.string(),
  count: z.number(),
});

const GradeDistribution = Distribution.extend({
  sortValue: z.number(),
});

const MostWatchedTitle = z.object({
  title: z.string(),
  imdbId: z.string(),
  year: z.string(),
  count: z.number(),
  slug: z.nullable(z.string()),
});

const MostWatchedPersonViewing = z.object({
  sequence: z.number(),
  date: z.string(),
  slug: z.nullable(z.string()),
  title: z.string(),
  medium: z.nullable(z.string()),
  venue: z.nullable(z.string()),
  year: z.string(),
});

const MostWatchedPerson = z.object({
  name: z.string(),
  count: z.number(),
  slug: z.nullable(z.string()),
  viewings: z.array(MostWatchedPersonViewing),
});

const JsonAllTimeStatsSchema = z.object({
  viewingCount: z.number(),
  titleCount: z.number(),
  reviewCount: z.number(),
  watchlistTitlesReviewedCount: z.number(),
  gradeDistribution: z.array(GradeDistribution),
  mediaDistribution: z.array(Distribution),
  decadeDistribution: z.array(Distribution),
  mostWatchedTitles: z.array(MostWatchedTitle),
  mostWatchedDirectors: z.array(MostWatchedPerson),
  mostWatchedPerformers: z.array(MostWatchedPerson),
  mostWatchedWriters: z.array(MostWatchedPerson),
});

export type JsonAllTimeStats = z.infer<typeof JsonAllTimeStatsSchema>;

export async function getAllTimeStatsJsonData(): Promise<JsonAllTimeStats> {
  const json = await fs.readFile(allTimeStatsFile, "utf8");
  const data = JSON.parse(json) as any[];

  return JsonAllTimeStatsSchema.parse(data);
}
