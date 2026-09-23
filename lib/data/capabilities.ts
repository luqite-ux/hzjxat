export interface Capability {
  title: string
  description: string
  image: string
  points: string[]
}

export const capabilities: Capability[] = [
  {
    title: "Custom & Non-Standard Automation",
    description:
      "Requirement-driven design of assembly, testing and handling systems for parts that standard machines cannot process.",
    image: "/images/company/jx-branded-production-line.jpg",
    points: [
      "Mechanical design for host-part specific fixtures",
      "Multi-station line layout for complex process sequences",
      "Engineering iteration through prototyping and trial runs",
    ],
  },
  {
    title: "Machine Vision",
    description:
      "Camera-based inspection for dimension, surface defect, presence and orientation checks across product families.",
    image: "/images/capability/vision-inspection-software.jpg",
    points: [
      "Lighting and optics selection tuned per part geometry",
      "Configurable inspection algorithms and tolerance bands",
      "Pass/reject sorting integrated with line control",
    ],
  },
  {
    title: "Robotics Applications",
    description:
      "Robotic pick-and-place, riveting and multi-axis handling integrated with vision and PLC control for repeatable cycles.",
    image: "/images/company/jx-control-cabinet.jpg",
    points: [
      "Robot integration with vision-guided positioning",
      "Multi-axis handling for varied part geometries",
      "Safety-enclosed work cells with interlocked access",
    ],
  },
  {
    title: "Software & Production Monitoring",
    description:
      "PLC and HMI software development with production monitoring interfaces to support process control and traceability.",
    image: "/images/capability/production-monitoring-software.jpg",
    points: [
      "PLC / HMI program development per process",
      "Configurable data logging for process parameters",
      "Interfaces designed for operator clarity on the shop floor",
    ],
  },
  {
    title: "Assembly & Testing Lines",
    description:
      "Integrated assembly and functional testing platforms that combine multiple process steps into a single controlled line.",
    image: "/images/company/assembly-line-wide.jpg",
    points: [
      "Press-fit, riveting and fastening automation",
      "In-line functional or leak testing stations",
      "Per-unit result handling for pass/reject sorting",
    ],
  },
]

export interface ProcessStep {
  step: string
  title: string
  description: string
}

export const processSteps: ProcessStep[] = [
  {
    step: "01",
    title: "Requirement Analysis",
    description:
      "Review of part drawings, production volume and process constraints to define equipment scope and feasibility.",
  },
  {
    step: "02",
    title: "Concept & Design",
    description:
      "Mechanical, electrical and vision/software concept development, reviewed against the customer's process requirements.",
  },
  {
    step: "03",
    title: "Build",
    description:
      "Fabrication and assembly of mechanical structures, control cabinets, vision stations and fixtures in-house.",
  },
  {
    step: "04",
    title: "Test",
    description:
      "Functional testing of individual stations and the integrated system against defined process parameters.",
  },
  {
    step: "05",
    title: "Commissioning",
    description:
      "On-site or factory commissioning with process validation before handover to production.",
  },
  {
    step: "06",
    title: "Support",
    description:
      "Post-commissioning technical support for process adjustment, inspection reports and issue review upon request.",
  },
]
