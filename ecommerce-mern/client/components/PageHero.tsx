interface Props {
    badge?:    string
    title:     string
    subtitle?: string
    compact?:  boolean  // compact = pages fonctionnelles (panier, commandes…)
}

export default function PageHero({ badge, title, subtitle, compact = false }: Props) {
    return (
        <section className={`relative overflow-hidden bg-gradient-to-br from-sky-50 via-indigo-50 to-blue-100 ${compact ? 'py-10' : 'py-20'}`}>
            {/* Cercles décoratifs identiques à la page d'accueil */}
            <div className="absolute -top-20 -right-20 w-72 h-72 bg-indigo-200/30 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-sky-200/30 rounded-full blur-3xl pointer-events-none" />

            <div className="relative max-w-5xl mx-auto px-4 text-center flex flex-col items-center gap-3">
                {badge && (
                    <span className="inline-flex items-center gap-1.5 bg-white/70 backdrop-blur-sm border border-slate-200 text-slate-500 text-xs font-medium px-4 py-1.5 rounded-full shadow-sm">
                        {badge}
                    </span>
                )}
                <h1 className={`font-extrabold text-slate-800 tracking-tight ${compact ? 'text-2xl' : 'text-4xl sm:text-5xl'}`}>
                    {title}
                </h1>
                {subtitle && (
                    <p className={`text-slate-500 max-w-xl leading-relaxed ${compact ? 'text-sm' : 'text-base sm:text-lg'}`}>
                        {subtitle}
                    </p>
                )}
            </div>
        </section>
    )
}
