interface FeatureItemProps {
  bgColor: string;
  textColor: string;
  title: string;
  description: string;
}

export const FeatureItem = ({ bgColor, textColor, title, description }: FeatureItemProps) => {
  return (
    <div className="flex items-center gap-5 w-full max-w-[320px]">
      <div className={`flex-shrink-0 w-8 h-8 ${bgColor} rounded-lg flex items-center justify-center`}>
        <span className={`${textColor} text-lg`}>✓</span>
      </div>
      <div className="flex-1 text-left">
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
};
