const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

async function scrapeData() {
    const url = "https://amiuassam.in/prices";  // Replace with actual URL
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    
    let prices = [];
    $("table tr").each((index, element) => {
        const columns = $(element).find("td");
        let priceData = {
            crop: $(columns[0]).text().trim(),
            min: $(columns[1]).text().trim(),
            max: $(columns[2]).text().trim(),
        };
        prices.push(priceData);
    });

    fs.writeFileSync("prices.json", JSON.stringify(prices, null, 2));
    console.log("Prices saved.");
}

scrapeData();