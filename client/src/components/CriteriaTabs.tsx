import { useState } from "react";
import { CriterionResult } from "@shared/schema";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import CriterionCard from "./CriterionCard";
import { CheckCircle2, AlertCircle, ListFilter, Info } from "lucide-react";

interface CriteriaTabsProps {
  criteria: CriterionResult[];
}

export default function CriteriaTabs({ criteria }: CriteriaTabsProps) {
  const [activeTab, setActiveTab] = useState("all");
  
  const passedCriteria = criteria.filter(criterion => criterion.passed);
  const failedCriteria = criteria.filter(criterion => !criterion.passed);
  
  const getFilteredCriteria = () => {
    switch (activeTab) {
      case "passed":
        return passedCriteria;
      case "failed":
        return failedCriteria;
      default:
        return criteria;
    }
  };

  return (
    <Card className="overflow-hidden border-0 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center">
          <ListFilter className="mr-2 h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">WCAG 2.2 Success Criteria</h2>
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          View details on individual success criteria and filter by status.
        </p>
      </CardHeader>

      <CardContent className="p-6">
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 w-full mb-6 bg-blue-50 dark:bg-gray-900 p-1.5 rounded-lg border border-blue-100 dark:border-gray-700">
            <TabsTrigger 
              value="all" 
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 data-[state=active]:shadow-sm rounded-md px-4 py-2 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              <div className="flex items-center">
                <Info className="mr-1.5 h-4 w-4" />
                <span>All <span className="ml-1.5 font-medium bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded-full text-xs">
                  {criteria.length}
                </span></span>
              </div>
            </TabsTrigger>
            
            <TabsTrigger 
              value="passed" 
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-green-600 dark:data-[state=active]:text-green-400 data-[state=active]:shadow-sm rounded-md px-4 py-2 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              <div className="flex items-center">
                <CheckCircle2 className="mr-1.5 h-4 w-4 text-green-600 dark:text-green-400" />
                <span>Passed <span className="ml-1.5 font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 px-1.5 py-0.5 rounded-full text-xs">
                  {passedCriteria.length}
                </span></span>
              </div>
            </TabsTrigger>
            
            <TabsTrigger 
              value="failed" 
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-red-600 dark:data-[state=active]:text-red-400 data-[state=active]:shadow-sm rounded-md px-4 py-2 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              <div className="flex items-center">
                <AlertCircle className="mr-1.5 h-4 w-4 text-red-600 dark:text-red-400" />
                <span>Failed <span className="ml-1.5 font-medium bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 px-1.5 py-0.5 rounded-full text-xs">
                  {failedCriteria.length}
                </span></span>
              </div>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab} className="space-y-6">
            {getFilteredCriteria().length === 0 ? (
              <div className="text-center py-16 bg-gray-50 dark:bg-gray-900/30 rounded-lg border border-dashed border-gray-200 dark:border-gray-700">
                <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No Criteria Found</h3>
                <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                  No criteria match the selected filter. Try changing your filter selection.
                </p>
              </div>
            ) : (
              getFilteredCriteria().map(criterion => (
                <CriterionCard key={criterion.criterionId} criterion={criterion} />
              ))
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
