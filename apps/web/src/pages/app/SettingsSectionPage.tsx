type SettingsSection = "profile" | "security" | "subscription";

const info: Record<SettingsSection, { title: string; detail: string }> = {
  profile: {
    title: "Perfil",
    detail: "Actualiza nombre, email y preferencias de notificación.",
  },
  security: {
    title: "Seguridad",
    detail: "Configura 2FA, contraseñas y sesiones activas.",
  },
  subscription: {
    title: "Suscripción",
    detail: "Controla tu plan, facturación y pagos automáticos.",
  },
};

type SettingsSectionPageProps = {
  section: SettingsSection;
};

export default function SettingsSectionPage({ section }: SettingsSectionPageProps) {
  const data = info[section];

  return (
    <div className="space-y-6">
      <div className="glass-panel p-6 space-y-2">
        <p className="section-title">Configuración</p>
        <h1 className="text-3xl font-semibold text-white">{data.title}</h1>
        <p className="text-sm text-slate-300">{data.detail}</p>
      </div>
      <div className="glass-panel p-6 text-sm text-slate-300">
        <p>Ajusta lo que necesites y guarda cambios para que la IA tenga el contexto correcto.</p>
      </div>
    </div>
  );
}
