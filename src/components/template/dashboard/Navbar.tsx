import { auth, signOut } from "@/auth";
import LogoutBtn from "@/components/logout-button";
import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";

export async function NavbarDashboard() {
    const session = await auth()
    console.log({session})
  return (
    <Navbar fluid rounded>
      <NavbarBrand href="https://flowbite-react.com">
        
      <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white ">
          Flowbite React
        </span>
      </NavbarBrand>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar
              alt="User settings"
              img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              rounded
            />
          }
        >
          <DropdownHeader>
            <span className="block text-sm">{session?.user.name}</span>
            <span className="block truncate   text-sm font-medium">
            {session?.user.email}
            </span>
          </DropdownHeader>
          <DropdownItem>Settings</DropdownItem>
          <DropdownItem></DropdownItem>
          <DropdownDivider />
          <DropdownItem className="flex items-center justify-center w-full" >
            <LogoutBtn />
          </DropdownItem>
        </Dropdown>
        <NavbarToggle />
      </div>
      <NavbarCollapse>
        <NavbarLink href="#" active>
          Home
        </NavbarLink>
        <NavbarLink href="#">About</NavbarLink>
        <NavbarLink href="#">Services</NavbarLink>
        <NavbarLink href="#">Pricing</NavbarLink>
        <NavbarLink href="#">Contact</NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
}