import { auth } from "@/auth";
import LogoutBtn from "@/components/logout-button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarToggle,
} from "flowbite-react";

export async function NavbarDashboard() {
  const session = await auth();
  const role = session?.user.role;
  console.log({ session });
  return (
    <Navbar fluid rounded>
      <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white ">
        <SidebarTrigger />
      </span>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar img={session?.user.img} rounded>
              <div className="space-y-1 font-medium dark:text-white">
                <div>{session?.user.name}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {session?.user.email}
                </div>
              </div>
            </Avatar>
          }
        >
          <DropdownHeader>
            <span className="block text-sm">
              {role === "user" ? "Usuario Común" : "Premium"}
            </span>
            <span className="block truncate   text-sm font-medium"></span>
          </DropdownHeader>
          <DropdownItem>Settings</DropdownItem>
          <DropdownDivider />
          <DropdownItem className="flex items-center justify-center w-full">
            <LogoutBtn />
          </DropdownItem>
        </Dropdown>
      </div>
    </Navbar>
  );
}
