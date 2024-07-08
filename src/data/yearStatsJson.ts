import fs from "fs";
import { z } from "zod";
import { join } from "path";

const yearStatsDir = join(process.cwd(), "content", "data", "year-stats");

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

const JsonYearStatsSchema = z.object({
  year: z.string(),
  newTitleCount: z.number(),
  viewingCount: z.number(),
  titleCount: z.number(),
  mediaDistribution: z.array(Distribution),
  decadeDistribution: z.array(Distribution),
  mostWatchedTitles: z.array(MostWatchedTitle),
  mostWatchedDirectors: z.array(MostWatchedPerson),
  mostWatchedPerformers: z.array(MostWatchedPerson),
  mostWatchedWriters: z.array(MostWatchedPerson),
});

export type JsonYearStats = z.infer<typeof JsonYearStatsSchema>;

const jsonYearStats = fs
  .readdirSync(yearStatsDir, { withFileTypes: true })
  .filter((item) => !item.isDirectory() && item.name.endsWith(".json"))
  .map((item) => {
    const json = fs.readFileSync(`${yearStatsDir}/${item.name}`, "utf8");
    const data = JSON.parse(json) as any[];

    return JsonYearStatsSchema.parse(data);
  });

export function getJsonStatYears(): string[] {
  return jsonYearStats.map((stats) => stats.year);
}

export function getJsonYearStats(year: string): JsonYearStats {
  const stats = jsonYearStats.find((stats) => stats.year === year);

  if (!stats) {
    throw new Error(`Stats not found for year: ${year}`);
  }

  return stats;
}
