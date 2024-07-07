"use client"
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useForm } from 'react-hook-form';
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

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

const formSchema = z.object({
    member: z.string().min(2, {
        message: "Member name must be at least 2 characters.",
    }),
})

const AddMember = () => {
    const { loading, error, addPatient } = usePatients();
    const { toast } = useToast();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            member: "",
        },
    })

    async function onSubmit(values) {
        try {
            await addPatient(values);
            toast({
                duration: 3000,
                variant: "success",
                description: "Member Added Successfully",
            })
            form.reset();
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <Card className="w-100">
                <CardHeader>
                    <CardTitle>
                        Add Member
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="member"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Member Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Name of the Member" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Enter Member's Name
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" disabled={loading}>Submit</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </>
    )
}

export default AddMember