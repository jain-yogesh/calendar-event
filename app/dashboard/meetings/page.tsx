import { cancelMeetingAction } from "@/app/actions";
import EmptyState from "@/app/components/EmptyState";
import { SubmitButton } from "@/app/components/SubmitButtons";
import prisma from "@/app/lib/db"
import { requireUser } from "@/app/lib/hooks";
import { nylas } from "@/app/lib/nylas";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { format, fromUnixTime } from "date-fns";
import { Video } from "lucide-react";

const getData = async (userId : string) => {
    const userData = await prisma.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            grantId: true,
            grantEmail: true,
        }
    });

    if(!userData){
        throw new Error("User not found");
    }

    const data = await nylas.events.list({
        identifier: userData.grantId as string,
        queryParams: {
            calendarId: userData.grantEmail as string,
        },
    });

    //console.log(data.data[1]);
    return data;
}

const MeetingRoute = async () => {
    const session = await requireUser();
    const data = await getData(session.user?.id as string);
  return (
    <>
        {data.data.length < 1 ? (
            <EmptyState title="No meeting found" description="You dont have any meeting yet." buttonText="Create a new event type" href="/dashboard/new" />
        ) : (
            <Card>
                <CardHeader>
                    <CardTitle>Booking</CardTitle>
                    <CardDescription>See upcoming event which where booked with and see the event type link.</CardDescription>
                </CardHeader>
                <CardContent>
                    {data.data.map((item) => (
                        <form action={cancelMeetingAction} key={item.id}>
                            <Input type="hidden" name="eventId" value={item.id} />
                            <div className="grid grid-cols-3 justify-between items-center">
                                <div>
                                    <p className="text-muted-foreground text-sm">
                                        {/* @ts-ignore */}
                                        {format(fromUnixTime(item.when.startTime), "EEE, dd MMM")}
                                    </p>
                                    <p className="text-muted-foreground text-xs pt-1">
                                        {/* @ts-ignore */}
                                        {format(fromUnixTime(item.when.startTime), "hh:mm a")} - 
                                        {" "}
                                        {/* @ts-ignore */}
                                        {format(fromUnixTime(item.when.endTime), "hh:mm a")}
                                    </p>
                                    <div className="flex items-center mt-1">
                                        <Video className="size-4 mr-2 text-primary" />
                                        <a className="text-xs text-primary underline underline-offset-4" href={item.conferencing ? 
                                            //@ts-ignore
                                            item.conferencing.details.url : "#"} target="_blank">Join Meeting</a>
                                    </div>
                                </div>

                                <div className="flex flex-col items-start">
                                    <h2 className="text-sm font-medium">
                                        {item.title}
                                    </h2>
                                    <p className="text-sm text-muted-foreground">You and {item.participants[0] ? item.participants[0].name : ""}</p>
                                </div>

                                <SubmitButton text="Cancel Event" variant={"destructive"} className="w-fit flex ml-auto"/>
                            </div>
                            <Separator className="my-3" />
                        </form>
                    ))}
                </CardContent>
            </Card>
        )}
    </>
  )
}

export default MeetingRoute
