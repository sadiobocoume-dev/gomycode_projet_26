'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import AdminRoute from '@/components/AdminRoute'
import api from '@/lib/api'

const CATEGORIES = ['Électronique', 'Vêtements', 'Alimentation', 'Maison', 'Sport', 'Autre']

export default function EditProductPage() {
    const router    = useRouter()
    const { id }    = useParams<{ id: string }>()

    const [form, setForm]       = useState({
        name: '', description: '', price: '', image: '', category: CATEGORIES[0], stock: '',
    })
    const [error, setError]     = useState('')
    const [loading, setLoading] = useState(true)
    const [saving, setSaving]   = useState(false)

    useEffect(() => {
        api.get(`/api/products/${id}`)
            .then(({ data }) => {
                setForm({
                    name:        data.name,
                    description: data.description,
                    price:       String(data.price),
                    image:       data.image,
                    category:    data.category,
                    stock:       String(data.stock),
                })
            })
            .catch(() => setError('Produit introuvable'))
            .finally(() => setLoading(false))
    }, [id])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setSaving(true)
        try {
            await api.put(`/api/products/${id}`, {
                ...form,
                price: Number(form.price),
                stock: Number(form.stock),
            })
            router.push('/admin?tab=products')
        } catch (err: any) {
            setError(err.response?.data?.message ?? 'Erreur lors de la mise à jour')
        } finally {
            setSaving(false)
        }
    }

    return (
        <AdminRoute>
            <main className="max-w-xl mx-auto px-4 py-8">
                <button
                    onClick={() => router.back()}
                    className="text-sm text-blue-500 hover:underline mb-6 inline-block"
                >
                    ← Retour
                </button>

                <h1 className="text-2xl font-bold text-gray-800 mb-6">Modifier le produit</h1>

                {error && (
                    <p className="bg-red-50 text-red-600 text-sm px-4 py-2 rounded-lg mb-4">{error}</p>
                )}

                {loading ? (
                    <p className="text-gray-400 text-center py-12">Chargement...</p>
                ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <Field label="Nom" name="name" value={form.name} onChange={handleChange} required />
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium text-gray-700">Description</label>
                            <textarea
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                rows={3}
                                required
                                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <Field label="Prix (Fcfa)" name="price" type="number" value={form.price} onChange={handleChange} required />
                        <Field label="URL de l'image" name="image" value={form.image} onChange={handleChange} required />
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium text-gray-700">Catégorie</label>
                            <select
                                name="category"
                                value={form.category}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                            </select>
                        </div>
                        <Field label="Stock" name="stock" type="number" value={form.stock} onChange={handleChange} required />

                        <button
                            type="submit"
                            disabled={saving}
                            className="mt-2 bg-blue-600 text-white py-2 rounded-xl font-semibold hover:bg-blue-700 transition disabled:opacity-50"
                        >
                            {saving ? 'Enregistrement...' : 'Enregistrer les modifications'}
                        </button>
                    </form>
                )}
            </main>
        </AdminRoute>
    )
}

function Field({
    label, name, value, onChange, type = 'text', required = false,
}: {
    label: string
    name: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    type?: string
    required?: boolean
}) {
    return (
        <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">{label}</label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                min={type === 'number' ? 0 : undefined}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    )
}
