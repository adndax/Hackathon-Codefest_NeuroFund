"use client";
import { cn } from "@/lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from 'next/link';
import React, { useRef, useState } from "react";
import { icons } from "@data";

export const NavigationBar = ({current_item, navItems, login}: {current_item: string, navItems: { name: string; link: string }[], login: boolean }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  return (
    <Navbar>
    <NavBody>
    <NavbarLogo />
      
      <NavItems items={navItems} name={current_item}/>
      <div className="flex items-center gap-6">
        <PannelIcon name={current_item} login={login}/>
        {!login && (<div className="flex items-center gap-4 mr-2">
          <NavbarButton href="/login">Login</NavbarButton>
          <NavbarButton href="/sign-up" variant="signup">Sign up</NavbarButton>
        </div>)}
        <TopRightProfile login={login} />
      </div>
    </NavBody>

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
        {navItems.map((item, idx) => (
          <a
            key={`mobile-link-${idx}`}
            href={item.link}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <span className="block text-foreground cursor-pointer">{item.name}</span>
          </a>
        ))}
        {!login && (<div className="flex w-full flex-col gap-4">
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
        </div>)}
        <PannelIconMobile name={current_item} login={login}/>
      </MobileNavMenu>
    </MobileNav>
  </Navbar>
  )
}

export const Navbar = ({ children, className }: {children: React.ReactNode, className?: string}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <motion.div
      ref={ref}
      className={cn("fixed inset-x-10 z-999", className)}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(
              child as React.ReactElement<{ visible?: boolean }>,
              { visible },
            )
          : child,
      )}
    </motion.div>
  );
};

export const NavBody = ({ children, className, visible }: { children: React.ReactNode, className?: string, visible?: boolean}) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(10px)" : "none",
        boxShadow: visible
          ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
          : "none",
        width: visible ? "40%" : "100%",
        y: visible ? 20 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      style={{
        minWidth: "800px",
      }}
      className={cn(
        "hidden my-5 flex-row items-center justify-between self-start rounded-full bg-transparent px-4 py-2 lg:flex dark:bg-transparent bg-linear-to-b from-[#225491]/80 to-[#001124] bg-opacity-74",
        visible && className,
      )}
    >
      {children}
    </motion.div>
  );
};

export const NavItems = ({ items, className, onItemClick, name}: {items: {name: string, link: string}[], className?: string, onItemClick?: () => void, name: string;}) => {
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <motion.div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "ml-5 inset-0 hidden flex-1 flex-row items-center justify-left space-x-2 text-[16px] font-sans font-semibold text-foreground transition duration-200 lg:flex lg:space-x-2",
        className,
      )}
    >
      {items.map((item, idx) => (
        <Link
          onMouseEnter={() => setHovered(idx)}
          onClick={onItemClick}
          key={`link-${idx}`}
          href={item.link}
          className={cn(
            "relative px-4 py-2 text-[16px] font-sans font-semibold hover:-translate-y-0.5",
            item.name === name ? "bg-linear-to-b from-[#A7C4EC]/50 to-[#5F6F86]/50 rounded-full": "bg-transparent",
          )}
        >
          {hovered === idx && (
            <motion.div
              layoutId="hovered"
              className="absolute inset-0 h-full w-full rounded-full"
            />
          )}
          <span className="relative z-10 px-3">{item.name}</span>
        </Link>
      ))}
    </motion.div>
  );
}

export const MobileNav = ({ children, className, visible }: {children: React.ReactNode, className?: string, visible?: boolean}) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(10px)" : "none",
        boxShadow: visible
          ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
          : "none",
        width: visible ? "90%" : "100%",
        paddingRight: visible ? "12px" : "0px",
        paddingLeft: visible ? "12px" : "0px",
        borderRadius: visible ? "4px" : "2rem",
        y: visible ? 20 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      className={cn(
        "relative z-50 mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between bg-transparent px-0 py-2 lg:hidden",
        visible && "bg-white/80 dark:bg-neutral-950/80",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

export const MobileNavHeader = ({ children, className }: {children: React.ReactNode, className?: string}) => {
  return (
    <div
      className={cn(
        "flex w-full flex-row items-center justify-between",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const MobileNavMenu = ({ children, className, isOpen, onClose,
}: { children: React.ReactNode; className?: string; isOpen: boolean; onClose: () => void}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={cn(
            "absolute inset-x-0 top-16 z-50 flex w-full flex-col items-start justify-start gap-4 rounded-lg bg-linear-to-b from-[#225491cc] to-[#001124] px-4 py-8 shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] dark:bg-neutral-950",
            className,
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const MobileNavToggle = ({ isOpen, onClick }: { isOpen: boolean; onClick: () => void}) => {
  return isOpen ? (
    <IconX className="text-foreground dark:text-white cursor-pointer hover:-translate-y-0.5" onClick={onClick} />
  ) : (
    <IconMenu2 className="text-foreground dark:text-white cursor-pointer hover:-translate-y-0.5" onClick={onClick} />
  );
};

export const NavbarLogo = () => {
  return (
    <a
      href="#"
      className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal text-black"
    >
      <img
        src="/neurofund_logo.png"
        alt="logo"
        width={60}
        height={60}
      />
      <span className="bg-linear-to-r from-foreground to-tertiary bg-clip-text text-transparent font-sans font-bold text-[22px]">NeuroFund</span>
    </a>
  );
};

export const NavbarButton = ({ href, as: Tag = "a", children, className, variant = "normal", ...props}: { href?: string; as?: React.ElementType; children: React.ReactNode; className?: string; variant?: "normal" | "mobile" | "signup"} & 
  ( | React.ComponentPropsWithoutRef<"a"> | React.ComponentPropsWithoutRef<"button">)) => {
  const baseStyles =
    "px-5 py-2 rounded-full bg-transparent button text-foreground font-sans text-[16px] font-semibold relative cursor-pointer hover:-translate-y-0.5 transition duration-200 inline-block text-center";

  const variantStyles = {
    normal: "px-5 py-2 rounded-full bg-transparent button text-foreground font-sans text-[16px] font-semibold relative cursor-pointer hover:-translate-y-0.5 transition duration-200 inline-block text-center",
    mobile: "px-5 py-2 rounded-full bg-secondary button text-foreground font-sans text-[16px] font-semibold relative cursor-pointer hover:-translate-y-0.5 transition duration-200 inline-block text-center",
    signup:
      "bg-linear-to-b from-[#E6C798]/95 to-[#E6C798]/85 text-background bg-opacity-95",
  };

  return (
    <Tag
      href={href || undefined}
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </Tag>
  );
};

export const PannelIcon = ({className, name, login}: {className?: string, name?: string, login: boolean}) => {
  return (
    <>
      {icons.filter(i =>  login).map(i => (
        <Link href={i.link} key={i.name}>
          <button className={`${i.name === name ? "p-3 bg-gradient-to-b from-[#A7C4EC]/40 to-[#5F6F86]/40 rounded-full cursor-pointer hover:-translate-y-0.5" : "cursor-pointer hover:-translate-y-0.5"}`}>
            <Image
              src={i.src}
              alt={i.alt}
              width={30}
              height={30}
              className="opacity-80 hover:opacity-100"
            />
          </button>
        </Link>
    ))}
    </> 
  )
}

export const PannelIconMobile = ({className, name, login}: {className?: string, name?: string, login: boolean}) => {
  return (
    <>
    <div className="flex w-full flex-col gap-4">
      {icons.filter(i => login).map((i) => (
        <Link href={i.link} key={i.name} className="flex flex-col items-center">
          <button className={`${i.name === name ? "w-full flex flex-col items-center p-3 bg-gradient-to-b from-[#A7C4EC]/40 to-[#5F6F86]/40 rounded-full cursor-pointer hover:-translate-y-0.5 hover:bg-primary" : "w-full flex flex-col items-center p-3 hover:bg-primary rounded-full cursor-pointer hover:-translate-y-0.5"}`}>
            <Image 
              src={i.src} 
              alt={i.alt}
              width={30} 
              height={30} 
              className="opacity-80 cursor-pointer hover:opacity-100"
            />
          </button>
        </Link>
        ))}
        </div>
    </> 
  )
}

export const TopRightProfile = ({login}: {login: boolean}) => {
  return (
    <>
      {login && (<div className="flex items-center bg-white bg-opacity-10 rounded-full px-5 py-1.5">
        <div className="w-11 h-11 rounded-full bg-[#E6C798] flex items-center justify-center text-gray-800 font-medium mr-2">
        </div>
        <div className="hidden sm:block px-1">
          <div className="text-sm font-inter text-[#001124]/80 font-medium">Hi, Adinda!</div>
          <div className="text-sm font-inter text-[#001124]/80 font-bold">Researcher</div>
        </div>
      </div>)
      }
    </>
  )
}
