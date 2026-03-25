import * as React from "react";

import { cn } from "@/lib/utils";

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-bg-card text-text-primary flex flex-col gap-s-24 rounded-s-12 border border-border overflow-hidden",
        className,
      )}
      {...props}
    />
  );
}


export {
  Card,
};
