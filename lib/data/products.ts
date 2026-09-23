export type ProductCategory = "Custom Automation Equipment" | "Standard Automation Equipment"

export type ProductGroup = "Vision Inspection" | "Assembly" | "Assembly and Testing"

export interface Product {
  slug: string
  name: string
  shortName: string
  category: ProductCategory
  group: ProductGroup
  image: string
  summary: string
  overview: string[]
  applications: string[]
  processFlow: string[]
  specifications: { label: string; value: string }[]
  relatedSlugs: string[]
}

// Representative catalog based on confirmed source data. This structure is
// intentionally flat and serializable so a future backend/CMS integration can
// replace or extend entries without changing consuming components.
export const products: Product[] = [
  {
    slug: "oil-seal-vision-inspection-machine",
    name: "Oil Seal Vision Inspection Machine",
    shortName: "Oil Seal Vision Inspection",
    category: "Standard Automation Equipment",
    group: "Vision Inspection",
    image: "/images/products/oil-seal-vision-inspection-machine.jpg",
    summary:
      "Automated vision inspection for oil seal geometry, surface defects and orientation prior to packaging.",
    overview: [
      "Configured for high-volume oil seal inspection, this machine combines part feeding, camera-based inspection and sorting into a single compact station.",
      "Vision algorithms check outer/inner diameter, lip condition, flash and surface defects against configurable tolerance bands.",
    ],
    applications: [
      "Automotive sealing components",
      "Hardware and machining suppliers",
      "Rubber and elastomer parts producers",
    ],
    processFlow: [
      "Bulk or tray part feeding",
      "Part orientation and positioning",
      "Multi-angle camera capture",
      "Vision algorithm defect and dimension check",
      "Automated sorting: pass / reject",
    ],
    specifications: [
      { label: "Inspection type", value: "Dimension, surface defect, orientation" },
      { label: "Feeding method", value: "Vibratory bowl or tray, configurable" },
      { label: "Control", value: "PLC + industrial vision controller" },
      { label: "Output", value: "Automated pass/reject sorting" },
    ],
    relatedSlugs: ["o-ring-vision-inspection-machine", "vision-counting-packaging-machine"],
  },
  {
    slug: "o-ring-vision-inspection-machine",
    name: "O-ring Vision Inspection Machine",
    shortName: "O-ring Vision Inspection",
    category: "Standard Automation Equipment",
    group: "Vision Inspection",
    image: "/images/products/o-ring-vision-inspection-machine.jpg",
    summary:
      "High-speed vision inspection for O-ring flash, cut lines, deformation and foreign material.",
    overview: [
      "Designed for rubber and sealing component lines where O-rings must be checked for flash, splits, deformation and foreign material before shipment.",
      "The system integrates part singulation, illumination control and vision processing for repeatable inspection results.",
    ],
    applications: [
      "Rubber and adhesive component manufacturers",
      "Automotive and hydraulic sealing supply chains",
      "General machining and hardware production",
    ],
    processFlow: [
      "Automated part singulation",
      "Controlled backlight / ring-light illumination",
      "Camera capture from calibrated fixture",
      "Defect classification against configured criteria",
      "Sorting into pass / reject outputs",
    ],
    specifications: [
      { label: "Inspection type", value: "Flash, cut line, deformation, foreign material" },
      { label: "Illumination", value: "Configurable backlight / ring light" },
      { label: "Control", value: "PLC + industrial vision controller" },
      { label: "Output", value: "Automated pass/reject sorting" },
    ],
    relatedSlugs: ["oil-seal-vision-inspection-machine", "o-ring-assembly-machine"],
  },
  {
    slug: "small-parts-tray-loading-machine",
    name: "Small Parts Tray Loading Machine",
    shortName: "Small Parts Tray Loading",
    category: "Standard Automation Equipment",
    group: "Vision Inspection",
    image: "/images/products/small-parts-tray-loading-machine.jpg",
    summary:
      "Vision-guided orientation and tray loading for small precision components ahead of downstream processes.",
    overview: [
      "This machine orients bulk-fed small parts and places them into trays with consistent positioning, reducing manual handling before machining, assembly or packaging.",
      "Vision guidance confirms part orientation and completeness before each placement cycle.",
    ],
    applications: [
      "Precision hardware components",
      "Electronics and small mechanical parts",
      "Machining shops feeding downstream automation",
    ],
    processFlow: [
      "Bulk part feeding and separation",
      "Vision-guided orientation check",
      "Robotic or mechanical pick-and-place",
      "Tray indexing and placement verification",
      "Full-tray output to next process",
    ],
    specifications: [
      { label: "Positioning", value: "Vision-guided orientation and placement" },
      { label: "Tray handling", value: "Automated indexing and full-tray detection" },
      { label: "Control", value: "PLC + vision controller" },
      { label: "Output", value: "Oriented parts loaded on tray" },
    ],
    relatedSlugs: ["vision-counting-packaging-machine", "oil-seal-vision-inspection-machine"],
  },
  {
    slug: "vision-counting-packaging-machine",
    name: "Vision Counting Packaging Machine",
    shortName: "Vision Counting Packaging",
    category: "Standard Automation Equipment",
    group: "Vision Inspection",
    image: "/images/products/vision-counting-packaging-machine.jpg",
    summary:
      "Vision-based counting and packaging for small parts, reducing manual count errors on shipping lines.",
    overview: [
      "Combines high-speed vision counting with automated packaging control to remove manual counting steps from shipping and kitting workflows.",
      "Counting accuracy and batch size are configurable per part family and packaging format.",
    ],
    applications: [
      "Hardware and fastener packaging",
      "Rubber and sealing component distribution",
      "General small-parts kitting operations",
    ],
    processFlow: [
      "Bulk part feeding onto inspection surface",
      "Vision-based part counting",
      "Batch quantity confirmation",
      "Automated discharge into packaging",
      "Reject handling for miscounts",
    ],
    specifications: [
      { label: "Counting method", value: "Vision-based part counting" },
      { label: "Batch configuration", value: "Adjustable target quantity per batch" },
      { label: "Control", value: "PLC + vision controller" },
      { label: "Output", value: "Counted batches ready for packaging" },
    ],
    relatedSlugs: ["small-parts-tray-loading-machine", "o-ring-vision-inspection-machine"],
  },
  {
    slug: "o-ring-assembly-machine",
    name: "O-ring Assembly Machine",
    shortName: "O-ring Assembly",
    category: "Standard Automation Equipment",
    group: "Assembly",
    image: "/images/products/o-ring-assembly-machine.jpg",
    summary:
      "Automated O-ring placement onto host components with fit and presence verification.",
    overview: [
      "Automates O-ring stretching and placement onto host parts, replacing manual assembly steps that are slow and inconsistent by hand.",
      "Presence and seating verification confirm correct assembly before parts move downstream.",
    ],
    applications: [
      "Automotive fluid and sealing assemblies",
      "Hardware and valve component assembly",
      "Rubber and adhesive component integration",
    ],
    processFlow: [
      "Host part loading and fixturing",
      "O-ring feeding and expansion",
      "Automated placement onto host part",
      "Seating and presence verification",
      "Assembled part discharge",
    ],
    specifications: [
      { label: "Assembly method", value: "Automated O-ring expansion and placement" },
      { label: "Verification", value: "Presence and seating check" },
      { label: "Control", value: "PLC with sensor feedback" },
      { label: "Output", value: "Verified assembled components" },
    ],
    relatedSlugs: ["o-ring-vision-inspection-machine", "charging-valve-assembly-testing-equipment"],
  },
  {
    slug: "automotive-water-hose-assembly-testing-equipment",
    name: "Automotive Water Hose Assembly and Testing Equipment",
    shortName: "Water Hose Assembly & Testing",
    category: "Custom Automation Equipment",
    group: "Assembly and Testing",
    image: "/images/products/automotive-water-hose-assembly-testing-equipment.jpg",
    summary:
      "Custom line for automotive water hose fitting assembly with integrated leak and function testing.",
    overview: [
      "A non-standard automation system engineered for automotive water hose assemblies, combining fitting insertion, clamping and in-line testing on one platform.",
      "Testing stations verify leak-tightness and assembly integrity before parts are released to the next stage of production.",
    ],
    applications: [
      "Automotive cooling and fluid systems",
      "Hose and fitting sub-assembly suppliers",
    ],
    processFlow: [
      "Hose and fitting loading",
      "Automated fitting insertion / clamping",
      "In-line leak and function testing",
      "Result logging per unit",
      "Sorting: pass / reject discharge",
    ],
    specifications: [
      { label: "Process", value: "Fitting assembly with integrated testing" },
      { label: "Test type", value: "Leak-tightness and function verification" },
      { label: "Traceability", value: "Per-unit result logging (configurable)" },
      { label: "Customization", value: "Fixtures and test parameters engineered per part" },
    ],
    relatedSlugs: ["charging-valve-assembly-testing-equipment", "automotive-camera-bracket-riveting-inspection-machine"],
  },
  {
    slug: "charging-valve-assembly-testing-equipment",
    name: "Charging Valve Assembly and Testing Equipment",
    shortName: "Charging Valve Assembly & Testing",
    category: "Custom Automation Equipment",
    group: "Assembly and Testing",
    image: "/images/products/charging-valve-assembly-testing-equipment.jpg",
    summary:
      "Custom assembly and functional test line for charging valve components used in fluid and thermal systems.",
    overview: [
      "Engineered for charging valve production, this system integrates component assembly with pressure or function testing to confirm valve performance before packout.",
      "Fixtures, torque/press parameters and test thresholds are configured to the customer's valve design.",
    ],
    applications: [
      "New energy thermal and fluid systems",
      "Automotive charging and refrigerant valve components",
    ],
    processFlow: [
      "Component and sub-part loading",
      "Automated press-fit / assembly",
      "Functional or pressure testing",
      "Result recording per unit",
      "Sorting: pass / reject discharge",
    ],
    specifications: [
      { label: "Process", value: "Valve component assembly with functional test" },
      { label: "Test type", value: "Pressure / function verification (per design)" },
      { label: "Traceability", value: "Per-unit result logging (configurable)" },
      { label: "Customization", value: "Fixtures and test parameters engineered per valve" },
    ],
    relatedSlugs: ["automotive-water-hose-assembly-testing-equipment", "o-ring-assembly-machine"],
  },
  {
    slug: "automotive-camera-bracket-riveting-inspection-machine",
    name: "Automotive Camera Bracket Riveting Inspection Machine",
    shortName: "Camera Bracket Riveting Inspection",
    category: "Custom Automation Equipment",
    group: "Assembly and Testing",
    image: "/images/products/automotive-camera-bracket-riveting-inspection-machine.jpg",
    summary:
      "Custom riveting and vision inspection system for automotive camera bracket structural assembly.",
    overview: [
      "Combines precision riveting with post-process vision inspection to confirm rivet formation and bracket geometry on automotive camera mounting brackets.",
      "Designed for parts where structural integrity directly affects camera alignment and vehicle safety systems.",
    ],
    applications: [
      "Automotive advanced driver assistance (ADAS) bracket assembly",
      "Automotive structural bracket manufacturers",
    ],
    processFlow: [
      "Bracket and rivet component loading",
      "Automated riveting operation",
      "Post-rivet vision inspection",
      "Dimensional and formation verification",
      "Sorting: pass / reject discharge",
    ],
    specifications: [
      { label: "Process", value: "Automated riveting with vision inspection" },
      { label: "Inspection type", value: "Rivet formation and bracket geometry check" },
      { label: "Traceability", value: "Per-unit result logging (configurable)" },
      { label: "Customization", value: "Fixtures and rivet parameters engineered per bracket" },
    ],
    relatedSlugs: ["automotive-water-hose-assembly-testing-equipment", "medical-filter-automatic-vision-inspection-line"],
  },
  {
    slug: "medical-filter-automatic-vision-inspection-line",
    name: "Medical Filter Automatic Vision Inspection Production Equipment",
    shortName: "Medical Filter Vision Inspection Line",
    category: "Custom Automation Equipment",
    group: "Assembly and Testing",
    image: "/images/products/medical-filter-automatic-vision-inspection-line.jpg",
    summary:
      "Custom production line integrating automated assembly and vision inspection for medical filter components.",
    overview: [
      "A non-standard production line built for medical filter manufacturing, integrating part handling, assembly steps and automated vision inspection under consistent process control.",
      "Suited to environments where component integrity and inspection consistency are critical to downstream medical device use.",
    ],
    applications: [
      "Medical device filter component manufacturing",
      "Medical consumables production lines",
    ],
    processFlow: [
      "Component feeding and fixturing",
      "Automated assembly operations",
      "Multi-station vision inspection",
      "Result recording per unit",
      "Sorting: pass / reject discharge",
    ],
    specifications: [
      { label: "Process", value: "Integrated assembly and vision inspection line" },
      { label: "Inspection type", value: "Multi-station automated vision inspection" },
      { label: "Traceability", value: "Per-unit result logging (configurable)" },
      { label: "Customization", value: "Line layout engineered per medical filter design" },
    ],
    relatedSlugs: ["automotive-camera-bracket-riveting-inspection-machine", "o-ring-assembly-machine"],
  },
]

export function getAllProducts(): Product[] {
  return products
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug)
}

export function getRelatedProducts(product: Product): Product[] {
  return product.relatedSlugs
    .map((slug) => getProductBySlug(slug))
    .filter((item): item is Product => Boolean(item))
}

export const productCategories: ProductCategory[] = [
  "Custom Automation Equipment",
  "Standard Automation Equipment",
]
