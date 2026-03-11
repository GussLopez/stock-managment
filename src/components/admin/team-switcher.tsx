"use client"

import * as React from "react"
import { ChevronsUpDown, Package, Plus, Store } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { useUserStore } from "@/store/UserStore"
import { useQuery } from "@tanstack/react-query"
import { getBusinessByUserId } from "@/lib/services/businessService"
import { useBusinessStore } from "@/store/BusinessStore"
import { Skeleton } from "../ui/skeleton"

export function TeamSwitcher() {
  const userId = useUserStore((state) => state.id);
  const { isMobile } = useSidebar()
  const setBussines = useBusinessStore(state => state.setBusiness)
  const activeBusiness = useBusinessStore(state => state)
  const { data: businesses, isLoading } = useQuery({
    queryKey: ["business", userId],
    queryFn: async () => await getBusinessByUserId(userId!),
    enabled: !!userId,
    staleTime: 1000 * 60 * 30,
  })
  React.useEffect(() => {
    if (businesses?.length) {
      const business = businesses[0];

      setBussines({
        id: business.id,
        name: business.name,
        owner_id: business.owner_id,
        plan: business.plan ?? "free",
        created_at: business.created_at || ""
      })
    }
  }, [businesses, setBussines])

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="bg-primary text-white flex aspect-square size-8 items-center justify-center rounded-lg">
                <Package className="size-5" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                {isLoading ? (
                  <>
                    <Skeleton className="w-25 h-3" />
                    <Skeleton className="w-14 h-2 mt-2" />
                  </>
                ) : (
                  <>
                    <span className="truncate font-medium">{activeBusiness.name}</span>
                    <span className="truncate text-xs">{activeBusiness.plan === 'free' && 'Basic'}</span>
                  </>
                )}
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Tiendas
            </DropdownMenuLabel>
            {businesses?.map((business, index) => (
              <DropdownMenuItem
                key={business.id}
                // onClick={() => setActiveTeam(business)}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-md border">
                  <Store className="size-3.5 shrink-0" />
                </div>
                {business.name}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2">
              <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                <Plus className="size-4" />
              </div>
              <div className="font-medium text-muted-foreground">Agregar tienda</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
