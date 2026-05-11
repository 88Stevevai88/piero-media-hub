export type RadarItem = {
  category: string;
  title: string;
  description: string;
  source: string;
  date: string;
  href: string;
};

export const radarItems: RadarItem[] = [
  {
    category: "Cronos App",
    title: "Mobile-first investing without the noise",
    description:
      "A simple take on why consumer crypto needs cleaner interfaces and better education.",
    source: "X Thread",
    date: "May 2026",
    href: "#x",
  },
  {
    category: "Ecosystem",
    title: "Why Cronos is becoming more focused",
    description:
      "Notes on product direction, builders, distribution and real use cases across the ecosystem.",
    source: "Medium",
    date: "May 2026",
    href: "#medium",
  },
  {
    category: "Community",
    title: "What the community is watching this week",
    description:
      "A quick radar of signals coming from X, Reddit and Telegram discussions.",
    source: "Community",
    date: "May 2026",
    href: "#reddit",
  },
  {
    category: "Web3",
    title: "Less jargon, more trust",
    description:
      "Why the next wave of users will care more about clarity than technical buzzwords.",
    source: "Article",
    date: "May 2026",
    href: "#medium",
  },
  {
    category: "Tools",
    title: "Practical tools for better decisions",
    description:
      "Small calculators, dashboards and simple utilities built for real community use.",
    source: "Tool",
    date: "May 2026",
    href: "#follow",
  },
];
