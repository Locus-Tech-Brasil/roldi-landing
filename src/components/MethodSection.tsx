import { Search, Target, Rocket, RefreshCw } from "lucide-react";

const steps = [
  {
    icon: Search,
    number: "01",
    title: "Diagnóstico",
    description: "Análise completa do seu patrimônio, riscos e necessidades de proteção familiar e empresarial.",
  },
  {
    icon: Target,
    number: "02",
    title: "Estratégia",
    description: "Plano personalizado de proteção patrimonial com as melhores soluções do mercado segurador.",
  },
  {
    icon: Rocket,
    number: "03",
    title: "Implementação",
    description: "Ativação das soluções de seguros e instrumentos de proteção com acompanhamento dedicado.",
  },
  {
    icon: RefreshCw,
    number: "04",
    title: "Acompanhamento",
    description: "Revisão periódica da estratégia para adaptar a proteção às mudanças da sua vida e patrimônio.",
  },
];

const MethodSection = () => {
  return (
    <section className="py-20 md:py-28 bg-primary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16 animate-on-scroll">
          <p className="text-gold font-semibold text-sm uppercase tracking-widest mb-3">
            O Método
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground">
            Como protegemos seu <span className="text-gold">legado</span>
          </h2>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2" />

          <div className="space-y-12 md:space-y-0">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={step.number}
                  className="animate-on-scroll md:grid md:grid-cols-2 md:gap-12 md:py-8 relative"
                >
                  {/* Dot on line */}
                  <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-gold items-center justify-center z-10">
                    <span className="font-display text-sm font-bold text-gold-foreground">
                      {step.number}
                    </span>
                  </div>

                  {/* Content */}
                  <div
                    className={`${
                      isEven ? "md:text-right md:pr-16" : "md:col-start-2 md:pl-16"
                    }`}
                  >
                    <div className="flex items-center gap-4 mb-3 md:hidden">
                      <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center shrink-0">
                        <span className="font-display text-xs font-bold text-gold-foreground">
                          {step.number}
                        </span>
                      </div>
                      <h3 className="font-display text-xl font-semibold text-primary-foreground">
                        {step.title}
                      </h3>
                    </div>

                    <div className={`${isEven ? "" : ""}`}>
                      <div className={`hidden md:flex items-center gap-3 mb-3 ${isEven ? "justify-end" : ""}`}>
                        <step.icon className={`h-6 w-6 text-gold ${isEven ? "order-2" : ""}`} />
                        <h3 className="font-display text-2xl font-semibold text-primary-foreground">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-primary-foreground/70 leading-relaxed ml-14 md:ml-0">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Empty col for alignment */}
                  {isEven && <div className="hidden md:block" />}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MethodSection;
