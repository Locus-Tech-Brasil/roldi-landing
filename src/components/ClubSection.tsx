import { Button } from "@/components/ui/button";
import { Gift, Star, Sparkles } from "lucide-react";

const ClubSection = () => {
  return (
    <section id="vantagens" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="animate-on-scroll relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary to-navy-light border border-white/10 p-8 md:p-14">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gold/5 rounded-full translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Text */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-5 w-5 text-gold" />
                <p className="text-gold font-semibold text-sm uppercase tracking-widest">
                  Exclusivo
                </p>
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                Clube de Vantagens{" "}
                <span className="text-gold">ROLDI</span>
              </h2>
              <p className="text-primary-foreground/70 text-lg leading-relaxed mb-6">
                Benefícios exclusivos para quem é ROLDI. Descontos e vantagens
                em nossa rede de parceiros para você aproveitar o melhor da vida.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                {[
                  "Descontos exclusivos",
                  "Rede de parceiros",
                  "Acesso imediato",
                ].map((benefit) => (
                  <div
                    key={benefit}
                    className="flex items-center gap-2 text-primary-foreground/80 text-sm"
                  >
                    <Star className="h-4 w-4 text-gold shrink-0" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>

              <Button
                asChild
                size="lg"
                className="bg-gold hover:bg-gold-light text-gold-foreground font-semibold text-base px-8 py-6 rounded-md shadow-lg shadow-gold/20 hover:shadow-gold/40 transition-all duration-300"
              >
                <a
                  href="https://rede.clubedobeneficio.com.br/pingseguro/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Gift className="mr-2 h-5 w-5" />
                  Acessar Clube de Vantagens
                </a>
              </Button>
            </div>

            {/* Illustration placeholder */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="relative w-full max-w-sm aspect-square rounded-2xl bg-gradient-to-br from-gold/10 to-gold/5 border border-gold/20 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gold/20 flex items-center justify-center">
                    <Gift className="h-12 w-12 text-gold" />
                  </div>
                  <p className="font-display text-lg text-primary-foreground/60 font-medium">
                    Clube de Vantagens
                  </p>
                  <p className="text-sm text-primary-foreground/40 mt-1">
                    Benefícios exclusivos ROLDI
                  </p>
                </div>
                {/* Floating badges */}
                <div className="absolute -top-3 -right-3 bg-gold text-gold-foreground text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                  GRÁTIS
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClubSection;
