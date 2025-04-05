import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function WcagInfoSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle id="wcag-info-header">About WCAG 2.2</CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="prose max-w-none text-gray-700 dark:text-gray-300 dark:prose-headings:text-white dark:prose-strong:text-gray-200">
          <p>
            The Web Content Accessibility Guidelines (WCAG) 2.2 provide recommendations for making web content more accessible
            to people with disabilities including blindness, low vision, deafness, hearing loss, learning disabilities,
            cognitive limitations, motor limitations, speech disabilities, and combinations of these.
          </p>
          
          <h3 className="text-base font-medium mt-4 mb-2">Key Success Criteria in WCAG 2.2</h3>
          
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>2.4.7 Focus Visible</strong> - Any keyboard operable user interface has a mode of operation where the keyboard focus indicator is visible.</li>
            <li><strong>1.3.5 Identify Input Purpose</strong> - The purpose of each input field collecting information about the user can be programmatically determined.</li>
            <li><strong>2.5.8 Target Size (Minimum)</strong> - The size of the target for pointer inputs is at least 24 by 24 CSS pixels.</li>
            <li><strong>2.4.11 Focus Appearance</strong> - When a user interface component receives keyboard focus, the focus indication meets minimum contrast and size requirements.</li>
            <li><strong>2.5.7 Dragging Movements</strong> - All functionality that uses a dragging movement can be operated by a single pointer without dragging.</li>
            <li><strong>3.2.6 Consistent Help</strong> - If a web page contains help mechanisms, these are presented consistently.</li>
            <li><strong>3.3.7 Redundant Entry</strong> - Information previously entered by the user is auto-populated or available for the user to select.</li>
            <li><strong>3.3.8 Accessible Authentication</strong> - If authentication requires cognitive function test, alternative authentication method is available.</li>
            <li><strong>3.3.9 Accessible Authentication (No Exception)</strong> - Authentication does not rely on cognitive function tests.</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
