import { cn } from "../lib/utils";

export const InputText = ({ children, className, label, value, onChange}: {children: React.ReactNode, className?: string, label: string, value: string, onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void}) => {
    return (
        <div>
            <label htmlFor={label} className={cn("block font-medium font-inter text-foreground text-[16px] text-left mb-1", className)}>{children}</label>
            <input
                id={label}
                name={label}
                type="text"
                value={value}
                onChange={onChange}
                placeholder ={`Enter a ${label}...`}
                className="w-full bg-transparent border border-[#A7C4EC] text-foreground rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    )
}

export const TextArea = ({ children, className, label, value, rows, onChange}: { children: React.ReactNode, className?: string, label: string, value: string, rows: number, onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void}) => {
    return (
        <div>
            <label htmlFor={label} className="block font-medium font-inter text-foreground text-[16px] text-left mb-1">Description</label>
            <textarea
                id={label}
                name={label}
                rows={rows}
                value={value}
                onChange={onChange}
                placeholder={`Enter a ${label}...`}
                className="w-full bg-transparent border border-[#A7C4EC] text-foreground rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    )
}
