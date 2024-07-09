import { PageTitle } from "@/components/PageTitle";
import { twMerge } from "tailwind-merge";

export interface HeaderData {
  title: string;
  originalTitle: string | null;
  year: string;
  countries: string[];
  runtimeMinutes: number;
}

export function Header({
  data,
  className,
}: {
  data: HeaderData;
  className?: string;
}) {
  return (
    <header className={twMerge("flex flex-col gap-y-4", className)}>
      <PageTitle>{data.title}</PageTitle>
      <OriginalTitle originalTitle={data.originalTitle} />
      <Meta data={data} />
    </header>
  );
}

function OriginalTitle({ originalTitle }: { originalTitle: string | null }) {
  if (!originalTitle) {
    return null;
  }

  return <div className="text-muted">({originalTitle})</div>;
}

function Meta({ data }: { data: HeaderData }) {
  return (
    <div className="text-muted">
      {data.year} <span>|</span>{" "}
      {data.countries.reduce<JSX.Element | null>((acc, country) => {
        if (acc === null) {
          return <>{country}</>;
        }

        return (
          <>
            {acc}
            <span>&ndash;</span>
            {country}
          </>
        );
      }, null)}{" "}
      <span>|</span> {data.runtimeMinutes}
      &#x02009;min{" "}
      <span>
        <span>|</span> <a href="#credits">More...</a>
      </span>
    </div>
  );
}
