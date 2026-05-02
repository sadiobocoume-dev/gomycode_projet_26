'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import api from '@/lib/api'
import { useAuthStore } from '@/store/authStore'

export default function RegisterForm() {
    const router = useRouter()
    const login = useAuthStore((state) => state.login)

    const [name, setName]           = useState('')
    const [email, setEmail]         = useState('')
    const [password, setPassword]   = useState('')
    const [confirm, setConfirm]     = useState('')
    const [error, setError]         = useState('')
    const [loading, setLoading]     = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        // Validation côté client — le backend ne peut pas faire ça
        // car il ne reçoit qu'un seul champ password
        if (password !== confirm) {
            setError('Les mots de passe ne correspondent pas')
            return
        }

        if (password.length < 8) {
            setError('Le mot de passe doit contenir au moins 8 caractères')
            return
        }

        setLoading(true)

        try {
            // Le backend register renvoie { token, user } comme le login
            // → connexion automatique après inscription
            const res = await api.post('/api/auth/register', { name, email, password })
            login(res.data.user, res.data.token)
            router.push('/')
        } catch (err: any) {
            setError(err.response?.data?.message || "Erreur lors de l'inscription")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="bg-white rounded-2xl shadow p-8 w-full max-w-md">

            <h1 className="text-2xl font-bold text-gray-800 mb-2">Créer un compte</h1>
            <p className="text-gray-400 text-sm mb-6">
                Rejoins-nous pour commencer à commander
            </p>

            {error && (
                <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg mb-4">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-600">Nom complet</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ton nom"
                        required
                        className="border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-600">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="ton@email.com"
                        required
                        className="border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-600">Mot de passe</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="8 caractères minimum"
                        required
                        className="border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-600">Confirmer le mot de passe</label>
                    <input
                        type="password"
                        value={confirm}
                        onChange={(e) => setConfirm(e.target.value)}
                        placeholder="••••••••"
                        required
                        className="border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-teal-500 text-white py-3 rounded-xl font-semibold hover:bg-teal-600 transition disabled:bg-slate-200 disabled:text-slate-400 mt-2"
                >
                    {loading ? 'Création...' : 'Créer mon compte'}
                </button>

            </form>

            <p className="text-center text-sm text-gray-400 mt-6">
                Déjà un compte ?{' '}
                <Link href="/login" className="text-teal-600 font-medium hover:underline">
                    Se connecter
                </Link>
            </p>

        </div>
    )
}
