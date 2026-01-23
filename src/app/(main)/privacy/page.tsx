import { Metadata } from 'next';

import LegalPageLayout from '../components/LegalPageLayout';
import TableOfContents from '../components/TableOfContents';

export const metadata: Metadata = {
  title: 'Privacy Policy | AnyDayCard',
  description: 'Learn how AnyDayCard collects, uses, and protects your personal information.',
};

const sections = [
  { id: 'introduction', title: 'Introduction' },
  { id: 'information-we-collect', title: 'Information We Collect' },
  { id: 'how-we-use', title: 'How We Use Your Information' },
  { id: 'information-sharing', title: 'Information Sharing' },
  { id: 'data-security', title: 'Data Security' },
  { id: 'your-rights', title: 'Your Rights & Choices' },
  { id: 'cookies', title: 'Cookies & Tracking' },
  { id: 'childrens-privacy', title: "Children's Privacy" },
  { id: 'changes', title: 'Changes to This Policy' },
  { id: 'contact', title: 'Contact Us' },
];

export default function PrivacyPage() {
  return (
    <LegalPageLayout title="Privacy Policy" lastUpdated="January 2026">
      <TableOfContents sections={sections} />

      <div className="space-y-12 text-base leading-relaxed text-text-secondary">
        <section id="introduction">
          <h2 className="mb-4 text-2xl font-bold text-text-primary">1. Introduction</h2>
          <p className="mb-4">
            AnyDayCard (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) respects your
            privacy and is committed to protecting your personal information. This Privacy Policy
            explains how we collect, use, disclose, and safeguard your information when you use our
            greeting card creation and delivery service.
          </p>
          <p>
            By using AnyDayCard, you agree to the collection and use of information in accordance
            with this policy.
          </p>
        </section>

        <section id="information-we-collect">
          <h2 className="mb-4 text-2xl font-bold text-text-primary">2. Information We Collect</h2>
          <p className="mb-4">We collect information you provide directly to us, including:</p>
          <ul className="mb-4 list-disc space-y-2 pl-6">
            <li>
              <strong>Card Content Information:</strong> Recipient names, your relationship to them,
              occasion details, and personalization preferences you provide during the card creation
              wizard.
            </li>
            <li>
              <strong>Delivery Information:</strong> Recipient mailing addresses for physical card
              delivery.
            </li>
            <li>
              <strong>Account Information:</strong> Email address and name when you create an
              account or make a purchase.
            </li>
            <li>
              <strong>Payment Information:</strong> Payment card details processed securely through
              Stripe. We do not store complete payment card numbers on our servers.
            </li>
            <li>
              <strong>Communications:</strong> Information you provide when contacting our support
              team.
            </li>
          </ul>
          <p className="mb-4">We automatically collect certain information when you use our service:</p>
          <ul className="list-disc space-y-2 pl-6">
            <li>Device information (browser type, operating system)</li>
            <li>Usage data (pages visited, features used, time spent)</li>
            <li>IP address and general location data</li>
          </ul>
        </section>

        <section id="how-we-use">
          <h2 className="mb-4 text-2xl font-bold text-text-primary">
            3. How We Use Your Information
          </h2>
          <p className="mb-4">We use the information we collect to:</p>
          <ul className="list-disc space-y-2 pl-6">
            <li>Generate personalized card messages using AI</li>
            <li>Process and fulfill your card orders</li>
            <li>Send order confirmations and delivery updates</li>
            <li>Provide customer support</li>
            <li>Improve our service and develop new features</li>
            <li>Detect and prevent fraud or abuse</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        <section id="information-sharing">
          <h2 className="mb-4 text-2xl font-bold text-text-primary">4. Information Sharing</h2>
          <p className="mb-4">We share your information only in the following circumstances:</p>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              <strong>Service Providers:</strong> We work with third-party companies to fulfill
              orders:
              <ul className="mt-2 list-disc space-y-1 pl-6">
                <li>
                  <strong>Stripe</strong> for payment processing
                </li>
                <li>
                  <strong>Lob</strong> for physical card printing and mailing
                </li>
                <li>
                  <strong>Google (Gemini)</strong> for AI message generation
                </li>
                <li>
                  <strong>Supabase</strong> for data storage
                </li>
              </ul>
            </li>
            <li>
              <strong>Legal Requirements:</strong> When required by law or to protect our rights
            </li>
            <li>
              <strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale
              of assets
            </li>
          </ul>
          <p className="mt-4">We never sell your personal information to third parties.</p>
        </section>

        <section id="data-security">
          <h2 className="mb-4 text-2xl font-bold text-text-primary">5. Data Security</h2>
          <p className="mb-4">
            We implement appropriate technical and organizational measures to protect your personal
            information, including:
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>Encryption of data in transit (HTTPS/TLS)</li>
            <li>Secure payment processing through Stripe (PCI-DSS compliant)</li>
            <li>Access controls limiting who can view personal data</li>
            <li>Regular security assessments</li>
          </ul>
          <p className="mt-4">
            While we strive to protect your information, no method of transmission over the Internet
            is 100% secure.
          </p>
        </section>

        <section id="your-rights">
          <h2 className="mb-4 text-2xl font-bold text-text-primary">6. Your Rights & Choices</h2>
          <p className="mb-4">Depending on your location, you may have the right to:</p>
          <ul className="list-disc space-y-2 pl-6">
            <li>Access the personal information we hold about you</li>
            <li>Correct inaccurate information</li>
            <li>Delete your personal information</li>
            <li>Object to or restrict certain processing</li>
            <li>Data portability</li>
            <li>Withdraw consent where processing is based on consent</li>
          </ul>
          <p className="mt-4">
            To exercise these rights, please contact us at{' '}
            <a href="mailto:privacy@anydaycard.com" className="text-theme-1 hover:underline">
              privacy@anydaycard.com
            </a>
            .
          </p>
        </section>

        <section id="cookies">
          <h2 className="mb-4 text-2xl font-bold text-text-primary">7. Cookies & Tracking</h2>
          <p className="mb-4">We use cookies and similar technologies to:</p>
          <ul className="list-disc space-y-2 pl-6">
            <li>Keep you logged in</li>
            <li>Remember your preferences</li>
            <li>Understand how you use our service</li>
            <li>Improve our website performance</li>
          </ul>
          <p className="mt-4">
            You can control cookies through your browser settings. Disabling cookies may limit some
            functionality.
          </p>
        </section>

        <section id="childrens-privacy">
          <h2 className="mb-4 text-2xl font-bold text-text-primary">8. Children&apos;s Privacy</h2>
          <p>
            AnyDayCard is not directed to children under 13 years of age. We do not knowingly
            collect personal information from children under 13. If you believe we have collected
            information from a child under 13, please contact us immediately.
          </p>
        </section>

        <section id="changes">
          <h2 className="mb-4 text-2xl font-bold text-text-primary">9. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes
            by posting the new Privacy Policy on this page and updating the &ldquo;Last
            updated&rdquo; date. Continued use of our service after changes constitutes acceptance
            of the updated policy.
          </p>
        </section>

        <section id="contact">
          <h2 className="mb-4 text-2xl font-bold text-text-primary">10. Contact Us</h2>
          <p className="mb-4">
            If you have questions about this Privacy Policy or our privacy practices, please contact
            us at:
          </p>
          <address className="not-italic">
            <p>
              <strong>Email:</strong>{' '}
              <a href="mailto:privacy@anydaycard.com" className="text-theme-1 hover:underline">
                privacy@anydaycard.com
              </a>
            </p>
            <p className="mt-2">
              <strong>General Inquiries:</strong>{' '}
              <a href="mailto:hello@anydaycard.com" className="text-theme-1 hover:underline">
                hello@anydaycard.com
              </a>
            </p>
          </address>
        </section>
      </div>
    </LegalPageLayout>
  );
}
