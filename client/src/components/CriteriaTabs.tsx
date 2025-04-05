import { useState } from "react";
import { CriterionResult } from "@shared/schema";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CriterionCard from "./CriterionCard";

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
    <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="mb-4">
        <TabsTrigger value="all">All Criteria</TabsTrigger>
        <TabsTrigger value="passed">Passed ({passedCriteria.length})</TabsTrigger>
        <TabsTrigger value="failed">Failed ({failedCriteria.length})</TabsTrigger>
      </TabsList>
      
      <TabsContent value={activeTab} className="space-y-6">
        {getFilteredCriteria().map(criterion => (
          <CriterionCard key={criterion.criterionId} criterion={criterion} />
        ))}
      </TabsContent>
    </Tabs>
  );
}
