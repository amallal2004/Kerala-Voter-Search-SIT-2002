"use client";

import { useState } from 'react';
import SearchForm from '@/components/SearchForm';
import ResultsTable from '@/components/ResultsTable';
import { Search } from 'lucide-react';

export default function Home() {
    const [results, setResults] = useState<any[]>([]);
    const [hasSearched, setHasSearched] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = (data: any[]) => {
        setResults(data);
        setHasSearched(true);
    };

    return (
        <div className="flex flex-col items-center py-12 space-y-12">
            <div className="space-y-4 text-center">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                    Kerala Voter Search
                </h1>
                <p className="mx-auto max-w-[700px] text-slate-400 md:text-xl">
                    Search for voter details by District, LAC, and Name.
                </p>
            </div>

            <SearchForm onSearch={handleSearch} onLoading={setIsLoading} />

            {isLoading && (
                <div className="flex flex-col items-center space-y-4 animate-pulse">
                    <div className="w-12 h-12 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin"></div>
                    <p className="text-slate-400">Scraping data from Election Commission...</p>
                </div>
            )}

            {!isLoading && hasSearched && results.length > 0 && (
                <ResultsTable results={results} />
            )}

            {!isLoading && hasSearched && results.length === 0 && (
                <div className="text-slate-500 text-center p-8 border border-dashed border-slate-800 rounded-xl">
                    <Search className="w-12 h-12 mx-auto mb-4 opacity-20" />
                    <p>No results found.</p>
                </div>
            )}
        </div>
    );
}
