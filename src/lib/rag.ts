import phones from '@/data/phones.json';
import { Product } from '@/types';

export interface RagResponse {
    message: string;
    recommendedProducts: Product[];
}

export function retrieveDocuments(query: string): Product[] {
    const q = query.toLowerCase();

    // Keyword extraction (very simple)
    const keywords = q.split(' ').filter(w => w.length > 2);

    const scores = phones.map(phone => {
        let score = 0;
        const text = `${phone.name} ${phone.brand} ${phone.description} ${phone.specs.screen} ${phone.specs.camera}`.toLowerCase();

        keywords.forEach(word => {
            if (text.includes(word)) score += 1;
        });

        // Price specific logic
        if (q.includes('under') && q.match(/(\d+)/)) {
            const match = q.match(/under\s?\$?(\d+)/);
            if (match && phone.price < parseInt(match[1])) {
                score += 2;
            }
        }

        if (q.includes('cheap') && phone.price < 600) score += 2;
        if (q.includes('expensive') || q.includes('premium')) {
            if (phone.price > 900) score += 2;
        }

        return { phone, score };
    });

    // Sort by score and take top 3
    return scores
        .filter(item => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 3)
        .map(item => item.phone);
}

export function generateResponse(query: string, context: Product[]): string {
    if (context.length === 0) {
        return "I couldn't find any phones causing that criteria. Try asking for a specific brand like 'Samsung' or 'camera'.";
    }

    const names = context.map(p => p.name).join(', ');

    // Simple templates based on keywords
    if (query.toLowerCase().includes('camera')) {
        return `For photography, I recommend: ${names}. These have excellent camera systems.`;
    }

    if (query.toLowerCase().includes('cheap') || query.toLowerCase().includes('budget')) {
        return `For a great value, check out: ${names}.`;
    }

    return `Based on your request, I think you'll love: ${names}.`;
}

export async function processRagQuery(query: string): Promise<RagResponse> {
    // Simulate delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const docs = retrieveDocuments(query);
    const response = generateResponse(query, docs);

    return {
        message: response,
        recommendedProducts: docs
    };
}
