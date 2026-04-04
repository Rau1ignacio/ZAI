import { blogArticles } from "../../data/siteContent";

export default function BlogPage() {
  return (
    <div className="space-y-8">
      <div className="glass-panel p-6">
        <p className="section-title">Blog y contenido</p>
        <h1 className="text-3xl font-semibold text-white">Educación financiera para la nueva era</h1>
        <p className="mt-2 text-sm text-slate-300">
          Estrategias, casos reales y guías prácticas para que el conocimiento llegue con claridad.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {blogArticles.map((article) => (
          <article key={article.title} className="glass-panel p-5 space-y-3">
            <p className="text-xs uppercase tracking-[0.4em] text-slate-400">{article.category}</p>
            <h2 className="text-lg font-semibold text-white">{article.title}</h2>
            <p className="text-sm text-slate-300">{article.summary}</p>
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>{article.readingTime}</span>
              <span>{article.tag}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
