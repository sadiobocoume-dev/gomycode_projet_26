'use client'

import { useState } from 'react'
import PageHero from '@/components/PageHero'

const PLANS = [
    {
        id: 'starter',
        name: 'Starter',
        price: '5 000',
        description: 'Idéal pour les petits commerces qui débutent en ligne.',
        border: 'border-slate-200',
        badge: '',
        features: [
            "Jusqu'à 20 produits en ligne",
            'Page boutique personnalisée',
            'Paiement en ligne sécurisé',
            'Support par email',
            'Tableau de bord basique',
        ],
    },
    {
        id: 'commercant',
        name: 'Commerçant',
        price: '15 000',
        description: 'Pour les boutiques actives qui veulent développer leur visibilité.',
        border: 'border-teal-400',
        badge: 'Populaire',
        features: [
            "Jusqu'à 100 produits en ligne",
            'Page boutique personnalisée',
            'Paiement en ligne sécurisé',
            'Support prioritaire (téléphone)',
            'Tableau de bord + statistiques',
            'Mise en avant dans le catalogue',
            'Gestion des promotions',
        ],
    },
    {
        id: 'premium',
        name: 'Premium',
        price: '30 000',
        description: "Pour les enseignes qui veulent une présence maximale sur Galsen-Ecommerce-Shop.",
        border: 'border-indigo-400',
        badge: 'Tout inclus',
        features: [
            'Produits illimités',
            'Page boutique personnalisée',
            'Paiement en ligne sécurisé',
            'Gestionnaire de compte dédié',
            'Tableaux de bord avancés + exports',
            "Produits sponsorisés en page d'accueil",
            'Intégration stock en temps réel',
            'Contrat sur mesure',
        ],
    },
]

export default function PartenariatsPage() {
    const [selectedPlan, setSelectedPlan] = useState('')
    const [form, setForm]     = useState({ name: '', boutique: '', phone: '', email: '', type: '', plan: '', message: '' })
    const [submitted, setSubmitted] = useState(false)
    const [loading, setLoading]     = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSelectPlan = (planId: string) => {
        setSelectedPlan(planId)
        setForm((prev) => ({ ...prev, plan: planId }))
        document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setTimeout(() => { setLoading(false); setSubmitted(true) }, 800)
    }

    return (
        <>
            <PageHero
                badge="Rejoignez notre réseau"
                title="Devenez boutique partenaire Galsen-Ecommerce-Shop"
                subtitle="Vous avez une boutique physique à Thiès ? Représentez vos produits en ligne et touchez des milliers de clients. Choisissez votre formule d'abonnement."
            />

            <main className="max-w-5xl mx-auto px-4 py-12">

                {/* Plans tarifaires */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
                    {PLANS.map((plan) => (
                        <div
                            key={plan.id}
                            className={`bg-white rounded-2xl border-2 shadow-sm p-6 flex flex-col gap-4
                                        hover:-translate-y-1 hover:shadow-md transition-all duration-200
                                        ${plan.border}
                                        ${selectedPlan === plan.id ? 'ring-2 ring-teal-400 ring-offset-2' : ''}`}
                        >
                            <div className="flex items-start justify-between">
                                <h3 className="text-xl font-bold text-slate-800">{plan.name}</h3>
                                {plan.badge && (
                                    <span className="bg-teal-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                                        {plan.badge}
                                    </span>
                                )}
                            </div>
                            <div className="flex items-baseline gap-1">
                                <span className="text-3xl font-extrabold text-teal-600">{plan.price}</span>
                                <span className="text-sm text-slate-400 font-medium">Fcfa/mois</span>
                            </div>
                            <p className="text-sm text-slate-500">{plan.description}</p>
                            <ul className="flex flex-col gap-2 flex-1">
                                {plan.features.map((f) => (
                                    <li key={f} className="flex items-start gap-2 text-sm text-slate-600">
                                        <svg className="w-4 h-4 text-teal-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        {f}
                                    </li>
                                ))}
                            </ul>
                            <button
                                onClick={() => handleSelectPlan(plan.id)}
                                className={`mt-2 w-full py-2.5 rounded-xl text-sm font-semibold transition-colors duration-200
                                            ${selectedPlan === plan.id
                                                ? 'bg-teal-500 text-white'
                                                : 'bg-slate-50 text-teal-600 border border-teal-200 hover:bg-teal-50'}`}
                            >
                                {selectedPlan === plan.id ? '✓ Sélectionné' : 'Choisir ce plan'}
                            </button>
                        </div>
                    ))}
                </div>

                {/* Formulaire de demande */}
                <div id="contact-form" className="bg-white border border-slate-100 rounded-2xl shadow-sm p-8">
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-slate-800 mb-1">Déposer une demande</h2>
                        <p className="text-slate-500 text-sm">Notre équipe vous contacte sous 48h pour finaliser votre contrat.</p>
                    </div>

                    {submitted ? (
                        <div className="flex flex-col items-center gap-4 py-10">
                            <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-slate-800">Demande envoyée !</h3>
                            <p className="text-slate-500 text-sm text-center max-w-md">
                                Merci <strong>{form.boutique}</strong>, votre demande a bien été reçue.
                                Nous vous contactons au <strong>{form.phone}</strong> dans les 48h.
                            </p>
                            <button
                                onClick={() => { setSubmitted(false); setSelectedPlan(''); setForm({ name: '', boutique: '', phone: '', email: '', type: '', plan: '', message: '' }) }}
                                className="text-sm text-teal-600 hover:underline mt-2"
                            >
                                Soumettre une autre demande
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <Field label="Nom du gérant"       name="name"     value={form.name}     onChange={handleChange} required />
                                <Field label="Nom de la boutique"  name="boutique" value={form.boutique} onChange={handleChange} required />
                                <Field label="Téléphone"           name="phone"    type="tel" value={form.phone}  onChange={handleChange} required />
                                <Field label="Email"               name="email"    type="email" value={form.email} onChange={handleChange} required />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div className="flex flex-col gap-1">
                                    <label className="text-sm font-medium text-slate-600">Type de boutique</label>
                                    <select name="type" value={form.type} onChange={handleChange} required
                                        className="border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400">
                                        <option value="">Sélectionner</option>
                                        <option>Alimentation / épicerie</option>
                                        <option>Électronique</option>
                                        <option>Vêtements / mode</option>
                                        <option>Maison / décoration</option>
                                        <option>Pharmacie / santé</option>
                                        <option>Sport / loisirs</option>
                                        <option>Autre</option>
                                    </select>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-sm font-medium text-slate-600">Plan d'abonnement</label>
                                    <select name="plan" value={form.plan} onChange={handleChange} required
                                        className="border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400">
                                        <option value="">Sélectionner un plan</option>
                                        <option value="starter">Starter — 5 000 Fcfa/mois</option>
                                        <option value="commercant">Commerçant — 15 000 Fcfa/mois</option>
                                        <option value="premium">Premium — 30 000 Fcfa/mois</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium text-slate-600">Message (optionnel)</label>
                                <textarea name="message" value={form.message} onChange={handleChange}
                                    rows={4} placeholder="Décrivez votre boutique, vos produits, vos questions..."
                                    className="border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 resize-none" />
                            </div>
                            <button type="submit" disabled={loading}
                                className="bg-teal-500 text-white py-3 rounded-xl font-semibold hover:bg-teal-600 transition disabled:opacity-50">
                                {loading ? 'Envoi en cours...' : 'Envoyer ma demande de partenariat'}
                            </button>
                            <p className="text-xs text-slate-400 text-center">
                                En soumettant ce formulaire, vous acceptez d'être contacté par notre équipe commerciale.
                            </p>
                        </form>
                    )}
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
            <input type={type} name={name} value={value} onChange={onChange} required={required}
                className="border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400" />
        </div>
    )
}
