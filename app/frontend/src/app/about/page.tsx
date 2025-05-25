"use client";
import { NavigationBar } from "@/components/Navbar";
import { Header, Paragraph } from "@/components/Typography";
import { FeaturePlaceholder } from "@/components/FeaturePlaceholder";
import { AboutSection, Benefit, Testimonials } from "@/components/About";
import { benefitsData, testimonials } from "@data";
import { navItemsUnloggedIn } from "@data";
import { useAuth } from "@/context/AuthContext";


export default function AboutPage(){
  return (
    <>
      <NavigationBar navItems={navItemsUnloggedIn} current_item="About" login={false}/>
      <FeaturePlaceholder className="pt-45" />
      <AboutSection />
      <Benefit />
      <section className="py-16 px-4 bg-gradient-to-t from-[#001124] to-background text-white text-center mt-25">
            <Header className="text-foreground">Voices of Trust</Header>
      
            <div className="grid grid-cols-1 md:grid-cols-3 max-w-6xl mx-10 mt-20">
              {testimonials.map((t) => (
                <div
                  key={t.name}
                  className="bg-gradient-to-b from-foreground/90 to-foreground/100 text-[#0A1526] rounded-xl shadow-lg p-6 flex flex-col gap-4 mx-10" 
                >
                  <blockquote className="italic font-semibold text-[16px] text-black text-left"> {t.title}</blockquote>
                  <Paragraph className={`font-normal ${t.name === "Fajar Asyraf R." ? "mt-6" : "mt-0"}`}>{t.quote}</Paragraph>
                  <div className="flex items-center gap-3 mt-auto pt-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#E3CBA5] to-[#D2B48C]" />
                    <div className="text-sm">
                      <Paragraph>{t.name}</Paragraph>
                      <Paragraph className="font-normal text-left">{t.role}</Paragraph>
                    </div>
                  </div>
                </div>
              ))}
            </div>
      
            <div className="w-screen bg-gradient-to-b from-[#001124]/60 to-[#225491]/60 py-25">
            <div className="flex flex-col items-center justify-center text-center px-4">
              <Header>Bridge the Future with Us</Header>
              <Paragraph className="font-light mt-5 max-w-2xl">
                Fund innovation, empower research, and create lasting impact today.
              </Paragraph>
            </div>
          </div>
          </section>
    </>
  );
}