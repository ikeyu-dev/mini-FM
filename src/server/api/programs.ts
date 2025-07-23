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

        const programs = await page.$$eval(".a3lLHc", (elements) => {
            return elements.map((element) => {
                const titleElement = element.querySelector('[jsname="r4nke"]');
                const linkElement = element.querySelector("a");
                const imgElement = element.querySelector("img");
                const title = titleElement ? titleElement.textContent : null;
                const link = linkElement ? linkElement.href : null;
                const imgSrc = imgElement ? imgElement.src : null;
                return { title, link, imgSrc };
            });
        });
        return {
            programs: programs,
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
