'use client';

import { ChevronDownIcon } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { durationToMs, splitTimestamp } from '@/lib/utils';

interface DateWithTimeProps {
  timeValue: number;
  onTimeChange: (...event: any[]) => void;
}

export function DateWithTime({ timeValue, onTimeChange }: DateWithTimeProps) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [time, setTime] = React.useState('00:00:00');

  React.useEffect(() => {
    if (timeValue !== undefined) {
      const { date: dateOnly, time: timeOnly } = splitTimestamp(timeValue);
      setDate(dateOnly);
      setTime(timeOnly);
    }
  }, [timeValue]);

  const handleDateChange = (date: Date | undefined) => {
    if (onTimeChange !== undefined && date) {
      onTimeChange(date.getTime() + durationToMs(time));
      setOpen(false);
    }
    setDate(date);
    setOpen(false);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onTimeChange !== undefined && date) {
      onTimeChange(date.getTime() + durationToMs(e.target.value));
      setOpen(false);
    }
    setTime(e.target.value);
  };

  return (
    <div className="flex gap-4">
      <div className="flex flex-col gap-3">
        <Label htmlFor="date-picker" className="px-1">
          Date
        </Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="date-picker"
              className="w-32 justify-between font-normal"
            >
              {date ? date.toLocaleDateString() : 'Select date'}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              onSelect={handleDateChange}
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex flex-col gap-3">
        <Label htmlFor="time-picker" className="px-1">
          Time
        </Label>
        <Input
          type="time"
          id="time-picker"
          value={time}
          step="1"
          className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
          onChange={handleTimeChange}
        />
      </div>
    </div>
  );
}
