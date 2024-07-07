import React from 'react'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from '../ui/input';
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useForm } from 'react-hook-form';
import { Checkbox } from "@/components/ui/checkbox"

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { usePatients } from '@/contexts/PatientContext';
import { useToast } from "@/components/ui/use-toast"


const formSchema = z.object({
    name: z.string().min(1, {
        message: "Medicine name must be at least 1 character.",
    }),
    dosage: z.string().min(1, {
        message: "Medicine dosage must be at least 1 character.",
    }),
    frequency: z.array(z.enum(['morning', 'afternoon', 'night']))
        .min(1, {
            message: "At least one frequency must be selected.",
        })
})

const items = [
    {
        id: "morning",
        label: "Morning",
    },
    {
        id: "afternoon",
        label: "Afternoon",
    },
    {
        id: "night",
        label: "Night",
    },
];

const InformationEditDialog = ({ medication }) => {
    const { patients, loading, error, editMedication } = usePatients();
    const [open, setOpen] = React.useState(false);
    const { toast } = useToast()


    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: medication.name,
            dosage: medication.dosage,
            frequency: medication.frequency,
        },
    })

    async function onSubmit(values) {
        try {
            values["medicationId"] = medication.id;
            await editMedication(values);
            setOpen(false)
            toast({
                duration: 3000,
                variant: "success",
                description: "Medication Updated Successfully",
            })
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Dialog open={open} onOpenChange={setOpen} >
            <DialogTrigger asChild>
                <Button variant="outline">Edit Medication</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Medication</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Medicine Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Name of the Medicine" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Enter Medicine's Name
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="dosage"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Medicine Dosage</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Dosage of the Medicine" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="items"
                            render={() => (
                                <FormItem>
                                    <div className="mb-4">
                                        <FormLabel className="text-base">Frequency</FormLabel>
                                        <FormDescription>
                                            Select the Frequency of Medicine
                                        </FormDescription>
                                    </div>
                                    {items.map((item) => (
                                        <FormField
                                            key={item.id}
                                            control={form.control}
                                            name="frequency"
                                            render={({ field }) => {
                                                return (
                                                    <FormItem
                                                        key={item.id}
                                                        className="flex flex-row items-start space-x-3 space-y-0"
                                                    >
                                                        <FormControl>
                                                            <Checkbox
                                                                checked={field.value?.includes(item.id)}
                                                                onCheckedChange={(checked) => {
                                                                    return checked
                                                                        ? field.onChange([...field.value, item.id])
                                                                        : field.onChange(
                                                                            field.value?.filter(
                                                                                (value) => value !== item.id
                                                                            )
                                                                        )
                                                                }}
                                                            />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">
                                                            {item.label}
                                                        </FormLabel>
                                                    </FormItem>
                                                )
                                            }}
                                        />
                                    ))}
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="button" variant="secondary">
                                    Close
                                </Button>
                            </DialogClose>
                            <Button type="submit" disabled={loading}>Save changes</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default InformationEditDialog