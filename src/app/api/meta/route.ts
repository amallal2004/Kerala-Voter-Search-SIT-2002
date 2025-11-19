import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';
import { fmlToUnicode } from '@/lib/converter';

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
    const { districtId } = body;

    if (!districtId) {
        return NextResponse.json({ error: 'District ID is required' }, { status: 400 });
    }

    try {
        const response = await fetch(`${BASE_URL}votersearchnew/show_lac/?id=${districtId}`);
        const data = await response.json();

        // Parse HTML to extract options
        const $ = cheerio.load(data.selectHtml);
        const lacs: { id: string, name: string }[] = [];

        $('.dropdown-options div').each((_, el) => {
            const id = $(el).attr('data-value');
            const rawName = $(el).text().trim();
            if (id && rawName) {
                const name = fmlToUnicode(rawName);
                lacs.push({ id, name });
            }
        });

        return NextResponse.json(lacs);
    } catch (error) {
        console.error('Error fetching LACs:', error);
        return NextResponse.json({ error: 'Failed to fetch LACs' }, { status: 500 });
    }
}
