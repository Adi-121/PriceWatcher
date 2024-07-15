import { PriceHistoryItem,Product } from "@/types";
import { Notification } from "./nodemailer";
import { THRESHOLD_PERCENTAGE } from "./nodemailer";

function extract(str:string) {
    const sign = str[0];
    let s = str[0];
    let i = 1;
    while(str[i] != ' ' && i<str.length && str[i] != sign){
        s += str[i];
        i++;
    }
    return s;
}

export function extractPrice(...elements : any){
    for(const element of elements){
        // console.log(element);
        // console.log(element.text());
        const priceText = extract(element.text().trim());
        if(priceText){
            return priceText;
        } 
    }
    return '';
}


export function outOfStock(str : any){
    return str.text().trim().toLocaleLowerCase().includes('currently unavailable')
}

export function getLowestPrice(...prices :any){
    return '';
}

export function getHighestPrice(...prices :any){
    return "";
}

export function getAveragePrice(...prices :any){
    return "";
}

export const getEmailNotifType=(
    scrapedProduct: Product,
    currentProduct: Product
) =>{
    const lowestPrice =(currentProduct.lowestPrice);
    const currentPrice = scrapedProduct.currentPrice;

    if(currentPrice < lowestPrice){
        return Notification.LOWEST_PRICE as keyof typeof Notification;
    }

    if(!scrapedProduct.isOutOfStock && currentProduct.isOutOfStock){
        return Notification.CHANGE_OF_STOCK as keyof typeof Notification;
    }

    if(scrapedProduct.discountRate >= THRESHOLD_PERCENTAGE){
        return Notification.THRESHOLD_MET as keyof typeof Notification;
    }

    return null;
}
