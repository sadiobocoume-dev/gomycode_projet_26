'use client'
import { useRouter, useSearchParams } from 'next/navigation'

interface Props {
    currentPage: number
    totalPages: number
}

export default function Pagination({ currentPage, totalPages }: Props) {
    const router = useRouter()
    const searchParams = useSearchParams()

    const goToPage = (page: number) => {
        // on conserve tous les filtres existants et on change juste le numéro de page
        const params = new URLSearchParams(searchParams.toString())
        params.set('page', String(page))
        router.push(`/products?${params.toString()}`)
        router.refresh()
    }

    if (totalPages <= 1) return null

    return (
        <div className="flex justify-center gap-2 mt-10">
            <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
                Précédent
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                    key={p}
                    onClick={() => goToPage(p)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                        p === currentPage
                            ? 'bg-teal-500 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                    {p}
                </button>
            ))}

            <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
                Suivant
            </button>
        </div>
    )
}
