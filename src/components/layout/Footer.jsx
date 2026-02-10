import { Link } from 'react-router-dom'
import { Twitter, Send, Github, Mail, Copy, Check } from 'lucide-react'
import { useState } from 'react'

const CONTRACT_ADDRESS = '0xDiAsPoRa...ToKeN2024'

export default function Footer() {
  const [copied, setCopied] = useState(false)
  const [email, setEmail] = useState('')

  const copyAddress = () => {
    navigator.clipboard.writeText(CONTRACT_ADDRESS)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSubscribe = (e) => {
    e.preventDefault()
    // Handle subscription
    setEmail('')
    alert('Thanks for subscribing!')
  }

  return (
    <footer className="bg-[var(--color-bg-secondary)] border-t border-[var(--color-border)] mt-auto">
      {/* Contract Address Banner */}
      <div className="border-b border-[var(--color-border)] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-sm font-mono">
            <span className="text-[var(--color-text-muted)]">CA:</span>
            <button
              onClick={copyAddress}
              className="flex items-center gap-2 text-[var(--color-accent-green)] hover:text-[var(--color-accent-green-light)] transition-colors"
            >
              <span>{CONTRACT_ADDRESS}</span>
              {copied ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <span className="font-mono text-xl font-bold text-[var(--color-text-primary)]">
                DiasporaScan
              </span>
            </Link>
            <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed max-w-md mb-6">
              Celebrating Black History Month by exploring the rich tapestry of the African diaspora. 
              Discover your roots, learn about migration patterns, and connect with cultural heritage.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-[var(--color-bg-tertiary)] rounded-lg text-[var(--color-text-secondary)] hover:text-[var(--color-accent-green)] hover:bg-[var(--color-bg-primary)] transition-all"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://t.me"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-[var(--color-bg-tertiary)] rounded-lg text-[var(--color-text-secondary)] hover:text-[var(--color-accent-green)] hover:bg-[var(--color-bg-primary)] transition-all"
              >
                <Send className="w-5 h-5" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-[var(--color-bg-tertiary)] rounded-lg text-[var(--color-text-secondary)] hover:text-[var(--color-accent-green)] hover:bg-[var(--color-bg-primary)] transition-all"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-[var(--color-text-primary)] mb-4">Explore</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/explore" className="text-[var(--color-text-secondary)] hover:text-[var(--color-accent-green)] text-sm transition-colors">
                  World Map
                </Link>
              </li>
              <li>
                <Link to="/africa" className="text-[var(--color-text-secondary)] hover:text-[var(--color-accent-green)] text-sm transition-colors">
                  Africa Map
                </Link>
              </li>
              <li>
                <Link to="/search?type=figures" className="text-[var(--color-text-secondary)] hover:text-[var(--color-accent-green)] text-sm transition-colors">
                  Famous Figures
                </Link>
              </li>
              <li>
                <Link to="/search?type=culture" className="text-[var(--color-text-secondary)] hover:text-[var(--color-accent-green)] text-sm transition-colors">
                  Culture & Heritage
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-[var(--color-text-primary)] mb-4">Get Updates</h3>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full pl-10 pr-4 py-2 bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent-green)]"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-[var(--color-accent-green)] hover:bg-[var(--color-accent-green-light)] text-white text-sm font-semibold rounded-lg transition-all"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[var(--color-border)]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[var(--color-text-muted)] text-xs text-center md:text-left">
              Data sourced from public historical records. This site celebrates cultural heritage and does not constitute financial advice. 
              Information is provided for educational purposes only.
            </p>
            <div className="flex items-center gap-4 text-xs">
              <Link to="/terms" className="text-[var(--color-text-secondary)] hover:text-[var(--color-accent-green)]">
                Terms of Use
              </Link>
              <span className="text-[var(--color-border)]">•</span>
              <Link to="/privacy" className="text-[var(--color-text-secondary)] hover:text-[var(--color-accent-green)]">
                Privacy Policy
              </Link>
            </div>
          </div>
          <p className="text-center text-[var(--color-text-muted)] text-xs mt-6">
            Powered by <span className="text-[var(--color-accent-green)]">DiasporaScan</span> • Black History Month 2024
          </p>
        </div>
      </div>
    </footer>
  )
}
