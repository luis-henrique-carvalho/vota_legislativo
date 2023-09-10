import React, { useState } from "react";
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

type MenuItem = {
  label: string;
  link: string;
};

type MenuType = "navBar" | "navMenu";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { signOut } = authServices();
  const { isSigned, user } = useUserContext();

  const menuItemsAdmin = [
    { label: "Vereadores", link: "admin/alderman-list" },
    { label: "Sessões", link: "admin/session-list" },
  ];

  const menuItemsAlderman = [{ label: "Votação", link: "vote" }];

  const unauthenticatedMenuItems = [{ label: "Login", link: "login" }];

  const renderMenuItems = (items: MenuItem[], type: MenuType) =>
    items.map((item, index) =>
      type === "navBar" ? (
        <NavbarItem key={`${item}-${index}`}>
          <Link
            href={`/${item.link}`}
            className="text-primary-main dark:text-white hidden sm:flex"
          >
            {item.label}
          </Link>
        </NavbarItem>
      ) : (
        <NavbarMenuItem key={`${item}-${index}`}>
          <Link className="w-full text-primary-dark" href={`/${item.link}`}>
            {item.label}
          </Link>
        </NavbarMenuItem>
      )
    );

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
          {user?.tipo === "mesaria"
            ? renderMenuItems(menuItemsAdmin, "navBar")
            : renderMenuItems(menuItemsAlderman, "navBar")}
        </NavbarContent>
      ) : (
        <NavbarContent className="hidden sm:flex gap-6" justify="center">
          {renderMenuItems(unauthenticatedMenuItems, "navBar")}
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
        {isSigned ? (
          <>
            {user?.tipo === "mesaria"
              ? renderMenuItems(menuItemsAdmin, "navMenu")
              : renderMenuItems(menuItemsAlderman, "navMenu")}
          </>
        ) : (
          renderMenuItems(unauthenticatedMenuItems, "navMenu")
        )}
      </NavbarMenu>
    </Navbar>
  );
};

export default NavBar;
