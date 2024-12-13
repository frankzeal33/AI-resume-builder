import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
  import { Laptop, Moon, Sun } from "lucide-react";
  import { useTheme } from "./../../context/theme-provider"
import { Button } from "../ui/button";

const Theme = () => {
    const { setTheme } = useTheme()
    
  return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="outline">
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}><Sun/>Light</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}><Moon/>Dark</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}><Laptop/>System</DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Theme