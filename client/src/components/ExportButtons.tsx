import { Button } from "@/components/ui/button";
import { FileDown, FileText, FileSpreadsheet } from "lucide-react";
import { AnalysisResponse } from "@shared/schema";
import { exportToPdf, exportToCsv } from "@/lib/exportUtils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ExportButtonsProps {
  results: AnalysisResponse;
  isDisabled?: boolean;
}

export default function ExportButtons({ results, isDisabled = false }: ExportButtonsProps) {
  // Handler functions for exports
  const handlePdfExport = () => {
    exportToPdf(results);
  };
  
  const handleCsvExport = () => {
    exportToCsv(results);
  };
  
  return (
    <div className="flex items-center gap-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              onClick={handlePdfExport}
              disabled={isDisabled}
              className="flex items-center gap-1 border-blue-200 text-blue-700 hover:border-blue-300 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-400 dark:hover:border-blue-700 dark:hover:bg-blue-900/30"
              aria-label="Export as PDF"
            >
              <FileText className="h-4 w-4" />
              <span>PDF</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Download report as PDF</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCsvExport}
              disabled={isDisabled}
              className="flex items-center gap-1 border-blue-200 text-blue-700 hover:border-blue-300 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-400 dark:hover:border-blue-700 dark:hover:bg-blue-900/30"
              aria-label="Export as CSV"
            >
              <FileSpreadsheet className="h-4 w-4" />
              <span>CSV</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Download report as CSV spreadsheet</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}