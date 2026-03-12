import { SectionHeading } from "@/components/ui/SectionHeading";

interface Props {
  params: Promise<{ category: string }>;
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;

  const categoryTitles: Record<string, string> = {
    algorithms: "Algorithms",
    swift: "Swift",
    ios: "iOS",
    cs: "CS",
    reactive: "Reactive",
    wwdc: "WWDC",
    tools: "Tools",
  };

  return (
    <div className="mx-auto max-w-4xl px-6 pt-32 pb-24">
      <SectionHeading
        title={categoryTitles[category] || category}
        subtitle="학습 기록"
      />
      <p
        className="text-center"
        style={{ color: "var(--color-text-secondary)" }}
      >
        글이 추가되면 여기에 표시됩니다.
      </p>
    </div>
  );
}

export function generateStaticParams() {
  return [
    { category: "algorithms" },
    { category: "swift" },
    { category: "ios" },
    { category: "cs" },
    { category: "reactive" },
    { category: "wwdc" },
    { category: "tools" },
  ];
}
