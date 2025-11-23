import type { ReactNode } from "react";

interface StepItemProps {
  number: number;
  title: string;
  description: string;
}

export const StepItem = ({ number, title, description }: StepItemProps) => {
  return (
    <div className="text-center">
      <div className="w-15 h-15 bg-white text-gray-900 rounded-full flex items-center justify-center font-bold text-3xl mx-auto mb-6">
        {number}
      </div>
      <h3 className="font-bold text-2xl mb-4">{title}</h3>
      <p className="text-gray-300 text-lg leading-relaxed">{description}</p>
    </div>
  );
};
