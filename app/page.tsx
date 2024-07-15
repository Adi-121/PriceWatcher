import HeroCarousel from '@/components/HeroCarousel'
import ProductCard from '@/components/ProductCard'
import Searchbar from '@/components/Searchbar'
import { getAllProduct } from '@/lib/actions'
import Image from 'next/image'
import React from 'react'

const Home = async () => {

  const allProducts = await getAllProduct();

  return (
    <>
      <section className='px-6 md:px-20 py-24 border-2'>
        <div className='flex max-xl:flex-col justify-center gap-16'>
          <div className='flex flex-col justify-center'>
            <p className='small-text'>
              Smart Shopping Starts Here:
              <Image alt='arrow-right' src='/assets/icons/arrow-right.svg' width={16} height={16}></Image>
            </p>

            <h1 className='head-text'>
              Unleash the power of <span className='text-primary'>PriceWatcher</span>
            </h1>

            <p className='mt-6'>
              Powerful, self-serve product and growth analytics to help you convert, engage,and retain more.
            </p>

            <section className='pb-3'><Searchbar /></section>
            {/* 
            <section></section> */}
          </div>

          <HeroCarousel />

        </div>
      </section>

      <section id="trending" className='trending-section'>
        <h2 className='section-text text-center'>Trending</h2>
        <div className='flex flex-wrap gap-x-8 gap-y-16 justify-evenly'>
          {allProducts?.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>
    </>
  )
}

export default Home