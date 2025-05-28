"use client";
import { NavigationBar }  from "@/components/Navbar";
import { navItemsUnloggedIn } from "../../data/data";
import { BlueButton } from "@/components/Button";
import { FeaturePlaceholder } from "@/components/FeaturePlaceholder";
import { Header,Paragraph } from "@/components/Typography";
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push("/sign-up");
  };

  return (
  <div>
    <NavigationBar navItems={navItemsUnloggedIn} current_item="Home" login={false}/>
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