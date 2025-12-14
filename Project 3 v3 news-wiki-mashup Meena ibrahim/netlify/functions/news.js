export async function handler(event) {
    try {
        const key = process.env.MEDIASTACK_KEY;
        if (!key) {
            return {
                statusCode: 500,
                body: JSON.stringify({ error: "Missing MEDIASTACK_KEY env var" })
            };
        }

        const params = new URLSearchParams(event.queryStringParameters || {});
        const q = params.get("q") || "";
        const countries = params.get("countries") || "us";

        const url = new URL("https://api.mediastack.com/v1/news");
        url.searchParams.set("access_key", key);
        url.searchParams.set("languages", "en");
        url.searchParams.set("countries", countries);
        url.searchParams.set("limit", "10");
        if (q) url.searchParams.set("keywords", q);

        const res = await fetch(url.toString());
        const data = await res.json();

        return {
            statusCode: res.status,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(data)
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: err.message || "Server error" })
        };
    }
}