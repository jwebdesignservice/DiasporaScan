import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import ActionButton from '../components/ui/ActionButton'

export default function Terms() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen">
      <section className="px-4 py-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="font-mono text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-2">
              Terms of Use
            </div>
            <div className="text-sm text-[var(--color-text-muted)]">
              Last updated: February 2024
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <section className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-6">
              <h2 className="text-lg font-medium text-[var(--color-text-primary)] mb-3">1. Acceptance of Terms</h2>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                By accessing and using DiasporaScan ("the Website"), you accept and agree to be bound by these Terms of Use. 
                If you do not agree to these terms, please do not use the Website. We reserve the right to modify these terms 
                at any time, and your continued use of the Website constitutes acceptance of any changes.
              </p>
            </section>

            <section className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-6">
              <h2 className="text-lg font-medium text-[var(--color-text-primary)] mb-3">2. Description of Service</h2>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-4">
                DiasporaScan is an educational platform that provides information about African history, the African diaspora, 
                migration patterns, cultural heritage, and historical figures. The Website also features information about 
                the $DIASPORA token, a cryptocurrency with deflationary mechanics.
              </p>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                The information provided on this Website is for general informational and educational purposes only. 
                It should not be considered as professional, legal, financial, or investment advice.
              </p>
            </section>

            <section className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-6">
              <h2 className="text-lg font-medium text-[var(--color-text-primary)] mb-3">3. Cryptocurrency Disclaimer</h2>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-4">
                <strong className="text-[var(--color-text-primary)]">Important:</strong> The $DIASPORA token is a memecoin 
                created for entertainment and community purposes. Cryptocurrency investments are highly speculative and 
                involve significant risk of loss.
              </p>
              <ul className="space-y-2 text-sm text-[var(--color-text-muted)]">
                <li>• We do not provide investment, financial, legal, or tax advice</li>
                <li>• Past performance does not guarantee future results</li>
                <li>• You may lose some or all of your investment</li>
                <li>• Only invest what you can afford to lose</li>
                <li>• Conduct your own research before making any investment decisions</li>
              </ul>
            </section>

            <section className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-6">
              <h2 className="text-lg font-medium text-[var(--color-text-primary)] mb-3">4. User Conduct</h2>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-4">
                You agree not to use the Website to:
              </p>
              <ul className="space-y-2 text-sm text-[var(--color-text-muted)]">
                <li>• Violate any applicable laws or regulations</li>
                <li>• Infringe on the intellectual property rights of others</li>
                <li>• Distribute malware, viruses, or harmful code</li>
                <li>• Engage in fraudulent or deceptive activities</li>
                <li>• Interfere with the proper functioning of the Website</li>
                <li>• Collect user data without authorization</li>
              </ul>
            </section>

            <section className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-6">
              <h2 className="text-lg font-medium text-[var(--color-text-primary)] mb-3">5. Intellectual Property</h2>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                All content on the Website, including text, graphics, logos, images, and software, is the property of 
                DiasporaScan or its content suppliers and is protected by intellectual property laws. You may not 
                reproduce, distribute, modify, or create derivative works without our express written permission.
              </p>
            </section>

            <section className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-6">
              <h2 className="text-lg font-medium text-[var(--color-text-primary)] mb-3">6. Data Accuracy</h2>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                We strive to provide accurate historical and cultural information, but we make no warranties or 
                representations regarding the accuracy, completeness, or reliability of any data on the Website. 
                Historical data is sourced from public records and may contain errors or omissions. Users should 
                independently verify information before relying on it.
              </p>
            </section>

            <section className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-6">
              <h2 className="text-lg font-medium text-[var(--color-text-primary)] mb-3">7. Limitation of Liability</h2>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                To the fullest extent permitted by law, DiasporaScan and its affiliates shall not be liable for any 
                direct, indirect, incidental, special, consequential, or punitive damages arising from your use of 
                the Website or any investment decisions made based on information obtained from the Website.
              </p>
            </section>

            <section className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-6">
              <h2 className="text-lg font-medium text-[var(--color-text-primary)] mb-3">8. Third-Party Links</h2>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                The Website may contain links to third-party websites or services. We are not responsible for the 
                content, privacy policies, or practices of any third-party sites. You access such sites at your own risk.
              </p>
            </section>

            <section className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-6">
              <h2 className="text-lg font-medium text-[var(--color-text-primary)] mb-3">9. Governing Law</h2>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                These Terms of Use shall be governed by and construed in accordance with applicable laws, without 
                regard to conflict of law principles. Any disputes arising from these terms shall be resolved through 
                binding arbitration.
              </p>
            </section>

            <section className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-6">
              <h2 className="text-lg font-medium text-[var(--color-text-primary)] mb-3">10. Contact Information</h2>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                If you have any questions about these Terms of Use, please contact us through our official social 
                media channels or at hello@diasporascan.com.
              </p>
            </section>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 mt-8 pt-6 border-t border-[var(--color-border)]">
            <ActionButton href="/" variant="green">
              Back to Home
            </ActionButton>
            <ActionButton href="/privacy" variant="outline">
              Privacy Policy
            </ActionButton>
            <span 
              onClick={() => navigate('/about')}
              className="inline-flex items-center gap-1 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors cursor-pointer"
            >
              About Us <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </section>
    </div>
  )
}
