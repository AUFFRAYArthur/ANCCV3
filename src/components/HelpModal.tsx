import { Lightbulb } from "lucide-react"
import React from "react"

export function HelpModal({ open, onClose }: { open: boolean, onClose: () => void }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-8 relative animate-fade-in">
        <button
          className="absolute top-4 right-4 text-[#9E7FFF] hover:text-[#f472b6] transition"
          onClick={onClose}
          aria-label="Fermer l'aide"
        >
          <span className="sr-only">Fermer</span>
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M18 6 6 18M6 6l12 12"/>
          </svg>
        </button>
        <div className="flex items-center gap-3 mb-4">
          <Lightbulb className="w-8 h-8 text-[#9E7FFF]" />
          <h2 className="text-2xl font-bold text-[#171717]">Aide &amp; Documentation</h2>
        </div>
        <div className="space-y-4 text-[#262626] text-lg">
          <p>
            <strong>Bienvenue sur l’outil d’évaluation ANCC !</strong>
            <br />
            Cette application vous guide pas à pas dans la valorisation patrimoniale d’une entreprise selon la méthode de l’Actif Net Comptable Corrigé.
          </p>
          <ul className="list-disc pl-6">
            <li>Importez une balance générale ou un bilan au format CSV (gabarit fourni).</li>
            <li>Vérifiez et ajustez les postes du bilan pour obtenir l’ANCC.</li>
            <li>Ajoutez des retraitements, plus-values, moins-values, éléments hors bilan, etc.</li>
            <li>Visualisez l’impact de chaque ajustement en temps réel.</li>
            <li>Générez un rapport d’évaluation professionnel et pédagogique.</li>
          </ul>
          <p>
            <strong>Besoin d’aide ?</strong> Consultez la documentation détaillée ou survolez les <span className="inline-block align-middle"><Lightbulb className="inline w-5 h-5 text-[#f472b6]" /></span> pour des explications pédagogiques.
          </p>
        </div>
      </div>
    </div>
  )
}
