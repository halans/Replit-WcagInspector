import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { SearchIcon, Loader2, Globe, ArrowRight, Sparkles, History, LightbulbIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

// Form schema
const formSchema = z.object({
  url: z.string().min(1, "URL is required").refine(
    (value) => {
      // Accept any non-empty URL input - the browser and server will handle validation
      // This allows complex URLs like www.w3.org/WAI/demos/bad/before/home.html
      return value.trim().length > 0;
    },
    { message: "Please enter a valid URL" }
  )
});

type UrlFormValues = z.infer<typeof formSchema>;

interface UrlInputFormProps {
  onAnalyze: (url: string) => void;
  isAnalyzing: boolean;
}

const exampleSites = [
  { url: "example.com", label: "Simple Site" },
  { url: "w3.org/WAI/demos/bad/before/home.html", label: "W3C Demo" },
  { url: "developer.mozilla.org/en-US/", label: "MDN" },
];

export default function UrlInputForm({ onAnalyze, isAnalyzing }: UrlInputFormProps) {
  const { toast } = useToast();
  const [showExamples, setShowExamples] = useState(false);
  
  // Form definition
  const form = useForm<UrlFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: ""
    }
  });

  // Handle input change to remove any https:// or http:// prefix
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, onChange: (...event: any[]) => void) => {
    let value = e.target.value;
    // Remove http:// or https:// if present
    value = value.replace(/^https?:\/\//, '');
    onChange(value);
  };
  
  // Handle paste event to clean up URLs
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>, onChange: (...event: any[]) => void) => {
    // Prevent the default paste behavior
    e.preventDefault();
    
    // Get pasted content and clean it
    const pastedText = e.clipboardData.getData('text');
    const cleanedText = pastedText.replace(/^https?:\/\//, '');
    
    // Update the input with cleaned text
    onChange(cleanedText);
  };

  // Insert an example URL
  const insertExample = (example: string) => {
    form.setValue("url", example);
    setShowExamples(false);
  };

  // Submit handler
  const onSubmit = async (data: UrlFormValues) => {
    try {
      // Call the analyze function with the URL
      onAnalyze(data.url);
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to analyze website",
        variant: "destructive"
      });
    }
  };

  return (
    <Card className="mb-8 shadow-lg border-0 overflow-hidden">
      <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-400"></div>
      <CardHeader className="pb-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div>
            <CardTitle id="url-input-header" className="text-xl font-semibold text-blue-700 dark:text-blue-400 flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Analyze Website Accessibility
            </CardTitle>
            <CardDescription className="mt-1 text-gray-600 dark:text-gray-400">
              Enter any website URL to check against WCAG 2.2 accessibility guidelines
            </CardDescription>
          </div>
          <Badge variant="outline" className="bg-blue-100/50 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800 font-normal">
            <Sparkles className="h-3.5 w-3.5 mr-1" />
            WCAG 2.2
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel htmlFor="url-input" className="text-gray-700 dark:text-gray-300 font-medium flex items-center gap-2">
                    Website URL
                    <div 
                      className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200 px-2 py-0.5 rounded-full inline-flex items-center cursor-pointer"
                      onClick={() => setShowExamples(!showExamples)}
                    >
                      <LightbulbIcon className="h-3 w-3 mr-1" />
                      <span>{showExamples ? "Hide Examples" : "Show Examples"}</span>
                    </div>
                  </FormLabel>
                  <div className="mt-1 flex rounded-lg shadow-sm overflow-hidden border-2 border-blue-100 focus-within:border-blue-500 dark:border-blue-900 dark:focus-within:border-blue-700 transition-colors duration-200">
                    <span className="inline-flex items-center px-3 border-r-0 bg-blue-100 text-blue-700 font-medium dark:bg-blue-900/70 dark:text-blue-300 text-sm select-none">
                      https://
                    </span>
                    <FormControl>
                      <Input
                        {...field}
                        id="url-input"
                        placeholder="example.com/path/to/page.html"
                        className="flex-1 rounded-none rounded-r-lg border-0 focus-visible:ring-0 focus-visible:ring-offset-0 py-6 text-base"
                        disabled={isAnalyzing}
                        aria-describedby="url-hint"
                        onChange={(e) => handleInputChange(e, field.onChange)}
                        onPaste={(e) => handlePaste(e, field.onChange)}
                      />
                    </FormControl>
                  </div>
                  
                  {showExamples && (
                    <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-900/30">
                      <h4 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-2 flex items-center">
                        <History className="h-3.5 w-3.5 mr-1.5" />
                        Try these examples:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {exampleSites.map((site, index) => (
                          <Button
                            key={index}
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => insertExample(site.url)}
                            className="text-xs bg-white dark:bg-gray-800 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/50"
                          >
                            <span className="truncate max-w-[200px]">{site.url}</span>
                            <Badge variant="outline" className="ml-1.5 text-[10px] px-1.5 py-0 min-h-0 h-4 bg-blue-50 dark:bg-blue-900/30">
                              {site.label}
                            </Badge>
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <FormDescription id="url-hint" className="text-gray-500 dark:text-gray-400 text-sm flex items-start">
                    <span className="text-blue-500 dark:text-blue-400 mr-2">ℹ️</span>
                    <span>Enter the domain and full path without "https://" prefix. You can check specific pages like <code className="text-xs bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">example.com/contact</code>.</span>
                  </FormDescription>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            
            <div className="flex items-center pt-2">
              <Button 
                type="submit" 
                disabled={isAnalyzing}
                aria-label="Analyze website accessibility"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-6 px-6 rounded-lg shadow-md transition-all duration-200 w-full sm:w-auto"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    <span>Analyzing Website...</span>
                  </>
                ) : (
                  <>
                    <SearchIcon className="mr-2 h-5 w-5" />
                    <span>Analyze Accessibility</span>
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
