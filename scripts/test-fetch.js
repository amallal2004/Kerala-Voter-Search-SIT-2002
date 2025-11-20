
// Paste fetchWithRetry logic here for testing without TS compilation
async function fetchWithRetry(url, options = {}) {
    const {
        timeout = 30000, // 30 seconds default
        retries = 3,
        backoff = 100, // 100ms initial backoff for test
        ...fetchOptions
    } = options;

    let lastError;

    for (let i = 0; i <= retries; i++) {
        // Mock AbortController for node if needed, or just ignore signal for this test
        // const controller = new AbortController(); 
        // const id = setTimeout(() => controller.abort(), timeout);

        try {
            const response = await fetch(url, {
                ...fetchOptions,
                // signal: controller.signal,
            });
            // clearTimeout(id);

            if (!response.ok && response.status >= 500) {
                throw new Error(`Server error: ${response.status}`);
            }

            return response;
        } catch (error) {
            // clearTimeout(id);
            lastError = error;

            if (i === retries) break;

            const delay = backoff * Math.pow(2, i);
            console.warn(`Fetch attempt ${i + 1} failed. Retrying in ${delay}ms...`, error.message);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }

    throw lastError;
}

// Mock global fetch
const originalFetch = global.fetch;
let attempts = 0;

global.fetch = async (url, options) => {
    attempts++;
    console.log(`Attempt ${attempts} for ${url}`);

    if (attempts < 3) {
        throw new Error('Simulated network error');
    }

    return {
        ok: true,
        status: 200,
        json: async () => ({ success: true }),
        text: async () => 'success'
    };
};

async function test() {
    console.log('Starting retry test...');
    try {
        const response = await fetchWithRetry('https://example.com', {
            retries: 3,
            backoff: 100
        });
        const data = await response.json();
        console.log('Success:', data);

        if (attempts === 3) {
            console.log('PASSED: Retried correctly and succeeded on 3rd attempt');
        } else {
            console.log('FAILED: Did not retry expected number of times. Attempts:', attempts);
        }
    } catch (error) {
        console.error('FAILED: Should have succeeded but threw:', error);
    }

    // Restore fetch
    global.fetch = originalFetch;
}

test();
