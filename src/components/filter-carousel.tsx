"use client";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface FilterCarouselProps {
  value?: string | null;
  isLoading?: boolean;
  onSelect: (value: string | null) => void;
  data: {
    value: string;
    label: string;
  }[];
}

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";

export const FilterCarousel = ({
  value,
  isLoading,
  onSelect,
  data,
}: FilterCarouselProps) => {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [currentValue, setCurrentValue] = useState<number>(0);
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    if (!api || api === null) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrentValue(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrentValue(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="relative w-full">
      <div
        className={cn(
          "pointer-events-none absolute bottom-0 left-12 top-0 z-10 w-12 bg-gradient-to-r from-white to-transparent opacity-100 transition",
          currentValue === 1 && "opacity-0 transition",
        )}
      />
      <Carousel
        setApi={setApi}
        opts={{ align: "start", dragFree: true }}
        className="w-full px-12"
      >
        <CarouselContent className="-ml-3">
          <CarouselItem
            onClick={() => onSelect(null)}
            className="basis-auto pl-3"
          >
            <Badge
              variant={!value ? "default" : "secondary"}
              className="whitespace no-wrap cursor-pointer rounded-lg px-3 py-1 text-sm"
            >
              All
            </Badge>
          </CarouselItem>
          {!isLoading &&
            data.map((item) => {
              return (
                <CarouselItem
                  onClick={() => onSelect(item.value)}
                  className="basis-auto pl-3"
                  key={item.value}
                >
                  <Badge
                    variant={value === item.value ? "default" : "secondary"}
                    className="whitespace no-wrap cursor-pointer rounded-lg px-3 py-1 text-sm"
                  >
                    {item.label}
                  </Badge>
                </CarouselItem>
              );
            })}
        </CarouselContent>
        <CarouselPrevious className="left-0 z-20" />
        <CarouselNext className="right-0 z-20" />
      </Carousel>
      <div
        className={cn(
          "pointer-events-none absolute bottom-0 right-12 top-0 z-10 w-12 bg-gradient-to-l from-white to-transparent opacity-100",
          currentValue === count && "opacity-0 transition",
        )}
      />
    </div>
  );
};
