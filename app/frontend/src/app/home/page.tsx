"use client";
import { NavigationBar }  from "@/components/Navbar";
import { navItemsUnloggedIn } from "../../../data/data";
import { BlueButton } from "@/components/Button";
import { FeaturePlaceholder } from "@/components/FeaturePlaceholder";


export default function LandingPage() {

  return (
  <>
  <NavigationBar navItems={navItemsUnloggedIn} current_item="Home" login={false}/>
    <div className="pt-40 flex flex-col items-center">
      <h1 className="w-1/2 mx-auto font-semibold font-sans text-[32px] text-center">Bridge the Future: Fund Innovation, Empower Research</h1>
      <p className="px-50 mt-10 font-medium font-inter text-[16px] text-center" >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tempus  arcu nec elit sollicitudin porttitor. Etiam id quam quis tortor  hendrerit rhoncus. Donec vel urna neque. Aliquam pellentesque varius  felis a suscipit.</p>
      <BlueButton>Get Started</BlueButton>
    </div>
  <FeaturePlaceholder className="w-200 mx-auto"/>
  </>
  );
}