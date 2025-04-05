import { InfoIcon, CheckSquare, AlertTriangle, Lightbulb, AccessibilityIcon, BarChart3, FileCode, Globe, Sparkles } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function IntroSection() {
  return (
    <section className="mb-12">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-50/80 via-indigo-50/80 to-blue-50/80 dark:from-blue-950/30 dark:via-indigo-950/30 dark:to-blue-950/30 border border-blue-100 dark:border-blue-900/30 p-8 md:py-12 md:px-16 mb-10 shadow-sm">
        <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-700/20 [mask-image:linear-gradient(0deg,transparent,black)] dark:[mask-image:linear-gradient(0deg,transparent,white)]" aria-hidden="true"></div>
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-500/10 to-indigo-600/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 text-sm font-medium mb-6 border border-blue-200 dark:border-blue-800">
            <Sparkles className="h-4 w-4" />
            WCAG 2.2 Compliant Analyzer
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 bg-clip-text text-transparent dark:from-blue-400 dark:via-indigo-400 dark:to-blue-300 mb-4 leading-tight tracking-tight">
            Website Accessibility Analyzer
          </h1>
          
          <p className="text-gray-700 dark:text-gray-300 max-w-3xl text-lg md:text-xl leading-relaxed mb-6">
            Make your website accessible to <span className="text-blue-600 dark:text-blue-400 font-medium">everyone</span>. 
            Quickly analyze your site's compliance with WCAG 2.2 guidelines and get actionable recommendations.
          </p>
          
          <div className="flex flex-wrap gap-3 mt-4">
            <Badge className="bg-white/80 dark:bg-gray-800/50 text-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-700 px-3 py-1 text-sm">
              <AccessibilityIcon className="h-3.5 w-3.5 mr-1.5" />
              WCAG 2.2 Analysis
            </Badge>
            <Badge className="bg-white/80 dark:bg-gray-800/50 text-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-700 px-3 py-1 text-sm">
              <BarChart3 className="h-3.5 w-3.5 mr-1.5" />
              Detailed Reports
            </Badge>
            <Badge className="bg-white/80 dark:bg-gray-800/50 text-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-700 px-3 py-1 text-sm">
              <FileCode className="h-3.5 w-3.5 mr-1.5" />
              Code Analysis
            </Badge>
            <Badge className="bg-white/80 dark:bg-gray-800/50 text-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-700 px-3 py-1 text-sm">
              <Globe className="h-3.5 w-3.5 mr-1.5" />
              Any Website
            </Badge>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <Card className="border-t-4 border-t-green-500 hover:shadow-lg transition-shadow duration-200 bg-white dark:bg-gray-800/50">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <div className="bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 p-3 rounded-xl mb-4">
                <CheckSquare className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-2">Quick Assessment</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Get immediate insights on how well your website meets accessibility standards 
                with our automated testing tool.
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-t-4 border-t-amber-500 hover:shadow-lg transition-shadow duration-200 bg-white dark:bg-gray-800/50">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <div className="bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-900/30 dark:to-amber-800/30 p-3 rounded-xl mb-4">
                <AlertTriangle className="h-6 w-6 text-amber-600 dark:text-amber-400" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-2">Identify Issues</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Discover potential accessibility barriers that might prevent users with 
                disabilities from accessing your content.
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-t-4 border-t-blue-500 hover:shadow-lg transition-shadow duration-200 bg-white dark:bg-gray-800/50">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 p-3 rounded-xl mb-4">
                <Lightbulb className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-2">Get Solutions</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Receive actionable recommendations on how to fix detected accessibility 
                issues and improve your website's compliance.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Separator className="my-6" />
      
      <Alert variant="default" className="bg-blue-50 border-blue-100 text-blue-700 dark:bg-blue-950/50 dark:border-blue-800/60 dark:text-blue-300 shadow-sm">
        <InfoIcon className="h-5 w-5" />
        <AlertTitle className="text-blue-800 dark:text-blue-300 font-medium">About This Tool</AlertTitle>
        <AlertDescription className="text-blue-700/90 dark:text-blue-300/90">
          <p className="mb-2">
            This tool analyzes websites against nine specific WCAG 2.2 success criteria that were newly introduced
            or updated in the latest standard. These include:
          </p>
          <ul className="list-disc pl-5 mb-2 space-y-1 text-sm">
            <li>Focus Not Obscured (Minimum & Enhanced)</li>
            <li>Focus Appearance</li>
            <li>Dragging Movements</li>
            <li>Target Size (Minimum)</li>
            <li>Consistent Help</li>
            <li>Redundant Entry</li>
            <li>Accessible Authentication (Minimum & Enhanced)</li>
          </ul>
          <p>
            Future versions may expand to cover all 78 WCAG success criteria. For comprehensive accessibility audits, 
            we recommend combining these automated checks with manual testing.
          </p>
        </AlertDescription>
      </Alert>
    </section>
  );
}
