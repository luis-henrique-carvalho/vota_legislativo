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

import { User as UserComponent } from "@nextui-org/user";

import {
  Button,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { SlOptionsVertical } from "react-icons/sl";
import { useProjectHooks } from "@/hooks/useProjectHook";
import { Pagination, Spinner } from "@nextui-org/react";
import { User } from "@/models/User";

interface Props {
  alderman: User[];
}

const columns = [
  {
    key: "name",
    label: "NOME",
  },
  {
    key: "partido",
    label: "PARTIDO",
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

export default function TableComponent({ alderman }: Props) {
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 4;

  const pages = Math.ceil(alderman.length / rowsPerPage);

  const items = React.useMemo(() => {
    if (!Array.isArray(alderman)) {
      return [];
    }

    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return alderman.slice(start, end);
  }, [page, alderman]);

  const { projectDelete } = useProjectHooks();

  const renderCell = React.useCallback((alderman: any, columnKey: any) => {
    const cellValue = alderman[columnKey];

    switch (columnKey) {
      case "name":
        return (
          <>
            <UserComponent
              name={alderman?.name}
              description={alderman?.tipo}
              avatarProps={{
                src: alderman.avatar_url,
              }}
            />
          </>
        );

      case "partido":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-tiny capitalize text-default-400">
              {alderman.partido}
            </p>
          </div>
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
      {items ? (
        <TableBody items={items}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      ) : (
        <Spinner />
      )}
    </Table>
  );
}
