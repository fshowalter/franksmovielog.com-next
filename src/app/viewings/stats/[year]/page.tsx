import { YearStats } from "@/components/YearStats";
import { getStatsForYear, getStatYears } from "@/components/YearStats/data";
import React from "react";

export async function generateStaticParams() {
  const years = getStatYears();

  return years.map((year) => ({
    year,
  }));
}

export default function ReviewPage({ params }: { params: { year: string } }) {
  const { stats, statYears } = getStatsForYear(params.year);

  return <YearStats statYears={statYears} stats={stats} year={params.year} />;
}
