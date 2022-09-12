import type { Edge } from "../redux/trendingCollectionsSlice";

type TCprops = {
  trendingCollections: Array<Edge>;
};

const tableHeaders: Array<String> = ['Collection', 'Sales Floor', ' Sales', ' Average', 'Volume', 'MKT Cap']

function TrendingCollections(props: TCprops) {
  return (
    <div className="overflow-hidden border-b  dark:border-gray-80 border-gray-200 rounded-lg">
      <h1 className="text-center font-extrabold text-base py-6">Top 10 Trending Collections:</h1>
      <table className="table-auto border-2">
        <thead className="bg-elevation-2">
          <tr className="border-gray-80">
            {tableHeaders.map((header, index) => (
              <th key={index+header.trim()} className="px-6 py-2 text-left uppercase first:rounded-tl-lg last:rounded-tr-lg">
                <p className="text-xs text-primary-text">{header}</p>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-primary-border bg-elevation-1">
          {props.trendingCollections.map((edge, index) => (
            <tr key={edge.node.symbol+index} className="bg-elevation-1 transition-colors hover:bg-elevation-2/60 w-full">
              <td><p className="text-base text-primary-text px-2 py-2">{edge.node.name}</p></td>
              <td><p className="text-base text-primary-text px-2 py-2">{edge.node.stats.floor}</p></td>
              <td><p className="text-base text-primary-text px-2 py-2">{edge.node.stats.totalSales}</p></td>
              <td><p className="text-base text-primary-text px-2 py-2">{edge.node.stats.average}</p></td>
              <td><p className="text-base text-primary-text px-2 py-2">{edge.node.stats.volume}</p></td>
              <td><p className="text-base text-primary-text px-2 py-2">{edge.node.stats.ceiling}</p></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TrendingCollections;
