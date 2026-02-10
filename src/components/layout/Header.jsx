import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Search, Menu, X, ChevronDown } from 'lucide-react'

// Mega menu structure
const megaMenuItems = [
    {
        label: 'Database',
        path: '/database',
        dropdown: [
            { label: 'Diaspora Funding', path: '/database/funding', description: 'Grants & donations to African causes' },
            { label: 'Remittances', path: '/database/remittances', description: 'Money sent to Africa by country' },
            { label: 'Organizations', path: '/database/organizations', description: 'NGOs, charities & cultural orgs' },
            { label: 'Scholarships', path: '/database/scholarships', description: 'HBCUs & education grants' },
            { label: 'Businesses', path: '/database/businesses', description: 'Black-owned business directory' },
            { label: 'Elected Officials', path: '/database/officials', description: 'Politicians & representatives' },
            { label: 'Historical Timeline', path: '/database/timeline', description: 'Key events from 1619 to present' },
        ]
    },
    {
        label: 'Political',
        path: '/database/officials',
        dropdown: [
            { label: 'Elected Officials', path: '/database/officials', description: 'Congress members & mayors' },
            { label: 'Historical Firsts', path: '/database/officials', description: 'First Black politicians' },
        ]
    },
    {
        label: 'Analysis',
        path: '/analysis',
        dropdown: [
            { label: 'Migration Analysis', path: '/analysis', description: 'Migration patterns & routes' },
            { label: 'Historical Timeline', path: '/database/timeline', description: 'Key events from 1619 to present' },
        ]
    },
    {
        label: 'Crowdsourcing',
        path: '/about',
        dropdown: [
            { label: 'About DiasporaScan', path: '/about', description: 'Learn about our mission' },
            { label: 'Submit Data', path: '/about', description: 'Contribute to our database' },
        ]
    },
]

const simpleNavItems = [
    { path: '/', label: 'Map' },
    { path: '/token', label: 'Token' },
    { path: '/nfts', label: 'NFTs' },
    { path: '/about', label: 'More' },
]

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [searchFocused, setSearchFocused] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [activeDropdown, setActiveDropdown] = useState(null)
    const location = useLocation()
    const navigate = useNavigate()

    const handleSearch = (e) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            navigate(`/database?q=${encodeURIComponent(searchQuery.trim())}`)
            setSearchQuery('')
        }
    }

    const handleMobileSearch = (e) => {
        e.preventDefault()
        const query = e.target.elements.mobileSearch.value.trim()
        if (query) {
            navigate(`/database?q=${encodeURIComponent(query)}`)
            setMobileMenuOpen(false)
            e.target.reset()
        }
    }

    const handleDropdownEnter = (label) => {
        setActiveDropdown(label)
    }

    const handleDropdownLeave = () => {
        setActiveDropdown(null)
    }

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
                    <nav className="hidden md:flex items-center gap-6">
                        {/* Simple nav items first */}
                        <Link
                            to="/"
                            className={`text-sm transition-colors ${location.pathname === '/'
                                ? 'text-[var(--color-accent-green)]'
                                : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'
                                }`}
                        >
                            Map
                        </Link>

                        {/* Mega menu items */}
                        {megaMenuItems.map((item) => {
                            const isActive = location.pathname.startsWith(item.path)
                            return (
                                <div
                                    key={item.label}
                                    className="relative"
                                    onMouseEnter={() => handleDropdownEnter(item.label)}
                                    onMouseLeave={handleDropdownLeave}
                                >
                                    <button
                                        className={`flex items-center gap-1 text-sm transition-colors ${isActive
                                            ? 'text-[var(--color-accent-green)]'
                                            : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'
                                            }`}
                                    >
                                        {item.label}
                                        <ChevronDown className={`w-3 h-3 transition-transform ${activeDropdown === item.label ? 'rotate-180' : ''}`} />
                                    </button>

                                    {/* Dropdown */}
                                    {activeDropdown === item.label && (
                                        <div className="absolute top-full left-0 mt-2 w-64 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-lg shadow-xl py-2 z-50">
                                            {item.dropdown.map((subItem) => (
                                                <button
                                                    key={subItem.path + subItem.label}
                                                    onClick={() => {
                                                        setActiveDropdown(null)
                                                        navigate(subItem.path)
                                                    }}
                                                    className="block w-full text-left px-4 py-2 hover:bg-[var(--color-bg-tertiary)] transition-colors"
                                                >
                                                    <div className="text-sm text-[var(--color-text-primary)]">
                                                        {subItem.label}
                                                    </div>
                                                    <div className="text-xs text-[var(--color-text-muted)]">
                                                        {subItem.description}
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )
                        })}

                        {/* Remaining simple items */}
                        {simpleNavItems.slice(1).map((item) => {
                            const isActive = location.pathname === item.path
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
                        <form
                            onSubmit={handleSearch}
                            className={`relative flex items-center transition-all ${searchFocused ? 'w-56' : 'w-44'}`}
                        >
                            <Search className="absolute left-3 w-4 h-4 text-[var(--color-text-muted)]" />
                            <input
                                type="text"
                                placeholder="Search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onFocus={() => setSearchFocused(true)}
                                onBlur={() => setSearchFocused(false)}
                                className="w-full pl-9 pr-10 py-1.5 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-md text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent-green)] transition-all"
                            />
                            <span className="absolute right-2 text-xs text-[var(--color-text-muted)] font-mono">
                                ⏎
                            </span>
                        </form>

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
                <div className="md:hidden bg-[var(--color-bg-secondary)] max-h-[80vh] overflow-y-auto">
                    <div className="px-4 py-4 space-y-2">
                        {/* Mobile Search */}
                        <form onSubmit={handleMobileSearch} className="relative mb-4">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]" />
                            <input
                                type="text"
                                name="mobileSearch"
                                placeholder="Search..."
                                className="w-full pl-10 pr-4 py-3 bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent-green)]"
                            />
                        </form>

                        {/* Map link */}
                        <Link
                            to="/"
                            onClick={() => setMobileMenuOpen(false)}
                            className={`block px-4 py-3 rounded-lg text-base font-medium transition-all ${location.pathname === '/'
                                ? 'text-[var(--color-accent-green)]'
                                : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-tertiary)]'
                                }`}
                        >
                            Map
                        </Link>

                        {/* Mega menu items in mobile */}
                        {megaMenuItems.map((item) => (
                            <div key={item.label} className="border-t border-[var(--color-border)] pt-2">
                                <div className="px-4 py-2 text-xs uppercase tracking-wider text-[var(--color-text-muted)]">
                                    {item.label}
                                </div>
                                {item.dropdown.map((subItem) => (
                                    <button
                                        key={subItem.path + subItem.label}
                                        onClick={() => {
                                            setMobileMenuOpen(false)
                                            navigate(subItem.path)
                                        }}
                                        className="block w-full text-left px-6 py-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent-green)]"
                                    >
                                        {subItem.label}
                                    </button>
                                ))}
                            </div>
                        ))}

                        {/* Other nav items */}
                        <div className="border-t border-[var(--color-border)] pt-2">
                            {simpleNavItems.slice(1).map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`block px-4 py-3 rounded-lg text-base font-medium transition-all ${location.pathname === item.path
                                        ? 'text-[var(--color-accent-green)]'
                                        : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-tertiary)]'
                                        }`}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>

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
