import Modal from '@/components/Modal';
import PriceInfoCard from '@/components/PriceInfoCard';
import ProductCard from '@/components/ProductCard';
import { getProductById, getSimilarProduct } from '@/lib/actions';
import { Product } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react'

type Props = {
  params: { id: string };
}

const productDetails = async ({ params: { id } }: Props) => {
  const product: Product = await getProductById(id);

  const similarProducts = await getSimilarProduct(product.category || "");
  if (!product) redirect('/');
  return (
    <div className='product-container'>
      <div className='flex gap-28 xl:flex-row flex-col'>
        <div className='product-image'>
          <Image src={product.image} alt={product.title} height={400} width={400} className='mx-auto' />
        </div>

        <div className='flex flex-1 flex-col'>
          <div className='flex justify-between items-start gap-5 flex-wrap pb-6'>
            <div className='flex flex-col gap-3'>
              <p className='text-[28px] text-secondary font-semibold'>{product.title}</p>
              <Link href={product.url} target={'_blank'} className='text-black opacity-50'>Visit product</Link>
            </div>
            <div className='flex items-center gap-3'>
              <div className='product-hearts'>
                <Image src="/assets/icons/red-heart.svg" alt='heart' height={20} width={20} />
                <p className='text-base font-semibold text-[#D46F77]'>{product.reviewsCount}</p>

              </div>
            </div>
          </div>

          <div className="product-info">
            {/* Curr and original Price */}
            <div className="flex flex-col gap-2">
              <p className='text-[34px] text-secondary font-bold '>
                {product.currentPrice}
              </p>

              {
                product.discountRate != ""
                &&
                <p className='text-[21px] text-black opacity-50 font-bold line-through '>
                  {product.originalPrice}
                </p>
              }


            </div>


            {/* stars and reviews */}
            <div className='flex flex-col gap-4'>
              <div className='flex gap-3'>
                <div className='product-stars'>
                  <Image src={"/assets/icons/star.svg"} alt='stars' width={16} height={16} />
                  <p className='text-sm text-primary-orange font-semibold'>
                    {product.stars || '4.5'}
                  </p>
                </div>

                <div className='product-reviews'>
                  <Image src={"/assets/icons/comment.svg"} alt='comments' width={16} height={16} />
                  <p className='text-sm text-secondary font-semibold'>
                    {product.reviewsCount || "1.2K"} reviews
                  </p>
                </div>
              </div>
            </div>
          </div>


          {/* Price cards & modals*/}

          {product.isOutOfStock ? <div className='my-7 flex flex-col gap-5 text-center'>Oops Currently Unavailable</div> :
            <div className='my-7 flex flex-col gap-5'>

              <div className='flex flex-wrap gap-5'>
                <PriceInfoCard
                  title="Current Price"
                  iconSrc="/assets/icons/price-tag.svg"
                  value={product.currentPrice}
                />

                <PriceInfoCard
                  title="Average Price"
                  iconSrc="/assets/icons/price-tag.svg"
                  value={product.currentPrice}
                />

                <PriceInfoCard
                  title="Highest Price"
                  iconSrc="/assets/icons/arrow-up.svg"
                  value={product.highestPrice}
                />

                <PriceInfoCard
                  title="Lowest Price"
                  iconSrc="/assets/icons/arrow-down.svg"
                  value={product.currentPrice}
                />
              </div>
              {/* Modal */}
              <Modal productId={id} />
            </div>
          }
        </div>
      </div>

      {/* Description and buy button */}
      <div className='flex flex-col gap-16'>
        <div className='flex flex-col gap-5'>
          <h3 className='text-2xl text-secondary font-semibold'>Product Description</h3>
          <div className='flex flex-col gap-4'>
            {/*************Add description here **************/}
            {product.description}
          </div>
        </div>

        {/*******buy button *********/}
        <Link href={product.url} target='_blank'>
          <button className='btn w-fit mx-auto flex items-center justify-center gap-3 min-w-[200px] '>
            <Image src='/assets/icons/bag.svg' alt='bag' width={22} height={22} />
            <div className='text-base text-white'>Buy Now</div>
          </button>
        </Link>
      </div>


      {/* Similar product */}
      {similarProducts && similarProducts.length > 0 &&

        <section className='py-14 flex flex-col gap-2 w-full'>
          <p className='section-text'>Similar Products</p>
          <div className='flex flex-wrap gap-10 mt-7 w-full'>
            {similarProducts.map((product) => (
              product._id != id && <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </section>
      }
    </div>

  )
}

export default productDetails