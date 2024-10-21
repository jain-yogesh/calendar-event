"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useFormState } from "react-dom"
import { useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod"
import { SubmitButton } from "../components/SubmitButtons"
import { OnboardingAction } from "../actions"
import { onboardingSchema } from "../lib/zodSchemas"

const OnboardingRoute = () => {
    const [lastResult, action] = useFormState(OnboardingAction, undefined);

    const [form, fields] = useForm({
        lastResult,
        onValidate({formData}) {
            return parseWithZod(formData, {
                schema: onboardingSchema
            });
        },
        shouldValidate: 'onBlur',
        shouldRevalidate: 'onInput',
    });

  return (
    <div className="min-h-screen w-screen flex items-center justify-center">
        <Card>
            <CardHeader className="pb-10">
                <CardTitle className="text-center">Welcome to Calendar<span className="text-primary">Event</span></CardTitle>
                <CardDescription className="text-center">We need the following information to setup profile!</CardDescription>
            </CardHeader>
            <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
                <CardContent className="grid gap-y-8">
                    <div className="grid gap-y-2">
                        <Label>Full Name</Label>
                        <Input 
                        name={fields.fullName.name} 
                        defaultValue={fields.fullName.initialValue} 
                        key={fields.fullName.key} 
                        placeholder="Type Your Name" />
                        <p className="text-red-500 text-sm">{fields.fullName.errors}</p>
                    </div>
                    <div className="grid gap-y-2">
                        <Label>Username</Label>
                        <div className="flex rounded-md">
                            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-muted bg-muted text-sm text-muted-foreground">CalendarEvent.com/</span>
                        <Input 
                        placeholder="example-user-1" 
                        className="rounded-l-none"
                        name={fields.userName.name}
                        key={fields.userName.key}
                        defaultValue={fields.userName.initialValue} />
                        </div>
                        <p className="text-red-500 text-sm">{fields.userName.errors}</p>
                    </div>
                </CardContent>
                <CardFooter className="pt-5">
                    <SubmitButton text="Submit" className="w-full" />
                </CardFooter>
            </form>
        </Card>
    </div>
  )
}

export default OnboardingRoute