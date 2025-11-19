"use client";

import { useState, useEffect } from 'react';
import { Search, Loader2 } from 'lucide-react';

interface District {
    id: string;
    name: string;
}

interface Lac {
    id: string;
    name: string;
}

interface SearchFormProps {
    onSearch: (results: any[]) => void;
    onLoading: (isLoading: boolean) => void;
}

export default function SearchForm({ onSearch, onLoading }: SearchFormProps) {
    const [districts, setDistricts] = useState<District[]>([]);
    const [lacs, setLacs] = useState<Lac[]>([]);
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedLac, setSelectedLac] = useState('');
    const [name, setName] = useState('');
    const [houseName, setHouseName] = useState('');
    const [isLoadingDistricts, setIsLoadingDistricts] = useState(true);
    const [isLoadingLacs, setIsLoadingLacs] = useState(false);

    useEffect(() => {
        async function fetchDistricts() {
            try {
                const res = await fetch('/api/meta');
                const data = await res.json();
                setDistricts(data);
            } catch (e) {
                console.error("Failed to fetch districts", e);
            } finally {
                setIsLoadingDistricts(false);
            }
        }
        fetchDistricts();
    }, []);

    const handleDistrictChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const districtId = e.target.value;
        setSelectedDistrict(districtId);
        setSelectedLac('');
        setLacs([]);

        if (districtId) {
            setIsLoadingLacs(true);
            try {
                const res = await fetch('/api/meta', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ districtId })
                });
                const data = await res.json();
                setLacs(data);
            } catch (e) {
                console.error("Failed to fetch LACs", e);
            } finally {
                setIsLoadingLacs(false);
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        onLoading(true);
        try {
            const res = await fetch('/api/search', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    districtId: selectedDistrict,
                    lacId: selectedLac,
                    name,
                    houseName
                })
            });
            const data = await res.json();
            if (data.results) {
                onSearch(data.results);
            } else {
                onSearch([]);
                alert("No results found or error occurred.");
            }
        } catch (e) {
            console.error("Search failed", e);
            alert("Search failed. Please try again.");
        } finally {
            onLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-4xl p-6 rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400">District</label>
                    <select
                        value={selectedDistrict}
                        onChange={handleDistrictChange}
                        className="w-full p-3 rounded-lg bg-slate-950 border border-slate-800 text-slate-100 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                        required
                    >
                        <option value="">Select District</option>
                        {districts.map(d => (
                            <option key={d.id} value={d.id}>{d.name}</option>
                        ))}
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400">LAC</label>
                    <div className="relative">
                        <select
                            value={selectedLac}
                            onChange={(e) => setSelectedLac(e.target.value)}
                            className="w-full p-3 rounded-lg bg-slate-950 border border-slate-800 text-slate-100 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all disabled:opacity-50"
                            required
                            disabled={!selectedDistrict || isLoadingLacs}
                        >
                            <option value="">Select LAC</option>
                            {lacs.map(l => (
                                <option key={l.id} value={l.id}>{l.name}</option>
                            ))}
                        </select>
                        {isLoadingLacs && (
                            <div className="absolute right-3 top-3">
                                <Loader2 className="w-5 h-5 animate-spin text-emerald-500" />
                            </div>
                        )}
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400">Voter Name (Malayalam)</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. കുമാർ"
                        className="w-full p-3 rounded-lg bg-slate-950 border border-slate-800 text-slate-100 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all placeholder:text-slate-600"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400">House Name (Malayalam)</label>
                    <input
                        type="text"
                        value={houseName}
                        onChange={(e) => setHouseName(e.target.value)}
                        placeholder="e.g. ഹൗസ്"
                        className="w-full p-3 rounded-lg bg-slate-950 border border-slate-800 text-slate-100 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all placeholder:text-slate-600"
                    />
                </div>
            </div>

            <div className="flex justify-end pt-4">
                <button
                    type="submit"
                    className="flex items-center gap-2 px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg transition-all shadow-lg shadow-emerald-500/20"
                >
                    <Search className="w-5 h-5" />
                    Search Voters
                </button>
            </div>
        </form>
    );
}
