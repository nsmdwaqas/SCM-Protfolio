import { LucideIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';

export function AnimatedCounter({ value }: { value: string }) {
  const [displayValue, setDisplayValue] = useState("0");
  
  useEffect(() => {
    const match = value.match(/([^0-9.-]*)([0-9.-]+)(.*)/);
    if (!match) {
      setDisplayValue(value);
      return;
    }

    const prefix = match[1] || '';
    const endValue = parseFloat(match[2]);
    const suffix = match[3] || '';
    const isFloat = match[2].includes('.');

    let startTime: number;
    const duration = 2000; // 2 seconds

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      // easeOutExpo
      const easeOut = percentage === 1 ? 1 : 1 - Math.pow(2, -10 * percentage);
      const currentVal = (easeOut * endValue);
      
      setDisplayValue(`${prefix}${isFloat ? currentVal.toFixed(1) : Math.floor(currentVal)}${suffix}`);

      if (percentage < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(value); // Ensure exact final value
      }
    };

    requestAnimationFrame(animate);
  }, [value]);

  return <>{displayValue}</>;
}

export function StatCard({ label, value, subLabel }: { label: string; value: string; subLabel?: string }) {
  return (
    <div className="flex flex-col">
      <div className="text-3xl md:text-4xl font-semibold text-[#F5F5F7] tracking-tight mb-1">
        <AnimatedCounter value={value} />
      </div>
      <div className="text-sm text-[#F5F5F7]/50 font-medium uppercase tracking-wider">{label}</div>
      {subLabel && <div className="text-xs text-[#F5F5F7]/30 mt-1">{subLabel}</div>}
    </div>
  );
}

export function InfoTile({ icon: Icon, title, desc, meta }: { icon: LucideIcon, title: React.ReactNode, desc: React.ReactNode, meta?: React.ReactNode }) {
  return (
    <div className="group flex items-start gap-4 p-4 -mx-4 rounded-xl hover:bg-white/[0.02] transition-colors duration-300">
      <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.05] flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-[#0A84FF]/10 group-hover:text-[#0A84FF] group-hover:border-[#0A84FF]/20 transition-all duration-300">
        <Icon className="w-5 h-5 text-[#F5F5F7]/60 group-hover:text-[#0A84FF] transition-colors" />
      </div>
      <div>
        <div className="text-base font-semibold text-[#F5F5F7]/90 mb-1">{title}</div>
        <div className="text-sm text-[#F5F5F7]/60 leading-relaxed mb-2">{desc}</div>
        {meta && <div className="inline-block px-2 py-1 bg-white/[0.05] border border-white/[0.05] rounded-md text-xs font-medium text-[#F5F5F7]/40 tracking-wide uppercase">{meta}</div>}
      </div>
    </div>
  );
}
