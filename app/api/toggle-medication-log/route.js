import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request) {
    try {
        const body = await request.json();
        const { medicationId, patientId, timeOfDay } = body;
        const givenBy = "Sakshi";

        if (!medicationId || !patientId || !timeOfDay) {
            return NextResponse.json({ error: 'Fields are required' }, { status: 400 });
        }
        console.log(timeOfDay);
        let givenAt = new Date();
        switch (timeOfDay) {
            case "MORNING":
                givenAt.setHours(9, 0, 0, 0);
                break;
            case "AFTERNOON":
                givenAt.setHours(15, 0, 0, 0);
                break;
            case "NIGHT":
                givenAt.setHours(21, 0, 0, 0);
                break;
            default:
                break;
        }

        let medicationLog = await prisma.medicationLog.findFirst({
            where: {
                medicationId: medicationId,
                patientId: patientId,
                givenAt: givenAt
            }
        });

        if (medicationLog) {
            await prisma.medicationLog.delete({
                where: {
                    id: medicationLog.id
                }
            });
            return NextResponse.json("medication log deleted", { status: 201 });
        } else {
            medicationLog = await prisma.medicationLog.create({
                data: {
                    medicationId,
                    patientId,
                    givenBy,
                    givenAt
                }
            });
        }

        return NextResponse.json(medicationLog, { status: 201 });
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
