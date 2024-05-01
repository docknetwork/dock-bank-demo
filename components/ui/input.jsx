import React, { useState } from 'react';
import { cn } from 'utils';
import { CheckedBadge } from './check-badge';

const verifiedBadge = <CheckedBadge className='flex align-middle' />;

const Input = React.forwardRef(({ className, type, data, ...props }, ref) => (
  <div className = {
    cn(
        'inputDiv flex h-10 w-full rounded-md border px-3 bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
      className
    )
  }>
    <input
      className= 'w-full h-9 valign-middle border-transparent outline-none focus:outline-none'
      type={type}
      ref={ref}
      {...props} />
        
      {data?.isVerified && verifiedBadge}
      {console.log(`${JSON.stringify(props)} - data: ${JSON.stringify(data)} - ref: ${JSON.stringify(ref)}`)}
    </div>
    ));

Input.displayName = 'Input';

export { Input };
