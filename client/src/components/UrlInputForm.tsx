import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SearchIcon, Loader2 } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

// Form schema
const formSchema = z.object({
  url: z.string().min(1, "URL is required").refine(
    (value) => {
      // Basic URL validation pattern (accepts domain format)
      const urlPattern = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+/;
      return urlPattern.test(value) || value.startsWith('http');
    },
    { message: "Please enter a valid URL (e.g., example.com)" }
  )
});

type UrlFormValues = z.infer<typeof formSchema>;

interface UrlInputFormProps {
  onAnalyze: (url: string) => void;
  isAnalyzing: boolean;
}

export default function UrlInputForm({ onAnalyze, isAnalyzing }: UrlInputFormProps) {
  const { toast } = useToast();
  
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
    <Card className="mb-8">
      <CardHeader>
        <CardTitle id="url-input-header">Analyze Website</CardTitle>
      </CardHeader>
      
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="url-input">Website URL</FormLabel>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground dark:text-gray-300 text-sm">
                      https://
                    </span>
                    <FormControl>
                      <Input
                        {...field}
                        id="url-input"
                        placeholder="example.com"
                        className="flex-1 rounded-none rounded-r-md"
                        disabled={isAnalyzing}
                        aria-describedby="url-hint"
                        onChange={(e) => handleInputChange(e, field.onChange)}
                        onPaste={(e) => handlePaste(e, field.onChange)}
                      />
                    </FormControl>
                  </div>
                  <FormDescription id="url-hint">
                    Enter the domain without "https://" prefix.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex items-center space-x-4">
              <Button 
                type="submit" 
                disabled={isAnalyzing}
                aria-label="Analyze website accessibility"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <SearchIcon className="mr-2 h-4 w-4" />
                    Analyze
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
