import reviewedTitlesJson from "@/data/reviewedTitlesJson";
import reviewsMarkdown from "@/data/reviewsMarkdown";
import { HomeProps } from "./Home";
import sharp from "sharp";
import { join } from "path";

async function generateBlurPlaceholder(slug: string) {
  const imageBase64Bytes = await sharp(
    join(process.cwd(), "public", "assets", "stills", `${slug}.png`),
  )
    .resize(20)
    .jpeg()
    .toBuffer();

  return `data:image/jpeg;base64,${imageBase64Bytes.toString("base64")}`;
}

function formatDate(reviewDate: Date) {
  return reviewDate.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

export default async function getComponentData(): Promise<HomeProps> {
  const json = await reviewedTitlesJson();
  const markdown = await reviewsMarkdown();
  json.sort((a, b) => b.sequence.localeCompare(a.sequence));

  const data = await Promise.all(
    json.slice(0, 10).map(async (title) => {
      const markdownReview = markdown.find(
        (review) => review.imdbId === title.imdbId,
      );

      if (!markdownReview) {
        throw new Error(
          `No markdown review found with imdbId"${title.imdbId} for title "${title.title}"`,
        );
      }

      const placeholder = await generateBlurPlaceholder(title.slug);

      const homePageItemData: HomeProps["data"][0] = {
        imdbId: title.imdbId,
        sequence: title.sequence,
        title: title.title,
        year: title.year,
        date: formatDate(markdownReview.date),
        slug: title.slug,
        grade: title.grade,
        principalCastNames: title.principalCastNames,
        directorNames: title.directorNames,
        reviewExcerpt: markdownReview.excerpt,
        placeholder,
      };

      return homePageItemData;
    }),
  );

  return {
    data,
  };
}
