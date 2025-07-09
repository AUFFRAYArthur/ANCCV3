import React, { useState } from "react"
import { RetraitementForm } from "./RetraitementForm"
import { RetraitementsTable } from "./RetraitementsTable"
import { BilanCorrigeTable } from "./BilanCorrigeTable"
import type { LigneBilan } from "../utils/parseBalance"
import type { Retraitement } from "../types/retraitement"
import { v4 as uuidv4 } from "uuid"

export function RetraitementsScreen({
  lignes,
  annee,
  onValider,
}: {
  lignes: LigneBilan[]
  annee: string
  onValider: (retraitements: Retraitement[]) => void
}) {
  const [retraitements, setRetraitements] = useState<Retraitement[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formInitial, setFormInitial] = useState<any>(null)

  function handleAdd(r: Omit<Retraitement, "id">) {
    setRetraitements(rs => [...rs, { ...r, id: uuidv4() }])
    setEditingId(null)
    setFormInitial(null)
  }

  function handleEdit(id: string) {
    const r = retraitements.find(r => r.id === id)
    if (r) {
      setEditingId(id)
      setFormInitial(r)
    }
  }

  function handleUpdate(r: Omit<Retraitement, "id">) {
    setRetraitements(rs =>
      rs.map(rt => (rt.id === editingId ? { ...rt, ...r } : rt))
    )
    setEditingId(null)
    setFormInitial(null)
  }

  function handleDelete(id: string) {
    setRetraitements(rs => rs.filter(r => r.id !== id))
  }

  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <h2 className="text-3xl font-bold text-white mb-4">Retraitements ANCC</h2>
      <p className="text-lg text-[#A3A3A3] mb-8 text-center max-w-2xl">
        Ajoutez les retraitements nécessaires pour corriger le bilan : plus/moins-values, provisions, actifs fictifs, dettes à corriger, etc.<br />
        Chaque retraitement impacte le poste choisi et le calcul de l’Actif Net Comptable Corrigé (ANCC) en temps réel.
      </p>
      <div className="w-full max-w-3xl flex flex-col gap-6">
        {editingId ? (
          <RetraitementForm
            onSubmit={handleUpdate}
            onCancel={() => { setEditingId(null); setFormInitial(null) }}
            initial={formInitial}
          />
        ) : (
          <RetraitementForm onSubmit={handleAdd} />
        )}
        <RetraitementsTable
          retraitements={retraitements}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
        <BilanCorrigeTable
          lignes={lignes}
          retraitements={retraitements}
          annee={annee}
        />
        <button
          className="mt-8 px-6 py-3 rounded-xl bg-[#38bdf8] hover:bg-[#9E7FFF] transition text-white font-semibold shadow-lg"
          onClick={() => onValider(retraitements)}
        >
          Voir le résultat ANCC
        </button>
      </div>
    </div>
  )
}
