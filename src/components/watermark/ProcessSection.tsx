import { Card, Button } from "../ui";

interface ProcessSectionProps {
  isAuthenticated: boolean;
  isProcessing: boolean;
  disabled: boolean;
  onProcess: () => void;
}

export const ProcessSection = ({
  isAuthenticated,
  isProcessing,
  disabled,
  onProcess,
}: ProcessSectionProps) => {
  return (
    <Card>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <p className="font-semibold text-sm md:text-base">
            {isAuthenticated ? "처리 후 저장" : "처리 후 즉시 다운로드"}
          </p>
          <p className="text-xs md:text-sm text-gray-600">
            {isAuthenticated
              ? "처리된 결과가 저장되며, 나중에 목록에서 다운로드할 수 있습니다"
              : "로그인하면 처리 결과를 저장할 수 있습니다"}
          </p>
        </div>
        <Button
          size="md"
          onClick={onProcess}
          isLoading={isProcessing}
          disabled={disabled}
          className="w-full md:w-auto"
        >
          {isAuthenticated ? "처리하고 저장" : "처리하고 다운로드"}
        </Button>
      </div>
    </Card>
  );
};
