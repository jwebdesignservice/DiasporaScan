import { useState } from 'react'
import { Upload, FileText, Link, CheckCircle, AlertTriangle } from 'lucide-react'
import { motion } from 'framer-motion'

import PageHeader from '../../components/database/PageHeader'

const categories = [
    'Historical Figures',
    'Organizations',
    'Countries & Regions',
    'Culture & Traditions',
    'Migration Data',
    'Political Data',
    'Business Data',
    'Education Data',
    'Other'
]

const recentSubmissions = [
    { title: 'Nigerian tech entrepreneurs list', status: 'approved', date: '2024-01-18' },
    { title: 'Jamaican cultural festivals data', status: 'pending', date: '2024-01-17' },
    { title: 'Black-owned restaurants NYC', status: 'approved', date: '2024-01-15' },
    { title: 'African authors bibliography', status: 'pending', date: '2024-01-14' },
]

export default function SubmitData() {
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        description: '',
        sourceUrl: '',
        dataType: 'link'
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        alert('Thank you for your submission! Our team will review it shortly.')
        setFormData({ title: '', category: '', description: '', sourceUrl: '', dataType: 'link' })
    }

    return (
        <div className="min-h-screen px-4 py-6">
            <div className="max-w-7xl mx-auto">
                <PageHeader
                    title="Submit Data"
                    description="Help grow the DiasporaScan database by contributing data. All submissions are reviewed by our team before being added."
                    stats={[
                        { label: 'Total Submissions', value: '1,247', color: 'green' },
                        { label: 'Approved', value: '892', color: 'gold' },
                        { label: 'Pending Review', value: '45' },
                    ]}
                />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Submission Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-4">
                            <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-4">
                                Submit New Data
                            </h3>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm text-[var(--color-text-muted)] mb-2">
                                        Title *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        placeholder="e.g., List of Black-owned tech startups"
                                        required
                                        className="w-full px-4 py-2 bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent-green)]"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm text-[var(--color-text-muted)] mb-2">
                                        Category *
                                    </label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        required
                                        className="w-full px-4 py-2 bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] text-sm text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent-green)]"
                                    >
                                        <option value="">Select a category</option>
                                        {categories.map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm text-[var(--color-text-muted)] mb-2">
                                        Description *
                                    </label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        placeholder="Describe the data you're submitting..."
                                        required
                                        rows={4}
                                        className="w-full px-4 py-2 bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent-green)] resize-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm text-[var(--color-text-muted)] mb-2">
                                        Data Type
                                    </label>
                                    <div className="flex gap-4">
                                        <button
                                            type="button"
                                            onClick={() => setFormData({ ...formData, dataType: 'link' })}
                                            className={`flex items-center gap-2 px-4 py-2 transition-colors ${
                                                formData.dataType === 'link'
                                                    ? 'bg-[var(--color-accent-green)]/20 border border-[var(--color-accent-green)] text-[var(--color-accent-green)]'
                                                    : 'bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] text-[var(--color-text-muted)]'
                                            }`}
                                        >
                                            <Link className="w-4 h-4" />
                                            Link/URL
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setFormData({ ...formData, dataType: 'file' })}
                                            className={`flex items-center gap-2 px-4 py-2 transition-colors ${
                                                formData.dataType === 'file'
                                                    ? 'bg-[var(--color-accent-green)]/20 border border-[var(--color-accent-green)] text-[var(--color-accent-green)]'
                                                    : 'bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] text-[var(--color-text-muted)]'
                                            }`}
                                        >
                                            <FileText className="w-4 h-4" />
                                            File Upload
                                        </button>
                                    </div>
                                </div>

                                {formData.dataType === 'link' ? (
                                    <div>
                                        <label className="block text-sm text-[var(--color-text-muted)] mb-2">
                                            Source URL
                                        </label>
                                        <input
                                            type="url"
                                            value={formData.sourceUrl}
                                            onChange={(e) => setFormData({ ...formData, sourceUrl: e.target.value })}
                                            placeholder="https://..."
                                            className="w-full px-4 py-2 bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent-green)]"
                                        />
                                    </div>
                                ) : (
                                    <div className="border-2 border-dashed border-[var(--color-border)] p-6 text-center hover:border-[var(--color-accent-green)] transition-colors cursor-pointer">
                                        <Upload className="w-10 h-10 text-[var(--color-text-muted)] mx-auto mb-3" />
                                        <p className="text-sm text-[var(--color-text-muted)]">
                                            Drag & drop or click to upload
                                        </p>
                                        <p className="text-xs text-[var(--color-text-muted)] mt-1">
                                            CSV, JSON, or Excel files (max 10MB)
                                        </p>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    className="w-full py-3 bg-[var(--color-accent-green)] text-white font-medium hover:bg-[var(--color-accent-green-light)] transition-colors"
                                >
                                    Submit Data
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Guidelines */}
                        <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-4">
                            <h4 className="font-medium text-[var(--color-text-primary)] mb-3">Submission Guidelines</h4>
                            <ul className="space-y-2 text-sm text-[var(--color-text-muted)]">
                                <li className="flex items-start gap-2">
                                    <CheckCircle className="w-4 h-4 text-[var(--color-accent-green)] flex-shrink-0 mt-0.5" />
                                    Data must be accurate and verifiable
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle className="w-4 h-4 text-[var(--color-accent-green)] flex-shrink-0 mt-0.5" />
                                    Include reliable sources
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle className="w-4 h-4 text-[var(--color-accent-green)] flex-shrink-0 mt-0.5" />
                                    No copyrighted content without permission
                                </li>
                                <li className="flex items-start gap-2">
                                    <AlertTriangle className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                                    Review takes 2-5 business days
                                </li>
                            </ul>
                        </div>

                        {/* Recent Submissions */}
                        <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-4">
                            <h4 className="font-medium text-[var(--color-text-primary)] mb-3">Recent Submissions</h4>
                            <div className="space-y-3">
                                {recentSubmissions.map((sub, i) => (
                                    <div key={i} className="flex items-center justify-between text-sm">
                                        <span className="text-[var(--color-text-secondary)] truncate">{sub.title}</span>
                                        <span className={`px-2 py-0.5 text-xs rounded ${
                                            sub.status === 'approved' 
                                                ? 'bg-green-500/20 text-green-400' 
                                                : 'bg-yellow-500/20 text-yellow-400'
                                        }`}>
                                            {sub.status}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
