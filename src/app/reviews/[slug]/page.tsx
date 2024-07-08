import { Review, getReviewSlugs, getReview } from "@/components/Review";
import React from "react";

export async function generateStaticParams() {
  const slugs = await getReviewSlugs();

  return slugs.map((slug) => ({
    slug,
  }));
}

export default async function ReviewPage({
  params,
}: {
  params: { slug: string };
}) {
  const review = await getReview(params.slug);

  return <Review review={review} />;
}
