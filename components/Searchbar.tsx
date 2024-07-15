"use client"
import { ScrapeAndStoreProduct } from "@/lib/actions";
import { FormEvent, useState } from "react";

function Searchbar() {

  const [searchPrompt, setSearchPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const isValidAmazonProductLink = (url: string) => {
    try {
      const parsedURL = new URL(url);
      const hostname = parsedURL.hostname;

      if (
        hostname.includes('amazon.com') ||
        hostname.includes('amazon.') ||
        hostname.endsWith('amazon') ||
        hostname.includes('amzn.in')
      ) {
        return true;
      }

      return false;
    } catch (error) {
      return false;
    }
  }




  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    // console.log(event);
    event.preventDefault();
    const isValidLink = isValidAmazonProductLink(searchPrompt);


    // implement toast notification
    if (!isValidLink) {
      // console.log("galat jagah");
      return alert('Please provide a valid link!')
    }

    try {
      setIsLoading(true);
      // scrapping the product page
      // console.log(searchPrompt);
      const product = await ScrapeAndStoreProduct(searchPrompt);

    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form
      className="flex flex-wrap gap-4 mt-12"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Enter product link..."
        className="searchbar-input"
        value={searchPrompt}
        onChange={(e) => setSearchPrompt(e.target.value)}
      />

      <button
        type="submit"
        className="searchbar-btn"
        disabled={searchPrompt === ''}
      >
        {isLoading ? 'Searching...' : 'Search'}
      </button>
    </form>
  )
}

export default Searchbar;