import { Metadata } from 'next'
import CasePage from '@/components/CasePage'
import { cases } from '@/lib/cases'

export const metadata: Metadata = {
  title: 'Киоски Dodo Pizza — Алекс Морроу',
  description: 'Редизайн самообслуживания для 600+ киосков в России, Турции и Великобритании.',
}

export default function Case1() {
  return <CasePage data={cases['case-1']} />
}
