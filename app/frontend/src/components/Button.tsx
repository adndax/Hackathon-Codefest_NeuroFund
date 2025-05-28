import { cn } from "@/lib/utils";

export const BlueButton = ({ children, className, onClick }: { children: React.ReactNode, className?: string, onClick?: () => void }) => {
  return (
    <button
      onClick={onClick}
      className="px-12 py-3 mt-15 font-inter font-semibold text-[20px] rounded-md bg-[#A7C4EC] bg-opacity-85 text-background text-sm cursor-pointer hover:-translate-y-1 transform transition duration-200 hover:shadow-md z-10"
    >
      {children}
    </button>
  );
};

export const NextDelButton = ({ children, className, onClick }: { children: React.ReactNode, className?: string, onClick?: () => void }) => {
  return (
    <button
      onClick={onClick}
      className={cn("px-8.5 py-2 text-foreground font-bold hover:bg-tertiary rounded-md hover:text-background transition-colors cursor-pointer", className)}
    >
      {children}
    </button>
  );
};
