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
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { SlOptionsVertical } from "react-icons/sl";
import { useProjectHooks } from "@/hooks/useProjectHook";
import { Pagination, Spinner } from "@nextui-org/react";
import { SessionData } from "@/models/Session";

interface Props {
  sessions: SessionData[];
}

const columns = [
  {
    key: "name",
    label: "NOME DA SESSÃO",
  },
  {
    key: "inicio",
    label: "Inicio",
  },
  {
    key: "quorum",
    label: "QUORUM",
  },
  {
    key: "actions",
    label: "AÇÕES",
  },
];

export default function TableSessions({ sessions }: Props) {
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 4;

  const pages = Math.ceil(sessions.length / rowsPerPage);

  const items = React.useMemo(() => {
    if (!Array.isArray(sessions)) {
      return [];
    }

    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return sessions.slice(start, end);
  }, [page, sessions]);

  const { projectDelete } = useProjectHooks();

  const renderCell = React.useCallback((sessions: any, columnKey: any) => {
    const cellValue = sessions[columnKey];

    switch (columnKey) {
      case "name":
        return <div>{sessions.name}</div>;

      case "inicio":
        return <div>{sessions.inicio}</div>;

      case "partido":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-tiny capitalize text-default-400">
              {sessions.quorum}
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
