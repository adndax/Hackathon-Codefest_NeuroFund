import React from "react";
import { cn } from "@/lib/utils";

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 9665563c4ec80940335652b3094a553ebf607227
// BlueButton component
type BlueButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  className?: string;
};

export const BlueButton = ({ children, className, ...props }: BlueButtonProps) => {
  return (
    <button
      className={cn(
        "px-12 py-3 mt-15 font-inter font-semibold text-[20px] rounded-md bg-[#A7C4EC] bg-opacity-85 text-background text-sm cursor-pointer hover:-translate-y-1 transform transition duration-200 hover:shadow-md",
        className
      )}
      {...props}
<<<<<<< HEAD
=======
export const BlueButton = ({ children, className, onClick }: { children: React.ReactNode, className?: string, onClick?: () => void }) => {
  return (
    <button
      onClick={onClick}
      className="px-12 py-3 mt-15 font-inter font-semibold text-[20px] rounded-md bg-[#A7C4EC] bg-opacity-85 text-background text-sm cursor-pointer hover:-translate-y-1 transform transition duration-200 hover:shadow-md z-10"
=======
>>>>>>> 9665563c4ec80940335652b3094a553ebf607227
    >
      {children}
    </button>
  );
};

<<<<<<< HEAD
export const NextDelButton = ({ children, className, onClick }: { children: React.ReactNode, className?: string, onClick?: () => void }) => {
  return (
    <button
      onClick={onClick}
      className={cn("px-8.5 py-2 text-foreground font-bold hover:bg-tertiary rounded-md hover:text-background transition-colors cursor-pointer", className)}
>>>>>>> e2437348d932c5e8720f2accb3201eca7439a1e8
    >
      {children}
    </button>
  );
<<<<<<< HEAD
};

=======
>>>>>>> 9665563c4ec80940335652b3094a553ebf607227
// NextDelButton component
type NextDelButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  className?: string;
};

export const NextDelButton = ({ children, className, ...props }: NextDelButtonProps) => {
  return (
    <button
      className={cn(
        "px-8.5 py-2 text-foreground font-bold hover:bg-tertiary rounded-md hover:text-background transition-colors cursor-pointer",
        className
      )}
      {...props}

    >
      {children}
    </button>
  );
};
<<<<<<< HEAD
=======
};
>>>>>>> e2437348d932c5e8720f2accb3201eca7439a1e8
=======
>>>>>>> 9665563c4ec80940335652b3094a553ebf607227
