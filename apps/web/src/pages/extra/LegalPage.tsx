import { legalSections } from "../../data/siteContent";

export default function LegalPage() {
  return (
    <div className="space-y-6">
      <div className="glass-panel p-6">
        <p className="section-title">Legal</p>
        <h1 className="text-3xl font-semibold text-white">Términos y privacidad</h1>
        <p className="mt-2 text-sm text-slate-300">
          Documentamos cómo tratamos tus datos, cómo funcionan los acuerdos y cómo puedes ejercer derechos.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {legalSections.map((section) => (
          <div key={section.title} className="glass-panel p-5 space-y-2">
            <h2 className="text-lg font-semibold text-white">{section.title}</h2>
            <p className="text-sm text-slate-300">{section.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
