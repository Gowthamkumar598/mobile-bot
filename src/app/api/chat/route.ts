import { NextResponse } from 'next/server';
import { processRagQuery } from '@/lib/rag';

export async function POST(request: Request) {
    try {
        const { message } = await request.json();
        const result = await processRagQuery(message);
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to process' }, { status: 500 });
    }
}
