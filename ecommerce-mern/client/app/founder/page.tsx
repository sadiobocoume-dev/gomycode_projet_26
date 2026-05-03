import PageHero from '@/components/PageHero'

export default function FounderPage() {
    return (
        <>
            <PageHero
                badge="Le fondateur"
                title="Rencontrez le créateur de Galsen-Ecommerce-Shop"
                subtitle="Étudiant ingénieur, entrepreneur et passionné de tech — Sadio Bocoum a construit Galsen-Ecommerce-Shop pour connecter Thiès au numérique."
            />

            <main className="max-w-3xl mx-auto px-4 py-12 flex flex-col gap-6">

                {/* Carte profil */}
                <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-8 flex flex-col sm:flex-row gap-8 items-center sm:items-start">
                    <div className="w-28 h-28 rounded-full bg-gradient-to-br from-teal-400 to-indigo-400 flex items-center justify-center text-white text-4xl font-extrabold shrink-0 shadow-md">
                        SB
                    </div>
                    <div className="flex flex-col gap-2 text-center sm:text-left">
                        <h2 className="text-2xl font-bold text-slate-800">Sadio Bocoum</h2>
                        <p className="text-teal-600 font-semibold text-sm">Fondateur & Développeur — Galsen-Ecommerce-Shop</p>
                        <p className="text-slate-500 text-sm">Thiès, Sénégal · Mour 3</p>
                        <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-2">
                            {['Ingénieur junior', 'Entrepreneur', 'Passionné de tech'].map((tag) => (
                                <span key={tag} className="bg-teal-50 text-teal-600 text-xs font-medium px-3 py-1 rounded-full border border-teal-100">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-6">
                    <h3 className="font-bold text-slate-800 mb-3">Son parcours</h3>
                    <p className="text-slate-500 leading-relaxed">
                        Étudiant en formation d'ingénieur junior, Sadio Bocoum a créé Galsen-Ecommerce-Shop avec un objectif
                        clair : mettre la technologie au service du commerce local thiessois. Passionné par le
                        développement web et les solutions concrètes, il a construit cette plateforme de A à Z,
                        du backend Node.js au frontend Next.js.
                    </p>
                </div>

                <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-6">
                    <h3 className="font-bold text-slate-800 mb-3">Sa vision</h3>
                    <p className="text-slate-500 leading-relaxed">
                        "Je voulais que les commerçants de mon quartier aient accès aux mêmes outils que
                        les grandes enseignes. Pas besoin d'aller à Dakar pour profiter du numérique.
                        Thiès a tout ce qu'il faut — il manquait juste la plateforme."
                    </p>
                    <p className="text-teal-600 font-semibold text-sm mt-3 italic">— Sadio Bocoum</p>
                </div>

                <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-6">
                    <h3 className="font-bold text-slate-800 mb-4">Stack technique</h3>
                    <div className="flex flex-wrap gap-2">
                        {['Next.js 15', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Stripe', 'Zustand', 'Tailwind CSS'].map((tech) => (
                            <span key={tech} className="bg-slate-50 text-slate-600 text-xs font-mono px-3 py-1.5 rounded-lg border border-slate-200">
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>

            </main>
        </>
    )
}
