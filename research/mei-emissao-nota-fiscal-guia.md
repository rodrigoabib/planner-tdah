# Emissão de Nota Fiscal no MEI — Guia prático

> **Documento de apoio · 2026-06-06 · feito para Rodrigo Abib**
> MEI: Editor de livros (5811-5/00) + Livreiro (4761-0/01) · Sede: Rio de Janeiro/RJ
> ⚠️ Não é parecer contábil. É um guia operacional para você executar com segurança.

---

## 1. Antes de tudo: você é obrigado a emitir nota em toda venda?

Depende de **para quem** você vende:

| Quem compra | Você é obrigado a emitir? |
|---|---|
| **Pessoa Física (consumidor final)** — o caso da maioria das vendas do Planner na Kiwify/Hotmart | **Não é obrigatório** emitir nota por venda. Só emite se o cliente pedir. |
| **Pessoa Jurídica (CNPJ)** — ex: uma empresa que compra seu produto, um parceiro B2B | **Sim, obrigatório.** Sempre que o comprador for CNPJ. |

**Tradução para o seu funil:** vendendo PDF para consumidores via Kiwify/Hotmart, você normalmente **não precisa emitir nota a cada venda**. A plataforma processa o pagamento e repassa seu líquido. Você vai precisar do emissor de nota principalmente para:

- Vendas/contratos com **empresas (B2B)**;
- Quando **algum cliente pessoa física pedir** a nota;
- Eventualmente, se a plataforma ou seu controle financeiro pedir nota do repasse.

> 💡 Mesmo sem obrigação, ter o emissor **habilitado e testado** desde já é o certo — quando precisar, você emite em 2 minutos sem correria.

---

## 2. Qual nota você emite: NFS-e ou NF-e?

São dois mundos diferentes:

| Tipo | Para quê | Quem gerencia | Seu caso |
|---|---|---|---|
| **NFS-e** (Nota Fiscal de **Serviço**) | Prestação de serviço | Municípios + **Emissor Nacional** | ✅ É a sua via principal (edição de livros é tratada como serviço) |
| **NF-e** (Nota Fiscal **eletrônica de produto**) | Venda de mercadoria física, com ICMS | Estado (SEFAZ) | Só se você vender **livro físico** algum dia |

**Para você (produto digital), o caminho é a NFS-e pelo Emissor Nacional.** Você não precisa de NF-e enquanto vender só o PDF.

> 📚 **Imunidade do livro:** livro/e-book tem imunidade tributária (STF). Na prática do MEI, o ISS já é o valor fixo dentro do DAS — você **não paga ISS por nota**. A nota é só o documento fiscal; não gera imposto extra.

---

## 3. Como HABILITAR o Emissor Nacional de NFS-e (primeiro acesso)

Boa notícia: para o MEI, **não precisa de certificado digital nem de alvará**. Seu login gov.br (nível Prata/Ouro, que você já tem) resolve.

**Passo a passo da habilitação:**

1. Acesse **https://www.nfse.gov.br/EmissorNacional**
2. Clique em **"Entrar com gov.br"** e faça login (seu nível Ouro já serve).
3. No primeiro acesso, o sistema reconhece seu CNPJ MEI automaticamente.
4. Vá em **Configurações** (ícone de engrenagem ⚙️).
5. Preencha **e-mail** e **telefone** de contato.
6. Em tributos, marque a opção **"Não informar nenhum valor estimado para os tributos"** (no MEI o imposto é o DAS fixo — não se informa tributo por nota).
7. Salve. Pronto: emissor habilitado.

> 📱 Existe também o **app "NFS-e Mobile"** (Android/iOS) com o mesmo login — útil para emitir do celular.

---

## 4. Como EMITIR uma NFS-e (passo a passo)

1. No painel do Emissor Nacional, em **"Acesso Rápido"**, clique no botão verde **"Emitir NFS-e"** (ícone de documento com "+").
2. O formulário tem 4 etapas: **Pessoas → Serviço → Valores → Emitir**.
3. **Pessoas (Tomador):** informe os dados de quem está comprando.
   - Se for empresa: CNPJ, razão social.
   - Se for pessoa física: CPF e nome.
4. **Serviço:**
   - **Data de Competência:** geralmente a data de hoje.
   - **Código de Tributação Nacional:** selecione o que corresponde à sua atividade (edição/conteúdo). *(Na dúvida do código exato, vale confirmar com contador na 1ª nota — depois fica salvo.)*
   - **Descrição do Serviço:** escreva de forma clara. Ex: *"Licença de uso de material digital autoral (planner em PDF) — edição de obra própria."*
5. **Valores:** informe o **valor total** cobrado. (No MEI não se detalha imposto aqui.)
6. **Emitir:** releia tudo e clique em **"Emitir NFS-e"**.
7. A nota é gerada com validade legal imediata. **Baixe o PDF e o XML** e guarde (e envie ao cliente).

> ✅ **Dica de organização (anti-TDAH):** crie uma pasta `notas-fiscais/2026/` no projeto e salve PDF + XML de cada nota com nome `AAAA-MM-DD_cliente_valor`. Facilita a declaração anual.

---

## 5. Rio de Janeiro — preciso de inscrição municipal? (resposta direta)

**Não para emitir suas notas.** A Prefeitura do Rio é **conveniada ao Emissor Nacional**, e desde 01/09/2023 o MEI **só pode emitir pelo sistema nacional** — a antiga "Nota Carioca" **não é mais usada pelo MEI**. A própria Prefeitura afirma: *"Para utilizar o Emissor Nacional não é necessário Alvará."*

O que isso significa, na prática, para você:

- Você **não precisa** fazer um cadastro municipal separado nem tirar alvará só para emitir nota — o CNPJ do MEI + login gov.br no Emissor Nacional bastam.
- **Custo:** zero. Não há taxa para emitir NFS-e nem para a habilitação.
- **ISS:** já está embutido no seu DAS (o componente fixo de R$ 5 quando há serviço). Você **não paga ISS por nota**.
- **Burocracia:** praticamente nenhuma para o seu perfil (negócio digital, em casa, sem atendimento presencial de público).

> ⚠️ Ponto de atenção honesto: o cadastro municipal de prestadores existe no Rio para casos gerais, e a integração via REDESIM costuma registrar o MEI automaticamente. Para o seu caso (digital, em casa), não há ação extra. Se um dia você abrir ponto físico com atendimento ao público, aí sim entram regras de licenciamento — não é o seu cenário agora.

---

## 6. Resumo visual do fluxo

```
Venda na Kiwify/Hotmart
        │
        ├─ Comprador é Pessoa Física  ──►  Nota opcional (só se pedir)
        │
        └─ Comprador é Empresa (CNPJ) ──►  Emitir NFS-e (obrigatório)
                                                │
                                   Emissor Nacional (nfse.gov.br)
                                   login gov.br · sem alvará · sem custo
                                                │
                                   Baixar PDF + XML e guardar
```

---

## 7. Próximos passos

1. **Hoje/esta semana:** acessar o Emissor Nacional, habilitar e **emitir 1 nota de teste** (pode emitir e depois cancelar, ou emitir uma real quando surgir) para destravar o medo da ferramenta.
2. **Configurar a pasta** `notas-fiscais/` no projeto.
3. **Trocar para CNPJ na Kiwify/Hotmart** (usa o CCMEI).
4. Quando vier a 1ª venda B2B, emitir a NFS-e seguindo a seção 4.
