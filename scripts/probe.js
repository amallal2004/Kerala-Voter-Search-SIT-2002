const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    console.log('Navigating to site...');
    await page.goto('https://www.ceo.kerala.gov.in/voter-search');

    // Listen for responses
    page.on('response', async response => {
        if (response.url().includes('district') || response.url().includes('lac') || response.request().method() === 'POST') {
            console.log('Response URL:', response.url());
            try {
                const json = await response.json();
                console.log('Response JSON:', JSON.stringify(json).substring(0, 200) + '...');
            } catch (e) {
                // console.log('Response body not JSON');
            }
        }
    });

    // Try to find the district dropdown
    // Based on previous browser tool, it was index 20 or similar, but let's look for text
    // The dropdown likely has a label "District"

    // Let's dump the HTML to see the structure if we can't find it
    const content = await page.content();
    console.log(content);

    // Try to click the select element if it exists, or the custom div
    // Inspecting the page source would be better, but let's try to click anything that looks like a dropdown

    // Wait for the page to settle
    await page.waitForTimeout(5000);

    console.log('Done waiting.');
    await browser.close();
})();
