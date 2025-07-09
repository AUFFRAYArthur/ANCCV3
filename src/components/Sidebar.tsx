import { FileBarChart2, Import, Settings, FileText, RefreshCcw } from "lucide-react"

const nav = [
  { label: "Importer", icon: Import, id: "import" },
  { label: "Bilan", icon: FileBarChart2, id: "bilan" },
  { label: "Retraitements", icon: Settings, id: "retraitements" },
  { label: "Résultat", icon: FileText, id: "resultat" },
  { label: "Rapport", icon: FileText, id: "rapport" },
]

export function Sidebar({ current, onNavigate, onReset }: {
  current: string
  onNavigate: (id: string) => void
  onReset: () => void
}) {
  return (
    <aside className="bg-[#262626] text-white w-64 min-h-screen flex flex-col py-8 px-4 shadow-2xl rounded-r-3xl">
      <nav className="flex-1">
        <ul className="space-y-2">
          {nav.map(({ label, icon: Icon, id }) => (
            <li key={id}>
              <button
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition font-semibold text-lg
                  ${current === id
                    ? "bg-[#9E7FFF] text-white shadow-lg"
                    : "hover:bg-[#171717] text-[#A3A3A3] hover:text-white"
                  }`}
                onClick={() => onNavigate(id)}
                aria-current={current === id ? "page" : undefined}
              >
                <Icon className="w-6 h-6" />
                {label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <button
        className="flex items-center gap-2 px-4 py-2 mt-8 rounded-xl bg-[#f472b6] hover:bg-[#9E7FFF] transition text-white font-semibold shadow-lg focus:outline-none focus:ring-2 focus:ring-[#38bdf8]"
        onClick={onReset}
        aria-label="Réinitialiser l'application"
      >
        <RefreshCcw className="w-5 h-5" />
        Réinitialiser
      </button>
    </aside>
  )
}
