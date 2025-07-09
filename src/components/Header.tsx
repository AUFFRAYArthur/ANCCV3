import { Building2, Lightbulb } from "lucide-react"

export function Header() {
  return (
    <header className="relative z-10 bg-gradient-to-br from-[#9E7FFF] via-[#38bdf8] to-[#171717] shadow-xl rounded-b-3xl px-10 py-8 flex items-center gap-6">
      <div className="flex items-center gap-4">
        <span className="bg-white/10 rounded-full p-3 shadow-lg">
          <Building2 className="w-10 h-10 text-white drop-shadow" />
        </span>
        <div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight drop-shadow-lg">
            Évaluation méthode ANCC
          </h1>
          <p className="text-lg text-white/80 font-medium mt-1">
            Approche patrimoniale pour experts-comptables
          </p>
        </div>
      </div>
      <div className="ml-auto flex items-center gap-4">
        <button
          className="group relative flex items-center gap-2 px-4 py-2 rounded-xl bg-[#f472b6] hover:bg-[#9E7FFF] transition text-white font-semibold shadow-lg focus:outline-none focus:ring-2 focus:ring-[#38bdf8]"
          aria-label="Aide et documentation"
          id="help-btn"
        >
          <Lightbulb className="w-6 h-6" />
          <span className="hidden md:inline">Aide</span>
        </button>
      </div>
    </header>
  )
}
