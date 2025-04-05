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
    queryKey: [`/api/analyze`, url],
    queryFn: async () => {
      if (!url) return null;
      const response = await fetch(`/api/analyze?url=${encodeURIComponent(url)}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to analyze website');
      }
      return response.json();
    },
    enabled: url !== "", // Only enable when URL is set
  });

  // Handle URL submission
  const handleAnalyze = async (submittedUrl: string) => {
    setIsAnalyzing(true);
    setUrl(submittedUrl);
    
    try {
      await refetch();
    } catch (error) {
      console.error("Analysis error:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 min-h-screen flex flex-col">
      <Header />
      
      <main id="main-content" role="main" aria-label="Main content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-grow">
        <IntroSection />
        
        <section aria-labelledby="url-input-header">
          <UrlInputForm 
            onAnalyze={handleAnalyze} 
            isAnalyzing={isAnalyzing} 
          />
        </section>
        
        {results && (
          <section aria-label="Analysis results">
            <ResultsSection 
              results={results} 
              isLoading={isLoading}
              isError={isError}
              error={error instanceof Error ? error.message : "An unknown error occurred"}
            />
          </section>
        )}
        
        <section aria-label="WCAG information">
          <WcagInfoSection />
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
