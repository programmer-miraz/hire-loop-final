import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Deshboard_Sidebar } from "@/deshbord-components/deshboard-sidebar"

export default function Deshboard_Layout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider className="bg-[#0E0E11] ">
            <Deshboard_Sidebar/>
            <main className="flex-1">
                <SidebarTrigger className="bg-white cursor-pointer"/>
                {children}
            </main>
        </SidebarProvider>
    )
}