"use client"
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useForm } from 'react-hook-form';
import { Button } from "@/components/ui/button"
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

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const formSchema = z.object({
    name: z.string().min(1, {
        message: "Medicine name must be at least 1 character.",
    }),
    dosage: z.string().min(1, {
        message: "Medicine dosage must be at least 1 character.",
    }),
    patientId: z.string().min(2, {
        message: "Member name must be at least 2 characters.",
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

const AddMedication = () => {
    const { patients, loading, error, addMedication } = usePatients();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            dosage: "",
            patientId: "",
            frequency: [],
        },
    })

    function onSubmit(values) {
        try {
            addMedication(values);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <Card className="w-100">
                <CardHeader>
                    <CardTitle>
                        Add Medicine
                    </CardTitle>
                </CardHeader>
                <CardContent>
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
                            <FormField
                                control={form.control}
                                name="patientId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Member Name</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select the member" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {
                                                    patients && patients.map(patient => (
                                                        <SelectItem value={patient.id}>{patient.name}</SelectItem>
                                                    ))
                                                }
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">Submit</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </>
    )
}

export default AddMedication