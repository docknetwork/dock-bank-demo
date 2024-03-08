import { Badge } from 'components/ui/badge';

export const columns = [
    {
        accessorKey: 'action',
        header: 'Action',
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
            const value = row.getValue('status');
            return (
                <>
                    {value === 'Good' ? (
                        <Badge variant='ghost' className='border-green-600 text-green-600 text-xs whitespace-nowrap'> {value}</Badge >
                    ) : (
                        <Badge variant='ghost' className='border-red-700 text-red-700 text-xs whitespace-nowrap bg-red-100'> {value}</Badge>
                    )}
                </>

            );
        }
    },
    {
        accessorKey: 'date',
        header: 'Date',
    },
];
