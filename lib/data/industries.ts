export interface Industry {
  slug: string
  name: string
  summary: string
  examples: string[]
  relatedProductSlugs: string[]
}

export const industries: Industry[] = [
  {
    slug: "automotive",
    name: "Automotive",
    summary:
      "Assembly, riveting and functional testing systems for structural, fluid and camera-related automotive components.",
    examples: [
      "Water hose fitting assembly and leak testing",
      "Camera bracket riveting and inspection",
      "Charging valve assembly and function testing",
    ],
    relatedProductSlugs: [
      "automotive-water-hose-assembly-testing-equipment",
      "automotive-camera-bracket-riveting-inspection-machine",
      "charging-valve-assembly-testing-equipment",
    ],
  },
  {
    slug: "medical-devices",
    name: "Medical Devices",
    summary:
      "Vision-inspected assembly lines built for the consistency medical filter and consumable components require.",
    examples: ["Medical filter automated vision inspection and assembly"],
    relatedProductSlugs: ["medical-filter-automatic-vision-inspection-line"],
  },
  {
    slug: "electronics",
    name: "Electronics",
    summary:
      "Small-parts handling, orientation and vision inspection for electronics and precision mechanical components.",
    examples: ["Small parts tray loading", "Vision counting and packaging"],
    relatedProductSlugs: ["small-parts-tray-loading-machine", "vision-counting-packaging-machine"],
  },
  {
    slug: "new-energy",
    name: "New Energy",
    summary: "Assembly and function-test systems supporting valve and fluid-handling components for new energy applications.",
    examples: ["Charging valve assembly and testing"],
    relatedProductSlugs: ["charging-valve-assembly-testing-equipment"],
  },
  {
    slug: "hardware",
    name: "Hardware",
    summary: "Vision inspection, assembly and counting equipment for precision hardware and fastener components.",
    examples: ["Oil seal vision inspection", "O-ring assembly", "Vision counting packaging"],
    relatedProductSlugs: [
      "oil-seal-vision-inspection-machine",
      "o-ring-assembly-machine",
      "vision-counting-packaging-machine",
    ],
  },
  {
    slug: "adhesive-rubber",
    name: "Adhesive & Rubber",
    summary: "Inspection and assembly systems for O-rings, seals and elastomer components with tight defect tolerances.",
    examples: ["O-ring vision inspection", "O-ring assembly"],
    relatedProductSlugs: ["o-ring-vision-inspection-machine", "o-ring-assembly-machine"],
  },
  {
    slug: "machining",
    name: "Machining",
    summary: "Automation for downstream handling and inspection of machined components feeding assembly or packaging.",
    examples: ["Small parts tray loading", "Oil seal vision inspection"],
    relatedProductSlugs: ["small-parts-tray-loading-machine", "oil-seal-vision-inspection-machine"],
  },
  {
    slug: "water-meter-appliance",
    name: "Water Meter & Household Appliance",
    summary:
      "Custom assembly and inspection systems adaptable to water meter and household appliance component production.",
    examples: ["Custom assembly and testing equipment engineered to component design"],
    relatedProductSlugs: ["o-ring-assembly-machine", "vision-counting-packaging-machine"],
  },
]

export function getIndustryBySlug(slug: string): Industry | undefined {
  return industries.find((industry) => industry.slug === slug)
}
