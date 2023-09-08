"use client";
// Flow
import React from "react";
// Component
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/navbar";
import { ThemeSwitcher } from "../ThemeSwitcher";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import authServices from "@/services/authServices";
import { useUserContext } from "@/contexts/UserContext";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const { signOut } = authServices();
  const { isSigned } = useUserContext();

  const menuItemsSignIn = [
    { label: "Questões", link: "questions" },
    { label: "Usuários", link: "users-list" },
  ];

  const unauthenticatedMenuItems = [{ label: "Login", link: "login" }];

  return (
    <Navbar
      height={"121px"}
      maxWidth={"full"}
      onMenuOpenChange={setIsMenuOpen}
      className="bg-secondary-dark mb-1 dark:bg-primary-dark rounded-lg gap-10"
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <h1>Vota Legislativo</h1>
        </NavbarBrand>
      </NavbarContent>
      {isSigned ? (
        <NavbarContent className="hidden sm:flex gap-6" justify="start">
          {menuItemsSignIn.map((item, index) => (
            <NavbarItem key={`${item}-${index}`}>
              <Link
                className="text-primary-main dark:text-white hidden sm:flex"
                href={`/${item.link}`}
              >
                {item.label}
              </Link>
            </NavbarItem>
          ))}
        </NavbarContent>
      ) : (
        <NavbarContent className="hidden sm:flex gap-6" justify="center">
          {unauthenticatedMenuItems.map((item, index) => (
            <NavbarItem key={`${item}-${index}`}>
              <Link
                className="text-primary-main dark:text-white hidden sm:flex"
                href={`/${item.link}`}
              >
                {item.label}
              </Link>
            </NavbarItem>
          ))}
        </NavbarContent>
      )}

      <NavbarContent justify="center">
        {isSigned && (
          <NavbarItem>
            <Button
              onClick={signOut}
              className="bg-primary-main text-text-primary"
              variant="ghost"
            >
              Sair
            </Button>
          </NavbarItem>
        )}

        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {isSigned
          ? menuItemsSignIn.map((item, index) => (
              <NavbarMenuItem key={`${item}-${index}`}>
                <Link
                  className="w-full text-primary-dark"
                  href={`/${item.link}`}
                >
                  {item.label}
                </Link>
              </NavbarMenuItem>
            ))
          : unauthenticatedMenuItems.map((item, index) => (
              <NavbarMenuItem key={`${item}-${index}`}>
                <Link
                  className="w-full text-primary-dark"
                  href={`/${item.link}`}
                >
                  {item.label}
                </Link>
              </NavbarMenuItem>
            ))}
      </NavbarMenu>
    </Navbar>
  );
};

export default NavBar;
