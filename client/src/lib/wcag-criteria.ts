// WCAG 2.2 criteria definitions
export const wcagCriteria = [
  {
    id: "1.3.5", 
    name: "Input Purpose", 
    level: "AA",
    description: "The purpose of each input field collecting information about the user can be programmatically determined."
  },
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
