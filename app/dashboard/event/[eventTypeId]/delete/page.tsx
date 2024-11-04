import { DeleteEventTypeAction } from '@/app/actions';
import { SubmitButton } from '@/app/components/SubmitButtons';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

const DeleteRoute = ({ params }: { params: { eventTypeId: string } }) => {
    return (
        <div className="flex-1 flex items-center justify-center">
          <Card className='max-w-[450px] w-full '>
            <CardHeader>
              <CardTitle>Delete Event Type</CardTitle>
              <CardDescription>
                Are you sure you want to delete this event?
              </CardDescription>
            </CardHeader>
            <CardFooter className="w-full flex justify-between">
              <Button asChild variant="secondary">
                <Link href="/dashboard">Cancel</Link>
              </Button>
              <form action={DeleteEventTypeAction}>
                <Input type="hidden" name="id" value={params.eventTypeId} />
                <SubmitButton text='Delete Event' variant="destructive" />
              </form>
            </CardFooter>
          </Card>
        </div>
    );
}

export default DeleteRoute
