import MarqueeBanner from './MarqueeBanner'
import Header from './Header'
import Footer from './Footer'

export default function Layout({ children }) {
    return (
        <div className="min-h-screen flex flex-col bg-[var(--color-bg-primary)]">
            <MarqueeBanner />
            <Header />
            <main className="flex-1">
                {children}
            </main>
            <Footer />
        </div>
    )
}
