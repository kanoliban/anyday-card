import { Metadata } from 'next';

import LegalPageLayout from '../components/LegalPageLayout';
import TableOfContents from '../components/TableOfContents';

export const metadata: Metadata = {
  title: 'Terms of Service | AnyDayCard',
  description: 'Terms and conditions for using the AnyDayCard greeting card service.',
};

const sections = [
  { id: 'acceptance', title: 'Acceptance of Terms' },
  { id: 'description', title: 'Description of Service' },
  { id: 'user-content', title: 'User Content & Conduct' },
  { id: 'intellectual-property', title: 'Intellectual Property' },
  { id: 'ai-generated-content', title: 'AI-Generated Content' },
  { id: 'payment', title: 'Payment & Billing' },
  { id: 'shipping', title: 'Shipping & Delivery' },
  { id: 'refunds', title: 'Refunds & Cancellations' },
  { id: 'disclaimers', title: 'Disclaimers & Limitations' },
  { id: 'indemnification', title: 'Indemnification' },
  { id: 'governing-law', title: 'Governing Law' },
  { id: 'changes', title: 'Changes to Terms' },
  { id: 'contact', title: 'Contact Information' },
];

export default function TermsPage() {
  return (
    <LegalPageLayout title="Terms of Service" lastUpdated="January 2026">
      <TableOfContents sections={sections} />

      <div className="space-y-12 text-base leading-relaxed text-text-secondary">
        <section id="acceptance">
          <h2 className="mb-4 text-2xl font-bold text-text-primary">1. Acceptance of Terms</h2>
          <p className="mb-4">
            Welcome to AnyDayCard. By accessing or using our website and services, you agree to be
            bound by these Terms of Service (&ldquo;Terms&rdquo;). If you do not agree to these
            Terms, please do not use our service.
          </p>
          <p>
            These Terms constitute a legally binding agreement between you and AnyDayCard regarding
            your use of our greeting card creation and delivery service.
          </p>
        </section>

        <section id="description">
          <h2 className="mb-4 text-2xl font-bold text-text-primary">2. Description of Service</h2>
          <p className="mb-4">AnyDayCard provides:</p>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              An interactive wizard to create personalized greeting cards based on your inputs about
              the recipient
            </li>
            <li>AI-powered message generation tailored to your specifications</li>
            <li>A selection of card designs and templates</li>
            <li>Digital card delivery via email</li>
            <li>Physical card printing and mailing services</li>
          </ul>
        </section>

        <section id="user-content">
          <h2 className="mb-4 text-2xl font-bold text-text-primary">3. User Content & Conduct</h2>
          <p className="mb-4">
            You are responsible for all content you provide through our service, including recipient
            information and personalization details. You agree not to use our service to:
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>Create cards containing illegal, harmful, or offensive content</li>
            <li>Harass, threaten, or defame any person</li>
            <li>Violate any applicable laws or regulations</li>
            <li>Infringe on the intellectual property rights of others</li>
            <li>Send cards to recipients who have not consented to receive them</li>
            <li>Use the service for spam, phishing, or fraudulent purposes</li>
          </ul>
          <p className="mt-4">
            We reserve the right to refuse or remove any content that violates these Terms.
          </p>
        </section>

        <section id="intellectual-property">
          <h2 className="mb-4 text-2xl font-bold text-text-primary">4. Intellectual Property</h2>
          <p className="mb-4">
            <strong>Our Property:</strong> The AnyDayCard service, including its design, features,
            card templates, graphics, and software, is owned by AnyDayCard and protected by
            intellectual property laws.
          </p>
          <p className="mb-4">
            <strong>Your Content:</strong> You retain ownership of the personal information and
            messages you provide. By using our service, you grant us a limited license to use this
            content solely to fulfill your card orders.
          </p>
          <p>
            <strong>Card Designs:</strong> Purchased cards are licensed for personal, non-commercial
            use. You may not reproduce, resell, or distribute card designs.
          </p>
        </section>

        <section id="ai-generated-content">
          <h2 className="mb-4 text-2xl font-bold text-text-primary">5. AI-Generated Content</h2>
          <p className="mb-4">
            Our service uses artificial intelligence to generate personalized card messages based on
            your inputs. You acknowledge and agree that:
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              AI-generated messages are suggestions that you can edit, accept, or reject before
              purchase
            </li>
            <li>You are responsible for reviewing and approving the final message content</li>
            <li>AI outputs may occasionally be unexpected or require modification</li>
            <li>We do not guarantee that AI-generated content will meet all your expectations</li>
          </ul>
          <p className="mt-4">
            Once you approve and purchase a card, you accept responsibility for the message content.
          </p>
        </section>

        <section id="payment">
          <h2 className="mb-4 text-2xl font-bold text-text-primary">6. Payment & Billing</h2>
          <p className="mb-4">
            Payments are processed securely through Stripe. By making a purchase, you agree to:
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>Provide accurate and complete payment information</li>
            <li>Pay all charges at the prices in effect at the time of purchase</li>
            <li>Pay any applicable taxes</li>
          </ul>
          <p className="mt-4">
            All prices are displayed in US dollars unless otherwise specified. Prices are subject to
            change without notice.
          </p>
        </section>

        <section id="shipping">
          <h2 className="mb-4 text-2xl font-bold text-text-primary">7. Shipping & Delivery</h2>
          <p className="mb-4">
            <strong>Digital Cards:</strong> Delivered via email to the recipient&apos;s email
            address you provide. Delivery is typically immediate but may take up to 24 hours.
          </p>
          <p className="mb-4">
            <strong>Physical Cards:</strong> Printed and mailed through our fulfillment partner.
            Estimated delivery times:
          </p>
          <ul className="mb-4 list-disc space-y-2 pl-6">
            <li>US Standard: 5-7 business days</li>
            <li>US Express: 2-3 business days</li>
            <li>International: 10-21 business days (where available)</li>
          </ul>
          <p>
            Delivery times are estimates and not guaranteed. We are not responsible for delays
            caused by postal services or incorrect addresses.
          </p>
        </section>

        <section id="refunds">
          <h2 className="mb-4 text-2xl font-bold text-text-primary">8. Refunds & Cancellations</h2>
          <p className="mb-4">
            <strong>Digital Cards:</strong> Due to the immediate nature of digital delivery, digital
            cards are non-refundable once sent.
          </p>
          <p className="mb-4">
            <strong>Physical Cards:</strong> You may cancel an order for a full refund before it
            enters production (typically within 2 hours of purchase). Once a card has been printed,
            we cannot offer a refund unless:
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>The card arrives damaged or defective</li>
            <li>The wrong card was delivered</li>
            <li>The card was never delivered (with proof of non-delivery)</li>
          </ul>
          <p className="mt-4">
            To request a refund, contact us at{' '}
            <a href="mailto:support@anydaycard.com" className="text-theme-1 hover:underline">
              support@anydaycard.com
            </a>{' '}
            within 30 days of purchase.
          </p>
        </section>

        <section id="disclaimers">
          <h2 className="mb-4 text-2xl font-bold text-text-primary">
            9. Disclaimers & Limitations
          </h2>
          <p className="mb-4">
            THE SERVICE IS PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; WITHOUT
            WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED
            WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
          </p>
          <p className="mb-4">
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, ANYDAYCARD SHALL NOT BE LIABLE FOR ANY
            INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF
            PROFITS, DATA, OR GOODWILL.
          </p>
          <p>
            Our total liability for any claims arising from these Terms or your use of the service
            shall not exceed the amount you paid to us in the twelve (12) months preceding the
            claim.
          </p>
        </section>

        <section id="indemnification">
          <h2 className="mb-4 text-2xl font-bold text-text-primary">10. Indemnification</h2>
          <p>
            You agree to indemnify, defend, and hold harmless AnyDayCard and its officers,
            directors, employees, and agents from any claims, damages, losses, liabilities, and
            expenses (including legal fees) arising from your use of the service, violation of these
            Terms, or infringement of any third-party rights.
          </p>
        </section>

        <section id="governing-law">
          <h2 className="mb-4 text-2xl font-bold text-text-primary">11. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of the State
            of Delaware, United States, without regard to its conflict of law provisions. Any
            disputes arising under these Terms shall be resolved in the state or federal courts
            located in Delaware.
          </p>
        </section>

        <section id="changes">
          <h2 className="mb-4 text-2xl font-bold text-text-primary">12. Changes to Terms</h2>
          <p>
            We may modify these Terms at any time. We will notify you of material changes by posting
            the updated Terms on our website and updating the &ldquo;Last updated&rdquo; date. Your
            continued use of the service after changes constitutes acceptance of the modified Terms.
          </p>
        </section>

        <section id="contact">
          <h2 className="mb-4 text-2xl font-bold text-text-primary">13. Contact Information</h2>
          <p className="mb-4">If you have questions about these Terms, please contact us:</p>
          <address className="not-italic">
            <p>
              <strong>Email:</strong>{' '}
              <a href="mailto:legal@anydaycard.com" className="text-theme-1 hover:underline">
                legal@anydaycard.com
              </a>
            </p>
            <p className="mt-2">
              <strong>General Inquiries:</strong>{' '}
              <a href="mailto:hello@anydaycard.com" className="text-theme-1 hover:underline">
                hello@anydaycard.com
              </a>
            </p>
            <p className="mt-2">
              <strong>Support:</strong>{' '}
              <a href="mailto:support@anydaycard.com" className="text-theme-1 hover:underline">
                support@anydaycard.com
              </a>
            </p>
          </address>
        </section>
      </div>
    </LegalPageLayout>
  );
}
