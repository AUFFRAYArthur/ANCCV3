import React from "react"
import type { LigneBilan } from "../utils/parseBalance"
import type { Retraitement } from "../types/retraitement"
import { BilanTable } from "./BilanTable"

function appliqueRetraitements(
  lignes: LigneBilan[],
  retraitements: Retraitement[]
): LigneBilan[] {
  // On clone les lignes pour ne pas muter l'original
  const clone = lignes.map(l => ({ ...l }))
  for (const r of retraitements) {
    // On applique le montant sur le poste concerné (on répartit sur la première ligne du poste)
    const idx = clone.findIndex(l => l.libelle === r.poste)
    if (idx !== -1) {
      // On applique le retraitement sur le débit (pour l'actif) ou crédit (pour le passif)
      if (r.montant >= 0) {
        clone[idx].debit += r.montant
      } else {
        clone[idx].credit += Math.abs(r.montant)
      }
    }
  }
  return clone
}

export function BilanCorrigeTable({
  lignes,
  retraitements,
  annee,
}: {
  lignes: LigneBilan[]
  retraitements: Retraitement[]
  annee: string
}) {
  const lignesCorrigees = appliqueRetraitements(lignes, retraitements)
  return (
    <div className="mt-10">
      <h3 className="text-2xl font-bold text-[#10b981] mb-4 text-center">
        Bilan corrigé après retraitements
      </h3>
      <BilanTable lignes={lignesCorrigees} annee={annee} />
    </div>
  )
}
