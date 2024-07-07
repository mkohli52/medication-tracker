import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request) {
    try {
        const body = await request.json();
        const { name, frequency, dosage, medicationId } = body;

        if (!name || !frequency || !dosage || !medicationId) {
            return NextResponse.json({ error: 'Fields are required' }, { status: 400 });
        }

        const medication = await prisma.medication.update({
            where: { id: medicationId },
            data: {
                name: name,
                frequency: frequency,
                dosage: dosage,
            }
        })

        if (!medication) {
            return NextResponse.json({ error: 'Medication not found' }, { status: 404 });
        }

        return NextResponse.json(medication, { status: 201 });
    } catch (error) {
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