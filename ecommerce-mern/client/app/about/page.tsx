import PageHero from '@/components/PageHero'

export default function AboutPage() {
    return (
        <>
            <PageHero
                badge="À propos de Galsen-Ecommerce-Shop"
                title="Notre histoire"
                subtitle="Galsen-Ecommerce-Shop est né d'un constat simple : les habitants de Thiès méritent une boutique aussi moderne que celles des grandes capitales, sans quitter leur quartier."
            />

            <main className="max-w-3xl mx-auto px-4 py-12 flex flex-col gap-8">

                <Card title="Notre mission">
                    <p>
                        Rendre le commerce local accessible à tous. Chaque produit vendu sur Galsen-Ecommerce-Shop
                        provient de commerçants de Thiès et de ses environs. Nous croyons que le numérique
                        doit servir les communautés locales, pas les éloigner.
                    </p>
                </Card>

                <Card title="Notre siège">
                    <p>
                        Galsen-Ecommerce-Shop est basé à <strong className="text-slate-700">Mour 3, Thiès</strong>, près du château d'eau.
                        Vous pouvez nous rendre visite du lundi au samedi, de 9h à 18h.
                        Notre équipe est composée de jeunes thiessois passionnés par la tech et le commerce.
                    </p>
                </Card>

                <Card title="Nos valeurs">
                    <ul className="flex flex-col gap-3">
                        {[
                            { titre: 'Proximité',    desc: "Nous connaissons nos clients et nos commerçants par leur nom." },
                            { titre: 'Confiance',    desc: "Paiements sécurisés, produits authentiques, retours sans friction." },
                            { titre: 'Impact local', desc: "Chaque commande soutient un commerçant de Thiès." },
                        ].map(({ titre, desc }) => (
                            <li key={titre} className="flex items-start gap-3">
                                <span className="w-2 h-2 bg-teal-400 rounded-full mt-2 shrink-0" />
                                <span>
                                    <span className="font-semibold text-slate-700">{titre} — </span>
                                    <span className="text-slate-500">{desc}</span>
                                </span>
                            </li>
                        ))}
                    </ul>
                </Card>

                {/* Chiffres clés */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                        { nb: '+500', label: 'Clients satisfaits' },
                        { nb: '+50',  label: 'Boutiques partenaires' },
                        { nb: '24h',  label: 'Délai de livraison' },
                    ].map(({ nb, label }) => (
                        <div key={label} className="bg-teal-50 border border-teal-100 rounded-2xl p-5 text-center">
                            <p className="text-3xl font-extrabold text-teal-600">{nb}</p>
                            <p className="text-xs text-slate-500 mt-1">{label}</p>
                        </div>
                    ))}
                </div>

            </main>
        </>
    )
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-bold text-slate-800 mb-3">{title}</h2>
            <div className="text-slate-500 leading-relaxed">{children}</div>
        </div>
    )
}
