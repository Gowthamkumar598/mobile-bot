"use client";

import { useCart } from '@/context/CartContext';
import { XIcon } from '@/components/Icons';
import styles from './CartDrawer.module.css';

export default function CartDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const { items, removeFromCart, total } = useCart();

    if (!isOpen) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.drawer}>
                <div className={styles.header}>
                    <h2>Your Cart</h2>
                    <button onClick={onClose} className={styles.closeBtn}>
                        <XIcon />
                    </button>
                </div>

                <div className={styles.items}>
                    {items.length === 0 ? (
                        <div className={styles.emptyState}>Your cart is empty.</div>
                    ) : (
                        items.map(item => (
                            <div key={item.id} className={styles.item}>
                                <img src={item.image} alt={item.name} className={styles.itemImage} />
                                <div className={styles.itemInfo}>
                                    <div className={styles.itemName}>{item.name}</div>
                                    <div className={styles.itemPrice}>${item.price} x {item.quantity}</div>
                                </div>
                                <button onClick={() => removeFromCart(item.id)} className={styles.removeBtn}>
                                    Remove
                                </button>
                            </div>
                        ))
                    )}
                </div>

                <div className={styles.footer}>
                    <div className={styles.totalRow}>
                        <span>Total:</span>
                        <span className={styles.totalAmount}>${total.toLocaleString()}</span>
                    </div>
                    <button className={`btn btn-primary ${styles.checkoutBtn}`} disabled={items.length === 0}>
                        Checkout
                    </button>
                </div>
            </div>
        </div>
    );
}
