import React from "react"
import { Trash2, Edit2, Info } from "lucide-react"
import type { Retraitement } from "../types/retraitement"
import { POSTES } from "./BilanTable"

const TYPE_LABELS: Record<string, { label: string; color: string }> = {
  "plus-value": { label: "Plus-value", color: "#10b981" },
  "moins-value": { label: "Moins-value", color: "#ef4444" },
  "actif-fictif": { label: "Actif fictif", color: "#f59e0b" },
  "provision": { label: "Provision", color: "#38bdf8" },
  "dette": { label: "Dette", color: "#f472b6" },
  "autre": { label: "Autre", color: "#A3A3A3" },
}

export function RetraitementsTable({
  retraitements,
  onEdit,
  onDelete,
}: {
  retraitements: Retraitement[]
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}) {
  if (retraitements.length === 0) {
    return (
      <div className="text-[#A3A3A3] text-center py-8">
        Aucun retraitement ajouté pour cet exercice.
      </div>
    )
  }
  return (
    <ul className="space-y-3">
      {retraitements.map(r => (
        <li
          key={r.id}
          className="flex items-center justify-between bg-[#171717] rounded-xl px-4 py-3 shadow group relative animate-fade-in"
        >
          <span className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full inline-block"
              style={{ background: TYPE_LABELS[r.type].color }}
              aria-label={TYPE_LABELS[r.type].label}
            />
            <span className="font-semibold text-white">{r.libelle}</span>
            <span className="text-xs px-2 py-1 rounded bg-[#262626] text-[#A3A3A3] ml-2">
              {TYPE_LABELS[r.type].label}
            </span>
            <span className="text-xs px-2 py-1 rounded bg-[#262626] text-[#9E7FFF] ml-2">
              {r.poste}
            </span>
            {r.explication && (
              <span className="ml-2">
                <Info
                  className="w-4 h-4 text-[#f472b6] opacity-70 cursor-pointer"
                  tabIndex={0}
                  aria-label="Explication"
                  title={r.explication}
                />
              </span>
            )}
          </span>
          <span className="flex items-center gap-3">
            <span
              className={`font-mono text-lg ${
                r.montant >= 0 ? "text-[#10b981]" : "text-[#ef4444]"
              }`}
            >
              {r.montant >= 0 ? "+" : ""}
              {r.montant.toLocaleString("fr-FR", { minimumFractionDigits: 0, maximumFractionDigits: 0 })} €
            </span>
            <button
              className="p-1 rounded hover:bg-[#262626] transition"
              aria-label="Modifier"
              onClick={() => onEdit(r.id)}
            >
              <Edit2 className="w-4 h-4 text-[#38bdf8]" />
            </button>
            <button
              className="p-1 rounded hover:bg-[#262626] transition"
              aria-label="Supprimer"
              onClick={() => onDelete(r.id)}
            >
              <Trash2 className="w-4 h-4 text-[#ef4444]" />
            </button>
          </span>
        </li>
      ))}
    </ul>
  )
}
