"use client";

import { useState } from 'react';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import RagChat from '@/components/RagChat';
import CartDrawer from '@/components/CartDrawer';
import phones from '@/data/phones.json';
import styles from './page.module.css';

export default function Home() {
    const [isCartOpen, setIsCartOpen] = useState(false);

    return (
        <>
            <Header onOpenCart={() => setIsCartOpen(true)} />

            <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

            <main className={styles.main}>
                <div className={styles.hero}>
                    <div className="container">
                        <h1 className={styles.heroTitle}>
                            Find Your <span className="text-gradient">Perfect Phone</span>
                        </h1>
                        <p className={styles.heroSubtitle}>
                            Explore our premium collection or ask our AI assistant for a personalized recommendation.
                        </p>
                    </div>
                </div>

                <div className="container">
                    <div className={styles.grid}>
                        {phones.map(phone => (
                            <ProductCard key={phone.id} product={phone} />
                        ))}
                    </div>
                </div>
            </main>

            <RagChat />
        </>
    );
}
