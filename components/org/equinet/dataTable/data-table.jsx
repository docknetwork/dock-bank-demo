import {
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from 'components/ui/table';
import { Button } from 'components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function DataTable({
    columns,
    data,
}) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="rounded-lg border">
            <Table>
                <TableHeader className='bg-slate-50'>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <TableHead key={header.id} className='font-bold'>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && 'selected'}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell className='text-sm' key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <div className='flex items-center justify-between px-2 border-t p-4'>
                <p className='text-sm'>Page 1 of 10</p>
                <div className="flex items-center justify-end space-x-2">
                    <Button
                        className='rounded-full'
                        variant="secondary"
                        size="sm"
                    >
                        <ChevronLeft absoluteStrokeWidth />
                    </Button>
                    <Button
                        className='rounded-full'
                        variant="secondary"
                        size="sm"
                    >
                        <ChevronRight absoluteStrokeWidth />
                    </Button>
                </div>
            </div>
        </div>
    );
}
