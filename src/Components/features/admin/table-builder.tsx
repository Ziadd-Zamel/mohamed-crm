"use client";

import { useTranslations } from "next-intl";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/UI/table";
import { cn } from "@/lib/utils/cn";

type Header = {
  headName: string;
  className?: string;
};

type TableBuilderProps<T> = {
  tableHeadNames: Header[];
  tableData: T[];
  renderRow: (_item: T, _index: number) => React.ReactNode;
  emptyState?: React.ReactNode;
  headRowClasses?: string;
};

export function TableBuilder<T>({
  tableHeadNames,
  tableData,
  renderRow,
  emptyState,
  headRowClasses,
}: TableBuilderProps<T>) {
  const t = useTranslations();

  return (
    <div className="rounded-xl border-none bg-surface-raised p-3 shadow-none">
      <Table className="border-collapse border-spacing-0">
        <TableHeader
          className={cn(
            "[&_tr]:border-0 [&_tr]:bg-transparent! [&_tr]:hover:bg-transparent!",
            "[&_th]:bg-[#0A319D1F]! [&_th]:h-16 [&_th]:align-middle",
            "[&_th:first-child]:rounded-ss-lg [&_th:last-child]:rounded-se-lg",
          )}
        >
          <TableRow className={cn(headRowClasses, "h-16")}>
            {tableHeadNames.map((col) => (
              <TableHead
                key={col.headName}
                className={cn(
                  col.className,
                  "text-center text-sm font-semibold text-brand-primary",
                )}
              >
                {t(col.headName)}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {tableData.length === 0 ? (
            <TableRow>
              <TableCell colSpan={tableHeadNames.length} className="h-[300px] text-center">
                {emptyState || (
                  <div className="flex flex-col items-center justify-center py-12">
                    <p className="text-lg font-medium text-gray-900 dark:text-slate-100">
                      لا توجد بيانات
                    </p>
                    <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">
                      لم يتم العثور على أي سجلات
                    </p>
                  </div>
                )}
              </TableCell>
            </TableRow>
          ) : (
            tableData.map((item, index) => renderRow(item, index))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
