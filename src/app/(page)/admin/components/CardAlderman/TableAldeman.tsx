// Flow
"use client";
import React from "react";
// Component
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { User as UserComponent } from "@nextui-org/user";
import ViewModal from "@/components/ViewModal";
import { Pagination, Spinner } from "@nextui-org/react";
// Models
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
    key: "actions",
    label: "DETALHES",
  },
];

export default function TableAlderman({
  alderman,
}: Props) {
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 5;

  const pages = Math.ceil(alderman.length / rowsPerPage);

  const items = React.useMemo(() => {
    if (!alderman || !Array.isArray(alderman)) {
      return [];
    }

    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return alderman.slice(start, end);
  }, [page, alderman, rowsPerPage]);

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
              classNames={{
                name: "break-normal",
                description: "break-normal",
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
          <div className=" flex justify-center gap-2">
            <ViewModal
              buttonName="Ver usuário"
              roteName="alderman"
              titleModal={alderman.name}
              values={alderman}
              key={alderman.id}
            />
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
