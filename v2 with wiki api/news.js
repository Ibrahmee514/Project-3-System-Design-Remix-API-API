export async function handler() {
    const key = process.env.MEDIASTACK_KEY;

    const url =
        "https://api.mediastack.com/v1/news" +
        "?access_key=" + key +
        "&countries=us" +
        "&languages=en" +
        "&limit=10";

    try {
        const res = await fetch(url);
        const data = await res.json();

        return {
            statusCode: 200,
            headers: { "Access-Control-Allow-Origin": "*" },
            body: JSON.stringify(data)
        };
    } catch {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to fetch news" })
        };
    }
}