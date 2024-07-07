import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request) {
    try {
        const body = await request.json();
        const { member } = body;

        if (!member) {
            return NextResponse.json({ error: 'Name is required' }, { status: 400 });
        }

        const patient = await prisma.patient.create({
            data: { name: member },
        });

        return NextResponse.json(patient, { status: 201 });
    } catch (error) {
        console.error('Error creating patient:', error);
        return NextResponse.json({ error: 'Failed to create patient' }, { status: 500 });
    }
}

export async function OPTIONS() {
    return NextResponse.json({}, {
        headers: { 'Allow': 'POST' }
    });
}

export function fallback() {
    return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
}