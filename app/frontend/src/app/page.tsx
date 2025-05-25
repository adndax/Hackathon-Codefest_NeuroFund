"use client";
import { NavigationBar }  from "@/components/Navbar";
import { navItemsUnloggedIn } from "../../data/data";
import { BlueButton } from "@/components/Button";
import { FeaturePlaceholder } from "@/components/FeaturePlaceholder";
import { Header,Paragraph } from "@/components/Typography";

export default function LandingPage() {
  return (
  <>
  <NavigationBar navItems={navItemsUnloggedIn} current_item="Home" login={false}/>
    <div className="pt-40 flex flex-col items-center items-center">
    <Header className="w-1/2 mx-auto">Bridge the Future: Fund Innovation, Empower Research</Header>
    <Paragraph className="px-50 mt-10" >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tempus  arcu nec elit sollicitudin porttitor. Etiam id quam quis tortor  hendrerit rhoncus. Donec vel urna neque. Aliquam pellentesque varius  felis a suscipit.</Paragraph>
      <BlueButton>Get Started</BlueButton>
    </div>
  <FeaturePlaceholder className="w-200 mx-auto"/>
  </>
  );
}