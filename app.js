const express = require("express");
const puppeteer = require("puppeteer");

const app = express();

// /share-link?videoId=XXXX にアクセスするとJSON形式でシェアURLが返るß
app.get("/share-link", async (req, res) => {
  const videoId = req.query.videoId;
  if (!videoId) {
    return res.status(400).json({ error: "videoId query param is required" });
  }

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    await page.goto(`https://www.youtube.com/watch?v=${videoId}`, {
      waitUntil: "networkidle2",
    });

    await page.waitForSelector(
      '#top-level-buttons-computed button[title="Share"]'
    );
    await page.click('#top-level-buttons-computed button[title="Share"]');

    await page.waitForSelector("#share-url");
    const shareLink = await page.$eval("#share-url", (el) => el.value);

    res.json({ videoId, shareLink });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  } finally {
    if (browser) {
      await browser.close();
    }
  }
});

// サーバー起動
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
