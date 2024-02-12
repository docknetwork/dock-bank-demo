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
                        <Badge variant='ghost' className='border-green-600 text-green-600'> {value}</Badge >
                    ) : (
                        <Badge variant='ghost' className='border-red-600 text-red-600'> {value}</Badge >
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
