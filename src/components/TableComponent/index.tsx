// TableComponent.tsx
"use client";
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/table";

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
import { useProjectHooks } from "@/hooks/useProjectHook";
import { Project } from "@/models/Projects";
import { Pagination, Spinner } from "@nextui-org/react";
import ModalAddProject from "@/components/ModalAddProject";

interface Props {
  projects: Project[];
}

const columns = [
  {
    key: "name",
    label: "NOME",
  },
  {
    key: "description",
    label: "DESCRIÇÃO",
  },
  {
    key: "status",
    label: "STATUS",
  },
  {
    key: "actions",
    label: "AÇÕES",
  },
];

export default function TableComponent({ projects }: Props) {
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 4;

  const pages = Math.ceil(projects.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return projects.slice(start, end);
  }, [page, projects]);
  const { projectDelete } = useProjectHooks();

  const renderCell = React.useCallback((projects: any, columnKey: any) => {
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
          <Chip
            className="capitalize"
            color={"danger"}
            size="sm"
            variant="flat"
          >
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
                <DropdownItem onClick={() => projectDelete("1")}>
                  Edit
                </DropdownItem>
                <DropdownItem>Edit</DropdownItem>
                <DropdownItem>Delete</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <Table
      isStriped
      classNames={{
        table: "min-h-[280px] ",
      }}
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            color="primary"
            page={page}
            total={pages}
            onChange={(page) => setPage(page)}
          />
        </div>
      }
    >
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={items}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
