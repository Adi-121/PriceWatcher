import { Product } from '@/types';
import Image from 'next/image';
import Link from 'next/link'
import React from 'react'


interface Props {
    product: Product;
}

const ProductCard = ({ product }: Props) => {
    const src = product.image;
    // console.log();
    return (
        <Link href={`/products/${product._id}`} className='product-card'>
            <div className='product-card_img-container'>
                <Image
                    src={product.image}
                    alt={product.title}
                    width={300}
                    height={300}
                    className='product-card_img'
                />
            </div>

            <div className='flex flex-col gap-3'>
                <h3 className='product-title'>{product.title}</h3>
                <div>
                    <div className='flex justify-between'>
                        <p className='text-black opacity-50 text-sm font-semibold capitalize flex items-center'>
                            <span>{product.category}</span>
                        </p>
                        <p className='text-black text-lg font-semibold'>
                            <span>{product.currentPrice}</span>
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default ProductCard