import { useState, useEffect } from "react";
import { AccessibilityIcon, Moon, Sun, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Header() {
  const [theme, setTheme] = useState<"light" | "dark">(
    document.documentElement.classList.contains("dark") ? "dark" : "light"
  );

  // Toggle theme function
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    
    // Update classList
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
    
    // Save preference to localStorage
    localStorage.setItem("wcag-analyzer-theme", newTheme);
  };

  // Listen for system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    
    const handleChange = (e: MediaQueryListEvent) => {
      const newTheme = e.matches ? "dark" : "light";
      setTheme(newTheme);
      
      // Only update if user hasn't set a preference
      if (!localStorage.getItem("wcag-analyzer-theme")) {
        if (newTheme === "dark") {
          document.documentElement.classList.add("dark");
          document.documentElement.classList.remove("light");
        } else {
          document.documentElement.classList.add("light");
          document.documentElement.classList.remove("dark");
        }
      }
    };
    
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-700 shadow-md dark:from-blue-800 dark:to-indigo-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-white dark:bg-gray-800 p-2 rounded-full shadow-md mr-3">
              <AccessibilityIcon className="text-blue-600 dark:text-blue-400 h-6 w-6" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">WCAG 2.2 Accessibility Analyzer</h1>
              <div className="flex items-center mt-1">
                <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30 mr-2">
                  <CheckCircle2 className="h-3 w-3 mr-1" /> WCAG 2.2
                </Badge>
                <span className="text-xs text-white/80">Analyze your website for accessibility issues</span>
              </div>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            size="icon"
            type="button" 
            id="theme-toggle" 
            onClick={toggleTheme}
            aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"} 
            className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white"
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Sun className="h-5 w-5" aria-hidden="true" />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}
