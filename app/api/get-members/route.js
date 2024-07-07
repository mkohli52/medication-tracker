import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request) {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to start of today

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1); // Set to start of tomorrow
    try {
        const patients = await prisma.patient.findMany({
            include: {
                medications: true,
                logs: {
                    where: {
                        givenAt: {
                            gte: today,
                            lt: tomorrow
                        }
                    }
                }
            }
        });

        const processedPatients = patients.map(patient => ({
            ...patient,
            logs: patient.logs.map(log => ({
                ...log,
                timeOfDay: getTimeOfDay(log.givenAt)
            }))
        }));

        return NextResponse.json(processedPatients, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error Finding Patient' }, { status: 500 });
    }
}

export async function OPTIONS() {
    return NextResponse.json({}, {
        headers: { 'Allow': 'GET' }
    });
}

export function fallback() {
    return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
}

function getTimeOfDay(date) {
    const hour = date.getHours();
    if (hour >= 5 && hour < 12) return "MORNING";
    if (hour >= 12 && hour < 18) return "AFTERNOON";
    return "NIGHT";
}