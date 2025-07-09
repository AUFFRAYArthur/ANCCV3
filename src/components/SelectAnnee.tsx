import React from "react"

export function SelectAnnee({
  annees,
  selected,
  onChange,
}: {
  annees: string[]
  selected: string
  onChange: (annee: string) => void
}) {
  return (
    <div className="flex items-center gap-2 mb-6 justify-center">
      <label htmlFor="select-annee" className="text-white font-medium">
        Exercice :
      </label>
      <select
        id="select-annee"
        className="rounded-xl px-4 py-2 bg-[#262626] text-white border border-[#2F2F2F] focus:ring-2 focus:ring-[#9E7FFF] transition"
        value={selected}
        onChange={e => onChange(e.target.value)}
      >
        {annees.map(annee => (
          <option key={annee} value={annee}>
            {annee}
          </option>
        ))}
      </select>
    </div>
  )
}
