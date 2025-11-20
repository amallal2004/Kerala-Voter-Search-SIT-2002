const https = require('https');

const url = 'https://www.ceo.kerala.gov.in/votersearchnew/show_booth/?id=001'; // Assuming LAC ID 001 exists

https.get(url, (res) => {
    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });
    res.on('end', () => {
        console.log('Status Code:', res.statusCode);
        console.log('Body:', data.substring(0, 500)); // Print first 500 chars
    });
}).on('error', (err) => {
    console.error('Error:', err.message);
});
