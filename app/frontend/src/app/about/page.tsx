"use client";
import { NavigationBar } from "@/components/Navbar";
import { Header, Paragraph } from "@/components/Typography";
import { FeaturePlaceholder } from "@/components/FeaturePlaceholder";
import { benefitsData, testimonials } from "@data";
import { navItemsUnloggedIn, navItemsLoggedIn } from "@data";
import { useAuth } from "@/context/AuthContext";

export default function AboutPage(){
  const { isLoggedIn, user } = useAuth(); // Ambil status login dan user dari context

  // Tentukan navItems berdasarkan status login
  const navItems = isLoggedIn ? navItemsLoggedIn(user?.role as "Researcher" | "Investor") : navItemsUnloggedIn;

  return (
    <>
      <NavigationBar 
        navItems={navItems} 
        current_item="About" 
        login={isLoggedIn}
        role={user?.role as "Researcher" | "Investor"} // Pass role dari user object
      />
      <FeaturePlaceholder className="pt-60" imageSrc="/asset-3d-2.png"/>
      <section className="flex items-center justify-center min-h-screen text-white px-6 py-12 pr-10">
            <div className="w-full max-w-7xl flex flex-col lg:flex-row items-center lg:items-center gap-8 h-full">
            {/* Judul */}
            <div className="lg:w-1/3 text-center lg:text-left">
            <Header className="font-normal">About Us</Header>
            </div>

            {/* Garis vertikal */}
            <div className="hidden lg:block w-0.5 self-stretch bg-[#F5F8FA]" />

            {/* Deskripsi */}
            <div className="lg:w-2/3 text-sm leading-relaxed text-[#A7C4EC] text-center lg:text-left">
            <Paragraph className="lg:px-14 font-normal text-right">
                NeuroFund represents a paradigm shift in neuroscience research funding, built on the
                revolutionary Internet Computer Protocol (ICP). We've created a decentralized platform
                that eliminates traditional funding barriers while ensuring complete transparency and
                security. Our vision is simple yet powerful: democratize research funding by allowing
                the global community to discover, evaluate, and support promising neuroscience projects
                through a transparent voting mechanism. By leveraging ICP's blockchain technology, we
                guarantee immutable record-keeping, tamper-proof voting, and efficient fund
                distribution.
            </Paragraph>
            </div>
        </div>
    </section>
    <section className="flex flex-col items-center justify-center gap-10 py-16 px-4 bg-[#0A1526] text-white mt-15 mx-15">
      {benefitsData.map((section) => (
        <div
          key={section.type}
          className="relative w-full max-w-6xl bg-[#225491]/70 rounded-3xl px-6 py-10"
        >
          {/* Tab label */}
          <div
            className={`absolute -top-5 text-[#0A1526] text-xs sm:text-sm font-semibold px-6 sm:px-12 py-2 rounded-md shadow bg-[#A7C4EC] mx-4 ${
              section.type === "Researcher" ? "right-6" : "left-6"
            }`}
          >
            For {section.type}
          </div>

          {/* Benefit Items */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 place-items-stretch text-center px-2 sm:px-10">
            {section.items.map((item) => (
              <div key={item.title} className="flex flex-col items-center justify-between gap-2 sm:gap-3 h-full">
                {/* Placeholder Icon */}
                {/* <div className="w-20 h-20 sm:w-25 sm:h-25 bg-gray-300 rounded-md mt-4 sm:mt-8" /> */}
                <img src={item.icon} className="w-20 h-20"/>
                <div className="font-semibold font-inter text-foregroundtext-sm sm:text-base">
                  {item.title}
                </div>
                <p className="font-normal text-[#A7C4EC] text-xs sm:text-sm w-full px-1">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
    <section className="py-16 px-4 bg-gradient-to-t from-[#001124] to-background text-white text-center mt-25">
          <Header className="text-foreground">Voices of Trust</Header>
    
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mt-20 mx-auto gap-8">
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
      </section>
      <div className="w-screen bg-gradient-to-b from-[#001124]/60 to-[#225491]/60 py-25">
        <div className="flex flex-col items-center justify-center text-center px-4">
          <Header>Bridge the Future with Us</Header>
          <Paragraph className="font-light mt-5 max-w-2xl">
            Fund innovation, empower research, and create lasting impact today.
          </Paragraph>
        </div>
      </div>
    </>
  );
}