import React, { createContext, useState } from "react";

type NavbarContextType = {
  navbarOpen: boolean;
  setNavbarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const NavbarContext = createContext<NavbarContextType | null>(null);

export default function NavbarProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [navbarOpen, setNavbarOpen] = useState<boolean>(false); // Updated type to boolean
  return (
    <NavbarContext.Provider
      value={{
        navbarOpen,
        setNavbarOpen,
      }}
    >
      {children}
    </NavbarContext.Provider>
  );
}
