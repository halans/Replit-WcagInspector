import { useState } from "react";
import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { AnalysisResponse } from "@shared/schema";
import ScoreCircle from "./ScoreCircle";
import CriterionCard from "./CriterionCard";

interface ResultsSectionProps {
  results: AnalysisResponse;
  isLoading: boolean;
  isError: boolean;
  error: string;
}

export default function ResultsSection({ results, isLoading, isError, error }: ResultsSectionProps) {
  // Use the first tab as the default
  const [activeTab, setActiveTab] = useState("all");

  if (isLoading) {
    return (
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="flex items-center justify-center p-8">
            <div className="animate-spin mr-2">
              <span className="sr-only">Loading...</span>
              <svg className="h-8 w-8 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
            <span>Analyzing website...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Alert variant="destructive" className="mb-8">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  // Format the timestamp
  const analysisTime = format(
    new Date(results.timestamp),
    "MMM d, yyyy 'at' h:mm a"
  );

  // Filter results based on active tab
  const getFilteredResults = () => {
    switch (activeTab) {
      case "passed":
        return results.results.filter(criterion => criterion.passed);
      case "failed":
        return results.results.filter(criterion => !criterion.passed);
      default:
        return results.results;
    }
  };

  return (
    <section id="results-section" className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6 mb-8" aria-labelledby="results-header">
      <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
        <h2 id="results-header" className="text-lg font-medium text-gray-900 dark:text-white">
          {results.url} - WCAG 2.2 Results
        </h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Analysis completed <time dateTime={results.timestamp}>{analysisTime}</time>
        </p>
      </div>
      
      {/* Overall score card */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Overall Accessibility Score</h3>
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="w-full md:w-64 h-64 relative flex items-center justify-center">
            <ScoreCircle 
              score={results.overallScore} 
              label="Overall Score" 
            />
          </div>
          
          <div className="flex-1">
            <div className="space-y-4">
              <div>
                <p className="font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Passed Criteria: <span className="font-bold text-green-600 dark:text-green-400">{results.passedCriteria}/{results.totalCriteria}</span>
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  This website passes {results.passedCriteria} out of {results.totalCriteria} WCAG 2.2 success criteria
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-gray-700 dark:text-gray-300">Summary</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {results.summary}
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {results.tags.map((tag, index) => (
                    <Badge 
                      key={index}
                      variant={tag.isPassed ? "default" : "destructive"}
                      className={`inline-flex items-center ${tag.isPassed ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'}`}
                    >
                      {tag.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Criteria tabs */}
      <Separator className="my-4" />
      
      <div className="pt-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">WCAG 2.2 Success Criteria</h3>
        
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Criteria</TabsTrigger>
            <TabsTrigger value="passed">
              Passed ({results.results.filter(r => r.passed).length})
            </TabsTrigger>
            <TabsTrigger value="failed">
              Failed ({results.results.filter(r => !r.passed).length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab} className="space-y-6">
            {getFilteredResults().map((criterion) => (
              <CriterionCard 
                key={criterion.criterionId} 
                criterion={criterion} 
              />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
