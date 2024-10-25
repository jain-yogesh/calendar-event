import { Button } from "@/components/ui/button";
import {AriaButtonProps, useButton} from "@react-aria/button";
import {CalendarState} from 'react-stately';
import {mergeProps} from "@react-aria/utils"
import { useRef } from "react";
import {useFocusRing} from "@react-aria/focus"

const CalendarButton = (props : AriaButtonProps<"button"> & {
    state?: CalendarState;
    side?: "left" | "right";
}) => {
    const ref = useRef(null);
    const {buttonProps} = useButton(props, ref)
    const {focusProps} = useFocusRing();
  return (
    <Button
        variant={"outline"}
        ref={ref}
        disabled={props.isDisabled}
        size={"icon"} {...mergeProps(buttonProps, focusProps)}
    >
        {props.children}
    </Button>
  )
}

export default CalendarButton
