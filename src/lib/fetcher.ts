
interface FetchOptions extends RequestInit {
    timeout?: number;
    retries?: number;
    backoff?: number;
}

export async function fetchWithRetry(url: string, options: FetchOptions = {}): Promise<Response> {
    const {
        timeout = 30000, // 30 seconds default
        retries = 3,
        backoff = 1000, // 1 second initial backoff
        ...fetchOptions
    } = options;

    let lastError: any;

    for (let i = 0; i <= retries; i++) {
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), timeout);

        try {
            const response = await fetch(url, {
                ...fetchOptions,
                signal: controller.signal,
            });
            clearTimeout(id);

            if (!response.ok && response.status >= 500) {
                // Throw to trigger retry for server errors
                throw new Error(`Server error: ${response.status}`);
            }

            return response;
        } catch (error: any) {
            clearTimeout(id);
            lastError = error;

            // Don't retry if it's the last attempt
            if (i === retries) break;

            // Don't retry on client errors (4xx) unless it's a timeout/network error
            // (The check above !response.ok && >= 500 handles HTTP errors, 
            // but fetch throws on network errors/timeouts which we want to retry)

            const delay = backoff * Math.pow(2, i);
            console.warn(`Fetch attempt ${i + 1} failed. Retrying in ${delay}ms...`, error.message);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }

    throw lastError;
}
