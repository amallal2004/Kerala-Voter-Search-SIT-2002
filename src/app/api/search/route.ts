import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';
import { unicodeToFml, fmlToUnicode } from '@/lib/converter';
import { fetchWithRetry } from '@/lib/fetcher';

const BASE_URL = 'https://www.ceo.kerala.gov.in/';

export async function POST(request: Request) {
    const body = await request.json();
    const { districtId, lacId, boothId, name, houseName } = body;

    if (!districtId || !lacId) {
        return NextResponse.json({ error: 'District and LAC are required' }, { status: 400 });
    }

    // Convert inputs to FML (ASCII)
    const searchNameAscii = name ? unicodeToFml(name) : '';
    const searchHouseNameAscii = houseName ? unicodeToFml(houseName) : '';

    const formData = new URLSearchParams();
    formData.append('district_id', districtId);
    formData.append('lac_id', lacId);
    if (boothId) {
        formData.append('booth_id', boothId);
    }
    formData.append('searchname', searchNameAscii);
    formData.append('searchhousename', searchHouseNameAscii);
    formData.append('frmsbt', '1');

    try {
        const response = await fetchWithRetry(`${BASE_URL}voter-search`, {
            method: 'POST',
            body: formData,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        const html = await response.text();
        const $ = cheerio.load(html);

        const results: any[] = [];

        // Parse card-based results
        $('.card-body').each((i, el) => {
            const header = $(el).prev('.card-header');
            const nameEl = header.find('.karthika-text');
            const name = nameEl.length > 0 ? fmlToUnicode(nameEl.text().trim()) : header.text().replace('Name :', '').trim();

            const row: any = { Name: name };

            // Parse fields in card-body
            $(el).find('strong').each((j, strong) => {
                const label = $(strong).text().trim().replace(':', '').replace('.', '');
                let value = '';

                let next = strong.nextSibling;
                while (next && (next.type !== 'tag' || (next as any).tagName !== 'strong') && (next.type !== 'tag' || (next as any).tagName !== 'br')) {
                    if (next.type === 'text') {
                        value += next.data;
                    } else if (next.type === 'tag') {
                        const $next = $(next);
                        if ($next.hasClass('karthika-text') || $next.hasClass('karthika-text-small')) {
                            value += fmlToUnicode($next.text());
                        } else {
                            value += $next.text();
                        }
                    }
                    next = next.nextSibling;
                }
                row[label] = value.trim();
            });

            // Map to fixed columns for ResultsTable
            // Headers: "Sl No", "Name", "Relation Name", "Relation", "Age", "Sex", "House No", "House Name", "ID Card No"

            // Parse "Related Person" -> "Name (Relation - Type)"
            let relationName = '';
            let relationType = '';
            if (row['Related Person']) {
                const match = row['Related Person'].match(/^(.*)\s*\(Relation\s*-\s*(.*)\)$/);
                if (match) {
                    relationName = match[1].trim();
                    relationType = match[2].trim();
                } else {
                    relationName = row['Related Person'];
                }
            }

            const mappedRow = [
                row['Part Serial No'] || '',
                row['Name'] || '',
                relationName,
                relationType,
                row['Age'] || '',
                row['Sex'] || '',
                row['House Number'] || '',
                row['House Name'] || '',
                row['ID Card Number'] || ''
            ];

            results.push(mappedRow);
        });

        return NextResponse.json({ results });
    } catch (error) {
        console.error('Error searching:', error);
        return NextResponse.json({ error: 'Search failed' }, { status: 500 });
    }
}
