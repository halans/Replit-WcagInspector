import { InfoIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function IntroSection() {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Check Website Accessibility</h2>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        Enter a website URL below to analyze its compliance with WCAG 2.2 guidelines. 
        This tool will check the nine key success criteria and provide recommendations for improvements.
      </p>
      
      <Alert variant="default" className="bg-blue-50 border-blue-400 text-blue-700 dark:bg-blue-950 dark:border-blue-400 dark:text-blue-200">
        <InfoIcon className="h-4 w-4" />
        <AlertTitle>Information</AlertTitle>
        <AlertDescription>
          This tool analyzes the HTML of a website for WCAG 2.2 compliance issues. 
          Some criteria may require manual verification.
        </AlertDescription>
      </Alert>
    </section>
  );
}
