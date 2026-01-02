"use client";

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { ShoppingCartIcon, SparklesIcon } from './Icons';
import styles from './Header.module.css';

export default function Header({ onOpenCart }: { onOpenCart: () => void }) {
    const { count } = useCart();

    return (
        <header className={styles.header}>
            <div className={`container ${styles.container}`}>
                <Link href="/" className={styles.logo}>
                    <div className={styles.logoIcon}>
                        <SparklesIcon size={20} />
                    </div>
                    <span className={styles.logoText}>Mobile Cart</span>
                </Link>

                <button className={styles.cartButton} onClick={onOpenCart}>
                    <ShoppingCartIcon size={24} />
                    {count > 0 && <span className={styles.badge}>{count}</span>}
                </button>
            </div>
        </header>
    );
}
