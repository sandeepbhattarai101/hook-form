"use client";

import * as React from "react";

import { cn } from "@/app/lib/utils";

const Input = React.forwardRef(
  ({ className, type, maxLength = "101", ...props }, ref) => {
    return (
      <input
        type={type}
        autoComplete="off"
        maxLength={maxLength}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#999999] placeholder:text-sm placeholder:font-normal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-95",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
