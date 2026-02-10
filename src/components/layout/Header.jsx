import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Search, Menu, X } from 'lucide-react'

const navItems = [
    { path: '/', label: 'Map' },
    { path: '/database', label: 'Database' },
    { path: '/token', label: 'Token' },
    { path: '/about', label: 'More' },
]

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [searchFocused, setSearchFocused] = useState(false)
    const location = useLocation()

    return (
        <header className="sticky top-0 z-50 bg-[var(--color-bg-primary)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-14">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <span className="font-mono text-lg font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent-green)] transition-colors">
                            DiasporaScan
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => {
                            const isActive = location.pathname === item.path ||
                                (item.path === '/' && location.pathname === '/')
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`text-sm transition-colors ${isActive
                                        ? 'text-[var(--color-accent-green)]'
                                        : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'
                                        }`}
                                >
                                    {item.label}
                                </Link>
                            )
                        })}
                    </nav>

                    {/* Right Side - Search & CTA */}
                    <div className="hidden sm:flex items-center gap-3">
                        <div
                            className={`relative flex items-center transition-all ${searchFocused ? 'w-56' : 'w-44'
                                }`}
                        >
                            <Search className="absolute left-3 w-4 h-4 text-[var(--color-text-muted)]" />
                            <input
                                type="text"
                                placeholder="Search"
                                onFocus={() => setSearchFocused(true)}
                                onBlur={() => setSearchFocused(false)}
                                className="w-full pl-9 pr-10 py-1.5 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-md text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent-green)] transition-all"
                            />
                            <span className="absolute right-2 text-xs text-[var(--color-text-muted)] font-mono">
                                ⌘K
                            </span>
                        </div>

                        {/* CTA Button */}
                        <Link
                            to="/token"
                            className="px-3 py-1.5 bg-transparent border border-orange-500 text-[var(--color-text-primary)] text-sm font-medium rounded-md transition-all duration-200 shadow-[0_0_8px_rgba(249,115,22,0.25)] hover:shadow-[0_0_16px_rgba(249,115,22,0.5)] hover:bg-orange-500/10 hover:text-orange-400 hover:border-orange-400"
                        >
                            Buy Token
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                    >
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-[var(--color-bg-secondary)]">
                    <div className="px-4 py-4 space-y-2">
                        {/* Mobile Search */}
                        <div className="relative mb-4">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]" />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-full pl-10 pr-4 py-3 bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent-green)]"
                            />
                        </div>

                        {navItems.map((item) => {
                            const isActive = location.pathname === item.path
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`block px-4 py-3 rounded-lg text-base font-medium transition-all ${isActive
                                        ? 'text-[var(--color-accent-green)]'
                                        : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-tertiary)]'
                                        }`}
                                >
                                    {item.label}
                                </Link>
                            )
                        })}

                        <Link
                            to="/token"
                            onClick={() => setMobileMenuOpen(false)}
                            className="block w-full text-center px-4 py-3 bg-[var(--color-accent-green)] hover:bg-[var(--color-accent-green-light)] text-white font-semibold rounded-lg transition-all mt-4"
                        >
                            Buy Token
                        </Link>
                    </div>
                </div>
            )}
        </header>
    )
}
