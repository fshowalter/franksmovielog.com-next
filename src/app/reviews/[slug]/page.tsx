import { Review } from "@/components/Review";
import getComponentData from "@/components/Review/data";
import reviewedTitlesJson from "@/data/reviewedTitlesJson";
import React from "react";

export async function generateStaticParams() {
  const json = await reviewedTitlesJson();

  return json.map((review) => ({
    slug: review.slug,
  }));
}

export default async function ReviewPage({
  params,
}: {
  params: { slug: string };
}) {
  const data = await getComponentData(params.slug);

  return <Review {...data} />;
}
