import React from 'react';
import { cn } from "@/lib/utils";

export const FeaturePlaceholder = ({className}: {className?: string}) => {
  return (
    <section className={cn("bg-background py-12", className)}>
      <div className={cn("w-100 h-75 mx-auto rounded-md h-64 flex items-center justify-center",className)}>
        <span className={cn("text-gray-500", className)}></span>
        <img src="asset-3d.png"/>
      </div>
    </section>
  );
}

