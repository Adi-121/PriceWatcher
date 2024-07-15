"use server"
import { revalidatePath } from "next/cache";
import { scrapeAmazonProduct } from "../scraper";
import { connectToDB } from "../mongoose";
import Product from "../models/product.model";
import { getAveragePrice, getHighestPrice, getLowestPrice } from "../utils";
import { User } from "@/types";
import { generateEmailBody, sendEmail } from "../nodemailer";

export async function ScrapeAndStoreProduct(productUrl: string) {
    // console.log(productUrl);
    if (!productUrl) return;

    try {
        connectToDB();
        // scraping the product
        const scrapedProduct = await scrapeAmazonProduct(productUrl);

        // if data not present return
        if (!scrapedProduct) return;

        // Updating the DB 
        let product = scrapedProduct;

        const existingProduct = await Product.findOne({ url: scrapedProduct.url });

        if (existingProduct) {
            const updatedPriceHistory: any = [
                ...existingProduct.priceHistory,
                { price: scrapedProduct.currentPrice }
            ]

            product = {
                ...scrapedProduct,
                priceHistory: updatedPriceHistory,
                lowestPrice: getLowestPrice(updatedPriceHistory),
                highestPrice: getHighestPrice(updatedPriceHistory),
                averagePrice: getAveragePrice(updatedPriceHistory),
            }
        }

        const newProduct = await Product.findOneAndUpdate(
            { url: scrapedProduct.url },
            product,
            { upsert: true, new: true },
        );

        revalidatePath(`/products/${newProduct._id}`);

    } catch (error: any) {
        console.log("Failed to create/update product :" + error.message);
    }

}

export async function getProductById(productId: string) {
    try {
        connectToDB();
        const product = await Product.findOne({ _id: productId });
        if(!product) return;
         
        return product;
    } catch (error) {
        console.log(error);
    }
}

export async function getAllProduct() {
    try {
        connectToDB();
        const product = await Product.find().sort({ createdAt: -1 });
        return product;
    } catch (error) {
        console.log(error);
    }
}

export async function getSimilarProduct(category:string){
    try {
        connectToDB();
        // const currProduct = await Product.findById({productId});
        // const category = 
        let similarProduct = await Product.find({ category : category }).sort({ createdAt: -1 });
        
        if(!similarProduct && similarProduct >1) return null;
        // console.log(similarProduct + category); 
        return similarProduct;
    } catch (error) {
        console.log("Error while fetching similar product ->" + error);
    }
}

export async function addUserEmailToProduct(productId:string, userEmail:string){
    
    try {
        connectToDB();
        const product = await Product.findById(productId) || null;
        if(!product) return alert("No such product exist!!!"); 
        
        const userExist = product?.user.some((user: User) => user.email === userEmail);
        // console.log("user hai kya: ", userExist);
        if(!userExist){
            // new user
            product.user.push(userEmail);

            await product.save();
            // console.log("2.user add kr diya aage ja raha hu");
            const emailContent = generateEmailBody(product,"WELCOME");
            await sendEmail(emailContent, [userEmail]);
        }

    } catch (error) {
        console.log("Error hai bhai error hai", error);
    }
}