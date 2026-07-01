import type { Metadata } from 'next'
import Link from 'next/link'
import PageLayout from '@/components/layout/PageLayout'
import { SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'About',
  description: SITE.mission.full,
  openGraph: {
    title: 'About',
    description: SITE.mission.full,
  },
}

export default function AboutPage() {
  return (
    <PageLayout>
      {/* Mission */}
      <h1 className="sr-only">About Tradecraft Labs</h1>
      <section className="mb-12 pb-12 border-b border-gray-100">
        <p className="font-serif text-3xl md:text-4xl text-ink leading-[1.25] mb-6">
          {SITE.mission.full}
        </p>
        <p className="text-base text-muted leading-relaxed">
          Research is the product. This platform documents research in
          progress, not just final outputs. Working theories, raw
          observations, literature frameworks, and the reasoning behind
          decisions are published as they develop.
        </p>
      </section>

      {/* Research focus */}
      <section className="mb-12 pb-12 border-b border-gray-100">
        <h2 className="font-serif text-xl text-ink mb-4">Research Focus</h2>
        <p className="text-base text-muted leading-relaxed mb-5">
          The central question driving this platform: how do organizations
          make better cybersecurity risk decisions, and what leadership and
          governance structures enable that?
        </p>
        <p className="text-base text-muted leading-relaxed mb-5">
          The current research investigates the Business Information Security
          Officer role as a governance intermediary, examining how trust,
          influence, and structured decision-making processes determine
          whether security risk is understood and acted on at the business
          level.
        </p>
        <p className="text-base text-muted leading-relaxed">
          Future research will extend this into related areas: security
          governance frameworks, decision rights in risk management, and the
          organizational dynamics of cybersecurity leadership in complex
          enterprises.
        </p>
      </section>

      {/* Founder */}
      <section className="mb-12 pb-12 border-b border-gray-100">
        <h2 className="font-serif text-xl text-ink mb-4">About the Researcher</h2>
        <p className="text-base text-muted leading-relaxed mb-5">
          Joseph Hawley is a cybersecurity director and Business Information
          Security Partner with experience spanning security governance, risk
          management, and security-business integration across enterprise
          environments.
        </p>
        <p className="text-base text-muted leading-relaxed mb-5">
          He is completing a Master of Science in Cybersecurity at Georgia
          Tech, where his graduate research examines the BISO role through
          the lens of organizational governance theory and boundary-spanning
          leadership, drawing on both academic literature and practitioner
          interviews with cybersecurity, business, and governance leaders.
        </p>
        <p className="text-base text-muted leading-relaxed">
          Tradecraft Labs is where that research lives publicly. It documents
          the work as it happens, not just when it is done.
        </p>
      </section>

      {/* External links */}
      <section>
        <h2 className="font-serif text-xl text-ink mb-4">Elsewhere</h2>
        <ul className="space-y-3">
          <li>
            <a
              href={SITE.links.personal}
              target="_blank"
              rel="noopener noreferrer"
              className="text-base text-navy hover:underline"
            >
              JoeHawley.com
            </a>
            <span className="text-sm text-muted ml-2">— professional site</span>
          </li>
          <li>
            <a
              href={SITE.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-base text-navy hover:underline"
            >
              LinkedIn
            </a>
            <span className="text-sm text-muted ml-2">— professional profile</span>
          </li>
        </ul>

        <div className="mt-8 pt-6 border-t border-gray-100">
          <p className="text-sm text-muted leading-relaxed">
            For research inquiries, interview participation, or collaboration,
            reach out via{' '}
            <a
              href={SITE.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-navy hover:underline"
            >
              LinkedIn
            </a>
            .
          </p>
        </div>
      </section>
    </PageLayout>
  )
}
