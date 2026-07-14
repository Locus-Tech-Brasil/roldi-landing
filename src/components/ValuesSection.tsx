import {
  Shield,
  Heart,
  Award,
  Lightbulb,
  Handshake,
  Zap,
} from "lucide-react";

const values = [
  {
    icon: Shield,
    title: "Confiança",
    description: "Relações construídas com transparência e integridade em cada interação.",
  },
  {
    icon: Heart,
    title: "Empatia",
    description: "Entendemos suas necessidades reais e cuidamos de cada detalhe com atenção.",
  },
  {
    icon: Award,
    title: "Excelência",
    description: "Buscamos sempre as melhores soluções do mercado para nossos clientes.",
  },
  {
    icon: Lightbulb,
    title: "Simplicidade",
    description: "Descomplicamos o seguro para que você entenda cada etapa do processo.",
  },
  {
    icon: Handshake,
    title: "Compromisso",
    description: "Estamos ao seu lado do início ao fim, especialmente quando você mais precisa.",
  },
  {
    icon: Zap,
    title: "Inovação",
    description: "Tecnologia e agilidade para oferecer a melhor experiência em proteção.",
  },
];

const ValuesSection = () => {
  return (
    <section id="quem-somos" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        {/* Mission */}
        <div className="text-center mb-16 animate-on-scroll">
          <p className="text-gold font-semibold text-sm uppercase tracking-widest mb-3">
            Quem Somos
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Nossa <span className="text-gold">missão</span>
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Descomplicar o seguro com transparência e proximidade, protegendo o
            que realmente importa para você e sua família.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {values.map((value, index) => (
            <div
              key={value.title}
              className="animate-on-scroll group text-center p-8 rounded-lg bg-card border border-border hover:border-gold/40 hover:shadow-lg hover:shadow-gold/5 transition-all duration-300"
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <div className="w-14 h-14 rounded-full bg-primary mx-auto flex items-center justify-center mb-5 group-hover:bg-gold transition-colors duration-300">
                <value.icon className="h-7 w-7 text-primary-foreground" />
              </div>
              <h3 className="font-display text-xl font-semibold text-card-foreground mb-2">
                {value.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;
