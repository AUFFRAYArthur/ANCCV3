import React, { useState } from "react"
import { Header } from "./components/Header"
import { Sidebar } from "./components/Sidebar"
import { HelpModal } from "./components/HelpModal"
import { ImportScreen } from "./components/ImportScreen"
import { AppProvider, useApp } from "./context/AppContext"
import { parseBalance } from "./utils/parseBalance"
import { BilanTable } from "./components/BilanTable"
import { SelectAnnee } from "./components/SelectAnnee"
import { RetraitementsScreen } from "./components/RetraitementsScreen"
import type { Retraitement } from "./types/retraitement"

function MainApp() {
  const { step, setStep, importedData, setImportedData, reset } = useApp()
  const [helpOpen, setHelpOpen] = useState(false)
  const [importError, setImportError] = useState<string | undefined>()
  const [bilan, setBilan] = useState<ReturnType<typeof parseBalance> | null>(null)
  const [annee, setAnnee] = useState<string | null>(null)
  const [retraitements, setRetraitements] = useState<Retraitement[]>([])

  function handleImport(data: string) {
    try {
      if (!data.includes("COMPTE;LIBELLE;DEBIT;CREDIT;ANNEE")) {
        setImportError("Fichier non conforme : colonnes attendues manquantes.")
        return
      }
      const parsed = parseBalance(data)
      const annees = Object.keys(parsed)
      if (annees.length === 0) throw new Error("Aucune donnée trouvée.")
      setBilan(parsed)
      setAnnee(annees[0])
      setImportError(undefined)
      setImportedData(data)
      setStep("bilan")
    } catch (e: any) {
      setImportError(e.message)
    }
  }

  function handleReset() {
    setBilan(null)
    setAnnee(null)
    setRetraitements([])
    reset()
  }

  function handleValiderRetraitements(rs: Retraitement[]) {
    setRetraitements(rs)
    setStep("resultat")
  }

  return (
    <div className="flex min-h-screen bg-[#171717]">
      <Sidebar current={step} onNavigate={setStep} onReset={handleReset} />
      <main className="flex-1 flex flex-col min-h-screen">
        <Header />
        <div className="flex-1 flex flex-col px-8 py-8">
          {step === "import" && (
            <ImportScreen onImport={handleImport} error={importError} />
          )}
          {step === "bilan" && bilan && annee && (
            <div className="flex flex-col items-center justify-center h-full">
              <SelectAnnee
                annees={Object.keys(bilan)}
                selected={annee}
                onChange={setAnnee}
              />
              <BilanTable lignes={bilan[annee]} annee={annee} />
              <button
                className="mt-8 px-6 py-3 rounded-xl bg-[#38bdf8] hover:bg-[#9E7FFF] transition text-white font-semibold shadow-lg"
                onClick={() => setStep("retraitements")}
              >
                Continuer vers les retraitements
              </button>
            </div>
          )}
          {step === "bilan" && (!bilan || !annee) && (
            <div className="flex flex-col items-center justify-center h-full">
              <h2 className="text-3xl font-bold text-white mb-4">Bilan importé</h2>
              <p className="text-lg text-[#A3A3A3] mb-8">
                (Aucune donnée à afficher)
              </p>
            </div>
          )}
          {step === "retraitements" && bilan && annee && (
            <RetraitementsScreen
              lignes={bilan[annee]}
              annee={annee}
              onValider={handleValiderRetraitements}
            />
          )}
          {step === "resultat" && bilan && annee && (
            <div className="flex flex-col items-center justify-center h-full">
              <h2 className="text-3xl font-bold text-white mb-4">Résultat ANCC</h2>
              <p className="text-lg text-[#A3A3A3] mb-8">
                (Calcul et affichage du résultat à venir)
              </p>
              <button
                className="px-6 py-3 rounded-xl bg-[#38bdf8] hover:bg-[#9E7FFF] transition text-white font-semibold shadow-lg"
                onClick={() => setStep("rapport")}
              >
                Générer le rapport
              </button>
            </div>
          )}
          {step === "rapport" && (
            <div className="flex flex-col items-center justify-center h-full">
              <h2 className="text-3xl font-bold text-white mb-4">Rapport d'évaluation</h2>
              <p className="text-lg text-[#A3A3A3] mb-8">
                (Génération du rapport professionnel à venir)
              </p>
              <button
                className="px-6 py-3 rounded-xl bg-[#38bdf8] hover:bg-[#9E7FFF] transition text-white font-semibold shadow-lg"
                onClick={() => setStep("import")}
              >
                Nouvelle évaluation
              </button>
            </div>
          )}
        </div>
        <HelpModal open={helpOpen} onClose={() => setHelpOpen(false)} />
      </main>
      {/* Floating help button */}
      <button
        className="fixed bottom-8 right-8 z-50 bg-[#9E7FFF] hover:bg-[#f472b6] text-white rounded-full p-4 shadow-2xl transition focus:outline-none focus:ring-2 focus:ring-[#38bdf8] animate-bounce"
        aria-label="Aide et documentation"
        onClick={() => setHelpOpen(true)}
        style={{ boxShadow: "0 8px 32px 0 rgba(158,127,255,0.25)" }}
      >
        <span className="sr-only">Aide</span>
        <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M9 18h6M10 14c0-1.333 2-2 2-4a2 2 0 1 0-4 0M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"/>
        </svg>
      </button>
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  )
}
