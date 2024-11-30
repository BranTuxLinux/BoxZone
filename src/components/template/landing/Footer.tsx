
"use client";

import { Footer } from "flowbite-react";

export function FooterLandingPage() {
  return (
    <Footer container className="my-8 w-[95vw] self-center mx-auto">
      <Footer.Copyright href="#" by="Brandon Quintero" year={2024} />
      <Footer.LinkGroup>
        <Footer.Link href="#">About</Footer.Link>
        <Footer.Link href="#">Privacy Policy</Footer.Link>
        <Footer.Link href="#">Licensing</Footer.Link>
        <Footer.Link href="#">Contact</Footer.Link>
      </Footer.LinkGroup>
    </Footer>
  );
}
