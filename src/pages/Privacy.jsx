import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import ActionButton from '../components/ui/ActionButton'

export default function Privacy() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen">
      <section className="px-4 py-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="font-mono text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-2">
              Privacy Policy
            </div>
            <div className="text-sm text-[var(--color-text-muted)]">
              Last updated: February 2024
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <section className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-6">
              <h2 className="text-lg font-medium text-[var(--color-text-primary)] mb-3">1. Introduction</h2>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                DiasporaScan ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy 
                explains how we collect, use, disclose, and safeguard your information when you visit our website. 
                Please read this policy carefully. By using the Website, you consent to the practices described herein.
              </p>
            </section>

            <section className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-6">
              <h2 className="text-lg font-medium text-[var(--color-text-primary)] mb-3">2. Information We Collect</h2>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-4">
                We may collect the following types of information:
              </p>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-[var(--color-text-primary)] mb-2">Automatically Collected Information</h3>
                  <ul className="space-y-1 text-sm text-[var(--color-text-muted)]">
                    <li>• IP address and approximate location</li>
                    <li>• Browser type and version</li>
                    <li>• Device type and operating system</li>
                    <li>• Pages visited and time spent on pages</li>
                    <li>• Referring website or source</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-[var(--color-text-primary)] mb-2">Voluntarily Provided Information</h3>
                  <ul className="space-y-1 text-sm text-[var(--color-text-muted)]">
                    <li>• Email address (if you subscribe to updates)</li>
                    <li>• Search queries and preferences</li>
                    <li>• Any information you submit through contact forms</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-6">
              <h2 className="text-lg font-medium text-[var(--color-text-primary)] mb-3">3. How We Use Your Information</h2>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-4">
                We use the collected information to:
              </p>
              <ul className="space-y-2 text-sm text-[var(--color-text-muted)]">
                <li>• Provide and maintain the Website</li>
                <li>• Improve user experience and website functionality</li>
                <li>• Analyze usage patterns and trends</li>
                <li>• Send newsletters and updates (with your consent)</li>
                <li>• Respond to inquiries and provide support</li>
                <li>• Detect and prevent fraud or abuse</li>
                <li>• Comply with legal obligations</li>
              </ul>
            </section>

            <section className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-6">
              <h2 className="text-lg font-medium text-[var(--color-text-primary)] mb-3">4. Cookies and Tracking Technologies</h2>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-4">
                We use cookies and similar tracking technologies to enhance your experience on our Website. Cookies are 
                small data files stored on your device that help us:
              </p>
              <ul className="space-y-2 text-sm text-[var(--color-text-muted)]">
                <li>• Remember your preferences</li>
                <li>• Analyze website traffic and usage</li>
                <li>• Provide personalized content</li>
              </ul>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mt-4">
                You can control cookies through your browser settings. However, disabling cookies may affect 
                certain features of the Website.
              </p>
            </section>

            <section className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-6">
              <h2 className="text-lg font-medium text-[var(--color-text-primary)] mb-3">5. Third-Party Services</h2>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-4">
                We may use third-party services that collect, monitor, and analyze data:
              </p>
              <ul className="space-y-2 text-sm text-[var(--color-text-muted)]">
                <li>• <strong className="text-[var(--color-text-primary)]">Analytics:</strong> To understand how visitors use our Website</li>
                <li>• <strong className="text-[var(--color-text-primary)]">Email Services:</strong> To manage newsletter subscriptions</li>
                <li>• <strong className="text-[var(--color-text-primary)]">Hosting:</strong> To store and deliver Website content</li>
              </ul>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mt-4">
                These third parties have their own privacy policies governing the use of your information.
              </p>
            </section>

            <section className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-6">
              <h2 className="text-lg font-medium text-[var(--color-text-primary)] mb-3">6. Blockchain Data</h2>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                Please note that blockchain transactions are public and permanently recorded. If you interact with 
                the $DIASPORA token or any smart contracts, your wallet address and transaction history will be 
                visible on the blockchain. We do not control blockchain data and cannot delete or modify it.
              </p>
            </section>

            <section className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-6">
              <h2 className="text-lg font-medium text-[var(--color-text-primary)] mb-3">7. Data Security</h2>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                We implement reasonable security measures to protect your information from unauthorized access, 
                alteration, disclosure, or destruction. However, no method of transmission over the Internet or 
                electronic storage is 100% secure. We cannot guarantee absolute security.
              </p>
            </section>

            <section className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-6">
              <h2 className="text-lg font-medium text-[var(--color-text-primary)] mb-3">8. Your Rights</h2>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-4">
                Depending on your jurisdiction, you may have the right to:
              </p>
              <ul className="space-y-2 text-sm text-[var(--color-text-muted)]">
                <li>• Access the personal information we hold about you</li>
                <li>• Request correction of inaccurate data</li>
                <li>• Request deletion of your personal data</li>
                <li>• Object to processing of your data</li>
                <li>• Withdraw consent at any time</li>
                <li>• Unsubscribe from marketing communications</li>
              </ul>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mt-4">
                To exercise these rights, please contact us at hello@diasporascan.com.
              </p>
            </section>

            <section className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-6">
              <h2 className="text-lg font-medium text-[var(--color-text-primary)] mb-3">9. Children's Privacy</h2>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                Our Website is not intended for children under 13 years of age. We do not knowingly collect personal 
                information from children. If you are a parent or guardian and believe your child has provided us with 
                personal information, please contact us so we can delete it.
              </p>
            </section>

            <section className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-6">
              <h2 className="text-lg font-medium text-[var(--color-text-primary)] mb-3">10. International Users</h2>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                If you access the Website from outside the United States, please be aware that your information may 
                be transferred to, stored, and processed in countries where data protection laws may differ from 
                those in your country. By using the Website, you consent to such transfers.
              </p>
            </section>

            <section className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-6">
              <h2 className="text-lg font-medium text-[var(--color-text-primary)] mb-3">11. Changes to This Policy</h2>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting 
                the new policy on this page and updating the "Last updated" date. We encourage you to review this 
                policy periodically.
              </p>
            </section>

            <section className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-6">
              <h2 className="text-lg font-medium text-[var(--color-text-primary)] mb-3">12. Contact Us</h2>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="mt-3 text-sm text-[var(--color-accent-green)] font-mono">
                hello@diasporascan.com
              </div>
            </section>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 mt-8 pt-6 border-t border-[var(--color-border)]">
            <ActionButton href="/" variant="green">
              Back to Home
            </ActionButton>
            <ActionButton href="/terms" variant="outline">
              Terms of Use
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
