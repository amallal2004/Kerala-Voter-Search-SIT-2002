import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';
import { fmlToUnicode } from '@/lib/converter';
import { fetchWithRetry } from '@/lib/fetcher';

const BASE_URL = 'https://www.ceo.kerala.gov.in/';

export async function GET() {
    // Return hardcoded districts
    const districts = [
        { id: "01", name: "Thiruvananthapuram" },
        { id: "02", name: "Kollam" },
        { id: "03", name: "Pathanamthitta" },
        { id: "04", name: "Alappuzha" },
        { id: "05", name: "Kottayam" },
        { id: "06", name: "Idukki" },
        { id: "07", name: "Ernakulam" },
        { id: "08", name: "Thrissur" },
        { id: "09", name: "Palakkad" },
        { id: "10", name: "Malappuram" },
        { id: "11", name: "Kozhikode" },
        { id: "12", name: "Wayanad" },
        { id: "13", name: "Kannur" },
        { id: "14", name: "Kasaragod" }
    ];
    return NextResponse.json(districts);
}

export async function POST(request: Request) {
    const body = await request.json();
    const { districtId, lacId } = body;

    if (!districtId && !lacId) {
        return NextResponse.json({ error: 'District ID or LAC ID is required' }, { status: 400 });
    }

    try {
        let url = '';
        if (lacId) {
            url = `${BASE_URL}votersearchnew/show_booth/?id=${lacId}`;
        } else {
            url = `${BASE_URL}votersearchnew/show_lac/?id=${districtId}`;
        }

        const response = await fetchWithRetry(url);
        const data = await response.json();

        // Parse HTML to extract options
        const $ = cheerio.load(data.selectHtml);
        const items: { id: string, name: string }[] = [];

        $('.dropdown-options div').each((_, el) => {
            const id = $(el).attr('data-value');
            const rawName = $(el).text().trim();
            if (id && rawName) {
                const name = fmlToUnicode(rawName);
                items.push({ id, name });
            }
        });

        return NextResponse.json(items);
    } catch (error) {
        console.error('Error fetching metadata:', error);
        return NextResponse.json({ error: 'Failed to fetch metadata' }, { status: 500 });
    }
}
