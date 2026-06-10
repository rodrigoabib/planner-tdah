// Dados canônicos dos arquétipos de atenção do Planner TDAH v1.
// Fonte de verdade: este arquivo. Consumido por components/Quiz.jsx e components/Landing.jsx.
// Mantém o mesmo formato histórico do objeto ARC para não quebrar a lógica de findArc().

export const ARC = {
  nomade: {
    sym: '∞',
    id: 'nomade-quantico',
    slug: 'nomade-quantico',
    name: 'O Nômade Quântico',
    tag: 'Presente em todos os lugares. Em nenhum ao mesmo tempo.',
    color: '#8B5CF6',
    coRgb: '139,92,246',
    ctaUrl: '/planner/nomade-quantico',
    profile: { D: 'S', I: 'N', A: 'M', E: 'N', H: 'N' },
    reco: [
      'Você relê o mesmo parágrafo três vezes — e ainda assim não absorve.',
      'Tem ideias ricas e profundas, mas horas se passam antes de colocá-las em prática.',
      'Às vezes viaja no meio de uma conversa e volta sem saber o que perdeu.'
    ],
    cost: [
      'Compromissos importantes escapam da memória mesmo com boa intenção.',
      'A sensação de que o tempo passou sem você perceber é constante e frustrante.'
    ],
    bridge:
      'Planners lineares assumem que você vai lembrar de olhar para eles. O seu planner precisa de âncoras temporais visuais, captura rápida e lembretes contextuais — para que o mundo externo te alcance antes que o tempo escape.',
    adjust:
      'Âncoras visuais e lembretes contextuais para trazer o plano de volta ao seu campo de visão — sem depender só da memória.'
  },
  reator: {
    sym: '▲',
    id: 'reator-em-cadeia',
    slug: 'reator-em-cadeia',
    name: 'O Reator em Cadeia',
    tag: 'Energia infinita. Freio é opcional.',
    color: '#EF4444',
    coRgb: '239,68,68',
    ctaUrl: '/planner/reator-em-cadeia',
    profile: { D: 'M', I: 'S', A: 'M', E: 'M', H: 'S' },
    reco: [
      'Você decide enquanto ainda está terminando de pensar na decisão anterior.',
      'Projetos começam com 100% de entusiasmo — e perdem combustível antes da metade.',
      'A energia que outros veem como carisma, você sabe que é o freio faltando.'
    ],
    cost: [
      'Decisões rápidas já custaram dinheiro, relacionamentos ou oportunidades.',
      'Manter qualquer coisa consistente por mais de algumas semanas é uma luta real.'
    ],
    bridge:
      'Planners tradicionais ignoram que você tem energia de sobra mas freio insuficiente. O seu planner precisa de speed bumps intencionais — pausas antes de decisões grandes e checkpoints de consistência.',
    adjust:
      'Pausas intencionais antes de decisões grandes e checkpoints simples para transformar energia inicial em continuidade.'
  },
  vulcao: {
    sym: '◆',
    id: 'vulcao-silencioso',
    slug: 'vulcao-silencioso',
    name: 'O Vulcão Silencioso',
    tag: 'Por fora: calma. Por dentro: lava.',
    color: '#F59E0B',
    coRgb: '245,158,11',
    ctaUrl: '/planner/vulcao-silencioso',
    profile: { D: 'M', I: 'M', A: 'S', E: 'S', H: 'N' },
    reco: [
      'Por fora você parece bem. Só você sabe o que está acontecendo por dentro.',
      'Uma crítica pequena pode desestabilizar um dia inteiro — difícil explicar por quê.',
      'Você adia tarefas não por preguiça, mas por medo real de não ser bom o suficiente.'
    ],
    cost: [
      'A batalha emocional diária é invisível para quase todos ao redor — e isso isola.',
      'Depois de um erro, retomar pode levar dias que custam muito.'
    ],
    bridge:
      'Planners que não reconhecem estados emocionais falham nos seus dias difíceis. O seu planner precisa de check-ins de humor, dias de buffer e estrutura adaptável ao estado do dia.',
    adjust:
      'Check-in de humor antes de planejar, para escolher o tamanho realista do dia — versão mínima, média ou completa.'
  },
  arquiteto: {
    sym: '⬡',
    id: 'arquiteto-do-caos',
    slug: 'arquiteto-do-caos',
    name: 'O Arquiteto do Caos',
    tag: 'Mil ideias. Zero andaimes.',
    color: '#10B981',
    coRgb: '16,185,129',
    ctaUrl: '/planner/arquiteto-do-caos',
    profile: { D: 'S', I: 'S', A: 'S', E: 'M', H: 'M' },
    reco: [
      'Você é uma máquina de ideias — e um cemitério de projetos pela metade.',
      'Sabe exatamente o que quer construir. O problema é o andaime entre visão e execução.',
      'Toda vez que vai organizar, surge uma ideia nova que parece mais urgente.'
    ],
    cost: [
      'Sem estrutura externa sólida, projetos importantes morrem na fase do entusiasmo.',
      'A sensação de quase lá sem nunca chegar lá é real, frequente e frustrante.'
    ],
    bridge:
      'Planners vazios só multiplicam o caos — você precisa de andaime, não de espaço em branco. O seu planner quebra visões grandes em micro-ações e tem captura de ideias que não sabota o que está em execução.',
    adjust:
      'Visões grandes quebradas em micro-ações e uma inbox de ideias separada do plano em execução.'
  },
  furacao: {
    sym: '✦',
    id: 'furacao',
    slug: 'furacao',
    name: 'O Furacão',
    tag: 'Tudo ao máximo. Sempre.',
    color: '#EC4899',
    coRgb: '236,72,153',
    ctaUrl: '/planner/furacao',
    profile: { D: 'S', I: 'S', A: 'S', E: 'S', H: 'S' },
    reco: [
      'Você experimenta tudo ao máximo — energia, distração, emoção e impulso simultaneamente.',
      'Um dia comum para outros é genuinamente exaustivo para o seu sistema nervoso.',
      'Sobreviveu até aqui com uma resiliência que poucas pessoas ao redor reconhecem.'
    ],
    cost: [
      'O esforço constante de autorregulação em todas as áreas cansa de um jeito profundo.',
      'Manter qualquer rotina é uma luta real — não por falta de vontade.'
    ],
    bridge:
      'Qualquer sistema com muitas etapas vai falhar com você. O seu planner precisa ser radical em simplicidade — 1-3 prioridades absolutas por dia, reset fácil, zero punição por dias ruins.',
    adjust:
      'Dia limitado a 1-3 prioridades absolutas, com reset fácil e sem punição quando o plano estourar.'
  },
  camaleao: {
    sym: '◑',
    id: 'camaleao-exausto',
    slug: 'camaleao-exausto',
    name: 'O Camaleão Exausto',
    tag: 'Parece que dá conta. Por dentro, é outra história.',
    color: '#22D3EE',
    coRgb: '34,211,238',
    ctaUrl: '/planner/camaleao-exausto',
    profile: { D: 'M', I: 'M', A: 'M', E: 'M', H: 'N' },
    reco: [
      'Você funciona. Só você sabe exatamente o custo disso.',
      'Desenvolveu sistemas, compensações e máscaras — e ninguém percebe o esforço.',
      'Provavelmente passou anos sem ter um nome para esse padrão. "Sempre se virou" foi o obstáculo.'
    ],
    cost: [
      'O burnout acumulado por anos de sobresforço invisível chega de forma súbita.',
      'A sensação de que para os outros parece fácil pode ser o peso mais difícil desse padrão.'
    ],
    bridge:
      'Você não precisa de mais exigência — precisa de permissão para funcionar de forma sustentável. O seu planner reconhece que fazer menos bem feito é muitas vezes o movimento mais inteligente do dia.',
    adjust:
      'Dias mínimos permitidos, pausas sem culpa e retomada sem compensação excessiva.'
  }
}

// Texto de bridge alternativo para a variação lowSeverity (todas as 5 dimensões em N).
// Aparece quando o quiz retorna {...ARC.camaleao, lowSeverity: true} OU
// quando a landing é acessada pelo slug "manutencao".
export const LOW_SEVERITY_BRIDGE =
  "Seu padrão de atenção se manifesta de forma mais sutil — o que frequentemente significa que você desenvolveu habilidades de compensação ao longo dos anos. Isso tem um custo que muitas vezes só você percebe."

// Ajuste de método específico da variação lowSeverity (substitui arc.adjust na landing /planner/manutencao).
export const LOW_SEVERITY_ADJUST =
  'Estrutura leve de manutenção: ritual diário em versão curta e baixa carga de preenchimento — estrutura suficiente, não perfeita.'

// Como o método do planner responde às fricções mais recorrentes do discovery
// (research/outputs/01 §6 e 03 §7): baixo atrito, captura, revisão leve e retomada sem culpa.
// Conteúdo BASE da landing — igual para todos os arquétipos.
export const METHOD_PILLARS = [
  {
    icon: '◎',
    title: 'Até 3 prioridades reais por dia',
    desc: 'Cada uma com uma versão mínima para os dias em que a energia não colabora. Lista curta que cabe no dia, não lista infinita que vira cobrança.'
  },
  {
    icon: '✎',
    title: 'Captura rápida para esvaziar a cabeça',
    desc: 'Ideias, pendências e preocupações saem da mente e vão para um lugar visível — sem precisar decidir nada na hora.'
  },
  {
    icon: '↻',
    title: 'Revisão semanal leve, sem auditoria',
    desc: '20 minutos para fechar ciclos abertos e escolher o foco da próxima semana. Reentrada, não prestação de contas.'
  },
  {
    icon: '☀',
    title: 'Modo Recomeço para quando você sumir',
    desc: 'Ficou dias (ou semanas) sem abrir? Há uma página para voltar em 10 minutos: sem preencher retroativo, sem reler nada, sem culpa.'
  }
]

// Mapa de slug de URL → arquétipo (lookup para a rota /planner/:slug).
// "manutencao" é o slug dedicado para a variação lowSeverity.
export const SLUG_TO_ARCHETYPE = {
  'nomade-quantico': { arc: ARC.nomade, lowSeverity: false },
  'reator-em-cadeia': { arc: ARC.reator, lowSeverity: false },
  'vulcao-silencioso': { arc: ARC.vulcao, lowSeverity: false },
  'arquiteto-do-caos': { arc: ARC.arquiteto, lowSeverity: false },
  furacao: { arc: ARC.furacao, lowSeverity: false },
  'camaleao-exausto': { arc: ARC.camaleao, lowSeverity: false },
  manutencao: { arc: ARC.camaleao, lowSeverity: true }
}

// Conteúdo concreto da landing: parágrafos extras, FAQ, bullets de oferta.
// Estes blocos são iguais para todos os arquétipos (BASE da landing) e não dependem do quiz.
export const OFFER = {
  priceFull: 'R$ 49,90',
  priceCoupon: 'R$ 29,90',
  couponCode: 'QUIZ24H',
  couponDiscount: 'R$ 20,00',
  warrantyDays: 7,
  deliveryMinutes: 5,
  deliveryFormat: 'PDF imprimível A4 + bônus "Comece em 15 minutos"',
  platform: 'Kiwify',
  kiwifyCheckoutPlaceholder: 'https://pay.kiwify.com.br/PLACEHOLDER'
}

export const LANDING_BENEFITS = [
  'Entrega digital imediata — link no seu e-mail em menos de 5 minutos.',
  'Funciona impresso (A4) e em apps de anotação como Goodnotes, Notability, Noteshelf.',
  '7 dias de garantia incondicional — devolvemos o valor sem perguntar nada.',
  'Personalizado para o seu padrão de atenção — feito a partir do seu resultado do quiz.',
  'Bônus "Comece em 15 minutos" para destravar o uso já no primeiro dia.'
]

export const FAQ = [
  {
    q: 'Como recebo o planner depois de comprar?',
    a:
      'A entrega é automática. Em até 5 minutos após o pagamento confirmado, o link de download do PDF chega no e-mail informado no checkout da Kiwify. Se não chegar, verifique caixa de spam/promoções e nos escreva pelo e-mail de suporte.'
  },
  {
    q: 'Em que formato é o planner?',
    a:
      'PDF imprimível em formato A4, otimizado para impressão caseira e para apps de anotação digital. Você pode imprimir e usar em papel, ou abrir em Goodnotes, Notability, Noteshelf, OneNote, Concepts e similares.'
  },
  {
    q: 'Funciona se eu nunca recebi nenhum mapeamento profissional?',
    a:
      'Sim. O planner é um sistema de organização adaptado a um padrão de funcionamento. Não exige confirmação clínica para ser útil. Se você se reconheceu no resultado do quiz, é provável que a estrutura proposta também te ajude.'
  },
  {
    q: 'O quiz é um diagnóstico?',
    a:
      'Não. O quiz é uma autoavaliação informativa baseada nas suas próprias respostas. Não substitui avaliação por psicólogo, psiquiatra ou neurologista. Qualquer decisão sobre saúde mental deve ser tomada com apoio de profissional habilitado.'
  },
  {
    q: 'Tem garantia?',
    a:
      'Sim. Garantia incondicional de 7 dias corridos a partir da compra. Se você não gostar, por qualquer motivo, basta solicitar reembolso pelo painel da Kiwify ou pelo nosso e-mail de suporte. Devolvemos o valor sem perguntar nada. A política completa está em /politica-de-reembolso.'
  },
  {
    q: 'Recebo atualizações futuras do PDF?',
    a:
      'Na v1, não. Atualizações automáticas estão fora do escopo desta versão. Se uma versão revisada for lançada, você receberá um aviso por e-mail com a opção de adquirir separadamente, ou (a critério do Planner TDAH) acesso gratuito como agradecimento por ter sido um dos primeiros compradores.'
  },
  {
    q: 'Posso usar o planner mesmo sem ter feito o quiz?',
    a:
      'Você pode, mas perde a personalização. O planner foi pensado para o arquétipo identificado na sua autoavaliação. Se você comprar sem o quiz, recomendamos fazer o quiz antes para escolher a versão que mais combina com seu funcionamento.'
  },
  {
    q: 'Tem suporte se eu tiver dúvida?',
    a:
      'Sim. Suporte por e-mail com resposta em até 24 horas úteis. Problemas técnicos (PDF corrompido, link expirado, e-mail não recebido) são resolvidos com reenvio, sem precisar passar pelo processo de reembolso.'
  },
  {
    q: 'Tem versão impressa enviada pelos Correios?',
    a:
      'Não. A v1 é exclusivamente digital, em PDF. Você pode imprimir em qualquer lugar (gráfica rápida ou impressora caseira) — ele foi otimizado para isso, com margens, papel A4 e contraste apropriado para impressão preto e branco também.'
  }
]
