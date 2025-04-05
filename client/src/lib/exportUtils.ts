import { jsPDF } from 'jspdf';
import { saveAs } from 'file-saver';
import { AnalysisResponse, CriterionResult } from '@shared/schema';

/**
 * Export analysis results to PDF with enhanced formatting
 */
export function exportToPdf(data: AnalysisResponse): void {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - (margin * 2);
  
  // Helper function to draw section header with background
  const drawSectionHeader = (text: string, y: number) => {
    // Draw background rectangle
    doc.setFillColor(59, 130, 246); // #3B82F6 - Primary blue
    doc.rect(margin, y - 5, contentWidth, 10, 'F');
    
    // Draw text in white
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(text, margin + 2, y);
    
    // Reset colors
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'normal');
    
    return y + 10; // Return updated Y position
  };
  
  // Helper function to draw separator line
  const drawSeparator = (y: number) => {
    doc.setDrawColor(200, 200, 200);
    doc.line(margin, y, pageWidth - margin, y);
    doc.setDrawColor(0, 0, 0);
    return y + 5;
  };
  
  // Helper function to draw detailed result
  const drawCriterionResult = (result: CriterionResult, y: number) => {
    let currentY = y;
    
    // Draw criterion header with light background
    doc.setFillColor(240, 249, 255); // Light blue background
    doc.rect(margin, currentY - 2, contentWidth, 26, 'F');
    
    // Criterion ID and name
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(`${result.criterionId} - ${result.name}`, margin + 2, currentY + 4);
    currentY += 8;
    
    // WCAG Level and Principle
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Level ${result.level} • ${result.principle}`, margin + 2, currentY + 4);
    currentY += 8;
    
    // Status badge
    if (result.passed) {
      doc.setFillColor(22, 163, 74); // Green
      doc.roundedRect(margin + 2, currentY, 50, 7, 2, 2, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(10);
      doc.text('PASSED', margin + 12, currentY + 5);
    } else {
      doc.setFillColor(220, 38, 38); // Red
      doc.roundedRect(margin + 2, currentY, 50, 7, 2, 2, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(10);
      doc.text('FAILED', margin + 12, currentY + 5);
    }
    doc.setTextColor(0, 0, 0);
    currentY += 12;
    
    // Description
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('Description:', margin, currentY);
    doc.setFont('helvetica', 'normal');
    const descLines = doc.splitTextToSize(result.description, contentWidth - 5);
    doc.text(descLines, margin + 20, currentY);
    currentY += (descLines.length * 5) + 5;
    
    // Findings
    doc.setFont('helvetica', 'bold');
    doc.text('Findings:', margin, currentY);
    doc.setFont('helvetica', 'normal');
    const findingsLines = doc.splitTextToSize(result.findings, contentWidth - 5);
    doc.text(findingsLines, margin + 20, currentY);
    currentY += (findingsLines.length * 5) + 5;
    
    // How to fix (if failed)
    if (!result.passed && result.howToFix) {
      doc.setFont('helvetica', 'bold');
      doc.text('How to fix:', margin, currentY);
      doc.setFont('helvetica', 'normal');
      const fixLines = doc.splitTextToSize(result.howToFix, contentWidth - 5);
      doc.text(fixLines, margin + 20, currentY);
      currentY += (fixLines.length * 5) + 5;
    }
    
    return currentY;
  };
  
  // Cover page
  // -------------------------------------------------------
  // Draw header/logo section
  doc.setFillColor(59, 130, 246); // #3B82F6 - Primary blue
  doc.rect(0, 0, pageWidth, 60, 'F');
  
  // Draw title
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(28);
  doc.setFont('helvetica', 'bold');
  doc.text('WCAG Accessibility', margin, 40);
  doc.text('Analysis Report', margin, 55);
  doc.setTextColor(0, 0, 0);
  
  // Draw modern accessibility icon based on the provided image
  const iconSize = 40;
  const iconX = pageWidth - margin - iconSize;
  const iconY = 30;
  
  // White circle background
  doc.setFillColor(255, 255, 255);
  doc.circle(iconX, iconY, 25, 'F');
  
  // Draw accessibility icon (based on the image provided)
  doc.setFillColor(59, 130, 246); // #3B82F6 - Primary blue
  
  // Center dot
  doc.circle(iconX, iconY + 5, 4, 'F');
  
  // Inner curved lines
  doc.setLineWidth(2.5);
  doc.setDrawColor(59, 130, 246);
  
  // First arc (smallest)
  doc.ellipse(iconX, iconY, 9, 9, 'S');
  
  // Second arc (medium)
  doc.ellipse(iconX, iconY - 5, 15, 15, 'S');
  
  // Third arc (largest)
  doc.ellipse(iconX, iconY - 8, 20, 20, 'S');
  
  // Right side diagonal line
  doc.setLineWidth(4);
  doc.line(iconX + 12, iconY + 12, iconX + 20, iconY + 20);
  
  // Left side diagonal line
  doc.line(iconX - 12, iconY + 12, iconX - 20, iconY + 20);
  
  // Set default text
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  
  // URL and date
  let currentY = 90;
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Website:', margin, currentY);
  doc.setFont('helvetica', 'normal');
  doc.text(data.url, margin + 50, currentY);
  currentY += 10;
  
  doc.setFont('helvetica', 'bold');
  doc.text('Date:', margin, currentY);
  doc.setFont('helvetica', 'normal');
  doc.text(new Date().toLocaleDateString(), margin + 50, currentY);
  currentY += 20;
  
  // Overall score with visual indicator
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Overall Compliance Score', margin, currentY);
  currentY += 15;
  
  const scorePercentage = Math.round((data.passedCriteria / data.totalCriteria) * 100);
  
  // Draw score circle
  const circleX = margin + 40;
  const circleY = currentY + 20;
  const circleRadius = 30;
  
  // Draw circle background
  doc.setFillColor(240, 240, 240);
  doc.circle(circleX, circleY, circleRadius, 'F');
  
  // Draw score text
  doc.setFontSize(24);
  doc.setTextColor(59, 130, 246);
  
  // Center text in circle
  const textWidth = doc.getStringUnitWidth(`${scorePercentage}%`) * 24 / doc.internal.scaleFactor;
  doc.text(`${scorePercentage}%`, circleX - (textWidth / 2), circleY + 8);
  doc.setTextColor(0, 0, 0);
  
  // Draw pass/fail details
  doc.setFontSize(14);
  doc.setFont('helvetica', 'normal');
  doc.text(`${data.passedCriteria} of ${data.totalCriteria} criteria passed`, margin + 80, currentY + 10);
  
  const statusText = scorePercentage >= 75 ? 'Good' : (scorePercentage >= 50 ? 'Needs Improvement' : 'Poor');
  doc.setFont('helvetica', 'bold');
  doc.text(`Status: ${statusText}`, margin + 80, currentY + 25);
  
  currentY += 60;
  
  // Summary
  currentY = drawSectionHeader('Summary', currentY);
  currentY += 10;
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  const summaryLines = doc.splitTextToSize(data.summary, contentWidth);
  doc.text(summaryLines, margin, currentY);
  currentY += (summaryLines.length * 6) + 15;
  
  // Draw WCAG Principles breakdown
  currentY = drawSectionHeader('Compliance by WCAG Principle', currentY);
  currentY += 15;
  
  const principles = [
    { name: 'Perceivable', results: data.results.filter(r => r.principle === 'Perceivable') },
    { name: 'Operable', results: data.results.filter(r => r.principle === 'Operable') },
    { name: 'Understandable', results: data.results.filter(r => r.principle === 'Understandable') },
    { name: 'Robust', results: data.results.filter(r => r.principle === 'Robust') }
  ];
  
  for (const principle of principles) {
    const passedCount = principle.results.filter(r => r.passed).length;
    const principlePercentage = Math.round((passedCount / principle.results.length) * 100);
    
    // Draw principle bar
    const barWidth = 120;
    const barHeight = 12;
    const filledWidth = (principlePercentage / 100) * barWidth;
    
    // Background bar
    doc.setFillColor(220, 220, 220);
    doc.roundedRect(margin + 50, currentY - 9, barWidth, barHeight, 2, 2, 'F');
    
    // Filled portion
    const fillColor = principlePercentage >= 75 ? [22, 163, 74] : // Green
                     (principlePercentage >= 50 ? [245, 158, 11] : // Orange
                     [220, 38, 38]); // Red
    doc.setFillColor(fillColor[0], fillColor[1], fillColor[2]);
    
    if (filledWidth > 0) {
      // Make sure we have rounded corners on left, straight on right for partial fill
      doc.roundedRect(margin + 50, currentY - 9, filledWidth, barHeight, 2, 2, 'F');
    }
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(`${principle.name}:`, margin, currentY);
    
    doc.setFont('helvetica', 'normal');
    doc.text(`${principlePercentage}%`, margin + barWidth + 60, currentY);
    
    doc.setFontSize(10);
    doc.text(`(${passedCount} of ${principle.results.length} passed)`, margin + barWidth + 80, currentY);
    
    currentY += 20;
  }
  
  // Add footer
  doc.setFontSize(8);
  doc.setTextColor(100, 100, 100);
  doc.text('Generated with WCAG Inspector - Page 1', pageWidth / 2, pageHeight - 10, { align: 'center' });
  doc.setTextColor(0, 0, 0);
  
  // Detailed results
  // -------------------------------------------------------
  doc.addPage();
  currentY = 20;
  
  // Add header with icon
  doc.setFillColor(59, 130, 246); // #3B82F6 - Primary blue
  doc.rect(0, 0, pageWidth, 20, 'F');
  
  // Add accessibility icon to header
  const headerIconSize = 14;
  const headerIconX = margin + 10;
  const headerIconY = 10;
  
  // White circle background
  doc.setFillColor(255, 255, 255);
  doc.circle(headerIconX, headerIconY, 7, 'F');
  
  // Accessibility icon
  doc.setFillColor(59, 130, 246);
  doc.circle(headerIconX, headerIconY + 1.5, 1.2, 'F'); // Center dot
  
  doc.setLineWidth(0.8);
  doc.setDrawColor(59, 130, 246);
  
  // Curved lines
  doc.ellipse(headerIconX, headerIconY + 0.5, 2.5, 2.5, 'S'); // Small arc
  doc.ellipse(headerIconX, headerIconY - 0.5, 4, 4, 'S'); // Medium arc
  doc.ellipse(headerIconX, headerIconY - 1.5, 5.5, 5.5, 'S'); // Large arc
  
  // Diagonal lines
  doc.setLineWidth(1);
  doc.line(headerIconX + 3, headerIconY + 3, headerIconX + 5, headerIconY + 5);
  doc.line(headerIconX - 3, headerIconY + 3, headerIconX - 5, headerIconY + 5);
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('WCAG Accessibility Analysis Report', pageWidth / 2, 13, { align: 'center' });
  doc.setTextColor(0, 0, 0);
  
  currentY = drawSectionHeader('Detailed Analysis Results', currentY + 10);
  currentY += 10;
  
  let pageCount = 2;
  
  // Group by principle
  for (const principle of principles) {
    if (currentY > pageHeight - 50) {
      doc.addPage();
      pageCount++;
      
      // Add header with icon to new page
      doc.setFillColor(59, 130, 246);
      doc.rect(0, 0, pageWidth, 20, 'F');
      
      // Add accessibility icon to header
      const headerIconX = margin + 10;
      const headerIconY = 10;
      
      // White circle background
      doc.setFillColor(255, 255, 255);
      doc.circle(headerIconX, headerIconY, 7, 'F');
      
      // Accessibility icon
      doc.setFillColor(59, 130, 246);
      doc.circle(headerIconX, headerIconY + 1.5, 1.2, 'F'); // Center dot
      
      doc.setLineWidth(0.8);
      doc.setDrawColor(59, 130, 246);
      
      // Curved lines
      doc.ellipse(headerIconX, headerIconY + 0.5, 2.5, 2.5, 'S'); // Small arc
      doc.ellipse(headerIconX, headerIconY - 0.5, 4, 4, 'S'); // Medium arc
      doc.ellipse(headerIconX, headerIconY - 1.5, 5.5, 5.5, 'S'); // Large arc
      
      // Diagonal lines
      doc.setLineWidth(1);
      doc.line(headerIconX + 3, headerIconY + 3, headerIconX + 5, headerIconY + 5);
      doc.line(headerIconX - 3, headerIconY + 3, headerIconX - 5, headerIconY + 5);
      
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('WCAG Accessibility Analysis Report', pageWidth / 2, 13, { align: 'center' });
      doc.setTextColor(0, 0, 0);
      
      currentY = 30;
    }
    
    // Draw principle header
    doc.setFillColor(230, 240, 250);
    doc.rect(margin, currentY - 5, contentWidth, 10, 'F');
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(59, 130, 246);
    doc.text(`${principle.name} (${principle.results.length} criteria)`, margin + 2, currentY + 2);
    doc.setTextColor(0, 0, 0);
    currentY += 15;
    
    // Draw each criterion in this principle
    for (const result of principle.results) {
      // Check if we need a new page
      if (currentY > pageHeight - 80) {
        // Add footer to current page
        doc.setFontSize(8);
        doc.setTextColor(100, 100, 100);
        doc.text(`Generated with WCAG Inspector - Page ${pageCount}`, pageWidth / 2, pageHeight - 10, { align: 'center' });
        doc.setTextColor(0, 0, 0);
        
        doc.addPage();
        pageCount++;
        
        // Add header with icon to new page
        doc.setFillColor(59, 130, 246);
        doc.rect(0, 0, pageWidth, 20, 'F');
        
        // Add accessibility icon to header
        const headerIconX = margin + 10;
        const headerIconY = 10;
        
        // White circle background
        doc.setFillColor(255, 255, 255);
        doc.circle(headerIconX, headerIconY, 7, 'F');
        
        // Accessibility icon
        doc.setFillColor(59, 130, 246);
        doc.circle(headerIconX, headerIconY + 1.5, 1.2, 'F'); // Center dot
        
        doc.setLineWidth(0.8);
        doc.setDrawColor(59, 130, 246);
        
        // Curved lines
        doc.ellipse(headerIconX, headerIconY + 0.5, 2.5, 2.5, 'S'); // Small arc
        doc.ellipse(headerIconX, headerIconY - 0.5, 4, 4, 'S'); // Medium arc
        doc.ellipse(headerIconX, headerIconY - 1.5, 5.5, 5.5, 'S'); // Large arc
        
        // Diagonal lines
        doc.setLineWidth(1);
        doc.line(headerIconX + 3, headerIconY + 3, headerIconX + 5, headerIconY + 5);
        doc.line(headerIconX - 3, headerIconY + 3, headerIconX - 5, headerIconY + 5);
        
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text('WCAG Accessibility Analysis Report', pageWidth / 2, 13, { align: 'center' });
        doc.setTextColor(0, 0, 0);
        
        currentY = 30;
      }
      
      currentY = drawCriterionResult(result, currentY);
      currentY = drawSeparator(currentY);
      currentY += 5;
    }
  }
  
  // Add footer to last page
  doc.setFontSize(8);
  doc.setTextColor(100, 100, 100);
  doc.text(`Generated with WCAG Inspector - Page ${pageCount}`, pageWidth / 2, pageHeight - 10, { align: 'center' });
  
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