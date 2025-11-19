
const mapTable: { [key: string]: string } = {
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

// Reverse map for FML to Unicode
const reverseMap: { [key: string]: string } = {};
Object.keys(mapTable).forEach(key => {
    const value = mapTable[key];
    // For multi-char values (like "ss", "tm"), we might need special handling in reverse logic.
    // But for direct mapping, we can map the primary char if it's unique.
    // However, "ss" is "s" + "s". "s" maps to "െ". So "ss" is "െെ" which is wrong.
    // "ss" is likely a specific sequence.
    // Let's just map the single chars first.
    if (value.length === 1) {
        reverseMap[value] = key;
    }
});

// Special handling for "ss" -> "ൈ" ?
// Actually, in FML "ss" might be rendered as two "s" glyphs which look like "ൈ"?
// Or maybe "ss" is a ligature code?
// In the map, "ൈ": "ss".
// If I see "ss" in FML string, it should map back to "ൈ".
// But "s" maps to "െ". So "ss" would be "െെ".
// "െ" is the left-side vowel sign for 'e'. "ൈ" is 'ai'.
// Visually 'ai' looks like two 'e' signs. So "ss" is correct visually.
// So if I convert "s" -> "െ", then "ss" -> "െെ".
// "െെ" is often equivalent to "ൈ" in some input methods, but strictly "ൈ" is a single char.
// We can normalize "െെ" to "ൈ" in post-processing.

export function unicodeToFml(strText: string): string {
    let chUnicode: string;
    let chAscii: string;
    let index: number;
    let lenChar: number;
    let bRepham = 0;
    let ascii_text = "";

    for (index = 0; index < strText.length;) {
        let found = false;
        for (lenChar = 3; lenChar > 0; lenChar--) {
            chUnicode = strText.substring(index, index + lenChar);
            if (mapTable[chUnicode]) {
                chAscii = mapTable[chUnicode];
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
            if (lenChar == 0) { // Loop finished without finding
                // Take 1 char
                chUnicode = strText.substring(index, index + 1);
                ascii_text = ascii_text + chUnicode;
                index++;
                bRepham = 0;
            }
        }
    }
    return ascii_text;
}

export function fmlToUnicode(fmlText: string): string {
    // Strip hyphens first
    fmlText = fmlText.replace(/-/g, '');

    // Strategy:
    // 1. Map each char to its Unicode equivalent (or partial).
    // 2. Handle reordering:
    //    - "s" (െ), "t" (േ), "{" (്ര) are pre-base.
    //    - If we encounter them, we need to swap them with the *following* consonant.
    //    - Wait, in FML string, they appear *before* the consonant.
    //    - So if we see "s" + "k" (ക), we want "k" + "s" -> "കെ".

    let unicodeText = "";
    let pendingPreBase = "";

    for (let i = 0; i < fmlText.length; i++) {
        const char = fmlText[i];
        let mapped = reverseMap[char] || char;

        // Check for pre-base vowels/signs
        if (char === 's' || char === 't' || char === '{') {
            // s -> െ, t -> േ, { -> ്ര
            // We store it and append it after the next char (consonant)
            // But what if we have multiple pre-base? e.g. "ss" -> "െെ" -> "ൈ".
            // If we have "ss", we get "s", then "s".
            // i=0: char='s', pending='െ'.
            // i=1: char='s', pending='െ'. We have existing pending.
            // Does FML allow stacking pre-base? Yes, "ss" for "ൈ".
            // So we should accumulate pending?
            // Or handle "ss" specifically?
            // If we accumulate: pending="െെ". Next is consonant "k".
            // Output: "k" + "െെ".
            // "ക" + "െെ" -> "കൈ" (visually correct).

            // What about "{" (്ര)? It's also pre-base in FML?
            // In unicode2ascii: "്ര" -> "{". And it swaps.
            // So "{" appears before consonant in FML.
            // So yes, accumulate.

            mapped = (char === 's' ? 'െ' : (char === 't' ? 'േ' : '്ര'));
            pendingPreBase += mapped;
        } else {
            // It's a consonant or other char.
            // Append the char, then the pending pre-base.

            // Wait, what if it's a post-base vowel like "m" (ാ)?
            // "m" is just "ാ". It appears after consonant in FML and Unicode.
            // So "k" + "m" -> "ക" + "ാ" -> "കാ". Correct.

            // What about "tm" (ോ)?
            // FML: "t" + "k" + "m".
            // i=0: "t" -> pending="േ".
            // i=1: "k" -> output "k" + "േ" -> "കേ". pending="".
            // i=2: "m" -> output "ാ" -> "കേ" + "ാ" -> "കോ".
            // "കേ" + "ാ" renders as "കോ" in Malayalam?
            // "േ" + "ാ" = "ോ". Yes.
            // So "കേ" + "ാ" = "ക" + "േ" + "ാ" = "ക" + "ോ" = "കോ".
            // This logic seems sound for standard cases.

            unicodeText += mapped + pendingPreBase;
            pendingPreBase = "";
        }
    }

    // Post-processing for "െെ" -> "ൈ"
    unicodeText = unicodeText.replace(/െെ/g, "ൈ");

    return unicodeText;
}
