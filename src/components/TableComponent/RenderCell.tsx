// RenderCell.tsx
"use client";
import React from "react";
import {
  Button,
  Chip,
  ChipProps,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { SlOptionsVertical } from "react-icons/sl";


const RenderCell = ({ projects, columnKey }: any) => {
  const cellValue = projects[columnKey];

  switch (columnKey) {
    case "name":
      return <div>{cellValue}</div>;
    case "description":
      return (
        <div className="flex flex-col">
          <p className="text-bold text-small capitalize">{cellValue}</p>
          <p className="text-bold text-tiny capitalize text-default-400">
            {projects.descricao}oi
          </p>
        </div>
      );
    case "status":
      return (
        <Chip className="capitalize" color={"danger"} size="sm" variant="flat">
          Nulo
        </Chip>
      );
    case "actions":
      return (
        <div className="relative flex justify-center items-center gap-2">
          <Dropdown>
            <DropdownTrigger>
              <Button isIconOnly size="sm" variant="light">
                <SlOptionsVertical />
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem>Edit</DropdownItem>
              <DropdownItem>Edit</DropdownItem>
              <DropdownItem>Delete</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      );
    default:
      return cellValue;
  }
};

export default RenderCell;
