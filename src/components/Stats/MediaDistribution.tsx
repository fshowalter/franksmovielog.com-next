import { BarGradient } from "@/components/BarGradient";
import { StatHeading } from "@/components/StatHeading";
import {
  Table,
  TableDataCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@/components/StatsTable";

export function MediaDistribution({
  distributions,
}: {
  distributions: readonly IMediaDistribution[];
}): JSX.Element | null {
  const maxBar = distributions.reduce((acc, distribution) => {
    const value = distribution.count;
    return acc > value ? acc : value;
  }, 0);

  return (
    <section>
      <StatHeading>Top Media</StatHeading>
      <Table>
        <TableHead>
          <tr>
            <TableHeaderCell align="left">Name</TableHeaderCell>
            <th>&nbsp;</th>
            <TableHeaderCell align="right">Viewings</TableHeaderCell>
          </tr>
        </TableHead>
        <tbody>
          {distributions.map((distribution) => {
            return (
              <TableRow key={distribution.name}>
                <TableDataCell align="left">{distribution.name}</TableDataCell>
                <TableDataCell hideOnSmallScreens align="fill">
                  <BarGradient value={distribution.count} maxValue={maxBar} />
                </TableDataCell>
                <TableDataCell align="right">
                  {distribution.count}
                </TableDataCell>
              </TableRow>
            );
          })}
        </tbody>
      </Table>
    </section>
  );
}

export interface IMediaDistribution {
  name: string;
  count: number;
}
