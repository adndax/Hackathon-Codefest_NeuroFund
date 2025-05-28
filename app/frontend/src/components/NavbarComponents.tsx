"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Navbar, NavBody, NavItems, NavbarLogo, NavbarButton, MobileNav, MobileNavHeader, MobileNavMenu, MobileNavToggle } from "@/components/Navbar";
import { PannelIcon, TopRightProfile } from "@/components/Navbar";  // Import these components
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavbarProps {
  navItems?: { name: string; link: string }[];
}

export default function NavbarComponent() {
  const { isLoggedIn, user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Tentukan link tujuan profil berdasarkan role pengguna
  const profileLink = user?.role === "Researcher" ? "/researcher/profile" : "/investor/profile";

  // Tentukan navItems dinamis berdasarkan status login dan role
  const defaultNavItems = [
    { name: "Home", link: "/home" },
    { name: "About", link: "/about" },
  ];

  const loggedInNavItems = [
    { name: "Home", link: user?.role === "Investor" ? "/investor" : "/researcher"  },
    { name: "About", link: "/about" },
    { name: "Research", link: user?.role === "Investor" ? "/investor-research" : "/researcher-research" },
  ];

  const finalNavItems = (isLoggedIn ? loggedInNavItems : defaultNavItems);

  // Tentukan item aktif berdasarkan pathname
  const activeItemName = finalNavItems.find((item) => item.link === pathname)?.name || "Home";

  return (
    <Navbar>
      <NavBody>
        <NavbarLogo />
        <NavItems items={finalNavItems} name={activeItemName} />
        {isLoggedIn && user ? (
          <div className="flex items-center space-x-4">
            {/* Add the PannelIcon and TopRightProfile components */}
            <PannelIcon name={activeItemName} login={isLoggedIn} />
            <TopRightProfile login={user.role} />
            {/* <NavbarButton href={profileLink} variant="signup">
              Hi, {user.name}! {user.role}
            </NavbarButton> */}
          </div>
        ) : (
          <div className="flex items-center gap-4 mr-2">
            <NavbarButton href="/login">Login</NavbarButton>
            <NavbarButton href="/sign-up" variant="signup">Sign up</NavbarButton>
          </div>
        )}
      </NavBody>

      {!isLoggedIn && (
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>
          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {finalNavItems.map((item, idx) => (
              <Link
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-foreground cursor-pointer"
              >
                {item.name}
              </Link>
            ))}
            <div className="flex w-full flex-col gap-4">
              <NavbarButton
                href="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                variant="mobile"
                className="w-full"
              >
                Login
              </NavbarButton>
              <NavbarButton
                href="/sign-up"
                onClick={() => setIsMobileMenuOpen(false)}
                variant="signup"
                className="w-full"
              >
                Sign up
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      )}
    </Navbar>
  );
}