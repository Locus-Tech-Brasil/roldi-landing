import { MapPin, Mail, Phone } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const contactInfo = [
  {
    icon: MapPin,
    title: "Endereço",
    lines: ["Rua Afonso Pena, 564", "Florianópolis - SC"],
  },
  {
    icon: Mail,
    title: "E-mail",
    lines: ["contato@roldiseguros.com.br", "diego@roldiseguros.com.br"],
  },
  {
    icon: Phone,
    title: "Telefone / WhatsApp",
    lines: ["(48) 99106-1107"],
  },
];

const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    need: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke("send-contact-email", {
        body: formData,
      });

      if (error) throw error;

      toast({
        title: "Mensagem enviada!",
        description: "Entraremos em contato em breve. Obrigado pelo seu interesse.",
      });
      setFormData({ name: "", email: "", phone: "", need: "" });
    } catch (error: any) {
      console.error("Erro ao enviar formulário:", error);
      toast({
        title: "Erro ao enviar",
        description: "Tente novamente ou entre em contato pelo WhatsApp.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contato" className="py-20 md:py-28 bg-primary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16 animate-on-scroll">
          <p className="text-gold font-semibold text-sm uppercase tracking-widest mb-3">
            Contato
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground">
            Fale com a <span className="text-gold">ROLDI</span>
          </h2>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 animate-on-scroll">
          {contactInfo.map((info) => (
            <div
              key={info.title}
              className="text-center p-6 rounded-lg bg-white/5 border border-white/10"
            >
              <div className="w-12 h-12 rounded-full bg-gold/20 mx-auto flex items-center justify-center mb-4">
                <info.icon className="h-6 w-6 text-gold" />
              </div>
              <h3 className="font-display text-lg font-semibold text-primary-foreground mb-2">
                {info.title}
              </h3>
              {info.lines.map((line) => (
                <p key={line} className="text-primary-foreground/60 text-sm">
                  {line}
                </p>
              ))}
            </div>
          ))}
        </div>


        {/* Form */}
        <div className="max-w-2xl mx-auto animate-on-scroll">
          <form
            onSubmit={handleSubmit}
            className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 p-8 space-y-5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="text-sm font-medium text-primary-foreground/80 mb-2 block">
                  Nome completo
                </label>
                <Input
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Seu nome"
                  className="bg-white/10 border-white/20 text-primary-foreground placeholder:text-primary-foreground/40 focus:border-gold"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-primary-foreground/80 mb-2 block">
                  E-mail
                </label>
                <Input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="seu@email.com"
                  className="bg-white/10 border-white/20 text-primary-foreground placeholder:text-primary-foreground/40 focus:border-gold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="text-sm font-medium text-primary-foreground/80 mb-2 block">
                  Telefone
                </label>
                <Input
                  required
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="(48) 99999-9999"
                  className="bg-white/10 border-white/20 text-primary-foreground placeholder:text-primary-foreground/40 focus:border-gold"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-primary-foreground/80 mb-2 block">
                  Necessidade principal
                </label>
                <Select
                  value={formData.need}
                  onValueChange={(value) =>
                    setFormData({ ...formData, need: value })
                  }
                >
                  <SelectTrigger className="bg-white/10 border-white/20 text-primary-foreground focus:border-gold">
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="residencia">Seguro Residência</SelectItem>
                    <SelectItem value="auto">Seguro Automóvel</SelectItem>
                    <SelectItem value="empresarial">Seguro Empresarial</SelectItem>
                    <SelectItem value="vida">Seguro de Vida</SelectItem>
                    <SelectItem value="condominio">Seguro Condomínio</SelectItem>
                    <SelectItem value="consorcio">Consórcio</SelectItem>
                    <SelectItem value="outro">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gold hover:bg-gold-light text-gold-foreground font-semibold py-6 text-base rounded-md shadow-lg shadow-gold/20"
            >
              {isSubmitting ? (
                "Enviando..."
              ) : (
                <>
                  Enviar Mensagem
                  <Send className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
