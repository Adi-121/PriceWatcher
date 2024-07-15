import axios from "axios";
import * as cheerio from 'cheerio'
import { extractPrice, outOfStock } from "../utils";

export async function scrapeAmazonProduct(url: string) {
    if (!url) return;

    // curl --proxy brd.superproxy.io:22225 --proxy-user brd-customer-hl_bb06b524-zone-pricewatcher:jq2ea4nz6zgu -k "http://geo.brdtest.com/mygeo.json"

    // Brightdata proxy configuration
    const username = String(process.env.BRIGHT_DATA_USERNAME);
    const password = String(process.env.BRIGHT_DATA_PASSWORD);
    const port = 22225;
    const session_id = (1000000 * Math.random()) | 0;


    // using this options object we can make a request to get desired data from the Brightdata
    const options = {
        auth: {
            username: `${username}-session-${session_id}`,
            password,
        },
        host: `brd.superproxy.io`,
        port,
        rejectUnauthorized: false,
    }

    // console.log(options);
    try {
        // console.log("inside scrapper");
        const response = await axios.get(url, options);
        // console.log(response.data);


        const $ = cheerio.load(response.data);

        // extracting product info
        const title = $('#productTitle').text().trim();
        const currPrice = extractPrice(
            // $('span.a-price-whole'),
            // $('span.a-color-price'),
            // $('a-text-price'),
            $('span.aok-offscreen')
        )
        const originalPrice = extractPrice(
            $('span.a-text-price')
        )
        // const numericCurrPrice = "456.33".replace(/[^0-9.]/g, '');
        // const numericOriginalPrice = originalPrice.replace(/[^0-9.]/g, '');

        const isOutOfStock = outOfStock($('#availability span'));
        const images =
            $('#imgBlkFront').attr('data-a-dynamic-image') ||
            $('#landingImage').attr('data-a-dynamic-image') ||
            '{}';

        const imageURLs = Object.keys(JSON.parse(images));

        const discountRate = $('span.savingPriceOverride').text();

        const category = $('.nav-categ-image').attr('alt')
            || $('#nav-subnav').attr("data-category")
            || $('span.nav-a-content').text();


        const description = "";
        // Construct data object with scraped information
        const data = {
            url,
            currency: currPrice[0] || "",
            image: imageURLs[0],
            title,
            category,
            currentPrice: String(currPrice) || String(originalPrice),
            originalPrice: String(originalPrice) || String(currPrice),
            priceHistory: [],
            discountRate: String(discountRate),
            isOutOfStock: Boolean(isOutOfStock),
            // description,
            lowestPrice: String(currPrice) || String(originalPrice),
            highestPrice: String(originalPrice) || String(currPrice),
            averagePrice: String(currPrice) || String(originalPrice),
            description,
            reviewsCount: 100,
            stars: 4.8
        }

        console.log(data);
        return data;

    } catch (error: any) {
        console.log('failed to scrape the product' + error.message);
    }

} 