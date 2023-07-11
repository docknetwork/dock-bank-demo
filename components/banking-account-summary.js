import React from 'react';

import ArrowDownCircle from 'components/icons/arrow-down-circle';
import ArrowUpCircle from 'components/icons/arrow-up-circle';
import GlobeAlt from 'components/icons/globe-alt';

const BakingAccountSummary = () => (
    <div className="flex flex-wrap justify-between gap-6 px-12 py-8 mb-6 border rounded">
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center p-3 rounded-2xl bg-cyan-200">
          <ArrowUpCircle />
        </div>
        <div>
          <p className="text-sm text-gray-600">Total earnings</p>
          <p className="font-bold">$20,894.30</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center p-3 bg-purple-200 rounded-2xl">
          <ArrowDownCircle />
        </div>
        <div>
          <p className="text-sm text-gray-600">Total spending</p>
          <p className="font-bold">$7,346.50</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center p-3 bg-orange-200 rounded-2xl">
          <GlobeAlt />
        </div>
        <div>
          <p className="text-sm text-gray-600">Spending goal</p>
          <p className="font-bold">$8,548.20</p>
        </div>
      </div>
    </div>
  );

export default BakingAccountSummary;
