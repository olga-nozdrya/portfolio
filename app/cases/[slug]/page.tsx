import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { CASES } from '@/lib/data';
import CasePageClient from '@/components/CasePageClient';

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return CASES.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const c = CASES.find((x) => x.slug === params.slug);
  if (!c) return { title: 'Кейс не найден' };
  return {
    title: `${c.title} — Ольга Солонина`,
    description: c.subtitle,
  };
}

export default function CasePage({ params }: PageProps) {
  const c = CASES.find((x) => x.slug === params.slug);
  if (!c) notFound();
  return <CasePageClient c={c} />;
}
