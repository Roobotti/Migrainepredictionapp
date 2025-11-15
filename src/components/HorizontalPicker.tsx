import { useRef, useEffect } from "react";

interface HorizontalPickerProps {
  values: (string | number)[];
  selectedValue: string | number | null;
  onValueChange: (value: string | number | null) => void;
  unit?: string;
}

export function HorizontalPicker({ 
  values, 
  selectedValue, 
  onValueChange, 
  unit = "" 
}: HorizontalPickerProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const itemWidth = 56; // Width of each item in pixels

  useEffect(() => {
    if (scrollRef.current && selectedValue !== null) {
      const index = values.indexOf(selectedValue);
      if (index !== -1) {
        const scrollPosition = index * itemWidth - (scrollRef.current.offsetWidth / 2) + (itemWidth / 2);
        scrollRef.current.scrollLeft = Math.max(0, scrollPosition);
      }
    }
  }, [selectedValue, values, itemWidth]);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    
    const scrollLeft = scrollRef.current.scrollLeft;
    const containerWidth = scrollRef.current.offsetWidth;
    const centerPosition = scrollLeft + containerWidth / 2;
    const index = Math.round(centerPosition / itemWidth);
    
    if (index >= 0 && index < values.length) {
      const value = values[index];
      if (value !== selectedValue) {
        onValueChange(value);
      }
    }
  };

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;

    let scrollTimeout: NodeJS.Timeout;
    
    const onScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        handleScroll();
      }, 100);
    };

    scrollElement.addEventListener('scroll', onScroll);
    
    return () => {
      scrollElement.removeEventListener('scroll', onScroll);
      clearTimeout(scrollTimeout);
    };
  }, [values, selectedValue]);

  const handleItemClick = (value: string | number) => {
    onValueChange(value);
    if (scrollRef.current) {
      const index = values.indexOf(value);
      const scrollPosition = index * itemWidth - (scrollRef.current.offsetWidth / 2) + (itemWidth / 2);
      scrollRef.current.scrollTo({
        left: Math.max(0, scrollPosition),
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative w-24 h-10">
      {/* Center indicator */}
      <div className="absolute left-1/2 top-0 bottom-0 w-12 -ml-6 bg-teal-100/50 border-x-2 border-teal-500 pointer-events-none z-10 rounded" />
      
      {/* Scrollable container */}
      <div
        ref={scrollRef}
        className="h-full overflow-x-scroll scrollbar-hide flex items-center"
        style={{
          scrollSnapType: 'x mandatory',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
      >
        {/* Padding at start */}
        <div style={{ minWidth: '36px' }} />
        
        {values.map((value, index) => {
          const isSelected = value === selectedValue;
          
          return (
            <button
              key={`${value}-${index}`}
              onClick={() => handleItemClick(value)}
              className={`flex-shrink-0 flex items-center justify-center transition-all duration-200 ${
                isSelected
                  ? "text-teal-600 scale-110"
                  : "text-slate-400"
              }`}
              style={{
                width: `${itemWidth}px`,
                scrollSnapAlign: 'center'
              }}
            >
              <span className="text-sm">
                {value}
              </span>
            </button>
          );
        })}
        
        {/* Padding at end */}
        <div style={{ minWidth: '36px' }} />
      </div>

      {/* Gradient overlays */}
      <div className="absolute top-0 left-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent pointer-events-none" />
      <div className="absolute top-0 right-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none" />
    </div>
  );
}
