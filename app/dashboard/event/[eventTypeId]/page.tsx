import EditEventTypeForm from "@/app/components/EditEventTypeForm";
import prisma from "@/app/lib/db"
import { notFound } from "next/navigation";

const getData = async (eventTypeId : string) => {
    const data = await prisma.eventType.findUnique({
        where: {
            id: eventTypeId,
        },
        select: {
            id: true,
            title: true,
            description: true,
            duration: true,
            url: true,
            videoCallSoftware: true,
        },
    });

    if(!data){
        return notFound();
    }

    return data;
}

const EditRoute = async ({params}: {params: {eventTypeId : string};}) => {
    const data = await getData(params.eventTypeId);
  return (
    <EditEventTypeForm
        description={data.description}
        duration={data.duration}
        title={data.title}
        url={data.url}
        key={data.id}
        id={data.id}
        callProvider={data.videoCallSoftware}
  />
  )
}

export default EditRoute