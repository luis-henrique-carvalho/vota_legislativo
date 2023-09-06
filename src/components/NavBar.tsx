"use client";
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/navbar";

import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";
import { useAuth } from "@/contexts/auth";
import { ThemeSwitcher } from "./ThemeSwitcher";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { signOut } = useAuth();

  const menuItems = [
    { label: "Questões", link: "questions" },
    { label: "Usuários", link: "users-list" },
    { label: "Categorias", link: "category" },
    { label: "Relatórios", link: "reports" },
  ];
  return (
    <Navbar
      height={"121px"}
      maxWidth={"full"}
      onMenuOpenChange={setIsMenuOpen}
      className="bg-secondary-dark dark:bg-primary-dark items-center rounded-lg gap-10"
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

      <NavbarContent className="hidden sm:flex gap-6" justify="center">
        <NavbarItem>
          <Link className="text-primary-main dark:text-white" href="/questions">
            Questões
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            className="text-primary-main dark:text-white"
            href="/users-list"
          >
            Usuários
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className="text-primary-main dark:text-white" href="/category">
            Categorias
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className="text-primary-main dark:text-white" href="/reports">
            Relatórios
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
        <NavbarItem>
          <Button
            onClick={signOut}
            className="bg-primary-main text-text-primary"
            variant="flat"
          >
            Sair
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full text-primary-dark"
              href={`/${item.link}`}
              size="lg"
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
