
"use client"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useSession } from "@/lib/auth-client"
import { Plus } from "lucide-react"
const menuItemByRole = {
  seeker: [],
  recruiter: [],
  admin: []
}

export function Deshboard_Sidebar() {
  const { data: session, isPending } = useSession()
  const role = session?.user?.role||"seeker"
  console.log(role);
  return (
    <Sidebar className="text-white"
      style={{ "--sidebar": "#08080A" } as React.CSSProperties}>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup >
          <SidebarMenu>
            {
            // menuItemByRole[role].map((item) => (
            //   <SidebarMenuItem key={item.id}>
            //     <SidebarMenuButton render={<a href={item.url} />}>
            //       <item.icon />
            //       <span>{item.name}</span>
            //     </SidebarMenuButton>
            //   </SidebarMenuItem>
            // ))
            }
          </SidebarMenu>
        </SidebarGroup>

      </SidebarContent>

      <SidebarFooter />
    </Sidebar>
  )
}