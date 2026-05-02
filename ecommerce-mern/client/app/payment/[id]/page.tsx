'use client'

import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import { loadStripe } from '@stripe/stripe-js'
import {
    Elements,
    PaymentElement,
    useStripe,
    useElements
} from '@stripe/react-stripe-js'
import ProtectedRoute from '@/components/ProtectedRoute'
import PageHero from '@/components/PageHero'
import api from '@/lib/api'
import { useCartStore } from '@/store/cartStore'

// loadStripe() charge le script Stripe.js depuis les serveurs de Stripe
// Créé UNE SEULE FOIS en dehors du composant pour éviter les rechargements
// La clé publique (pk_test_...) est safe côté client
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

// ── Formulaire de paiement
// Séparé car useStripe() et useElements() ne peuvent s'utiliser
// qu'à l'intérieur d'un composant enfant de <Elements>
function PaymentForm({ orderId }: { orderId: string }) {
    const stripe     = useStripe()
    const elements   = useElements()
    const router     = useRouter()
    const clearCart  = useCartStore((state) => state.clearCart)

    const [loading, setLoading] = useState(false)
    const [error, setError]     = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        // stripe et elements sont null pendant le chargement initial
        if (!stripe || !elements) return

        setLoading(true)
        setError('')

        try {
            // Stripe valide la carte et confirme le paiement
            // Les données de carte vont DIRECTEMENT à Stripe — jamais à notre backend
            const { error: stripeError, paymentIntent } = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    return_url: `${window.location.origin}/orders/${orderId}/confirmation`,
                },
                redirect: 'if_required',
            })

            if (stripeError) {
                setError(stripeError.message || 'Erreur de paiement')
                return
            }

            if (paymentIntent?.status === 'succeeded') {
                // On informe notre backend que le paiement est confirmé
                // Le backend vérifie auprès de Stripe et met à jour la commande
                await api.post(`/api/orders/${orderId}/pay`, {
                    paymentIntentId: paymentIntent.id
                })

                // Panier vidé ici : paiement réellement confirmé
                clearCart()

                // Redirection vers la page de confirmation (US-18)
                router.push(`/orders/${orderId}/confirmation`)
            }

        } catch (err: any) {
            setError(err.response?.data?.message || 'Erreur lors de la confirmation')
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* PaymentElement = formulaire Stripe sécurisé
                Gère automatiquement : numéro de carte, date, CVV
                Les données ne touchent jamais notre serveur (PCI compliance) */}
            <PaymentElement />

            {error && (
                <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg">
                    {error}
                </div>
            )}

            <button
                type="submit"
                disabled={!stripe || loading}
                className="w-full bg-teal-500 text-white py-3 rounded-xl font-semibold hover:bg-teal-600 transition disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed"
            >
                {loading ? 'Paiement en cours...' : 'Payer maintenant'}
            </button>
        </form>
    )
}

// ── Page principale
// En Next.js 15, params est une Promise dans les Client Components
// → on doit le déballer avec React.use() avant d'accéder à ses propriétés
export default function PaymentPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params) // use() déballe la Promise de façon synchrone dans le rendu

    const [clientSecret, setClientSecret]     = useState('')
    const [loadingSecret, setLoadingSecret]   = useState(true)
    const [error, setError]                   = useState('')

    useEffect(() => {
        // Au chargement : demande un PaymentIntent au backend
        // Le backend crée l'intent chez Stripe et retourne le clientSecret
        const fetchPaymentIntent = async () => {
            try {
                const res = await api.post(`/api/orders/${id}/pay`, {})
                setClientSecret(res.data.clientSecret)
            } catch (err: any) {
                setError(err.response?.data?.message || 'Erreur de chargement du paiement')
            } finally {
                setLoadingSecret(false)
            }
        }

        fetchPaymentIntent()
    }, [id])

    return (
        <ProtectedRoute>
            <>
            <PageHero compact title="Paiement sécurisé" subtitle="Vos données bancaires sont chiffrées et ne transitent jamais par nos serveurs." />
            <main className="max-w-lg mx-auto px-4 py-8">

                {loadingSecret ? (
                    <div className="text-center py-12 text-gray-400">
                        Chargement du formulaire de paiement...
                    </div>
                ) : error ? (
                    <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg">
                        {error}
                    </div>
                ) : clientSecret ? (
                    // <Elements> est le provider Stripe
                    // Il doit envelopper tout composant qui utilise useStripe() ou useElements()
                    // clientSecret lie ce formulaire au PaymentIntent créé par le backend
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                        <Elements
                            stripe={stripePromise}
                            options={{ clientSecret, appearance: { theme: 'stripe' } }}
                        >
                            <PaymentForm orderId={id} />
                        </Elements>
                    </div>
                ) : null}

                <div className="flex items-center justify-center gap-2 mt-6 text-gray-400 text-xs">
                    <span>🔒</span>
                    <span>Paiement sécurisé SSL — Vos données bancaires sont chiffrées</span>
                </div>

            </main>
            </>
        </ProtectedRoute>
    )
}
