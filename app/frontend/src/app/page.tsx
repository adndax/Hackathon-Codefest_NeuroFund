"use client";
import { NavigationBar }  from "@/components/Navbar";
import { navItemsUnloggedIn, navItemsLoggedIn } from "../../data/data";
import { BlueButton } from "@/components/Button";
import { FeaturePlaceholder } from "@/components/FeaturePlaceholder";
import { Header,Paragraph } from "@/components/Typography";
import { useRouter } from 'next/navigation';
import { useAuth } from "@/context/AuthContext";

export default function LandingPage() {
  const router = useRouter();
  const { isLoggedIn, user } = useAuth(); // Ambil status login dan user dari context

  const handleButtonClick = () => {
    router.push("/sign-up");
  };

  // Tentukan navItems berdasarkan status login
  const navItems = isLoggedIn 
    ? navItemsLoggedIn(isLoggedIn, user?.role as "Researcher" | "Investor") 
    : navItemsUnloggedIn;

  return (
  <div>
    <NavigationBar 
      navItems={navItems} 
      current_item="Home" 
      login={isLoggedIn}
      role={user?.role as "Researcher" | "Investor"} // Pass role dari user object
    />
      <div className="pt-40 flex flex-col items-center">
        <Header className="w-1/2 mx-auto">the Future: Fund Innovation, Empower Research</Header>
        <Paragraph className="px-50 mt-10">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tempus  arcu nec elit sollicitudin porttitor. Etiam id quam quis tortor  hendrerit rhoncus. Donec vel urna neque. Aliquam pellentesque varius  felis a suscipit.
        </Paragraph>
        <BlueButton onClick={handleButtonClick}>Get Started</BlueButton>
      </div>
    <FeaturePlaceholder className="w-200 mx-auto" imageSrc="/asset-3d.png"/>
  </div>
  );
}