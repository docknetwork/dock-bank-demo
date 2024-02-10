import React from 'react';
import { Input } from 'components/ui/input';
import { Search } from 'lucide-react';
import { columns } from './columns';
import { DataTable } from './data-table';

function EquinetTable({ data }) {
  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <h2 className='font-semibold text-lg'>History</h2>
        <div className='px-2 flex space-x-1 items-center border rounded-lg'>
          <Search className='text-gray-400' />
          <Input className='w-1/3 border-0' placeholder='Search' />
        </div>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}

export default EquinetTable;
