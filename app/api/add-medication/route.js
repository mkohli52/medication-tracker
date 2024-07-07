import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request) {
    try {
        const body = await request.json();
        const { name, frequency, dosage, patientId } = body;

        if (!name || !frequency || !dosage || !patientId) {
            return NextResponse.json({ error: 'Fields are required' }, { status: 400 });
        }

        const newMedication = await prisma.medication.create({
            data: {
                name: name,
                frequency: frequency,
                dosage: dosage,
                patientId: patientId
            }
        })

        return NextResponse.json(newMedication, { status: 201 });
    } catch (error) {
        console.error('Error creating patient:', error);
        return NextResponse.json({ error: 'Failed to create medication' }, { status: 500 });
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