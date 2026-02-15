import { Metadata } from 'next'
import CasePage from '@/components/CasePage'
import { cases } from '@/lib/cases'

export const metadata: Metadata = {
  title: 'Misso AI Agent — Алекс Морроу',
  description: 'Интерфейс AI-агента для командной продуктивности — спокойный, сфокусированный и человечный.',
}

export default function Case3() {
  return <CasePage data={cases['case-3']} />
}
