export function ListItemCounts({
  current,
  total,
}: {
  current: number;
  total: number;
}): JSX.Element {
  if (current === total) {
    return <div className="ml-auto">{total}</div>;
  }

  return (
    <div className="ml-auto">
      {current} / {total}
    </div>
  );
}
