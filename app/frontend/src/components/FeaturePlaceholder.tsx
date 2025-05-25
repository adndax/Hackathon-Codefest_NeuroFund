import React from 'react';
import { cn } from "@/lib/utils";

type FeaturePlaceholderProps = {
  className?: string;
  imageSrc?: string;
};

export const FeaturePlaceholder = ({ className, imageSrc = "asset-3d.png" }: FeaturePlaceholderProps) => {
  return (
    <section className={cn("bg-background py-12", className)}>
      <div className={cn("w-200 h-75 mx-auto rounded-md flex items-center justify-center -mt-24", className)}>
        <img src={imageSrc} className="w-160 h-auto" />
      </div>
    </section>
  );
};
