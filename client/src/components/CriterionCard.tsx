import { useState } from "react";
import { CriterionResult } from "@shared/schema";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp, CheckCircle2, AlertCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface CriterionCardProps {
  criterion: CriterionResult;
}

export default function CriterionCard({ criterion }: CriterionCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const toggleExpanded = () => setIsExpanded(!isExpanded);
  
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-4 flex flex-row items-center justify-between">
        <div className="flex items-center">
          <div className="mr-3 flex-shrink-0">
            <span 
              className={`inline-flex items-center justify-center h-10 w-10 rounded-full ${
                criterion.passed 
                  ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400" 
                  : "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400"
              }`}
              aria-hidden="true"
            >
              {criterion.passed ? (
                <CheckCircle2 className="h-6 w-6" />
              ) : (
                <AlertCircle className="h-6 w-6" />
              )}
            </span>
            <span className="sr-only">{criterion.passed ? "Passed" : "Failed"}</span>
          </div>
          <div>
            <CardTitle className="text-lg font-medium text-gray-900 dark:text-white">
              {criterion.criterionId} {criterion.name}
            </CardTitle>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Level {criterion.level}</p>
          </div>
        </div>
        
        <Button 
          variant="ghost" 
          size="sm"
          onClick={toggleExpanded}
          aria-expanded={isExpanded}
          aria-label={`${isExpanded ? "Hide" : "Show"} details for ${criterion.name} criterion`}
          className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
        >
          {isExpanded ? (
            <ChevronUp className="h-5 w-5" aria-hidden="true" />
          ) : (
            <ChevronDown className="h-5 w-5" aria-hidden="true" />
          )}
        </Button>
      </CardHeader>
      
      {isExpanded && (
        <>
          <Separator />
          <CardContent className="p-4 space-y-4">
            <div>
              <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300">Description</h5>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {criterion.description}
              </p>
            </div>
            
            <div>
              <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300">Findings</h5>
              <div className={`mt-2 ${
                criterion.passed 
                  ? "bg-green-50 dark:bg-green-900/30" 
                  : "bg-red-50 dark:bg-red-900/30"
              } p-3 rounded-md`}>
                <div className="flex">
                  <div className="flex-shrink-0">
                    {criterion.passed ? (
                      <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" aria-hidden="true" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" aria-hidden="true" />
                    )}
                  </div>
                  <div className="ml-3">
                    <p className={`text-sm ${
                      criterion.passed 
                        ? "text-green-800 dark:text-green-200" 
                        : "text-red-800 dark:text-red-200"
                    }`}>
                      {criterion.findings}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {criterion.passed ? "Elements Checked" : "Elements with Issues"}
              </h5>
              <ul className="mt-2 divide-y divide-gray-200 dark:divide-gray-700">
                {criterion.elements.map((item, index) => (
                  <li key={index} className="py-2">
                    <div className="flex items-center space-x-3">
                      {item.isPassed ? (
                        <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" aria-hidden="true" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" aria-hidden="true" />
                      )}
                      <code className="text-xs bg-gray-100 dark:bg-gray-800 rounded px-2 py-1">
                        {item.element}
                      </code>
                      {item.issue && (
                        <span className="text-xs text-gray-500 dark:text-gray-400">{item.issue}</span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            
            {criterion.howToFix && (
              <div>
                <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300">How to Fix</h5>
                <div className="mt-2 bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {criterion.howToFix}
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </>
      )}
    </Card>
  );
}
