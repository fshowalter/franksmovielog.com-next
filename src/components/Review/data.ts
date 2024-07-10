import reviewedTitlesJson from "@/data/reviewedTitlesJson";
import reviewsMarkdown from "@/data/reviewsMarkdown";
import viewingsMarkdown from "@/data/viewingsMarkdown";
import type { ReviewProps } from "./Review";
import { join } from "path";
import sharp from "sharp";
import { existsSync, mkdirSync } from "node:fs";

const dateFormat = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

const destBaseDir = join(process.cwd(), "public");

function formatDate(reviewDate: Date) {
  return dateFormat.format(reviewDate);
}

function buildImage(slug: string, width: number) {
  const quality = 80;

  const destSrcDir = join("/gen", `${width}`, `${quality}`);
  const destDir = join(destBaseDir, destSrcDir);

  if (!existsSync(destDir)) {
    mkdirSync(destDir, { recursive: true });
  }

  const imageFileName = `${slug}.avif`;

  return {
    width,
    quality,
    format: sharp.format.avif,
    fullPath: join(destDir, imageFileName),
    src: join(destSrcDir, imageFileName),
  };
}

async function createStillImages(slug: string) {
  const pipeline = sharp(
    join(process.cwd(), "content", "assets", "stills", `${slug}.png`),
  );

  const images = await Promise.all(
    [0.25, 0.5, 1, 2].map(async (width) => {
      const image = buildImage(slug, 960 * width);

      if (existsSync(image.fullPath)) {
        return image;
      }

      await pipeline
        .resize(image.width)
        .avif({ quality: image.quality })
        .toFile(image.fullPath);

      return image;
    }),
  );

  return images.map((image) => `${image.src} ${image.width}w`).join(`,\n`);
}

export default async function getComponentData(
  slug: string,
): Promise<ReviewProps> {
  const json = await reviewedTitlesJson();

  const jsonTitle = json.find((title) => {
    return title.slug === slug;
  });

  if (!jsonTitle) {
    throw new Error(`No reviewed title with slug: ${slug}`);
  }

  const markdown = await reviewsMarkdown();

  const markdownReview = markdown.find((review) => {
    return review.slug === slug;
  });

  if (!markdownReview) {
    throw new Error(`No markdown review with slug: ${slug}`);
  }

  const viewings = await viewingsMarkdown();

  const markdownViewings = viewings.filter((viewing) => {
    return viewing.imdbId === jsonTitle.imdbId;
  });

  if (markdownViewings.length === 0) {
    throw new Error(`No markdown viewings with imdbId: ${jsonTitle.imdbId}`);
  }

  const data: ReviewProps["data"] = {
    stillSrcSet: await createStillImages(slug),
    imdbId: jsonTitle.imdbId,
    title: jsonTitle.title,
    year: jsonTitle.year,
    slug: jsonTitle.slug,
    originalTitle: jsonTitle.originalTitle,
    countries: jsonTitle.countries,
    runtimeMinutes: jsonTitle.runtimeMinutes,
    directorNames: jsonTitle.directorNames,
    writerNames: jsonTitle.writerNames,
    principalCastNames: jsonTitle.principalCastNames,
    linkedHtml: markdownReview.content,
    frontmatter: {
      grade: markdownReview.grade,
      date: formatDate(markdownReview.date),
    },
    castAndCrew: jsonTitle.castAndCrew,
    collections: jsonTitle.collections,
    moreCastAndCrew: jsonTitle.moreCastAndCrew,
    moreReviews: jsonTitle.moreReviews,
    moreCollections: jsonTitle.moreCollections,
    viewings: markdownViewings
      .toSorted((a, b) => b.sequence - a.sequence)
      .map((viewing) => {
        return {
          date: formatDate(viewing.date),
          venue: viewing.venue,
          venueNotes: viewing.venueNotes,
          medium: viewing.medium,
          mediumNotes: viewing.mediumNotes,
          viewingNotes: viewing.viewingNotes,
          sequence: viewing.sequence,
        };
      }),
  };

  return { data };
}
