import { Reveal } from "@/components/Reveal";
import type { Product } from "@/lib/use-products";

type CollectionFlavoursSectionProps = {
  title: string;
  subtitle: string;
  flavours: Product[];
};

export function CollectionFlavoursSection({ title, subtitle, flavours }: CollectionFlavoursSectionProps) {
  if (flavours.length === 0) return null;

  return (
    <section className="section">
      <div className="container-prose">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-[color:var(--gold)]">Flavours</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">{title}</h2>
          <p className="mt-4 text-muted-foreground">{subtitle}</p>
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {flavours.map((f, i) => (
            <Reveal key={f.slug} delay={i * 60}>
              <article className="card-warm h-full overflow-hidden">
                {f.image && (
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={f.image} alt={f.name} loading="lazy" className="h-full w-full object-cover" />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-display text-xl">{f.name}</h3>
                    {f.status === "coming_soon" && (
                      <span className="rounded-full border border-border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                        Coming Soon
                      </span>
                    )}
                  </div>
                  {f.tagline && <p className="mt-2 text-sm text-muted-foreground">{f.tagline}</p>}
                  {f.description && <p className="mt-2 text-sm text-muted-foreground">{f.description}</p>}
                  {f.notes.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {f.notes.map((note) => (
                        <span key={note} className="rounded-full border border-border px-2.5 py-0.5 text-[11px]">
                          {note}
                        </span>
                      ))}
                    </div>
                  )}
                  {f.price > 0 && (
                    <p className="mt-4 font-display text-lg text-[color:var(--chocolate-dark)]">
                      ₹{f.price}
                      {f.status === "live" && <span className="ml-2 text-xs uppercase tracking-[0.16em] text-[color:var(--gold)]">Available</span>}
                    </p>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
