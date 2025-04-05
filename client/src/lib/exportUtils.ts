import { jsPDF } from 'jspdf';
import { saveAs } from 'file-saver';
import { AnalysisResponse, CriterionResult } from '@shared/schema';

/**
 * Export analysis results to PDF
 */
export function exportToPdf(data: AnalysisResponse): void {
  const doc = new jsPDF();
  
  // Set default font
  doc.setFont('helvetica', 'normal');
  
  // Title and URL
  doc.setFontSize(18);
  doc.text('WCAG Accessibility Analysis Report', 20, 20);
  
  doc.setFontSize(12);
  doc.text(`URL: ${data.url}`, 20, 30);
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 36);
  
  // Overall score
  doc.setFontSize(14);
  doc.text('Overall Score', 20, 46);
  doc.setFontSize(12);
  doc.text(`${data.passedCriteria} of ${data.totalCriteria} criteria passed (${Math.round((data.passedCriteria / data.totalCriteria) * 100)}%)`, 20, 52);
  
  // Summary
  doc.setFontSize(14);
  doc.text('Summary', 20, 62);
  doc.setFontSize(12);
  
  // Split summary into multiple lines if needed
  const summaryLines = doc.splitTextToSize(data.summary, 170);
  doc.text(summaryLines, 20, 68);
  
  let yPosition = 68 + (summaryLines.length * 6);
  
  // WCAG Principles breakdown
  const principles = [
    { name: 'Perceivable', results: data.results.filter(r => r.principle === 'Perceivable') },
    { name: 'Operable', results: data.results.filter(r => r.principle === 'Operable') },
    { name: 'Understandable', results: data.results.filter(r => r.principle === 'Understandable') },
    { name: 'Robust', results: data.results.filter(r => r.principle === 'Robust') }
  ];
  
  // Add page break if needed
  if (yPosition > 250) {
    doc.addPage();
    yPosition = 20;
  }
  
  // WCAG Principles breakdown
  doc.setFontSize(14);
  doc.text('Results by WCAG Principle', 20, yPosition);
  yPosition += 8;
  
  for (const principle of principles) {
    const passedCount = principle.results.filter(r => r.passed).length;
    
    doc.setFontSize(12);
    doc.text(`${principle.name}: ${passedCount} of ${principle.results.length} passed (${Math.round((passedCount / principle.results.length) * 100)}%)`, 20, yPosition);
    yPosition += 7;
  }
  
  yPosition += 5;
  
  // Add a page break before detailed results
  doc.addPage();
  yPosition = 20;
  
  // Detailed results
  doc.setFontSize(14);
  doc.text('Detailed Results', 20, yPosition);
  yPosition += 10;
  
  // Loop through each result
  for (const result of data.results) {
    // Add page break if needed
    if (yPosition > 250) {
      doc.addPage();
      yPosition = 20;
    }
    
    // Criterion name and ID
    doc.setFontSize(12);
    doc.text(`${result.criterionId} - ${result.name} (Level ${result.level})`, 20, yPosition);
    yPosition += 5;
    
    // Status
    if (result.passed) {
      doc.setTextColor(0, 128, 0); // Green
      doc.text('PASSED', 20, yPosition);
    } else {
      doc.setTextColor(220, 0, 0); // Red
      doc.text('FAILED', 20, yPosition);
    }
    doc.setTextColor(0, 0, 0); // Reset to black
    yPosition += 5;
    
    // Description
    doc.setFontSize(10);
    const descLines = doc.splitTextToSize(`Description: ${result.description}`, 170);
    doc.text(descLines, 20, yPosition);
    yPosition += (descLines.length * 5);
    
    // Findings
    const findingsLines = doc.splitTextToSize(`Findings: ${result.findings}`, 170);
    doc.text(findingsLines, 20, yPosition);
    yPosition += (findingsLines.length * 5);
    
    // How to fix (if failed)
    if (!result.passed && result.howToFix) {
      const fixLines = doc.splitTextToSize(`How to fix: ${result.howToFix}`, 170);
      doc.text(fixLines, 20, yPosition);
      yPosition += (fixLines.length * 5);
    }
    
    yPosition += 5;
  }
  
  // Save the PDF
  doc.save(`accessibility-report-${new Date().toISOString().split('T')[0]}.pdf`);
}

/**
 * Export analysis results to CSV
 */
export function exportToCsv(data: AnalysisResponse): void {
  // Create CSV headers
  let csv = 'Criterion ID,Name,Level,Principle,Status,Findings\n';
  
  // Add each result as a row
  for (const result of data.results) {
    // Escape quotes in text fields
    const escapedFindings = result.findings.replace(/"/g, '""');
    
    // Add row
    csv += `${result.criterionId},"${result.name}",${result.level},${result.principle},${result.passed ? 'Passed' : 'Failed'},"${escapedFindings}"\n`;
  }
  
  // Create a blob and download
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  saveAs(blob, `accessibility-report-${new Date().toISOString().split('T')[0]}.csv`);
}