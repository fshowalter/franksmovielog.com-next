import { promises as fs } from "node:fs";
import { z } from "zod";

const JsonViewingSchema = z.object({
  sequence: z.number(),
  title: z.string(),
  viewingYear: z.string(),
  viewingDate: z.string(),
  sortTitle: z.string(),
  genres: z.array(z.string()),
  medium: z.nullable(z.string()),
  venue: z.nullable(z.string()),
  slug: z.nullable(z.string()),
  year: z.string(),
  releaseSequence: z.string(),
});

export type JsonViewing = z.infer<typeof JsonViewingSchema>;

export async function getViewingsJsonData(): Promise<JsonViewing[]> {
  const json = await fs.readFile(
    process.cwd() + "/content/data/viewings.json",
    "utf8",
  );
  const data = JSON.parse(json) as any[];

  return data.map((item) => {
    return JsonViewingSchema.parse(item);
  });
}
