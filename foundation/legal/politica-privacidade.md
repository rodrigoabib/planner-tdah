# Política de Privacidade — Planner TDAH

> **Versão 1.0 · Vigente a partir de [DATA DE PUBLICAÇÃO]**
> **Rota:** `/politica-de-privacidade`
> **Última atualização:** 2026-05-12
> **Conformidade:** Lei Geral de Proteção de Dados — Lei nº 13.709/2018 (LGPD)

---

## 1. Quem somos (Controlador de Dados)

Esta Política descreve como o **Planner TDAH** — operado por **[NOME COMPLETO]**, CPF/CNPJ **[CPF/CNPJ]**, sediado em **[CIDADE/UF]** — trata dados pessoais coletados por meio do site `[URL DO SITE]`.

Para fins da LGPD, somos o **Controlador** dos seus dados pessoais.

**Encarregado de Dados (DPO):** [NOME COMPLETO] — contato: **[E-MAIL DE PRIVACIDADE]**

---

## 2. O que coletamos, por quê e por quanto tempo

> Tabela completa do tratamento. Em caso de dúvida, contate o DPO antes de assumir.

| Dado coletado | Quando | Finalidade (LGPD art. 7) | Retenção | Base legal |
|---|---|---|---|---|
| **E-mail** | No checkout (informado pela Kiwify) | Entrega do produto (PDF + bônus) e e-mails de onboarding | Enquanto durar a oferta + 5 anos após a última compra | Execução de contrato (art. 7, V) |
| **Nome** | No checkout (Kiwify) | Personalização de e-mails, emissão de comprovante | Idem e-mail | Execução de contrato |
| **CPF** (quando aplicável) | No checkout (Kiwify, conforme regra da plataforma) | Compliance fiscal e antifraude | Conforme política da Kiwify | Obrigação legal (art. 7, II) |
| **Dados de pagamento** | No checkout (cartão, PIX, boleto) | Processamento da venda | **Não armazenamos** — gerenciado integralmente pela Kiwify | N/A (terceiro processador) |
| **Respostas do quiz** | Durante a sessão do quiz | Cálculo do arquétipo, melhoria do produto | Sessão (não persistidas em servidor próprio na v1) | Legítimo interesse (art. 7, IX) |
| **Eventos comportamentais** (cliques, tempo no quiz, scroll, abandono) | Durante a sessão (via PostHog) | Análise de funil, melhoria do produto e da landing | 12 meses (configuração padrão do PostHog) | Legítimo interesse (art. 7, IX) |
| **UTMs do anúncio** (utm_source, utm_medium, utm_campaign, utm_content, utm_term) | Na chegada via anúncio | Atribuição de campanha e otimização de ads | 12 meses (PostHog) | Legítimo interesse (art. 7, IX) |
| **Endereço IP e User-Agent** | Em cada acesso (agregado, anonimizado) | Detecção de fraude, prevenção de abuso | 90 dias | Legítimo interesse |

### Dados sensíveis

As respostas do quiz refletem percepções pessoais sobre comportamento e atenção. Embora não sejam dados sensíveis em sentido estrito da LGPD (art. 5, II), tratamos com cuidado equivalente: **não vendemos, não compartilhamos com terceiros para marketing, não cruzamos com bancos de dados externos**.

---

## 3. Com quem compartilhamos

Compartilhamos dados pessoais apenas com **operadores** estritamente necessários para entregar o serviço. Cada um deles tem termos de uso e política de privacidade próprios, que você pode consultar:

| Operador | O que ele recebe | Por quê | Onde está | Política |
|---|---|---|---|---|
| **Kiwify** | Nome, e-mail, CPF, dados de pagamento, valor da compra | Checkout e entrega | Brasil | [kiwify.com.br](https://kiwify.com.br) — Termos e Privacidade |
| **PostHog** | Eventos comportamentais, UTMs, identificador anônimo (`distinct_id`) | Analytics de funil | UE / EUA (data center configurável) | [posthog.com/privacy](https://posthog.com/privacy) |
| **Meta** (Facebook/Instagram) — via Pixel + Conversion API | Eventos `PageView`, `ViewContent`, `InitiateCheckout`, `Purchase` (com e-mail hasheado para CAPI) | Atribuição de conversão e otimização de ads | EUA | [facebook.com/privacy](https://www.facebook.com/privacy/policy/) |
| **Vercel** | Logs de acesso técnico ao site | Hospedagem | EUA | [vercel.com/legal/privacy-policy](https://vercel.com/legal/privacy-policy) |

**Não compartilhamos com:** redes publicitárias além do Meta Pixel, brokers de dados, plataformas de remarketing externas, parceiros comerciais.

---

## 4. Cookies e tecnologias similares

Usamos cookies e tecnologias equivalentes (localStorage, sessionStorage) para:

| Tipo | Finalidade | Pode desativar? |
|---|---|---|
| **Essenciais** | Manter sessão do quiz, lembrar timestamp do cupom QUIZ24H | Não (quebra a aplicação) |
| **Analíticos** | PostHog para entender uso do funil | Sim — via configuração do navegador ou DNT (Do Not Track) |
| **Pixel da Meta** | Atribuição de campanhas pagas | Sim — via configuração da Meta em [adssettings.google.com](https://adssettings.google.com/) e [accountscenter.facebook.com](https://accountscenter.facebook.com/) |

Desativar cookies analíticos **não bloqueia** acesso ao site ou compra. Pode reduzir qualidade da nossa análise interna.

---

## 5. Seus direitos (LGPD art. 18)

A LGPD garante a você os seguintes direitos sobre seus dados pessoais:

| Direito | O que significa | Como exercer |
|---|---|---|
| **Confirmação e acesso** | Saber se temos dados seus e quais são | E-mail ao DPO com assunto "Acesso aos meus dados" |
| **Correção** | Corrigir dado incompleto, inexato ou desatualizado | E-mail ao DPO indicando o erro |
| **Anonimização ou bloqueio** | Tornar dado anônimo ou impedir tratamento | E-mail ao DPO |
| **Eliminação** | Apagar dados (exceto os que precisamos manter por lei) | E-mail ao DPO com assunto "Solicitação de exclusão" |
| **Portabilidade** | Receber seus dados em formato estruturado (JSON ou CSV) | E-mail ao DPO |
| **Informação sobre compartilhamento** | Saber com quem compartilhamos seus dados | Esta política (seção 3) responde — ou contate o DPO |
| **Revogação de consentimento** | Voltar atrás em consentimentos | E-mail ao DPO |

**Prazo de resposta:** até **15 dias** a partir do recebimento da solicitação, conforme orientação da ANPD (Autoridade Nacional de Proteção de Dados).

**Contato:** [E-MAIL DE PRIVACIDADE]

---

## 6. Segurança

Adotamos medidas técnicas e administrativas razoáveis para proteger seus dados:

- **Em trânsito:** todas as comunicações com o site são via HTTPS (TLS)
- **Em armazenamento:** dados de pagamento ficam apenas na Kiwify (PCI-DSS); eventos analíticos no PostHog (com criptografia em repouso)
- **Acesso interno:** apenas o Controlador tem acesso aos painéis administrativos
- **Hashing de e-mail** ao enviar para Meta CAPI (Conversion API), conforme padrão de mercado

**Em caso de incidente de segurança** que afete seus dados, comunicaremos você e a ANPD nos prazos da LGPD.

---

## 7. Crianças e adolescentes

O Planner TDAH **não é destinado a menores de 18 anos**. Não coletamos intencionalmente dados de pessoas abaixo dessa idade. Se descobrirmos coleta inadvertida, removemos os dados imediatamente.

Se você é responsável e identificou que um menor sob sua tutela compartilhou dados conosco, escreva para [E-MAIL DE PRIVACIDADE].

---

## 8. Transferências internacionais

Alguns operadores (PostHog, Meta, Vercel) podem armazenar dados em servidores fora do Brasil. Todos contam com cláusulas contratuais e medidas que asseguram nível de proteção equivalente ao da LGPD, conforme art. 33 e 34.

---

## 9. Alterações nesta Política

Esta Política pode ser atualizada periodicamente. Alterações materiais serão comunicadas:

- Por aviso visível no site
- Por e-mail aos compradores cadastrados, quando aplicável

A versão vigente é sempre a publicada em `/politica-de-privacidade`, com data de "Vigente a partir de" atualizada.

---

## 10. Encarregado de Dados (DPO) e canal de contato

| Campo | Valor |
|---|---|
| **DPO (Encarregado de Dados)** | [NOME COMPLETO] |
| **E-mail para questões de privacidade** | [E-MAIL DE PRIVACIDADE] |
| **Prazo de resposta** | até 15 dias úteis |
| **Autoridade reguladora** | ANPD — Autoridade Nacional de Proteção de Dados ([gov.br/anpd](https://www.gov.br/anpd/)) |

---

## Histórico de revisões

| Data | Versão | Mudança | Autor |
|---|---|---|---|
| 2026-05-12 | 1.0 | Versão inicial — cobertura LGPD para coleta via quiz + Kiwify + PostHog + Meta Pixel | Rodrigo Abib + Claude (Opus 4.7) |
