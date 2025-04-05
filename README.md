# WCAG Accessibility Analyzer

A comprehensive web accessibility analysis tool that evaluates websites against WCAG standards, providing in-depth insights and compliance assessments.

## Features

- Real-time Website Analysis: Scan any website for WCAG 2.0, 2.1, and 2.2 compliance
- 27 WCAG Success Criteria: Comprehensive evaluation covering all four WCAG principles
- Visual Scoring System: Get an overall accessibility score and individual criteria scores
- Detailed Analysis Reports: View detailed findings and recommendations for each criterion
- Code-level Insights: Identifies specific HTML elements with accessibility issues
- Actionable Recommendations: Provides clear guidance on how to fix accessibility problems

## Tech Stack

- Frontend: React with TypeScript, TailwindCSS, shadcn/ui components
- Backend: Node.js with Express
- HTML Analysis: Cheerio for DOM parsing and analysis
- Form Validation: Zod and React Hook Form
- Data Fetching: TanStack Query
- Routing: Wouter

## Usage

1. Enter a website URL in the analysis form (e.g., example.com or https://example.com)
2. Click "Analyze Accessibility" to start the analysis
3. View the overall accessibility score and breakdown by criteria
4. Filter results by status (Passed/Failed) or by WCAG principle
5. Expand individual criteria cards to see detailed findings, elements with issues, and recommendations

## Understanding WCAG Principles

The Web Content Accessibility Guidelines (WCAG) are organized under four main principles:

1. Perceivable - Information and user interface components must be presentable to users in ways they can perceive.
2. Operable - User interface components and navigation must be operable.
3. Understandable - Information and the operation of the user interface must be understandable.
4. Robust - Content must be robust enough that it can be interpreted by a wide variety of user agents, including assistive technologies.

## Disclaimer

This tool provides automated accessibility checking but cannot catch all possible accessibility issues. It is designed to help identify common problems, but manual testing with real users and specialized accessibility tools is still recommended for comprehensive accessibility evaluation.
