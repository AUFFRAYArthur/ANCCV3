/* Ajout de l’export POSTES pour usage dans RetraitementForm */
import React, { useMemo } from "react"
import { Info } from "lucide-react"
import type { LigneBilan } from "../utils/parseBalance"

export const POSTES = [
  {
    label: "Immobilisations",
    comptes: /^2/,
    type: "actif",
    couleur: "#9E7FFF",
    explication: "Biens durables (terrains, constructions, matériel, etc.)",
  },
  {
    label: "Stocks",
    comptes: /^3/,
    type: "actif",
    couleur: "#38bdf8",
    explication: "Matières premières, marchandises, produits finis.",
  },
  {
    label: "Créances",
    comptes: /^4(0|1)/,
    type: "actif",
    couleur: "#f472b6",
    explication: "Clients, autres créances.",
  },
  {
    label: "Trésorerie actif",
    comptes: /^5/,
    type: "actif",
    couleur: "#10b981",
    explication: "Banques, caisse, placements de trésorerie.",
  },
  {
    label: "Capitaux propres",
    comptes: /^1(0|2|6|2)/,
    type: "passif",
    couleur: "#f59e0b",
    explication: "Capital, réserves, résultat.",
  },
  {
    label: "Dettes financières",
    comptes: /^1(6|4)/,
    type: "passif",
    couleur: "#ef4444",
    explication: "Emprunts, dettes financières.",
  },
  {
    label: "Dettes d'exploitation",
    comptes: /^4(0|5)/,
    type: "passif",
    couleur: "#A3A3A3",
    explication: "Fournisseurs, dettes fiscales et sociales.",
  },
  {
    label: "Trésorerie passif",
    comptes: /^5/,
    type: "passif",
    couleur: "#A3A3A3",
    explication: "Découverts bancaires.",
  },
]

function regroupeParPoste(lignes: LigneBilan[], type: "actif" | "passif") {
  const postes = POSTES.filter(p => p.type === type)
  const result: { [poste: string]: { total: number, lignes: LigneBilan[], explication: string, couleur: string } } = {}
  for (const poste of postes) {
    const lignesPoste = lignes.filter(l =>
      poste.comptes.test(l.compte)
    )
    const total = lignesPoste.reduce(
      (sum, l) => sum + (type === "actif" ? l.debit - l.credit : l.credit - l.debit),
      0
    )
    result[poste.label] = {
      total,
      lignes: lignesPoste,
      explication: poste.explication,
      couleur: poste.couleur,
    }
  }
  return result
}

export function BilanTable({ lignes, annee }: { lignes: LigneBilan[], annee: string }) {
  const actif = useMemo(() => regroupeParPoste(lignes, "actif"), [lignes])
  const passif = useMemo(() => regroupeParPoste(lignes, "passif"), [lignes])

  const totalActif = Object.values(actif).reduce((sum, p) => sum + p.total, 0)
  const totalPassif = Object.values(passif).reduce((sum, p) => sum + p.total, 0)

  return (
    <div className="w-full max-w-5xl mx-auto bg-[#262626] rounded-3xl shadow-2xl p-8 animate-fade-in">
      <h3 className="text-2xl font-bold text-white mb-6 text-center">
        Bilan structuré – Exercice {annee}
      </h3>
      <div className="grid grid-cols-2 gap-8">
        {/* ACTIF */}
        <div>
          <h4 className="text-xl font-semibold text-[#9E7FFF] mb-2">ACTIF</h4>
          <ul className="space-y-2">
            {Object.entries(actif).map(([poste, { total, explication, couleur }]) => (
              <li key={poste} className="flex items-center justify-between bg-[#171717] rounded-xl px-4 py-3 shadow group relative">
                <span className="flex items-center gap-2 font-medium text-white">
                  <span
                    className="w-3 h-3 rounded-full inline-block"
                    style={{ background: couleur }}
                  />
                  {poste}
                  <span className="ml-1">
                    <Info
                      className="w-4 h-4 text-[#f472b6] opacity-70 cursor-pointer"
                      tabIndex={0}
                      aria-label={`Explication ${poste}`}
                      title={explication}
                    />
                  </span>
                </span>
                <span className="font-mono text-lg text-white">
                  {total.toLocaleString("fr-FR", { minimumFractionDigits: 0, maximumFractionDigits: 0 })} €
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex items-center justify-between border-t border-[#2F2F2F] pt-4">
            <span className="font-bold text-white">Total Actif</span>
            <span className="font-mono text-xl text-[#9E7FFF] font-bold">
              {totalActif.toLocaleString("fr-FR", { minimumFractionDigits: 0, maximumFractionDigits: 0 })} €
            </span>
          </div>
        </div>
        {/* PASSIF */}
        <div>
          <h4 className="text-xl font-semibold text-[#38bdf8] mb-2">PASSIF</h4>
          <ul className="space-y-2">
            {Object.entries(passif).map(([poste, { total, explication, couleur }]) => (
              <li key={poste} className="flex items-center justify-between bg-[#171717] rounded-xl px-4 py-3 shadow group relative">
                <span className="flex items-center gap-2 font-medium text-white">
                  <span
                    className="w-3 h-3 rounded-full inline-block"
                    style={{ background: couleur }}
                  />
                  {poste}
                  <span className="ml-1">
                    <Info
                      className="w-4 h-4 text-[#f472b6] opacity-70 cursor-pointer"
                      tabIndex={0}
                      aria-label={`Explication ${poste}`}
                      title={explication}
                    />
                  </span>
                </span>
                <span className="font-mono text-lg text-white">
                  {total.toLocaleString("fr-FR", { minimumFractionDigits: 0, maximumFractionDigits: 0 })} €
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex items-center justify-between border-t border-[#2F2F2F] pt-4">
            <span className="font-bold text-white">Total Passif</span>
            <span className="font-mono text-xl text-[#38bdf8] font-bold">
              {totalPassif.toLocaleString("fr-FR", { minimumFractionDigits: 0, maximumFractionDigits: 0 })} €
            </span>
          </div>
        </div>
      </div>
      <div className="mt-8 text-center">
        <span className="inline-block px-4 py-2 rounded-xl bg-[#f472b6]/10 text-[#f472b6] font-semibold">
          {Math.abs(totalActif - totalPassif) > 1
            ? `⚠️ Déséquilibre de ${Math.abs(totalActif - totalPassif).toLocaleString("fr-FR")} €`
            : "Bilan équilibré"}
        </span>
      </div>
    </div>
  )
}
