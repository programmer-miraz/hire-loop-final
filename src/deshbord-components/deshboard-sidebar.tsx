
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
import {
  Briefcase,
  Building,
  BookmarkCheck,
  ChartColumn,
  CircleUser,
  FileText,
  LayoutDashboard,
  Plus,
  Settings,
  Users,
  ClipboardList,
  BriefcaseBusiness,
  Building2,
  CreditCard,
  Bookmark,
  Receipt,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import Link from "next/link"

// One menu item = id, name, url and an icon (lucide component)
type MenuItem = {
  id: number;
  name: string;
  url: string;
  icon: LucideIcon;
};

// Menu items for each role — the values must match the role saved at sign-up
const menuItemByRole: Record<string, MenuItem[]> = {
  seeker: [
    { id: 1, name: "Deshboard", url: "/dashboard/seeker", icon: LayoutDashboard },
    { id: 2, name: "Jobs", url: "/dashboard/admin/jobs", icon: Briefcase },
    { id: 3, name: "Saved Jobs", url: "/dashboard/admin/saved-jobs", icon: Bookmark },
    { id: 4, name: "My Applications", url: "/dashboard/seeker/applications", icon: FileText },
    { id: 5, name: "Billing", url: "/dashboard/admin/billing", icon: Receipt },
    { id: 6, name: "Settings", url: "/dashboard/recruiter/settings", icon: Settings },
  ],
  recruiter: [
    { id: 1, name: "Deshboard", url: "/dashboard/recruiter", icon: LayoutDashboard },
    { id: 2, name: "Add Job", url: "/dashboard/recruiter/new-jobs", icon: Plus },
    { id: 3, name: "Manage Jobs", url: "/dashboard/recruiter/manage-jobs", icon: BriefcaseBusiness },
    { id: 4, name: "Application", url: "/dashboard/recruiter/application", icon: ClipboardList },
    { id: 5, name: "Settings", url: "/dashboard/recruiter/settings", icon: Settings },


  ],
  admin: [
    { id: 1, name: "Deshboard", url: "/dashboard/admin", icon: LayoutDashboard },
    { id: 2, name: "Users", url: "/dashboard/admin/users", icon: Users },
    { id: 3, name: "Companies", url: "/dashboard/admin/companies", icon: Building2 },
    { id: 4, name: "Jobs", url: "/dashboard/admin/jobs", icon: Briefcase },
    { id: 5, name: "Payments", url: "/dashboard/admin/payments", icon: CreditCard },
    { id: 6, name: "Settings", url: "/dashboard/admin/settings", icon: Settings },
  ]
}

export function Deshboard_Sidebar() {
  const { data: session, isPending } = useSession()

  const role = (session?.user?.role || "seeker") as keyof typeof menuItemByRole

  return (
    <Sidebar className="text-white"
      style={{ "--sidebar": "#08080A" } as React.CSSProperties}>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup >
          <SidebarMenu>
            {
              menuItemByRole[role].map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton render={<Link href={item.url} />}>
                    <item.icon />
                    <span>{item.name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))
            }
          </SidebarMenu>
        </SidebarGroup>

      </SidebarContent>

      <SidebarFooter />
    </Sidebar>
  )
}
