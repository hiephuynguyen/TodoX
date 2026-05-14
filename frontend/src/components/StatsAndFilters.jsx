import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';
import { FilterTypes } from '@/lib/data';
import React from 'react';

const StatsAndFilters = ({
  completedTasksCount = 0, 
  activeTasksCount = 0, 
  filter = "all",
  setFilter,
}) => {
  return (
    <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">

      {/* Task Counts */}
      <div className="flex gap-3">
        <Badge
          variant="secondary"
          className="bg-white/50 text-accent-foreground border-info/20"
        >
          {activeTasksCount} {FilterTypes.active}
        </Badge>

        <Badge
          variant="secondary"
          className="bg-white/50 text-success border-success/20"
        >
          {completedTasksCount} {FilterTypes.completed}
        </Badge>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-col gap-2 sm:flex-row">
        {
          Object.keys(FilterTypes).map((type) => (
            <Button
              key={type}
              variant={filter === type ? 'gradient' : 'ghost'}
              size="sm"
              className="capitalize"
              onClick = {()=> setFilter(type)}
            >

              <Filter className="size-4"/>
              {FilterTypes[type]}

            </Button>
          ))
        }
      </div>
    </div>
  );
};

export default StatsAndFilters;