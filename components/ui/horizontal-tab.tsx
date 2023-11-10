import { cn } from '@/lib/utils';
import { useCallback, useState } from 'react';
import React from 'react';

interface HorizontalTabProps {
  tabs: string[];
  children: React.ReactNode;
}

const HorizontalTab: React.FC<HorizontalTabProps> = ({ tabs, children }) => {
  const [selectedTab, setSelectedTab] = useState<number>(0);

  const handleTabChange = useCallback((index: number) => {
    setSelectedTab(index);
  }, []);

  return (
    <div>
      {/* TABS */}
      <div className='flex items-center gap-5'>
        {tabs.map((tab, index) => (
          <button
            onClick={() => handleTabChange(index)}
            key={index + tab}
            className={cn(
              'eq rounded-xl border-2 border-envy bg-transparent px-5 py-3 font-medium hover:bg-envy hover:text-white',
              index === selectedTab &&
                'border-sherd bg-sherd text-white hover:border-envy'
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* PANELS */}
      <div className='mt-10'>
        {React.Children.map(children, (child, index) => (
          <div className={cn(index === selectedTab ? 'flex' : 'hidden')}>
            {child}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HorizontalTab;
