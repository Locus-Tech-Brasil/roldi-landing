# Runbook — Cancelar o Web Hosting da Hostinger (mantendo o e-mail)

> **Interno (Locus Tech).** Não é material do cliente. Objetivo: cancelar o **Premium Web Hosting**
> (~US$ 131,88/ano ≈ **R$ 700/ano**) mantendo site, **e-mail** e a entrega dos leads.
> **O e-mail FICA** — os logs mostram as caixas `diego@`/`contato@` sendo lidas via IMAP na
> Hostinger (caixas reais e ativas, não encaminhamento). **Prazo: antes de 24/08/2026.**

## Estado atual (verificado 2026-07-15)

- **Site:** Vercel (deploy por `git push`). `www.roldiseguros.com.br` → 200 `server: Vercel`.
- **Domínio:** `roldiseguros.com.br` no **Registro.br**, titular **Diego Augusto Duarte**, expira **2026-08-24**. Independente da Hostinger. ✅
- **DNS:** nameservers do domínio (no Registro.br) apontam para `ns1/ns2.dns-parking.com` = **Hostinger**. Registros editados **na Hostinger**.
- **E-mail:** **caixas reais** na Hostinger Business Email (`diego@`, `contato@`), acesso IMAP ativo. **Manter** (~US$ 14,16/ano ≈ R$ 75). É a assinatura *Business Email*, **separada** do Web Hosting.
- **Envio (formulário):** via **Resend** (domínio verificado; DKIM `resend._domainkey` publicado). Não depende da Hostinger.

### Zona DNS atual — replicar se o DNS precisar sair da Hostinger

| Tipo | Nome | Valor | Papel |
|------|------|-------|-------|
| A | `@` | `216.198.79.1` | site (Vercel) |
| CNAME | `www` | alvo Vercel (ver painel Vercel; hoje `…vercel-dns-017.com`) | site (Vercel) |
| MX | `@` | `mx1.hostinger.com` (5) · `mx2.hostinger.com` (10) | **e-mail (fica)** |
| TXT | `@` | `v=spf1 include:_spf.mail.hostinger.com ~all` | SPF do e-mail |
| CNAME | `hostingermail-a._domainkey` | `hostingermail-a.dkim.mail.hostinger.com` | DKIM Hostinger |
| CNAME | `hostingermail-b._domainkey` | `hostingermail-b.dkim.mail.hostinger.com` | DKIM Hostinger |
| CNAME | `hostingermail-c._domainkey` | `hostingermail-c.dkim.mail.hostinger.com` | DKIM Hostinger |
| TXT | `resend._domainkey` | `p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCmawBTp6KaDa5aEWL5fNziCPlCNJXtdOwZHCUzi1iGcNLZRDT9eSuKRdUxHDo8YdB0sYSOpssfqSVpgxrVZ7gu14/ffhT7RaPRBAFl/Xx5M24F2oAhZT2hOWUMJjoqQhDmrOyiXePT+TMh/aGu1rz2gEJI/UUdBKsmFgGeEDHb+QIDAQAB` | DKIM Resend (envio) |
| TXT | `_dmarc` | `v=DMARC1; p=none` | DMARC |

> ⚠️ Como o e-mail FICA na Hostinger, se o DNS sair, os **MX + SPF + DKIM da Hostinger** têm que ir
> junto (senão o e-mail quebra). **Tire print da zona/forwarders atuais antes de mexer.**

## Confirmar ANTES de cancelar (painel/suporte Hostinger)

1. **O DNS sobrevive?** Mantendo o *Business Email* e cancelando só o *Web Hosting*, a zona DNS
   continua ativa e editável? → decide Cenário A vs B.
2. **Domínio renova separado?** A renovação do `.com.br` (Registro.br) é independente do hosting?
   O Diego é titular no Registro.br, então **pode renovar direto lá** (~R$ 40/ano). Garantir.

## Cenário A — a Hostinger mantém o DNS com o plano de e-mail (simples)

1. Confirmar item 1 acima.
2. **Renovar o domínio** no Registro.br (auto-renovação, ~R$ 40/ano). Não deixar vencer em 24/08.
3. Cancelar / desligar auto-renovação **só do Premium Web Hosting**.
4. Rodar o checklist abaixo.

## Cenário B — o DNS sai junto com o hosting (mover antes)

1. DNS novo grátis: **Cloudflare** (recomendado) ou **DNS do Registro.br**.
2. Recriar **todos** os registros da tabela acima (inclusive **MX + DKIM da Hostinger**, pois o e-mail fica).
3. Trocar os nameservers no **Registro.br** para os do DNS novo. Aguardar propagação.
4. Validar (site + e-mail de teste + formulário) **antes** de cancelar.
5. Cancelar só o Web Hosting.

## Checklist de verificação (pós-corte)

```bash
curl -sI https://www.roldiseguros.com.br | grep -iE 'HTTP|server'   # 200 + Vercel
curl -sI https://roldiseguros.com.br     | grep -i location          # 308 -> www
dig +short MX roldiseguros.com.br                                     # mx1/mx2.hostinger.com
```

- [ ] Site abre no `www` (200/Vercel); `sem-www` redireciona (308).
- [ ] `dig MX` → mx1/mx2.hostinger.com (e-mail intacto).
- [ ] E-mail de teste chega em `diego@` **e** `contato@` (IMAP/webmail do Diego).
- [ ] Formulário do site entrega o lead (Supabase → Resend → caixa).
- [ ] Domínio com auto-renovação no Registro.br.
- [ ] Premium Web Hosting cancelado; **Business Email intacto**.

## Rollback

Se algo quebrar após trocar NS: **voltar os nameservers no Registro.br para `ns1/ns2.dns-parking.com`**.
Não cancelar a Hostinger antes de validar tudo.

## Opção "espremer os últimos R$ 75" (não recomendada agora)

Dá pra migrar as caixas pra um provedor grátis (**Zoho Mail**: caixas reais com IMAP, grátis até
5 contas) e cancelar também o Business Email. Mas isso exige **migrar o histórico de e-mail** e
**reconfigurar o cliente do Diego** — trabalho e risco por ~R$ 75/ano. Não vale a pena por ora.

## Números

- Economia cortando o hosting: **≈ R$ 700/ano** (≈ R$ 3.500 em 5 anos). Fica e-mail (~R$ 75) + domínio (~R$ 40).
- Material do cliente (valor/economia) está no doc de infra (Artifact). Este runbook é operacional.
