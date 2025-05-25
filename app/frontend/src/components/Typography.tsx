import { cn } from "@/lib/utils";
import React from "react";

export const Header = ({children, className}: {children: React.ReactNode, className?: string }) => {
    return (
        <h1 className={cn("font-semibold font-sans text-[32px] text-center", className,)}>{children}</h1>
    )
}

export const Paragraph = ({children, className}: {children: React.ReactNode, className?: string}) => {
    return (
        <p className={cn("font-medium font-inter text-[16px] text-center", className,)}>{children}</p>
    )
}


