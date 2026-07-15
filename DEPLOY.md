# DEPLOY — Landing da Roldi (`roldi-landing`)

Site público da **Roldi Seguros** (a "casa" do cliente nº 1). App estático **Vite + React +
Tailwind + shadcn/ui**, extraído do Lovable em 2026-07-14 e desacoplado. Deploy por **Git → Vercel**.

## Como atualizar (o fluxo normal)
1. Editar o código, `git commit`, **`git push` na `main`**.
2. O **Vercel** detecta o push e faz o build automático (`npm run build` → `dist/`) e o deploy em produção (~1 min).

Sem Lovable, sem upload manual. Projeto Vercel: **team `roldi-seguros` (Hobby/grátis)**, projeto `roldi-landing`.

## Variáveis de ambiente (no painel do Vercel — não no git)
O `.env` é **gitignored**. As variáveis vivem em **Vercel → Project → Settings → Environment Variables**
(config **pública** de frontend do Supabase — a chave é a *publishable/anon*):
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- `VITE_SUPABASE_PROJECT_ID`

> Sem elas, o build sobe **em branco** (o `client.ts` do Supabase lança na inicialização).

## Domínio & DNS
- **Domínio:** `roldiseguros.com.br` — apex faz **308 → `www`** (canônico); servido pelo **Vercel**.
- **DNS gerenciado no Hostinger** (conta do Diego; domínio "externo" → hPanel → *Manage DNS*).
- Registros que apontam pro Vercel:

| Tipo | Nome | Valor |
|---|---|---|
| `A` | `@` | `216.198.79.1` |
| `CNAME` | `www` | `9b0d96777f9f805c.vercel-dns-017.com` |

⚠️ **Não tocar** nos registros de e-mail: `MX` (`mx1`/`mx2.hostinger.com`), `TXT` SPF
(`include:_spf.mail.hostinger.com`) e os `CNAME`/`TXT` de DKIM (`hostingermail-*`, `resend._domainkey`).
Mexer neles derruba o e-mail do Diego.

## Rollback (voltar pro Lovable)
Reverter os dois registros no hPanel para o IP do Lovable:
- `A @` → `185.158.133.1`
- `www` → `A 185.158.133.1` (era A antes da migração)

Propaga em minutos (TTL baixo). Obs.: pode ser preciso reconectar o domínio custom no Lovable.

## Contexto / follow-ups
- Extraído do Lovable e migrado Lovable → Vercel em **2026-07-14** (ver ADR-0003 no repo do motor).
- Base do código é a versão de **13/07** do Lovable — se houve edição no Lovable depois, reconciliar.
- Dívidas: `npm audit` acusa vulnerabilidades herdadas do template; imagens pesadas
  (`roldi-logo` ~1,7 MB, `diego-duarte` ~2 MB) → otimizar para Web Vitals.
