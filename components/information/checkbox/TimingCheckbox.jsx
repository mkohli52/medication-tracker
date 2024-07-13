import React from 'react'
import { useEffect } from 'react'
import { Checkbox } from "@/components/ui/checkbox"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { usePatients } from '@/contexts/PatientContext';



const TimingCheckbox = ({ timeOfTheDay, medicationId, patientId, isChecked }) => {
    const [open, setOpen] = React.useState(false);
    const [checked, setChecked] = React.useState(false);
    const { loading, error, toggleMedicationLog } = usePatients();

    function itemChecked(state) {
        setOpen(true);
    }

    useEffect(() => {
        setChecked(isChecked);
    }, [])

    function cancelAction() {
        setOpen(false);
    }

    async function continueAction() {
        const values = {
            patientId: patientId,
            medicationId: medicationId,
            timeOfDay: timeOfTheDay
        }
        await toggleMedicationLog(values);

        setOpen(false);
        setChecked((prev) => !prev);
    }
    return (
        <>
            <AlertDialog open={open} >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Do you want to perform this action?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={cancelAction}>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={continueAction}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog >
            <div className="flex items-center space-x-2">
                <Checkbox id={timeOfTheDay + medicationId + patientId} checked={checked} onCheckedChange={itemChecked} />
                <label
                    htmlFor={timeOfTheDay + medicationId + patientId}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    {timeOfTheDay}
                </label>
            </div>
        </>
    )
}

export default TimingCheckbox