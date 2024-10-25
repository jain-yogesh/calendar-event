import RenderCalendar from "@/app/components/bookingForm/RenderCalendar";
import prisma from "@/app/lib/db"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator";
import { CalendarX2, Clock, VideoIcon } from "lucide-react";
import Image from "next/image"
import { notFound } from "next/navigation";

const getData = async (eventUrl : string, userName : string) => {
    const data = await prisma.eventType.findFirst({
        where: {
            url: eventUrl,
            User: {
                userName: userName,
            },
            active: true,
        },
        select: {
            id: true,
            description: true,
            title: true,
            duration: true,
            videoCallSoftware: true,
            User: {
                select: {
                    image: true,
                    name: true,
                    availability: {
                        select: {
                            day: true,
                            isActive: true,
                        },
                    },
                },
            },
        },
    });

    if(!data){
        return notFound();
    }

    return data;
}

const BookingFormRoute = async ({params, searchParams,} : {params: {username: string; eventUrl: string}; searchParams: {date?: string} }) => {
    
    const data = await getData(params.eventUrl, params.username);
    const selectedDate = searchParams.date ? new Date(searchParams.date) : new Date();
    const formattedDate = new Intl.DateTimeFormat("en-US", {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    }).format(selectedDate);

  return (
    <div className="min-h-screen w-screen flex items-center justify-center">
        <Card className="max-w-[1000px] w-full mx-auto">
            <CardContent className="p-5 md:grid md:grid-cols-[1fr,auto,1fr,auto,1fr] gap-4">
                <div>
                    <Image src={data.User?.image as string} alt="Profile Image of User" width={20} height={20} unoptimized className="rounded-full" />
                    <p className="text-sm font-medium text-muted-foreground mt-1">{data.User?.name}</p>
                    <h1 className="text-xl font-semibold mt-2">{data.title}</h1>
                    <p className="text-sm font-medium text-muted-foreground">{data.description}</p>
                    <div className="mt-5 flex flex-col gap-y-3">
                        <p className="flex items-center">
                            <CalendarX2 className="size-4 mr-2 text-primary" />
                            <span className="text-sm font-medium text-muted-foreground">
                                {formattedDate}
                            </span>
                        </p>
                        <p className="flex items-center">
                            <Clock className="size-4 mr-2 text-primary" />
                            <span className="text-sm font-medium text-muted-foreground">
                                {data.duration} Minutes
                            </span>
                        </p>
                        <p className="flex items-center">
                            <VideoIcon className="size-4 mr-2 text-primary" />
                            <span className="text-sm font-medium text-muted-foreground">
                                {data.videoCallSoftware}
                            </span>
                        </p>
                    </div>
                </div>
                <Separator orientation="vertical" className="h-full w-[1px]" />
                <RenderCalendar availability={data.User?.availability as any} />
            </CardContent>
        </Card>
    </div>
  )
}

export default BookingFormRoute
