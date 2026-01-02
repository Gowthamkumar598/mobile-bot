"use client";

import Image from 'next/image';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import styles from './ProductCard.module.css';

export default function ProductCard({ product }: { product: Product }) {
    const { addToCart } = useCart();

    return (
        <div className={`card ${styles.card}`}>
            <div className={styles.imageWrapper}>
                <img
                    src={product.image}
                    alt={product.name}
                    className={styles.image}
                />
            </div>
            <div className={styles.content}>
                <div className={styles.meta}>
                    <span className={styles.brand}>{product.brand}</span>
                    <span className={styles.price}>${product.price}</span>
                </div>
                <h3 className={styles.title}>{product.name}</h3>
                <p className={styles.description}>{product.description}</p>

                <div className={styles.specs}>
                    <span className={styles.spec}>{product.specs.screen}</span>
                    <span className={styles.spec}>{product.specs.camera}</span>
                </div>

                <button
                    onClick={() => addToCart(product)}
                    className={`btn btn-primary ${styles.buyBtn}`}
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
}
