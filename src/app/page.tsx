import { auth } from "@/auth";
import LogoutBtn from "@/components/logout-button";
import { CarrouselFlowBite } from "@/components/template/landing/carrousel";
import { FooterLandingPage } from "@/components/template/landing/Footer";
import NavbarLandingPage from "@/components/template/landing/navbar-LandingPage";
import SecuritySection from "@/components/template/landing/SeguritySection";
import StepPage from "@/components/template/landing/StepPage";

export default async function Home() {
  const session = await auth();
  console.log({ session });

  return (
    <div className=" justify-around items-center flex-col ">
      <NavbarLandingPage />
      <CarrouselFlowBite />
      <StepPage />
      <SecuritySection />
      <FooterLandingPage />
    </div>
  );
}
