'use client'
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from 'next/link'
import api from '@/lib/api'
import { useAuthStore } from "@/store/authStore"

export default function LoginForm() {
    const router = useRouter()
    const login = useAuthStore((state) => state.login)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        // empeche le rechargement de page par defaut du formulaire
        e.preventDefault()
        setError('')
        setLoading(true)


        try {
            // appel API vers POST/api/auth/login
            const res = await api.post('/api/auth/login', { email, password })

            // stocke uer + token ds le store Zustand + localStorage
            login(res.data.user, res.data.token)

            // redirige vers l'accueil apres connexion
            router.push('/')
        } catch (err: any) {
            // affiche le message d'erreur du backend
            setError(err.response?.data?.message || 'Erreur de connexion')
        } finally {
            setLoading(false)
        }
    }
    return (

        <div className="bg-white rounded-2xl shadow p-8 w-full max-w-md">

            {/* Titre */}
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Connexion</h1>
            <p className="text-gray-400 text-sm mb-6">
                Accède à ton compte pour commander
            </p>

            {/* Message d'erreur */}
            {error && (
                <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg mb-4">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

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
                    {/* relative sur le div → pour positionner le bouton œil en absolute */}
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 pr-11 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((v) => !v)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                            tabIndex={-1}
                        >
                            {showPassword ? (
                                /* Œil barré — mot de passe visible */
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                </svg>
                            ) : (
                                /* Œil ouvert — mot de passe masqué */
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-teal-500 text-white py-3 rounded-xl font-semibold hover:bg-teal-600 transition disabled:bg-slate-200 disabled:text-slate-400 mt-2"
                >
                    {loading ? 'Connexion...' : 'Se connecter'}
                </button>
            </form>

            {/* Lien vers register */}
            <p className="text-center text-sm text-gray-400 mt-6">
                Pas encore de compte ?{' '}
                <Link href="/register" className="text-teal-600 font-medium hover:underline">
                    S'inscrire
                </Link>
            </p>
        </div>

    )
}