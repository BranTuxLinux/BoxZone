import { LogOutAuth0 } from "@/components/LoginAuth0";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
} from "flowbite-react";
import { Session } from "next-auth";

export const NavbarDashboard = ({ session }: { session: Session | null }) => {
  const { role, img, name, email } = session?.user;

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
            <Avatar img={img} rounded alt="Avatar">
              <div className="space-y-1 font-medium dark:text-white">
                <div>{name}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {email}
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

          <LogOutAuth0 />
        </Dropdown>
      </div>
    </Navbar>
  );
};
