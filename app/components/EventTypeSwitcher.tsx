"use client";

import { useEffect, useTransition } from "react";
import { useFormState } from "react-dom";
import { updateEventTypeStatusAction } from "../actions";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";

const MenuActiveSwitcher = ({initialChecked,eventTypeId,}: {
    eventTypeId: string;
    initialChecked: boolean;
  }) => {
  
  const [isPending, startTransition] = useTransition();
  const [state, action] = useFormState(updateEventTypeStatusAction, undefined);

  useEffect(() => {
    if (state?.status === "success") {
      toast.success(state.message);
    } else if (state?.status === "error") {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <Switch
      defaultChecked={initialChecked}
      disabled={isPending}
      onCheckedChange={(isChecked) => {
        startTransition(() => {
          action({
            isChecked: isChecked,
            eventTypeId,
          });
        });
      }}
    />
  )
}

export default MenuActiveSwitcher
