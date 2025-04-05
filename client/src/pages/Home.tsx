import { useState } from "react";
import Header from "@/components/Header";
import IntroSection from "@/components/IntroSection";
import UrlInputForm from "@/components/UrlInputForm";
import ResultsSection from "@/components/ResultsSection";
import WcagInfoSection from "@/components/WcagInfoSection";
import Footer from "@/components/Footer";
import { useQuery } from "@tanstack/react-query";
import { AnalysisResponse } from "@shared/schema";

export default function Home() {
  const [url, setUrl] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Query for analysis results
  const { 
    data: results, 
    isLoading,
    isError,
    error,
    refetch
  } = useQuery<AnalysisResponse>({
    queryKey: [`/api/analyze?url=${encodeURIComponent(url)}`],
    enabled: false, // Don't run query on component mount
  });

  // Handle URL submission
  const handleAnalyze = async (submittedUrl: string) => {
    setUrl(submittedUrl);
    setIsAnalyzing(true);
    
    try {
      await refetch();
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="bg-gray-50 text-gray-900 min-h-screen flex flex-col">
      <Header />
      
      <main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow">
        <IntroSection />
        
        <UrlInputForm 
          onAnalyze={handleAnalyze} 
          isAnalyzing={isAnalyzing} 
        />
        
        {results && (
          <ResultsSection 
            results={results} 
            isLoading={isLoading}
            isError={isError}
            error={error instanceof Error ? error.message : "An unknown error occurred"}
          />
        )}
        
        <WcagInfoSection />
      </main>
      
      <Footer />
    </div>
  );
}
