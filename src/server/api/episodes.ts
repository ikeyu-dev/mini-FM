import puppeteer from "puppeteer";

export default defineEventHandler(async () => {
    let browser;
    try {
        browser = await puppeteer.launch({
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
        });
        const page = await browser.newPage();
        const config = useRuntimeConfig();
        await page.goto(config.public.All_PROGRAM_URL);

        const episodes = await page.$$eval(".a3lLHc", (elements) => {
            const extractedEpisodes = elements.map((element) => {
                const titleElement = element.querySelector('[jsname="r4nke"]');
                const linkElement = element.querySelector("a");
                const title = titleElement ? titleElement.textContent : null;
                const link = linkElement ? linkElement.href : null;
                return { title, link };
            });
            return extractedEpisodes;
        });
        return {
            episodes: episodes,
        };
    } catch (error) {
        console.error("スクレイピング処理でエラーが発生:", error);
        throw createError({
            statusCode: 500,
            statusMessage: "ラジオ一覧のスクレイピングに失敗しました: " + error,
        });
    } finally {
        if (browser) {
            await browser.close();
        }
    }
});
