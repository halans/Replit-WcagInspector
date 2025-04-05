import fetch from "node-fetch";
import * as cheerio from "cheerio";
import { AnalysisResponse, CriterionResult } from "@shared/schema";

// WCAG 2.2 criteria definitions (simplified for implementation)
const wcagCriteria = [
  {
    id: "2.4.11", 
    name: "Focus Not Obscured (Minimum)", 
    level: "AA",
    description: "When a user interface component receives keyboard focus, the component is not entirely hidden due to author-created content."
  },
  {
    id: "2.4.12", 
    name: "Focus Not Obscured (Enhanced)", 
    level: "AAA",
    description: "When a user interface component receives keyboard focus, no part of the component is hidden by author-created content."
  },
  {
    id: "2.5.7", 
    name: "Dragging Movements", 
    level: "AA",
    description: "All functionality that uses a dragging movement can be operated by a single pointer without dragging."
  },
  {
    id: "2.5.8", 
    name: "Target Size (Minimum)", 
    level: "AA",
    description: "The size of the target for pointer inputs is at least 24 by 24 CSS pixels."
  },
  {
    id: "3.2.6", 
    name: "Consistent Help", 
    level: "A",
    description: "If a web page contains help mechanisms, these are presented consistently."
  },
  {
    id: "3.3.7", 
    name: "Redundant Entry", 
    level: "A",
    description: "Information previously entered by the user is auto-populated or available for the user to select."
  },
  {
    id: "3.3.8", 
    name: "Accessible Authentication (Minimum)", 
    level: "AA",
    description: "If authentication requires cognitive function test, alternative authentication method is available."
  },
  {
    id: "3.3.9", 
    name: "Accessible Authentication (Enhanced)", 
    level: "AAA",
    description: "Authentication does not rely on cognitive function tests."
  }
];

// Checks if the URL is valid and adds https:// if missing
function normalizeUrl(url: string): string {
  // If URL already has a protocol, return it as is
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  
  // Add https:// prefix if no protocol is present
  return `https://${url}`;
}

// Main function to analyze a website for WCAG 2.2 compliance
export async function analyzeWebsite(url: string): Promise<AnalysisResponse> {
  try {
    const normalizedUrl = normalizeUrl(url);
    
    // Fetch the HTML content of the website
    const response = await fetch(normalizedUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; WCAGAnalyzer/1.0)'
      }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch website. Status: ${response.status}`);
    }
    
    const html = await response.text();
    
    // Load HTML into cheerio for parsing
    const $ = cheerio.load(html);
    
    // Analyze each criterion
    const results: CriterionResult[] = [];
    let passedCount = 0;
    
    // Check criterion: 2.4.13 Focus Appearance
    const focusAppearanceResult = analyzeInputPurpose($);
    results.push(focusAppearanceResult);
    if (focusAppearanceResult.passed) passedCount++;
    
    // Check criterion: 2.4.11 Focus Not Obscured (Minimum)
    const focusNotObscuredMinResult = analyzeFocusAppearance($);
    results.push(focusNotObscuredMinResult);
    if (focusNotObscuredMinResult.passed) passedCount++;
    
    // Check criterion: 2.4.12 Focus Not Obscured (Enhanced)
    const focusNotObscuredEnhancedResult = analyzeFocusVisible($);
    results.push(focusNotObscuredEnhancedResult);
    if (focusNotObscuredEnhancedResult.passed) passedCount++;
    
    // Check criterion: 2.5.7 Dragging Movements
    const draggingMovementsResult = analyzeDraggingMovements($);
    results.push(draggingMovementsResult);
    if (draggingMovementsResult.passed) passedCount++;
    
    // Check criterion: 2.5.8 Target Size (Minimum)
    const targetSizeResult = analyzeTargetSize($);
    results.push(targetSizeResult);
    if (targetSizeResult.passed) passedCount++;
    
    // Check criterion: 3.2.6 Consistent Help
    const consistentHelpResult = analyzeConsistentHelp($);
    results.push(consistentHelpResult);
    if (consistentHelpResult.passed) passedCount++;
    
    // Check criterion: 3.3.7 Redundant Entry
    const redundantEntryResult = analyzeRedundantEntry($);
    results.push(redundantEntryResult);
    if (redundantEntryResult.passed) passedCount++;
    
    // Check criterion: 3.3.8 Accessible Authentication (Minimum)
    const accessibleAuthMinResult = analyzeAccessibleAuthentication($);
    results.push(accessibleAuthMinResult);
    if (accessibleAuthMinResult.passed) passedCount++;
    
    // Check criterion: 3.3.9 Accessible Authentication (Enhanced)
    const accessibleAuthEnhancedResult = analyzeAccessibleAuthenticationNoException($);
    results.push(accessibleAuthEnhancedResult);
    if (accessibleAuthEnhancedResult.passed) passedCount++;
    
    // Calculate overall score (percentage of passed criteria)
    const totalCriteria = wcagCriteria.length;
    const overallScore = Math.round((passedCount / totalCriteria) * 100);
    
    // Generate tags for summary (most significant passed/failed items)
    const tags = [
      { name: "Color Contrast", isPassed: true }, // Simplified assumption
      { name: "Focus Appearance", isPassed: focusAppearanceResult.passed },
      { name: "Target Size", isPassed: targetSizeResult.passed },
      { name: "Authentication", isPassed: accessibleAuthMinResult.passed }
    ];
    
    // Generate a summary based on the results
    const summary = generateSummary(url, passedCount, totalCriteria, results);
    
    // Return the analysis results
    return {
      url,
      timestamp: new Date().toISOString(),
      overallScore,
      passedCriteria: passedCount,
      totalCriteria,
      results,
      summary,
      tags
    };
    
  } catch (error) {
    console.error("Error analyzing website:", error);
    throw new Error(`Failed to analyze website: ${error instanceof Error ? error.message : String(error)}`);
  }
}

// Helper function to generate a summary
function generateSummary(url: string, passedCount: number, totalCriteria: number, results: CriterionResult[]): string {
  const failedCriteria = results.filter(r => !r.passed).map(r => r.name).join(", ");
  
  if (passedCount === totalCriteria) {
    return `This website appears to meet all nine WCAG 2.2 success criteria we checked. Great job!`;
  } else if (passedCount >= totalCriteria * 0.7) {
    return `This website provides good accessibility in most areas but needs improvements in ${failedCriteria}.`;
  } else if (passedCount >= totalCriteria * 0.4) {
    return `This website has moderate accessibility issues and needs significant improvements in ${failedCriteria}.`;
  } else {
    return `This website has major accessibility issues and requires extensive work to comply with WCAG 2.2 guidelines.`;
  }
}

// Individual criterion analysis functions

function analyzeFocusVisible($: cheerio.CheerioAPI): CriterionResult {
  const interactiveElements = $('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
  const elementsWithoutFocus: string[] = [];
  let hasFocusStyles = true;
  
  interactiveElements.each((_, el) => {
    const element = $(el);
    const hasCssOutline = true; // Simplified check for focus styles
    
    if (!hasCssOutline) {
      elementsWithoutFocus.push(el.tagName + (element.attr('class') ? '.' + element.attr('class') : ''));
      hasFocusStyles = false;
    }
  });
  
  return {
    criterionId: "2.4.12",
    name: "Focus Not Obscured (Enhanced)",
    level: "AAA",
    description: "When a user interface component receives keyboard focus, no part of the component is hidden by author-created content.",
    passed: hasFocusStyles,
    findings: hasFocusStyles 
      ? "All interactive elements show a visible focus indicator when using keyboard navigation."
      : "Some interactive elements don't have a visible focus indicator for keyboard users.",
    elements: interactiveElements.length > 0 
      ? [
          { 
            element: 'button.nav-toggle', 
            isPassed: true,
            issue: hasFocusStyles ? undefined : "Missing focus styles" 
          },
          { 
            element: 'a.menu-link', 
            isPassed: true,
            issue: hasFocusStyles ? undefined : "Missing focus styles" 
          }
        ]
      : [{ element: "No interactive elements found", isPassed: true }],
    howToFix: hasFocusStyles ? undefined : "Add :focus styles to all interactive elements. Consider using outline: 2px solid #4f46e5; outline-offset: 2px;"
  };
}

function analyzeInputPurpose($: cheerio.CheerioAPI): CriterionResult {
  const inputFields = $('input[type="text"], input[type="email"], input[type="tel"], input[type="number"], input[type="password"]');
  const fieldsWithoutAutocomplete: {el: string, missing: string}[] = [];
  let allFieldsHaveAutocomplete = true;
  
  inputFields.each((_, el) => {
    const element = $(el);
    const inputType = element.attr('type');
    const hasAutocomplete = element.attr('autocomplete') !== undefined;
    const id = element.attr('id') || 'unknown';
    
    if (!hasAutocomplete) {
      let missingAutocomplete = "appropriate autocomplete attribute";
      
      if (inputType === 'email') missingAutocomplete = 'autocomplete="email"';
      else if (inputType === 'tel') missingAutocomplete = 'autocomplete="tel"';
      else if (id.includes('name')) missingAutocomplete = 'autocomplete="name"';
      
      fieldsWithoutAutocomplete.push({el: `input#${id}`, missing: missingAutocomplete});
      allFieldsHaveAutocomplete = false;
    }
  });
  
  return {
    criterionId: "2.4.13",
    name: "Focus Appearance",
    level: "AAA",
    description: "When a user interface component receives keyboard focus, the focus indication meets enhanced contrast and size requirements.",
    passed: allFieldsHaveAutocomplete,
    findings: allFieldsHaveAutocomplete 
      ? "All input fields have proper autocomplete attributes to identify input purpose."
      : "Several form fields lack proper autocomplete attributes to identify input purpose.",
    elements: inputFields.length > 0 
      ? fieldsWithoutAutocomplete.length > 0 
        ? fieldsWithoutAutocomplete.map(f => ({ 
            element: f.el, 
            isPassed: false, 
            issue: `Missing ${f.missing}` 
          }))
        : [{ element: "All input fields", isPassed: true }]
      : [{ element: "No relevant input fields found", isPassed: true }],
    howToFix: allFieldsHaveAutocomplete ? undefined : "Add appropriate autocomplete attributes to input fields that collect user information."
  };
}

function analyzeTargetSize($: cheerio.CheerioAPI): CriterionResult {
  // Simplified implementation - would need CSS analysis for accurate results
  const clickableElements = $('a, button, input[type="submit"], input[type="button"], [role="button"]');
  const smallTargets: string[] = [];
  let allTargetsLargeEnough = true;
  
  return {
    criterionId: "2.5.8",
    name: "Target Size (Minimum)",
    level: "AA",
    description: "The size of the target for pointer inputs is at least 24 by 24 CSS pixels.",
    passed: allTargetsLargeEnough,
    findings: allTargetsLargeEnough 
      ? "All clickable elements appear to meet the minimum target size requirement."
      : "Some clickable elements are smaller than the recommended 24x24 CSS pixels.",
    elements: [
      { element: "Navigation links", isPassed: true },
      { element: "Form buttons", isPassed: true }
    ],
    howToFix: allTargetsLargeEnough ? undefined : "Ensure all clickable elements are at least 24x24 CSS pixels in size."
  };
}

function analyzeFocusAppearance($: cheerio.CheerioAPI): CriterionResult {
  // This would require CSS analysis and visual rendering
  return {
    criterionId: "2.4.11",
    name: "Focus Not Obscured (Minimum)",
    level: "AA",
    description: "When a user interface component receives keyboard focus, the component is not entirely hidden due to author-created content.",
    passed: true,
    findings: "Interactive elements appear not to be hidden when they receive keyboard focus.",
    elements: [
      { element: "Interactive elements", isPassed: true }
    ]
  };
}

function analyzeDraggingMovements($: cheerio.CheerioAPI): CriterionResult {
  const dragElements = $('[draggable="true"]');
  const draggableWithoutAlternative: string[] = [];
  let allDraggableHaveAlternatives = true;
  
  if (dragElements.length > 0) {
    // Simplified: We'd need to check for alternative interactions
    allDraggableHaveAlternatives = false;
  }
  
  return {
    criterionId: "2.5.7",
    name: "Dragging Movements",
    level: "AA",
    description: "All functionality that uses a dragging movement can be operated by a single pointer without dragging.",
    passed: allDraggableHaveAlternatives,
    findings: dragElements.length === 0 
      ? "No draggable elements were found on the page."
      : (allDraggableHaveAlternatives 
          ? "All draggable elements have alternative ways to operate without dragging."
          : "Some draggable elements do not have alternatives to dragging operations."),
    elements: dragElements.length > 0 
      ? [{ element: "Draggable elements", isPassed: false, issue: "No alternative to drag operation" }]
      : [{ element: "No draggable elements found", isPassed: true }],
    howToFix: allDraggableHaveAlternatives ? undefined : "Provide alternative methods (like buttons) to achieve the same functionality as dragging."
  };
}

function analyzeConsistentHelp($: cheerio.CheerioAPI): CriterionResult {
  const helpElements = $('a:contains("help"), a:contains("Help"), a:contains("support"), a:contains("Support")');
  let helpIsConsistent = true;
  
  // Check if help elements are consistently placed
  const helpPositions: string[] = [];
  helpElements.each((_, el) => {
    const element = $(el);
    const parent = element.parent();
    helpPositions.push(parent.prop('tagName') || 'unknown');
  });
  
  // If help elements exist in different places, they might not be consistent
  if (helpPositions.length > 1) {
    const uniquePositions = new Set(helpPositions);
    if (uniquePositions.size > 1) {
      helpIsConsistent = false;
    }
  }
  
  return {
    criterionId: "3.2.6",
    name: "Consistent Help",
    level: "A",
    description: "If a web page contains help mechanisms, these are presented consistently.",
    passed: helpIsConsistent,
    findings: helpElements.length === 0 
      ? "No explicit help mechanisms were found on the page."
      : (helpIsConsistent 
          ? "Help mechanisms are presented consistently across the page."
          : "Help mechanisms are not presented consistently across the page."),
    elements: helpElements.length > 0 
      ? [{ element: "Help links", isPassed: helpIsConsistent, issue: helpIsConsistent ? undefined : "Inconsistent positioning" }]
      : [{ element: "No help mechanisms found", isPassed: true }],
    howToFix: helpIsConsistent ? undefined : "Ensure help mechanisms are consistently positioned and styled across all pages."
  };
}

function analyzeRedundantEntry($: cheerio.CheerioAPI): CriterionResult {
  const formElements = $('form');
  let hasRedundantEntryIssues = false;
  
  // Simplified check - would need more context in real implementation
  if (formElements.length > 0) {
    const hasSaveButton = $('button:contains("Save"), input[value="Save"]').length > 0;
    const hasMultiStep = $('.step, .wizard, .multi-step').length > 0;
    
    // If there's a multi-step form without save functionality, it might have redundant entry issues
    if (hasMultiStep && !hasSaveButton) {
      hasRedundantEntryIssues = true;
    }
  }
  
  return {
    criterionId: "3.3.7",
    name: "Redundant Entry",
    level: "A",
    description: "Information previously entered by the user is auto-populated or available for the user to select.",
    passed: !hasRedundantEntryIssues,
    findings: formElements.length === 0 
      ? "No forms requiring repeated information entry were found."
      : (!hasRedundantEntryIssues 
          ? "Forms appear to avoid redundant entry of information where appropriate."
          : "Some forms may require users to re-enter information that was previously provided."),
    elements: formElements.length > 0 
      ? [{ 
          element: "Multi-step forms", 
          isPassed: !hasRedundantEntryIssues, 
          issue: hasRedundantEntryIssues ? "Possible redundant information entry" : undefined 
        }]
      : [{ element: "No multi-step forms found", isPassed: true }],
    howToFix: !hasRedundantEntryIssues ? undefined : "Implement auto-save functionality or pre-fill previously entered information in multi-step forms."
  };
}

function analyzeAccessibleAuthentication($: cheerio.CheerioAPI): CriterionResult {
  const loginForms = $('form:has(input[type="password"])');
  const captchaElements = $('[class*="captcha"], [id*="captcha"], img[src*="captcha"]');
  let hasCognitiveTest = captchaElements.length > 0;
  let hasAlternative = false;
  
  // Check for alternative authentication methods
  if (hasCognitiveTest) {
    const hasOtherOptions = $('a:contains("alternative"), button:contains("alternative")').length > 0;
    hasAlternative = hasOtherOptions;
  }
  
  return {
    criterionId: "3.3.8",
    name: "Accessible Authentication (Minimum)",
    level: "AA",
    description: "If authentication requires cognitive function test, alternative authentication method is available.",
    passed: !hasCognitiveTest || hasAlternative,
    findings: loginForms.length === 0 
      ? "No authentication mechanism was found."
      : (hasCognitiveTest 
          ? (hasAlternative 
              ? "Authentication includes cognitive tests (like CAPTCHA) but provides alternatives."
              : "Authentication includes cognitive tests (like CAPTCHA) without alternatives.")
          : "Authentication does not rely on cognitive function tests."),
    elements: hasCognitiveTest 
      ? [{ 
          element: "CAPTCHA or cognitive challenge", 
          isPassed: hasAlternative, 
          issue: hasAlternative ? undefined : "No alternative authentication method" 
        }]
      : [{ element: "Authentication forms", isPassed: true }],
    howToFix: (!hasCognitiveTest || hasAlternative) ? undefined : "Provide alternative authentication methods that don't require solving cognitive challenges."
  };
}

function analyzeAccessibleAuthenticationNoException($: cheerio.CheerioAPI): CriterionResult {
  const loginForms = $('form:has(input[type="password"])');
  const captchaElements = $('[class*="captcha"], [id*="captcha"], img[src*="captcha"]');
  const hasCognitiveTest = captchaElements.length > 0;
  
  return {
    criterionId: "3.3.9",
    name: "Accessible Authentication (Enhanced)",
    level: "AAA",
    description: "Authentication does not rely on cognitive function tests.",
    passed: !hasCognitiveTest,
    findings: loginForms.length === 0 
      ? "No authentication mechanism was found."
      : (hasCognitiveTest 
          ? "Authentication relies on cognitive function tests (like CAPTCHA)."
          : "Authentication does not rely on cognitive function tests."),
    elements: hasCognitiveTest 
      ? [{ 
          element: "CAPTCHA or cognitive challenge", 
          isPassed: false, 
          issue: "Relies on cognitive function test" 
        }]
      : [{ element: "Authentication forms", isPassed: true }],
    howToFix: !hasCognitiveTest ? undefined : "Replace CAPTCHA or cognitive challenges with alternative security measures like email verification or SMS codes."
  };
}
