import ProjectDetailClient from "./ProjectDetailClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  return <ProjectDetailClient slug={slug} />;
}

export function generateStaticParams() {
  return [
    { slug: "susa24" },
    { slug: "synctank" },
    { slug: "naru" },
    { slug: "gyeongjo" },
    { slug: "heilocal" },
    { slug: "collab" },
    { slug: "startmatch" },
    { slug: "safety-paris" },
    { slug: "village-of-iot" },
  ];
}
