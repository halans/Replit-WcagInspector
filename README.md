# WCAG Accessibility Inspector

A comprehensive web accessibility analysis tool that evaluates websites against WCAG 2.2 standards, providing in-depth insights and compliance assessments.

**Live Demo:** [https://wcag-inspector.replit.app](https://wcag-inspector.replit.app)

## Features

- Real-time Website Analysis: Scan any website for WCAG 2.0, 2.1, and 2.2 compliance
- 27 WCAG Success Criteria: Comprehensive evaluation covering all four WCAG principles
- Visual Scoring System: Get an overall accessibility score and individual criteria scores
- Detailed Analysis Reports: View detailed findings and recommendations for each criterion
- Code-level Insights: Identifies specific HTML elements with accessibility issues
- Actionable Recommendations: Provides clear guidance on how to fix accessibility problems
- Export Options: Download reports as PDF or CSV for sharing and documentation

## Recent Updates

- Improved keyboard navigation and focus management for better accessibility
- Added dark mode support with system theme detection
- Enhanced PDF export functionality with clean, readable formatting
- Implemented SEO optimizations including meta tags, robots.txt, and sitemap
- Added comprehensive user interface for filtering and exploring results
- Fixed various accessibility issues to ensure the tool itself is accessible

## Tech Stack

- Frontend: React with TypeScript, TailwindCSS, shadcn/ui components
- Backend: Node.js with Express
- HTML Analysis: Cheerio for DOM parsing and analysis
- Form Validation: Zod and React Hook Form
- Data Fetching: TanStack Query
- Routing: Wouter
- Export: jsPDF for PDF generation, file-saver for downloads

## Usage

1. Enter a website URL in the analysis form (e.g., example.com or https://example.com)
2. Click "Analyze Accessibility" to start the analysis
3. View the overall accessibility score and breakdown by criteria
4. Filter results by status (Passed/Failed) or by WCAG principle
5. Expand individual criteria cards to see detailed findings, elements with issues, and recommendations
6. Export results as PDF or CSV using the export buttons

## Understanding WCAG Principles

The Web Content Accessibility Guidelines (WCAG) are organized under four main principles:

1. Perceivable - Information and user interface components must be presentable to users in ways they can perceive.
2. Operable - User interface components and navigation must be operable.
3. Understandable - Information and the operation of the user interface must be understandable.
4. Robust - Content must be robust enough that it can be interpreted by a wide variety of user agents, including assistive technologies.

## Disclaimer

This tool provides automated accessibility checking but cannot catch all possible accessibility issues. It is designed to help identify common problems, but manual testing with real users and specialized accessibility tools is still recommended for comprehensive accessibility evaluation.

## Installation and Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/wcag-accessibility-inspector.git
   cd wcag-accessibility-inspector
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to http://localhost:5000

## Deployment

### Deploying on Replit

1. Fork this project on Replit
2. The application will automatically use Replit's built-in hosting
3. Click the 'Run' button to start the server
4. Your app will be available at your-repl-name.replit.app

### Deploying on Other Platforms

1. Fork this repository on GitHub
2. Connect your GitHub account to your preferred hosting platform (Vercel, Netlify, etc.)
3. Import the repository and configure build settings appropriate for your platform
4. Deploy and your app will be live

## Forking and Contributing

### How to Fork

1. Click the 'Fork' button at the top right of the repository page
2. Clone your forked repository to your local machine
3. Make your changes and improvements
4. Push to your fork and submit a pull request

### Contributing Guidelines

1. Create an issue describing the feature or bug fix you'd like to implement
2. Fork the repository and create a branch for your feature
3. Make your changes, following the code style of the project
4. Add or update tests as necessary
5. Submit a pull request with a comprehensive description of changes

## Customization

### Adding New WCAG Criteria

To add new criteria to the analyzer, edit the following files:

1. server/accessibility.ts - Add a new analysis function and update the wcagCriteria array
2. shared/schema.ts - Update schemas if necessary
3. client/src/lib/wcag-criteria.ts - Add the new criteria to the frontend list

### Changing the UI Theme

1. Edit theme.json to modify the color scheme
2. Update tailwind.config.ts for custom tailwind settings