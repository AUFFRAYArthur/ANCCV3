import { useRef, useState } from "react"
import { Import, AlertTriangle, Info } from "lucide-react"

export function ImportScreen({ onImport, error }: {
  onImport: (data: string) => void
  error?: string
}) {
  const fileInput = useRef<HTMLInputElement>(null)
  const [dragActive, setDragActive] = useState(false)

  return (
    <section className="flex flex-col items-center justify-center h-full py-12">
      <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-xl w-full flex flex-col items-center gap-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <Import className="w-8 h-8 text-[#9E7FFF]" />
          <h2 className="text-2xl font-bold text-[#171717]">Importer une balance générale</h2>
        </div>
        <div className="w-full">
          <div className="flex items-start gap-2 bg-[#38bdf8]/10 border-l-4 border-[#38bdf8] rounded-xl px-4 py-3 mb-2">
            <Info className="w-5 h-5 text-[#38bdf8] mt-0.5" />
            <div>
              <p className="text-[#171717] font-semibold mb-1">
                <strong>Format strictement attendu du fichier CSV&nbsp;:</strong>
              </p>
              <ul className="list-disc pl-5 text-[#262626] text-sm mb-1">
                <li>
                  <strong>L’en-tête des colonnes doit être présent et identique à&nbsp;:</strong>
                  <span className="font-mono text-[#9E7FFF] ml-1">COMPTE;LIBELLE;DEBIT;CREDIT;ANNEE</span>
                </li>
                <li>
                  <strong>Le séparateur doit être le point-virgule</strong> (<span className="font-mono">;</span>).
                </li>
                <li>
                  <strong>Chaque ligne correspond à un poste du bilan</strong> (aucune colonne ou ligne supplémentaire).
                </li>
                <li>
                  Les montants peuvent utiliser la virgule ou le point comme séparateur décimal.
                </li>
                <li>
                  <strong>Exemple de contenu&nbsp;:</strong>
                  <pre className="bg-[#f472b6]/10 rounded-lg p-2 mt-1 text-xs text-[#171717] overflow-x-auto">
COMPTE;LIBELLE;DEBIT;CREDIT;ANNEE
101300;Capital social;0;60000;2024
106180;Réserves légales;0;6000;2024
164000;Emprunt bq.;0;13891,21;2024
215400;Matériel de bureau;25419,43;0;2024
401100;Achats mat.;68721,58;0;2024
512000;C.C.P.;72053,52;0;2024
                  </pre>
                </li>
              </ul>
              <p className="text-[#A3A3A3] text-xs">
                <strong>Important&nbsp;:</strong> L’en-tête doit être conservé et l’ordre des colonnes respecté pour que l’import fonctionne.
              </p>
            </div>
          </div>
        </div>
        <div
          className={`w-full border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center transition
            ${dragActive ? "border-[#9E7FFF] bg-[#f472b6]/10" : "border-[#A3A3A3] bg-gray-50"}
          `}
          onDragOver={e => { e.preventDefault(); setDragActive(true) }}
          onDragLeave={e => { e.preventDefault(); setDragActive(false) }}
          onDrop={e => {
            e.preventDefault()
            setDragActive(false)
            const file = e.dataTransfer.files[0]
            if (file) {
              const reader = new FileReader()
              reader.onload = e => onImport(e.target?.result as string)
              reader.readAsText(file)
            }
          }}
          onClick={() => fileInput.current?.click()}
          tabIndex={0}
          role="button"
          aria-label="Importer un fichier CSV"
        >
          <input
            ref={fileInput}
            type="file"
            accept=".csv"
            className="hidden"
            onChange={e => {
              const file = e.target.files?.[0]
              if (file) {
                const reader = new FileReader()
                reader.onload = e => onImport(e.target?.result as string)
                reader.readAsText(file)
              }
            }}
          />
          <span className="text-[#9E7FFF] font-bold text-lg mb-2">Glissez-déposez votre fichier ici</span>
          <span className="text-[#A3A3A3] text-sm">ou cliquez pour sélectionner un fichier</span>
        </div>
        {error && (
          <div className="flex items-center gap-2 text-[#f59e0b] bg-[#f59e0b]/10 rounded-xl px-4 py-2 mt-2">
            <AlertTriangle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        )}
      </div>
    </section>
  )
}
