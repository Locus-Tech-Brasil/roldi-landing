# Runbook — Sair 100% da Hostinger (site, DNS e e-mail)

> **Interno (Locus Tech).** Não é material do cliente. Objetivo: **cancelar as duas assinaturas
> Hostinger** (Premium Web Hosting + Business Email ≈ **R$ 775/ano**) sem derrubar site, e-mail
> (encaminhamento) ou a entrega dos leads. Alvo: **Registro.br** (domínio) + **Cloudflare**
> (DNS + Email Routing) + **Resend** (envio) + **Vercel** (site). **Prazo: antes de 24/08/2026.**

## Estado atual (verificado 2026-07-15)

- **Site:** Vercel (deploy por `git push`). `www.roldiseguros.com.br` → 200 `server: Vercel`.
- **Domínio:** `roldiseguros.com.br` no **Registro.br**, titular **Diego Augusto Duarte**, expira **2026-08-24**. Independente da Hostinger. ✅
- **DNS:** nameservers do domínio (no Registro.br) apontam para `ns1/ns2.dns-parking.com` = **Hostinger**. Os registros (A, MX, DKIM…) são editados **na Hostinger**.
- **E-mail:** os endereços `contato@` / `diego@` **só encaminham** para o e-mail pessoal do Diego (Gmail/outro) — não são caixas que ele abre. A Hostinger Business Email faz esse encaminhamento hoje.
- **Envio (formulário):** via **Resend** (domínio verificado; DKIM `resend._domainkey` publicado). O envio não depende da Hostinger.

### Zona DNS atual — replicar no Cloudflare

| Tipo | Nome | Valor | Papel |
|------|------|-------|-------|
| A | `@` | `216.198.79.1` | site (Vercel) |
| CNAME | `www` | alvo Vercel (ver painel Vercel; hoje `…vercel-dns-017.com`) | site (Vercel) |
| TXT | `resend._domainkey` | `p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCmawBTp6KaDa5aEWL5fNziCPlCNJXtdOwZHCUzi1iGcNLZRDT9eSuKRdUxHDo8YdB0sYSOpssfqSVpgxrVZ7gu14/ffhT7RaPRBAFl/Xx5M24F2oAhZT2hOWUMJjoqQhDmrOyiXePT+TMh/aGu1rz2gEJI/UUdBKsmFgGeEDHb+QIDAQAB` | DKIM do **Resend** (manter!) |
| TXT | `_dmarc` | `v=DMARC1; p=none` | DMARC |

> Os **MX + DKIM da Hostinger** (`hostingermail-a/b/c._domainkey`) **não** vão pro Cloudflare — o
> recebimento passa a ser do **Cloudflare Email Routing**, que cria os próprios MX e SPF.
> O `resend._domainkey` (envio) **tem** que ir, senão o formulário para de entregar.

## Precisa do Diego / do painel Hostinger antes de executar

1. **E-mail de destino** do encaminhamento (o Gmail/outro que ele realmente abre).
2. **Regras de encaminhamento atuais** (no painel de e-mail Hostinger): quais endereços encaminham e pra onde (`contato@ → ?`, `diego@ → ?`, catch-all?). Replicar no Cloudflare.

## Passo a passo (ordem importa — testar antes de cancelar)

1. **Cloudflare — adicionar o domínio.** Criar conta grátis → *Add site* `roldiseguros.com.br` → o Cloudflare importa os registros públicos. Conferir contra a tabela acima; **adicionar o `resend._domainkey`** se não vier.
2. **Trocar os nameservers no Registro.br** para os que o Cloudflare indicar (2 NS). Aguardar propagação (`dig +short NS roldiseguros.com.br` → nameservers Cloudflare).
3. **Cloudflare Email Routing** → habilitar → verificar o **e-mail de destino** do Diego (ele clica no link de confirmação) → criar as regras (`contato@` e `diego@` → Gmail dele; ou catch-all). Isso cria os MX/SPF do Cloudflare automaticamente.
4. **Testar recebimento:** mandar e-mail de fora para `contato@` e `diego@` → confirmar que **cai no Gmail** do Diego.
5. **Testar o formulário do site:** enviar um lead de teste → confirmar que chega (Supabase → Resend → Gmail). Se cair em spam, revisar SPF/DKIM do Resend.
6. **Só agora: cancelar na Hostinger** o **Premium Web Hosting** e o **Business Email** (desligar auto-renovação / cancelar).
7. **Garantir a renovação do domínio** no Registro.br (auto-renovação ativa, ~R$ 40/ano) — não deixar vencer em 24/08.

## Checklist de verificação (pós-corte)

```bash
dig +short NS roldiseguros.com.br            # nameservers do Cloudflare
curl -sI https://www.roldiseguros.com.br | grep -iE 'HTTP|server'   # 200 + Vercel
curl -sI https://roldiseguros.com.br     | grep -i location          # 308 -> www
dig +short MX roldiseguros.com.br            # MX do Cloudflare (route*.mx.cloudflare.net)
dig +short TXT resend._domainkey.roldiseguros.com.br   # DKIM Resend presente
```

- [ ] E-mail para `contato@` e `diego@` chega no Gmail do Diego.
- [ ] Formulário do site entrega o lead (não spam).
- [ ] Site abre no `www` (200/Vercel); `sem-www` redireciona (308).
- [ ] Domínio com auto-renovação no Registro.br.
- [ ] As duas assinaturas Hostinger canceladas.

## Rollback

Se algo quebrar após a troca de NS: **voltar os nameservers no Registro.br para `ns1/ns2.dns-parking.com`** (Hostinger) — a zona antiga volta a responder enquanto ainda existir. Por isso: **não cancelar a Hostinger antes de validar tudo** e **tirar print da zona/forwarders atuais** antes de mexer.

## Alternativa mais simples (menos economia)

Se preferir minimizar trabalho agora: cancelar **só o Web Hosting** e **manter o Business Email**
(~R$ 75/ano) fazendo o encaminhamento — economia de ~R$ 700/ano em vez de ~R$ 735. Ainda exige
confirmar com a Hostinger que o DNS sobrevive ao cancelamento do hosting (senão, migrar o DNS igual).

## Números

- Economia saindo 100%: **≈ R$ 735/ano** (≈ R$ 3.700 em 5 anos). Resta só o domínio (~R$ 40/ano).
- Material do cliente (valor/economia) está no doc de infra (Artifact). Este runbook é operacional.
