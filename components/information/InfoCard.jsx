import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import InformationEditDialog from '../modals/InformationEditDialog';
import TimingCheckbox from './checkbox/TimingCheckbox';

const InfoCard = ({ patient }) => {
    const medicationLog = [];
    patient.logs.forEach((log) => {
        if (!medicationLog[log.medicationId]) {
            medicationLog[log.medicationId] = [];
        }
        medicationLog[log.medicationId].push(log.timeOfDay);
    })
    return (
        <>
            <Card className="min-w-[100%]">
                <CardHeader>
                    <CardTitle>
                        {patient.name}'s Medicine
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {
                        patient.medications && patient.medications.map((medication, index) => (
                            <div className=" flex items-center space-x-4 rounded-md border p-4 bg-red-200">
                                <div className="flex-1 space-y-1">
                                    <p className="text-sm font-medium leading-none">
                                        {medication.name}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {medication.dosage}
                                    </p>
                                    <p className="text-sm text-medium-foreground">
                                        <InformationEditDialog medication={medication} />
                                    </p>
                                </div>
                                <div>
                                    {medication.frequency.map(time => (
                                        <p className="text-sm font-light m-2 text-left">
                                            <TimingCheckbox medicationId={medication.id} patientId={patient.id} isChecked={medicationLog[medication.id]?.includes(time.toUpperCase()) ? true : false} timeOfTheDay={time.toUpperCase()} />
                                        </p>
                                    ))}
                                </div>
                            </div>
                        ))
                    }
                </CardContent>
            </Card>
        </>
    )
}

export default InfoCard