import { Metadata } from 'next'
import CasePage from '@/components/CasePage'
import { cases } from '@/lib/cases'

export const metadata: Metadata = {
  title: 'Reboot — Творческая платформа · Алекс Морроу',
  description: 'Айдентика и веб для платформы, которая возрождает живое творческое сообщество.',
}

export default function Case2() {
  return <CasePage data={cases['case-2']} />
}
