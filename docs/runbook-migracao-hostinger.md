# Runbook — Cancelar o Web Hosting da Hostinger (sem derrubar nada)

> **Interno (Locus Tech).** Não é material do cliente. Objetivo: cortar o **Premium Web Hosting**
> da Hostinger (~US$ 131,88/ano ≈ **R$ 700/ano**) mantendo site, e-mail, domínio e a entrega dos
> leads funcionando. **Prazo: executar antes de 24/08/2026** (data de renovação do hosting e de
> expiração do domínio).

## Estado atual (fatos verificados em 2026-07-15)

- **Site:** Vercel (deploy por `git push` neste repo). `www.roldiseguros.com.br` → 200 `server: Vercel`.
- **Domínio:** `roldiseguros.com.br` registrado no **Registro.br**, titular **Diego Augusto Duarte**,
  **expira 2026-08-24**. (Foi registrado junto com o plano Hostinger — mesma data.)
- **DNS:** nameservers `ns1/ns2.dns-parking.com` (**Hostinger**).
- **E-mail:** Hostinger **Business Email (Starter)**, ~US$ 14,16/ano ≈ R$ 75. Caixas `contato@` e `diego@`.
- **Assinaturas Hostinger:** Premium Web Hosting (renova 24/08) + Business Email (renova 26/08).

### Zona DNS atual — replicar EXATAMENTE se mover o DNS

| Tipo | Nome | Valor | Papel |
|------|------|-------|-------|
| A | `@` | `216.198.79.1` | site (Vercel) |
| CNAME | `www` | alvo Vercel (ver painel Vercel; hoje `…vercel-dns-017.com`) | site (Vercel) |
| MX | `@` | `mx1.hostinger.com` (prio 5) | **e-mail** |
| MX | `@` | `mx2.hostinger.com` (prio 10) | **e-mail** |
| TXT | `@` | `v=spf1 include:_spf.mail.hostinger.com ~all` | SPF do e-mail |
| CNAME | `hostingermail-a._domainkey` | `hostingermail-a.dkim.mail.hostinger.com` | DKIM Hostinger |
| CNAME | `hostingermail-b._domainkey` | `hostingermail-b.dkim.mail.hostinger.com` | DKIM Hostinger |
| CNAME | `hostingermail-c._domainkey` | `hostingermail-c.dkim.mail.hostinger.com` | DKIM Hostinger |
| TXT | `resend._domainkey` | `p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCmawBTp6KaDa5aEWL5fNziCPlCNJXtdOwZHCUzi1iGcNLZRDT9eSuKRdUxHDo8YdB0sYSOpssfqSVpgxrVZ7gu14/ffhT7RaPRBAFl/Xx5M24F2oAhZT2hOWUMJjoqQhDmrOyiXePT+TMh/aGu1rz2gEJI/UUdBKsmFgGeEDHb+QIDAQAB` | DKIM do **Resend** (form de contato) |
| TXT | `_dmarc` | `v=DMARC1; p=none` | DMARC |

> ⚠️ Sem os MX + SPF + DKIM (Hostinger **e** Resend), o e-mail e os leads do formulário quebram.
> Antes de mexer, **tire print da zona atual** no painel Hostinger (rollback).

## Confirmar ANTES de cancelar (painel/suporte Hostinger)

1. **DNS sobrevive?** Cancelando só o *Web Hosting* (mantendo o *Business Email*), a zona DNS do
   domínio continua ativa e editável? → decide Cenário A vs B abaixo.
2. **Domínio renova separado?** A renovação do `.com.br` (Registro.br) é independente do hosting?
   O Diego é o titular no Registro.br, então **pode renovar direto lá** (~R$ 40/ano) — garantir isso.

## Cenário A — Hostinger mantém o DNS com o plano de e-mail (mais simples)

1. Confirmar (item 1 acima).
2. **Garantir a renovação do domínio** no Registro.br: login do Diego → ativar auto-renovação (~R$ 40/ano). Não deixar vencer em 24/08.
3. Desligar auto-renovação do **Premium Web Hosting** e cancelar (ou deixar expirar em 24/08).
4. Rodar o **checklist de verificação** (abaixo).

## Cenário B — o DNS sai junto com o hosting (mover o DNS antes)

1. Escolher DNS novo (grátis): **Cloudflare** (recomendado) ou o **DNS do Registro.br** (nativo p/ `.br`).
2. Recriar **todos** os registros da tabela acima no DNS novo.
3. Trocar os nameservers do domínio no **Registro.br** para os do DNS novo.
4. Aguardar propagação e validar (`dig NS/A/MX`, e-mail de teste) **antes** de cancelar.
5. Só então cancelar o Premium Web Hosting.

> **Atalho de menor risco:** se não quiser migrar DNS agora, o essencial é **só cancelar o Web
> Hosting** e manter e-mail + domínio. O e-mail custa ~R$ 75/ano — não vale o risco de migrar por isso.

## Checklist de verificação (pós-corte)

```bash
curl -sI https://www.roldiseguros.com.br | grep -iE 'HTTP|server'   # 200 + Vercel
curl -sI https://roldiseguros.com.br     | grep -i location          # 308 -> www
dig +short MX roldiseguros.com.br                                     # mx1/mx2.hostinger.com
dig +short A  roldiseguros.com.br                                     # 216.198.79.1
```

- [ ] Site abre no `www` (200, Vercel) e o `sem-www` redireciona (308).
- [ ] `dig MX` retorna os MX da Hostinger.
- [ ] E-mail de teste chega em `diego@` **e** `contato@`.
- [ ] Enviar o **formulário de contato do site** → o e-mail chega (fluxo Supabase → Resend).
- [ ] Favicon e prévia social (og-image) ok.
- [ ] Domínio com auto-renovação ativa no Registro.br.

## Notas

- **Deliverability:** o SPF só inclui a Hostinger; os e-mails do formulário saem pelo **Resend** e
  passam por **DKIM** (`resend._domainkey` já publicado) + DMARC `p=none`. Funciona, mas se quiser
  endurecer, dá pra adicionar `include:` do Resend no SPF e subir o DMARC para `quarantine`.
- **Economia:** cortar o Web Hosting = **≈ R$ 700/ano** (≈ R$ 3.500 em 5 anos). Fica só e-mail
  (~R$ 75) + domínio (~R$ 40).
- Material do cliente (valor/economia) está no doc de infra (Artifact) — este runbook é só operacional.
