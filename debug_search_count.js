
const cheerio = require('cheerio');

const mapTable = {
    "ം": "w",
    "ഃ": "x",
    "അ": "A",
    "ആ": "B",
    "ഇ": "C",
    "ഈ": "Cu",
    "ഉ": "D",
    "ഊ": "Du",
    "ഋ": "E",
    "ഌ": "p",
    "എ": "F",
    "ഏ": "G",
    "ഐ": "sF",
    "ഒ": "H",
    "ഓ": "Hm",
    "ഔ": "Hu",
    "ക": "I",
    "ഖ": "J",
    "ഗ": "K",
    "ഘ": "L",
    "ങ": "M",
    "ച": "N",
    "ഛ": "O",
    "ജ": "P",
    "ഝ": "Q",
    "ഞ": "R",
    "ട": "S",
    "ഠ": "T",
    "ഡ": "U",
    "ഢ": "V",
    "ണ": "W",
    "ത": "X",
    "ഥ": "Y",
    "ദ": "Z",
    "ധ": "[",
    "ന": "\\",
    "പ": "]",
    "ഫ": "^",
    "ബ": "_",
    "ഭ": "`",
    "മ": "a",
    "യ": "b",
    "ര": "c",
    "റ": "d",
    "ല": "e",
    "ള": "f",
    "ഴ": "g",
    "വ": "h",
    "ശ": "i",
    "ഷ": "j",
    "സ": "k",
    "ഹ": "l",
    "ാ": "m",
    "ി": "n",
    "ീ": "o",
    "ു": "p",
    "ൂ": "q",
    "ൃ": "r",
    "െ": "s",
    "േ": "t",
    "ൈ": "ss",
    "ൊ": "sm",
    "ോ": "tm",
    "ൌ": "su",
    "്‌": "v",
    "്": "v",
    "ൗ": "u",
    "്യേ": "ty",
    "്യെ": "sy",
    "ക്ക": "¡",
    "ക്ല": "¢",
    "ക്ഷ": "£",
    "ഗ്ഗ": "¤",
    "ഗ്ല": "¥",
    "ങ്ക": "¦",
    "ങ്ങ": "§",
    "ച്ച": "¨",
    "ഞ്ച": "©",
    "ഞ്ഞ": "ª",
    "ട്ട": "«",
    "ണ്‍": "¬",
    "ണ്ട": "ï",
    "ണ്ണ": "®",
    "ത്ത": "¯",
    "ത്ഥ": "°",
    "ദ്ദ": "±",
    "ദ്ധ": "²",
    "ന്‍": "³",
    "ൻ": "³",
    "ന്ത": "´",
    "ന്ദ": "µ",
    "ന്ന": "¶",
    "ന്മ": "·",
    "പ്പ": "¸",
    "പ്ല": "¹",
    "ബ്ബ": "º",
    "ബ്ല": "»",
    "മ്പ": "¼",
    "മ്മ": "½",
    "മ്ല": "Ÿ",
    "യ്യ": "¿",
    "ർ‌": "À",
    "ർ‍": "À",
    "ർ": "À",
    "ര്‍": "À",
    "റ്റ": "ä",
    "ല്‍": "Â",
    "ൽ": "Â",
    "ല്ല": "Ã",
    "ള്‍": "Ä",
    "ൾ": "Ä",
    "ള്ള": "Å",
    "വ്വ": "Æ",
    "ശ്ല": "Ç",
    "ശ്ശ": "È",
    "സ്ല": "É",
    "സ്സ": "Ê",
    "ഹ്ല": "Ë",
    "സ്റ്റ": "Ì",
    "ഡ്ഡ": "Í",
    "ക്ട": "Î",
    "ബ്ധ": "Ï",
    "ബ്ദ": "Ð",
    "ച്ഛ": "Ñ",
    "ഹ്മ": "Ò",
    "ഹ്ന": "Ó",
    "ന്ധ": "Ô",
    "ത്സ": "Õ",
    "ജ്ജ": "Ö",
    "ണ്മ": "×",
    "സ്ഥ": "Ø",
    "ന്ഥ": "Ù",
    "ജ്ഞ": "Ú",
    "ത്ഭ": "Û",
    "ഗ്മ": "Ü",
    "ശ്ച": "Ý",
    "ണ്ഡ": "Þ",
    "ത്മ": "ß",
    "ക്ത": "à",
    "ഗ്ന": "á",
    "ന്റ": "â",
    "ഷ്ട": "ã",
    "്യ": "y",
    "്വ": "z",
    "്ര": "{",
    "-": "þ"
};

function unicodeToFml(strText) {
    let ascii_text = "";
    let bRepham = 0;
    let index = 0;

    while (index < strText.length) {
        let found = false;
        for (let lenChar = 3; lenChar > 0; lenChar--) {
            let chUnicode = strText.substring(index, index + lenChar);
            if (mapTable[chUnicode]) {
                let chAscii = mapTable[chUnicode];
                found = true;

                if (chUnicode == "ൈ") {
                    if (bRepham == 1) {
                        bRepham = 0;
                        ascii_text = ascii_text.substring(0, ascii_text.length - 2) + chAscii + ascii_text[ascii_text.length - 2] + ascii_text[ascii_text.length - 1];
                    } else {
                        ascii_text = ascii_text.substring(0, ascii_text.length - 1) + chAscii + ascii_text[ascii_text.length - 1];
                    }
                } else if ((chUnicode == "ോ") || (chUnicode == "ൊ") || (chUnicode == "ൌ")) {
                    if (bRepham == 1) {
                        bRepham = 0;
                        ascii_text = ascii_text.substring(0, ascii_text.length - 2) + chAscii[0] + ascii_text[ascii_text.length - 2] + ascii_text[ascii_text.length - 1] + chAscii[1];
                    } else {
                        ascii_text = ascii_text.substring(0, ascii_text.length - 1) + chAscii[0] + ascii_text[ascii_text.length - 1] + chAscii[1];
                    }
                } else if (chUnicode == "്യേ" || chUnicode == "്യെ") {
                    bRepham = 0;
                    ascii_text = ascii_text.substring(0, ascii_text.length - 1) + chAscii[0] + ascii_text[ascii_text.length - 1] + chAscii[1];
                } else if ((chUnicode == "െ") || (chUnicode == "േ") || (chUnicode == "്ര")) {
                    if (bRepham == 1) {
                        ascii_text = ascii_text.substring(0, ascii_text.length - 2) + chAscii[0] + ascii_text[ascii_text.length - 2] + ascii_text[ascii_text.length - 1];
                        bRepham = 0;
                    } else {
                        ascii_text = ascii_text.substring(0, ascii_text.length - 1) + chAscii[0] + ascii_text[ascii_text.length - 1];
                    }
                    if (chUnicode == "്ര") {
                        bRepham = 1;
                    }
                } else {
                    bRepham = 0;
                    ascii_text = ascii_text + chAscii;
                }
                index = index + lenChar;
                break;
            }
        }
        if (!found) {
            ascii_text += strText[index];
            index++;
            bRepham = 0;
        }
    }
    return ascii_text;
}

function fmlToUnicode(fmlText) {
    // Strip hyphens first
    fmlText = fmlText.replace(/-/g, '');

    let unicodeText = "";
    let pendingPreBase = "";

    for (let i = 0; i < fmlText.length; i++) {
        const char = fmlText[i];
        // Reverse map logic
        let mapped = char;
        // Simple reverse lookup from mapTable
        // Since I didn't copy reverseMap, I need to build it or just iterate.
        // Iterating is slow but fine for debug.
        for (const [key, value] of Object.entries(mapTable)) {
            if (value === char) {
                mapped = key;
                break;
            }
        }

        if (char === 's' || char === 't' || char === '{') {
            mapped = (char === 's' ? 'െ' : (char === 't' ? 'േ' : '്ര'));
            pendingPreBase += mapped;
        } else {
            unicodeText += mapped + pendingPreBase;
            pendingPreBase = "";
        }
    }
    unicodeText = unicodeText.replace(/െെ/g, "ൈ");
    return unicodeText;
}

async function debugSearch() {
    const districtId = '01';
    const lacId = '128'; // Attingal
    const searchNameUnicode = "ജയാ "; // Jaya (with space)
    const searchNameFml = unicodeToFml(searchNameUnicode);

    console.log(`Searching for: ${searchNameUnicode} -> FML: ${searchNameFml}`);

    const formData = new URLSearchParams();
    formData.append('district_id', districtId);
    formData.append('lac_id', lacId);
    formData.append('searchname', searchNameFml);
    formData.append('searchhousename', '');
    formData.append('frmsbt', '1');

    try {
        const res = await fetch('https://www.ceo.kerala.gov.in/voter-search', {
            method: 'POST',
            body: formData,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        const html = await res.text();
        console.log(`Response length: ${html.length}`);

        const cheerio = require('cheerio');
        const $ = cheerio.load(html);

        const cardCount = $('.card-body').length;
        console.log(`Found ${cardCount} results (cards).`);

        // Log first 20 names to check conversion quality
        $('.card-body').each((i, el) => {
            if (i >= 20) return false;
            const header = $(el).prev('.card-header');
            const nameEl = header.find('.karthika-text');
            if (nameEl.length > 0) {
                const raw = nameEl.text().trim();
                const converted = fmlToUnicode(raw);
                console.log(`Name ${i}: ${raw} -> ${converted}`);
            }
        });

        // Check for pagination
        const pagination = $('.pagination').length;
        console.log(`Pagination present: ${pagination > 0}`);

        if (pagination > 0) {
            console.log($('.pagination').html());
        }

    } catch (e) {
        console.error("Search failed", e);
    }
}

debugSearch();
