import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-navy-light" />
      {/* Subtle radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(40_50%_56%_/_0.08)_0%,_transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_hsl(0_0%_10%_/_0.5)_0%,_transparent_60%)]" />

      <div className="relative z-10 container mx-auto px-4 md:px-6 pt-20 pb-16 text-center">
        <div className="max-w-3xl mx-auto">
          <p
            className="text-gold font-semibold text-sm uppercase tracking-widest mb-4 animate-fade-in-up"
          >
            ROLDI Corretora de Seguros
          </p>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-tight mb-6 animate-fade-in-up">
            Protegendo o que{" "}
            <span className="text-gold">realmente importa.</span>
          </h1>

          <p
            className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-10 font-light leading-relaxed animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            Descomplicamos o seguro com transparência, proximidade e soluções
            sob medida para proteger seu patrimônio, sua família e sua empresa.
          </p>

          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            <Button
              asChild
              size="lg"
              className="bg-gold hover:bg-gold-light text-gold-foreground font-semibold text-lg px-8 py-6 rounded-md shadow-lg shadow-gold/20 hover:shadow-gold/40 transition-all duration-300"
            >
              <a href="#contato">
                Falar com Especialista
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-gold text-gold hover:bg-gold/10 font-semibold text-lg px-8 py-6 rounded-md"
            >
              <a href="#produtos">Nossos Produtos</a>
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
