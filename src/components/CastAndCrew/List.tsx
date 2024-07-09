import { CreditedAs } from "@/components/CreditedAs";
import Image from "next/image";
import Link from "next/link";
import { ListItem } from "@/components/ListItem";
import { ListItemCounts } from "@/components/ListItemCounts";
import { ListInfo } from "@/components/ListWithFiltersLayout/ListInfo";
import type { CastAndCrewMember } from "./CastAndCrew";

export function List({
  members,
  totalCount,
  visibleCount,
}: {
  members: readonly CastAndCrewMember[];
  totalCount: number;
  visibleCount: number;
}): JSX.Element {
  return (
    <>
      <ListInfo totalCount={totalCount} visibleCount={visibleCount} />
      <ol data-testid="list">
        {members.map((member) => {
          return <MemberListItem key={member.name} member={member} />;
        })}
      </ol>
      <div className="spacer-y-8" />
    </>
  );
}

function MemberListItem({
  member,
}: {
  member: CastAndCrewMember;
}): JSX.Element {
  return (
    <ListItem className="items-center">
      <Avatar member={member} />
      <Name member={member} />
      <ListItemCounts current={member.reviewCount} total={member.totalCount} />
    </ListItem>
  );
}

function Avatar({ member }: { member: CastAndCrewMember }) {
  if (member.avatar) {
    return (
      <Link
        href={`/cast-and-crew/${member.slug}/`}
        className="safari-border-radius-fix w-16 max-w-16 overflow-hidden rounded-[50%] shadow-all"
      >
        <Image
          src={member.avatar}
          alt={`An image of ${member.name}`}
          width={64}
          height={64}
        />
      </Link>
    );
  }

  return (
    <div className="w-16 max-w-16">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        fill="var(--bg-stripe)"
        width="100%"
      >
        <path
          clipRule="evenodd"
          d="M16 8A8 8 0 110 8a8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zM8 9a5 5 0 00-4.546 2.916A5.986 5.986 0 008 14a5.986 5.986 0 004.546-2.084A5 5 0 008 9z"
          fillRule="evenodd"
        />
      </svg>
    </div>
  );
}

function Name({ member }: { member: CastAndCrewMember }) {
  return (
    <div>
      <Link href={`/cast-and-crew/${member.slug}/`} className="text-md">
        <div className="leading-normal">{member.name}</div>
      </Link>
      <div className="spacer-y-1" />
      <CreditedAs creditedAs={member.creditedAs} />
    </div>
  );
}
