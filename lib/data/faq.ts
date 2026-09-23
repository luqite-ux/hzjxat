export interface FaqItem {
  question: string
  answer: string
}

// Sourced from the customer's non-standard equipment FAQ. Rows that conflict
// with project delivery policy have been excluded; quality content here is
// limited to inspection and issue-review discussion.
export const faqItems: FaqItem[] = [
  {
    question: "Can Jianxin build fully custom, non-standard automation equipment?",
    answer:
      "Yes. Most of our systems are engineered around a specific part, tolerance and production requirement rather than sold as fixed catalog machines. Share your part drawings and process requirements to start a technical discussion.",
  },
  {
    question: "Is there a minimum order quantity for custom equipment?",
    answer:
      "Custom automation systems are typically quoted per project based on scope, station count and required cycle time rather than a fixed unit minimum. Contact our engineering team with your requirement for a project-specific discussion.",
  },
  {
    question: "Can I receive a sample run, demo video or visit the workshop before ordering?",
    answer:
      "Sample runs, demonstrations and workshop visits are handled case by case depending on project stage and part availability. Please raise this directly with our team when discussing your requirement.",
  },
  {
    question: "What information should I prepare for a quotation?",
    answer:
      "Part drawings or samples, target production volume, required inspection or test criteria, and any existing line interface constraints help us scope a system accurately and respond with a relevant proposal.",
  },
  {
    question: "How is quality handled during the build process?",
    answer:
      "Inspection reports, in-process checks and commissioning validation can be discussed and arranged as part of the project scope. Any issues identified during commissioning are reviewed directly with the customer's engineering team.",
  },
]
