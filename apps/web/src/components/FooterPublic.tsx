import { Link } from "react-router-dom";
import { Linkedin, Twitter, Youtube } from "lucide-react";

type FooterLink = {
  label: string;
  to: string;
};

const PRODUCT_LINKS: FooterLink[] = [
  { label: "Dashboard", to: "/features" },
  { label: "Presupuestos", to: "/features" },
  { label: "Transacciones", to: "/features" },
  { label: "Inteligencia IA", to: "/features" },
  { label: "Precios", to: "/pricing" },
];

const SUPPORT_LINKS: FooterLink[] = [
  { label: "Centro de ayuda", to: "/help" },
  { label: "Contacto", to: "/contact" },
  { label: "Estado del sistema", to: "/support" },
  { label: "Seguridad", to: "/support" },
];

const LEGAL_LINKS: FooterLink[] = [
  { label: "Privacidad", to: "/privacy" },
  { label: "Terminos", to: "/terms" },
  { label: "Cookies", to: "/terms" },
];

const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com", icon: Linkedin },
  { label: "X", href: "https://x.com", icon: Twitter },
  { label: "YouTube", href: "https://www.youtube.com", icon: Youtube },
];

export default function FooterPublic() {
  return (
    <footer className="border-t border-white/10 bg-slate-950/80 px-6 py-10 text-slate-300 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/80 light:border-slate-200 light:bg-white sm:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <section>
            <div className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-2.5 py-1.5 dark:border-white/10 dark:bg-white/5 light:border-slate-200 light:bg-white">
              <span className="rounded-md bg-gradient-to-br from-cyan-400 to-emerald-400 px-2 py-1 text-xs font-black tracking-wide text-slate-950">
                ZAI
              </span>
              <span className="text-sm font-semibold text-slate-100 dark:text-slate-100 light:text-slate-900">
                Inteligencia financiera
              </span>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-slate-400 dark:text-slate-400 light:text-slate-600">
              Plataforma de inteligencia financiera personal para decidir mejor cada mes.
            </p>

            <p className="mt-3 text-xs text-slate-500 dark:text-slate-500 light:text-slate-500">
              Datos cifrados · Alertas en tiempo real
            </p>
          </section>

          <FooterColumn title="Producto" links={PRODUCT_LINKS} />
          <FooterColumn title="Soporte" links={SUPPORT_LINKS} />

          <section>
            <h3 className="text-sm font-semibold text-slate-100 dark:text-slate-100 light:text-slate-900">Legal</h3>
            <div className="mt-3 space-y-2">
              {LEGAL_LINKS.map((link) => (
                <FooterInternalLink key={link.to + link.label} to={link.to} label={link.label} />
              ))}
            </div>

            <div className="mt-6">
              <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Redes</h4>
              <div className="mt-3 flex items-center gap-2">
                {SOCIAL_LINKS.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={social.label}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-300 transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-400/50 hover:text-cyan-200 dark:border-white/10 dark:bg-white/5 light:border-slate-200 light:bg-white light:text-slate-700"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          </section>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-white/10 pt-4 text-xs text-slate-500 dark:border-white/10 dark:text-slate-500 light:border-slate-200 light:text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} ZAI. Todos los derechos reservados.</p>
          <p>Construido para claridad financiera y decisiones con confianza.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <section>
      <h3 className="text-sm font-semibold text-slate-100 dark:text-slate-100 light:text-slate-900">{title}</h3>
      <div className="mt-3 space-y-2">
        {links.map((link) => (
          <FooterInternalLink key={link.to + link.label} to={link.to} label={link.label} />
        ))}
      </div>
    </section>
  );
}

function FooterInternalLink({ to, label }: { to: string; label: string }) {
  return (
    <Link
      to={to}
      className="block w-fit text-sm text-slate-400 transition-all duration-200 hover:translate-x-0.5 hover:text-cyan-200 dark:text-slate-400 light:text-slate-600 light:hover:text-cyan-700"
    >
      {label}
    </Link>
  );
}
