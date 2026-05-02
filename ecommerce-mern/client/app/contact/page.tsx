'use client'

import { useState } from 'react'
import PageHero from '@/components/PageHero'

export default function ContactPage() {
    const [form, setForm]           = useState({ name: '', email: '', subject: '', message: '' })
    const [submitted, setSubmitted] = useState(false)
    const [loading, setLoading]     = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setTimeout(() => { setLoading(false); setSubmitted(true) }, 800)
    }

    return (
        <>
            <PageHero
                badge="Nous contacter"
                title="On est à votre écoute"
                subtitle="Une question, une suggestion ou un problème ? Notre équipe vous répond sous 24h."
            />

            <main className="max-w-3xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Infos de contact */}
                    <div className="flex flex-col gap-4">
                        {[
                            {
                                icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z',
                                label: 'Adresse',
                                value: "Mour 3, près du château d'eau\nThiès, Sénégal",
                            },
                            {
                                icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
                                label: 'Email',
                                value: 'contact@shopnext.sn',
                            },
                            {
                                icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
                                label: 'Horaires',
                                value: 'Lun – Sam\n9h00 – 18h00',
                            },
                        ].map(({ icon, label, value }) => (
                            <div key={label} className="bg-white border border-slate-100 rounded-2xl shadow-sm p-4 flex gap-3 items-start">
                                <div className="w-8 h-8 bg-teal-50 rounded-xl flex items-center justify-center shrink-0">
                                    <svg className="w-4 h-4 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{label}</p>
                                    <p className="text-sm text-slate-700 whitespace-pre-line mt-0.5">{value}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Formulaire */}
                    <div className="md:col-span-2 bg-white border border-slate-100 rounded-2xl shadow-sm p-6">
                        {submitted ? (
                            <div className="flex flex-col items-center justify-center h-full gap-4 py-8">
                                <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center">
                                    <svg className="w-8 h-8 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-slate-800">Message envoyé !</h3>
                                <p className="text-slate-500 text-sm text-center">
                                    Merci <strong>{form.name}</strong>, nous avons bien reçu votre message.
                                    Nous vous répondrons dans les 24h.
                                </p>
                                <button
                                    onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }) }}
                                    className="text-sm text-teal-600 hover:underline"
                                >
                                    Envoyer un autre message
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <Field label="Nom complet" name="name" value={form.name} onChange={handleChange} required />
                                    <Field label="Email" name="email" type="email" value={form.email} onChange={handleChange} required />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-sm font-medium text-slate-600">Sujet</label>
                                    <select
                                        name="subject" value={form.subject} onChange={handleChange} required
                                        className="border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400"
                                    >
                                        <option value="">Choisir un sujet</option>
                                        <option>Commande / livraison</option>
                                        <option>Problème technique</option>
                                        <option>Partenariat</option>
                                        <option>Autre</option>
                                    </select>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-sm font-medium text-slate-600">Message</label>
                                    <textarea
                                        name="message" value={form.message} onChange={handleChange}
                                        rows={5} required placeholder="Décrivez votre demande..."
                                        className="border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 resize-none"
                                    />
                                </div>
                                <button
                                    type="submit" disabled={loading}
                                    className="bg-teal-500 text-white py-3 rounded-xl font-semibold hover:bg-teal-600 transition disabled:opacity-50"
                                >
                                    {loading ? 'Envoi en cours...' : 'Envoyer le message'}
                                </button>
                            </form>
                        )}
                    </div>

                </div>
            </main>
        </>
    )
}

function Field({ label, name, value, onChange, type = 'text', required = false }: {
    label: string; name: string; value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    type?: string; required?: boolean
}) {
    return (
        <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-600">{label}</label>
            <input
                type={type} name={name} value={value} onChange={onChange} required={required}
                className="border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400"
            />
        </div>
    )
}
