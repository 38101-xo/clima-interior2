export const WEATHER_OPTIONS = [
  {
    id: 'ensolarado',
    name: 'Ensolarado',
    emoji: '☀️',
    badge: 'Céu Aberto',
    description: 'Estou animado, feliz e cheio de energia.',
    headline: 'Céu aberto por aí!',
    forecastTemplate: 'Céu aberto por aí! Parece um bom momento para aproveitar sua energia, celebrar conquistas e fazer algo que você realmente gosta.',
    color: '#F5D982',
    accentColor: '#D99B00',
    lightBg: 'from-amber-100/90 via-yellow-50 to-orange-100/60',
    darkBg: 'from-amber-950/40 via-purple-950/40 to-yellow-900/20',
    borderColor: 'border-amber-300 dark:border-amber-500/50',
    score: 5,
    soundType: 'sunny'
  },
  {
    id: 'parcialmente-nublado',
    name: 'Parcialmente Nublado',
    emoji: '⛅',
    badge: 'Sol Entre Nuvens',
    description: 'Estou bem, mas um pouco desanimado.',
    headline: 'Sol entre nuvens passageiras',
    forecastTemplate: 'O sol segue brilhando por trás das nuvens. Dê espaço para os momentos mais lentos sem se cobrar uma animação constante.',
    color: '#A9C6D8',
    accentColor: '#4A7C9D',
    lightBg: 'from-sky-100/80 via-blue-50 to-indigo-100/60',
    darkBg: 'from-slate-900 via-sky-950/30 to-indigo-950/40',
    borderColor: 'border-sky-300 dark:border-sky-500/50',
    score: 4,
    soundType: 'breeze'
  },
  {
    id: 'nublado',
    name: 'Nublado',
    emoji: '☁️',
    badge: 'Nebulosidade Neutra',
    description: 'Estou cansado e sem muita disposição.',
    headline: 'Céu coberto e ritmo calmo',
    forecastTemplate: 'Algumas nuvens no seu céu hoje. Não precisa resolver tudo de uma vez só. Comece devagar e respeite seu compasso interior.',
    color: '#C8B6E2',
    accentColor: '#7E63A8',
    lightBg: 'from-purple-100/80 via-slate-50 to-indigo-100/60',
    darkBg: 'from-purple-950/40 via-slate-950 to-indigo-950/40',
    borderColor: 'border-purple-300 dark:border-purple-500/50',
    score: 3,
    soundType: 'cloud'
  },
  {
    id: 'chuvoso',
    name: 'Chuvoso',
    emoji: '🌧️',
    badge: 'Precipitação Emocional',
    description: 'Estou triste ou precisando de um tempo.',
    headline: 'Previsão de chuva emocional',
    forecastTemplate: 'Previsão de chuva emocional. Lembre-se: tudo bem não estar bem o tempo inteiro. A chuva limpa o ar e nutre a terra; permita-se acolher o que sente.',
    color: '#A9C6D8',
    accentColor: '#346B8A',
    lightBg: 'from-blue-100/80 via-indigo-50 to-slate-100/80',
    darkBg: 'from-blue-950/50 via-slate-950 to-cyan-950/30',
    borderColor: 'border-blue-300 dark:border-blue-500/50',
    score: 2,
    soundType: 'rain'
  },
  {
    id: 'tempestade',
    name: 'Tempestade',
    emoji: '⛈️',
    badge: 'Alerta de Sobrecarga',
    description: 'Estou sobrecarregado e preciso desacelerar.',
    headline: 'Alerta de sobrecarga!',
    forecastTemplate: 'Alerta de sobrecarga! Talvez seja hora de diminuir o ritmo, fechar as abas da mente e cuidar um pouco de você antes do mundo lá fora.',
    color: '#493A59',
    accentColor: '#9C78BD',
    lightBg: 'from-purple-200/90 via-rose-100/50 to-indigo-200/70',
    darkBg: 'from-purple-950 via-red-950/20 to-slate-950',
    borderColor: 'border-purple-400 dark:border-purple-400/50',
    score: 1,
    soundType: 'storm'
  },
  {
    id: 'ventania',
    name: 'Ventania',
    emoji: '💨',
    badge: 'Ventos Agitados',
    description: 'Estou agitado, ansioso ou com a cabeça cheia.',
    headline: 'Muitos ventos soprando na mente',
    forecastTemplate: 'Ventos velozes e pensamentos acelerados por aí. Inspire fundo, sinta os pés apoiados no chão e concentre-se em uma única coisa simples agora.',
    color: '#F2D5DF',
    accentColor: '#BD6484',
    lightBg: 'from-rose-100/80 via-teal-50/60 to-purple-100/60',
    darkBg: 'from-rose-950/30 via-slate-950 to-teal-950/30',
    borderColor: 'border-rose-300 dark:border-rose-500/50',
    score: 2.5,
    soundType: 'wind'
  }
];

export const ENERGY_LEVELS = [
  { id: 'muito-baixa', label: 'Muito baixa', score: 1, percent: 20, icon: 'BatteryLow', color: 'text-rose-500' },
  { id: 'baixa', label: 'Baixa', score: 2, percent: 40, icon: 'BatteryMedium', color: 'text-amber-500' },
  { id: 'media', label: 'Média', score: 3, percent: 60, icon: 'Battery', color: 'text-yellow-600' },
  { id: 'alta', label: 'Alta', score: 4, percent: 80, icon: 'BatteryCharging', color: 'text-emerald-500' },
  { id: 'muito-alta', label: 'Muito alta', score: 5, percent: 100, icon: 'Zap', color: 'text-emerald-600' }
];

export const NEEDS_OPTIONS = [
  { id: 'descansar', label: 'Descansar', icon: 'Moon', description: 'Dar uma pausa física e mental' },
  { id: 'organizar', label: 'Me organizar', icon: 'ListChecks', description: 'Colocar pensamentos e espaço em ordem' },
  { id: 'distrair', label: 'Me distrair', icon: 'Sparkles', description: 'Desconectar e sorrir com algo leve' },
  { id: 'conversar', label: 'Conversar', icon: 'MessageCircle', description: 'Trocar uma ideia e desabafar' },
  { id: 'momento-meu', label: 'Ter um momento só meu', icon: 'Coffee', description: 'Ficar na própria companhia em silêncio' }
];

export const SELF_CARE_SUGGESTIONS = [
  {
    id: 'agua',
    title: 'Tomar um copo de água',
    description: 'Beba devagar, sentindo a temperatura fresca. Uma pausa simples que desperta o corpo.',
    category: 'Corpo',
    duration: '1 min',
    icon: 'Droplets',
    suitedFor: ['ensolarado', 'parcialmente-nublado', 'nublado', 'chuvoso', 'tempestade', 'ventania']
  },
  {
    id: 'respirar',
    title: 'Respirar tranquilamente',
    description: 'Faça 4 ciclos de respiração consciente (inspire 4s, retenha 4s, solte 6s). Alivia a tensão imediatamente.',
    category: 'Mente',
    duration: '3 min',
    icon: 'Wind',
    hasInteractiveExercise: true,
    suitedFor: ['ventania', 'tempestade', 'nublado', 'chuvoso', 'parcialmente-nublado', 'ensolarado']
  },
  {
    id: 'pausa',
    title: 'Fazer uma pausa de cinco minutos',
    description: 'Feche os olhos, afaste-se das telas e deixe os ombros caírem. Não faça nada por 5 minutos.',
    category: 'Descanso',
    duration: '5 min',
    icon: 'Timer',
    suitedFor: ['tempestade', 'nublado', 'ventania', 'chuvoso']
  },
  {
    id: 'musica',
    title: 'Ouvir uma música favorita',
    description: 'Coloque aquela canção que abraça seu coração ou que te dá vontade de balançar a cabeça.',
    category: 'Alma',
    duration: '4 min',
    icon: 'Music',
    suitedFor: ['ensolarado', 'parcialmente-nublado', 'chuvoso', 'ventania']
  },
  {
    id: 'caminhar',
    title: 'Caminhar um pouco',
    description: 'Dê uma volta pela casa, no quintal ou na calçada. Movimentar as pernas muda a circulação do humor.',
    category: 'Corpo',
    duration: '10 min',
    icon: 'Footprints',
    suitedFor: ['ensolarado', 'ventania', 'parcialmente-nublado', 'nublado']
  },
  {
    id: 'organizar',
    title: 'Organizar um pequeno espaço',
    description: 'Arrume apenas uma mesa, uma gaveta ou a cama. A ordem externa traz clareza imediata para a mente.',
    category: 'Foco',
    duration: '7 min',
    icon: 'Sparkles',
    suitedFor: ['ventania', 'parcialmente-nublado', 'ensolarado', 'nublado']
  },
  {
    id: 'escrever',
    title: 'Escrever como está se sentindo',
    description: 'Coloque em poucas linhas o que está no peito. Não precisa ser bonito nem fazer sentido, só sair do corpo.',
    category: 'Reflexão',
    duration: '5 min',
    icon: 'PenTool',
    suitedFor: ['chuvoso', 'tempestade', 'ventania', 'nublado']
  },
  {
    id: 'descansar-sem-culpa',
    title: 'Descansar sem culpa',
    description: 'Seu valor não é medido pela produtividade constante. Hoje, permita-se apenas existir.',
    category: 'Descanso',
    duration: '20 min',
    icon: 'HeartHandshake',
    suitedFor: ['tempestade', 'chuvoso', 'nublado']
  },
  {
    id: 'alongar',
    title: 'Alongar o pescoço e coluna',
    description: 'Gire suavemente os ombros para trás e incline a cabeça para os lados, liberando a carga do dia.',
    category: 'Corpo',
    duration: '3 min',
    icon: 'Activity',
    suitedFor: ['tempestade', 'ventania', 'nublado', 'ensolarado']
  },
  {
    id: 'janela',
    title: 'Olhar pela janela e sentir a brisa',
    description: 'Aponte o olhar para o horizonte ou para o céu. Lembre-se do tamanho do mundo além dos seus pensamentos.',
    category: 'Alma',
    duration: '2 min',
    icon: 'Sun',
    suitedFor: ['parcialmente-nublado', 'chuvoso', 'ventania', 'ensolarado']
  }
];

export const DEMO_HISTORY = [
  {
    id: 'demo-1',
    date: '2026-11-10T08:30:00Z',
    dateFormatted: '10/11 - Terça-feira',
    weatherId: 'ensolarado',
    energyId: 'alta',
    needId: 'organizar',
    notes: 'Comecei a semana bem animado para colocar os projetos em dia.'
  },
  {
    id: 'demo-2',
    date: '2026-11-11T09:15:00Z',
    dateFormatted: '11/11 - Quarta-feira',
    weatherId: 'parcialmente-nublado',
    energyId: 'media',
    needId: 'distrair',
    notes: 'Dia mais calmo, aproveitei para dar uma volta no almoço.'
  },
  {
    id: 'demo-3',
    date: '2026-11-12T08:45:00Z',
    dateFormatted: '12/11 - Quinta-feira',
    weatherId: 'ventania',
    energyId: 'baixa',
    needId: 'descansar',
    notes: 'Muitos compromissos ao mesmo tempo, cabeça um pouco sobrecarregada.'
  },
  {
    id: 'demo-4',
    date: '2026-11-13T09:00:00Z',
    dateFormatted: '13/11 - Sexta-feira',
    weatherId: 'nublado',
    energyId: 'media',
    needId: 'momento-meu',
    notes: 'Sexta-feira reflexiva, terminei o dia com um chá quente.'
  },
  {
    id: 'demo-5',
    date: '2026-11-14T10:00:00Z',
    dateFormatted: '14/11 - Sábado',
    weatherId: 'ensolarado',
    energyId: 'muito-alta',
    needId: 'conversar',
    notes: 'Encontrei amigos queridos, me fez muito bem!'
  },
  {
    id: 'demo-6',
    date: '2026-11-15T09:30:00Z',
    dateFormatted: '15/11 - Domingo',
    weatherId: 'chuvoso',
    energyId: 'baixa',
    needId: 'descansar',
    notes: 'Dia preguiçoso de chuva lá fora e por dentro também.'
  }
];
