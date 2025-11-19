"use client";

interface ResultsTableProps {
    results: string[][];
}

export default function ResultsTable({ results }: ResultsTableProps) {
    if (!results || results.length === 0) return null;

    // Heuristic headers based on typical voter list structure
    // If the scraped table has different columns, this might be misaligned.
    // Ideally we scrape headers too.
    const headers = [
        "Sl No", "Name", "Relation Name", "Relation", "Age", "Sex", "House No", "House Name", "ID Card No"
    ];
    // Note: The actual columns might vary. I'll just render whatever columns come back.
    // If I have more data columns than headers, I'll add generic ones.

    return (
        <div className="w-full max-w-6xl overflow-hidden rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm shadow-2xl">
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-400">
                    <thead className="bg-slate-950 text-xs uppercase text-slate-200 font-bold tracking-wider">
                        <tr>
                            {results[0]?.map((_, i) => (
                                <th key={i} className="px-6 py-4 border-b border-slate-800">
                                    {headers[i] || `Col ${i + 1}`}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                        {results.map((row, rowIndex) => (
                            <tr key={rowIndex} className="hover:bg-slate-800/50 transition-colors">
                                {row.map((cell, cellIndex) => (
                                    <td key={cellIndex} className="px-6 py-4 whitespace-nowrap text-slate-300">
                                        {cell}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="p-4 border-t border-slate-800 bg-slate-950/50 text-xs text-slate-500 text-center">
                Showing {results.length} results
            </div>
        </div>
    );
}
