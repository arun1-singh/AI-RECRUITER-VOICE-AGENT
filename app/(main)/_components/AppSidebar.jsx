// import { Button } from "@/components/ui/button"
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarFooter,
//   SidebarGroup,
//   SidebarHeader,
  
// } from "@/components/ui/sidebar"
// import { Plus } from "lucide-react"
// import Image from "next/image"

// export function AppSidebar() {
//   return (
//     <Sidebar>
//       <SidebarHeader className="flex items-center mt-5">
//        <Image src={'/ai-recruit-logo.png'} alt="logo" width={200} height={100} className="w-[150px]"/>
//        <Button className="w-full mt-5"><Plus/> Create New Interview</Button>
//        </SidebarHeader>
//       <SidebarContent>
//         <SidebarGroup />
//         <SidebarGroup />
//       </SidebarContent>
//       <SidebarFooter />
//     </Sidebar>
    
//   )
// }
"use client"
import { SideBarOptions } from "@/app/auth/services/Constants";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function AppSidebar() {

    const path=usePathname();
    console.log(path);
  return (
    <Sidebar>
      <SidebarHeader className="flex flex-col items-center mt-5 gap-4">
        {/* Logo with white background and rounded container */}
        <div className="bg-white p-3 rounded-xl shadow-sm">
          <Image
            src={"/ai-recruit-logo.png"}
            alt="logo"
            width={160}
            height={80}
            className="object-contain"
          />
        </div>
      
        <Link href = {'/dashboard/create-interview'} >
        <Button className="w-full mt-2">
          <Plus className="mr-2 h-4 w-4" />
          Create New Interview
        </Button>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup >
          <SidebarContent>
            <SidebarMenu>
                {SideBarOptions.map((option,index)=>(
                    <SidebarMenuItem key={index} className='p-1'>
                        <SidebarMenuButton asChild className={`p-5 ${path==option.path&& 'bg-blue-100'}`}>
                            <Link href={option.path}>
                            <option.icon className={`${path==option.path&& 'text-primary'}`}/>
                            <span className={`text-[16px] font-medium ${path==option.path&& 'text-primary'}`}>{option.name}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
          </SidebarContent>
    
        </SidebarGroup >
      </SidebarContent>

      <SidebarFooter />
    </Sidebar>
  );
}
