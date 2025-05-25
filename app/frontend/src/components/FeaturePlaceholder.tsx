import React from 'react';
import { cn } from "@/lib/utils";

export const FeaturePlaceholder = ({className}: {className?: string}) => {
  return (
    <section className={cn("bg-background py-12", className)}>
      <div className={cn("w-200 h-75 mx-auto rounded-md flex items-center justify-center -mt-24",className)}>
        {/* <span className={cn("text-gray-500", className)}></span> */}
        <img src="asset-3d.png" className="w-160 h-auto"/>
      </div>
    </section>
  );
}

