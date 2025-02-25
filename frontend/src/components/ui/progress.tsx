import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import {cn} from "@/lib/utils"

function Progress({
                      className,
                      value = 0,
                      max = 100,
                      ...props
                  }: React.ComponentProps<typeof ProgressPrimitive.Root> & { value?: number; max?: number }) {
    return (
        <ProgressPrimitive.Root
            data-slot="progress"
            className={cn(
                "relative h-2 w-full overflow-hidden rounded-full bg-primary/20",
                className
            )}
            {...props}
        >
            <ProgressPrimitive.Indicator
                data-slot="progress-indicator"
                className="bg-primary h-full transition-all"
                style={{width: `${(value / (max || 1)) * 100}%`}} // Fixed calculation
            />
        </ProgressPrimitive.Root>
    )
}

export {Progress}
