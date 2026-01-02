"use client";

import { useState, useRef, useEffect } from 'react';
import { SparklesIcon, XIcon } from './Icons';
import { Product } from '@/types';
import ProductCard from './ProductCard';
import styles from './RagChat.module.css';

interface Message {
    role: 'user' | 'assistant';
    content: string;
    recommendations?: Product[];
}

export default function RagChat() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: 'assistant', content: 'Hi! I can help you find the perfect phone. Try saying "I want a good camera under $800".' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMsg = input;
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
        setIsLoading(true);

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMsg }),
            });

            const data = await res.json();

            setMessages(prev => [...prev, {
                role: 'assistant',
                content: data.message,
                recommendations: data.recommendedProducts
            }]);
        } catch (error) {
            setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I'm having trouble connecting right now." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Floating Toggle Button */}
            <button
                className={styles.toggleBtn}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle AI Assistant"
            >
                {isOpen ? <XIcon /> : <SparklesIcon />}
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className={`animate-fade-in ${styles.chatWindow}`}>
                    <div className={styles.header}>
                        <div className={styles.headerTitle}>
                            <SparklesIcon size={18} />
                            <span>AI Assistant</span>
                        </div>
                        <button onClick={() => setIsOpen(false)} className={styles.closeBtn}>
                            <XIcon size={18} />
                        </button>
                    </div>

                    <div className={styles.messages} ref={scrollRef}>
                        {messages.map((msg, i) => (
                            <div key={i} className={`${styles.message} ${msg.role === 'user' ? styles.user : styles.assistant}`}>
                                <div className={styles.bubble}>
                                    {msg.content}
                                </div>

                                {msg.recommendations && msg.recommendations.length > 0 && (
                                    <div className={styles.recommendations}>
                                        {msg.recommendations.map(product => (
                                            <div key={product.id} className={styles.miniCard}>
                                                <img src={product.image} alt={product.name} className={styles.miniImg} />
                                                <div className={styles.miniInfo}>
                                                    <div className={styles.miniName}>{product.name}</div>
                                                    <div className={styles.miniPrice}>${product.price}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                        {isLoading && (
                            <div className={`${styles.message} ${styles.assistant}`}>
                                <div className={styles.bubble}>
                                    <div className={styles.typing}><span>.</span><span>.</span><span>.</span></div>
                                </div>
                            </div>
                        )}
                    </div>

                    <form onSubmit={handleSubmit} className={styles.inputArea}>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask about phones..."
                            className={styles.input}
                        />
                        <button type="submit" className={styles.sendBtn} disabled={isLoading}>
                            Send
                        </button>
                    </form>
                </div>
            )}
        </>
    );
}
