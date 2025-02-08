const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const VIDEO_ID = "qP52sh7PzYA";

  await page.goto(`https://www.youtube.com/watch?v=${VIDEO_ID}`, {
    waitUntil: "networkidle2",
  });

  await page.waitForSelector(
    '#top-level-buttons-computed button[title="Share"]'
  );
  await page.click('#top-level-buttons-computed button[title="Share"]');
  await page.waitForSelector("#share-url");
  const shareLink = await page.$eval("#share-url", (el) => el.value);

  console.log("Share Link:", shareLink);

  await browser.close();
})();
