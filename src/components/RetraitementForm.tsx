import React, { useState } from "react"
import { Plus, Check, X } from "lucide-react"
import { POSTES } from "./BilanTable"
import type { Retraitement, TypeRetraitement } from "../types/retraitement"

const TYPES: { value: TypeRetraitement; label: string; color: string }[] = [
  { value: "plus-value", label: "Plus-value sur actif", color: "#10b981" },
  { value: "moins-value", label: "Moins-value sur actif", color: "#ef4444" },
  { value: "actif-fictif", label: "Actif fictif à réintégrer", color: "#f59e0b" },
  { value: "provision", label: "Provision à réintégrer", color: "#38bdf8" },
  { value: "dette", label: "Dette à corriger", color: "#f472b6" },
  { value: "autre", label: "Autre", color: "#A3A3A3" },
]

export function RetraitementForm({
  onSubmit,
  onCancel,
  initial,
}: {
  onSubmit: (r: Omit<Retraitement, "id">) => void
  onCancel?: () => void
  initial?: Partial<Omit<Retraitement, "id">>
}) {
  const [type, setType] = useState<TypeRetraitement>(initial?.type || "plus-value")
  const [libelle, setLibelle] = useState(initial?.libelle || "")
  const [montant, setMontant] = useState(initial?.montant?.toString() || "")
  const [poste, setPoste] = useState(initial?.poste || POSTES[0].label)
  const [explication, setExplication] = useState(initial?.explication || "")
  const [error, setError] = useState<string | null>(null)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!libelle.trim() || !montant || isNaN(Number(montant))) {
      setError("Veuillez renseigner un libellé et un montant valide.")
      return
    }
    onSubmit({
      type,
      libelle: libelle.trim(),
      montant: Number(montant),
      poste,
      explication: explication.trim() || undefined,
    })
    setLibelle("")
    setMontant("")
    setExplication("")
    setError(null)
  }

  return (
    <form
      className="flex flex-col gap-4 bg-[#262626] rounded-2xl p-6 shadow-xl animate-fade-in"
      onSubmit={handleSubmit}
      aria-label="Formulaire de retraitement"
    >
      <div className="flex gap-2">
        <select
          className="rounded-xl px-3 py-2 bg-[#171717] text-white border border-[#2F2F2F] focus:ring-2 focus:ring-[#9E7FFF] transition"
          value={type}
          onChange={e => setType(e.target.value as TypeRetraitement)}
          aria-label="Type de retraitement"
        >
          {TYPES.map(t => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
        <select
          className="rounded-xl px-3 py-2 bg-[#171717] text-white border border-[#2F2F2F] focus:ring-2 focus:ring-[#9E7FFF] transition"
          value={poste}
          onChange={e => setPoste(e.target.value)}
          aria-label="Poste concerné"
        >
          {POSTES.map(p => (
            <option key={p.label} value={p.label}>
              {p.label}
            </option>
          ))}
        </select>
      </div>
      <input
        className="rounded-xl px-3 py-2 bg-[#171717] text-white border border-[#2F2F2F] focus:ring-2 focus:ring-[#9E7FFF] transition"
        placeholder="Libellé du retraitement"
        value={libelle}
        onChange={e => setLibelle(e.target.value)}
        required
        aria-label="Libellé"
      />
      <input
        className="rounded-xl px-3 py-2 bg-[#171717] text-white border border-[#2F2F2F] focus:ring-2 focus:ring-[#9E7FFF] transition"
        placeholder="Montant (€)"
        value={montant}
        onChange={e => setMontant(e.target.value.replace(/[^0-9\-,.]/g, ""))}
        required
        aria-label="Montant"
        inputMode="decimal"
      />
      <textarea
        className="rounded-xl px-3 py-2 bg-[#171717] text-white border border-[#2F2F2F] focus:ring-2 focus:ring-[#9E7FFF] transition"
        placeholder="Explication (optionnelle)"
        value={explication}
        onChange={e => setExplication(e.target.value)}
        rows={2}
        aria-label="Explication"
      />
      {error && (
        <div className="text-[#f59e0b] bg-[#f59e0b]/10 rounded-xl px-3 py-2">{error}</div>
      )}
      <div className="flex gap-2 mt-2">
        <button
          type="submit"
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#10b981] hover:bg-[#9E7FFF] transition text-white font-semibold shadow"
        >
          <Plus className="w-4 h-4" />
          Ajouter
        </button>
        {onCancel && (
          <button
            type="button"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#262626] border border-[#2F2F2F] hover:bg-[#171717] transition text-white font-semibold"
            onClick={onCancel}
          >
            <X className="w-4 h-4" />
            Annuler
          </button>
        )}
      </div>
    </form>
  )
}
