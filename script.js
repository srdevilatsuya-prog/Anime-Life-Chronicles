/* =========================================================
   ANIME LIFE RPG — VERSÃO v6.1 (JOJO, STANDS, CLASSES & 11 MUNDOS)
   Parte 1: Catálogos, Raridades, Stands, Classes, 11 Mundos, Áudio e Estado
========================================================= */

const SAVE_KEY = "animeLifeRPG_save_v2";
const SAVE_VERSION = 7;
const BACKUP_KEY = "animeLifeRPG_backups_v6";
const PROFILES_KEY = "animeLifeRPG_profiles_v7";
const FOCUS_TIMER_STORAGE_KEY = "animeLifeRPG_focus_timer_v6";
const CLOUD_SYNC_KEY = "animeLifeRPG_cloud_cfg_v7";

const TILE = 48;
const MAP_WIDTH = 36;
const MAP_HEIGHT = 22;
const VIEW_WIDTH = 960;
const VIEW_HEIGHT = 576;
const SPRITE_GRID = 16;
const STEP_MS = 150;

/* =========================================================
   1. SISTEMA DE RARIDADES E CATÁLOGOS DE DADOS
========================================================= */

const RARITY_META = {
  common:    { id: "common",    label: "Comum",    weight: 34,  color: "#cbd5e1", cls: "rarity-common" },
  uncommon:  { id: "uncommon",  label: "Incomum",  weight: 24,  color: "#63e6a4", cls: "rarity-uncommon" },
  rare:      { id: "rare",      label: "Rara",     weight: 18,  color: "#5da9ff", cls: "rarity-rare" },
  epic:      { id: "epic",      label: "Épica",    weight: 11,  color: "#b99aff", cls: "rarity-epic" },
  legendary: { id: "legendary", label: "Lendária", weight: 7,   color: "#f6c453", cls: "rarity-legendary" },
  mythic:    { id: "mythic",    label: "Mítica",   weight: 4.5, color: "#ff647d", cls: "rarity-mythic" },
  secret:    { id: "secret",    label: "Secreta",  weight: 1.5, color: "#54d9f5", cls: "rarity-secret" }
};

const defaultQuests = [
  { id: "school", name: "Ir à escola ou estudar", xp: 30, coins: 12, difficulty: "easy" },
  { id: "homework", name: "Fazer uma atividade escolar ou projeto", xp: 45, coins: 18, difficulty: "medium" },
  { id: "reading", name: "Ler por pelo menos 15 minutos", xp: 25, coins: 10, difficulty: "easy" },
  { id: "room", name: "Organizar o quarto e ambiente", xp: 20, coins: 10, difficulty: "easy" },
  { id: "help", name: "Ajudar em alguma tarefa de casa", xp: 30, coins: 12, difficulty: "easy" },
  { id: "learn", name: "Aprender algo novo hoje", xp: 45, coins: 18, difficulty: "medium" },
  { id: "tomorrow", name: "Planejar as metas de amanhã", xp: 25, coins: 10, difficulty: "easy" }
];

/* --- CATÁLOGO DE CLASSES COM 7 RARIDADES (ROLETA E EVOLUÇÃO) --- */
const classesCatalog = [
  {
    id: "adventurer",
    name: "Aventureiro Livre",
    rarity: "common",
    icon: "🧭",
    minLevel: 1,
    passiveText: "+8% XP e +8% Moedas em todas as atividades • +3 ATK, +15 HP",
    ultName: "Impulso do Protagonista",
    ultColor: "#54d9f5",
    ultHair: null,
    bonuses: { xpBonus: 8, coinBonus: 8, atk: 3, hp: 15, crit: 4 }
  },
  {
    id: "warrior",
    name: "Guerreiro de Vanguarda",
    rarity: "common",
    icon: "⚔️",
    minLevel: 1,
    passiveText: "+15% Dano Físico • +6 ATK, +3 DEF, +20 Vida Máxima",
    ultName: "Fúria Berserker",
    ultColor: "#ef4444",
    ultHair: null,
    bonuses: { atk: 6, def: 3, hp: 20, physBonus: 15 }
  },
  {
    id: "fighter",
    name: "Lutador Marcial",
    rarity: "common",
    icon: "🥊",
    minLevel: 1,
    passiveText: "+15% Ataques Corpo a Corpo • +5 ATK, +5 Agilidade",
    ultName: "Oito Portões Internos",
    ultColor: "#22c55e",
    ultHair: "#ef4444",
    bonuses: { atk: 5, spd: 5, hp: 15, crit: 6 }
  },
  {
    id: "tank",
    name: "Tanque Colossal",
    rarity: "uncommon",
    icon: "🛡️",
    minLevel: 1,
    passiveText: "+25% Defesa e Resistência • +10 DEF, +55 Vida Máxima",
    ultName: "Fortaleza Impenetrável",
    ultColor: "#63e6a4",
    ultHair: null,
    bonuses: { def: 10, hp: 55, atk: 3 }
  },
  {
    id: "swordsman",
    name: "Espadachim Mestre",
    rarity: "uncommon",
    icon: "🗡️",
    minLevel: 1,
    passiveText: "+20% Ataques com Espadas • +8 ATK, +10% Chance Crítica",
    ultName: "Estilo de Três Espadas: Asura",
    ultColor: "#38bdf8",
    ultHair: "#22c55e",
    bonuses: { atk: 8, spd: 4, crit: 10 }
  },
  {
    id: "assassin",
    name: "Assassino das Sombras",
    rarity: "rare",
    icon: "🗡️",
    minLevel: 1,
    passiveText: "+22% Velocidade e Esquiva • +9 ATK, +8 SPD, +18% Crítico",
    ultName: "Passo Instantâneo Letal",
    ultColor: "#a855f7",
    ultHair: "#e2e8f0",
    bonuses: { atk: 9, spd: 8, crit: 18 }
  },
  {
    id: "mage",
    name: "Mago Arcano",
    rarity: "rare",
    icon: "🔮",
    minLevel: 1,
    passiveText: "+25% Dano de Habilidades • +8 ATK, +35 Energia Máxima",
    ultName: "Mana Zone: Soberania Arcana",
    ultColor: "#60a5fa",
    ultHair: "#93c5fd",
    bonuses: { atk: 8, mp: 35, skillBonus: 25 }
  },
  {
    id: "summoner",
    name: "Invocador Espiritual",
    rarity: "epic",
    icon: "👻",
    minLevel: 1,
    passiveText: "+30% Poder de Stands e Invocações • +10 ATK, +6 DEF, +20 EN",
    ultName: "Pacto dos Espíritos Ancestrais",
    ultColor: "#c084fc",
    ultHair: "#f3e8ff",
    bonuses: { atk: 10, def: 6, mp: 20, standBonus: 30 }
  },
  {
    id: "controller",
    name: "Controlador Temporal",
    rarity: "epic",
    icon: "⏳",
    minLevel: 1,
    passiveText: "+25% Efeitos de Controle e Status • +9 ATK, +6 SPD, +25 EN",
    ultName: "Domínio do Tempo Absoluto",
    ultColor: "#38bdf8",
    ultHair: "#bae6fd",
    bonuses: { atk: 9, spd: 6, mp: 25, crit: 12, skillBonus: 20 }
  },
  {
    id: "shinobi",
    name: "Shinobi da Folha",
    rarity: "legendary",
    icon: "🍃",
    minLevel: 1,
    passiveText: "+12 ATK, +8 SPD, +20 EN • Mestre em Clones e Ninjutsu",
    ultName: "Modo Sábio dos Seis Caminhos",
    ultColor: "#ff9f43",
    ultHair: "#feca57",
    bonuses: { atk: 12, spd: 8, mp: 20, crit: 14 }
  },
  {
    id: "slayer",
    name: "Caçador Nichirin Solar",
    rarity: "legendary",
    icon: "☀️",
    minLevel: 1,
    passiveText: "+13 ATK, +35 HP, +15% Crítico • Cortes Solares Flamejantes",
    ultName: "Marca do Caçador Solar",
    ultColor: "#ff5252",
    ultHair: "#b33939",
    bonuses: { atk: 13, hp: 35, spd: 5, crit: 15 }
  },
  {
    id: "sorcerer",
    name: "Feiticeiro Jujutsu Especial",
    rarity: "legendary",
    icon: "🌑",
    minLevel: 1,
    passiveText: "+12 ATK, +35 Energia, +7 DEF • Manipulação do Infinito",
    ultName: "Expansão de Domínio: Vazio Infinito",
    ultColor: "#9c88ff",
    ultHair: "#ffffff",
    bonuses: { atk: 12, mp: 35, def: 7, skillBonus: 25 }
  },
  {
    id: "pirate",
    name: "Imperador Corsário Haki",
    rarity: "legendary",
    icon: "🏴‍☠️",
    minLevel: 1,
    passiveText: "+12 DEF, +55 HP, +15% Moedas • Haki do Conquistador",
    ultName: "Despertar: Quinto Gear",
    ultColor: "#f5f6fa",
    ultHair: "#ffffff",
    bonuses: { atk: 10, def: 12, hp: 55, coinBonus: 15 }
  },
  {
    id: "saiyan",
    name: "Guerreiro Saiyajin Divino",
    rarity: "mythic",
    icon: "🐉",
    minLevel: 1,
    passiveText: "+17 ATK, +10 DEF, +8 SPD, +18% Crítico • Ki Divino",
    ultName: "Instinto Superior Completo",
    ultColor: "#f6c453",
    ultHair: "#ffd32a",
    bonuses: { atk: 17, def: 10, spd: 8, crit: 18 }
  },
  {
    id: "stand_master",
    name: "Mestre de Stand Requiem",
    rarity: "mythic",
    icon: "🏹",
    minLevel: 1,
    passiveText: "+16 ATK, +40% Dano de Stand, +18% Crítico, +30 EN",
    ultName: "Despertar Requiem Dourado",
    ultColor: "#ec4899",
    ultHair: "#f6c453",
    bonuses: { atk: 16, mp: 30, spd: 8, crit: 18, standBonus: 40 }
  },
  {
    id: "shadow_monarch",
    name: "Monarca das Sombras",
    rarity: "secret",
    icon: "👑",
    minLevel: 1,
    passiveText: "[SECRETA] +22 ATK, +14 DEF, +12 SPD, +60 HP, +25% Crítico e +15% XP",
    ultName: "Domínio do Monarca: Erga-se!",
    ultColor: "#54d9f5",
    ultHair: "#38bdf8",
    bonuses: { atk: 22, def: 14, spd: 12, hp: 60, mp: 35, crit: 25, xpBonus: 15, standBonus: 35 }
  }
];

/* --- CATÁLOGO DE STANDS (JOJO'S BIZARRE ADVENTURE) --- */
const standsCatalog = [
  {
    id: "none",
    name: "Sem Stand Desperto",
    user: "Nenhum",
    rarity: "common",
    icon: "➖",
    cry: "...",
    color: "#64748b",
    auraColor: "#94a3b8",
    power: 0,
    mpCost: 0,
    cd: 0,
    statusEffect: "",
    bonuses: {},
    abilityName: "Nenhum",
    description: "Use a Flecha Requiem na aba Classes & Stands para despertar seu Stand espiritual!"
  },
  {
    id: "echoes",
    name: "Echoes Act 3",
    user: "Koichi Hirose",
    rarity: "uncommon",
    icon: "🔊",
    cry: "S-H-I-T! 3 FREEZE!",
    color: "#22c55e",
    auraColor: "#4ade80",
    power: 42,
    mpCost: 14,
    cd: 2,
    statusEffect: "stun",
    bonuses: { atk: 6, def: 6, spd: 5 },
    abilityName: "Act 3: Three Freeze",
    description: "Aumenta drasticamente a gravidade sobre o inimigo, causando dano e Paralisia."
  },
  {
    id: "silver_chariot",
    name: "Silver Chariot",
    user: "Jean Pierre Polnareff",
    rarity: "rare",
    icon: "🤺",
    cry: "HORA HORA HORA!",
    color: "#cbd5e1",
    auraColor: "#38bdf8",
    power: 52,
    mpCost: 16,
    cd: 2,
    statusEffect: "bleed",
    bonuses: { atk: 10, spd: 12, crit: 12 },
    abilityName: "Mil Estocadas de Prata",
    description: "Remove a armadura para desferir estocadas na velocidade da luz que causam Sangramento."
  },
  {
    id: "stone_free",
    name: "Stone Free",
    user: "Jolyne Cujoh",
    rarity: "rare",
    icon: "🧵",
    cry: "ORA ORA ORA!",
    color: "#06b6d4",
    auraColor: "#22d3ee",
    power: 50,
    mpCost: 16,
    cd: 2,
    statusEffect: "clone_shield",
    bonuses: { atk: 9, def: 9, spd: 8 },
    abilityName: "Barreira de Fios & Ora Rush",
    description: "Desfere uma rajada de socos enquanto tece uma rede protetora (Escudo ativo)."
  },
  {
    id: "crazy_diamond",
    name: "Crazy Diamond",
    user: "Josuke Higashikata",
    rarity: "epic",
    icon: "💎",
    cry: "DORA RA RA RA!",
    color: "#f472b6",
    auraColor: "#60a5fa",
    power: 62,
    mpCost: 20,
    cd: 2,
    statusEffect: "heal",
    bonuses: { atk: 13, def: 10, hp: 35 },
    abilityName: "Dora Barrage & Restauração",
    description: "Golpeia com força titânica e restaura 22% da Vida máxima do usuário."
  },
  {
    id: "gold_experience",
    name: "Gold Experience",
    user: "Giorno Giovanna",
    rarity: "epic",
    icon: "🐞",
    cry: "MUDA MUDA MUDA!",
    color: "#facc15",
    auraColor: "#f59e0b",
    power: 64,
    mpCost: 20,
    cd: 2,
    statusEffect: "heal",
    bonuses: { atk: 12, hp: 45, mp: 25 },
    abilityName: "Sopro da Vida Dourada",
    description: "Sobrecarrega os sentidos do oponente com energia vital e restaura 25% do seu HP e +15 EN."
  },
  {
    id: "killer_queen",
    name: "Killer Queen",
    user: "Kira Yoshikage",
    rarity: "legendary",
    icon: "💣",
    cry: "SHIBOON! CLICK!",
    color: "#f9a8d4",
    auraColor: "#ec4899",
    power: 76,
    mpCost: 24,
    cd: 3,
    statusEffect: "burn",
    bonuses: { atk: 16, mp: 20, crit: 16 },
    abilityName: "Primeira Bomba: Transmutação",
    description: "Transforma o alvo em uma bomba relógio, detonando com dano crítico e Queimadura intensa."
  },
  {
    id: "king_crimson",
    name: "King Crimson",
    user: "Diavolo",
    rarity: "legendary",
    icon: "👑",
    cry: "O TEMPO FOI APAGADO!",
    color: "#e11d48",
    auraColor: "#fb7185",
    power: 78,
    mpCost: 24,
    cd: 3,
    statusEffect: "bleed",
    bonuses: { atk: 17, spd: 11, crit: 18 },
    abilityName: "Corte do Tempo (Epitaph)",
    description: "Prevê e apaga 10 segundos do tempo, ativando Escudo de Previsão e causando Sangramento."
  },
  {
    id: "star_platinum",
    name: "Star Platinum",
    user: "Jotaro Kujo",
    rarity: "mythic",
    icon: "⭐",
    cry: "ORA ORA ORA ORA!",
    color: "#a855f7",
    auraColor: "#f6c453",
    power: 90,
    mpCost: 26,
    cd: 3,
    statusEffect: "stun",
    bonuses: { atk: 20, spd: 14, crit: 20 },
    abilityName: "Star Platinum: Za Warudo!",
    description: "Para o tempo com precisão sobre-humana (Paralisia) e desfere centenas de socos meteóricos!"
  },
  {
    id: "the_world",
    name: "The World (O Mundo)",
    user: "DIO",
    rarity: "mythic",
    icon: "🌍",
    cry: "MUDA MUDA! TOKI WO TOMARE!",
    color: "#eab308",
    auraColor: "#fde047",
    power: 92,
    mpCost: 26,
    cd: 3,
    statusEffect: "stun",
    bonuses: { atk: 21, def: 12, spd: 12, crit: 18 },
    abilityName: "Parar o Tempo: O Mundo!",
    requiemName: "The World Over Heaven",
    requiemPerk: "Golpes no tempo congelado ignoram defesa inimiga.",
    description: "Congela o fluxo do tempo, paralisa o inimigo e crava uma barragem de facas com Sangramento!"
  },
  {
    id: "sticky_fingers",
    name: "Sticky Fingers",
    user: "Bruno Bucciarati",
    rarity: "rare",
    icon: "🤐",
    cry: "ARI ARI ARI! ARRIVEDERCI!",
    color: "#3b82f6",
    auraColor: "#f8fafc",
    power: 58,
    mpCost: 17,
    cd: 2,
    statusEffect: "bleed",
    bonuses: { atk: 11, spd: 11, crit: 12 },
    abilityName: "Zíper Dimensional (Arrivederci)",
    requiemName: "Sticky Fingers: Zíper Infinito",
    requiemPerk: "Concede +20% Esquiva no próximo turno ao invocar.",
    description: "Abre zíperes no espaço para golpear de ângulos impossíveis e causar Sangramento."
  },
  {
    id: "hierophant_green",
    name: "Hierophant Green",
    user: "Noriaki Kakyoin",
    rarity: "uncommon",
    icon: "🟢",
    cry: "EMERALD SPLASH!",
    color: "#10b981",
    auraColor: "#34d399",
    power: 46,
    mpCost: 14,
    cd: 2,
    statusEffect: "drain",
    bonuses: { atk: 8, mp: 20, def: 6 },
    abilityName: "Barreira de 20 Metros (Emerald Splash)",
    requiemName: "Hierophant: Teia Esmeralda",
    requiemPerk: "Drena +12 Energia além de restaurar Vida.",
    description: "Dispara uma tempestade de esmeraldas espirituais e drena vitalidade para o usuário."
  },
  {
    id: "tusk_act4",
    name: "Tusk Act 4",
    user: "Johnny Joestar",
    rarity: "legendary",
    icon: "🌀",
    cry: "CHUMIMI-IN! ORA ORA!",
    color: "#ec4899",
    auraColor: "#38bdf8",
    power: 84,
    mpCost: 24,
    cd: 3,
    statusEffect: "bleed",
    bonuses: { atk: 18, spd: 10, crit: 20 },
    abilityName: "Rotação Áurea Infinita",
    requiemName: "Act 4: Spin Dimensional",
    requiemPerk: "Atravessa 100% dos Escudos e reduções de Defesa!",
    description: "Espiral infinita baseada na Proporção Áurea que perfura barreiras absolutas."
  },
  {
    id: "made_in_heaven",
    name: "Made in Heaven",
    user: "Enrico Pucci",
    rarity: "secret",
    icon: "⏱️",
    cry: "ACELERAÇÃO DO UNIVERSO!",
    color: "#f8fafc",
    auraColor: "#a855f7",
    power: 98,
    mpCost: 28,
    cd: 3,
    statusEffect: "freeze",
    bonuses: { atk: 20, spd: 20, crit: 22, mp: 30 },
    abilityName: "Singularidade Gravitacional",
    requiemName: "Novo Universo: Velocidade Infinita",
    requiemPerk: "Reduz em -1 turno o Cooldown de todas as habilidades equipadas!",
    description: "[SECRETO] Acelera o tempo cósmico, congela reações inimigas e eleva a velocidade ao limite."
  }
];

/* --- IDENTIDADES E PASSIVAS DE COMBATE POR CLASSE --- */
const CLASS_PERKS = {
  adventurer:     { critMult: 1.70, comboBonus: 0.06, signatureSkillId: "clones", combatLabel: "Protagonista Versátil (+Combo)" },
  warrior:        { critMult: 1.75, bleedOnCrit: true, signatureSkillId: "antimagic", combatLabel: "Brutalidade: Críticos aplicam Sangramento" },
  fighter:        { critMult: 1.85, rageGainMult: 1.35, signatureSkillId: "leadership", combatLabel: "Lutador Marcial (+35% Despertar & Crítico)" },
  tank:           { damageReduction: 0.14, counterOnDefend: true, signatureSkillId: "haki", combatLabel: "Bastião (-14% Dano & Contra-ataque ao Defender)" },
  swordsman:      { critMult: 1.90, bleedOnAttack: 0.25, signatureSkillId: "water", combatLabel: "Mestre da Lâmina (Crítico 1.9x + Sangramento)" },
  assassin:       { firstStrikeBonus: 0.28, critMult: 1.95, signatureSkillId: "chidori", combatLabel: "Emboscada Letal (+28% no 1º Turno & Crítico)" },
  mage:           { mpRefundOnCrit: 0.30, skillPowerMult: 1.18, signatureSkillId: "kamehameha", combatLabel: "Fluxo Arcano (+18% Poder & +30% EN em Críticos)" },
  summoner:       { standCdBonus: 1, standPowerMult: 1.25, signatureSkillId: "ora_barrage", combatLabel: "Elo Espiritual (-1t Recarga de Stand & +25% Dano)" },
  controller:     { statusExtend: true, skillPowerMult: 1.15, signatureSkillId: "hyorinmaru_freeze", combatLabel: "Controle Absoluto (+15% Poder & Status Aprimorados)" },
  shinobi:        { dodgeBonus: 0.10, comboBonus: 0.08, signatureSkillId: "rasengan", combatLabel: "Ninjutsu Rápido (+10% Esquiva & Combos Velozes)" },
  slayer:         { critMult: 1.85, shatterBonus: 0.20, signatureSkillId: "sun", combatLabel: "Respiração Solar (Queima & Estilhaça +20%)" },
  sorcerer:       { mpRefundOnCrit: 0.35, shieldOnUlt: 80, signatureSkillId: "blackflash", combatLabel: "Domínio Jujutsu (Escudo no Despertar & Black Flash)" },
  pirate:         { damageReduction: 0.12, rageGainMult: 1.25, signatureSkillId: "elastic", combatLabel: "Haki do Rei (-12% Dano & +25% Fúria)" },
  saiyan:         { rageGainMult: 1.40, lowHpEnrage: 0.30, signatureSkillId: "saiyan", combatLabel: "Sangue Saiyajin (+30% ATK abaixo de 50% HP)" },
  stand_master:   { standCdBonus: 1, standPowerMult: 1.35, signatureSkillId: "za_warudo", combatLabel: "Ressonância Requiem (+35% Dano de Stand)" },
  shadow_monarch: { shadowFollowUp: true, critMult: 1.95, damageReduction: 0.10, signatureSkillId: "shadow_arise", combatLabel: "Exército das Sombras (Cavaleiro Sombrio a cada 3 golpes)" }
};

/* --- ÁRVORE DE HABILIDADES (INCLUINDO JOJO'S BIZARRE ADVENTURE) --- */
const skills = [
  { id: "clones", name: "Jutsu dos Clones", anime: "Naruto", icon: "影", description: "Cria clones que atacam em grupo e formam um Escudo de Clones.", cost: 100, level: 2, mpCost: 12, power: 28, cd: 2, animType: "clones", statusEffect: "clone_shield", effectColor: "#54d9f5", passive: { spd: 2, xpBonus: 5 }, passiveText: "+2 SPD • +5% XP • Efeito: Escudo" },
  { id: "rasengan", name: "Rasengan", anime: "Naruto", icon: "🌀", description: "Esfera espiral de chakra puro que quebra a defesa inimiga.", cost: 180, level: 4, mpCost: 18, power: 46, cd: 2, animType: "sphere", statusEffect: "bleed", effectColor: "#38b6ff", passive: { atk: 4 }, passiveText: "+4 ATK • Efeito: Quebra-Guarda" },
  { id: "chidori", name: "Chidori", anime: "Naruto", icon: "⚡", description: "Raios concentrados que perfuram e têm alta chance de Paralisar.", cost: 220, level: 5, mpCost: 22, power: 54, cd: 3, animType: "lightning", statusEffect: "stun", effectColor: "#70e2ff", passive: { atk: 3, spd: 3 }, passiveText: "+3 ATK • +3 SPD • Efeito: Paralisia" },
  { id: "kamehameha", name: "Kamehameha", anime: "Dragon Ball", icon: "💥", description: "Feixe contínuo devastador de energia espiritual.", cost: 180, level: 3, mpCost: 20, power: 48, cd: 2, animType: "beam", statusEffect: "burn", effectColor: "#48dbfb", passive: { atk: 3, mp: 10 }, passiveText: "+3 ATK • +10 EN • Efeito: Feixe" },
  { id: "saiyan", name: "Impacto Saiyajin", anime: "Dragon Ball", icon: "🔥", description: "Explosão dourada que incendeia o campo e queima o oponente.", cost: 250, level: 5, mpCost: 24, power: 58, cd: 3, animType: "beam", statusEffect: "burn", effectColor: "#f6c453", passive: { atk: 5, def: 3 }, passiveText: "+5 ATK • +3 DEF • Efeito: Queimadura" },
  { id: "hamon_overdrive", name: "Sunlight Yellow Overdrive", anime: "JoJo's Bizarre Adventure", icon: "☀️", description: "Ondas solares de Hamon que queimam vampiros e restauram vigor.", cost: 140, level: 2, mpCost: 15, power: 42, cd: 2, animType: "lightning", statusEffect: "burn", effectColor: "#facc15", passive: { atk: 4, hp: 20 }, passiveText: "+4 ATK • +20 HP • Efeito: Queimadura Solar" },
  { id: "ora_barrage", name: "Rajada Ora Ora!", anime: "JoJo's Bizarre Adventure", icon: "👊", description: "Dezenas de socos espirituais ultrarrápidos com impacto crítico.", cost: 210, level: 4, mpCost: 20, power: 58, cd: 2, animType: "stand_rush", statusEffect: "bleed", effectColor: "#a855f7", passive: { atk: 6, spd: 4 }, passiveText: "+6 ATK • +4 SPD • Efeito: Rajada de Stand" },
  { id: "za_warudo", name: "Parar o Tempo: O Mundo", anime: "JoJo's Bizarre Adventure", icon: "⏱️", description: "Congela o tempo ao redor do inimigo, paralisando-o completamente.", cost: 320, level: 6, mpCost: 28, power: 74, cd: 3, animType: "time_stop", statusEffect: "stun", effectColor: "#fde047", passive: { atk: 7, spd: 5 }, passiveText: "+7 ATK • +5 SPD • Efeito: Parar Tempo (Stun)" },
  { id: "killer_bomb", name: "Primeira Bomba: Killer Queen", anime: "JoJo's Bizarre Adventure", icon: "💣", description: "Detonação espiritual que incinera a defesa adversária.", cost: 260, level: 5, mpCost: 24, power: 64, cd: 3, animType: "sphere", statusEffect: "burn", effectColor: "#ec4899", passive: { atk: 6, mp: 15 }, passiveText: "+6 ATK • +15 EN • Efeito: Explosão" },
  { id: "emerald_splash", name: "Emerald Splash", anime: "JoJo's Bizarre Adventure", icon: "💚", description: "Disparo concentrado de esmeraldas espirituais de longo alcance.", cost: 160, level: 3, mpCost: 16, power: 45, cd: 2, animType: "beam", statusEffect: "bleed", effectColor: "#10b981", passive: { atk: 4, mp: 12 }, passiveText: "+4 ATK • +12 EN • Efeito: Rajada Esmeralda" },
  { id: "cursed", name: "Punho Divergente", anime: "Jujutsu Kaisen", icon: "🌑", description: "Golpe com duplo impacto de energia amaldiçoada.", cost: 100, level: 2, mpCost: 14, power: 32, cd: 1, animType: "sphere", statusEffect: "bleed", effectColor: "#7d5fff", passive: { atk: 2, mp: 8 }, passiveText: "+2 ATK • +8 EN • Efeito: Dano Duplo" },
  { id: "blackflash", name: "Black Flash", anime: "Jujutsu Kaisen", icon: "⚫", description: "Relâmpago negro espacial que paralisa o inimigo com impacto crítico.", cost: 250, level: 5, mpCost: 25, power: 62, cd: 3, animType: "lightning", statusEffect: "stun", effectColor: "#ff3860", passive: { atk: 6 }, passiveText: "+6 ATK • Efeito: Paralisia" },
  { id: "haki", name: "Haki do Armamento", anime: "One Piece", icon: "👁️", description: "Endurece o corpo, golpeando forte e ativando proteção.", cost: 150, level: 3, mpCost: 16, power: 38, cd: 2, animType: "sphere", statusEffect: "clone_shield", effectColor: "#ff6b6b", passive: { def: 5, hp: 15 }, passiveText: "+5 DEF • +15 HP • Efeito: Escudo" },
  { id: "elastic", name: "Gomu Gomu Bazooka", anime: "One Piece", icon: "🌀", description: "Impulso elástico duplo que atordoa o adversário.", cost: 200, level: 4, mpCost: 18, power: 45, cd: 2, animType: "sphere", statusEffect: "stun", effectColor: "#ff9f43", passive: { hp: 20, spd: 2 }, passiveText: "+20 HP • +2 SPD • Efeito: Atordoar" },
  { id: "bankai", name: "Bankai: Getsuga", anime: "Bleach", icon: "⚔️", description: "Onda cortante espiritual que causa Sangramento profundo.", cost: 300, level: 6, mpCost: 28, power: 68, cd: 3, animType: "slash", statusEffect: "bleed", effectColor: "#a29bfe", passive: { atk: 6, spd: 3 }, passiveText: "+6 ATK • +3 SPD • Efeito: Sangramento" },
  { id: "water", name: "Respiração da Água", anime: "Demon Slayer", icon: "🌊", description: "Corte fluido em arco que abre a guarda inimiga.", cost: 150, level: 3, mpCost: 15, power: 40, cd: 2, animType: "slash", statusEffect: "bleed", effectColor: "#00d2d3", passive: { def: 3, spd: 3 }, passiveText: "+3 DEF • +3 SPD • Efeito: Sangramento" },
  { id: "sun", name: "Hinokami Kagura", anime: "Demon Slayer", icon: "☀️", description: "Dança do Deus do Fogo que aplica Queimadura solar.", cost: 300, level: 6, mpCost: 28, power: 70, cd: 3, animType: "slash", statusEffect: "burn", effectColor: "#ff6348", passive: { atk: 7, hp: 15 }, passiveText: "+7 ATK • +15 HP • Efeito: Queimadura" },
  { id: "oneforall", name: "One For All: Smash", anime: "My Hero Academia", icon: "💚", description: "Soco de pressão atmosférica com relâmpagos esmeralda.", cost: 250, level: 5, mpCost: 24, power: 60, cd: 3, animType: "lightning", statusEffect: "stun", effectColor: "#2ed573", passive: { atk: 4, hp: 25 }, passiveText: "+4 ATK • +25 HP • Efeito: Paralisia" },
  { id: "antimagic", name: "Corte Anti-Magia", anime: "Black Clover", icon: "🖤", description: "Espada pesada que anula magia e causa Sangramento.", cost: 200, level: 4, mpCost: 18, power: 47, cd: 2, animType: "slash", statusEffect: "bleed", effectColor: "#e84118", passive: { atk: 4, def: 2 }, passiveText: "+4 ATK • +2 DEF • Efeito: Sangramento" },
  { id: "darkmagic", name: "Corte Dimensional", anime: "Black Clover", icon: "🌘", description: "Lâmina de trevas que corta o próprio espaço.", cost: 250, level: 5, mpCost: 24, power: 58, cd: 3, animType: "slash", statusEffect: "bleed", effectColor: "#9c88ff", passive: { atk: 5, mp: 12 }, passiveText: "+5 ATK • +12 EN • Efeito: Sangramento" },
  { id: "leadership", name: "Investida da Gangue", anime: "Tokyo Revengers", icon: "👊", description: "Ataque coordenado que inspira proteção e moedas extras.", cost: 100, level: 2, mpCost: 12, power: 30, cd: 2, animType: "clones", statusEffect: "clone_shield", effectColor: "#feca57", passive: { coinBonus: 10, hp: 15 }, passiveText: "+10% Moedas • +15 HP • Escudo" },
  { id: "athletic", name: "Sprint Hidrodinâmico", anime: "Free!", icon: "🏊", description: "Avanço veloz em múltiplas imagens que protege o usuário.", cost: 100, level: 2, mpCost: 12, power: 29, cd: 2, animType: "clones", statusEffect: "clone_shield", effectColor: "#48dbfb", passive: { xpBonus: 8, spd: 3 }, passiveText: "+8% XP • +3 SPD • Escudo" },
  // Novas Habilidades Táticas Elementais (v6: Freeze, Poison, Drain)
  { id: "hyorinmaru_freeze", name: "Prisão Glacial (Freeze)", anime: "Bleach", icon: "❄️", description: "Congela o oponente (perde o turno). O próximo golpe pesado ou de fogo causa Estilhaçar (+50% Dano)!", cost: 220, level: 4, mpCost: 20, power: 54, cd: 3, animType: "sphere", statusEffect: "freeze", effectColor: "#38bdf8", passive: { atk: 5, def: 4 }, passiveText: "+5 ATK • +4 DEF • Efeito: Congelar (Shatter)" },
  { id: "shinobu_poison", name: "Dança da Borboleta: Veneno", anime: "Demon Slayer", icon: "🦋", description: "Estocada veloz de glicínia que aplica Veneno Cumulativo (até 5x stacks) e reduz o ataque inimigo.", cost: 190, level: 3, mpCost: 16, power: 46, cd: 2, animType: "slash", statusEffect: "poison", effectColor: "#a855f7", passive: { spd: 5, atk: 4 }, passiveText: "+5 SPD • +4 ATK • Efeito: Veneno (Stacks)" },
  { id: "vampiric_drain", name: "Absorção Sanguínea (Drain)", anime: "JoJo's Bizarre Adventure", icon: "🧛", description: "Drena a energia vital do inimigo, convertendo 45% do dano causado em HP (excedente vira Escudo)!", cost: 240, level: 5, mpCost: 22, power: 58, cd: 2, animType: "beam", statusEffect: "drain", drainPct: 0.45, effectColor: "#e11d48", passive: { hp: 30, atk: 5 }, passiveText: "+30 HP • +5 ATK • Efeito: Roubo de Vida 45%" },
  // Técnicas do Dojo & Novos Mundos / Classes
  { id: "dojo_breath", name: "Respiração do Dojo", anime: "Demon Slayer", icon: "🌬️", description: "Técnica disciplinada desbloqueada pelo Dojo que cura vigor e aplica Escudo de Clones.", cost: 0, level: 1, dojoUnlockLevel: 2, mpCost: 14, power: 36, cd: 2, animType: "clones", statusEffect: "clone_shield", effectColor: "#38bdf8", passive: { def: 4, hp: 20 }, passiveText: "+4 DEF • +20 HP • Técnica do Dojo Nv.2" },
  { id: "dojo_iron_body", name: "Corpo de Aço Tekkai", anime: "One Piece", icon: "🔩", description: "Impacto pesado do Dojo Nv.4 que racha armaduras e causa Sangramento.", cost: 0, level: 1, dojoUnlockLevel: 4, mpCost: 18, power: 52, cd: 2, animType: "slash", statusEffect: "bleed", effectColor: "#fbbf24", passive: { atk: 5, def: 5 }, passiveText: "+5 ATK • +5 DEF • Técnica do Dojo Nv.4" },
  { id: "dojo_godspeed", name: "Velocidade Divina: Kanmuru", anime: "Hunter x Hunter", icon: "⚡", description: "Descarga neural de Nen do Dojo Nv.6 que paralisa instantaneamente.", cost: 0, level: 1, dojoUnlockLevel: 6, mpCost: 24, power: 68, cd: 3, animType: "lightning", statusEffect: "stun", effectColor: "#60a5fa", passive: { spd: 7, crit: 5 }, passiveText: "+7 SPD • +5% CRIT • Técnica do Dojo Nv.6" },
  { id: "zipper_ambush", name: "Emboscada de Zíper", anime: "JoJo's Bizarre Adventure", icon: "🤐", description: "Cria portais de zíper com Sticky Fingers para ataque crítico e Sangramento.", cost: 200, level: 4, mpCost: 18, power: 52, cd: 2, animType: "slash", statusEffect: "bleed", effectColor: "#3b82f6", passive: { atk: 5, spd: 4 }, passiveText: "+5 ATK • +4 SPD • Efeito: Sangramento" },
  { id: "infinite_rotation", name: "Rotação Infinita (Spin)", anime: "JoJo's Bizarre Adventure", icon: "🌀", description: "Energia áurea de Johnny Joestar que drena e perfura qualquer barreira.", cost: 340, level: 7, mpCost: 26, power: 78, cd: 3, animType: "sphere", statusEffect: "drain", drainPct: 0.35, effectColor: "#ec4899", passive: { atk: 8, crit: 6 }, passiveText: "+8 ATK • +6% CRIT • Dreno Áureo" },
  { id: "wano_enma", name: "Estilo Rei do Inferno: Enma", anime: "One Piece", icon: "🐉", description: "Corte avassalador com Haki Avançado que incinera a arena.", cost: 360, level: 8, mpCost: 28, power: 82, cd: 3, animType: "slash", statusEffect: "burn", effectColor: "#a855f7", passive: { atk: 9, hp: 30 }, passiveText: "+9 ATK • +30 HP • Haki do Conquistador" },
  { id: "shadow_arise", name: "Extração das Sombras: Erga-se!", anime: "Solo Leveling", icon: "👤", description: "Comanda Igris e soldados sombrios para devorar a vida do chefe!", cost: 420, level: 10, mpCost: 30, power: 92, cd: 3, animType: "stand_rush", statusEffect: "drain", drainPct: 0.40, effectColor: "#38bdf8", passive: { atk: 12, spd: 6, crit: 6 }, passiveText: "+12 ATK • +6 SPD • +6% CRIT" }
];

const animeUniverses = [
  { name: "JoJo's Bizarre Adventure", icon: "⭐", description: "Stands espirituais, Flecha Requiem, Hamon, Cairo noturno e batalhas táticas bizarras!", zoneId: "cairo", bossId: "dio_world" },
  { name: "Naruto", icon: "🍃", description: "Ninjas, chakra, técnicas elementais e a Vontade do Fogo.", zoneId: "village", bossId: "rogue_jonin" },
  { name: "My Hero Academia", icon: "🦸", description: "Heróis profissionais, individualidades e proteção da metrópole.", zoneId: "heroes", bossId: "nomu_titan" },
  { name: "One Piece", icon: "🏴‍☠️", description: "Piratas, Haki, Akuma no Mi e aventuras pela Grand Line.", zoneId: "pirates", bossId: "sea_emperor" },
  { name: "Demon Slayer", icon: "🌊", description: "Caçadores de Onis, espadas Nichirin e técnicas de respiração.", zoneId: "forest", bossId: "upper_demon" },
  { name: "Jujutsu Kaisen", icon: "🌑", description: "Feiticeiros Jujutsu, Expansão de Domínio e energia amaldiçoada em Shibuya.", zoneId: "shibuya", bossId: "special_curse" },
  { name: "Bleach", icon: "⚔️", description: "Shinigamis, Zanpakutōs, Bankai e a Sociedade das Almas (Seireitei).", zoneId: "seireitei", bossId: "hollow_lord" },
  { name: "Dragon Ball", icon: "🐉", description: "Guerreiros Z, Ki divino, torneios celestiais e transformações Saiyajin.", zoneId: "temple", bossId: "cosmic_warrior" },
  { name: "Fullmetal Alchemist", icon: "⚗️", description: "Alquimia Estatal, círculos de transmutação, Troca Equivalente e a Pedra Filosofal!", zoneId: "alchemy_central", bossId: "homunculus_pride" },
  { name: "Attack on Titan", icon: "🛡️", description: "Tropa de Exploração, equipamento DMT, defesa das Muralhas e Titãs primordiais!", zoneId: "wall_maria", bossId: "armored_titan" },
  { name: "Hunter x Hunter", icon: "❄️", description: "Caçadores de elite, domínio de Nen, Torre Celestial e desafios estratégicos!", zoneId: "nen_tower", bossId: "phantom_leader" },
  { name: "One Piece: Wano", icon: "🐉", description: "País dos Samurais fechados, espadas amaldiçoadas Enma e o Yonkou Kaidou!", zoneId: "wano", bossId: "kaido_beast" },
  { name: "Black Clover", icon: "🍀", description: "Grimórios de 5 folhas, esquadrões de cavaleiros mágicos e demônios!", zoneId: "clover_kingdom", bossId: "megicula_devil" },
  { name: "Solo Leveling", icon: "👑", description: "Portais S-Rank, Extração de Sombras, Igris e o Monarca dos Caçadores!", zoneId: "monarch_gate", bossId: "ant_king_beru" },
  { name: "Tokyo Revengers", icon: "🏍️", description: "Liderança, lealdade inabalável e coragem para mudar o futuro.", zoneId: "heroes", bossId: "nomu_titan" },
  { name: "Free!", icon: "🏊", description: "Treinamento atlético, foco mental, velocidade e trabalho em equipe.", zoneId: "pirates", bossId: "sea_emperor" }
];

const titlesCatalog = [
  { id: "novice", name: "Iniciante", reqText: "Disponível desde o início", check: () => true },
  { id: "genin", name: "Genin Dedicado", reqText: "Conclua 5 missões reais", check: g => g.totalCompleted >= 5 },
  { id: "focus_monk", name: "Mestre do Foco", reqText: "Acumule 15 minutos no Pomodoro RPG", check: g => (g.focusMinutes || 0) >= 15 },
  { id: "stand_user", name: "Portador de Stand", reqText: "Desperte qualquer Stand de JoJo", check: g => (g.unlockedStands || []).length >= 1 },
  { id: "slayer", name: "Caçador de Onis", reqText: "Vença 3 batalhas na Arena ou Mapa", check: g => g.battlesWon >= 3 },
  { id: "hero", name: "Herói Profissional", reqText: "Alcance o Nível 5", check: g => g.level >= 5 },
  { id: "pirate_king", name: "Rei dos Mares", reqText: "Explore pelo menos 4 regiões", check: g => g.visitedZones.length >= 4 },
  { id: "saiyan_legend", name: "Super Guerreiro", reqText: "Alcance o Nível 10", check: g => g.level >= 10 },
  { id: "crusader", name: "Cruzado Estelar", reqText: "Derrote DIO no Cairo Bizarro", check: g => (g.defeatedBosses || []).includes("dio_world") },
  { id: "streak_hero", name: "Vontade de Ferro", reqText: "Alcance 7 dias de sequência ou 14D em qualquer Hábito", check: g => g.bestStreak >= 7 || (g.dailies || []).some(d => d.bestStreak >= 7) },
  { id: "guild_commander", name: "Comandante de Guilda", reqText: "Eleve sua Guilda ao Nível 3", check: g => (g.guild && g.guild.level >= 3) },
  { id: "multiverse_master", name: "Lenda do Multiverso", reqText: "Derrote 6 Chefes de Universo ou Mundiais", check: g => (g.defeatedBosses || []).length >= 6 }
];

const companionsCatalog = [
  { id: "none", name: "Nenhum Companheiro", icon: "➖", bonusText: "Sem bônus ativo", color: "#888888", combatRole: "none", combatDesc: "Sem assistência em batalha.", unlocked: () => true },
  { id: "fox", name: "Kitsune de Chakra", icon: "🦊", bonusText: "+3 Ataque em combate", color: "#ff7f50", atk: 3, combatRole: "fire_assist", combatDesc: "Dispara Chamas de Raposa nos golpes!", unlocked: () => true },
  { id: "iggy", name: "Iggy (The Fool)", icon: "🐶", bonusText: "+4 ATK e +3 SPD", color: "#f6c453", atk: 4, spd: 3, combatRole: "sand_shield", combatDesc: "Cria barreiras de areia em turnos críticos!", unlocked: g => g.level >= 2 || (g.unlockedStands || []).length >= 1 },
  { id: "slime", name: "Slime Tempestade", icon: "💧", bonusText: "+15 Vida Máxima", color: "#54d9f5", hp: 15, combatRole: "heal_pulse", combatDesc: "Regenera HP do herói periodicamente!", unlocked: g => g.level >= 2 },
  { id: "crow", name: "Corvo Kasugai", icon: "🐦‍⬛", bonusText: "+4 Agilidade e Esquiva", color: "#a29bfe", spd: 4, combatRole: "crit_scout", combatDesc: "Revela pontos fracos elevando o dano em combate!", unlocked: g => g.totalCompleted >= 5 },
  { id: "chopper", name: "Chopper (Médico)", icon: "🦌", bonusText: "+25 HP e +5 DEF", color: "#f472b6", hp: 25, def: 5, combatRole: "heal_pulse", combatDesc: "Prepara Rumble Balls para curar HP + EN no combate!", unlocked: g => g.level >= 4 || (g.potionsBrewed || 0) >= 1 },
  { id: "pochita", name: "Pochita (Motosserra)", icon: "🪚", bonusText: "+7 ATK e +5% Crítico", color: "#fb923c", atk: 7, crit: 5, combatRole: "bleed_bite", combatDesc: "Ataca junto causando cortes extras e Sangramento!", unlocked: g => g.battlesWon >= 5 },
  { id: "dragon", name: "Mini Shenlong", icon: "🐲", bonusText: "+6 Ataque e +6 Defesa", color: "#63e6a4", atk: 6, def: 6, combatRole: "dragon_roar", combatDesc: "Libera Sopro Esmeralda dracônico + Energia!", unlocked: g => g.level >= 6 || (g.defeatedBosses || []).length >= 1 },
  { id: "tusk_mini", name: "Tusk Act 1 (Spin)", icon: "🌸", bonusText: "+8 ATK, +6 SPD", color: "#ec4899", atk: 8, spd: 6, combatRole: "spin_shot", combatDesc: "Dispara unhas giratórias que ignoram armadura!", unlocked: g => (g.unlockedStands || []).length >= 3 || g.level >= 8 }
];

/* --- MONTARIAS, GUILDAS, RANKING, EVENTOS E MISSÕES JOJO --- */
const mountsCatalog = [
  { id: "none", name: "A Pé", icon: "🥾", speedMult: 1.0, priceCoins: 0, priceGems: 0, desc: "Exploração padrão a pé.", color: "#94a3b8", bonuses: {} },
  { id: "pakkun_hound", name: "Cão Ninja Ninken", icon: "🐕", speedMult: 1.30, priceCoins: 140, priceGems: 0, desc: "+30% Velocidade no Mapa • +4 SPD, +3 ATK.", color: "#d97706", bonuses: { spd: 4, atk: 3 } },
  { id: "kintoun", name: "Nuvem Voadora (Kinto'un)", icon: "☁️", speedMult: 1.42, priceCoins: 240, priceGems: 3, desc: "Para corações puros! +42% Velocidade no Mapa • +6 SPD, +15 EN.", color: "#fde047", bonuses: { spd: 6, mp: 15 } },
  { id: "shibuya_bike", name: "Moto Tática de Tóquio", icon: "🏍️", speedMult: 1.52, priceCoins: 340, priceGems: 5, desc: "+52% Velocidade no Mapa • +8 SPD, +35 HP, +5 ATK.", color: "#ef4444", bonuses: { spd: 8, hp: 35, atk: 5 } },
  { id: "dmt_gear", name: "Propulsor DMT (Muralha)", icon: "🪝", speedMult: 1.60, priceCoins: 420, priceGems: 7, desc: "+60% Velocidade no Mapa • +10 SPD, +6 ATK, +6% CRIT.", color: "#22c55e", bonuses: { spd: 10, atk: 6, crit: 6 } },
  { id: "igris_steed", name: "Dracônico Sombrio Kaisel", icon: "🦇", speedMult: 1.72, priceCoins: 580, priceGems: 10, desc: "+72% Velocidade no Mapa • +10 ATK, +12 SPD, +50 HP.", color: "#6366f1", bonuses: { atk: 10, spd: 12, hp: 50 } },
  { id: "shenlong_flight", name: "Dragão Celeste Shenlong", icon: "🐉", speedMult: 1.85, priceCoins: 800, priceGems: 15, desc: "+85% Velocidade no Mapa • +12 ATK, +10 DEF, +14 SPD, +10% XP.", color: "#10b981", bonuses: { atk: 12, def: 10, spd: 14, xpBonus: 10 } }
];

const guildsCatalog = [
  { id: "scout_corps", name: "Tropa de Exploração", icon: "🕊️", emblemColor: "#15803d", bonusDesc: "+8% XP em Missões & +4 SPD por Nível de Guilda", bonusType: "xp_spd" },
  { id: "passione", name: "Gangue Passione (JoJo)", icon: "🐞", emblemColor: "#f59e0b", bonusDesc: "+10% Moedas & +5 ATK por Nível de Guilda", bonusType: "coins_atk" },
  { id: "tokyo_jujutsu", name: "Escola Jujutsu de Tóquio", icon: "🤞", emblemColor: "#6366f1", bonusDesc: "+8% Poder de Habilidades & +10 EN por Nível", bonusType: "skill_mp" },
  { id: "ahjin_guild", name: "Guilda Ahjin (Solo S-Rank)", icon: "👑", emblemColor: "#38bdf8", bonusDesc: "+6 ATK, +4 DEF e +5% Crítico por Nível", bonusType: "combat_all" }
];

const guildMissionsCatalog = [
  { id: "gm_routines", name: "Disciplina Coletiva: Conclua 5 Missões/Hábitos", progress: g => g.totalCompleted, target: 5, guildXp: 80, coins: 120, gems: 3, spins: 1 },
  { id: "gm_focus", name: "Concentração da Guilda: Acumule 20 Minutos de Foco", progress: g => g.focusMinutes || 0, target: 20, guildXp: 100, coins: 150, gems: 3, spins: 1 },
  { id: "gm_battles", name: "Frente de Batalha: Vença 6 Combates", progress: g => g.battlesWon, target: 6, guildXp: 120, coins: 180, gems: 4, spins: 1 },
  { id: "gm_bosses", name: "Caçada S-Rank: Derrote 3 Chefes", progress: g => (g.defeatedBosses || []).length, target: 3, guildXp: 160, coins: 260, gems: 6, spins: 2 }
];

const eventsCatalog = [
  {
    id: "evt_cairo_bloodmoon",
    name: "Noite Escarlate do Cairo",
    badge: "🌙 EVENTO DE JOJO",
    desc: "A influência de DIO intensificou os Stands! Missões e combates concedem recompensas temáticas de JoJo.",
    bossId: "dio_world",
    rewardTitle: "Caçador da Lua Escarlate",
    rewardItemId: "stand_arrow_item",
    missions: [
      { id: "ev_cairo_1", name: "Despertar do Destino: Vença 2 combates no Cairo/Arena", check: g => g.battlesWon >= 2, xp: 140, coins: 150, gems: 4 },
      { id: "ev_cairo_2", name: "Foco Sob o Luar: Conclua 1 sessão Pomodoro ou 2 Hábitos", check: g => (g.focusMinutes || 0) >= 1 || g.totalCompleted >= 2, xp: 160, coins: 180, gems: 5 }
    ]
  },
  {
    id: "evt_shiganshina_siege",
    name: "Cerco às Muralhas de Shiganshina",
    badge: "🛡️ EVENTO TITÃ",
    desc: "Titãs cercam a Muralha Maria! Defenda a humanidade derrotando chefes e mantendo sua sequência de hábitos.",
    bossId: "armored_titan",
    rewardTitle: "Lâmina da Tropa",
    rewardItemId: "streak_freeze",
    missions: [
      { id: "ev_aot_1", name: "Prontidão Total: Complete 3 missões ou treinos no Dojo", check: g => (g.totalCompleted + (g.totalDojoTrains || 0)) >= 3, xp: 150, coins: 160, gems: 4 },
      { id: "ev_aot_2", name: "Quebra de Blindagem: Vença o Titã Encouraçado", check: g => (g.defeatedBosses || []).includes("armored_titan"), xp: 280, coins: 300, gems: 8 }
    ]
  },
  {
    id: "evt_monarch_gate",
    name: "Portal S-Rank: Despertar das Sombras",
    badge: "👑 EVENTO MUNDIAL",
    desc: "Um Portal Vermelho apareceu em Seul! Derrote o Cavaleiro Sombrio Igris e alcance o topo do Ranking.",
    bossId: "igris_blood_red",
    rewardTitle: "Sombra Carmesim",
    rewardItemId: "demon_dweller",
    missions: [
      { id: "ev_sl_1", name: "Subida de Rank: Alcance Nível 5+", check: g => g.level >= 5, xp: 200, coins: 220, gems: 6 },
      { id: "ev_sl_2", name: "Sombra Leal: Derrote Igris, Cavaleiro Vermelho", check: g => (g.defeatedBosses || []).includes("igris_blood_red"), xp: 340, coins: 360, gems: 10 }
    ]
  }
];

const jojoQuestsCatalog = [
  { id: "jq_stardust", name: "Cruzados Estelares: Desperte 1 Stand & Vença 2 Batalhas", target: 3, progress: g => ((g.unlockedStands || []).length >= 1 ? 1 : 0) + Math.min(2, g.battlesWon), xp: 150, coins: 120, gems: 4, arrows: 1 },
  { id: "jq_golden_wind", name: "Vento Áureo: Evolua qualquer Stand para Estágio 2+ ou desperte 3 Stands", target: 1, progress: g => ((g.unlockedStands || []).length >= 3 || Object.values(g.standLevels || {}).some(v => v >= 2) ? 1 : 0), xp: 240, coins: 200, gems: 6, arrows: 1 },
  { id: "jq_over_heaven", name: "Over Heaven: Derrote DIO — Mestre d'O Mundo", target: 1, progress: g => ((g.defeatedBosses || []).includes("dio_world") ? 1 : 0), xp: 360, coins: 300, gems: 10, arrows: 2 }
];

const rankingRivalsCatalog = [
  { name: "Sung Jin-Woo", anime: "Solo Leveling", level: 18, power: 720, bosses: 9, achievements: 18 },
  { name: "Satoru Gojo", anime: "Jujutsu Kaisen", level: 16, power: 640, bosses: 8, achievements: 16 },
  { name: "Son Goku", anime: "Dragon Ball", level: 15, power: 610, bosses: 7, achievements: 15 },
  { name: "Jotaro Kujo", anime: "JoJo's Bizarre Adventure", level: 14, power: 520, bosses: 6, achievements: 14 },
  { name: "Ichigo Kurosaki", anime: "Bleach", level: 12, power: 440, bosses: 5, achievements: 12 },
  { name: "Monkey D. Luffy", anime: "One Piece", level: 10, power: 370, bosses: 4, achievements: 10 },
  { name: "Naruto Uzumaki", anime: "Naruto", level: 8, power: 295, bosses: 3, achievements: 8 },
  { name: "Capitão Levi", anime: "Attack on Titan", level: 7, power: 255, bosses: 2, achievements: 7 },
  { name: "Killua Zoldyck", anime: "Hunter x Hunter", level: 5, power: 190, bosses: 2, achievements: 5 },
  { name: "Tanjiro Kamado", anime: "Demon Slayer", level: 3, power: 140, bosses: 1, achievements: 3 },
  { name: "Edward Elric", anime: "Fullmetal Alchemist", level: 2, power: 105, bosses: 0, achievements: 2 }
];

/* --- TREINAMENTOS ATIVOS DO DOJO (EVOLUÇÃO EQUILIBRADA DE ATRIBUTOS) --- */
const dojoTrainingCatalog = [
  { id: "train_str", name: "Treinamento de Força", icon: "💪", statKey: "atk", gainVal: 1, xpGain: 35, desc: "Golpeie toras e pesos espirituais para aumentar permanentemente seu Ataque Físico (+1 ATK e +35 XP)." },
  { id: "train_def", name: "Treinamento de Defesa", icon: "🛡️", statKey: "def", gainVal: 1, xpGain: 35, desc: "Meditação sob cachoeira e resistência de impacto para elevar sua Defesa (+1 DEF e +35 XP)." },
  { id: "train_spd", name: "Treinamento de Velocidade", icon: "⚡", statKey: "spd", gainVal: 1, xpGain: 35, desc: "Sprints ninjas com pesos nas pernas para elevar sua Agilidade e Esquiva (+1 SPD e +35 XP)." },
  { id: "train_mp", name: "Treinamento de Energia", icon: "🔮", statKey: "mp", gainVal: 6, xpGain: 35, desc: "Controle de Respiração, Hamon e Chakra para expandir sua Energia Máxima (+6 EN e +35 XP)." },
  { id: "train_skill", name: "Treinamento de Poderes & Stand", icon: "🌀", statKey: "skill", gainVal: 1, xpGain: 55, desc: "Aperfeiçoa a sincronia com suas Habilidades e Stand (+55 XP, +15 🪙 e chance de Giro Grátis!)." }
];

const dojoTrainersCatalog = [
  { id: "dojo_q_kame", trainer: "Mestre Kame", icon: "🐢", name: "Casco de Tartaruga: Realize 3 Treinos no Dojo", desc: "Complete 3 sessões de treinamento de atributos dentro do Dojo.", progress: g => g.totalDojoTrains || 0, target: 3, xp: 90, coins: 60, spins: 1, arrows: 0 },
  { id: "dojo_q_gai", trainer: "Gai Sensei", icon: "🔥", name: "Chama da Juventude: Golpeie o Alvo 10 vezes e faça 6 Treinos", desc: "Golpeie o Boneco de Treino no Dojo e complete 6 sessões de treino.", progress: g => Math.min(6, g.totalDojoTrains || 0) + Math.min(4, Math.floor((g.dojoTargetHits || 0) / 3)), target: 10, xp: 150, coins: 100, spins: 2, arrows: 1 },
  { id: "dojo_q_zeppeli", trainer: "Barão Zeppeli", icon: "🎩", name: "Mestre do Hamon & Stand: Desperte 1 Stand e alcance Nível 5", desc: "Desperte seu primeiro Stand e evolua até o Nível 5.", progress: g => ((g.unlockedStands || []).length >= 1 ? 3 : 0) + Math.min(5, g.level), target: 8, xp: 200, coins: 140, spins: 2, arrows: 1 }
];

const dojoCatalog = [
  { id: "dummy", name: "Boneco de Madeira Shinobi", icon: "🪵", costCoins: 60, costGems: 0, bonusText: "+25 XP Diário, +2 ATK e +1 Sessão de Treino/Dia", atk: 2, dailyXp: 25, description: "Equipamento tradicional para treinar golpes físicos todos os dias." },
  { id: "scroll_rack", name: "Estante de Pergaminhos", icon: "📜", costCoins: 110, costGems: 1, bonusText: "+20 Moedas Diárias, +10 EN e +1 Sessão de Treino/Dia", mp: 10, dailyCoins: 20, description: "Pergaminhos ancestrais que aumentam sua reserva de energia espiritual." },
  { id: "hotspring", name: "Fonte Termal Curativa", icon: "♨️", costCoins: 160, costGems: 2, bonusText: "+30 Vida Máxima e +1 Sessão de Treino/Dia", hp: 30, dailyXp: 20, description: "Águas termais relaxantes que fortalecem a vitalidade do aventureiro." },
  { id: "gravity_chamber", name: "Câmara de Gravidade 100x", icon: "🛸", costCoins: 280, costGems: 5, bonusText: "+5 ATK, +5 DEF, +50 XP Diário e +1 Sessão/Dia", atk: 5, def: 5, dailyXp: 50, description: "Tecnologia avançada para treinar em gravidade aumentada!" },
  { id: "shrine", name: "Altar da Flecha Requiem", icon: "⛩️", costCoins: 360, costGems: 8, bonusText: "+1 Gema Diária, +5 SPD e +1 Sessão de Treino/Dia", spd: 5, dailyGems: 1, description: "Relíquia sagrada que amplifica o poder dos Stands e Classes." }
];

const shopCatalog = [
  // Consumíveis & Especiais
  { id: "ramen", name: "Ramen Ichiraku", type: "consumable", rarity: "common", icon: "🍜", priceCoins: 25, priceGems: 0, healHp: 60, healMp: 20, description: "Recupera 60 de Vida e 20 de Energia imediatamente." },
  { id: "elixir", name: "Elixir de Chakra", type: "consumable", rarity: "rare", icon: "🧪", priceCoins: 40, priceGems: 0, healHp: 20, healMp: 50, description: "Restaura 50 de Energia e 20 de Vida para usar mais habilidades." },
  { id: "senzu", name: "Semente dos Deuses", type: "consumable", rarity: "epic", icon: "🫘", priceCoins: 95, priceGems: 2, healHp: 999, healMp: 999, description: "Restaura 100% da Vida e da Energia instantaneamente!" },
  { id: "stand_arrow_item", name: "Flecha Requiem de Stand", type: "consumable", rarity: "legendary", icon: "🏹", priceCoins: 140, priceGems: 3, grantStandArrow: 1, description: "Use no inventário para ganhar +1 Flecha de Despertar de Stand e +1 Giro de Classe!" },
  { id: "streak_freeze", name: "Cristal de Gelo Temporal", type: "consumable", rarity: "rare", icon: "🧊", priceCoins: 90, priceGems: 1, grantStreakFreeze: 1, description: "Use no inventário para guardar +1 Escudo de Sequência (protege seu Streak caso falte 1 dia)." },
  // Armas
  { id: "kunai_steel", name: "Kunai de Konoha", type: "weapon", rarity: "common", icon: "🗡️", priceCoins: 80, priceGems: 0, atk: 5, spd: 2, visualWeapon: "kunai", description: "Arma leve ninja. +5 Ataque, +2 Agilidade." },
  { id: "nichirin_blade", name: "Katana Nichirin", type: "weapon", rarity: "rare", icon: "⚔️", priceCoins: 180, priceGems: 0, atk: 11, spd: 3, visualWeapon: "katana", description: "Espada forjada com minério solar. +11 Ataque, +3 Agilidade." },
  { id: "zanpakuto_soul", name: "Zanpakutō Espiritual", type: "weapon", rarity: "epic", icon: "🔪", priceCoins: 280, priceGems: 5, atk: 18, mp: 15, visualWeapon: "zanpakuto", description: "Lâmina espiritual de alto nível. +18 Ataque, +15 Energia." },
  { id: "pluck_sword", name: "Espada da Sorte & Coragem (Pluck)", type: "weapon", rarity: "legendary", icon: "⚜️", priceCoins: 360, priceGems: 8, atk: 24, spd: 6, visualWeapon: "katana", description: "Relíquia carregada de Hamon de JoJo. +24 Ataque, +6 Agilidade." },
  { id: "demon_dweller", name: "Espada Anti-Magia", type: "weapon", rarity: "mythic", icon: "🏴", priceCoins: 440, priceGems: 12, atk: 30, def: 8, visualWeapon: "greatsword", description: "Relíquia mítica que corta qualquer magia. +30 Ataque, +8 Defesa." },
  // Armaduras / Roupas
  { id: "chunin_vest", name: "Colete Tático Chunin", type: "armor", rarity: "common", icon: "🦺", priceCoins: 90, priceGems: 0, def: 5, hp: 25, outfitStyle: "ninja", description: "Proteção padrão das vilas ocultas. +5 Defesa, +25 Vida." },
  { id: "hero_suit", name: "Traje Pro Hero U.A.", type: "armor", rarity: "rare", icon: "🥋", priceCoins: 190, priceGems: 0, def: 10, hp: 50, spd: 2, outfitStyle: "haori", description: "Uniforme reforçado de herói. +10 Defesa, +50 Vida, +2 Agilidade." },
  { id: "saiyan_armor", name: "Armadura de Combate Z", type: "armor", rarity: "epic", icon: "🛡️", priceCoins: 300, priceGems: 6, def: 16, hp: 85, outfitStyle: "gi", description: "Armadura flexível intergaláctica. +16 Defesa, +85 Vida." },
  { id: "jotaro_trench", name: "Sobretudo Cruzado Estelar", type: "armor", rarity: "legendary", icon: "🧥", priceCoins: 390, priceGems: 10, def: 21, hp: 110, atk: 9, outfitStyle: "jojo_coat", description: "Sobretudo lendário de Jotaro Kujo com correntes douradas. +21 DEF, +110 HP, +9 ATK." },
  { id: "yonko_coat", name: "Armadura Divina do Multiverso", type: "armor", rarity: "mythic", icon: "🌌", priceCoins: 480, priceGems: 14, def: 26, hp: 145, atk: 12, outfitStyle: "cosmic_armor", description: "Traje supremo dos imperadores dimensionais. +26 DEF, +145 HP, +12 ATK." },
  // Acessórios
  { id: "leaf_headband", name: "Bandana Renegada", type: "accessory", rarity: "common", icon: "🎗️", priceCoins: 70, priceGems: 0, atk: 3, def: 3, accessoryStyle: "headband", description: "Símbolo de determinação ninja. +3 Ataque, +3 Defesa." },
  { id: "straw_hat", name: "Chapéu da Promessa", type: "accessory", rarity: "rare", icon: "👒", priceCoins: 160, priceGems: 3, hp: 40, spd: 5, accessoryStyle: "strawhat", description: "Tesouro de um grande pirata. +40 Vida, +5 Agilidade." },
  { id: "scouter_glass", name: "Scouter de Poder", type: "accessory", rarity: "epic", icon: "🥽", priceCoins: 240, priceGems: 6, atk: 9, spd: 6, accessoryStyle: "glasses", description: "Analisa pontos fracos do oponente. +9 Ataque, +6 Agilidade." },
  { id: "requiem_brooch", name: "Insígnia da Joaninha Dourada", type: "accessory", rarity: "legendary", icon: "🐞", priceCoins: 350, priceGems: 10, atk: 14, mp: 30, spd: 6, accessoryStyle: "jojo_hat", description: "Relíquia de Giorno Giovanna. +14 ATK, +30 EN, +6 SPD." },
  { id: "divine_halo", name: "Coroa do Despertar", type: "accessory", rarity: "mythic", icon: "👑", priceCoins: 430, priceGems: 15, atk: 18, def: 14, mp: 35, accessoryStyle: "halo", description: "Artefato divino do multiverso. +18 ATK, +14 DEF, +35 Energia." }
];

/* --- INIMIGOS E CHEFES DE 2 FASES (11 MUNDOS) --- */
const enemiesCatalog = [
  { id: "bandit", name: "Ninja Renegado", anime: "Naruto", zone: 0, isBoss: false, hp: 85, atk: 13, def: 4, xp: 35, coins: 18, gems: 0, desc: "Saqueador oculto nas árvores da Vila.", look: { hairStyle: "spiky", hairColor: "#4a5568", skinColor: "#d9a67e", eyeColor: "#e53e3e", outfitColor: "#2d3748", accessoryStyle: "headband" } },
  { id: "rogue_jonin", name: "Kage das Sombras (Chefe)", anime: "Naruto", zone: 0, isBoss: true, phase2Name: "Kage das Sombras (Mangekyō Desperto)", hp: 180, atk: 22, def: 8, xp: 95, coins: 50, gems: 2, dropId: "kunai_steel", desc: "Mestre de técnicas proibidas da Vila.", look: { hairStyle: "long", hairColor: "#1a202c", skinColor: "#e2cfb8", eyeColor: "#9f7aea", outfitColor: "#9b2c2c", outfitStyle: "akatsuki", accessoryStyle: "headband", visualWeapon: "katana" } },
  { id: "street_villain", name: "Vilão Mutante", anime: "My Hero Academia", zone: 1, isBoss: false, hp: 115, atk: 17, def: 6, xp: 45, coins: 24, gems: 0, desc: "Criminoso causando caos no centro urbano.", look: { hairStyle: "messy", hairColor: "#38a169", skinColor: "#a0aec0", eyeColor: "#f6e05e", outfitColor: "#4a5568", accessoryStyle: "glasses" } },
  { id: "nomu_titan", name: "Bio-Titã Nomu (Chefe)", anime: "My Hero Academia", zone: 1, isBoss: true, phase2Name: "Nomu High-End (Regeneração Máxima)", hp: 240, atk: 28, def: 12, xp: 125, coins: 65, gems: 3, dropId: "hero_suit", desc: "Criatura projetada para enfrentar heróis profissionais.", look: { hairStyle: "short", hairColor: "#1a202c", skinColor: "#4a5568", eyeColor: "#fc8181", outfitColor: "#742a2a", accessoryStyle: "cape" } },
  { id: "pirate_raider", name: "Corsário dos Mares", anime: "One Piece", zone: 2, isBoss: false, hp: 145, atk: 21, def: 8, xp: 55, coins: 30, gems: 1, desc: "Pirata em busca dos baús da ilha.", look: { hairStyle: "ponytail", hairColor: "#975a16", skinColor: "#c98f66", eyeColor: "#2d3748", outfitColor: "#b7791f", accessoryStyle: "strawhat", visualWeapon: "katana" } },
  { id: "sea_emperor", name: "Almirante Corsário (Chefe)", anime: "One Piece", zone: 2, isBoss: true, phase2Name: "Imperador Yonko (Haki do Conquistador)", hp: 290, atk: 34, def: 15, xp: 155, coins: 85, gems: 4, dropId: "straw_hat", desc: "Comandante supremo da frota pirata.", look: { hairStyle: "long", hairColor: "#c53030", skinColor: "#d69e2e", eyeColor: "#f6e05e", outfitColor: "#742a2a", outfitStyle: "coat", accessoryStyle: "cape", visualWeapon: "greatsword" } },
  { id: "lesser_oni", name: "Oni da Floresta", anime: "Demon Slayer", zone: 3, isBoss: false, hp: 180, atk: 26, def: 10, xp: 70, coins: 38, gems: 1, desc: "Demônio que espreita sob o luar.", look: { hairStyle: "messy", hairColor: "#e2e8f0", skinColor: "#cbd5e0", eyeColor: "#f56565", outfitColor: "#553c9a", visualWeapon: "katana" } },
  { id: "upper_demon", name: "Lua Superior Kokushibo (Chefe)", anime: "Demon Slayer", zone: 3, isBoss: true, phase2Name: "Lua Superior (Respiração da Lua Completa)", hp: 360, atk: 42, def: 18, xp: 210, coins: 115, gems: 5, dropId: "nichirin_blade", desc: "Oni ancestral com seis olhos e espada demoníaca.", look: { hairStyle: "ponytail", hairColor: "#fed7d7", skinColor: "#edf2f7", eyeColor: "#f6ad55", outfitColor: "#702459", outfitStyle: "haori", accessoryStyle: "halo", visualWeapon: "zanpakuto" } },
  { id: "vampire_minion", name: "Vampiro da Máscara de Pedra", anime: "JoJo's Bizarre Adventure", zone: 4, isBoss: false, hp: 210, atk: 31, def: 13, xp: 85, coins: 46, gems: 1, desc: "Servo imortal que espreita nas ruas noturnas do Cairo.", look: { hairStyle: "long", hairColor: "#cbd5e1", skinColor: "#e2e8f0", eyeColor: "#ef4444", outfitColor: "#4c1d95", outfitStyle: "jojo_coat", accessoryStyle: "scarf" } },
  { id: "kira_boss", name: "Kira Yoshikage & Killer Queen (Chefe)", anime: "JoJo's Bizarre Adventure", zone: 4, isBoss: true, phase2Name: "Kira Yoshikage (Bites the Dust Desperto!)", hp: 410, atk: 47, def: 20, xp: 245, coins: 135, gems: 6, dropId: "pluck_sword", standId: "killer_queen", desc: "Assassino silencioso de Morioh portador do Stand explosivo Killer Queen.", look: { hairStyle: "short", hairColor: "#facc15", skinColor: "#e9b995", eyeColor: "#a855f7", outfitColor: "#7e22ce", outfitStyle: "coat", accessoryStyle: "earrings" } },
  { id: "dio_world", name: "DIO — Mestre d'O Mundo (Chefe)", anime: "JoJo's Bizarre Adventure", zone: 4, isBoss: true, phase2Name: "DIO Desperto (Sangue Joestar Máximo!)", hp: 460, atk: 52, def: 22, xp: 280, coins: 160, gems: 7, dropId: "jotaro_trench", standId: "the_world", desc: "O lendário vampiro portador do Stand The World capaz de parar o próprio tempo!", look: { hairStyle: "super_spiky", hairColor: "#facc15", skinColor: "#fef08a", eyeColor: "#ef4444", outfitColor: "#eab308", outfitStyle: "jojo_coat", accessoryStyle: "halo" } },
  { id: "shibuya_curse", name: "Maldição de Grau 1", anime: "Jujutsu Kaisen", zone: 5, isBoss: false, hp: 235, atk: 35, def: 15, xp: 95, coins: 52, gems: 1, desc: "Espírito amaldiçoado vagando pelo Véu de Shibuya.", look: { hairStyle: "cursed_fade", hairColor: "#6366f1", skinColor: "#94a3b8", eyeColor: "#f43f5e", outfitColor: "#1e1b4b", accessoryStyle: "mask" } },
  { id: "special_curse", name: "Sukuna — Rei das Maldições (Chefe)", anime: "Jujutsu Kaisen", zone: 5, isBoss: true, phase2Name: "Sukuna (Santuário Malevolente Aberto!)", hp: 490, atk: 55, def: 23, xp: 295, coins: 165, gems: 7, dropId: "zanpakuto_soul", desc: "O Rei das Maldições em posse de seus dedos ancestrais.", look: { hairStyle: "spiky", hairColor: "#f472b6", skinColor: "#e9b995", eyeColor: "#ef4444", outfitColor: "#1e293b", outfitStyle: "haori", accessoryStyle: "halo" } },
  { id: "arrancar_guard", name: "Arrancar de Las Noches", anime: "Bleach", zone: 6, isBoss: false, hp: 265, atk: 39, def: 17, xp: 110, coins: 60, gems: 1, desc: "Guerreiro espiritual mascarado com Hierro resistente.", look: { hairStyle: "long", hairColor: "#e2e8f0", skinColor: "#f1f5f9", eyeColor: "#38bdf8", outfitColor: "#f8fafc", outfitStyle: "coat", accessoryStyle: "mask", visualWeapon: "zanpakuto" } },
  { id: "hollow_lord", name: "Aizen Transcendente (Chefe)", anime: "Bleach", zone: 6, isBoss: true, phase2Name: "Aizen Hōgyoku (Fusão Divina Completa)", hp: 540, atk: 60, def: 26, xp: 330, coins: 185, gems: 8, dropId: "demon_dweller", desc: "Soberano do Hueco Mundo fundido com o Hōgyoku.", look: { hairStyle: "long", hairColor: "#475569", skinColor: "#f8fafc", eyeColor: "#a855f7", outfitColor: "#ffffff", outfitStyle: "coat", accessoryStyle: "halo", visualWeapon: "greatsword" } },
  { id: "cosmic_warrior", name: "Deus Guerreiro Jiren / Saiyajin (Chefe)", anime: "Dragon Ball", zone: 7, isBoss: true, phase2Name: "Poder Total Além dos Deuses (100% Ki)", hp: 600, atk: 66, def: 28, xp: 380, coins: 210, gems: 10, dropId: "yonko_coat", desc: "O guerreiro supremo do Torneio do Poder Dimensional.", look: { hairStyle: "super_spiky", hairColor: "#f6e05e", skinColor: "#e9b995", eyeColor: "#4fd1c5", outfitColor: "#dd6b20", outfitStyle: "cosmic_armor", accessoryStyle: "halo" } },
  // Novos Inimigos e Chefes v6 (Fullmetal Alchemist, Attack on Titan, Hunter x Hunter)
  { id: "state_chimera", name: "Quimera Alquímica", anime: "Fullmetal Alchemist", zone: 8, isBoss: false, hp: 290, atk: 42, def: 18, xp: 125, coins: 68, gems: 1, desc: "Criatura transmutada nos laboratórios subterrâneos de Central City.", look: { hairStyle: "messy", hairColor: "#78350f", skinColor: "#d6d3d1", eyeColor: "#eab308", outfitColor: "#44403c", outfitStyle: "coat" } },
  { id: "homunculus_pride", name: "Homúnculo Pride (Chefe)", anime: "Fullmetal Alchemist", zone: 8, isBoss: true, phase2Name: "Pride (Sombras de Selim Bradley!)", hp: 640, atk: 70, def: 30, xp: 410, coins: 230, gems: 10, dropId: "requiem_brooch", desc: "O primeiro Homúnculo capaz de controlar sombras laminadas vorazes.", look: { hairStyle: "short", hairColor: "#0f172a", skinColor: "#f1f5f9", eyeColor: "#ef4444", outfitColor: "#1e1b4b", outfitStyle: "school", accessoryStyle: "halo" } },
  { id: "pure_titan", name: "Titã Anômalo da Muralha", anime: "Attack on Titan", zone: 9, isBoss: false, hp: 330, atk: 46, def: 20, xp: 140, coins: 75, gems: 1, desc: "Gigante incansável avançando pelo distrito de Shiganshina.", look: { hairStyle: "short", hairColor: "#451a03", skinColor: "#dca586", eyeColor: "#fbbf24", outfitColor: "#7c2d12", outfitStyle: "gi" } },
  { id: "armored_titan", name: "Titã Encouraçado (Chefe)", anime: "Attack on Titan", zone: 9, isBoss: true, phase2Name: "Reiner — Investida Encouraçada!", hp: 700, atk: 75, def: 34, xp: 450, coins: 260, gems: 12, dropId: "yonko_coat", desc: "Titã revestido por placas blindadas quase impenetráveis.", look: { hairStyle: "spiky", hairColor: "#fef08a", skinColor: "#991b1b", eyeColor: "#fde047", outfitColor: "#d97706", outfitStyle: "cosmic_armor" } },
  { id: "nen_assassin", name: "Assassino da Trupe", anime: "Hunter x Hunter", zone: 10, isBoss: false, hp: 350, atk: 50, def: 21, xp: 155, coins: 85, gems: 2, desc: "Usuário de Nen especialista em técnicas furtivas na Torre Celestial.", look: { hairStyle: "spiky", hairColor: "#e2e8f0", skinColor: "#f8fafc", eyeColor: "#3b82f6", outfitColor: "#1e1b4b", outfitStyle: "casual" } },
  { id: "phantom_leader", name: "Chrollo Lucilfer (Chefe)", anime: "Hunter x Hunter", zone: 10, isBoss: true, bossTier: "zone", patternType: "status_storm", phase2Name: "Chrollo (Bandit's Secret — Skill Hunter!)", hp: 760, atk: 82, def: 36, xp: 500, coins: 300, gems: 14, dropId: "divine_halo", desc: "Líder da Trupe Fantasma capaz de roubar habilidades de Nen com seu grimório.", look: { hairStyle: "short", hairColor: "#090d16", skinColor: "#f1f5f9", eyeColor: "#64748b", outfitColor: "#311042", outfitStyle: "jojo_coat", accessoryStyle: "headband" } },
  // 3 Novos Mundos (Zonas 11, 12, 13) + Chefes Secretos & Mundiais
  { id: "beast_pirate", name: "Samurai das Feras (Gifter)", anime: "One Piece: Wano", zone: 11, isBoss: false, hp: 380, atk: 54, def: 23, xp: 170, coins: 95, gems: 2, desc: "Guerreiro de Onigashima usuário de Smile artificial.", look: { hairStyle: "ponytail", hairColor: "#991b1b", skinColor: "#eab68c", eyeColor: "#facc15", outfitColor: "#3b0764", outfitStyle: "haori", accessoryStyle: "mask", visualWeapon: "katana" } },
  { id: "kaido_beast", name: "Kaidou das Feras (Chefe)", anime: "One Piece: Wano", zone: 11, isBoss: true, bossTier: "world", patternType: "heavy_charge", phase2Name: "Kaidou Dragão (Bolo Breath Supremo!)", hp: 860, atk: 88, def: 40, xp: 580, coins: 350, gems: 16, dropId: "yonko_coat", desc: "A Criatura Mais Forte do Mundo nos céus de Wano.", look: { hairStyle: "long", hairColor: "#090d16", skinColor: "#dca586", eyeColor: "#f59e0b", outfitColor: "#4c1d95", outfitStyle: "coat", accessoryStyle: "demon_horns", visualWeapon: "greatsword" } },
  { id: "dark_disciple", name: "Discípulo da Tríade Negra", anime: "Black Clover", zone: 12, isBoss: false, hp: 410, atk: 58, def: 24, xp: 185, coins: 105, gems: 2, desc: "Mago corrompido por poder demoníaco no Reino do Trevo.", look: { hairStyle: "messy", hairColor: "#312e81", skinColor: "#e2e8f0", eyeColor: "#e11d48", outfitColor: "#111827", outfitStyle: "akatsuki" } },
  { id: "megicula_devil", name: "Demônio Megicula (Chefe)", anime: "Black Clover", zone: 12, isBoss: true, bossTier: "zone", patternType: "status_storm", phase2Name: "Megicula (Magia Maldita Decadente!)", hp: 920, atk: 92, def: 42, xp: 630, coins: 390, gems: 18, dropId: "demon_dweller", desc: "Demônio supremo mestre das maldições arcanas.", look: { hairStyle: "super_spiky", hairColor: "#f8fafc", skinColor: "#cbd5e1", eyeColor: "#ef4444", outfitColor: "#1e1b4b", outfitStyle: "cosmic_armor", accessoryStyle: "demon_horns" } },
  { id: "shadow_ant", name: "Formiga Quimera S-Rank", anime: "Solo Leveling", zone: 13, isBoss: false, hp: 450, atk: 62, def: 26, xp: 205, coins: 120, gems: 3, desc: "Monstro letal emergido do Portal Vermelho da Ilha Jeju.", look: { hairStyle: "short", hairColor: "#1e1b4b", skinColor: "#4c1d95", eyeColor: "#38bdf8", outfitColor: "#0f172a", outfitStyle: "cosmic_armor" } },
  { id: "ant_king_beru", name: "Rei Formiga Beru (Chefe)", anime: "Solo Leveling", zone: 13, isBoss: true, bossTier: "zone", patternType: "heavy_charge", phase2Name: "Beru Sombrio (General do Monarca!)", hp: 990, atk: 96, def: 44, xp: 700, coins: 450, gems: 20, dropId: "divine_halo", desc: "Rei absoluto da colônia S-Rank com velocidade devastadora.", look: { hairStyle: "super_spiky", hairColor: "#090d16", skinColor: "#312e81", eyeColor: "#38bdf8", outfitColor: "#111827", outfitStyle: "cosmic_armor", accessoryStyle: "cape" } },
  // Chefes Secretos & Mundiais Especiais
  { id: "igris_blood_red", name: "Igris, Cavaleiro Vermelho (Secreto)", anime: "Solo Leveling", zone: 13, isBoss: true, bossTier: "secret", patternType: "knight_duel", phase2Name: "Igris Desperto — Marechal das Sombras!", hp: 880, atk: 89, def: 38, xp: 660, coins: 420, gems: 18, dropId: "zanpakuto_soul", desc: "[CHEFE SECRETO] Guardião do Trono Vazio. Esquiva e contra-ataca com espadas relâmpago!", look: { hairStyle: "ponytail", hairColor: "#dc2626", skinColor: "#1e293b", eyeColor: "#38bdf8", outfitColor: "#991b1b", outfitStyle: "cosmic_armor", accessoryStyle: "cape", visualWeapon: "greatsword" } },
  { id: "pucci_heaven", name: "Enrico Pucci (Made in Heaven)", anime: "JoJo's Bizarre Adventure", zone: 4, isBoss: true, bossTier: "secret", patternType: "time_accel", phase2Name: "Pucci — Singularidade Universal!", hp: 820, atk: 84, def: 34, xp: 640, coins: 400, gems: 17, standId: "made_in_heaven", dropId: "stand_arrow_item", desc: "[CHEFE SECRETO] Portador de Made in Heaven capaz de acelerar o tempo do combate!", look: { hairStyle: "short", hairColor: "#f8fafc", skinColor: "#a16207", eyeColor: "#eab308", outfitColor: "#3b0764", outfitStyle: "jojo_coat", accessoryStyle: "halo" } },
  { id: "madara_ten_tails", name: "Madara Uchiha — Jinchūriki (Mundial)", anime: "Naruto", zone: 0, isBoss: true, bossTier: "world", patternType: "meteor_truth", phase2Name: "Madara — Tsukuyomi Infinito!", hp: 1120, atk: 102, def: 46, xp: 820, coins: 520, gems: 24, dropId: "demon_dweller", desc: "[CHEFE MUNDIAL] Lenda Uchiha com Esferas da Busca da Verdade e meteoros celestes!", look: { hairStyle: "super_spiky", hairColor: "#f8fafc", skinColor: "#e2e8f0", eyeColor: "#a855f7", outfitColor: "#f8fafc", outfitStyle: "coat", accessoryStyle: "halo" } },
  { id: "meruem_king", name: "Meruem — Rei das Quimeras (Mundial)", anime: "Hunter x Hunter", zone: 10, isBoss: true, bossTier: "world", patternType: "shield_burst", phase2Name: "Meruem Pós-Rosa (Nen Absoluto!)", hp: 1050, atk: 98, def: 45, xp: 760, coins: 480, gems: 22, dropId: "yonko_coat", desc: "[CHEFE MUNDIAL] Rei imbatível com intelecto supremo e explosões de Nen dourado.", look: { hairStyle: "bowl", hairColor: "#0f766e", skinColor: "#86efac", eyeColor: "#a855f7", outfitColor: "#312e81", outfitStyle: "cosmic_armor" } }
];

const npcQuestsCatalog = [
  { id: "npc_ren_1", npc: "Mestre Ren", zone: 0, name: "Treinamento Genin: Conclua 2 missões reais", description: "Mostre sua disciplina completando 2 tarefas da vida real.", progress: g => g.totalCompleted, target: 2, xp: 60, coins: 40, gems: 2, rewardItemId: "ramen" },
  { id: "npc_ren_2", npc: "Mestre Ren", zone: 0, name: "Defesa da Vila: Vença 1 combate", description: "Vença 1 batalha para proteger a Vila Inicial.", progress: g => g.battlesWon, target: 1, xp: 80, coins: 50, gems: 2, rewardItemId: "leaf_headband" },
  { id: "npc_kai_1", npc: "Professor Kai", zone: 1, name: "Licença Provisória: Alcance Nível 3 e 1 Poder", description: "Evolua até o Nível 3 e aprenda pelo menos 1 técnica.", progress: g => (g.level >= 3 && g.unlockedSkills.length >= 1 ? 1 : 0), target: 1, xp: 100, coins: 70, gems: 3, rewardItemId: "elixir" },
  { id: "npc_ryo_1", npc: "Capitão Ryo", zone: 2, name: "Caçador de Tesouros: Abra 2 Baús no Mapa 2D", description: "Encontre e abra 2 baús dourados espalhados pelos mapas.", progress: g => (g.openedChests || []).length, target: 2, xp: 120, coins: 90, gems: 3, rewardItemId: "kunai_steel" },
  { id: "npc_tanji_1", npc: "Mestre Tanji", zone: 3, name: "Concentração Total: 2 dias de sequência ou 6 missões", description: "Alcance 2 dias seguidos ativos ou 6 missões concluídas.", progress: g => Math.max(g.streak >= 2 ? 6 : 0, g.totalCompleted), target: 6, xp: 160, coins: 110, gems: 4, rewardItemId: "nichirin_blade" },
  { id: "npc_jotaro_1", npc: "Jotaro Kujo", zone: 4, name: "Cruzados do Cairo: Desperte 1 Stand e vença 3 batalhas", description: "Use a Flecha Requiem para despertar seu Stand e vença 3 combates.", progress: g => ((g.unlockedStands || []).length >= 1 ? 2 : 0) + Math.min(3, g.battlesWon), target: 5, xp: 200, coins: 140, gems: 5, rewardItemId: "stand_arrow_item" },
  { id: "npc_gojo_1", npc: "Mestre Satoru", zone: 5, name: "Olhos do Infinito: Realize 4 Treinos no Dojo", description: "Fortaleça seus atributos no Dojo Dimensional 4 vezes.", progress: g => g.totalDojoTrains || 0, target: 4, xp: 220, coins: 150, gems: 5, rewardItemId: "senzu" },
  { id: "npc_byakuya_1", npc: "Capitão Byakuya", zone: 6, name: "Orgulho do Seireitei: Desbloqueie 3 Habilidades", description: "Domine pelo menos 3 habilidades na Árvore de Habilidades.", progress: g => g.unlockedSkills.length, target: 3, xp: 240, coins: 165, gems: 6, rewardItemId: "zanpakuto_soul" },
  { id: "npc_gokuu_1", npc: "Guardião Gokuu", zone: 7, name: "Superando Limites: Vença 5 batalhas no Multiverso", description: "Prove sua força vencendo 5 combates!", progress: g => g.battlesWon, target: 5, xp: 280, coins: 190, gems: 7, rewardItemId: "senzu" },
  { id: "npc_edward_1", npc: "Edward Elric", zone: 8, name: "Troca Equivalente: Sintetize 2 Poções na Alquimia", description: "Cultive ervas no Pátio do Dojo e prepare 2 poções no Caldeirão.", progress: g => g.potionsBrewed || 0, target: 2, xp: 320, coins: 220, gems: 8, rewardItemId: "senzu" },
  { id: "npc_levi_1", npc: "Capitão Levi", zone: 9, name: "Disciplina da Tropa: Conclua 1 Masmorra", description: "Vença qualquer Masmorra por ondas na Arena de Combate.", progress: g => (g.clearedDungeons || []).length, target: 1, xp: 360, coins: 250, gems: 9, rewardItemId: "streak_freeze" },
  { id: "npc_killua_1", npc: "Killua Zoldyck", zone: 10, name: "Domínio do Nen: Alcance Nível 10 e vença 8 batalhas", description: "Evolua até o Nível 10 e conquiste 8 vitórias na Arena.", progress: g => (g.level >= 10 ? 2 : 0) + Math.min(8, g.battlesWon), target: 10, xp: 420, coins: 300, gems: 12, rewardItemId: "divine_halo" },
  { id: "npc_zoro_1", npc: "Roronoa Zoro", zone: 11, name: "Caminho de Enma: Refine 1 Equipamento para +3+", description: "Fortaleça qualquer arma ou traje na Forja até +3.", progress: g => (Object.values(g.itemRefines || {}).some(v => v >= 3) ? 1 : 0), target: 1, xp: 460, coins: 340, gems: 12, rewardItemId: "pluck_sword" },
  { id: "npc_yami_1", npc: "Capitão Yami Sukehiro", zone: 12, name: "Ultrapasse seus Limites: Derrote 4 Chefes", description: "Prove seu valor derrotando pelo menos 4 Chefes no Multiverso.", progress: g => (g.defeatedBosses || []).length, target: 4, xp: 520, coins: 380, gems: 14, rewardItemId: "demon_dweller" },
  { id: "npc_jinwoo_1", npc: "Sung Jin-Woo", zone: 13, name: "Sombra S-Rank: Derrote Igris ou Rei Beru", description: "Conquiste a vitória contra Beru ou o Chefe Secreto Igris!", progress: g => ((g.defeatedBosses || []).includes("ant_king_beru") || (g.defeatedBosses || []).includes("igris_blood_red") ? 1 : 0), target: 1, xp: 650, coins: 480, gems: 18, rewardItemId: "stand_arrow_item" }
];

const challengesCatalog = [
  { id: "weekly_quests_10", period: "Semanal", name: "Disciplina de Ferro: Concluir 10 missões", target: 10, progress: g => g.totalCompleted, xp: 120, coins: 80, gems: 3 },
  { id: "weekly_focus_15", period: "Semanal", name: "Mente Inabalável: Focar 15 minutos no Pomodoro", target: 15, progress: g => g.focusMinutes || 0, xp: 130, coins: 85, gems: 3 },
  { id: "weekly_dojo_5", period: "Semanal", name: "Discípulo do Dojo: Realizar 5 treinos de atributo", target: 5, progress: g => g.totalDojoTrains || 0, xp: 135, coins: 90, gems: 3 },
  { id: "weekly_battles_3", period: "Semanal", name: "Guerreiro em Ascensão: Vencer 3 batalhas", target: 3, progress: g => g.battlesWon, xp: 100, coins: 70, gems: 3 },
  { id: "weekly_chests_3", period: "Semanal", name: "Olhos de Águia: Abrir 3 baús nos mapas", target: 3, progress: g => (g.openedChests || []).length, xp: 110, coins: 75, gems: 3 },
  { id: "monthly_quests_25", period: "Mensal", name: "Mestre da Produtividade: Concluir 25 missões", target: 25, progress: g => g.totalCompleted, xp: 300, coins: 200, gems: 8 },
  { id: "monthly_skills_4", period: "Mensal", name: "Arsenal Completo: Desbloquear 4 habilidades", target: 4, progress: g => g.unlockedSkills.length, xp: 220, coins: 150, gems: 6 }
];

const achievements = [
  { id: "first", name: "Primeiro Passo", description: "Conclua sua primeira missão na vida real.", icon: "🌟", condition: s => s.totalCompleted >= 1 },
  { id: "five", name: "Aventureiro Dedicado", description: "Conclua 5 missões reais.", icon: "🏅", condition: s => s.totalCompleted >= 5 },
  { id: "ten", name: "Determinação Inabalável", description: "Conclua 10 missões reais.", icon: "🔥", condition: s => s.totalCompleted >= 10 },
  { id: "twentyfive", name: "Mestre do Hábito", description: "Conclua 25 missões reais.", icon: "💎", condition: s => s.totalCompleted >= 25 },
  { id: "focus_first", name: "Imersão Total", description: "Conclua uma sessão no Cronômetro de Foco (Pomodoro).", icon: "⏱️", condition: s => (s.focusMinutes || 0) >= 1 },
  { id: "class_roller", name: "Sorte Lançada", description: "Gire a Roleta de Classes e desbloqueie 2 ou mais classes.", icon: "🎰", condition: s => (s.unlockedClasses || []).length >= 2 },
  { id: "stand_awakened", name: "Espírito de Luta (Stand)", description: "Desperte seu primeiro Stand de JoJo's Bizarre Adventure.", icon: "👻", condition: s => (s.unlockedStands || []).length >= 1 },
  { id: "dojo_disciple", name: "Treino Pesado", description: "Conclua 3 sessões de treinamento de atributo no Dojo.", icon: "🥋", condition: s => (s.totalDojoTrains || 0) >= 3 },
  { id: "level5", name: "Evolução Notável", description: "Alcance o nível 5.", icon: "⚡", condition: s => s.level >= 5 },
  { id: "level10", name: "Lenda em Formação", description: "Alcance o nível 10.", icon: "👑", condition: s => s.level >= 10 },
  { id: "skill", name: "Primeiro Poder", description: "Desbloqueie uma habilidade de anime.", icon: "✨", condition: s => s.unlockedSkills.length >= 1 },
  { id: "skill_master", name: "Mestre Elemental", description: "Desbloqueie 5 habilidades de anime.", icon: "🌀", condition: s => s.unlockedSkills.length >= 5 },
  { id: "forge_up", name: "Ferreiro Dimensional", description: "Refine qualquer equipamento na Forja (+1 ou superior).", icon: "🔨", condition: s => Object.values(s.itemRefines || {}).some(v => v >= 1) },
  { id: "dojo_builder", name: "Mestre do Dojo", description: "Adquira sua primeira instalação no Meu Dojo.", icon: "🏯", condition: s => (s.dojoUpgrades || []).length >= 1 },
  { id: "explorer", name: "Explorador de Mundos", description: "Visite pelo menos 3 regiões no Mapa 2D.", icon: "🗺️", condition: s => s.visitedZones.length >= 3 },
  { id: "all_zones", name: "Viajante do Multiverso", description: "Visite pelo menos 6 regiões do Multiverso.", icon: "🌌", condition: s => s.visitedZones.length >= 6 },
  { id: "first_battle", name: "Batismo de Combate", description: "Vença sua primeira batalha por turnos.", icon: "⚔️", condition: s => s.battlesWon >= 1 },
  { id: "boss_slayer", name: "Caçador de Chefes", description: "Derrote um Chefe de Universo.", icon: "🐉", condition: s => (s.defeatedBosses || []).length >= 1 },
  { id: "treasure_hunter", name: "Caçador de Relíquias", description: "Encontre e abra 3 baús escondidos no mapa.", icon: "🧰", condition: s => (s.openedChests || []).length >= 3 }
];

/* =========================================================
   2. 11 MUNDOS EXPLORÁVEIS (30x18) COM IDENTIDADE PRÓPRIA E PATRULHAS
========================================================= */

function buildZoneLayout(buildingCoords, pathRow = 8, riverCol = 29) {
  const rows = [];
  for (let y = 0; y < MAP_HEIGHT; y++) {
    let row = "";
    for (let x = 0; x < MAP_WIDTH; x++) {
      if (x === 0 || y === 0 || x === MAP_WIDTH - 1 || y === MAP_HEIGHT - 1) {
        row += "1";
      } else if (buildingCoords.some(([bx, by, bh]) => x === bx && y >= by && y < by + bh)) {
        row += "1";
      } else if (riverCol > 0 && x === riverCol && y >= 2 && y <= MAP_HEIGHT - 3) {
        if (y === pathRow || y === 16) row += "4"; // Ponte principal e sul
        else if (y === 3) row += "5"; // Passagem secreta discreta para área secreta!
        else row += "3"; // Rio / água bloqueada
      } else if (y === pathRow || y === 16 || (x === 14 && y >= 4 && y <= 18) || (x === 22 && y >= 5 && y <= 18) || (x === 32 && y >= 4 && y <= 18)) {
        row += "2";
      } else {
        row += "0";
      }
    }
    rows.push(row);
  }
  return rows;
}

const zones = [
  {
    id: "village",
    name: "Vila Oculta da Folha",
    anime: "Naruto",
    minLevel: 1,
    bgmNotes: [261.63, 329.63, 392.00, 440.00, 392.00, 329.63, 293.66, 349.23],
    ground: "#477b4d", ground2: "#437748", path: "#b79a69", wall: "#315b39",
    npc: "Mestre Ren",
    dialogue: "Bem-vindo à Vila da Folha! Aqui treinamos o corpo e a mente. Cada tarefa cumprida no mundo real fortalece seu Chakra interior!",
    lore: "Os antigos Hokages ergueram o Dojo Dimensional para que jovens ninjas transformassem o estudo diário em poder espiritual verdadeiro.",
    portal: "Portal Dimensional",
    portalDialogue: "O portal brilha com energia! Pressione E novamente para viajar à próxima região.",
    spawn: { x: 3, y: 8 },
    npcPos: { x: 6, y: 5 },
    dojoPos: { x: 8, y: 4 },
    portalPos: { x: 26, y: 14 },
    chestPos: { x: 26, y: 3, id: "chest_village", coins: 45, gems: 2, itemId: "ramen" },
    enemyPos: { x: 16, y: 10, enemyId: "bandit" },
    patrols: [
      { x: 16, y: 10, enemyId: "bandit" },
      { x: 21, y: 6, enemyId: "bandit" },
      { x: 24, y: 12, enemyId: "rogue_jonin" }
    ],
    npcLook: { hairStyle: "short", hairColor: "#d9d9ea", skinColor: "#e0b08a", eyeColor: "#3b3b4f", outfitColor: "#c0392b", outfitStyle: "ninja", accessoryStyle: "headband" },
    trees: [[2, 2], [3, 2], [11, 2], [12, 2], [2, 14], [3, 14], [10, 14], [11, 14], [19, 2], [20, 2], [27, 6], [27, 11], [17, 15], [18, 15]],
    layout: buildZoneLayout([[5, 2, 2], [8, 2, 2], [16, 3, 2], [23, 3, 2]], 8)
  },
  {
    id: "heroes",
    name: "Cidade dos Heróis (U.A.)",
    anime: "My Hero Academia",
    minLevel: 1,
    bgmNotes: [293.66, 369.99, 440.00, 587.33, 493.88, 440.00, 369.99, 329.63],
    ground: "#536d91", ground2: "#4e688c", path: "#a9b4c5", wall: "#35445e",
    npc: "Professor Kai",
    dialogue: "Um verdadeiro herói supera seus limites todos os dias! Use o Modo Foco para estudar e liberar seu Plus Ultra!",
    lore: "A Academia U.A. monitora a Determinação dos heróis: quanto mais consistente for sua rotina, maior será o dano do seu Despertar!",
    portal: "Portal Metropolitano",
    portalDialogue: "Rota aberta para o próximo universo! Pressione E novamente para embarcar.",
    spawn: { x: 3, y: 8 },
    npcPos: { x: 18, y: 5 },
    dojoPos: { x: 8, y: 4 },
    portalPos: { x: 26, y: 14 },
    chestPos: { x: 4, y: 14, id: "chest_heroes", coins: 60, gems: 2, itemId: "elixir" },
    enemyPos: { x: 13, y: 6, enemyId: "street_villain" },
    patrols: [
      { x: 13, y: 6, enemyId: "street_villain" },
      { x: 20, y: 11, enemyId: "street_villain" },
      { x: 25, y: 7, enemyId: "nomu_titan" }
    ],
    npcLook: { hairStyle: "spiky", hairColor: "#f6e05e", skinColor: "#d9a67e", eyeColor: "#2b6cb0", outfitColor: "#2b6cb0", outfitStyle: "haori", accessoryStyle: "cape" },
    trees: [[2, 2], [2, 3], [11, 2], [12, 2], [2, 13], [3, 13], [9, 14], [10, 14], [19, 2], [27, 3], [27, 10]],
    layout: buildZoneLayout([[5, 2, 2], [8, 2, 2], [16, 2, 3], [23, 2, 3]], 8)
  },
  {
    id: "pirates",
    name: "Ilha dos Piratas",
    anime: "One Piece",
    minLevel: 2,
    bgmNotes: [246.94, 293.66, 369.99, 392.00, 440.00, 392.00, 329.63, 293.66],
    ground: "#4b805c", ground2: "#477b58", path: "#c6a36b", wall: "#315c45",
    npc: "Capitão Ryo",
    dialogue: "Os mares guardam tesouros incríveis para quem tem coragem de explorar cada canto desta ilha!",
    lore: "O Haki do Armamento nasce da força de vontade inabalável. Nunca quebre sua sequência de dias ativos!",
    portal: "Portal da Grand Line",
    portalDialogue: "Os ventos sopram rumo a novas terras! Pressione E novamente para navegar.",
    spawn: { x: 3, y: 8 },
    npcPos: { x: 19, y: 11 },
    dojoPos: { x: 8, y: 4 },
    portalPos: { x: 26, y: 14 },
    chestPos: { x: 26, y: 3, id: "chest_pirates", coins: 85, gems: 3, itemId: "straw_hat" },
    enemyPos: { x: 12, y: 11, enemyId: "pirate_raider" },
    patrols: [
      { x: 12, y: 11, enemyId: "pirate_raider" },
      { x: 18, y: 6, enemyId: "pirate_raider" },
      { x: 24, y: 9, enemyId: "sea_emperor" }
    ],
    npcLook: { hairStyle: "messy", hairColor: "#1a202c", skinColor: "#c98f66", eyeColor: "#222222", outfitColor: "#e53e3e", outfitStyle: "coat", accessoryStyle: "strawhat" },
    trees: [[2, 2], [3, 2], [11, 2], [12, 2], [2, 14], [3, 14], [9, 14], [10, 14], [20, 2], [27, 5], [27, 9]],
    layout: buildZoneLayout([[5, 2, 2], [8, 2, 2], [17, 3, 2], [23, 3, 2]], 8)
  },
  {
    id: "forest",
    name: "Floresta das Glicínias",
    anime: "Demon Slayer",
    minLevel: 3,
    bgmNotes: [220.00, 261.63, 329.63, 349.23, 329.63, 261.63, 246.94, 220.00],
    ground: "#3b4262", ground2: "#353b59", path: "#7c6b94", wall: "#25283d",
    npc: "Mestre Tanji",
    dialogue: "Mantenha a respiração constante! Nas sombras desta floresta habitam poderosos Onis e Luas Superiores.",
    lore: "As flores de glicínia brilham à noite e protegem o Dojo daqueles que mantêm a disciplina diária.",
    portal: "Portal das Glicínias",
    portalDialogue: "Caminho espiritual aberto! Pressione E novamente para atravessar.",
    spawn: { x: 3, y: 8 },
    npcPos: { x: 6, y: 12 },
    dojoPos: { x: 8, y: 4 },
    portalPos: { x: 26, y: 14 },
    chestPos: { x: 25, y: 3, id: "chest_forest", coins: 110, gems: 4, itemId: "nichirin_blade" },
    enemyPos: { x: 15, y: 6, enemyId: "lesser_oni" },
    patrols: [
      { x: 15, y: 6, enemyId: "lesser_oni" },
      { x: 19, y: 12, enemyId: "upper_demon" },
      { x: 24, y: 7, enemyId: "lesser_oni" }
    ],
    npcLook: { hairStyle: "ponytail", hairColor: "#742a2a", skinColor: "#e9b995", eyeColor: "#9b2c2c", outfitColor: "#38a169", outfitStyle: "haori", visualWeapon: "katana" },
    trees: [[2, 2], [3, 2], [11, 2], [13, 2], [18, 2], [2, 14], [6, 15], [12, 14], [21, 14], [27, 4], [27, 10]],
    layout: buildZoneLayout([[5, 2, 2], [8, 2, 2], [16, 3, 2], [22, 3, 2]], 8)
  },
  {
    id: "cairo",
    name: "Cairo Sob o Luar Bizarro",
    anime: "JoJo's Bizarre Adventure",
    minLevel: 4,
    bgmNotes: [246.94, 293.66, 329.63, 369.99, 440.00, 369.99, 329.63, 246.94],
    ground: "#6b5335", ground2: "#5e472c", path: "#d4a359", wall: "#3d2c1d",
    npc: "Jotaro Kujo",
    dialogue: "Yare Yare Daze... DIO está escondido na mansão ao leste. Desperte seu Stand com a Flecha Requiem antes de desafiá-lo!",
    lore: "Um Stand é a manifestação física da energia espiritual e da determinação da sua alma. Quanto mais você evolui, mais imbatível seu Stand se torna!",
    portal: "Portal Estelar do Cairo",
    portalDialogue: "A energia dos Stands ressoa no portal! Pressione E para avançar ao próximo mundo.",
    spawn: { x: 3, y: 8 },
    npcPos: { x: 7, y: 5 },
    dojoPos: { x: 9, y: 4 },
    portalPos: { x: 26, y: 14 },
    chestPos: { x: 25, y: 3, id: "chest_cairo", coins: 135, gems: 5, itemId: "stand_arrow_item" },
    enemyPos: { x: 15, y: 10, enemyId: "vampire_minion" },
    patrols: [
      { x: 15, y: 10, enemyId: "vampire_minion" },
      { x: 20, y: 6, enemyId: "kira_boss" },
      { x: 24, y: 11, enemyId: "dio_world" }
    ],
    npcLook: { hairStyle: "jotaro_cap", hairColor: "#1e1b4b", skinColor: "#e9b995", eyeColor: "#14b8a6", outfitColor: "#1e1b4b", outfitStyle: "jojo_coat", accessoryStyle: "jojo_hat" },
    trees: [[2, 2], [4, 2], [12, 2], [19, 2], [2, 14], [5, 14], [11, 14], [21, 14], [27, 5]],
    layout: buildZoneLayout([[5, 2, 2], [9, 2, 2], [17, 2, 3], [23, 2, 3]], 8)
  },
  {
    id: "shibuya",
    name: "Distrito de Shibuya",
    anime: "Jujutsu Kaisen",
    minLevel: 5,
    bgmNotes: [196.00, 233.08, 293.66, 311.13, 293.66, 233.08, 220.00, 196.00],
    ground: "#26283b", ground2: "#202233", path: "#4b4e6d", wall: "#151624",
    npc: "Mestre Satoru",
    dialogue: "Não se preocupe, você está ficando absurdamente forte! Domine a Energia Amaldiçoada e derrote o Rei das Maldições!",
    lore: "O Black Flash ocorre quando a energia espiritual é aplicada a um milionésimo de segundo do impacto físico, multiplicando o poder exponencialmente.",
    portal: "Véu Dimensional de Shibuya",
    portalDialogue: "A barreira se abre para a Sociedade das Almas! Pressione E para atravessar.",
    spawn: { x: 3, y: 8 },
    npcPos: { x: 17, y: 5 },
    dojoPos: { x: 8, y: 4 },
    portalPos: { x: 26, y: 14 },
    chestPos: { x: 4, y: 14, id: "chest_shibuya", coins: 155, gems: 5, itemId: "scouter_glass" },
    enemyPos: { x: 13, y: 11, enemyId: "shibuya_curse" },
    patrols: [
      { x: 13, y: 11, enemyId: "shibuya_curse" },
      { x: 19, y: 7, enemyId: "shibuya_curse" },
      { x: 24, y: 10, enemyId: "special_curse" }
    ],
    npcLook: { hairStyle: "cursed_fade", hairColor: "#f8fafc", skinColor: "#f1f5f9", eyeColor: "#38bdf8", outfitColor: "#0f172a", outfitStyle: "school", accessoryStyle: "glasses" },
    trees: [[2, 2], [3, 2], [11, 2], [2, 13], [10, 14], [20, 2], [27, 4], [27, 10]],
    layout: buildZoneLayout([[5, 2, 2], [8, 2, 2], [16, 2, 2], [22, 2, 3]], 8)
  },
  {
    id: "seireitei",
    name: "Sociedade das Almas (Seireitei)",
    anime: "Bleach",
    minLevel: 6,
    bgmNotes: [329.63, 392.00, 493.88, 523.25, 493.88, 392.00, 349.23, 329.63],
    ground: "#4d5970", ground2: "#445066", path: "#cbd5e1", wall: "#2b3345",
    npc: "Capitão Byakuya",
    dialogue: "Apenas aqueles que treinam milhares de vezes alcançam a verdadeira Bankai. Mostre o peso da sua lâmina espiritual!",
    lore: "As muralhas de Sekkiseki do Seireitei refletem a pureza da pressão espiritual daqueles que cumprem seu dever diário.",
    portal: "Senkaimon Celestial",
    portalDialogue: "Portão Senkaimon aberto rumo ao Templo Celestial! Pressione E para avançar.",
    spawn: { x: 3, y: 8 },
    npcPos: { x: 6, y: 5 },
    dojoPos: { x: 8, y: 4 },
    portalPos: { x: 26, y: 14 },
    chestPos: { x: 25, y: 3, id: "chest_seireitei", coins: 180, gems: 6, itemId: "zanpakuto_soul" },
    enemyPos: { x: 14, y: 9, enemyId: "arrancar_guard" },
    patrols: [
      { x: 14, y: 9, enemyId: "arrancar_guard" },
      { x: 20, y: 6, enemyId: "arrancar_guard" },
      { x: 24, y: 11, enemyId: "hollow_lord" }
    ],
    npcLook: { hairStyle: "long", hairColor: "#0f172a", skinColor: "#f1f5f9", eyeColor: "#475569", outfitColor: "#f8fafc", outfitStyle: "coat", accessoryStyle: "scarf", visualWeapon: "zanpakuto" },
    trees: [[2, 2], [3, 2], [12, 2], [19, 2], [2, 14], [11, 14], [20, 14], [27, 6]],
    layout: buildZoneLayout([[5, 2, 2], [8, 2, 2], [16, 3, 2], [23, 3, 2]], 8)
  },
  {
    id: "temple",
    name: "Templo Celestial & Torneio Z",
    anime: "Dragon Ball",
    minLevel: 7,
    bgmNotes: [349.23, 440.00, 523.25, 659.25, 587.33, 523.25, 440.00, 392.00],
    ground: "#5f5582", ground2: "#574d78", path: "#d9c89e", wall: "#3c3457",
    npc: "Guardião Gokuu",
    dialogue: "Hahaha! Seu Ki e seu Stand estão em nível divino! Treine no Dojo e enfrente os guerreiros mais fortes do Multiverso!",
    lore: "No Templo Celestial um dia de foco equivale a um ano de evolução espiritual!",
    portal: "Portal do Multiverso",
    portalDialogue: "Retornar à Vila Inicial ou viajar pelo Multiverso? Pressione E novamente.",
    spawn: { x: 3, y: 8 },
    npcPos: { x: 18, y: 5 },
    dojoPos: { x: 8, y: 4 },
    portalPos: { x: 26, y: 14 },
    chestPos: { x: 4, y: 3, id: "chest_temple", coins: 220, gems: 8, itemId: "senzu" },
    enemyPos: { x: 13, y: 10, enemyId: "cosmic_warrior" },
    patrols: [
      { x: 13, y: 10, enemyId: "cosmic_warrior" },
      { x: 20, y: 11, enemyId: "hollow_lord" },
      { x: 25, y: 6, enemyId: "cosmic_warrior" }
    ],
    npcLook: { hairStyle: "super_spiky", hairColor: "#1a202c", skinColor: "#e9b995", eyeColor: "#1a202c", outfitColor: "#dd6b20", outfitStyle: "gi", accessoryStyle: "halo" },
    trees: [[2, 2], [3, 2], [11, 2], [12, 2], [2, 14], [3, 14], [10, 14], [11, 14], [20, 2], [27, 4]],
    layout: buildZoneLayout([[5, 2, 2], [8, 2, 2], [16, 2, 2], [23, 2, 2]], 8)
  },
  // 3 Novos Mundos Exploráveis (Fullmetal Alchemist, Attack on Titan, Hunter x Hunter)
  {
    id: "alchemy_central",
    name: "Central City (Alquimia Estatal)",
    anime: "Fullmetal Alchemist",
    minLevel: 8,
    bgmNotes: [293.66, 349.23, 440.00, 493.88, 440.00, 349.23, 329.63, 293.66],
    ground: "#4a5d4e", ground2: "#3d4f41", path: "#d4b483", wall: "#2b352d",
    npc: "Edward Elric",
    dialogue: "Para ganhar algo, é preciso entregar algo de mesmo valor! Traga ervas do Dojo para transmutar poções poderosas!",
    lore: "A Troca Equivalente rege tanto a Alquimia quanto a evolução real: foco diário sempre retorna em poder verdadeiro.",
    portal: "Portão da Verdade",
    portalDialogue: "Atravessar o Portão da Verdade rumo à Muralha de Shiganshina? Pressione E.",
    spawn: { x: 3, y: 8 },
    npcPos: { x: 7, y: 5 },
    dojoPos: { x: 8, y: 4 },
    portalPos: { x: 26, y: 14 },
    chestPos: { x: 24, y: 3, id: "chest_alchemy", coins: 240, gems: 8, itemId: "senzu" },
    enemyPos: { x: 14, y: 10, enemyId: "state_chimera" },
    patrols: [
      { x: 14, y: 10, enemyId: "state_chimera" },
      { x: 20, y: 7, enemyId: "state_chimera" },
      { x: 24, y: 11, enemyId: "homunculus_pride" }
    ],
    npcLook: { hairStyle: "spiky", hairColor: "#facc15", skinColor: "#f1c29b", eyeColor: "#eab308", outfitColor: "#dc2626", outfitStyle: "coat" },
    trees: [[2, 2], [3, 2], [12, 2], [19, 2], [2, 14], [11, 14], [20, 14], [27, 6]],
    layout: buildZoneLayout([[5, 2, 2], [8, 2, 2], [16, 2, 2], [22, 2, 2]], 8)
  },
  {
    id: "wall_maria",
    name: "Distrito de Shiganshina (Muralha)",
    anime: "Attack on Titan",
    minLevel: 9,
    bgmNotes: [220.00, 261.63, 329.63, 392.00, 440.00, 392.00, 329.63, 220.00],
    ground: "#5c6b48", ground2: "#4d5b3b", path: "#c9ad7c", wall: "#3a442d",
    npc: "Capitão Levi",
    dialogue: "Tch... Sem disciplina você não dura um segundo fora das muralhas. Mantenha seus hábitos em dia antes de encarar o Encouraçado.",
    lore: "A Tropa de Exploração confia na precisão cirúrgica do DMT e na consistência inabalável de cada soldado.",
    portal: "Portão da Muralha Maria",
    portalDialogue: "Viajar para a Torre Celestial de Nen? Pressione E para avançar.",
    spawn: { x: 3, y: 8 },
    npcPos: { x: 16, y: 5 },
    dojoPos: { x: 8, y: 4 },
    portalPos: { x: 26, y: 14 },
    chestPos: { x: 4, y: 14, id: "chest_shiganshina", coins: 260, gems: 9, itemId: "pluck_sword" },
    enemyPos: { x: 13, y: 11, enemyId: "pure_titan" },
    patrols: [
      { x: 13, y: 11, enemyId: "pure_titan" },
      { x: 19, y: 7, enemyId: "pure_titan" },
      { x: 24, y: 10, enemyId: "armored_titan" }
    ],
    npcLook: { hairStyle: "short", hairColor: "#0f172a", skinColor: "#f1c29b", eyeColor: "#64748b", outfitColor: "#3f4d36", outfitStyle: "coat", accessoryStyle: "scarf", visualWeapon: "katana" },
    trees: [[2, 2], [3, 2], [11, 2], [2, 13], [10, 14], [20, 2], [27, 4], [27, 10]],
    layout: buildZoneLayout([[5, 2, 2], [8, 2, 2], [15, 2, 2], [22, 2, 3]], 8)
  },
  {
    id: "nen_tower",
    name: "Torre Celestial dos Caçadores",
    anime: "Hunter x Hunter",
    minLevel: 10,
    bgmNotes: [392.00, 440.00, 523.25, 587.33, 659.25, 587.33, 523.25, 392.00],
    ground: "#3b4d6b", ground2: "#31415c", path: "#cbd5e1", wall: "#1e293b",
    npc: "Killua Zoldyck",
    dialogue: "Se piscar, você fica para trás! Domine seu Ten e Ren no Pomodoro para enfrentar o líder da Trupe Fantasma!",
    lore: "No 200º andar da Torre Celestial, apenas quem combina velocidade e estratégia de Nen sobrevive.",
    portal: "Elevador Dimensional",
    portalDialogue: "Retornar à Vila Inicial? Pressione E para viajar.",
    spawn: { x: 3, y: 8 },
    npcPos: { x: 18, y: 5 },
    dojoPos: { x: 8, y: 4 },
    portalPos: { x: 26, y: 14 },
    chestPos: { x: 4, y: 3, id: "chest_nentower", coins: 300, gems: 10, itemId: "divine_halo" },
    enemyPos: { x: 14, y: 10, enemyId: "nen_assassin" },
    patrols: [
      { x: 14, y: 10, enemyId: "nen_assassin" },
      { x: 20, y: 11, enemyId: "nen_assassin" },
      { x: 25, y: 6, enemyId: "phantom_leader" }
    ],
    npcLook: { hairStyle: "spiky", hairColor: "#e2e8f0", skinColor: "#f5d0b5", eyeColor: "#38bdf8", outfitColor: "#312e81", outfitStyle: "casual" },
    trees: [[2, 2], [3, 2], [11, 2], [12, 2], [2, 14], [3, 14], [10, 14], [11, 14], [20, 2], [27, 4], [33, 8], [33, 14], [16, 18]],
    secretSpot: { x: 32, y: 3, id: "sec_nentower", coins: 340, gems: 10, itemId: "senzu", bossId: "meruem_king" },
    layout: buildZoneLayout([[5, 2, 2], [8, 2, 2], [16, 2, 2], [23, 2, 2]], 8)
  },
  // 3 Novos Mundos v7 (14 Mundos no Total: Wano, Reino do Trevo e Portal S-Rank Jeju)
  {
    id: "wano",
    name: "País de Wano (Onigashima)",
    anime: "One Piece: Wano",
    minLevel: 11,
    bgmNotes: [293.66, 329.63, 392.00, 440.00, 523.25, 440.00, 392.00, 329.63],
    ground: "#4f3b5c", ground2: "#443250", path: "#e5c17d", wall: "#2b1d36",
    npc: "Roronoa Zoro",
    dialogue: "O Haki do Conquistador exige foco absoluto! Refine suas armas na Forja e enfrente Kaidou no topo de Onigashima!",
    lore: "As lâminas forjadas em Wano carregam a vontade do portador — cada nível de Forja liberta a aura de Enma.",
    portal: "Portal dos Sete Mares",
    portalDialogue: "Atravessar as correntes de Wano rumo ao Reino do Trevo? Pressione E.",
    spawn: { x: 3, y: 8 },
    npcPos: { x: 7, y: 5 },
    dojoPos: { x: 9, y: 4 },
    portalPos: { x: 32, y: 16 },
    chestPos: { x: 25, y: 3, id: "chest_wano", coins: 340, gems: 12, itemId: "zanpakuto_soul" },
    secretSpot: { x: 32, y: 3, id: "sec_wano", coins: 400, gems: 14, itemId: "stand_arrow_item" },
    enemyPos: { x: 15, y: 11, enemyId: "beast_pirate" },
    patrols: [
      { x: 15, y: 11, enemyId: "beast_pirate" },
      { x: 22, y: 14, enemyId: "beast_pirate" },
      { x: 26, y: 8, enemyId: "kaido_beast" }
    ],
    npcLook: { hairStyle: "short", hairColor: "#16a34a", skinColor: "#eab68c", eyeColor: "#0f172a", outfitColor: "#15803d", outfitStyle: "haori", visualWeapon: "katana" },
    trees: [[2, 2], [3, 2], [12, 2], [20, 2], [2, 17], [11, 18], [21, 18], [33, 6], [33, 12]],
    layout: buildZoneLayout([[5, 2, 2], [9, 2, 2], [17, 2, 2], [23, 2, 3]], 8)
  },
  {
    id: "clover_kingdom",
    name: "Reino do Trevo (Capital Real)",
    anime: "Black Clover",
    minLevel: 12,
    bgmNotes: [261.63, 311.13, 392.00, 466.16, 523.25, 466.16, 392.00, 311.13],
    ground: "#3b5249", ground2: "#33473f", path: "#cbd5e1", wall: "#1b2823",
    npc: "Capitão Yami Sukehiro",
    dialogue: "Não tem desculpa! Ultrapasse seus limites aqui e agora! Conclua missões semanais e derrote os demônios da Tríade!",
    lore: "Nos trevos de 5 folhas habita a antimagia capaz de anular maldições ancestrais.",
    portal: "Portal dos Cavaleiros Mágicos",
    portalDialogue: "Um Portal Vermelho S-Rank surgiu à frente! Pressione E para entrar em Jeju!",
    spawn: { x: 3, y: 8 },
    npcPos: { x: 17, y: 5 },
    dojoPos: { x: 8, y: 4 },
    portalPos: { x: 32, y: 16 },
    chestPos: { x: 4, y: 15, id: "chest_clover", coins: 380, gems: 14, itemId: "demon_dweller" },
    secretSpot: { x: 32, y: 3, id: "sec_clover", coins: 440, gems: 15, itemId: "senzu" },
    enemyPos: { x: 13, y: 12, enemyId: "dark_disciple" },
    patrols: [
      { x: 13, y: 12, enemyId: "dark_disciple" },
      { x: 21, y: 7, enemyId: "dark_disciple" },
      { x: 26, y: 13, enemyId: "megicula_devil" }
    ],
    npcLook: { hairStyle: "messy", hairColor: "#111827", skinColor: "#eab68c", eyeColor: "#475569", outfitColor: "#090d16", outfitStyle: "coat", visualWeapon: "katana" },
    trees: [[2, 2], [3, 2], [11, 2], [2, 18], [10, 18], [20, 2], [33, 5], [33, 14]],
    layout: buildZoneLayout([[5, 2, 2], [8, 2, 2], [15, 2, 2], [22, 2, 3]], 8)
  },
  {
    id: "monarch_gate",
    name: "Portal S-Rank: Ilha Jeju",
    anime: "Solo Leveling",
    minLevel: 13,
    bgmNotes: [196.00, 233.08, 261.63, 311.13, 392.00, 311.13, 261.63, 196.00],
    ground: "#1e1b4b", ground2: "#17143b", path: "#6366f1", wall: "#090d16",
    npc: "Sung Jin-Woo",
    dialogue: "O sistema não dá segundas chances a quem recua. Erga-se com consistência diária — e enfrente Beru e Igris nas profundezas.",
    lore: "Quando você extrai as sombras dos seus desafios diários, nenhum Chefe Mundial pode detê-lo.",
    portal: "Portal Retorno Dimensional",
    portalDialogue: "Retornar à Vila Inicial da Folha? Pressione E para viajar.",
    spawn: { x: 3, y: 8 },
    npcPos: { x: 18, y: 5 },
    dojoPos: { x: 8, y: 4 },
    portalPos: { x: 32, y: 16 },
    chestPos: { x: 25, y: 3, id: "chest_jeju", coins: 450, gems: 16, itemId: "divine_halo" },
    secretSpot: { x: 32, y: 3, id: "sec_jeju", coins: 520, gems: 20, itemId: "stand_arrow_item", bossId: "igris_blood_red" },
    enemyPos: { x: 14, y: 11, enemyId: "shadow_ant" },
    patrols: [
      { x: 14, y: 11, enemyId: "shadow_ant" },
      { x: 21, y: 13, enemyId: "igris_blood_red" },
      { x: 26, y: 8, enemyId: "ant_king_beru" }
    ],
    npcLook: { hairStyle: "cursed_fade", hairColor: "#090d16", skinColor: "#f1f5f9", eyeColor: "#38bdf8", outfitColor: "#111827", outfitStyle: "monarch_cloak", accessoryStyle: "energy_cape", visualWeapon: "zanpakuto" },
    trees: [[2, 2], [3, 2], [11, 2], [2, 18], [10, 18], [19, 2], [33, 7], [33, 13]],
    layout: buildZoneLayout([[5, 2, 2], [8, 2, 2], [16, 2, 2], [23, 2, 2]], 8)
  }
];

/* --- CATÁLOGOS: HÁBITOS (DAILIES), JARDIM & ALQUIMIA, MASMORRAS E TEMAS --- */
const defaultDailiesCatalog = [
  { id: "daily_water", title: "Hidratação do Guerreiro (Beber 2L de Água)", category: "health", schedule: "all", icon: "💧", streak: 1, bestStreak: 1, completedToday: false, lastCompletedDate: "", baseXp: 35, baseCoins: 18 },
  { id: "daily_study", title: "Leitura de Pergaminhos (Estudar/Ler 30 min)", category: "study", schedule: "weekdays", icon: "📘", streak: 1, bestStreak: 1, completedToday: false, lastCompletedDate: "", baseXp: 50, baseCoins: 25 },
  { id: "daily_workout", title: "Treino Físico / Alongamento Corporal", category: "fitness", schedule: "all", icon: "💪", streak: 1, bestStreak: 1, completedToday: false, lastCompletedDate: "", baseXp: 45, baseCoins: 22 },
  { id: "daily_plan", title: "Organizar Metas e Prioridades do Dia", category: "mind", schedule: "all", icon: "🧘", streak: 1, bestStreak: 1, completedToday: false, lastCompletedDate: "", baseXp: 30, baseCoins: 15 }
];

const herbsCatalog = [
  { id: "senzu_leaf", name: "Folha de Senzu", icon: "🌱", seedCost: 15, reqGrowth: 20, desc: "Cresce com 20 pts de foco/tarefas. Base de cura vital." },
  { id: "wisteria_petal", name: "Flor de Glicínia", icon: "🌸", seedCost: 25, reqGrowth: 30, desc: "Cresce com 30 pts. Purifica venenos e fortalece defesa." },
  { id: "crimson_root", name: "Raiz de Lótus Carmesim", icon: "🌺", seedCost: 40, reqGrowth: 40, desc: "Cresce com 40 pts. Amplifica o Ataque e o Crítico." },
  { id: "rokakaka_fruit", name: "Fruto Rokakaka Dourado", icon: "🌟", seedCost: 65, reqGrowth: 60, desc: "Fruto lendário de JoJo (60 pts). Desperta 100% da Energia!" }
];

const alchemyRecipesCatalog = [
  {
    id: "brew_senzu_elixir",
    name: "Elixir Senzu Concentrado",
    icon: "🧪",
    rarity: "rare",
    ingredients: { senzu_leaf: 2 },
    coinCost: 20,
    outputItem: {
      id: "potion_senzu_elixir",
      name: "Elixir Senzu Concentrado",
      type: "consumable",
      rarity: "rare",
      icon: "🧪",
      healHp: 220,
      healMp: 90,
      cleansesStatus: true,
      description: "Restaura 220 HP, 90 EN e purifica status negativos em batalha."
    }
  },
  {
    id: "brew_wisteria_ward",
    name: "Essência Purificadora de Glicínia",
    icon: "🌸",
    rarity: "epic",
    ingredients: { wisteria_petal: 2 },
    coinCost: 35,
    outputItem: {
      id: "potion_wisteria_ward",
      name: "Essência de Glicínia",
      type: "consumable",
      rarity: "epic",
      icon: "🌸",
      healHp: 140,
      healMp: 70,
      grantShield: 95,
      cleansesStatus: true,
      description: "Restaura 140 HP, 70 EN e cria um Escudo Espiritual de 95 pts."
    }
  },
  {
    id: "brew_crimson_berserk",
    name: "Tônico Berserk de Lótus",
    icon: "🍷",
    rarity: "legendary",
    ingredients: { crimson_root: 1, senzu_leaf: 1 },
    coinCost: 50,
    outputItem: {
      id: "potion_crimson_berserk",
      name: "Tônico Berserk de Lótus",
      type: "consumable",
      rarity: "legendary",
      icon: "🍷",
      healHp: 180,
      healMp: 80,
      grantRage: 50,
      description: "Restaura 180 HP, 80 EN e carrega +50% da Barra de Despertar (Ultimate)!"
    }
  },
  {
    id: "brew_rokakaka_nectar",
    name: "Néctar da Troca Equivalente (Rokakaka)",
    icon: "🍯",
    rarity: "mythic",
    ingredients: { rokakaka_fruit: 1, wisteria_petal: 1 },
    coinCost: 80,
    outputItem: {
      id: "potion_rokakaka_nectar",
      name: "Néctar Rokakaka Supremo",
      type: "consumable",
      rarity: "mythic",
      icon: "🍯",
      healHp: 999,
      healMp: 999,
      grantRage: 100,
      cleansesStatus: true,
      description: "Restaura 100% de HP/EN, purifica status e carrega 100% do Despertar!"
    }
  }
];

const dungeonsCatalog = [
  {
    id: "dungeon_cairo",
    name: "Mansão das Sombras do Cairo",
    anime: "JoJo's Bizarre Adventure",
    icon: "🏰",
    minLevel: 3,
    waves: ["vampire_minion", "kira_boss", "dio_world"],
    rewardCoins: 180,
    rewardXp: 260,
    rewardGems: 5,
    forgeDrop: { id: "meteoric_iron", name: "Ferro Meteórico de Stand", type: "material", rarity: "legendary", icon: "☄️", description: "Minério espacial raro obtido na Raid do Cairo (+1 Giro de Classe e bônus de Forja)." }
  },
  {
    id: "dungeon_las_noches",
    name: "Palácio de Las Noches",
    anime: "Bleach",
    icon: "🌙",
    minLevel: 5,
    waves: ["arrancar_guard", "upper_demon", "hollow_lord"],
    rewardCoins: 240,
    rewardXp: 340,
    rewardGems: 7,
    forgeDrop: { id: "hogyoku_shard", name: "Fragmento do Hōgyoku", type: "material", rarity: "mythic", icon: "🔮", description: "Relíquia transcendental obtida no Palácio de Las Noches." }
  },
  {
    id: "dungeon_central_lab",
    name: "5º Laboratório de Alquimia",
    anime: "Fullmetal Alchemist",
    icon: "⚗️",
    minLevel: 7,
    waves: ["state_chimera", "special_curse", "homunculus_pride"],
    rewardCoins: 300,
    rewardXp: 420,
    rewardGems: 9,
    forgeDrop: { id: "philosopher_stone", name: "Lasca da Pedra Filosofal", type: "material", rarity: "mythic", icon: "♦️", description: "Catalisador alquímico supremo conquistado em Central City." }
  },
  {
    id: "dungeon_shiganshina",
    name: "Retomada da Muralha Maria",
    anime: "Attack on Titan",
    icon: "🛡️",
    minLevel: 9,
    waves: ["pure_titan", "armored_titan", "phantom_leader"],
    rewardCoins: 380,
    rewardXp: 520,
    rewardGems: 12,
    forgeDrop: { id: "titan_crystal", name: "Cristal Endurecido Primordial", type: "material", rarity: "mythic", icon: "💎", description: "Cristal indestrutível obtido após defender Shiganshina." }
  },
  {
    id: "dungeon_wano",
    name: "Invasão ao Domo de Onigashima",
    anime: "One Piece: Wano",
    icon: "🐉",
    minLevel: 11,
    waves: ["beast_pirate", "sea_emperor", "kaido_beast"],
    rewardCoins: 460,
    rewardXp: 640,
    rewardGems: 15,
    forgeDrop: { id: "seastone_ore", name: "Minério de Kairoseki Puro", type: "material", rarity: "mythic", icon: "⛓️", description: "Metal lendário de Wano usado no refinamento supremo." }
  },
  {
    id: "dungeon_jeju",
    name: "Raid S-Rank: Castelo das Sombras",
    anime: "Solo Leveling",
    icon: "👑",
    minLevel: 13,
    waves: ["shadow_ant", "igris_blood_red", "ant_king_beru"],
    rewardCoins: 580,
    rewardXp: 820,
    rewardGems: 20,
    forgeDrop: { id: "monarch_essence", name: "Essência do Monarca das Sombras", type: "material", rarity: "secret", icon: "🖤", description: "Núcleo sombrio raríssimo da Raid S-Rank de Jeju." }
  }
];

const ANIME_THEMES = {
  default_shonen: { label: "Shonen", fullLabel: "🔥 Shonen Clássico" },
  morioh_pop: { label: "JoJo Pop", fullLabel: "💎 JoJo Morioh Pop" },
  infinite_castle: { label: "Demon Slayer", fullLabel: "🗡️ Castelo Infinito" },
  domain_void: { label: "Jujutsu", fullLabel: "🤞 Vazio Infinito" },
  leaf_village: { label: "Konoha", fullLabel: "🍥 Vila da Folha" }
};

/* =========================================================
   3. ÁUDIO SINTETIZADO POR MUNDO (WEB AUDIO API)
========================================================= */

let audioCtx = null;
let bgmTimer = null;
let bgmPlaying = false;
let bgmStep = 0;

function ensureAudio() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) audioCtx = new AudioContextClass();
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume().catch(() => {});
  }
}

function playTone(freq, duration = 0.12, type = "triangle", volumeScale = 1, slideTo = null) {
  if (!game || game.muted || game.sfxVolume <= 0) return;
  try {
    ensureAudio();
    if (!audioCtx) return;

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    if (slideTo) {
      osc.frequency.exponentialRampToValueAtTime(slideTo, audioCtx.currentTime + duration);
    }

    const vol = Math.min(0.35, (game.sfxVolume / 100) * 0.25 * volumeScale);
    gain.gain.setValueAtTime(vol, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (e) {}
}

function playSFX(kind) {
  if (!game || game.muted) return;
  if (kind === "click") {
    playTone(520, 0.06, "sine", 0.6);
  } else if (kind === "quest") {
    playTone(523.25, 0.1, "triangle", 0.9);
    setTimeout(() => playTone(659.25, 0.1, "triangle", 0.9), 90);
    setTimeout(() => playTone(783.99, 0.18, "triangle", 1.0), 180);
  } else if (kind === "levelup") {
    [440, 554.37, 659.25, 880].forEach((f, idx) => {
      setTimeout(() => playTone(f, 0.16, "square", 0.8), idx * 95);
    });
  } else if (kind === "stand") {
    playTone(190, 0.25, "sawtooth", 1.0, 680);
    setTimeout(() => playTone(540, 0.22, "square", 0.9, 880), 110);
  } else if (kind === "spin") {
    playTone(620, 0.05, "triangle", 0.55);
  } else if (kind === "attack") {
    playTone(260, 0.11, "sawtooth", 0.9, 110);
  } else if (kind === "skill") {
    playTone(320, 0.22, "sawtooth", 1.0, 840);
    setTimeout(() => playTone(640, 0.18, "triangle", 0.9, 220), 120);
  } else if (kind === "hit") {
    playTone(150, 0.12, "square", 0.85, 65);
  } else if (kind === "chest") {
    playTone(587.33, 0.1, "triangle", 0.9);
    setTimeout(() => playTone(880, 0.22, "triangle", 1.0), 110);
  } else if (kind === "portal") {
    playTone(300, 0.28, "sine", 0.9, 900);
  }
}

const DEFAULT_BGM_NOTES = [261.63, 329.63, 392.00, 440.00, 392.00, 329.63, 293.66, 349.23];

function toggleBGM(forceState) {
  bgmPlaying = typeof forceState === "boolean" ? forceState : !bgmPlaying;
  clearInterval(bgmTimer);
  bgmTimer = null;

  if (bgmPlaying && !game.muted && game.bgmVolume > 0) {
    ensureAudio();
    bgmTimer = setInterval(() => {
      if (game.muted || game.bgmVolume <= 0 || document.hidden) return;
      try {
        if (!audioCtx) return;
        const zoneNotes = (zones[game.zone] && zones[game.zone].bgmNotes) || DEFAULT_BGM_NOTES;
        const note = zoneNotes[bgmStep % zoneNotes.length];
        bgmStep++;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(note, audioCtx.currentTime);
        const vol = (game.bgmVolume / 100) * 0.06;
        gain.gain.setValueAtTime(vol, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0008, audioCtx.currentTime + 0.42);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.45);
      } catch (e) {}
    }, 500);
  }
}

/* =========================================================
   4. DATAS, ESTADO DO JOGO E NORMALIZAÇÃO RETROCOMPATÍVEL
========================================================= */

function dateString(offsetDays = 0) {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function todayString() {
  return dateString(0);
}

const VALID_HAIR_STYLES = [
  "spiky", "short", "long", "messy", "ponytail", "twin",
  "pompadour", "jotaro_cap", "giorno_rolls", "super_spiky", "bowl", "cursed_fade",
  "levi_undercut", "dual_color", "braid_alchemy", "killua_fluffy"
];

const VALID_OUTFIT_STYLES = [
  "classic", "casual", "school", "ninja", "gi", "haori", "coat", "jojo_coat", "akatsuki", "cosmic_armor",
  "survey_cloak", "alchemist_coat", "hunter_vest", "monarch_cloak"
];

const VALID_ACCESSORY_STYLES = [
  "none", "headband", "glasses", "earrings", "strawhat", "scarf", "mask", "jojo_hat", "cape", "halo",
  "demon_horns", "cursed_blindfold", "anbu_mask", "energy_cape"
];

function createInitialState() {
  return {
    name: "Aventureiro",
    charClass: "adventurer",
    unlockedClasses: ["adventurer"],
    classSpins: 3,
    classRollHistory: [],
    equippedStand: "none",
    unlockedStands: [],
    standArrows: 1,
    title: "novice",
    companion: "fox",
    xp: 0,
    totalXp: 0,
    level: 1,
    coins: 90,
    gems: 6,
    hp: 100,
    mp: 50,
    statPoints: 2,
    stats: { atk: 10, def: 6, hp: 100, mp: 50, spd: 8 },
    totalCompleted: 0,
    battlesWon: 0,
    streak: 0,
    bestStreak: 0,
    focusMinutes: 0,
    dailyActivityLog: {},
    journeyDays: 1,
    lastActive: "",
    lastQuestDate: todayString(),
    dailyBonusClaimed: false,
    dojoClaimDate: "",
    dojoTrainDate: todayString(),
    dojoTrainingsToday: 0,
    totalDojoTrains: 0,
    dojoTargetHits: 0,
    claimedDojoQuests: [],
    dojoUpgrades: [],
    itemRefines: {},
    quests: defaultQuests.map(q => ({ ...q, completed: false, custom: false })),
    questHistory: [],
    hairStyle: "spiky",
    outfitStyle: "classic",
    accessoryStyle: "none",
    hairColor: "#29213e",
    skinColor: "#e9b995",
    eyeColor: "#55c8ff",
    outfitColor: "#7047dc",
    unlockedSkills: [],
    equippedSkills: [],
    skillLevels: {},
    inventory: [
      { id: "starter", name: "Medalha de Iniciante", type: "medal", rarity: "common", icon: "🎖️", qty: 1, description: "Sua primeira recompensa no Anime Life RPG." },
      { id: "ramen", name: "Ramen Ichiraku", type: "consumable", rarity: "common", icon: "🍜", qty: 2, healHp: 60, healMp: 20, description: "Recupera 60 de Vida e 20 de Energia." }
    ],
    equippedItems: { weapon: null, armor: null, accessory: null },
    unlockedAchievements: [],
    claimedChallenges: [],
    claimedNpcQuests: [],
    openedChests: [],
    defeatedBosses: [],
    mapX: zones[0].spawn.x,
    mapY: zones[0].spawn.y,
    zone: 0,
    visitedZones: [0],
    timeMode: "auto",
    sfxVolume: 70,
    bgmVolume: 40,
    muted: false,
    tutorialSeen: false,
    // Estado v6
    saveVersion: SAVE_VERSION,
    streakFreezes: 1,
    streakFreezeProtectedDate: "",
    theme: "default_shonen",
    dailies: defaultDailiesCatalog.map(d => ({ ...d, streak: 0, bestStreak: 0 })),
    dojoGarden: {
      plots: [
        { unlocked: true, seedId: null, growth: 0 },
        { unlocked: true, seedId: null, growth: 0 },
        { unlocked: false, seedId: null, growth: 0 },
        { unlocked: false, seedId: null, growth: 0 }
      ],
      herbs: { senzu_leaf: 1, wisteria_petal: 0, crimson_root: 0, rokakaka_fruit: 0 }
    },
    potionsBrewed: 0,
    clearedDungeons: [],
    analytics: {},
    // Estado v7
    gameMode: "routine",
    routineEnergy: 30,
    routineMaxEnergy: 100,
    unlockedMounts: ["none"],
    equippedMount: "none",
    standLevels: {},
    companionLevels: {},
    guild: { id: "scout_corps", name: "Tropa de Exploração", icon: "🕊️", level: 1, xp: 0, custom: false },
    claimedGuildMissions: [],
    activeEventId: "evt_cairo_bloodmoon",
    claimedEventMissions: [],
    claimedJojoQuests: [],
    unlockedDojoSkills: [],
    gfxQuality: "high",
    streakMilestonesClaimed: [],
    profileId: "slot1",
    activeAuraStyle: "auto",
    rollPityCounter: 0,
    standRollHistory: []
  };
}

const PLOT_UNLOCK_COSTS = [0, 0, 250, 600];

function normalizeV6Data(g, initial) {
  g.saveVersion = SAVE_VERSION;
  g.streakFreezes = Math.max(0, Math.min(5, Math.floor(toNumber(g.streakFreezes, initial.streakFreezes))));
  g.streakFreezeProtectedDate = typeof g.streakFreezeProtectedDate === "string" ? g.streakFreezeProtectedDate : "";
  g.theme = ANIME_THEMES[g.theme] ? g.theme : "default_shonen";

  g.dailies = Array.isArray(g.dailies)
    ? g.dailies
        .filter(d => d && typeof d === "object" && d.id && d.title)
        .slice(0, 12)
        .map(d => ({
          id: String(d.id),
          title: String(d.title).slice(0, 60),
          category: ["health", "study", "fitness", "mind"].includes(d.category) ? d.category : "mind",
          schedule: ["all", "weekdays", "weekends"].includes(d.schedule) ? d.schedule : "all",
          icon: String(d.icon || "✅"),
          streak: Math.max(0, Math.floor(toNumber(d.streak, 0))),
          bestStreak: Math.max(0, Math.floor(toNumber(d.bestStreak, 0))),
          completedToday: Boolean(d.completedToday),
          lastCompletedDate: typeof d.lastCompletedDate === "string" ? d.lastCompletedDate : "",
          baseXp: Math.max(5, Math.floor(toNumber(d.baseXp, 30))),
          baseCoins: Math.max(2, Math.floor(toNumber(d.baseCoins, 15)))
        }))
    : initial.dailies;

  const rawGarden = g.dojoGarden && typeof g.dojoGarden === "object" ? g.dojoGarden : {};
  const rawPlots = Array.isArray(rawGarden.plots) ? rawGarden.plots : [];
  g.dojoGarden = {
    plots: initial.dojoGarden.plots.map((def, idx) => {
      const p = rawPlots[idx] && typeof rawPlots[idx] === "object" ? rawPlots[idx] : {};
      return {
        unlocked: idx < 2 ? true : Boolean(p.unlocked),
        seedId: herbsCatalog.some(h => h.id === p.seedId) ? p.seedId : null,
        growth: Math.max(0, Math.floor(toNumber(p.growth, 0)))
      };
    }),
    herbs: {}
  };
  const rawHerbs = rawGarden.herbs && typeof rawGarden.herbs === "object" ? rawGarden.herbs : initial.dojoGarden.herbs;
  herbsCatalog.forEach(h => {
    g.dojoGarden.herbs[h.id] = Math.max(0, Math.floor(toNumber(rawHerbs[h.id], 0)));
  });

  g.potionsBrewed = Math.max(0, Math.floor(toNumber(g.potionsBrewed, 0)));
  g.clearedDungeons = Array.isArray(g.clearedDungeons)
    ? [...new Set(g.clearedDungeons.filter(id => dungeonsCatalog.some(d => d.id === id)))]
    : [];

  const rawAnalytics = g.analytics && typeof g.analytics === "object" ? g.analytics : {};
  g.analytics = {};
  Object.keys(rawAnalytics)
    .filter(k => /^\d{4}-\d{2}-\d{2}$/.test(k))
    .sort()
    .slice(-60)
    .forEach(k => {
      const e = rawAnalytics[k] || {};
      g.analytics[k] = {
        focus: Math.max(0, Math.floor(toNumber(e.focus, 0))),
        tasks: Math.max(0, Math.floor(toNumber(e.tasks, 0))),
        dailies: Math.max(0, Math.floor(toNumber(e.dailies, 0))),
        battles: Math.max(0, Math.floor(toNumber(e.battles, 0)))
      };
    });
  return g;
}

function sanitizeColor(value, fallback) {
  return typeof value === "string" && /^#[0-9a-f]{6}$/i.test(value) ? value : fallback;
}

function sanitizeHairStyle(value) {
  return VALID_HAIR_STYLES.includes(value) ? value : "spiky";
}

function sanitizeOutfitStyle(value) {
  return VALID_OUTFIT_STYLES.includes(value) ? value : "classic";
}

function sanitizeAccessoryStyle(value) {
  return VALID_ACCESSORY_STYLES.includes(value) ? value : "none";
}

function toNumber(value, fallback = 0) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function cumulativeXpBeforeLevel(lvl) {
  let sum = 0;
  for (let i = 1; i < lvl; i++) sum += i * 100;
  return sum;
}

function isBlockedIn(zoneIndex, x, y) {
  if (x < 0 || y < 0 || x >= MAP_WIDTH || y >= MAP_HEIGHT) return true;
  const zone = zones[zoneIndex];
  if (!zone || !zone.layout[y]) return true;
  const cell = zone.layout[y][x];
  if (cell === "1" || cell === "3") return true;
  if (zone.trees.some(([tx, ty]) => tx === x && ty === y)) return true;
  if (zone.npcPos.x === x && zone.npcPos.y === y) return true;
  if (zone.chestPos && zone.chestPos.x === x && zone.chestPos.y === y) return true;
  return false;
}

function normalizeGame(data) {
  const initial = createInitialState();
  const g = { ...initial, ...(data && typeof data === "object" ? data : {}) };

  g.name = String(g.name || "Aventureiro").slice(0, 20);
  g.charClass = classesCatalog.some(c => c.id === g.charClass) ? g.charClass : "adventurer";
  g.unlockedClasses = Array.isArray(g.unlockedClasses)
    ? [...new Set(["adventurer", g.charClass, ...g.unlockedClasses.filter(id => classesCatalog.some(c => c.id === id))])]
    : ["adventurer", g.charClass];
  g.classSpins = Math.max(0, Math.floor(toNumber(g.classSpins, 3)));
  g.classRollHistory = Array.isArray(g.classRollHistory)
    ? g.classRollHistory.filter(h => h && typeof h === "object" && h.name).slice(0, 25)
    : [];

  g.unlockedStands = Array.isArray(g.unlockedStands)
    ? [...new Set(g.unlockedStands.filter(id => id !== "none" && standsCatalog.some(s => s.id === id)))]
    : [];
  g.equippedStand = standsCatalog.some(s => s.id === g.equippedStand) && (g.equippedStand === "none" || g.unlockedStands.includes(g.equippedStand))
    ? g.equippedStand
    : (g.unlockedStands[0] || "none");
  g.standArrows = Math.max(0, Math.floor(toNumber(g.standArrows, 1)));

  g.level = Math.max(1, Math.floor(toNumber(g.level, 1)));
  g.xp = Math.max(0, Math.floor(toNumber(g.xp, 0)));
  const minTotalXp = cumulativeXpBeforeLevel(g.level) + g.xp;
  g.totalXp = Math.max(minTotalXp, Math.floor(toNumber(g.totalXp, minTotalXp)));
  g.coins = Math.max(0, Math.floor(toNumber(g.coins, 0)));
  g.gems = Math.max(0, Math.floor(toNumber(g.gems, 0)));
  g.totalCompleted = Math.max(0, Math.floor(toNumber(g.totalCompleted, 0)));
  g.battlesWon = Math.max(0, Math.floor(toNumber(g.battlesWon, 0)));
  g.streak = Math.max(0, Math.floor(toNumber(g.streak, 0)));
  g.bestStreak = Math.max(g.streak, Math.floor(toNumber(g.bestStreak, g.streak)));
  g.focusMinutes = Math.max(0, Math.floor(toNumber(g.focusMinutes, 0)));
  g.dailyActivityLog = g.dailyActivityLog && typeof g.dailyActivityLog === "object" ? g.dailyActivityLog : {};
  g.journeyDays = Math.max(1, Math.floor(toNumber(g.journeyDays, 1)));
  g.statPoints = Math.max(0, Math.floor(toNumber(g.statPoints, 0)));
  g.lastActive = typeof g.lastActive === "string" ? g.lastActive : "";
  g.lastQuestDate = typeof g.lastQuestDate === "string" ? g.lastQuestDate : todayString();
  g.dailyBonusClaimed = Boolean(g.dailyBonusClaimed);
  g.dojoClaimDate = typeof g.dojoClaimDate === "string" ? g.dojoClaimDate : "";
  g.dojoTrainDate = typeof g.dojoTrainDate === "string" ? g.dojoTrainDate : todayString();
  g.dojoTrainingsToday = Math.max(0, Math.floor(toNumber(g.dojoTrainingsToday, 0)));
  g.totalDojoTrains = Math.max(0, Math.floor(toNumber(g.totalDojoTrains, 0)));
  g.dojoTargetHits = Math.max(0, Math.floor(toNumber(g.dojoTargetHits, 0)));
  g.claimedDojoQuests = Array.isArray(g.claimedDojoQuests) ? [...new Set(g.claimedDojoQuests.map(String))] : [];
  g.dojoUpgrades = Array.isArray(g.dojoUpgrades)
    ? [...new Set(g.dojoUpgrades.filter(id => dojoCatalog.some(d => d.id === id)))]
    : [];

  const rawRefines = g.itemRefines && typeof g.itemRefines === "object" ? g.itemRefines : {};
  g.itemRefines = {};
  Object.keys(rawRefines).forEach(k => {
    g.itemRefines[k] = Math.max(0, Math.min(10, Math.floor(toNumber(rawRefines[k], 0))));
  });

  const rawStats = g.stats && typeof g.stats === "object" ? g.stats : {};
  g.stats = {
    atk: Math.max(5, Math.floor(toNumber(rawStats.atk, 10 + (g.level - 1) * 2))),
    def: Math.max(3, Math.floor(toNumber(rawStats.def, 6 + (g.level - 1)))),
    hp: Math.max(60, Math.floor(toNumber(rawStats.hp, 100 + (g.level - 1) * 15))),
    mp: Math.max(30, Math.floor(toNumber(rawStats.mp, 50 + (g.level - 1) * 6))),
    spd: Math.max(5, Math.floor(toNumber(rawStats.spd, 8 + (g.level - 1))))
  };

  g.hairStyle = sanitizeHairStyle(g.hairStyle);
  g.outfitStyle = sanitizeOutfitStyle(g.outfitStyle);
  g.accessoryStyle = sanitizeAccessoryStyle(g.accessoryStyle);
  g.hairColor = sanitizeColor(g.hairColor, initial.hairColor);
  g.skinColor = sanitizeColor(g.skinColor, initial.skinColor);
  g.eyeColor = sanitizeColor(g.eyeColor, initial.eyeColor);
  g.outfitColor = sanitizeColor(g.outfitColor, initial.outfitColor);

  g.title = titlesCatalog.some(t => t.id === g.title) ? g.title : "novice";
  g.companion = companionsCatalog.some(c => c.id === g.companion) ? g.companion : "fox";

  if (Array.isArray(g.quests)) {
    g.quests = g.quests
      .filter(q => q && typeof q === "object" && q.id && q.name)
      .map(q => ({
        id: String(q.id),
        name: String(q.name).slice(0, 60),
        xp: Math.max(0, toNumber(q.xp, 20)),
        coins: Math.max(0, toNumber(q.coins, 8)),
        difficulty: ["easy", "medium", "hard", "epic"].includes(q.difficulty) ? q.difficulty : "easy",
        completed: Boolean(q.completed),
        custom: Boolean(q.custom)
      }));
  } else {
    g.quests = [];
  }
  if (!g.quests.length) g.quests = initial.quests;

  g.questHistory = Array.isArray(g.questHistory)
    ? g.questHistory.filter(h => h && typeof h === "object" && h.name).slice(0, 40)
    : [];

  g.unlockedSkills = Array.isArray(g.unlockedSkills)
    ? [...new Set(g.unlockedSkills.filter(id => skills.some(s => s.id === id)))]
    : [];

  g.equippedSkills = Array.isArray(g.equippedSkills)
    ? [...new Set(g.equippedSkills.filter(id => g.unlockedSkills.includes(id)))].slice(0, 4)
    : [];

  const rawSkillLevels = g.skillLevels && typeof g.skillLevels === "object" ? g.skillLevels : {};
  g.skillLevels = {};
  g.unlockedSkills.forEach(id => {
    g.skillLevels[id] = Math.max(1, Math.min(5, Math.floor(toNumber(rawSkillLevels[id], 1))));
  });

  if (Array.isArray(g.inventory)) {
    g.inventory = g.inventory
      .filter(item => item && typeof item === "object" && item.id && item.name)
      .map(item => {
        const shopRef = shopCatalog.find(s => s.id === item.id);
        return {
          ...(shopRef || {}),
          id: String(item.id),
          name: String(item.name),
          icon: String(item.icon || (shopRef && shopRef.icon) || "📦"),
          description: String(item.description || (shopRef && shopRef.description) || "Item do inventário."),
          type: item.type || (shopRef && shopRef.type) || "misc",
          rarity: item.rarity || (shopRef && shopRef.rarity) || "common",
          qty: Math.max(1, Math.floor(toNumber(item.qty, 1)))
        };
      });
  } else {
    g.inventory = initial.inventory;
  }

  const eq = g.equippedItems && typeof g.equippedItems === "object" ? g.equippedItems : {};
  g.equippedItems = {
    weapon: g.inventory.some(i => i.id === eq.weapon) ? eq.weapon : null,
    armor: g.inventory.some(i => i.id === eq.armor) ? eq.armor : null,
    accessory: g.inventory.some(i => i.id === eq.accessory) ? eq.accessory : null
  };

  g.unlockedAchievements = Array.isArray(g.unlockedAchievements)
    ? [...new Set(g.unlockedAchievements.filter(id => achievements.some(a => a.id === id)))]
    : [];
  g.claimedChallenges = Array.isArray(g.claimedChallenges) ? [...new Set(g.claimedChallenges.map(String))] : [];
  g.claimedNpcQuests = Array.isArray(g.claimedNpcQuests) ? [...new Set(g.claimedNpcQuests.map(String))] : [];
  g.openedChests = Array.isArray(g.openedChests) ? [...new Set(g.openedChests.map(String))] : [];
  g.defeatedBosses = Array.isArray(g.defeatedBosses) ? [...new Set(g.defeatedBosses.map(String))] : [];

  g.visitedZones = Array.isArray(g.visitedZones)
    ? [...new Set(g.visitedZones.map(z => Math.floor(toNumber(z, 0))).filter(z => z >= 0 && z < zones.length))]
    : [0];
  if (!g.visitedZones.includes(0)) g.visitedZones.unshift(0);

  g.zone = Math.max(0, Math.min(zones.length - 1, Math.floor(toNumber(g.zone, 0))));
  g.mapX = Math.max(1, Math.min(MAP_WIDTH - 2, Math.floor(toNumber(g.mapX, zones[g.zone].spawn.x))));
  g.mapY = Math.max(1, Math.min(MAP_HEIGHT - 2, Math.floor(toNumber(g.mapY, zones[g.zone].spawn.y))));

  if (isBlockedIn(g.zone, g.mapX, g.mapY)) {
    g.mapX = zones[g.zone].spawn.x;
    g.mapY = zones[g.zone].spawn.y;
  }

  g.timeMode = ["auto", "day", "sunset", "night"].includes(g.timeMode) ? g.timeMode : "auto";
  g.sfxVolume = Math.max(0, Math.min(100, Math.floor(toNumber(g.sfxVolume, 70))));
  g.bgmVolume = Math.max(0, Math.min(100, Math.floor(toNumber(g.bgmVolume, 40))));
  g.muted = Boolean(g.muted);
  g.tutorialSeen = Boolean(g.tutorialSeen);

  g.hp = Math.max(1, Math.floor(toNumber(g.hp, g.stats.hp)));
  g.mp = Math.max(0, Math.floor(toNumber(g.mp, g.stats.mp)));

  normalizeV6Data(g, initial);
  normalizeV7Data(g, initial);
  return g;
}

function normalizeV7Data(g, initial) {
  g.saveVersion = SAVE_VERSION;
  g.gameMode = ["routine", "adventure"].includes(g.gameMode) ? g.gameMode : "routine";
  g.routineMaxEnergy = Math.max(100, Math.floor(toNumber(g.routineMaxEnergy, 100)));
  g.routineEnergy = Math.max(0, Math.min(g.routineMaxEnergy, Math.floor(toNumber(g.routineEnergy, initial.routineEnergy))));

  g.unlockedMounts = Array.isArray(g.unlockedMounts)
    ? [...new Set(["none", ...g.unlockedMounts.filter(id => mountsCatalog.some(m => m.id === id))])]
    : ["none"];
  g.equippedMount = mountsCatalog.some(m => m.id === g.equippedMount) && g.unlockedMounts.includes(g.equippedMount)
    ? g.equippedMount
    : "none";

  const rawStandLvls = g.standLevels && typeof g.standLevels === "object" ? g.standLevels : {};
  g.standLevels = {};
  (g.unlockedStands || []).forEach(id => {
    g.standLevels[id] = Math.max(1, Math.min(3, Math.floor(toNumber(rawStandLvls[id], 1))));
  });

  const rawCompLvls = g.companionLevels && typeof g.companionLevels === "object" ? g.companionLevels : {};
  g.companionLevels = {};
  companionsCatalog.forEach(c => {
    if (c.id !== "none" && rawCompLvls[c.id]) {
      g.companionLevels[c.id] = Math.max(1, Math.min(5, Math.floor(toNumber(rawCompLvls[c.id], 1))));
    }
  });

  const rawGuild = g.guild && typeof g.guild === "object" ? g.guild : initial.guild;
  g.guild = {
    id: guildsCatalog.some(gd => gd.id === rawGuild.id) ? rawGuild.id : "custom",
    name: String(rawGuild.name || initial.guild.name).slice(0, 28),
    icon: String(rawGuild.icon || "⚔️").slice(0, 4),
    level: Math.max(1, Math.min(10, Math.floor(toNumber(rawGuild.level, 1)))),
    xp: Math.max(0, Math.floor(toNumber(rawGuild.xp, 0))),
    custom: Boolean(rawGuild.custom)
  };
  g.claimedGuildMissions = Array.isArray(g.claimedGuildMissions) ? [...new Set(g.claimedGuildMissions.map(String))] : [];

  g.activeEventId = eventsCatalog.some(ev => ev.id === g.activeEventId) ? g.activeEventId : eventsCatalog[0].id;
  g.claimedEventMissions = Array.isArray(g.claimedEventMissions) ? [...new Set(g.claimedEventMissions.map(String))] : [];
  g.claimedJojoQuests = Array.isArray(g.claimedJojoQuests) ? [...new Set(g.claimedJojoQuests.map(String))] : [];
  g.unlockedDojoSkills = Array.isArray(g.unlockedDojoSkills) ? [...new Set(g.unlockedDojoSkills.map(String))] : [];
  g.gfxQuality = ["high", "medium", "low"].includes(g.gfxQuality) ? g.gfxQuality : "high";
  g.streakMilestonesClaimed = Array.isArray(g.streakMilestonesClaimed) ? [...new Set(g.streakMilestonesClaimed.map(Number))] : [];
  g.profileId = ["slot1", "slot2", "slot3"].includes(g.profileId) ? g.profileId : "slot1";
  g.activeAuraStyle = typeof g.activeAuraStyle === "string" ? g.activeAuraStyle : "auto";
  g.rollPityCounter = Math.max(0, Math.min(20, Math.floor(toNumber(g.rollPityCounter, 0))));
  g.standRollHistory = Array.isArray(g.standRollHistory)
    ? g.standRollHistory.filter(h => h && typeof h === "object" && h.name).slice(0, 20)
    : [];
}

function computeSaveChecksum(str) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  return ("00000000" + h.toString(16)).slice(-8);
}

function getActiveProfileSaveKey() {
  try {
    const activeSlot = localStorage.getItem(PROFILES_KEY) || "slot1";
    return activeSlot === "slot1" ? SAVE_KEY : `${SAVE_KEY}_${activeSlot}`;
  } catch {
    return SAVE_KEY;
  }
}

let allowEmptyResetSave = false;

function exportSyncCode() {
  try {
    const payload = JSON.stringify({ v: SAVE_VERSION, g: game });
    const chk = computeSaveChecksum(payload);
    const bytes = encodeURIComponent(payload);
    return `ALR7|${chk}|${bytes}`;
  } catch {
    return "";
  }
}

function importSyncCode(code) {
  try {
    const trimmed = String(code || "").trim();
    const parts = trimmed.split("|");
    if (parts.length !== 3 || parts[0] !== "ALR7") {
      notify("Código de sincronização inválido.");
      return false;
    }
    const payload = decodeURIComponent(parts[2]);
    if (computeSaveChecksum(payload) !== parts[1]) {
      notify("❌ Código corrompido ou alterado (falha na validação de integridade)!");
      return false;
    }
    const obj = JSON.parse(payload);
    if (!obj || !obj.g || typeof obj.g !== "object") {
      notify("Estrutura de dados inválida no código.");
      return false;
    }
    saveGame(true);
    game = normalizeGame(obj.g);
    syncMapState();
    saveGame(true);
    applyTheme(game.theme);
    renderAll();
    notify(`☁️ Progresso sincronizado com sucesso: ${game.name} (Nv.${game.level})!`);
    return true;
  } catch (e) {
    notify("Erro ao ler código de sincronização.");
    return false;
  }
}

function getBackupsList() {
  try {
    const raw = localStorage.getItem(BACKUP_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(b => b && b.data && typeof b.data === "object") : [];
  } catch {
    return [];
  }
}

function writeRollingBackup(snapshotObj, force = false) {
  try {
    if (!snapshotObj || typeof snapshotObj !== "object") return;
    const list = getBackupsList();
    const now = Date.now();
    if (!force && list.length > 0 && now - (list[0].ts || 0) < 60000) {
      return;
    }
    const entry = {
      ts: now,
      label: new Date(now).toLocaleString("pt-BR"),
      level: snapshotObj.level || 1,
      name: snapshotObj.name || "Aventureiro",
      data: snapshotObj
    };
    const next = [entry, ...list].slice(0, 3);
    localStorage.setItem(BACKUP_KEY, JSON.stringify(next));
  } catch {
    // Silencioso caso localStorage esteja no limite
  }
}

function renderBackupStatus() {
  const el = document.getElementById("backupStatusText");
  const btn = document.getElementById("restoreBackupBtn");
  const list = getBackupsList();
  if (el) {
    el.textContent = list.length
      ? `✅ ${list.length} backup(s) automático(s) • Último: ${list[0].label} (${list[0].name} • Nv.${list[0].level})`
      : "Nenhum backup automático registrado ainda.";
  }
  if (btn) btn.disabled = list.length === 0;
}

function restoreLatestBackup() {
  const list = getBackupsList();
  if (!list.length) {
    notify("Nenhum backup automático encontrado.");
    return;
  }
  const latest = list[0];
  const confirmed = window.confirm(`Restaurar backup de ${latest.label} (${latest.name}, Nível ${latest.level})?`);
  if (!confirmed) return;
  game = normalizeGame(latest.data);
  syncMapState();
  saveGame(true);
  applyTheme(game.theme);
  renderAll();
  notify(`↩ Backup restaurado: ${latest.name} (Nível ${latest.level})!`);
}

function loadGame() {
  const key = getActiveProfileSaveKey();
  try {
    const saved = localStorage.getItem(key);
    if (!saved) return createInitialState();
    const parsed = JSON.parse(saved);
    if (parsed && typeof parsed === "object" && Number(parsed.saveVersion || 1) < SAVE_VERSION) {
      writeRollingBackup(parsed, true);
    }
    return normalizeGame(parsed);
  } catch (error) {
    console.error("Erro ao carregar o jogo, tentando backup:", error);
    const backups = getBackupsList();
    if (backups.length) {
      return normalizeGame(backups[0].data);
    }
    return createInitialState();
  }
}

let game = loadGame();

function saveGame(forceBackup = false) {
  const key = getActiveProfileSaveKey();
  try {
    if (!allowEmptyResetSave) {
      const prevRaw = localStorage.getItem(key);
      if (prevRaw) {
        try {
          const prev = JSON.parse(prevRaw);
          if (prev && ((prev.totalXp || 0) > 150 || (prev.level || 1) > 1) && (game.totalXp || 0) === 0 && (game.level || 1) === 1 && (game.totalCompleted || 0) === 0) {
            console.warn("Proteção contra sobrescrita vazia ativada!");
            return;
          }
        } catch {
          // Ignore malformed prev during overwrite
        }
      }
    }
    localStorage.setItem(key, JSON.stringify(game));
    writeRollingBackup(game, forceBackup === true);
    renderBackupStatus();
  } catch (error) {
    console.error("Não foi possível salvar:", error);
    notify("Não foi possível salvar o progresso.");
  }
}

let saveTimer = null;
function scheduleSave() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => saveGame(false), 300);
}

window.addEventListener("beforeunload", () => saveGame(false));

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, character => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  })[character]);
}

function notify(message) {
  const stack = document.getElementById("rewardToastStack");
  if (stack && typeof document.createElement === "function") {
    const card = document.createElement("div");
    card.className = "reward-toast-card";
    card.textContent = message;
    if (typeof stack.appendChild === "function") {
      stack.appendChild(card);
      while (stack.children && stack.children.length > 4) {
        stack.removeChild(stack.firstChild);
      }
      setTimeout(() => {
        if (card.parentNode) card.parentNode.removeChild(card);
      }, 3400);
    }
  }
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(notify.timer);
  notify.timer = setTimeout(() => toast.classList.remove("show"), 2700);
}

/* =========================================================
   5. CÁLCULO DE ATRIBUTOS TOTAIS (BASE + CLASSE + STAND + FORJA + DOJO + PET)
========================================================= */

function getActiveClassObj() {
  return classesCatalog.find(c => c.id === game.charClass) || classesCatalog[0];
}

function getActiveStandObj() {
  return standsCatalog.find(s => s.id === game.equippedStand) || standsCatalog[0];
}

function getRarityMeta(rarityKey) {
  return RARITY_META[rarityKey] || RARITY_META.common;
}

function getItemRefineLevel(itemId) {
  return (game.itemRefines && game.itemRefines[itemId]) || 0;
}

function getRefinedStat(baseVal, refineLvl) {
  if (!baseVal) return 0;
  return Math.round(baseVal * (1 + refineLvl * 0.15));
}

function getTotalStats() {
  const totals = {
    atk: game.stats.atk,
    def: game.stats.def,
    maxHp: game.stats.hp,
    maxMp: game.stats.mp,
    spd: game.stats.spd,
    crit: 8,
    skillBonus: 0,
    standBonus: 0,
    xpBonus: 0,
    coinBonus: 0
  };

  // Bônus da Classe Equipada
  const cls = getActiveClassObj();
  if (cls && cls.bonuses) {
    if (cls.bonuses.atk) totals.atk += cls.bonuses.atk;
    if (cls.bonuses.def) totals.def += cls.bonuses.def;
    if (cls.bonuses.hp) totals.maxHp += cls.bonuses.hp;
    if (cls.bonuses.mp) totals.maxMp += cls.bonuses.mp;
    if (cls.bonuses.spd) totals.spd += cls.bonuses.spd;
    if (cls.bonuses.crit) totals.crit += cls.bonuses.crit;
    if (cls.bonuses.skillBonus) totals.skillBonus += cls.bonuses.skillBonus;
    if (cls.bonuses.standBonus) totals.standBonus += cls.bonuses.standBonus;
    if (cls.bonuses.xpBonus) totals.xpBonus += cls.bonuses.xpBonus;
    if (cls.bonuses.coinBonus) totals.coinBonus += cls.bonuses.coinBonus;
  }

  // Bônus do Stand Equipado (JoJo) + Evolução Requiem (Nv.1..3 -> +22% por estágio extra)
  const stand = getActiveStandObj();
  if (stand && stand.id !== "none" && stand.bonuses) {
    const sLvl = (game.standLevels && game.standLevels[stand.id]) || 1;
    const sMult = 1 + (sLvl - 1) * 0.25;
    if (stand.bonuses.atk) totals.atk += Math.round(stand.bonuses.atk * sMult);
    if (stand.bonuses.def) totals.def += Math.round(stand.bonuses.def * sMult);
    if (stand.bonuses.hp) totals.maxHp += Math.round(stand.bonuses.hp * sMult);
    if (stand.bonuses.mp) totals.maxMp += Math.round(stand.bonuses.mp * sMult);
    if (stand.bonuses.spd) totals.spd += Math.round(stand.bonuses.spd * sMult);
    if (stand.bonuses.crit) totals.crit += Math.round(stand.bonuses.crit * sMult);
  }

  // Equipamentos + Refinamento da Forja (+15% por nível)
  ["weapon", "armor", "accessory"].forEach(slot => {
    const itemId = game.equippedItems[slot];
    if (!itemId) return;
    const item = shopCatalog.find(s => s.id === itemId) || game.inventory.find(i => i.id === itemId);
    if (!item) return;
    const refLvl = getItemRefineLevel(itemId);
    if (item.atk) totals.atk += getRefinedStat(item.atk, refLvl);
    if (item.def) totals.def += getRefinedStat(item.def, refLvl);
    if (item.hp) totals.maxHp += getRefinedStat(item.hp, refLvl);
    if (item.mp) totals.maxMp += getRefinedStat(item.mp, refLvl);
    if (item.spd) totals.spd += getRefinedStat(item.spd, refLvl);
  });

  // Habilidades equipadas
  game.equippedSkills.forEach(skillId => {
    const sk = skills.find(s => s.id === skillId);
    if (!sk || !sk.passive) return;
    const lvl = game.skillLevels[skillId] || 1;
    const mult = 1 + (lvl - 1) * 0.25;
    if (sk.passive.atk) totals.atk += Math.round(sk.passive.atk * mult);
    if (sk.passive.def) totals.def += Math.round(sk.passive.def * mult);
    if (sk.passive.hp) totals.maxHp += Math.round(sk.passive.hp * mult);
    if (sk.passive.mp) totals.maxMp += Math.round(sk.passive.mp * mult);
    if (sk.passive.spd) totals.spd += Math.round(sk.passive.spd * mult);
    if (sk.passive.xpBonus) totals.xpBonus += Math.round(sk.passive.xpBonus * mult);
    if (sk.passive.coinBonus) totals.coinBonus += Math.round(sk.passive.coinBonus * mult);
  });

  // Instalações do Dojo
  (game.dojoUpgrades || []).forEach(upId => {
    const up = dojoCatalog.find(d => d.id === upId);
    if (!up) return;
    if (up.atk) totals.atk += up.atk;
    if (up.def) totals.def += up.def;
    if (up.hp) totals.maxHp += up.hp;
    if (up.mp) totals.maxMp += up.mp;
    if (up.spd) totals.spd += up.spd;
  });

  // Companheiro + Nível de Evolução (+25% por nível extra)
  const pet = companionsCatalog.find(c => c.id === game.companion);
  if (pet && pet.id !== "none") {
    const pLvl = (game.companionLevels && game.companionLevels[pet.id]) || 1;
    const pMult = 1 + (pLvl - 1) * 0.25;
    if (pet.atk) totals.atk += Math.round(pet.atk * pMult);
    if (pet.def) totals.def += Math.round(pet.def * pMult);
    if (pet.hp) totals.maxHp += Math.round(pet.hp * pMult);
    if (pet.spd) totals.spd += Math.round(pet.spd * pMult);
    if (pet.crit) totals.crit += Math.round(pet.crit * pMult);
  }

  // Montaria Equipada
  const mount = mountsCatalog.find(m => m.id === game.equippedMount);
  if (mount && mount.bonuses) {
    if (mount.bonuses.atk) totals.atk += mount.bonuses.atk;
    if (mount.bonuses.def) totals.def += mount.bonuses.def;
    if (mount.bonuses.hp) totals.maxHp += mount.bonuses.hp;
    if (mount.bonuses.mp) totals.maxMp += mount.bonuses.mp;
    if (mount.bonuses.spd) totals.spd += mount.bonuses.spd;
    if (mount.bonuses.crit) totals.crit += mount.bonuses.crit;
    if (mount.bonuses.xpBonus) totals.xpBonus += mount.bonuses.xpBonus;
  }

  // Passiva da Guilda Atual
  if (game.guild && game.guild.level > 0) {
    const gDef = guildsCatalog.find(gd => gd.id === game.guild.id);
    const gl = game.guild.level;
    const bType = gDef ? gDef.bonusType : "combat_all";
    if (bType === "xp_spd") {
      totals.xpBonus += gl * 6;
      totals.spd += gl * 3;
    } else if (bType === "coins_atk") {
      totals.coinBonus += gl * 8;
      totals.atk += gl * 4;
    } else if (bType === "skill_mp") {
      totals.skillBonus += gl * 6;
      totals.maxMp += gl * 8;
    } else {
      totals.atk += gl * 4;
      totals.def += gl * 3;
      totals.crit += Math.min(15, gl * 2);
    }
  }

  // Bônus de Determinação Real
  const completedToday = game.quests.filter(q => q.completed).length;
  totals.determinationPct = completedToday * 5;
  totals.atk = Math.round(totals.atk * (1 + totals.determinationPct / 100));

  // Aura de Consistência (v6): todos os hábitos diários concluídos hoje
  totals.consistencyAura = isConsistencyAuraActive();
  if (totals.consistencyAura) {
    totals.def = Math.round(totals.def * 1.10);
    totals.crit += 8;
  }

  game.hp = Math.min(game.hp, totals.maxHp);
  game.mp = Math.min(game.mp, totals.maxMp);

  return totals;
}

function addInventoryItem(itemData, qty = 1) {
  const existing = game.inventory.find(i => i.id === itemData.id);
  if (existing) {
    existing.qty = (existing.qty || 1) + qty;
  } else {
    game.inventory.push({ ...itemData, qty });
  }
}

function xpForNextLevel(level) {
  return level * 100;
}

function gainRoutineEnergy(amount) {
  const maxE = game.routineMaxEnergy || 100;
  const before = game.routineEnergy || 0;
  game.routineEnergy = Math.max(0, Math.min(maxE, before + Math.round(amount)));
  return game.routineEnergy - before;
}

function useRoutineBurst() {
  if ((game.routineEnergy || 0) < 20) {
    notify("Você precisa de pelo menos 20 🔋 Energia de Rotina! Conclua tarefas ou sessões de Foco.");
    return;
  }
  game.routineEnergy -= 20;
  const totals = getTotalStats();
  game.hp = totals.maxHp;
  game.mp = totals.maxMp;
  battleState.combatBuff = { atkPct: 20, turns: 3 };
  game.coins += 25;
  playSFX("stand");
  saveGame();
  renderAll();
  notify("🔋 Impulso de Rotina ativado! (100% HP/EN, +20% ATK por 3 turnos e +25 🪙)");
}

function gainXP(amount) {
  const totals = getTotalStats();
  const boosted = Math.round(amount * (1 + totals.xpBonus / 100));
  game.xp += boosted;
  game.totalXp += boosted;
  const xpBar = document.getElementById("xpBar");
  if (xpBar && xpBar.classList) {
    xpBar.classList.remove("xp-flash-pulse");
    if (typeof xpBar.offsetWidth === "number") void xpBar.offsetWidth;
    xpBar.classList.add("xp-flash-pulse");
  }
  updateLevel();
  return boosted;
}

function gainCoins(amount) {
  const totals = getTotalStats();
  const boosted = Math.round(amount * (1 + totals.coinBonus / 100));
  game.coins += boosted;
  return boosted;
}

function updateLevel() {
  let leveledUp = false;
  while (game.xp >= xpForNextLevel(game.level)) {
    game.xp -= xpForNextLevel(game.level);
    game.level++;
    game.gems += 5;
    game.coins += 35;
    game.statPoints += 3;
    game.classSpins = (game.classSpins || 0) + 1;
    gainRoutineEnergy(15);
    if (game.level % 3 === 0) {
      game.standArrows = (game.standArrows || 0) + 1;
    }
    game.stats.hp += 15;
    game.stats.mp += 6;
    game.stats.atk += 2;
    game.stats.def += 1;
    game.stats.spd += 1;

    const totals = getTotalStats();
    game.hp = totals.maxHp;
    game.mp = totals.maxMp;

    addInventoryItem({
      id: "level-" + game.level,
      name: "Insígnia de Nível " + game.level,
      type: "medal",
      rarity: game.level >= 10 ? "legendary" : game.level >= 5 ? "epic" : "rare",
      icon: "🎁",
      description: "Recompensa recebida ao alcançar o nível " + game.level + "."
    }, 1);

    leveledUp = true;
  }

  if (leveledUp) {
    playSFX("levelup");
    const lvOverlay = document.getElementById("levelUpOverlay");
    const lvTitle = document.getElementById("levelUpOverlayTitle");
    const lvSub = document.getElementById("levelUpOverlaySub");
    if (lvOverlay && lvTitle && lvSub) {
      lvTitle.textContent = `🌟 SUBIU PARA O NÍVEL ${game.level}!`;
      lvSub.textContent = `+3 Pts Atributo • +1 Giro • +5 💎 • +35 🪙 • HP/EN 100%`;
      lvOverlay.classList.remove("hidden");
      clearTimeout(updateLevel.bannerTimer);
      updateLevel.bannerTimer = setTimeout(() => lvOverlay.classList.add("hidden"), 3400);
    }
    notify(`LEVEL UP! Nível ${game.level} alcançado! (+3 Pts Atributo, +1 Giro de Classe, +5 💎)`);
  }
}

function allocateStatPoint(statKey) {
  if (game.statPoints <= 0) return;
  if (statKey === "atk") game.stats.atk += 2;
  else if (statKey === "def") game.stats.def += 2;
  else if (statKey === "hp") { game.stats.hp += 20; game.hp += 20; }
  else if (statKey === "mp") { game.stats.mp += 10; game.mp += 10; }
  else if (statKey === "spd") game.stats.spd += 2;
  else return;

  game.statPoints--;
  playSFX("click");
  saveGame();
  renderAll();
}

function updateAchievements() {
  achievements.forEach(achievement => {
    const alreadyUnlocked = game.unlockedAchievements.includes(achievement.id);
    if (!alreadyUnlocked && achievement.condition(game)) {
      game.unlockedAchievements.push(achievement.id);
      game.coins += 35;
      game.gems += 1;
      notify("🏆 Conquista: " + achievement.name + "! (+35 🪙, +1 💎)");
    }
  });
}

/* =========================================================
   6. ROLETA DE CLASSES (7 RARIDADES) & DESPERTAR DE STANDS (JOJO)
========================================================= */

let rouletteSpinning = false;

function pickWeightedClass(minRarityOnly = false) {
  const allowedRarities = minRarityOnly
    ? ["rare", "epic", "legendary", "mythic", "secret"]
    : ["common", "uncommon", "rare", "epic", "legendary", "mythic", "secret"];

  const pool = allowedRarities.map(rKey => ({
    rarity: rKey,
    weight: RARITY_META[rKey].weight
  }));
  const totalWeight = pool.reduce((sum, item) => sum + item.weight, 0);
  let roll = Math.random() * totalWeight;
  let chosenRarity = pool[0].rarity;
  for (const entry of pool) {
    if (roll < entry.weight) {
      chosenRarity = entry.rarity;
      break;
    }
    roll -= entry.weight;
  }

  const candidates = classesCatalog.filter(c => c.rarity === chosenRarity);
  if (!candidates.length) return classesCatalog[0];
  return candidates[Math.floor(Math.random() * candidates.length)];
}

function triggerRarityCelebration(title, rarityKey, icon, desc) {
  if (!["epic", "legendary", "mythic", "secret"].includes(rarityKey)) return;
  const overlay = document.getElementById("rarityCelebrationOverlay");
  const card = document.getElementById("rarityCelebrationCard");
  const badgeEl = document.getElementById("celebRarityBadge");
  const iconEl = document.getElementById("celebIcon");
  const titleEl = document.getElementById("celebTitle");
  const descEl = document.getElementById("celebDesc");
  if (!overlay || !card) return;
  const rm = getRarityMeta(rarityKey);
  card.className = `modal-card rarity-celebration-card tier-${rarityKey}`;
  if (badgeEl) {
    badgeEl.className = `rarity-badge ${rm.cls}`;
    badgeEl.textContent = `${rm.label.toUpperCase()} ✨`;
  }
  if (iconEl) iconEl.textContent = icon || "👑";
  if (titleEl) titleEl.textContent = title;
  if (descEl) descEl.textContent = desc || "";
  overlay.classList.remove("hidden");
}

function spinClassRoulette(mode = "ticket") {
  if (rouletteSpinning) return;

  if (mode === "ticket") {
    if ((game.classSpins || 0) <= 0) {
      notify("Você não possui Giros Grátis! Use Moedas (80 🪙) ou Gemas (3 💎).");
      return;
    }
    game.classSpins--;
  } else if (mode === "coins") {
    if (game.coins < 80) {
      notify("Moedas insuficientes! Você precisa de 80 🪙 para girar.");
      return;
    }
    game.coins -= 80;
  } else if (mode === "gems") {
    if (game.gems < 3) {
      notify("Gemas insuficientes! Você precisa de 3 💎 para o Giro da Sorte Rara+.");
      return;
    }
    game.gems -= 3;
  }

  const pityTriggered = (game.rollPityCounter || 0) >= 9;
  const wonClass = pickWeightedClass(mode === "gems" || pityTriggered);
  const rMeta = getRarityMeta(wonClass.rarity);
  if (["rare", "epic", "legendary", "mythic", "secret"].includes(wonClass.rarity)) {
    game.rollPityCounter = 0;
  } else {
    game.rollPityCounter = (game.rollPityCounter || 0) + 1;
  }

  const trackEl = document.getElementById("classRouletteTrack");
  const viewportEl = document.getElementById("classRouletteViewport");
  const resultBanner = document.getElementById("classRouletteResult");

  const applyReward = () => {
    if (!game.unlockedClasses.includes(wonClass.id)) {
      game.unlockedClasses.push(wonClass.id);
    }
    game.charClass = wonClass.id;
    game.classRollHistory.unshift({
      id: wonClass.id,
      name: wonClass.name,
      rarity: wonClass.rarity,
      icon: wonClass.icon || "⚔️",
      time: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
    });
    game.classRollHistory = game.classRollHistory.slice(0, 20);

    playSFX("levelup");
    if (resultBanner) {
      resultBanner.innerHTML = `🎉 <strong>[${escapeHTML(rMeta.label.toUpperCase())}] ${wonClass.icon} ${escapeHTML(wonClass.name)}</strong> obtida e equipada! (${escapeHTML(wonClass.passiveText)})`;
    }
    if (["epic", "legendary", "mythic", "secret"].includes(wonClass.rarity)) {
      triggerRarityCelebration(`Classe: ${wonClass.name}!`, wonClass.rarity, wonClass.icon, wonClass.passiveText);
    }
    notify(`🎰 Roleta: [${rMeta.label}] ${wonClass.name} obtida!`);
    updateAchievements();
    saveGame();
    renderAll();
  };

  if (!trackEl || !viewportEl || typeof window === "undefined") {
    applyReward();
    return;
  }

  rouletteSpinning = true;
  const slots = [];
  const winIndex = 18;
  for (let i = 0; i < 24; i++) {
    const clsItem = i === winIndex ? wonClass : pickWeightedClass(false);
    const rm = getRarityMeta(clsItem.rarity);
    slots.push(`
      <div class="roulette-slot-card ${i === winIndex ? "roulette-winner-target" : ""}" style="border-color:${rm.color}">
        <span class="rarity-badge ${rm.cls}">${escapeHTML(rm.label)}</span>
        <strong>${clsItem.icon || "⚔️"} ${escapeHTML(clsItem.name)}</strong>
      </div>
    `);
  }

  trackEl.style.transition = "none";
  trackEl.style.transform = "translateX(0px)";
  trackEl.innerHTML = slots.join("");

  if (resultBanner) {
    resultBanner.textContent = "🎰 Girando a Roleta do Destino...";
  }
  playSFX("spin");

  const cardWidth = 175;
  const viewWidth = viewportEl.getBoundingClientRect().width || 720;
  const targetOffset = Math.max(0, winIndex * cardWidth - viewWidth / 2 + 102);

  setTimeout(() => {
    trackEl.style.transition = "transform 1.8s cubic-bezier(0.12, 0.82, 0.18, 1)";
    trackEl.style.transform = `translateX(-${Math.round(targetOffset)}px)`;
  }, 30);

  setTimeout(() => {
    rouletteSpinning = false;
    const winCard = trackEl.querySelector(".roulette-winner-target");
    if (winCard) winCard.classList.add("winner-glow");
    applyReward();
  }, 1880);
}

function equipUnlockedClass(classId) {
  if (!game.unlockedClasses.includes(classId)) {
    notify("Você ainda não desbloqueou esta Classe na Roleta!");
    return;
  }
  game.charClass = classId;
  const cls = getActiveClassObj();
  playSFX("click");
  saveGame();
  renderAll();
  notify(`⚔️ Classe equipada: ${cls.name}!`);
}

function awakenStand(mode = "arrow") {
  if (mode === "arrow") {
    if ((game.standArrows || 0) <= 0) {
      notify("Você não possui Flechas de Stand! Use Moedas + Gemas ou compre uma Flecha na Loja.");
      return;
    }
    game.standArrows--;
  } else {
    if (game.coins < 120 || game.gems < 2) {
      notify("Recursos insuficientes! Necessário: 120 🪙 e 2 💎.");
      return;
    }
    game.coins -= 120;
    game.gems -= 2;
  }

  const pool = standsCatalog.filter(s => s.id !== "none");
  const weights = pool.map(s => ({
    stand: s,
    weight: (RARITY_META[s.rarity] ? RARITY_META[s.rarity].weight : 10)
  }));
  const totalW = weights.reduce((acc, item) => acc + item.weight, 0);
  let r = Math.random() * totalW;
  let chosen = pool[0];
  for (const item of weights) {
    if (r < item.weight) {
      chosen = item.stand;
      break;
    }
    r -= item.weight;
  }

  if (!game.unlockedStands.includes(chosen.id)) {
    game.unlockedStands.push(chosen.id);
  }
  if (!game.standLevels) game.standLevels = {};
  if (!game.standLevels[chosen.id]) game.standLevels[chosen.id] = 1;
  game.equippedStand = chosen.id;

  if (!game.standRollHistory) game.standRollHistory = [];
  game.standRollHistory.unshift({
    id: chosen.id,
    name: chosen.name,
    rarity: chosen.rarity,
    icon: chosen.icon || "👻",
    time: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
  });
  game.standRollHistory = game.standRollHistory.slice(0, 15);

  const rMeta = getRarityMeta(chosen.rarity);
  playSFX("stand");
  if (["epic", "legendary", "mythic", "secret"].includes(chosen.rarity)) {
    triggerRarityCelebration(`Stand Desperto: ${chosen.name}!`, chosen.rarity, chosen.icon, chosen.description);
  }
  updateAchievements();
  saveGame();
  renderAll();
  notify(`🏹 DESPERTAR DE STAND! [${rMeta.label}] ${chosen.icon} ${chosen.name} (${chosen.cry})!`);
}

function evolveStand(standId) {
  if (!(game.unlockedStands || []).includes(standId)) return;
  const st = standsCatalog.find(s => s.id === standId);
  if (!st || st.id === "none") return;
  if (!game.standLevels) game.standLevels = {};
  const curLvl = game.standLevels[standId] || 1;
  if (curLvl >= 3) {
    notify(`${st.name} já alcançou o Despertar Supremo (Estágio 3)!`);
    return;
  }
  const coinCost = curLvl === 1 ? 180 : 350;
  const gemCost = curLvl === 1 ? 4 : 8;
  if (game.coins < coinCost || game.gems < gemCost) {
    notify(`Evolução de Stand requer ${coinCost} 🪙 e ${gemCost} 💎!`);
    return;
  }
  game.coins -= coinCost;
  game.gems -= gemCost;
  game.standLevels[standId] = curLvl + 1;
  playSFX("stand");
  triggerRarityCelebration(`${st.requiemName || st.name + " Requiem"} (Estágio ${curLvl + 1})!`, "mythic", st.icon, st.requiemPerk || "+25% Poder e Atributos do Stand!");
  saveGame();
  renderAll();
  notify(`✨ ${st.name} evoluiu para o Estágio ${curLvl + 1}! (+25% Poder & Atributos)`);
}

function claimJojoQuest(jqId) {
  const jq = jojoQuestsCatalog.find(q => q.id === jqId);
  if (!jq || (game.claimedJojoQuests || []).includes(jqId)) return;
  if (jq.progress(game) < jq.target) {
    notify("Complete os objetivos da missão JoJo primeiro!");
    return;
  }
  if (!game.claimedJojoQuests) game.claimedJojoQuests = [];
  game.claimedJojoQuests.push(jqId);
  const xpG = gainXP(jq.xp);
  const coinG = gainCoins(jq.coins);
  game.gems += jq.gems || 0;
  game.standArrows = (game.standArrows || 0) + (jq.arrows || 0);
  playSFX("stand");
  saveGame();
  renderAll();
  notify(`⭐ Missão JoJo: ${jq.name}! (+${xpG} XP, +${coinG} 🪙, +${jq.arrows} Flecha(s)!)`);
}

function equipStand(standId) {
  if (standId !== "none" && !game.unlockedStands.includes(standId)) {
    notify("Desperte este Stand primeiro com a Flecha Requiem!");
    return;
  }
  game.equippedStand = standId;
  const st = getActiveStandObj();
  playSFX("stand");
  saveGame();
  renderAll();
  notify(st.id === "none" ? "Stand recolhido." : `👻 Stand equipado: ${st.name} (${st.cry})!`);
}

function renderClassesAndStandsPage() {
  const cls = getActiveClassObj();
  const clsRarity = getRarityMeta(cls.rarity);
  const stand = getActiveStandObj();
  const standRarity = getRarityMeta(stand.rarity);

  const setText = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  };

  setText("topSpins", game.classSpins || 0);
  setText("classSpinsBadge", `🎰 ${game.classSpins || 0} Giros Grátis`);
  setText("classPityBadge", `✨ Sorte Acumulada: ${game.rollPityCounter || 0}/10`);
  setText("unlockedClassesCountBadge", `${(game.unlockedClasses || []).length}/${classesCatalog.length} Classes`);
  setText("activeClassRarityTag", clsRarity.label.toUpperCase());
  setText("rollHistoryCountTag", `${(game.classRollHistory || []).length} GIROS`);
  setText("standArrowsBadge", `🏹 ${game.standArrows || 0} Flecha(s) de Stand`);

  // Preencher faixa inicial da roleta se vazia
  const trackEl = document.getElementById("classRouletteTrack");
  if (trackEl && (!trackEl.children || !trackEl.children.length)) {
    trackEl.innerHTML = classesCatalog.slice(0, 8).map(c => {
      const rm = getRarityMeta(c.rarity);
      return `
        <div class="roulette-slot-card" style="border-color:${rm.color}">
          <span class="rarity-badge ${rm.cls}">${escapeHTML(rm.label)}</span>
          <strong>${c.icon || "⚔️"} ${escapeHTML(c.name)}</strong>
        </div>
      `;
    }).join("");
  }

  const activeClassBox = document.getElementById("activeClassCard");
  if (activeClassBox) {
    activeClassBox.innerHTML = `
      <div class="skill-card equipped">
        <div>
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <span class="skill-icon">${cls.icon || "⚔️"}</span>
            <span class="rarity-badge ${clsRarity.cls}">${escapeHTML(clsRarity.label)}</span>
          </div>
          <h3>${escapeHTML(cls.name)}</h3>
          <p>${escapeHTML(cls.passiveText)}</p>
          <div class="skill-stats-line">🔥 Despertar Ultimate: ${escapeHTML(cls.ultName)}</div>
        </div>
      </div>
    `;
  }

  const histBox = document.getElementById("classHistoryList");
  if (histBox) {
    if (!game.classRollHistory || !game.classRollHistory.length) {
      histBox.innerHTML = `<p class="muted">Nenhum giro realizado ainda. Experimente girar a roleta acima!</p>`;
    } else {
      histBox.innerHTML = game.classRollHistory.map(h => {
        const rm = getRarityMeta(h.rarity);
        return `
          <div class="history-row">
            <span><span class="rarity-badge ${rm.cls}">${escapeHTML(rm.label)}</span> <strong>${h.icon || "⚔️"} ${escapeHTML(h.name)}</strong></span>
            <small>${escapeHTML(h.time || "")}</small>
          </div>
        `;
      }).join("");
    }
  }

  const classesGrid = document.getElementById("unlockedClassesGrid");
  if (classesGrid) {
    classesGrid.innerHTML = classesCatalog.map(c => {
      const unlocked = (game.unlockedClasses || []).includes(c.id);
      const isEquipped = game.charClass === c.id;
      const rm = getRarityMeta(c.rarity);
      const perk = CLASS_PERKS[c.id];
      return `
        <div class="skill-card ${unlocked ? (isEquipped ? "equipped" : "") : "locked"}">
          <div>
            <div style="display:flex;justify-content:space-between;align-items:center;">
              <span class="skill-icon">${c.icon || "⚔️"}</span>
              <span class="rarity-badge ${rm.cls}">${escapeHTML(rm.label)} (${rm.weight}%)</span>
            </div>
            <h3>${escapeHTML(c.name)}</h3>
            <p>${escapeHTML(c.passiveText)}</p>
            <div class="skill-stats-line">🔥 Ultimate: ${escapeHTML(c.ultName)}</div>
            ${perk ? `<small class="muted">⚡ Identidade: ${escapeHTML(perk.combatLabel)}</small>` : ""}
          </div>
          <div class="skill-card-actions">
            <button data-action="equip-class" data-id="${escapeHTML(c.id)}" ${!unlocked || isEquipped ? "disabled" : ""}>
              ${isEquipped ? "Classe Equipada ✓" : unlocked ? "Equipar Classe" : "🔒 Obter na Roleta"}
            </button>
          </div>
        </div>
      `;
    }).join("");
  }

  const activeStandBox = document.getElementById("activeStandCard");
  if (activeStandBox) {
    if (stand.id === "none") {
      activeStandBox.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;">
          <div>
            <h4>👻 Nenhum Stand Desperto no Momento</h4>
            <p class="muted" style="margin-top:4px;">Clique em <strong>Despertar Stand com Flecha</strong> abaixo para manifestar seu Stand de JoJo's Bizarre Adventure!</p>
          </div>
          <span class="rarity-badge rarity-common">Aguardando Flecha</span>
        </div>
      `;
    } else {
      const bonusParts = [];
      if (stand.bonuses.atk) bonusParts.push(`+${stand.bonuses.atk} ATK`);
      if (stand.bonuses.def) bonusParts.push(`+${stand.bonuses.def} DEF`);
      if (stand.bonuses.hp) bonusParts.push(`+${stand.bonuses.hp} HP`);
      if (stand.bonuses.mp) bonusParts.push(`+${stand.bonuses.mp} EN`);
      if (stand.bonuses.spd) bonusParts.push(`+${stand.bonuses.spd} SPD`);
      if (stand.bonuses.crit) bonusParts.push(`+${stand.bonuses.crit}% Crítico`);

      const standLvl = (game.standLevels && game.standLevels[stand.id]) || 1;
      const evoCoins = standLvl === 1 ? 180 : 350;
      const evoGems = standLvl === 1 ? 4 : 8;
      activeStandBox.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:14px;">
          <div style="display:flex;align-items:center;gap:14px;flex:1;min-width:240px;">
            <canvas class="card-portrait-canvas" id="activeStandPortraitCanvas" width="64" height="64"></canvas>
            <div>
              <span class="rarity-badge ${standRarity.cls}">${escapeHTML(standRarity.label)} • Estágio ${standLvl}/3 • Usuário: ${escapeHTML(stand.user)}</span>
              <h3 style="margin-top:6px;">${escapeHTML(standLvl >= 2 && stand.requiemName ? stand.requiemName : stand.name)} — "${escapeHTML(stand.cry)}"</h3>
              <p class="muted" style="margin:6px 0;">${escapeHTML(stand.description)}${stand.requiemPerk && standLvl >= 2 ? ` (${escapeHTML(stand.requiemPerk)})` : ""}</p>
              <div class="skill-stats-line">⚡ Técnica de Stand: ${escapeHTML(stand.abilityName)} (Poder ${Math.round(stand.power * (1 + (standLvl - 1) * 0.25))} • ${stand.mpCost} EN) | Bônus: ${bonusParts.join(" • ")}</div>
            </div>
          </div>
          <div style="display:flex;gap:8px;flex-wrap:wrap;">
            ${standLvl < 3 ? `<button class="primary-btn" data-action="evolve-stand" data-id="${escapeHTML(stand.id)}">✨ Evoluir Estágio ${standLvl + 1} (${evoCoins} 🪙 + ${evoGems} 💎)</button>` : `<span class="rarity-badge rarity-secret">⭐ REQUIEM MÁXIMO</span>`}
            <button class="secondary-btn" data-action="equip-stand" data-id="none">Recolher Stand</button>
          </div>
        </div>
      `;
      const actCanvas = document.getElementById("activeStandPortraitCanvas");
      if (actCanvas) {
        const actCtx = actCanvas.getContext("2d");
        actCtx.clearRect(0, 0, 64, 64);
        drawStandSpirit(actCtx, stand.id, 26, 22, 3.2, 0);
      }
    }
  }

  const standsGrid = document.getElementById("standsGrid");
  if (standsGrid) {
    const validStands = standsCatalog.filter(s => s.id !== "none");
    standsGrid.innerHTML = validStands.map(st => {
      const unlocked = (game.unlockedStands || []).includes(st.id);
      const isEquipped = game.equippedStand === st.id;
      const rm = getRarityMeta(st.rarity);
      const bonusParts = [];
      if (st.bonuses.atk) bonusParts.push(`+${st.bonuses.atk} ATK`);
      if (st.bonuses.def) bonusParts.push(`+${st.bonuses.def} DEF`);
      if (st.bonuses.hp) bonusParts.push(`+${st.bonuses.hp} HP`);
      if (st.bonuses.mp) bonusParts.push(`+${st.bonuses.mp} EN`);
      if (st.bonuses.spd) bonusParts.push(`+${st.bonuses.spd} SPD`);
      if (st.bonuses.crit) bonusParts.push(`+${st.bonuses.crit}% CRIT`);

      return `
        <div class="skill-card ${unlocked ? (isEquipped ? "equipped" : "") : "locked"}">
          <div>
            <div style="display:flex;justify-content:space-between;align-items:center;">
              <canvas class="card-portrait-canvas" id="standCardCanvas_${escapeHTML(st.id)}" width="56" height="56"></canvas>
              <span class="rarity-badge ${rm.cls}">${escapeHTML(rm.label)}</span>
            </div>
            <h3>${escapeHTML(st.name)}</h3>
            <small class="muted">Usuário: ${escapeHTML(st.user)} • Grito: "${escapeHTML(st.cry)}"</small>
            <p>${escapeHTML(st.description)}</p>
            <div class="skill-stats-line">👻 ${escapeHTML(st.abilityName)} (Poder ${st.power})</div>
            <span class="skill-cost">${bonusParts.join(" • ")}</span>
          </div>
          <div class="skill-card-actions">
            <button data-action="equip-stand" data-id="${escapeHTML(st.id)}" ${!unlocked || isEquipped ? "disabled" : ""}>
              ${isEquipped ? "Stand Equipado ✓" : unlocked ? "Equipar Stand" : "🔒 Despertar com Flecha"}
            </button>
            ${unlocked && ((game.standLevels && game.standLevels[st.id]) || 1) < 3 ? `<button data-action="evolve-stand" data-id="${escapeHTML(st.id)}">✨ Evoluir (${((game.standLevels && game.standLevels[st.id]) || 1) === 1 ? "180🪙" : "350🪙"})</button>` : ""}
          </div>
        </div>
      `;
    }).join("");

    validStands.forEach(st => {
      const c = document.getElementById(`standCardCanvas_${st.id}`);
      if (c) {
        const ctx = c.getContext("2d");
        ctx.clearRect(0, 0, 56, 56);
        drawStandSpirit(ctx, st.id, 23, 19, 2.8, 0);
      }
    });
  }

  const jojoBox = document.getElementById("jojoQuestsList");
  if (jojoBox) {
    jojoBox.innerHTML = jojoQuestsCatalog.map(jq => {
      const claimed = (game.claimedJojoQuests || []).includes(jq.id);
      const prog = Math.min(jq.target, jq.progress(game));
      const ready = prog >= jq.target && !claimed;
      return `
        <div class="quest-item ${claimed ? "done" : ""}">
          <div>
            <span class="quest-name">⭐ ${escapeHTML(jq.name)}</span>
            <div class="quest-meta">Progresso: ${prog}/${jq.target} • <span class="quest-reward">+${jq.xp} XP, +${jq.coins} 🪙, +${jq.gems} 💎, +${jq.arrows} Flecha(s)</span></div>
          </div>
          <div class="quest-actions">
            <button class="complete-btn" data-action="claim-jojo-quest" data-id="${escapeHTML(jq.id)}" ${!ready ? "disabled" : ""}>
              ${claimed ? "Concluída ✓" : ready ? "Resgatar 🏹" : `${prog}/${jq.target}`}
            </button>
          </div>
        </div>
      `;
    }).join("");
  }

  const stHistBox = document.getElementById("standRollHistoryList");
  if (stHistBox) {
    const hList = game.standRollHistory || [];
    stHistBox.innerHTML = hList.length
      ? hList.map(h => {
          const rm = getRarityMeta(h.rarity);
          return `<div class="history-row"><span><span class="rarity-badge ${rm.cls}">${escapeHTML(rm.label)}</span> <strong>${escapeHTML(h.icon || "👻")} ${escapeHTML(h.name)}</strong></span><small>${escapeHTML(h.time || "")}</small></div>`;
        }).join("")
      : `<p class="muted">Nenhum Stand desperto na sessão ainda.</p>`;
  }
}

/* =========================================================
   7. MISSÕES, CRONÔMETRO DE FOCO (POMODORO RPG) E HEATMAP 28 DIAS
========================================================= */

let editingQuestId = null;

function recordDailyActivity(count = 1) {
  const today = todayString();
  if (!game.dailyActivityLog || typeof game.dailyActivityLog !== "object") {
    game.dailyActivityLog = {};
  }
  game.dailyActivityLog[today] = (game.dailyActivityLog[today] || 0) + count;
}

function checkDailyReset() {
  const today = todayString();
  resetDailiesIfNewDay();
  if (game.lastQuestDate && game.lastQuestDate !== today) {
    game.quests = game.quests.map(q => ({ ...q, completed: false }));
    game.lastQuestDate = today;
    game.dailyBonusClaimed = false;
    game.journeyDays = (game.journeyDays || 1) + 1;
    game.dojoTrainDate = today;
    game.dojoTrainingsToday = 0;
    saveGame();
  }
  if (game.dojoTrainDate !== today) {
    game.dojoTrainDate = today;
    game.dojoTrainingsToday = 0;
  }
}

function getEffectiveStreak() {
  if (!game.lastActive) return 0;
  const today = todayString();
  const yesterday = dateString(-1);
  if (game.lastActive === today || game.lastActive === yesterday) return game.streak;
  if (countMissedScheduledDays(game.lastActive, today, "all") === 0) return game.streak;
  return 0;
}

function checkStreakMilestones() {
  const milestones = [
    { days: 3, coins: 60, gems: 2, spins: 1, title: "3 Dias Seguidos" },
    { days: 5, coins: 100, gems: 3, spins: 1, title: "5 Dias de Foco" },
    { days: 7, coins: 180, gems: 5, spins: 2, title: "Semana Perfeita (7d)" },
    { days: 14, coins: 350, gems: 8, spins: 3, title: "Quinzena Inabalável (14d)" },
    { days: 30, coins: 800, gems: 15, spins: 5, title: "Lenda dos 30 Dias" }
  ];
  const s = getEffectiveStreak();
  if (!game.streakMilestonesClaimed) game.streakMilestonesClaimed = [];
  milestones.forEach(m => {
    if (s >= m.days && !game.streakMilestonesClaimed.includes(m.days)) {
      game.streakMilestonesClaimed.push(m.days);
      game.coins += m.coins;
      game.gems += m.gems;
      game.classSpins = (game.classSpins || 0) + m.spins;
      notify(`🔥 MARCO DE SEQUÊNCIA [${m.title}]! +${m.coins} 🪙, +${m.gems} 💎, +${m.spins} Giro(s)!`);
    }
  });
}

function markActiveToday() {
  const today = todayString();
  const yesterday = dateString(-1);

  if (game.lastActive !== today) {
    if (game.lastActive === yesterday || (game.lastActive && countMissedScheduledDays(game.lastActive, today, "all") === 0)) {
      game.streak++;
    } else {
      game.streak = 1;
    }
    game.lastActive = today;
    if (game.streak > (game.bestStreak || 0)) {
      game.bestStreak = game.streak;
    }
    checkStreakMilestones();
  }
}

function completeQuest(id, fromFocusBonus = false) {
  const quest = game.quests.find(item => item.id === id);
  if (!quest || quest.completed) return;

  quest.completed = true;
  const bonusMult = fromFocusBonus ? 1.3 : 1;
  const gainedXp = gainXP(Math.round(quest.xp * bonusMult));
  const gainedCoins = gainCoins(Math.round(quest.coins * bonusMult));
  const gainedRotEnergy = gainRoutineEnergy(fromFocusBonus ? 18 : 12);
  if (quest.difficulty === "epic") game.gems += 1;
  game.totalCompleted++;

  markActiveToday();
  recordDailyActivity(1);
  recordAnalytics("tasks", 1);
  addGardenGrowth(10, false);
  if (typeof addGuildXp === "function") addGuildXp(15);

  game.questHistory.unshift({
    name: quest.name + (fromFocusBonus ? " (⏱️ Foco +30%)" : ""),
    xp: gainedXp,
    coins: gainedCoins,
    date: new Date().toLocaleDateString("pt-BR") + " " + new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
  });
  game.questHistory = game.questHistory.slice(0, 35);

  const allCompleted = game.quests.length > 0 && game.quests.every(q => q.completed);
  if (allCompleted && !game.dailyBonusClaimed) {
    game.dailyBonusClaimed = true;
    gainXP(50);
    game.gems += 2;
    game.coins += 30;
    game.classSpins = (game.classSpins || 0) + 1;
    gainRoutineEnergy(25);
    notify("🎉 Todas as missões do dia concluídas! Bônus Diário: +50 XP, +30 🪙, +2 💎, +25 🔋 e +1 Giro de Classe!");
  } else {
    playSFX("quest");
    notify(`✅ ${quest.name}: +${gainedXp} XP, +${gainedCoins} 🪙, +${gainedRotEnergy} 🔋 Energia${fromFocusBonus ? " (Foco +30%!)" : ""}`);
  }

  updateAchievements();
  saveGame();
  renderAll();
}

function startEditQuest(id) {
  const quest = game.quests.find(q => q.id === id);
  if (!quest) return;
  editingQuestId = id;
  const nameInput = document.getElementById("newQuestName");
  const diffSelect = document.getElementById("newQuestDifficulty");
  const addBtn = document.getElementById("addQuest");
  const cancelBtn = document.getElementById("cancelEditQuest");
  const modeTag = document.getElementById("questFormModeTag");

  if (nameInput) nameInput.value = quest.name;
  if (diffSelect) diffSelect.value = quest.difficulty || "easy";
  if (addBtn) addBtn.textContent = "Salvar Edição";
  if (cancelBtn) cancelBtn.classList.remove("hidden");
  if (modeTag) modeTag.textContent = "EDITANDO MISSÃO";
}

function cancelEditQuest() {
  editingQuestId = null;
  const nameInput = document.getElementById("newQuestName");
  const addBtn = document.getElementById("addQuest");
  const cancelBtn = document.getElementById("cancelEditQuest");
  const modeTag = document.getElementById("questFormModeTag");

  if (nameInput) nameInput.value = "";
  if (addBtn) addBtn.textContent = "Adicionar missão +";
  if (cancelBtn) cancelBtn.classList.add("hidden");
  if (modeTag) modeTag.textContent = "NOVA MISSÃO";
}

function deleteQuest(id) {
  if (game.quests.length <= 1) {
    notify("Mantenha pelo menos 1 missão ativa na sua lista.");
    return;
  }
  game.quests = game.quests.filter(q => q.id !== id);
  if (editingQuestId === id) cancelEditQuest();
  saveGame();
  renderAll();
  notify("Missão removida.");
}

function addOrSaveCustomQuest() {
  const nameInput = document.getElementById("newQuestName");
  const diffSelect = document.getElementById("newQuestDifficulty");
  if (!nameInput) return;

  const name = nameInput.value.trim();
  const difficulty = diffSelect ? diffSelect.value : "easy";
  const presets = {
    easy: { xp: 20, coins: 8 },
    medium: { xp: 40, coins: 15 },
    hard: { xp: 70, coins: 25 },
    epic: { xp: 100, coins: 40 }
  };
  const preset = presets[difficulty] || presets.easy;

  if (!name) {
    notify("Digite o nome da missão.");
    return;
  }

  if (editingQuestId) {
    const q = game.quests.find(item => item.id === editingQuestId);
    if (q) {
      q.name = name.slice(0, 60);
      q.difficulty = difficulty;
      q.xp = preset.xp;
      q.coins = preset.coins;
      notify("Missão atualizada!");
    }
    cancelEditQuest();
  } else {
    game.quests.push({
      id: "custom-" + Date.now(),
      name: name.slice(0, 60),
      difficulty,
      xp: preset.xp,
      coins: preset.coins,
      completed: false,
      custom: true
    });
    nameInput.value = "";
    notify("Nova missão criada!");
  }

  saveGame();
  renderAll();
}

function claimChallenge(chId) {
  const ch = challengesCatalog.find(c => c.id === chId);
  if (!ch || game.claimedChallenges.includes(chId)) return;
  if (ch.progress(game) < ch.target) {
    notify("Você ainda não concluiu este desafio.");
    return;
  }

  game.claimedChallenges.push(chId);
  const xpGained = gainXP(ch.xp);
  const coinsGained = gainCoins(ch.coins);
  game.gems += ch.gems;
  game.classSpins = (game.classSpins || 0) + 1;

  playSFX("levelup");
  notify(`Desafio concluído! +${xpGained} XP, +${coinsGained} 🪙, +${ch.gems} 💎 e +1 Giro!`);
  updateAchievements();
  saveGame();
  renderAll();
}

function claimNpcQuest(nqId) {
  const nq = npcQuestsCatalog.find(q => q.id === nqId);
  if (!nq || game.claimedNpcQuests.includes(nqId)) return;
  if (nq.progress(game) < nq.target) {
    notify("Requisitos da missão do Mestre ainda não foram cumpridos.");
    return;
  }

  game.claimedNpcQuests.push(nqId);
  gainXP(nq.xp);
  gainCoins(nq.coins);
  game.gems += nq.gems;
  if (nq.rewardItemId) {
    const itemRef = shopCatalog.find(i => i.id === nq.rewardItemId);
    if (itemRef) addInventoryItem(itemRef, 1);
  }

  playSFX("levelup");
  notify(`Missão de ${nq.npc} completa! +${nq.xp} XP, +${nq.coins} 🪙, +${nq.gems} 💎!`);
  updateAchievements();
  saveGame();
  renderAll();
}

/* --- CRONÔMETRO DE FOCO (POMODORO RPG BASEADO EM WALL-CLOCK) --- */
const focusState = {
  durationSec: 25 * 60,
  remainingSec: 25 * 60,
  endTimeMs: 0,
  running: false,
  questId: "",
  intervalId: null,
  animTick: 0,
  phase: "focus",          // "focus" | "break"
  breakMode: "meditation", // "meditation" | "rhythm"
  breakElapsed: 0,
  ring: { radius: 54, active: false, hits: 0, attempts: 0 }
};

const BREAK_RING_MIN = 14;
const BREAK_RING_TARGET_MIN = 22;
const BREAK_RING_TARGET_MAX = 30;
const BREAK_MAX_PULSES = 5;
let focusRingLoopId = null;

function persistFocusTimerState() {
  try {
    localStorage.setItem(FOCUS_TIMER_STORAGE_KEY, JSON.stringify({
      endTimeMs: focusState.endTimeMs,
      durationSec: focusState.durationSec,
      phase: focusState.phase,
      breakMode: focusState.breakMode,
      questId: focusState.questId,
      breakElapsed: focusState.breakElapsed,
      ringHits: focusState.ring.hits,
      ringAttempts: focusState.ring.attempts,
      running: focusState.running
    }));
  } catch {
    // Ignore storage quota errors
  }
}

function clearFocusTimerStorage() {
  try {
    localStorage.removeItem(FOCUS_TIMER_STORAGE_KEY);
  } catch {
    // Ignore
  }
}

function syncFocusRemainingFromClock() {
  if (focusState.running && focusState.endTimeMs > 0) {
    focusState.remainingSec = Math.max(0, Math.ceil((focusState.endTimeMs - Date.now()) / 1000));
  }
}

function catchUpFocusClock() {
  if (!focusState.running) return;
  if (focusState.phase === "break") {
    tickBreak();
  } else {
    tickFocus();
  }
}

function sendBrowserNotification(title, body) {
  try {
    if (typeof Notification !== "undefined" && Notification.permission === "granted") {
      new Notification(title, { body });
    }
  } catch {
    // Ignore browser notification restrictions
  }
}

function setFocusDuration(minutes) {
  if (focusState.running) {
    notify("Pause o cronômetro antes de trocar a duração.");
    return;
  }
  const mins = Math.max(1, parseInt(minutes, 10) || 25);
  focusState.durationSec = mins * 60;
  focusState.remainingSec = focusState.durationSec;
  focusState.endTimeMs = 0;
  clearFocusTimerStorage();
  renderFocusTimer();
}

function tickFocus() {
  syncFocusRemainingFromClock();
  focusState.animTick++;
  renderFocusTimer();

  if (focusState.remainingSec <= 0) {
    finishFocusSession();
  }
}

function startFocusTimer() {
  if (focusState.running) return;
  if (focusState.phase === "break") {
    resumeBreakTimer();
    return;
  }
  const sel = document.getElementById("focusQuestSelect");
  if (sel) focusState.questId = sel.value;

  try {
    if (typeof Notification !== "undefined" && Notification.permission === "default" && typeof Notification.requestPermission === "function") {
      Promise.resolve(Notification.requestPermission()).catch(() => {});
    }
  } catch {
    // Ignore
  }

  focusState.running = true;
  focusState.endTimeMs = Date.now() + focusState.remainingSec * 1000;
  persistFocusTimerState();
  playSFX("click");
  const statusEl = document.getElementById("focusStatusLabel");
  if (statusEl) statusEl.textContent = "🔥 Concentração total ativada! Seu herói está treinando...";

  clearInterval(focusState.intervalId);
  focusState.intervalId = setInterval(tickFocus, 1000);
  renderFocusTimer();
}

/* --- PAUSA ATIVA: DESCANSO NO DOJO OU RESPIRAÇÃO RÍTMICA --- */
function getBreakDurationSec() {
  return focusState.durationSec >= 45 * 60 ? 10 * 60 : 5 * 60;
}

function startActiveBreak() {
  if (focusState.running && focusState.phase === "focus") {
    notify("Termine (ou pause e cancele) a sessão de foco antes de iniciar a pausa.");
    return;
  }
  clearInterval(focusState.intervalId);
  const modeSel = document.getElementById("focusBreakModeSelect");
  focusState.breakMode = modeSel && modeSel.value === "rhythm" ? "rhythm" : "meditation";
  focusState.phase = "break";
  focusState.durationSec = getBreakDurationSec();
  focusState.remainingSec = focusState.durationSec;
  focusState.breakElapsed = 0;
  focusState.ring = { radius: 54, active: focusState.breakMode === "rhythm", hits: 0, attempts: 0 };
  playSFX("portal");
  resumeBreakTimer();
  notify(focusState.breakMode === "rhythm"
    ? "🎯 Pausa Ativa: clique em 'Pulso de Ki' quando o anel ficar dourado!"
    : "🧘 Pausa Ativa: seu herói medita no Dojo e regenera HP/EN.");
}

function resumeBreakTimer() {
  focusState.running = true;
  focusState.endTimeMs = Date.now() + focusState.remainingSec * 1000;
  persistFocusTimerState();
  const statusEl = document.getElementById("focusStatusLabel");
  if (statusEl) {
    statusEl.textContent = focusState.breakMode === "rhythm"
      ? "🎯 Respiração Rítmica: sincronize o pulso de Ki!"
      : "🧘 Meditação Zen: levante, alongue-se e beba água!";
  }
  clearInterval(focusState.intervalId);
  focusState.intervalId = setInterval(tickBreak, 1000);
  if (focusState.breakMode === "rhythm" && focusState.ring.active) {
    startFocusRingLoop();
  }
  renderFocusTimer();
}

function tickBreak() {
  syncFocusRemainingFromClock();
  const newElapsed = Math.min(focusState.durationSec, focusState.durationSec - focusState.remainingSec);
  const prevSteps = Math.floor(focusState.breakElapsed / 30);
  const nextSteps = Math.floor(newElapsed / 30);
  const crossedSteps = Math.max(0, nextSteps - prevSteps);

  // Meditação passiva: +4% HP e +6% EN a cada 30s (também compensa segundos em segundo plano)
  if (focusState.breakMode === "meditation" && crossedSteps > 0) {
    const totals = getTotalStats();
    game.hp = Math.min(totals.maxHp, game.hp + Math.round(totals.maxHp * 0.04 * crossedSteps));
    game.mp = Math.min(totals.maxMp, game.mp + Math.round(totals.maxMp * 0.06 * crossedSteps));
    scheduleSave();
  }

  focusState.breakElapsed = newElapsed;
  focusState.animTick++;
  persistFocusTimerState();

  if (focusState.remainingSec <= 0) {
    finishActiveBreak(false);
    return;
  }
  renderFocusTimer();
}

function pulseKiRing() {
  if (focusState.phase !== "break" || focusState.breakMode !== "rhythm" || !focusState.running) return;
  if (focusState.ring.attempts >= BREAK_MAX_PULSES) {
    notify("Você já usou todos os pulsos desta pausa. Aproveite para descansar!");
    return;
  }
  const r = focusState.ring.radius;
  focusState.ring.attempts++;
  const totals = getTotalStats();
  if (r >= BREAK_RING_TARGET_MIN && r <= BREAK_RING_TARGET_MAX) {
    focusState.ring.hits++;
    game.hp = Math.min(totals.maxHp, game.hp + 15);
    game.mp = Math.min(totals.maxMp, game.mp + 12);
    game.coins += 5;
    playSFX("quest");
    notify(`✨ PERFEITO! +15 HP, +12 EN, +5 🪙 (${focusState.ring.attempts}/${BREAK_MAX_PULSES})`);
  } else {
    playSFX("hit");
    notify(`💨 Fora do ritmo! Tente quando o anel estiver dourado (${focusState.ring.attempts}/${BREAK_MAX_PULSES})`);
  }
  focusState.ring.radius = 54;
  if (focusState.ring.attempts >= BREAK_MAX_PULSES) {
    focusState.ring.active = false;
    stopFocusRingLoop();
  }
  persistFocusTimerState();
  scheduleSave();
  renderFocusTimer();
}

function finishActiveBreak(skipped) {
  clearInterval(focusState.intervalId);
  focusState.intervalId = null;
  focusState.running = false;
  focusState.endTimeMs = 0;
  stopFocusRingLoop();
  clearFocusTimerStorage();
  const completedFull = !skipped && focusState.remainingSec <= 0;
  if (completedFull) {
    game.dojoTrainingsToday = Math.max(0, (game.dojoTrainingsToday || 0) - 1);
    playSFX("levelup");
    notify("🍵 Pausa Ativa concluída! +1 Sessão de Treino do Dojo recuperada.");
    sendBrowserNotification("Anime Life RPG", "Pausa Ativa concluída! Hora de voltar ao treino.");
  }
  focusState.phase = "focus";
  focusState.ring.active = false;
  const durSelect = document.getElementById("focusDurationSelect");
  const mins = durSelect ? parseInt(durSelect.value, 10) || 25 : 25;
  focusState.durationSec = mins * 60;
  focusState.remainingSec = focusState.durationSec;
  const statusEl = document.getElementById("focusStatusLabel");
  if (statusEl) statusEl.textContent = completedFull ? "✅ Descansado! Pronto para o próximo foco." : "Pronto para iniciar seu treino focado";
  saveGame();
  renderAll();
}

function stopFocusRingLoop() {
  if (focusRingLoopId !== null) {
    cancelAnimationFrame(focusRingLoopId);
    focusRingLoopId = null;
  }
}

function startFocusRingLoop() {
  if (focusRingLoopId !== null) return;
  focusRingLoopId = requestAnimationFrame(focusRingLoop);
}

function focusRingLoop() {
  const ring = focusState.ring;
  if (!(focusState.phase === "break" && focusState.running && ring.active)) {
    focusRingLoopId = null;
    return;
  }
  ring.radius -= 0.9;
  if (ring.radius < BREAK_RING_MIN) ring.radius = 54;
  const questsPage = document.getElementById("page-quests");
  if (questsPage && questsPage.classList.contains("active")) drawFocusAvatar();
  focusRingLoopId = requestAnimationFrame(focusRingLoop);
}

function pauseFocusTimer() {
  if (!focusState.running) return;
  syncFocusRemainingFromClock();
  focusState.running = false;
  focusState.endTimeMs = 0;
  clearInterval(focusState.intervalId);
  focusState.intervalId = null;
  stopFocusRingLoop();
  clearFocusTimerStorage();
  const statusEl = document.getElementById("focusStatusLabel");
  if (statusEl) statusEl.textContent = "⏸️ Treino pausado. Retome quando estiver pronto!";
  renderFocusTimer();
}

function resetFocusTimer() {
  if (focusState.phase === "break") {
    finishActiveBreak(true);
    return;
  }
  pauseFocusTimer();
  const durSelect = document.getElementById("focusDurationSelect");
  const mins = durSelect ? parseInt(durSelect.value, 10) || 25 : 25;
  focusState.durationSec = mins * 60;
  focusState.remainingSec = focusState.durationSec;
  focusState.endTimeMs = 0;
  clearFocusTimerStorage();
  const statusEl = document.getElementById("focusStatusLabel");
  if (statusEl) statusEl.textContent = "Pronto para iniciar seu treino focado";
  renderFocusTimer();
}

function finishFocusSession() {
  pauseFocusTimer();
  const minsCompleted = Math.max(1, Math.round(focusState.durationSec / 60));
  game.focusMinutes = (game.focusMinutes || 0) + minsCompleted;
  const rotGain = gainRoutineEnergy(Math.min(30, minsCompleted * 2));
  markActiveToday();
  recordAnalytics("focus", minsCompleted);
  addGardenGrowth(minsCompleted, false);
  if (typeof addGuildXp === "function") addGuildXp(12 + minsCompleted);

  const sel = document.getElementById("focusQuestSelect");
  const targetQuestId = (sel && sel.value) || focusState.questId;
  const quest = game.quests.find(q => q.id === targetQuestId && !q.completed);

  if (quest) {
    completeQuest(quest.id, true);
  } else {
    const bonusXp = gainXP(minsCompleted * 3 + 25);
    const bonusCoins = gainCoins(Math.round(minsCompleted * 1.5) + 10);
    recordDailyActivity(1);
    playSFX("levelup");
    notify(`⏱️ Sessão de Foco (${minsCompleted}m) concluída! +${bonusXp} XP, +${bonusCoins} 🪙, +${rotGain} 🔋!`);
  }
  sendBrowserNotification("Anime Life RPG", `Sessão de foco (${minsCompleted} min) concluída!`);

  focusState.remainingSec = focusState.durationSec;
  const statusEl = document.getElementById("focusStatusLabel");
  if (statusEl) statusEl.textContent = `✅ Sessão de ${minsCompleted} min finalizada! Inicie uma 🍵 Pausa Ativa para recuperar HP/EN.`;

  updateAchievements();
  saveGame();
  renderAll();
}

function restoreFocusTimerState() {
  try {
    const raw = localStorage.getItem(FOCUS_TIMER_STORAGE_KEY);
    if (!raw) return;
    const saved = JSON.parse(raw);
    if (!saved || !saved.running || !saved.endTimeMs) return;

    focusState.phase = saved.phase === "break" ? "break" : "focus";
    focusState.breakMode = saved.breakMode === "rhythm" ? "rhythm" : "meditation";
    focusState.durationSec = Math.max(60, Math.floor(toNumber(saved.durationSec, 25 * 60)));
    focusState.questId = saved.questId || "";
    focusState.breakElapsed = Math.max(0, Math.floor(toNumber(saved.breakElapsed, 0)));
    focusState.endTimeMs = Number(saved.endTimeMs);
    focusState.running = true;
    focusState.ring = {
      radius: 54,
      active: focusState.phase === "break" && focusState.breakMode === "rhythm" && (saved.ringAttempts || 0) < BREAK_MAX_PULSES,
      hits: saved.ringHits || 0,
      attempts: saved.ringAttempts || 0
    };
    syncFocusRemainingFromClock();

    if (focusState.phase === "break") {
      tickBreak();
      if (focusState.running) {
        clearInterval(focusState.intervalId);
        focusState.intervalId = setInterval(tickBreak, 1000);
        if (focusState.breakMode === "rhythm" && focusState.ring.active) startFocusRingLoop();
      }
    } else {
      if (focusState.remainingSec <= 0) {
        finishFocusSession();
      } else {
        clearInterval(focusState.intervalId);
        focusState.intervalId = setInterval(tickFocus, 1000);
        renderFocusTimer();
      }
    }
  } catch {
    clearFocusTimerStorage();
  }
}

function selectQuestForFocus(questId) {
  focusState.questId = questId;
  openPage("quests");
  const sel = document.getElementById("focusQuestSelect");
  if (sel) sel.value = questId;
  const panel = document.getElementById("focusTimerPanel");
  if (panel) panel.scrollIntoView({ behavior: "smooth", block: "center" });
  notify("⏱️ Missão selecionada no Cronômetro de Foco!");
}

function renderFocusTimer() {
  const clockEl = document.getElementById("focusClockDisplay");
  const fillEl = document.getElementById("focusProgressBar");
  const sel = document.getElementById("focusQuestSelect");
  const startBtn = document.getElementById("focusStartBtn");
  const pauseBtn = document.getElementById("focusPauseBtn");
  const resetBtn = document.getElementById("focusResetBtn");

  if (clockEl) {
    const m = String(Math.floor(focusState.remainingSec / 60)).padStart(2, "0");
    const s = String(focusState.remainingSec % 60).padStart(2, "0");
    clockEl.textContent = `${m}:${s}`;
  }

  if (fillEl) {
    const elapsed = focusState.durationSec - focusState.remainingSec;
    const pct = focusState.durationSec > 0 ? Math.min(100, Math.round((elapsed / focusState.durationSec) * 100)) : 0;
    fillEl.style.width = pct + "%";
  }

  if (startBtn) {
    startBtn.disabled = focusState.running;
    startBtn.textContent = focusState.phase === "break" ? "▶ Retomar Pausa" : "▶ Iniciar Foco";
  }
  if (pauseBtn) pauseBtn.disabled = !focusState.running;
  if (resetBtn) {
    resetBtn.disabled = focusState.phase !== "break" && !focusState.running && focusState.remainingSec === focusState.durationSec;
    resetBtn.textContent = focusState.phase === "break" ? "⏭ Pular Pausa" : "⏹ Cancelar";
  }

  const breakBtn = document.getElementById("focusStartBreakBtn");
  if (breakBtn) {
    breakBtn.disabled = focusState.phase === "break" || (focusState.running && focusState.phase === "focus");
    breakBtn.textContent = `🍵 Pausa Ativa (${Math.round(getBreakDurationSec() / 60)}m)`;
  }
  const pulseBtn = document.getElementById("focusPulseKiBtn");
  if (pulseBtn) {
    const showPulse = focusState.phase === "break" && focusState.breakMode === "rhythm";
    pulseBtn.classList.toggle("hidden", !showPulse);
    pulseBtn.disabled = !focusState.running || focusState.ring.attempts >= BREAK_MAX_PULSES;
    pulseBtn.textContent = `⚡ Pulso de Ki! (${focusState.ring.hits} acertos • ${BREAK_MAX_PULSES - focusState.ring.attempts} restantes)`;
  }
  const panel = document.getElementById("focusTimerPanel");
  if (panel) panel.classList.toggle("break-mode", focusState.phase === "break");

  if (sel) {
    const currentVal = sel.value || focusState.questId;
    const pending = game.quests.filter(q => !q.completed);
    sel.innerHTML = `<option value="">⚡ Treino Livre de Foco (+XP/Moedas)</option>` +
      pending.map(q => `<option value="${escapeHTML(q.id)}">🎯 ${escapeHTML(q.name)} (+30% Bônus)</option>`).join("");
    if (pending.some(q => q.id === currentVal)) {
      sel.value = currentVal;
    }
  }

  drawFocusAvatar();
}

function drawFocusAvatar() {
  const canvas = document.getElementById("focusAvatarCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const grad = ctx.createRadialGradient(60, 60, 8, 60, 60, 56);
  const isBreak = focusState.phase === "break";
  grad.addColorStop(0, isBreak ? "rgba(34, 197, 94, 0.30)" : focusState.running ? "rgba(246, 196, 83, 0.35)" : "rgba(149, 101, 255, 0.18)");
  grad.addColorStop(1, "rgba(18, 14, 33, 0.95)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  drawSprite(ctx, getGameLook(), 20, 18, 5, {
    frame: focusState.running && !isBreak ? focusState.animTick : 0,
    dir: "down",
    moving: focusState.running && !isBreak,
    auraColor: isBreak ? "#4ade80" : focusState.running ? "#f6c453" : null,
    hasSword: Boolean(game.equippedItems.weapon)
  });

  if (isBreak && focusState.breakMode === "meditation") {
    // Partículas de Ki subindo durante a meditação
    for (let i = 0; i < 6; i++) {
      const px = 18 + ((i * 17 + focusState.animTick * 7) % 84);
      const py = 110 - ((focusState.animTick * 9 + i * 23) % 90);
      ctx.fillStyle = i % 2 ? "#4ade80" : "#38bdf8";
      ctx.fillRect(px, py, 3, 3);
    }
  }

  if (isBreak && focusState.breakMode === "rhythm" && focusState.ring.active) {
    // Zona dourada alvo
    ctx.strokeStyle = "rgba(250, 204, 21, 0.35)";
    ctx.lineWidth = BREAK_RING_TARGET_MAX - BREAK_RING_TARGET_MIN;
    ctx.beginPath();
    ctx.arc(60, 60, (BREAK_RING_TARGET_MIN + BREAK_RING_TARGET_MAX) / 2, 0, Math.PI * 2);
    ctx.stroke();
    // Anel de Ki contraindo
    const r = focusState.ring.radius;
    const inZone = r >= BREAK_RING_TARGET_MIN && r <= BREAK_RING_TARGET_MAX;
    ctx.strokeStyle = inZone ? "#fde047" : "#38bdf8";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(60, 60, r, 0, Math.PI * 2);
    ctx.stroke();
  }
}

/* =========================================================
   EXPANSÃO v6: HÁBITOS (DAILIES), JARDIM, ALQUIMIA, ESTATÍSTICAS, TEMAS E MASMORRAS
========================================================= */

/* --- ESTATÍSTICAS DIÁRIAS (ANALYTICS) --- */
function recordAnalytics(field, amount = 1) {
  if (!game.analytics || typeof game.analytics !== "object") game.analytics = {};
  const key = todayString();
  if (!game.analytics[key]) game.analytics[key] = { focus: 0, tasks: 0, dailies: 0, battles: 0 };
  game.analytics[key][field] = (game.analytics[key][field] || 0) + amount;
  const keys = Object.keys(game.analytics).sort();
  if (keys.length > 60) keys.slice(0, keys.length - 60).forEach(k => delete game.analytics[k]);
}

/* --- HÁBITOS RECORRENTES (DAILIES) COM STREAK, ESCALA & CRISTAL DE GELO --- */
const DAILY_CATEGORY_META = {
  health: { icon: "💧", label: "Saúde", xp: 35, coins: 18 },
  study: { icon: "📘", label: "Estudo", xp: 50, coins: 25 },
  fitness: { icon: "💪", label: "Treino", xp: 45, coins: 22 },
  mind: { icon: "🧘", label: "Mente", xp: 30, coins: 15 }
};

const DAILY_SCHEDULE_META = {
  all: { label: "Diário", hint: "Todos os dias" },
  weekdays: { label: "Seg–Sex", hint: "Dias úteis" },
  weekends: { label: "Sáb–Dom", hint: "Fim de semana" }
};

function isDateScheduled(schedule, dateKey) {
  if (!schedule || schedule === "all") return true;
  const parts = String(dateKey || "").split("-").map(Number);
  if (parts.length !== 3 || parts.some(n => !Number.isFinite(n))) return true;
  const wd = new Date(parts[0], parts[1] - 1, parts[2]).getDay();
  if (schedule === "weekdays") return wd >= 1 && wd <= 5;
  if (schedule === "weekends") return wd === 0 || wd === 6;
  return true;
}

function countMissedScheduledDays(lastDate, todayStr, schedule) {
  if (!lastDate || !todayStr || lastDate >= todayStr) return 0;
  const parts = String(todayStr).split("-").map(Number);
  if (parts.length !== 3 || parts.some(n => !Number.isFinite(n))) return 0;
  let missed = 0;
  for (let offset = 1; offset <= 30; offset++) {
    const dt = new Date(parts[0], parts[1] - 1, parts[2] - offset);
    const dk = `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, "0")}-${String(dt.getDate()).padStart(2, "0")}`;
    if (dk <= lastDate) break;
    if (isDateScheduled(schedule, dk) && game.streakFreezeProtectedDate !== dk) {
      missed++;
    }
  }
  return missed;
}

function getDailyStreakMult(streak) {
  return 1 + Math.min(30, streak) * 0.05;
}

function getTodaysScheduledDailies() {
  const today = todayString();
  const list = Array.isArray(game.dailies) ? game.dailies : [];
  const scheduled = list.filter(d => isDateScheduled(d.schedule, today));
  return scheduled.length ? scheduled : list;
}

function isConsistencyAuraActive() {
  const reqList = getTodaysScheduledDailies();
  return reqList.length > 0 && reqList.every(d => d.completedToday);
}

function resetDailiesIfNewDay() {
  if (!Array.isArray(game.dailies)) return;
  const today = todayString();
  const yesterday = dateString(-1);
  let changed = false;

  // Cristal de Gelo Temporal protege automaticamente 1 dia perdido antes de zerar sequências
  const needsFreezeGlobal = game.streak > 0 && game.lastActive && game.lastActive < yesterday && countMissedScheduledDays(game.lastActive, today, "all") === 1;
  const needsFreezeDailies = game.dailies.some(d => d.streak > 0 && d.lastCompletedDate && d.lastCompletedDate < yesterday && countMissedScheduledDays(d.lastCompletedDate, today, d.schedule) === 1);
  if ((needsFreezeGlobal || needsFreezeDailies) && (game.streakFreezes || 0) > 0 && game.streakFreezeProtectedDate !== yesterday) {
    game.streakFreezes--;
    game.streakFreezeProtectedDate = yesterday;
    changed = true;
    notify(`🧊 Cristal de Gelo Temporal ativado! Sua sequência foi protegida ontem (${game.streakFreezes}/5 restantes).`);
  }

  game.dailies.forEach(d => {
    if (d.completedToday && d.lastCompletedDate !== today) {
      d.completedToday = false;
      changed = true;
    }
    if (d.streak > 0 && d.lastCompletedDate && d.lastCompletedDate !== today) {
      if (countMissedScheduledDays(d.lastCompletedDate, today, d.schedule) > 0) {
        d.streak = 0;
        changed = true;
      }
    }
  });
  if (changed) scheduleSave();
}

function completeDaily(dailyId) {
  const d = (game.dailies || []).find(item => item.id === dailyId);
  if (!d || d.completedToday) return;

  const today = todayString();
  const yesterday = dateString(-1);
  const keptStreak = Boolean(d.lastCompletedDate) && (
    d.lastCompletedDate === yesterday ||
    countMissedScheduledDays(d.lastCompletedDate, today, d.schedule) === 0
  );
  d.streak = keptStreak ? d.streak + 1 : 1;
  d.bestStreak = Math.max(d.bestStreak || 0, d.streak);
  d.completedToday = true;
  d.lastCompletedDate = today;

  const mult = getDailyStreakMult(d.streak);
  const xpGain = gainXP(Math.round(d.baseXp * mult));
  const coinGain = gainCoins(Math.round(d.baseCoins * mult));
  const gainedRot = gainRoutineEnergy(15);
  markActiveToday();
  recordDailyActivity(1);
  recordAnalytics("dailies", 1);
  addGardenGrowth(10, false);
  if (typeof addGuildXp === "function") addGuildXp(18);

  if (isConsistencyAuraActive()) {
    game.gems += 1;
    playSFX("levelup");
    notify(`🛡️ AURA DE CONSISTÊNCIA ATIVA! Todos os hábitos concluídos (+${xpGain} XP, +${coinGain} 🪙, +${gainedRot} 🔋, +1 💎)!`);
  } else {
    playSFX("quest");
    notify(`🔥 ${d.title} • Streak ${d.streak}d (x${mult.toFixed(2)}) • +${xpGain} XP, +${coinGain} 🪙, +${gainedRot} 🔋`);
  }
  updateAchievements();
  saveGame();
  renderAll();
}

function addDaily() {
  const titleInput = document.getElementById("newDailyTitle");
  const catSelect = document.getElementById("newDailyCategory");
  const schedSelect = document.getElementById("newDailySchedule");
  const title = (titleInput?.value || "").trim();
  if (!title) {
    notify("Digite o nome do hábito diário.");
    return;
  }
  if ((game.dailies || []).length >= 12) {
    notify("Limite de 12 hábitos diários atingido. Remova algum antes.");
    return;
  }
  const category = DAILY_CATEGORY_META[catSelect?.value] ? catSelect.value : "mind";
  const schedule = DAILY_SCHEDULE_META[schedSelect?.value] ? schedSelect.value : "all";
  const meta = DAILY_CATEGORY_META[category];
  game.dailies.push({
    id: "daily-" + Date.now(),
    title: title.slice(0, 60),
    category,
    schedule,
    icon: meta.icon,
    streak: 0,
    bestStreak: 0,
    completedToday: false,
    lastCompletedDate: "",
    baseXp: meta.xp,
    baseCoins: meta.coins
  });
  if (titleInput) titleInput.value = "";
  playSFX("click");
  saveGame();
  renderAll();
  notify("Novo hábito recorrente criado!");
}

function deleteDaily(dailyId) {
  const d = (game.dailies || []).find(item => item.id === dailyId);
  if (!d) return;
  if (!window.confirm(`Remover o hábito "${d.title}"? A sequência será perdida.`)) return;
  game.dailies = game.dailies.filter(item => item.id !== dailyId);
  saveGame();
  renderAll();
}

function renderDailies() {
  const list = document.getElementById("dailiesList");
  const auraBadge = document.getElementById("dailyStreakAuraBadge");
  const freezeBadge = document.getElementById("streakFreezeBadge");
  const dailies = game.dailies || [];
  const today = todayString();
  const reqDailies = getTodaysScheduledDailies();
  const doneReqCount = reqDailies.filter(d => d.completedToday).length;

  if (freezeBadge) {
    freezeBadge.textContent = `🧊 ${game.streakFreezes || 0}/5 Escudo(s)`;
  }

  if (auraBadge) {
    const pct = reqDailies.length ? Math.round((doneReqCount / reqDailies.length) * 100) : 0;
    auraBadge.textContent = isConsistencyAuraActive()
      ? "🛡️ Aura de Consistência ATIVA (+10% DEF, +8% CRIT)"
      : `🛡️ Aura de Consistência: ${pct}% (${doneReqCount}/${reqDailies.length})`;
  }
  if (!list) return;

  if (!dailies.length) {
    list.innerHTML = `<p class="muted">Nenhum hábito cadastrado. Adicione um acima para começar sua sequência!</p>`;
    return;
  }

  list.innerHTML = dailies.map(d => {
    const scheduledToday = isDateScheduled(d.schedule, today);
    const keptStreak = Boolean(d.lastCompletedDate) && countMissedScheduledDays(d.lastCompletedDate, today, d.schedule) === 0;
    const nextStreak = d.completedToday ? d.streak : (keptStreak ? d.streak + 1 : 1);
    const mult = getDailyStreakMult(nextStreak);
    const meta = DAILY_CATEGORY_META[d.category] || DAILY_CATEGORY_META.mind;
    const schedMeta = DAILY_SCHEDULE_META[d.schedule] || DAILY_SCHEDULE_META.all;
    const streakCls = d.streak >= 14 ? "rarity-legendary" : d.streak >= 7 ? "rarity-epic" : d.streak >= 3 ? "rarity-rare" : "rarity-common";
    return `
      <div class="quest-item ${d.completedToday ? "done" : ""}" style="${!scheduledToday && !d.completedToday ? "opacity:0.82;" : ""}">
        <div>
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
            <span class="quest-name">${escapeHTML(d.icon)} ${escapeHTML(d.title)}</span>
            <span class="rarity-badge ${streakCls}">🔥 ${d.streak} dia(s)</span>
            <span class="rarity-badge rarity-uncommon">${escapeHTML(meta.label)}</span>
            <span class="rarity-badge rarity-common">${escapeHTML(schedMeta.label)}</span>
            ${!scheduledToday ? `<span class="rarity-badge rarity-rare">🌴 Folga hoje</span>` : ""}
          </div>
          <div class="quest-meta">Recompensa: <span class="quest-reward">+${Math.round(d.baseXp * mult)} XP • +${Math.round(d.baseCoins * mult)} 🪙 (x${mult.toFixed(2)})</span> • Recorde: ${d.bestStreak || 0} dia(s)</div>
        </div>
        <div class="quest-actions">
          <button class="complete-btn" data-action="complete-daily" data-id="${escapeHTML(d.id)}" ${d.completedToday ? "disabled" : ""}>
            ${d.completedToday ? "Feito hoje ✓" : scheduledToday ? "Concluir" : "Bônus"}
          </button>
          <button class="delete-btn" data-action="delete-daily" data-id="${escapeHTML(d.id)}" title="Remover hábito">✕</button>
        </div>
      </div>
    `;
  }).join("");
}

/* --- PLANTAÇÃO ESPIRITUAL DO DOJO --- */
function addGardenGrowth(points, announce = true) {
  if (!game.dojoGarden || !Array.isArray(game.dojoGarden.plots)) return;
  let readyNow = 0;
  game.dojoGarden.plots.forEach(p => {
    if (!p.unlocked || !p.seedId) return;
    const herb = herbsCatalog.find(h => h.id === p.seedId);
    if (!herb) return;
    const wasReady = p.growth >= herb.reqGrowth;
    p.growth = Math.min(herb.reqGrowth, p.growth + points);
    if (!wasReady && p.growth >= herb.reqGrowth) readyNow++;
  });
  if (readyNow > 0 && announce) notify(`🌿 ${readyNow} erva(s) prontas para colheita no Pátio do Dojo!`);
}

function plantSeed(plotIdx, herbId) {
  const plot = game.dojoGarden.plots[Number(plotIdx)];
  const herb = herbsCatalog.find(h => h.id === herbId);
  if (!plot || !herb || !plot.unlocked || plot.seedId) return;
  if (game.coins < herb.seedCost) {
    notify(`Você precisa de ${herb.seedCost} 🪙 para comprar a semente de ${herb.name}.`);
    return;
  }
  game.coins -= herb.seedCost;
  plot.seedId = herb.id;
  plot.growth = 0;
  playSFX("click");
  saveGame();
  renderAll();
  notify(`🌱 ${herb.name} plantada! Ela cresce com minutos de foco e tarefas concluídas.`);
}

function harvestPlot(plotIdx) {
  const plot = game.dojoGarden.plots[Number(plotIdx)];
  if (!plot || !plot.seedId) return;
  const herb = herbsCatalog.find(h => h.id === plot.seedId);
  if (!herb || plot.growth < herb.reqGrowth) {
    notify("Esta erva ainda não está pronta para a colheita.");
    return;
  }
  const qty = 2;
  game.dojoGarden.herbs[herb.id] = (game.dojoGarden.herbs[herb.id] || 0) + qty;
  plot.seedId = null;
  plot.growth = 0;
  playSFX("chest");
  saveGame();
  renderAll();
  notify(`🧺 Colheita: +${qty} ${herb.icon} ${herb.name}!`);
}

function unlockPlot(plotIdx) {
  const idx = Number(plotIdx);
  const plot = game.dojoGarden.plots[idx];
  const cost = PLOT_UNLOCK_COSTS[idx] || 0;
  if (!plot || plot.unlocked) return;
  if (game.coins < cost) {
    notify(`Você precisa de ${cost} 🪙 para preparar este canteiro.`);
    return;
  }
  game.coins -= cost;
  plot.unlocked = true;
  playSFX("levelup");
  saveGame();
  renderAll();
  notify("🪴 Novo canteiro espiritual liberado no Pátio do Dojo!");
}

function brewRecipe(recipeId) {
  const recipe = alchemyRecipesCatalog.find(r => r.id === recipeId);
  if (!recipe) return;
  const herbs = game.dojoGarden.herbs;
  const missing = Object.keys(recipe.ingredients).filter(k => (herbs[k] || 0) < recipe.ingredients[k]);
  if (missing.length) {
    notify("Ingredientes insuficientes! Cultive mais ervas no Pátio do Dojo.");
    return;
  }
  if (game.coins < recipe.coinCost) {
    notify(`Você precisa de ${recipe.coinCost} 🪙 para acender o caldeirão.`);
    return;
  }
  Object.keys(recipe.ingredients).forEach(k => { herbs[k] -= recipe.ingredients[k]; });
  game.coins -= recipe.coinCost;
  addInventoryItem(recipe.outputItem, 1);
  game.potionsBrewed = (game.potionsBrewed || 0) + 1;
  playSFX("skill");
  updateAchievements();
  saveGame();
  renderAll();
  notify(`⚗️ Transmutação concluída: ${recipe.outputItem.icon} ${recipe.outputItem.name} adicionado ao inventário!`);
}

function renderGardenAndAlchemy() {
  const garden = game.dojoGarden;
  if (!garden) return;
  const herbTotal = herbsCatalog.reduce((s, h) => s + (garden.herbs[h.id] || 0), 0);
  const badge = document.getElementById("herbInventoryBadge");
  if (badge) badge.textContent = `🌱 ${herbTotal} Ervas no Estoque • ⚗️ ${game.potionsBrewed || 0} Poções criadas`;

  const stockBar = document.getElementById("herbStockBar");
  if (stockBar) {
    stockBar.innerHTML = herbsCatalog.map(h =>
      `<span class="herb-chip" title="${escapeHTML(h.desc)}">${h.icon} ${escapeHTML(h.name)}: <strong>${garden.herbs[h.id] || 0}</strong></span>`
    ).join("");
  }

  const gardenGrid = document.getElementById("dojoGardenGrid");
  if (gardenGrid) {
    gardenGrid.innerHTML = garden.plots.map((p, idx) => {
      if (!p.unlocked) {
        return `
          <div class="skill-card locked">
            <div>
              <span class="skill-icon">🔒</span>
              <h3>Canteiro ${idx + 1} (Bloqueado)</h3>
              <p>Prepare a terra espiritual para cultivar mais ervas ao mesmo tempo.</p>
            </div>
            <div class="skill-card-actions">
              <button data-action="unlock-plot" data-id="${idx}">Liberar (${PLOT_UNLOCK_COSTS[idx]} 🪙)</button>
            </div>
          </div>`;
      }
      if (!p.seedId) {
        return `
          <div class="skill-card">
            <div>
              <span class="skill-icon">🟫</span>
              <h3>Canteiro ${idx + 1} (Vazio)</h3>
              <p>Escolha uma semente. Cada minuto de foco = +1 pt • cada tarefa/hábito = +10 pts.</p>
            </div>
            <div class="skill-card-actions" style="display:grid;grid-template-columns:1fr 1fr;gap:6px;">
              ${herbsCatalog.map(h => `<button data-action="plant-seed" data-id="${idx}" data-herb="${h.id}" title="${escapeHTML(h.desc)}">${h.icon} ${h.seedCost} 🪙</button>`).join("")}
            </div>
          </div>`;
      }
      const herb = herbsCatalog.find(h => h.id === p.seedId);
      const pct = Math.min(100, Math.round((p.growth / herb.reqGrowth) * 100));
      const ready = pct >= 100;
      return `
        <div class="skill-card ${ready ? "equipped" : ""}">
          <div>
            <div style="display:flex;justify-content:space-between;align-items:center;">
              <span class="skill-icon">${ready ? herb.icon : "🌱"}</span>
              <span class="rarity-badge ${ready ? "rarity-legendary" : "rarity-uncommon"}">${ready ? "PRONTA!" : `${p.growth}/${herb.reqGrowth} pts`}</span>
            </div>
            <h3>${escapeHTML(herb.name)}</h3>
            <div class="progress-track" style="margin:8px 0;"><div class="progress-fill" style="width:${pct}%"></div></div>
            <p>${ready ? "Colha agora para obter 2 unidades!" : "Continue focando e concluindo tarefas para crescer."}</p>
          </div>
          <div class="skill-card-actions">
            <button data-action="harvest-plot" data-id="${idx}" ${ready ? "" : "disabled"}>${ready ? "🧺 Colher (+2)" : `Crescendo ${pct}%`}</button>
          </div>
        </div>`;
    }).join("");
  }

  const alchemyGrid = document.getElementById("alchemyRecipesGrid");
  if (alchemyGrid) {
    alchemyGrid.innerHTML = alchemyRecipesCatalog.map(r => {
      const rm = getRarityMeta(r.rarity);
      const canBrew = Object.keys(r.ingredients).every(k => (garden.herbs[k] || 0) >= r.ingredients[k]) && game.coins >= r.coinCost;
      const ingText = Object.keys(r.ingredients).map(k => {
        const h = herbsCatalog.find(x => x.id === k);
        const have = garden.herbs[k] || 0;
        return `${h ? h.icon : "🌿"} ${have}/${r.ingredients[k]}`;
      }).join(" • ");
      return `
        <div class="skill-card ${canBrew ? "" : "locked"}">
          <div>
            <div style="display:flex;justify-content:space-between;align-items:center;">
              <span class="skill-icon">${r.icon}</span>
              <span class="rarity-badge ${rm.cls}">${escapeHTML(rm.label)}</span>
            </div>
            <h3>${escapeHTML(r.name)}</h3>
            <p>${escapeHTML(r.outputItem.description)}</p>
            <div class="skill-stats-line">Ingredientes: ${ingText} • ${r.coinCost} 🪙</div>
          </div>
          <div class="skill-card-actions">
            <button data-action="brew-recipe" data-id="${escapeHTML(r.id)}" ${canBrew ? "" : "disabled"}>⚗️ Transmutar</button>
          </div>
        </div>`;
    }).join("");
  }
}

/* --- PAINEL DE ESTATÍSTICAS (GRÁFICO CANVAS 2D, SEM BIBLIOTECAS) --- */
const WEEKDAY_NAMES = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
const WEEKDAY_SHORT = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

function renderProductivityStats() {
  const analytics = game.analytics || {};
  const setText = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  };

  setText("statTotalFocusHours", `${((game.focusMinutes || 0) / 60).toFixed(1)}h`);
  const dailies = game.dailies || [];
  let possible = 0;
  let done = 0;
  for (let i = 6; i >= 0; i--) {
    const dayStr = dateString(-i);
    const e = analytics[dayStr];
    const scheduledCount = dailies.filter(d => isDateScheduled(d.schedule || "all", dayStr)).length;
    possible += scheduledCount;
    done += e ? Math.min(scheduledCount, e.dailies || 0) : 0;
  }
  setText("statHabitConsistency", `${possible ? Math.round((done / possible) * 100) : 0}%`);
  setText("statBestDailyStreak", `${dailies.reduce((m, d) => Math.max(m, d.bestStreak || 0), 0)} dias`);
  setText("statPotionsBrewed", `${game.potionsBrewed || 0}`);

  // Dia da semana mais produtivo (média histórica de minutos focados + tarefas)
  const sums = Array(7).fill(0);
  const counts = Array(7).fill(0);
  Object.keys(analytics).forEach(k => {
    const [y, m, d] = k.split("-").map(Number);
    const wd = new Date(y, m - 1, d).getDay();
    const e = analytics[k];
    sums[wd] += (e.focus || 0) + ((e.tasks || 0) + (e.dailies || 0)) * 10;
    counts[wd]++;
  });
  let bestIdx = -1;
  let bestAvg = 0;
  sums.forEach((s, i) => {
    const avg = counts[i] ? s / counts[i] : 0;
    if (avg > bestAvg) { bestAvg = avg; bestIdx = i; }
  });
  setText("mostProductiveDayBadge", bestIdx >= 0 ? `🏆 Dia Mais Produtivo: ${WEEKDAY_NAMES[bestIdx]}` : "🏆 Dia Mais Produtivo: sem dados ainda");

  drawProductivityChart();
}

function drawProductivityChart() {
  const questsPage = document.getElementById("page-quests");
  if (questsPage && questsPage.classList && !questsPage.classList.contains("active")) return;
  const canvas = document.getElementById("productivityChartCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const W = canvas.width;
  const H = canvas.height;
  const styles = getComputedStyle(document.body);
  const cGold = styles.getPropertyValue("--gold").trim() || "#fbbf24";
  const cCyan = styles.getPropertyValue("--cyan").trim() || "#38bdf8";
  const cPrimary = styles.getPropertyValue("--purple").trim() || "#e11d48";

  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = "#0a0e17";
  ctx.fillRect(0, 0, W, H);

  const days = [];
  for (let i = 6; i >= 0; i--) {
    const key = dateString(-i);
    const e = (game.analytics || {})[key] || { focus: 0, tasks: 0, dailies: 0 };
    const [y, m, d] = key.split("-").map(Number);
    days.push({ key, label: `${WEEKDAY_SHORT[new Date(y, m - 1, d).getDay()]} ${String(d).padStart(2, "0")}`, focus: e.focus || 0, tasks: (e.tasks || 0) + (e.dailies || 0) });
  }

  const padL = 44, padR = 44, padT = 22, padB = 34;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;
  const maxFocus = Math.max(30, ...days.map(d => d.focus));
  const maxTasks = Math.max(4, ...days.map(d => d.tasks));

  // Linhas de grade
  ctx.strokeStyle = "rgba(255,255,255,0.07)";
  ctx.lineWidth = 1;
  ctx.font = "600 10px 'JetBrains Mono', monospace";
  ctx.fillStyle = "#94a3b8";
  for (let i = 0; i <= 4; i++) {
    const gy = padT + (chartH * i) / 4;
    ctx.beginPath(); ctx.moveTo(padL, gy); ctx.lineTo(W - padR, gy); ctx.stroke();
    ctx.fillText(`${Math.round(maxFocus * (1 - i / 4))}m`, 4, gy + 4);
  }

  const slot = chartW / days.length;
  const barW = Math.min(46, slot * 0.55);

  // Barras de minutos focados
  days.forEach((d, i) => {
    const bh = (d.focus / maxFocus) * chartH;
    const bx = padL + slot * i + (slot - barW) / 2;
    const by = padT + chartH - bh;
    const g = ctx.createLinearGradient(0, by, 0, padT + chartH);
    g.addColorStop(0, cGold);
    g.addColorStop(1, cPrimary);
    ctx.fillStyle = g;
    ctx.fillRect(bx, by, barW, Math.max(bh, d.focus > 0 ? 2 : 0));
    if (i === days.length - 1) {
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 2;
      ctx.strokeRect(bx - 1, by - 1, barW + 2, Math.max(bh, 2) + 2);
    }
    ctx.fillStyle = "#cbd5e1";
    ctx.font = "700 11px 'Chakra Petch', sans-serif";
    const tw = ctx.measureText(d.label).width;
    ctx.fillText(d.label, padL + slot * i + (slot - tw) / 2, H - 12);
    if (d.focus > 0) {
      ctx.fillStyle = "#ffffff";
      const vt = `${d.focus}m`;
      ctx.fillText(vt, bx + (barW - ctx.measureText(vt).width) / 2, by - 5);
    }
  });

  // Linha de tendência de tarefas + hábitos
  ctx.strokeStyle = cCyan;
  ctx.lineWidth = 3;
  ctx.beginPath();
  days.forEach((d, i) => {
    const px = padL + slot * i + slot / 2;
    const py = padT + chartH - (d.tasks / maxTasks) * chartH;
    if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
  });
  ctx.stroke();
  days.forEach((d, i) => {
    const px = padL + slot * i + slot / 2;
    const py = padT + chartH - (d.tasks / maxTasks) * chartH;
    ctx.fillStyle = "#0a0e17";
    ctx.fillRect(px - 5, py - 5, 10, 10);
    ctx.fillStyle = cCyan;
    ctx.fillRect(px - 3, py - 3, 6, 6);
  });
  ctx.fillStyle = cCyan;
  ctx.font = "600 10px 'JetBrains Mono', monospace";
  ctx.fillText(`${maxTasks} tarefas`, W - padR + 2, padT + 4);

  // Legenda
  ctx.font = "700 11px 'Chakra Petch', sans-serif";
  ctx.fillStyle = cGold;
  ctx.fillRect(padL, 6, 10, 10);
  ctx.fillStyle = "#e2e8f0";
  ctx.fillText("Minutos focados", padL + 14, 15);
  ctx.fillStyle = cCyan;
  ctx.fillRect(padL + 130, 6, 10, 10);
  ctx.fillStyle = "#e2e8f0";
  ctx.fillText("Tarefas + hábitos", padL + 144, 15);
}

/* --- TEMAS VISUAIS DE UNIVERSOS ANIME --- */
function applyTheme(themeId, announce = false) {
  const id = ANIME_THEMES[themeId] ? themeId : "default_shonen";
  game.theme = id;
  if (id === "default_shonen") document.documentElement.removeAttribute("data-theme");
  else document.documentElement.setAttribute("data-theme", id);

  const badge = document.getElementById("activeThemeBadge");
  if (badge) badge.textContent = ANIME_THEMES[id].label;
  document.querySelectorAll(".theme-select-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.theme === id);
  });
  if (announce) {
    saveGame();
    drawProductivityChart();
    notify(`🎨 Tema aplicado: ${ANIME_THEMES[id].fullLabel}`);
  }
}

function cycleTheme() {
  const ids = Object.keys(ANIME_THEMES);
  const next = ids[(ids.indexOf(game.theme) + 1) % ids.length];
  playSFX("click");
  applyTheme(next, true);
}

/* --- MASMORRAS E RAIDS POR ONDAS --- */
const dungeonRun = {
  active: false,
  dungeonId: null,
  waveIdx: 0
};

function getActiveDungeon() {
  return dungeonRun.active ? dungeonsCatalog.find(d => d.id === dungeonRun.dungeonId) : null;
}

function startDungeon(dungeonId) {
  const dg = dungeonsCatalog.find(d => d.id === dungeonId);
  if (!dg) return;
  const reqLevel = Math.max(dg.minLevel, 1);
  if (game.level < reqLevel) {
    notify(`Alcance o Nível ${reqLevel} para entrar em ${dg.name}!`);
    return;
  }
  const totals = getTotalStats();
  if (game.hp < totals.maxHp * 0.5) {
    notify("Recupere pelo menos 50% do HP antes de entrar numa Masmorra (descanse no Mapa ou use uma Pausa Ativa).");
    return;
  }
  dungeonRun.active = true;
  dungeonRun.dungeonId = dg.id;
  dungeonRun.waveIdx = 0;
  const diffSel = document.getElementById("battleDifficultySelect");
  if (diffSel) diffSel.value = "normal";
  selectBattleEnemy(dg.waves[0], true);
  addBattleLog(`🏰 MASMORRA: ${dg.name} — Onda 1/${dg.waves.length}! Sem cura total entre ondas.`, "log-win");
  playSFX("portal");
  notify(`🏰 Raid iniciada: ${dg.name}! Derrote ${dg.waves.length} ondas seguidas.`);
  renderBattle();
}

function abandonDungeon(silent = false) {
  if (!dungeonRun.active) return;
  dungeonRun.active = false;
  dungeonRun.dungeonId = null;
  dungeonRun.waveIdx = 0;
  if (!silent) notify("🏳️ Você recuou da Masmorra. O progresso da raid foi perdido.");
}

function advanceDungeonAfterVictory() {
  const dg = getActiveDungeon();
  if (!dg) return false;
  dungeonRun.waveIdx++;
  if (dungeonRun.waveIdx >= dg.waves.length) {
    const firstClear = !game.clearedDungeons.includes(dg.id);
    const xp = gainXP(dg.rewardXp);
    const coins = gainCoins(dg.rewardCoins);
    game.gems += dg.rewardGems;
    addInventoryItem(dg.forgeDrop, 1);
    if (firstClear) {
      game.clearedDungeons.push(dg.id);
      game.classSpins = (game.classSpins || 0) + 1;
      game.standArrows = (game.standArrows || 0) + 1;
    }
    abandonDungeon(true);
    addBattleLog(`🏆 MASMORRA CONCLUÍDA: ${dg.name}! +${xp} XP, +${coins} 🪙, +${dg.rewardGems} 💎 e ${dg.forgeDrop.icon} ${dg.forgeDrop.name}!`, "log-win");
    notify(`🏆 Raid ${dg.name} concluída! Material de Forja: ${dg.forgeDrop.name}${firstClear ? " (+1 Giro e +1 Flecha no 1º clear!)" : ""}`);
    playSFX("levelup");
    return true;
  }
  // Transição entre ondas: apenas +15% HP/EN
  const totals = getTotalStats();
  game.hp = Math.min(totals.maxHp, game.hp + Math.round(totals.maxHp * 0.15));
  game.mp = Math.min(totals.maxMp, game.mp + Math.round(totals.maxMp * 0.15));
  const nextId = dg.waves[dungeonRun.waveIdx];
  const diffSel = document.getElementById("battleDifficultySelect");
  if (diffSel) diffSel.value = dungeonRun.waveIdx === dg.waves.length - 1 ? "hard" : "normal";
  selectBattleEnemy(nextId, true);
  addBattleLog(`🌊 Onda ${dungeonRun.waveIdx + 1}/${dg.waves.length}: ${getCurrentEnemy().name} entrou! (+15% HP/EN)`, "log-win");
  notify(`🌊 Onda ${dungeonRun.waveIdx + 1}/${dg.waves.length}!`);
  return true;
}

function renderDungeons() {
  const grid = document.getElementById("dungeonsGrid");
  const tag = document.getElementById("dungeonActiveStatusTag");
  const active = getActiveDungeon();
  if (tag) {
    tag.textContent = active
      ? `🏰 ${active.name} • ONDA ${dungeonRun.waveIdx + 1}/${active.waves.length}`
      : `MODO LIVRE • ${(game.clearedDungeons || []).length}/${dungeonsCatalog.length} RAIDS CONCLUÍDAS`;
  }
  if (!grid) return;
  grid.innerHTML = dungeonsCatalog.map(dg => {
    const cleared = (game.clearedDungeons || []).includes(dg.id);
    const locked = game.level < dg.minLevel;
    const isActive = active && active.id === dg.id;
    const waveNames = dg.waves.map(id => (enemiesCatalog.find(e => e.id === id) || {}).name || id).map(n => n.replace(" (Chefe)", ""));
    return `
      <div class="boss-card ${cleared ? "defeated" : ""}">
        <div>
          <span class="rarity-badge ${cleared ? "rarity-legendary" : "rarity-mythic"}">${cleared ? "🏆 Concluída" : `${dg.icon} ${escapeHTML(dg.anime)}`}</span>
          <strong>${escapeHTML(dg.name)}</strong>
          <small>Nv. ${dg.minLevel}+ • ${dg.waves.length} Ondas: ${waveNames.map(escapeHTML).join(" → ")}</small>
          <small>Drop: ${dg.forgeDrop.icon} ${escapeHTML(dg.forgeDrop.name)} • +${dg.rewardXp} XP • +${dg.rewardCoins} 🪙</small>
        </div>
        ${isActive
          ? `<button class="danger-btn" style="padding:6px 10px;font-size:13px;" data-action="abandon-dungeon" data-id="${escapeHTML(dg.id)}">🏳️ Abandonar Raid</button>`
          : `<button class="secondary-btn" style="padding:6px 10px;font-size:13px;" data-action="start-dungeon" data-id="${escapeHTML(dg.id)}" ${locked || active ? "disabled" : ""}>${locked ? `🔒 Nível ${dg.minLevel}` : "🏰 Entrar na Masmorra"}</button>`}
      </div>`;
  }).join("");
}

/* --- CALENDÁRIO VISUAL DE CONSISTÊNCIA (HEATMAP 28 DIAS) --- */
function renderConsistencyHeatmap() {
  const grid = document.getElementById("heatmapGrid");
  if (!grid) return;

  const log = game.dailyActivityLog || {};
  let activeDaysCount = 0;

  const completedToday = game.quests.filter(q => q.completed).length;
  const todayKey = todayString();
  if (completedToday > 0 && (!log[todayKey] || log[todayKey] < completedToday)) {
    log[todayKey] = completedToday;
  }

  const cellsHtml = [];
  for (let i = 27; i >= 0; i--) {
    const key = dateString(-i);
    const count = log[key] || 0;
    if (count > 0) activeDaysCount++;
    const lvl = count >= 4 ? 3 : count >= 2 ? 2 : count >= 1 ? 1 : 0;
    const dayNum = key.slice(-2);
    cellsHtml.push(`
      <div class="heatmap-cell heat-${lvl}" title="${key}: ${count} atividade(s)">
        <strong>${dayNum}</strong>
        <small>${count}x</small>
      </div>
    `);
  }
  grid.innerHTML = cellsHtml.join("");

  const bestStreakEl = document.getElementById("bestStreakStat");
  const focusMinsEl = document.getElementById("focusMinutesStat");
  const activeDaysEl = document.getElementById("activeDaysStat");
  const avgDailyEl = document.getElementById("avgDailyStat");

  if (bestStreakEl) bestStreakEl.textContent = `${Math.max(game.bestStreak || 0, getEffectiveStreak())} dias`;
  if (focusMinsEl) focusMinsEl.textContent = `${game.focusMinutes || 0} min`;
  if (activeDaysEl) activeDaysEl.textContent = `${Math.max(activeDaysCount, game.totalCompleted > 0 ? 1 : 0)} dias`;
  if (avgDailyEl) {
    const denom = Math.max(1, activeDaysCount || 1);
    avgDailyEl.textContent = (game.totalCompleted / denom).toFixed(1);
  }
}

function renderQuests() {
  const completedCount = game.quests.filter(q => q.completed).length;
  const totalCount = game.quests.length || 1;
  const remainingCount = Math.max(0, game.quests.length - completedCount);
  const pct = Math.round((completedCount / totalCount) * 100);
  const totals = getTotalStats();

  const setText = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  };

  setText("questDone", completedCount);
  setText("questRemaining", remainingCount);
  setText("questTotal", game.quests.length);
  setText("questBuffText", `+${totals.determinationPct || 0}%`);
  setText("dailyBarBadge", `${pct}% CONCLUÍDO`);
  setText("homeDailyProgressText", `Progresso diário: ${completedCount}/${game.quests.length}`);
  setText("homeDailyPercent", `${pct}%`);

  const qBar = document.getElementById("questsDailyProgressBar");
  if (qBar) qBar.style.width = pct + "%";
  const hBar = document.getElementById("homeDailyBar");
  if (hBar) hBar.style.width = pct + "%";

  const diffLabels = {
    easy: { text: "Fácil", cls: "rarity-common" },
    medium: { text: "Média", cls: "rarity-rare" },
    hard: { text: "Difícil", cls: "rarity-epic" },
    epic: { text: "Épica", cls: "rarity-legendary" }
  };

  const renderQuestRow = (quest, compact = false) => {
    const diff = diffLabels[quest.difficulty] || diffLabels.easy;
    return `
      <div class="quest-item ${quest.completed ? "done" : ""}">
        <div>
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
            <span class="quest-name">${escapeHTML(quest.name)}</span>
            <span class="rarity-badge ${diff.cls}">${diff.text}</span>
          </div>
          <div class="quest-meta">Recompensa: <span class="quest-reward">+${quest.xp} XP • +${quest.coins} 🪙</span></div>
        </div>
        <div class="quest-actions">
          ${!quest.completed ? `<button class="focus-mini-btn" data-action="focus-quest" data-id="${escapeHTML(quest.id)}" title="Focar com Pomodoro (+30% Bônus)">⏱ Focar</button>` : ""}
          <button class="complete-btn" data-action="complete-quest" data-id="${escapeHTML(quest.id)}" ${quest.completed ? "disabled" : ""}>
            ${quest.completed ? "Concluída ✓" : "Concluir"}
          </button>
          ${!compact ? `
            <button class="edit-btn" data-action="edit-quest" data-id="${escapeHTML(quest.id)}" title="Editar">✎</button>
            <button class="delete-btn" data-action="delete-quest" data-id="${escapeHTML(quest.id)}" title="Excluir">✕</button>
          ` : ""}
        </div>
      </div>
    `;
  };

  const list = document.getElementById("questList");
  if (list) {
    list.innerHTML = game.quests.map(q => renderQuestRow(q, false)).join("");
  }

  const homeList = document.getElementById("homeQuestList");
  if (homeList) {
    const pending = game.quests.filter(q => !q.completed).slice(0, 4);
    homeList.innerHTML = pending.length
      ? pending.map(q => renderQuestRow(q, true)).join("")
      : `<p class="muted">🎉 Todas as missões de hoje foram concluídas!</p>`;
  }

  const chContainer = document.getElementById("challengesList");
  if (chContainer) {
    chContainer.innerHTML = challengesCatalog.map(ch => {
      const prog = Math.min(ch.target, ch.progress(game));
      const claimed = game.claimedChallenges.includes(ch.id);
      const canClaim = prog >= ch.target && !claimed;

      return `
        <div class="quest-item ${claimed ? "done" : ""}">
          <div>
            <span class="rarity-badge rarity-epic">${escapeHTML(ch.period)}</span>
            <div class="quest-name">${escapeHTML(ch.name)}</div>
            <div class="quest-meta">Progresso: ${prog}/${ch.target} • <span class="quest-reward">+${ch.xp} XP • +${ch.coins} 🪙 • +${ch.gems} 💎 • +1 Giro</span></div>
          </div>
          <button class="complete-btn" data-action="claim-challenge" data-id="${escapeHTML(ch.id)}" ${!canClaim ? "disabled" : ""}>
            ${claimed ? "Resgatado ✓" : canClaim ? "Resgatar!" : `${prog}/${ch.target}`}
          </button>
        </div>
      `;
    }).join("");
  }

  const nqContainer = document.getElementById("npcQuestsList");
  if (nqContainer) {
    nqContainer.innerHTML = npcQuestsCatalog.map(nq => {
      const prog = Math.min(nq.target, nq.progress(game));
      const ready = prog >= nq.target;
      const claimed = game.claimedNpcQuests.includes(nq.id);
      return `
        <div class="quest-item ${claimed ? "done" : ""}">
          <div>
            <span class="rarity-badge rarity-rare">${escapeHTML(nq.npc)}</span>
            <div class="quest-name">${escapeHTML(nq.name)}</div>
            <div class="quest-meta">${escapeHTML(nq.description)} • <span class="quest-reward">+${nq.xp} XP • +${nq.coins} 🪙 • +${nq.gems} 💎</span></div>
          </div>
          <button class="complete-btn" data-action="claim-npc-quest" data-id="${escapeHTML(nq.id)}" ${(!ready || claimed) ? "disabled" : ""}>
            ${claimed ? "Concluída ✓" : ready ? "Entregar!" : `${prog}/${nq.target}`}
          </button>
        </div>
      `;
    }).join("");
  }

  setText("historyCountTag", `${game.questHistory.length} REGISTROS`);
  const histContainer = document.getElementById("questHistoryList");
  if (histContainer) {
    if (!game.questHistory.length) {
      histContainer.innerHTML = `<p class="muted">Nenhuma missão concluída recentemente.</p>`;
    } else {
      histContainer.innerHTML = game.questHistory.slice(0, 15).map(h => `
        <div class="history-row">
          <span>✅ <strong>${escapeHTML(h.name)}</strong> (+${h.xp} XP, +${h.coins} 🪙)</span>
          <small>${escapeHTML(h.date)}</small>
        </div>
      `).join("");
    }
  }

  renderFocusTimer();
  renderConsistencyHeatmap();
}

/* =========================================================
   8. SPRITES 2D AVANÇADOS (16x16), STANDS ESPECTRAIS E CUSTOMIZAÇÃO
========================================================= */

let previewDir = "down";
let previewAnimFrame = 0;
let previewWalking = true;

function shade(hex, percent) {
  if (!hex || typeof hex !== "string" || !hex.startsWith("#") || hex.length !== 7) return hex || "#000000";
  const num = parseInt(hex.slice(1), 16);
  const r = Math.min(255, Math.max(0, (num >> 16) + percent));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00ff) + percent));
  const b = Math.min(255, Math.max(0, (num & 0x0000ff) + percent));
  return "#" + (0x1000000 + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

/* Presets oficiais fiéis aos personagens dos animes */
const ANIME_CHAR_PRESETS = {
  jotaro: {
    name: "Jotaro Kujo",
    hairStyle: "jotaro_cap",
    outfitStyle: "jojo_coat",
    accessoryStyle: "jojo_hat",
    hairColor: "#111827",
    skinColor: "#f1c29b",
    eyeColor: "#14b8a6",
    outfitColor: "#1e1b4b",
    standId: "star_platinum"
  },
  dio: {
    name: "DIO",
    hairStyle: "super_spiky",
    outfitStyle: "cosmic_armor",
    accessoryStyle: "headband",
    hairColor: "#facc15",
    skinColor: "#f5d0b5",
    eyeColor: "#ef4444",
    outfitColor: "#eab308",
    standId: "the_world"
  },
  giorno: {
    name: "Giorno Giovanna",
    hairStyle: "giorno_rolls",
    outfitStyle: "jojo_coat",
    accessoryStyle: "earrings",
    hairColor: "#facc15",
    skinColor: "#f1c29b",
    eyeColor: "#10b981",
    outfitColor: "#db2777",
    standId: "gold_experience"
  },
  goku: {
    name: "Son Goku",
    hairStyle: "spiky",
    outfitStyle: "gi",
    accessoryStyle: "halo",
    hairColor: "#0f172a",
    skinColor: "#f1c29b",
    eyeColor: "#0f172a",
    outfitColor: "#f97316"
  },
  naruto: {
    name: "Naruto Uzumaki",
    hairStyle: "spiky",
    outfitStyle: "ninja",
    accessoryStyle: "headband",
    hairColor: "#facc15",
    skinColor: "#f1c29b",
    eyeColor: "#38bdf8",
    outfitColor: "#f97316"
  },
  luffy: {
    name: "Monkey D. Luffy",
    hairStyle: "messy",
    outfitStyle: "casual",
    accessoryStyle: "strawhat",
    hairColor: "#111827",
    skinColor: "#eab68c",
    eyeColor: "#111827",
    outfitColor: "#dc2626"
  },
  gojo: {
    name: "Satoru Gojo",
    hairStyle: "cursed_fade",
    outfitStyle: "school",
    accessoryStyle: "glasses",
    hairColor: "#f8fafc",
    skinColor: "#f5d0b5",
    eyeColor: "#38bdf8",
    outfitColor: "#0f172a"
  },
  tanjiro: {
    name: "Tanjiro Kamado",
    hairStyle: "messy",
    outfitStyle: "haori",
    accessoryStyle: "earrings",
    hairColor: "#7f1d1d",
    skinColor: "#f1c29b",
    eyeColor: "#991b1b",
    outfitColor: "#10b981"
  },
  ichigo: {
    name: "Ichigo Kurosaki",
    hairStyle: "spiky",
    outfitStyle: "coat",
    accessoryStyle: "mask",
    hairColor: "#f97316",
    skinColor: "#f1c29b",
    eyeColor: "#78350f",
    outfitColor: "#111827"
  },
  sukuna: {
    name: "Ryomen Sukuna",
    hairStyle: "cursed_fade",
    outfitStyle: "gi",
    accessoryStyle: "scarf",
    hairColor: "#fb7185",
    skinColor: "#e5b899",
    eyeColor: "#ef4444",
    outfitColor: "#f8fafc"
  },
  edward: {
    name: "Edward Elric",
    hairStyle: "ponytail",
    outfitStyle: "coat",
    accessoryStyle: "none",
    hairColor: "#facc15",
    skinColor: "#f1c29b",
    eyeColor: "#eab308",
    outfitColor: "#dc2626"
  },
  levi: {
    name: "Capitão Levi",
    hairStyle: "cursed_fade",
    outfitStyle: "coat",
    accessoryStyle: "scarf",
    hairColor: "#111827",
    skinColor: "#f1c29b",
    eyeColor: "#475569",
    outfitColor: "#15803d"
  },
  killua: {
    name: "Killua Zoldyck",
    hairStyle: "spiky",
    outfitStyle: "casual",
    accessoryStyle: "none",
    hairColor: "#e2e8f0",
    skinColor: "#f8fafc",
    eyeColor: "#38bdf8",
    outfitColor: "#312e81"
  }
};

function applyAnimePreset(presetKey) {
  const p = ANIME_CHAR_PRESETS[presetKey];
  if (!p) return;
  game.name = p.name;
  game.hairStyle = p.hairStyle;
  game.outfitStyle = p.outfitStyle;
  game.accessoryStyle = p.accessoryStyle;
  game.hairColor = p.hairColor;
  game.skinColor = p.skinColor;
  game.eyeColor = p.eyeColor;
  game.outfitColor = p.outfitColor;
  if (p.standId) {
    if (!Array.isArray(game.unlockedStands)) game.unlockedStands = [];
    if (!game.unlockedStands.includes(p.standId)) {
      game.unlockedStands.push(p.standId);
    }
    game.equippedStand = p.standId;
  } else {
    game.equippedStand = "none";
  }
  playSFX("levelup");
  saveGame();
  renderAll();
  notify(`🎭 Visual oficial de ${p.name} aplicado com sucesso!`);
}

/* Desenha a manifestação FIEL de cada Stand de JoJo's Bizarre Adventure atrás do personagem */
function drawStandSpirit(ctx, standId, x, y, scale = 4, frame = 0) {
  if (!standId || standId === "none") return;
  const stand = standsCatalog.find(s => s.id === standId);
  if (!stand) return;

  const hoverY = Math.round(Math.sin(frame * 0.65) * 1.5);
  const sx = x - 5 * scale;
  const sy = y - 5 * scale + hoverY * Math.max(1, Math.floor(scale * 0.35));
  const cMain = stand.color || "#a855f7";
  const cDark = shade(cMain, -35);
  const cLight = shade(cMain, 35);
  const cAura = stand.auraColor || "#fbbf24";

  const sp = (gx, gy, w, h, color) => {
    ctx.fillStyle = color;
    ctx.fillRect(sx + gx * scale, sy + gy * scale, w * scale, h * scale);
  };

  ctx.save();
  // Aura flamejante externa do Stand
  ctx.globalAlpha = 0.28 + (frame % 2) * 0.08;
  sp(1, 0, 12, 14, cAura);
  sp(0, 2, 14, 10, cAura);

  ctx.globalAlpha = 0.96;
  // Base de contorno escuro
  sp(2, 1, 10, 12, "#090b10");

  if (standId === "star_platinum") {
    // STAR PLATINUM: Cabelo preto esvoaçante, tiara dourada, pele roxa musculosa, cachecol vermelho e ombreiras douradas
    sp(2, -1, 10, 4, "#090b10");
    sp(3, 0, 8, 3, "#111827"); // cabelo preto longo
    sp(4, -1, 2, 2, "#1e293b");
    sp(8, -1, 2, 2, "#1e293b");
    sp(3, 2, 8, 1, "#fbbf24"); // tiara dourada
    sp(6, 2, 2, 1, "#ef4444"); // joia vermelha na testa
    sp(3, 3, 8, 3, "#9333ea"); // rosto roxo
    sp(4, 4, 2, 1, "#ffffff"); // olhos brancos ferozes
    sp(8, 4, 2, 1, "#ffffff");
    sp(3, 6, 8, 2, "#dc2626"); // cachecol vermelho
    sp(1, 6, 3, 3, "#fbbf24"); // ombreiras douradas
    sp(10, 6, 3, 3, "#fbbf24");
    sp(3, 8, 8, 4, "#7e22ce"); // peitoral roxo
    sp(5, 8, 4, 2, "#fbbf24"); // detalhes dourados no peito
    sp(1, 9, 2, 3, "#f8fafc"); // luvas brancas
    sp(11, 9, 2, 3, "#f8fafc");
  } else if (standId === "the_world") {
    // THE WORLD (ZA WARUDO): Capacete dourado triangular reto no topo, coração verde na testa, olhos vermelhos e cilindros nas costas
    sp(1, 3, 2, 6, "#eab308"); // cilindros de mergulho dourados
    sp(11, 3, 2, 6, "#eab308");
    sp(2, 0, 10, 4, "#090b10");
    sp(2, 1, 10, 3, "#facc15"); // capacete dourado largo
    sp(6, 2, 2, 2, "#22c55e"); // coração verde na testa!
    sp(3, 4, 8, 2, "#94a3b8"); // rosto cinza metálico
    sp(4, 4, 2, 1, "#ef4444"); // olhos vermelhos triangulares
    sp(8, 4, 2, 1, "#ef4444");
    sp(1, 6, 3, 3, "#facc15"); // ombreiras douradas
    sp(10, 6, 3, 3, "#facc15");
    sp(3, 6, 8, 6, "#cbd5e1"); // torso cinza musculoso
    sp(3, 6, 2, 5, "#facc15"); // tiras de armadura douradas em V
    sp(9, 6, 2, 5, "#facc15");
    sp(6, 10, 2, 2, "#22c55e"); // coração verde no cinto
  } else if (standId === "killer_queen") {
    // KILLER QUEEN: Humanoide felino rosa-claro com orelhas pontudas de gato, olhos amarelos e cinto/luvas com caveira dourada
    sp(2, -1, 3, 3, "#090b10"); // orelha esquerda
    sp(9, -1, 3, 3, "#090b10"); // orelha direita
    sp(3, 0, 2, 2, "#f9a8d4");
    sp(9, 0, 2, 2, "#f9a8d4");
    sp(3, 2, 8, 4, "#fbcfe8"); // rosto felino rosa-claro
    sp(4, 3, 2, 1, "#facc15"); // olhos de gato amarelos/vermelhos
    sp(8, 3, 2, 1, "#facc15");
    sp(5, 3, 1, 1, "#dc2626");
    sp(8, 3, 1, 1, "#dc2626");
    sp(3, 6, 8, 5, "#f472b6"); // torso rosa
    sp(1, 6, 2, 3, "#1e1b4b"); // braceletes escuros
    sp(11, 6, 2, 3, "#1e1b4b");
    sp(1, 7, 1, 1, "#fbbf24"); // emblema dourado nos ombros
    sp(12, 7, 1, 1, "#fbbf24");
    sp(3, 10, 8, 2, "#1e1b4b"); // saiote/cinto de couro preto
    sp(6, 10, 2, 2, "#fbbf24"); // caveira dourada no cinto
  } else if (standId === "king_crimson") {
    // KING CRIMSON: Corpo vermelho carmesim com grade diagonal branca/rosa + rosto secundário EPITAPH na testa!
    sp(3, 0, 8, 2, "#fbbf24"); // coroa
    sp(3, 2, 8, 4, "#dc2626"); // cabeça carmesim
    sp(6, 1, 2, 2, "#f472b6"); // EPITAPH (sub-Stand na testa!)
    sp(6, 2, 2, 1, "#4ade80"); // olhos do Epitaph
    sp(4, 4, 2, 1, "#4ade80"); // olhos verdes furiosos do King Crimson
    sp(8, 4, 2, 1, "#4ade80");
    sp(1, 6, 3, 3, "#f8fafc"); // ombreiras brancas
    sp(10, 6, 3, 3, "#f8fafc");
    sp(3, 6, 8, 6, "#b91c1c"); // torso carmesim
    // Padrão xadrez branco/rosa característico do King Crimson
    sp(4, 7, 1, 1, "#fecdd3"); sp(7, 7, 1, 1, "#fecdd3"); sp(9, 7, 1, 1, "#fecdd3");
    sp(5, 9, 1, 1, "#fecdd3"); sp(8, 9, 1, 1, "#fecdd3");
  } else if (standId === "crazy_diamond") {
    // CRAZY DIAMOND: Corpo rosa-choque musculoso + armadura e elmo azul-celeste com corações
    sp(3, 0, 8, 3, "#38bdf8"); // elmo azul-celeste
    sp(6, 0, 2, 2, "#ec4899"); // coração rosa no elmo
    sp(3, 3, 8, 3, "#f472b6"); // rosto rosa
    sp(4, 4, 2, 1, "#bae6fd");
    sp(8, 4, 2, 1, "#bae6fd");
    sp(1, 6, 3, 4, "#38bdf8"); // ombreiras azuis de armadura
    sp(10, 6, 3, 4, "#38bdf8");
    sp(3, 6, 8, 6, "#ec4899"); // peito rosa
    sp(4, 6, 6, 3, "#38bdf8"); // peitoral azul
  } else if (standId === "gold_experience") {
    // GOLD EXPERIENCE: Corpo dourado reluzente com cristas aladas e joaninhas vermelhas
    sp(2, 0, 10, 2, "#fef08a"); // asas/cristas na cabeça
    sp(3, 1, 8, 4, "#facc15");
    sp(4, 3, 2, 1, "#10b981"); // olhos verde-esmeralda
    sp(8, 3, 2, 1, "#10b981");
    sp(1, 6, 3, 3, "#eab308");
    sp(10, 6, 3, 3, "#eab308");
    sp(2, 7, 1, 1, "#e11d48"); // joaninha vermelha no ombro esquerdo
    sp(11, 7, 1, 1, "#e11d48"); // joaninha vermelha no ombro direito
    sp(3, 6, 8, 6, "#facc15");
    sp(6, 7, 2, 2, "#e11d48"); // joaninha central no peito
  } else if (standId === "silver_chariot") {
    // SILVER CHARIOT: Armadura medieval prateada + viseira + florete (rapier)
    sp(3, 0, 8, 5, "#e2e8f0"); // elmo de cavaleiro
    sp(4, 2, 6, 1, "#090b10"); // fenda da viseira
    sp(4, 3, 2, 1, "#38bdf8"); // olhos brilhando na viseira
    sp(8, 3, 2, 1, "#38bdf8");
    sp(1, 6, 3, 3, "#cbd5e1"); // ombreiras metálicas
    sp(10, 6, 3, 3, "#cbd5e1");
    sp(3, 6, 8, 6, "#94a3b8"); // armadura peitoral
    sp(5, 6, 4, 5, "#f8fafc");
    // Florete (Rapier) em punho
    sp(13, 0, 1, 9, "#f8fafc");
    sp(12, 7, 3, 1, "#fbbf24");
  } else if (standId === "stone_free") {
    // STONE FREE: Corpo azul-celeste com óculos escuros futuristas
    sp(3, 1, 8, 4, "#38bdf8");
    sp(3, 2, 8, 2, "#0f172a"); // óculos escuros largos
    sp(4, 2, 2, 1, "#bae6fd"); // reflexo na lente
    sp(8, 2, 2, 1, "#bae6fd");
    sp(4, 0, 1, 1, "#4ade80");
    sp(9, 0, 1, 1, "#4ade80");
    sp(1, 6, 3, 3, "#f472b6");
    sp(10, 6, 3, 3, "#f472b6");
    sp(3, 6, 8, 6, "#0284c7");
  } else if (standId === "sticky_fingers") {
    // STICKY FINGERS: Azul e branco metálico com zíperes dourados nos ombros e capacete com viseira
    sp(2, 0, 10, 4, "#2563eb");
    sp(3, 1, 8, 2, "#f8fafc"); // elmo branco
    sp(4, 3, 2, 1, "#fbbf24"); // olhos dourados
    sp(8, 3, 2, 1, "#fbbf24");
    sp(1, 6, 3, 3, "#fbbf24"); // zíperes dourados nos ombros
    sp(10, 6, 3, 3, "#fbbf24");
    sp(3, 6, 8, 6, "#1d4ed8");
    sp(6, 6, 2, 6, "#f8fafc"); // listra vertical central de zíper
  } else if (standId === "hierophant_green") {
    // HIEROPHANT GREEN: Corpo verde-esmeralda com padrões melão escuros e viseira amarela
    sp(3, 0, 8, 5, "#059669");
    sp(4, 2, 6, 2, "#facc15"); // visor ocular amarelo
    sp(5, 2, 1, 1, "#090b10");
    sp(8, 2, 1, 1, "#090b10");
    sp(1, 6, 3, 3, "#34d399");
    sp(10, 6, 3, 3, "#34d399");
    sp(3, 6, 8, 6, "#10b981");
    sp(4, 7, 2, 2, "#065f46");
    sp(8, 7, 2, 2, "#065f46");
  } else if (standId === "tusk_act4") {
    // TUSK ACT 4: Armadura colosso rosa & branco com ferradura e saia de tiras douradas
    sp(2, 0, 10, 4, "#ec4899");
    sp(5, 0, 4, 2, "#38bdf8"); // elmo com estrela/ferradura azul
    sp(4, 3, 2, 1, "#facc15");
    sp(8, 3, 2, 1, "#facc15");
    sp(0, 6, 4, 4, "#f472b6"); // ombreiras gigantes
    sp(10, 6, 4, 4, "#f472b6");
    sp(3, 6, 8, 6, "#f8fafc");
    sp(3, 10, 8, 2, "#fbbf24"); // saia espiral
  } else if (standId === "made_in_heaven") {
    // MADE IN HEAVEN: Visor de cavaleiro branco/dourado com pluma de velocidade roxa e relógio no rosto
    sp(4, -2, 6, 2, "#a855f7"); // pluma dorsal
    sp(3, 0, 8, 5, "#f8fafc");
    sp(5, 2, 4, 3, "#1e1b4b"); // rosto com mostrador
    sp(6, 3, 2, 1, "#fbbf24"); // ponteiros dourados
    sp(1, 6, 3, 3, "#e2e8f0");
    sp(10, 6, 3, 3, "#e2e8f0");
    sp(3, 6, 8, 6, "#f8fafc");
    sp(4, 7, 6, 4, "#fbbf24"); // armadura peitoral dourada
  } else {
    // ECHOES ACT 3 / OUTROS: Robótico branco e verde-esmeralda
    sp(3, 0, 8, 2, "#10b981");
    sp(3, 2, 8, 3, "#f8fafc");
    sp(4, 3, 2, 1, "#10b981");
    sp(8, 3, 2, 1, "#10b981");
    sp(1, 6, 3, 3, "#10b981");
    sp(10, 6, 3, 3, "#10b981");
    sp(3, 6, 8, 6, "#e2e8f0");
    sp(5, 7, 4, 3, "#10b981");
  }

  // Aura Requiem / Over Heaven para Stands evoluídos (Nv.2 e Nv.3)
  const standEvoLvl = (typeof game !== "undefined" && game.standLevels && game.standLevels[standId]) || 1;
  if (standEvoLvl >= 2) {
    ctx.globalAlpha = 0.7;
    sp(5, -3, 4, 1, standEvoLvl >= 3 ? "#54d9f5" : "#fde047");
    if (standEvoLvl >= 3) {
      sp(-1, 2, 2, 5, "#facc15");
      sp(13, 2, 2, 5, "#facc15");
    }
  }

  // Katakana "ゴ" (Menacing) com contorno preto nítido
  if (scale >= 3) {
    const kFont = Math.max(11, scale * 3);
    ctx.font = `900 ${kFont}px "Chakra Petch", sans-serif`;
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#090b10";
    ctx.fillStyle = cAura;
    const ky = sy + ((frame % 2) * 2);
    ctx.strokeText("ゴ", sx - 3 * scale, ky + 3 * scale);
    ctx.fillText("ゴ", sx - 3 * scale, ky + 3 * scale);
    if (scale >= 4) {
      ctx.strokeText("ゴ", sx + 12 * scale, ky + 1 * scale);
      ctx.fillText("ゴ", sx + 12 * scale, ky + 1 * scale);
    }
  }

  ctx.restore();
}

function drawSprite(ctx, look, x, y, scale = 4, options = {}) {
  const frame = options.frame || 0;
  const dir = options.dir || "down";
  const moving = Boolean(options.moving);
  const auraColor = options.auraColor || null;
  const hasSword = Boolean(options.hasSword || look.visualWeapon);
  const standId = options.standId || look.standId || null;

  // Se possuir Stand ativo, desenha o espírito fiel atrás do personagem
  if (standId && standId !== "none") {
    drawStandSpirit(ctx, standId, x, y, scale, frame);
  }

  const p = (gx, gy, w, h, color) => {
    ctx.fillStyle = color;
    ctx.fillRect(x + gx * scale, y + gy * scale, w * scale, h * scale);
  };

  const bob = moving ? (frame % 2 === 0 ? 0 : -1) : 0;
  const stepLeft = moving && frame % 4 === 1 ? -1 : 0;
  const stepRight = moving && frame % 4 === 3 ? -1 : 0;

  const outline = "#090b10";
  const hair = look.hairColor || "#29213e";
  const hairDark = shade(hair, -34);
  const hairLight = shade(hair, 42);
  const skin = look.skinColor || "#f1c29b";
  const skinShadow = shade(skin, -24);
  const eyes = look.eyeColor || "#38bdf8";
  const eyesDark = shade(eyes, -35);
  const outfit = look.outfitColor || "#e11d48";
  const outfitDark = shade(outfit, -36);
  const outfitLight = shade(outfit, 30);

  // Aura de Poder / Ki sob e ao redor do personagem
  if (auraColor) {
    ctx.save();
    ctx.fillStyle = auraColor;
    ctx.globalAlpha = 0.22 + (frame % 2) * 0.08;
    ctx.beginPath();
    ctx.arc(x + 8 * scale, y + 8 * scale, 8.5 * scale, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // Sombra elíptica estilo Pokémon GBA / Stardew Valley
  ctx.save();
  ctx.fillStyle = "rgba(0,0,0,0.38)";
  ctx.beginPath();
  ctx.ellipse(x + 8 * scale, y + 15 * scale, 5.5 * scale, 1.8 * scale, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Capa traseira com contorno
  if (look.accessoryStyle === "cape" || look.accessoryStyle === "energy_cape") {
    const capeMain = look.accessoryStyle === "energy_cape" ? "#4c1d95" : "#b91c1c";
    const capeDark = look.accessoryStyle === "energy_cape" ? "#312e81" : "#991b1b";
    p(2, 6 + bob, 12, 8, outline);
    p(3, 6 + bob, 10, 7, capeMain);
    p(4, 7 + bob, 8, 5, capeDark);
    if (look.accessoryStyle === "energy_cape") {
      p(3, 12 + bob, 10, 1, "#38bdf8");
    }
  }

  // Pés/Botas arredondados Chibi GBA
  p(4, 12 + stepLeft, 3, 3, outline);
  p(9, 12 + stepRight, 3, 3, outline);
  p(5, 12 + stepLeft, 2, 2, "#1e293b");
  p(9, 12 + stepRight, 2, 2, "#1e293b");
  p(5, 13 + stepLeft, 2, 1, "#fbbf24");
  p(9, 13 + stepRight, 2, 1, "#fbbf24");

  // Contorno do Torso Chibi
  p(3, 7 + bob, 10, 6, outline);
  p(2, 7 + bob, 12, 4, outline);

  // Modelos de Roupa Fiéis aos Animes (10 estilos)
  p(4, 7 + bob, 8, 5, outfit);
  p(4, 10 + bob, 8, 2, outfitDark);
  p(4, 10 + bob, 8, 1, "#1e293b");
  p(7, 10 + bob, 2, 1, "#fbbf24");

  if (look.outfitStyle === "gi") {
    // Gi do Goku / Lutador: Laranja com camisa interna azul e faixa azul
    p(6, 7 + bob, 4, 2, "#1d4ed8");
    p(4, 10 + bob, 8, 1, "#1d4ed8");
    p(3, 9 + bob, 1, 1, "#1d4ed8");
    p(12, 9 + bob, 1, 1, "#1d4ed8");
  } else if (look.outfitStyle === "ninja") {
    // Jaqueta Naruto (Laranja com gola/ombros pretos e espiral) ou Colete Jonin
    p(4, 7 + bob, 8, 1, "#111827");
    p(6, 8 + bob, 4, 2, outfitLight);
    p(7, 8 + bob, 2, 2, "#ffffff");
  } else if (look.outfitStyle === "haori") {
    // Haori Xadrez Verde e Preto fiel ao Tanjiro Kamado!
    p(4, 7 + bob, 8, 5, "#111827");
    p(4, 7 + bob, 2, 2, "#10b981");
    p(4, 10 + bob, 2, 2, "#10b981");
    p(10, 7 + bob, 2, 2, "#10b981");
    p(10, 10 + bob, 2, 2, "#10b981");
    p(6, 7 + bob, 4, 1, "#ffffff");
  } else if (look.outfitStyle === "coat") {
    // Shihakusho Shinigami (Ichigo / Byakuya) com faixa vermelha no peito
    p(4, 7 + bob, 8, 5, "#0f172a");
    p(6, 7 + bob, 4, 1, "#ffffff");
    p(5, 8 + bob, 6, 1, "#dc2626");
  } else if (look.outfitStyle === "casual") {
    // Colete Vermelho aberto do Luffy com cicatriz em X no peito e faixa amarela
    p(4, 7 + bob, 8, 5, "#dc2626");
    p(6, 7 + bob, 4, 3, skin);
    p(7, 8 + bob, 2, 2, "#b91c1c"); // cicatriz em X
    p(4, 10 + bob, 8, 1, "#facc15"); // faixa amarela do Luffy
  } else if (look.outfitStyle === "school") {
    // Uniforme Jujutsu (Gojo / Yuji) azul-marinho escuro com botões dourados
    p(4, 7 + bob, 8, 5, "#0f172a");
    p(5, 7 + bob, 6, 1, "#dc2626"); // capuz vermelho Yuji / gola alta Gojo
    p(7, 8 + bob, 1, 1, "#fbbf24");
    p(7, 10 + bob, 1, 1, "#fbbf24");
  } else if (look.outfitStyle === "jojo_coat") {
    // Sobretudo do Jotaro (com corrente dourada) ou Traje do Giorno
    p(3, 7 + bob, 10, 5, outfitDark);
    p(5, 7 + bob, 6, 5, outfit);
    p(4, 7 + bob, 2, 2, "#fbbf24"); // corrente de ouro Jotaro
    p(6, 7 + bob, 4, 2, skin); // abertura no peito Giorno/JoJo
  } else if (look.outfitStyle === "akatsuki") {
    // Manto Akatsuki preto com Nuvens Vermelhas bordadas de branco (Pain / Itachi)
    p(3, 7 + bob, 10, 5, "#090d16");
    p(5, 8 + bob, 3, 2, "#ffffff");
    p(5, 8 + bob, 2, 2, "#ef4444");
    p(9, 10 + bob, 3, 2, "#ffffff");
    p(9, 10 + bob, 2, 2, "#ef4444");
  } else if (look.outfitStyle === "cosmic_armor") {
    // Traje Dourado do DIO com ombreiras e corações verdes!
    p(3, 6 + bob, 10, 2, "#facc15");
    p(4, 8 + bob, 8, 4, "#eab308");
    p(6, 7 + bob, 4, 3, "#111827");
    p(7, 10 + bob, 2, 2, "#22c55e"); // coração verde do DIO
  } else if (look.outfitStyle === "survey_cloak") {
    // Capa Verde Tropa de Exploração (Attack on Titan) com botas marrons e correias
    p(3, 7 + bob, 10, 5, "#15803d");
    p(5, 7 + bob, 6, 5, "#d6d3d1");
    p(6, 8 + bob, 4, 3, "#78350f");
    p(7, 7 + bob, 2, 2, "#f8fafc");
  } else if (look.outfitStyle === "alchemist_coat") {
    // Sobretudo Vermelho Alquimista Estatal (Edward Elric)
    p(3, 7 + bob, 10, 5, "#b91c1c");
    p(5, 7 + bob, 6, 5, "#111827");
    p(6, 7 + bob, 4, 1, "#f8fafc");
  } else if (look.outfitStyle === "hunter_vest") {
    // Traje Hunter (Killua / Gon) com gola alta
    p(4, 7 + bob, 8, 5, "#312e81");
    p(5, 7 + bob, 6, 3, "#f8fafc");
    p(4, 10 + bob, 8, 2, "#1e1b4b");
  } else if (look.outfitStyle === "monarch_cloak") {
    // Sobretudo Monarca das Sombras com detalhes neon ciano
    p(3, 6 + bob, 10, 6, "#090d16");
    p(5, 7 + bob, 6, 5, "#1e1b4b");
    p(4, 7 + bob, 1, 5, "#38bdf8");
    p(11, 7 + bob, 1, 5, "#38bdf8");
  } else {
    p(6, 7 + bob, 4, 3, outfitLight);
    p(7, 7 + bob, 2, 1, "#f8fafc");
  }

  // Braços e Mãos Chibi
  p(3, 7 + bob, 1, 2, outfitDark);
  p(12, 7 + bob, 1, 2, outfitDark);
  p(3, 9 + bob, 1, 2, skin);
  p(12, 9 + bob, 1, 2, skin);

  // Espada / Katana Nichirin / Zangetsu detalhada
  if (hasSword) {
    p(13, 1 + bob, 3, 9, outline);
    p(14, 2 + bob, 1, 6, "#e2e8f0");
    p(14, 2 + bob, 1, 2, "#ffffff");
    p(13, 8 + bob, 3, 1, "#fbbf24");
    p(14, 9 + bob, 1, 2, "#991b1b");
  }

  // Cabeça Arredondada Chibi GBA (Com contorno de 1px nos cantos para não ficar quadrada!)
  p(4, 0 + bob, 8, 1, outline);
  p(3, 1 + bob, 10, 5, outline);
  p(4, 6 + bob, 8, 1, outline);
  p(4, 2 + bob, 8, 4, skin);
  p(5, 6 + bob, 6, 1, skinShadow);

  // Olhos Estilo Pokémon GBA / Anime Chibi + Detalhes Faciais dos Animes
  const style = look.hairStyle || "spiky";
  if (dir !== "up") {
    if (dir === "left") {
      p(4, 4 + bob, 1, 2, outline);
      p(5, 4 + bob, 1, 1, "#ffffff");
      p(5, 5 + bob, 1, 1, eyes);
      p(7, 4 + bob, 1, 2, outline);
      p(8, 4 + bob, 1, 1, "#ffffff");
      p(8, 5 + bob, 1, 1, eyes);
    } else if (dir === "right") {
      p(7, 4 + bob, 1, 1, "#ffffff");
      p(7, 5 + bob, 1, 1, eyes);
      p(8, 4 + bob, 1, 2, outline);
      p(10, 4 + bob, 1, 1, "#ffffff");
      p(10, 5 + bob, 1, 1, eyes);
      p(11, 4 + bob, 1, 2, outline);
    } else {
      // Olhos frontais grandes e expressivos com brilho branco no canto superior
      p(5, 4 + bob, 2, 2, outline);
      p(5, 4 + bob, 1, 1, "#ffffff");
      p(6, 5 + bob, 1, 1, eyes);

      p(9, 4 + bob, 2, 2, outline);
      p(9, 4 + bob, 1, 1, "#ffffff");
      p(10, 5 + bob, 1, 1, eyes);

      // Detalhes faciais específicos (Bigodes do Naruto / Marcas do Sukuna / Cicatriz do Tanjiro)
      if (look.outfitStyle === "ninja" && look.accessoryStyle === "headband") {
        p(4, 5 + bob, 1, 1, "#92400e"); // risquinhos de raposa do Naruto
        p(11, 5 + bob, 1, 1, "#92400e");
      } else if (style === "cursed_fade") {
        p(4, 5 + bob, 1, 1, "#991b1b"); // marcas de maldição / 4 olhos do Sukuna
        p(11, 5 + bob, 1, 1, "#991b1b");
      } else if (look.outfitStyle === "haori") {
        p(4, 2 + bob, 2, 1, "#991b1b"); // cicatriz de Respiração do Sol do Tanjiro
      }
    }
  }

  // Penteados de Anime com Volume Arredondado GBA e Brilho
  p(4, 1 + bob, 8, 2, hair);
  p(5, 1 + bob, 6, 1, hairLight);

  if (dir === "up") {
    p(3, 1 + bob, 10, 6, outline);
    p(4, 1 + bob, 8, 5, hair);
    p(5, 2 + bob, 6, 1, hairLight);
    p(4, 5 + bob, 8, 1, hairDark);
  } else {
    if (style === "spiky") {
      // Cabelo espetado clássico (Goku / Naruto / Ichigo) com pontas laterais
      p(2, 0 + bob, 3, 3, outline);
      p(6, -1 + bob, 4, 2, outline);
      p(11, 0 + bob, 3, 3, outline);
      p(2, 1 + bob, 2, 2, hair);
      p(7, 0 + bob, 2, 2, hair);
      p(12, 1 + bob, 2, 2, hair);
      p(3, 2 + bob, 1, 2, hairDark);
      p(12, 2 + bob, 1, 2, hairDark);
    } else if (style === "super_spiky") {
      // Super Saiyajin / DIO: Crina dourada erguida
      p(1, -2 + bob, 14, 4, outline);
      p(2, -1 + bob, 3, 3, hair);
      p(6, -2 + bob, 4, 3, hair);
      p(7, -1 + bob, 2, 2, hairLight);
      p(11, -1 + bob, 3, 3, hair);
      p(3, 2 + bob, 1, 3, hairDark);
      p(12, 2 + bob, 1, 3, hairDark);
    } else if (style === "pompadour") {
      // Topete Josuke Higashikata
      p(1, -1 + bob, 12, 4, outline);
      p(2, 0 + bob, 10, 3, hair);
      p(1, 0 + bob, 4, 2, hairDark);
      p(4, 0 + bob, 5, 1, hairLight);
    } else if (style === "jotaro_cap") {
      // Quepe do Jotaro Kujo fundido ao cabelo com insígnia dourada
      p(2, -1 + bob, 12, 4, outline);
      p(3, 0 + bob, 10, 2, "#1e1b4b");
      p(2, 2 + bob, 8, 1, "#090d16");
      p(6, 0 + bob, 2, 2, "#fbbf24");
      p(10, 0 + bob, 2, 2, "#111827");
    } else if (style === "giorno_rolls") {
      // 3 Rolos/Cachos frontais do Giorno Giovanna
      p(3, -1 + bob, 10, 3, outline);
      p(4, 0 + bob, 2, 2, "#facc15");
      p(7, 0 + bob, 2, 2, "#facc15");
      p(10, 0 + bob, 2, 2, "#facc15");
      p(5, 0 + bob, 1, 1, "#fef08a");
      p(8, 0 + bob, 1, 1, "#fef08a");
      p(11, 3 + bob, 2, 5, hair);
    } else if (style === "bowl") {
      p(3, 0 + bob, 10, 3, hair);
      p(4, 1 + bob, 8, 1, hairLight);
      p(4, 3 + bob, 8, 1, hairDark);
    } else if (style === "cursed_fade") {
      p(3, 0 + bob, 10, 2, hair);
      p(5, 2 + bob, 2, 2, hair);
      p(9, 2 + bob, 2, 2, hair);
    } else if (style === "long") {
      p(2, 1 + bob, 2, 8, outline);
      p(12, 1 + bob, 2, 8, outline);
      p(3, 1 + bob, 1, 8, hair);
      p(12, 1 + bob, 1, 8, hair);
      p(4, 0 + bob, 8, 2, hairDark);
    } else if (style === "short") {
      p(4, 1 + bob, 8, 2, hairDark);
      p(5, 1 + bob, 6, 1, hairLight);
      p(3, 2 + bob, 1, 2, hair);
      p(12, 2 + bob, 1, 2, hair);
    } else if (style === "messy") {
      p(2, 1 + bob, 2, 2, hair);
      p(6, 0 + bob, 4, 2, hair);
      p(12, 1 + bob, 2, 2, hair);
      p(4, 2 + bob, 2, 2, hairDark);
      p(10, 2 + bob, 2, 2, hairDark);
    } else if (style === "ponytail") {
      p(4, 1 + bob, 8, 2, hair);
      p(12, 2 + bob, 3, 6, outline);
      p(12, 2 + bob, 2, 5, hairDark);
      p(13, 4 + bob, 2, 4, hair);
    } else if (style === "twin") {
      p(1, 2 + bob, 3, 7, outline);
      p(12, 2 + bob, 3, 7, outline);
      p(2, 2 + bob, 2, 6, hair);
      p(12, 2 + bob, 2, 6, hair);
      p(4, 1 + bob, 8, 2, hairDark);
    } else if (style === "levi_undercut") {
      // Corte Undercut repartido ao meio estilo Levi Ackerman
      p(3, 0 + bob, 10, 3, outline);
      p(4, 1 + bob, 8, 2, hair);
      p(4, 2 + bob, 3, 2, hairDark);
      p(9, 2 + bob, 3, 2, hairDark);
    } else if (style === "dual_color") {
      // Cabelo Bicolor (Metade cor principal / Metade branco neve)
      p(3, 0 + bob, 5, 3, "#f8fafc");
      p(8, 0 + bob, 5, 3, hair);
      p(4, 2 + bob, 2, 2, "#e2e8f0");
      p(10, 2 + bob, 2, 2, hairDark);
    } else if (style === "braid_alchemy") {
      // Antena central dourada e trança lateral (Edward Elric)
      p(6, -2 + bob, 2, 2, hair);
      p(3, 1 + bob, 10, 2, hair);
      p(12, 3 + bob, 2, 7, hairDark);
    } else if (style === "killua_fluffy") {
      // Cabelo arrepiado macio lateral (Killua Zoldyck)
      p(2, 0 + bob, 12, 3, hair);
      p(1, 2 + bob, 2, 3, hairDark);
      p(13, 2 + bob, 2, 3, hairDark);
      p(5, 2 + bob, 2, 2, hair);
      p(9, 2 + bob, 2, 2, hair);
    }
  }

  // Acessórios Fiéis aos Animes (14 opções)
  if (look.accessoryStyle === "headband") {
    if (look.outfitStyle === "cosmic_armor") {
      // Tiara de Coração Verde do DIO!
      p(4, 2 + bob, 8, 1, "#22c55e");
      p(7, 1 + bob, 2, 2, "#4ade80");
    } else {
      // Bandana Ninja de Konoha (Naruto)
      p(4, 2 + bob, 8, 1, "#1e3a8a");
      p(6, 2 + bob, 4, 1, "#e2e8f0");
    }
  } else if (look.accessoryStyle === "strawhat") {
    // Chapéu de Palha do Luffy com Fita Vermelha
    p(1, 0 + bob, 14, 2, outline);
    p(2, 1 + bob, 12, 1, "#facc15");
    p(4, 0 + bob, 8, 1, "#fde047");
    p(4, 1 + bob, 8, 1, "#dc2626");
  } else if (look.accessoryStyle === "jojo_hat") {
    p(2, -1 + bob, 12, 3, outline);
    p(3, 0 + bob, 10, 2, "#1e1b4b");
    p(5, 0 + bob, 3, 2, "#fbbf24");
  } else if (look.accessoryStyle === "glasses" && dir !== "up") {
    // Venda Preta / Óculos dos Seis Olhos de Satoru Gojo
    p(4, 3 + bob, 8, 2, "#090d16");
    p(5, 4 + bob, 2, 1, "#38bdf8");
    p(9, 4 + bob, 2, 1, "#38bdf8");
  } else if (look.accessoryStyle === "cursed_blindfold" && dir !== "up") {
    // Venda Oficial Jujutsu Preta
    p(4, 3 + bob, 8, 2, "#090d16");
    p(3, 4 + bob, 10, 1, "#1e1b4b");
  } else if (look.accessoryStyle === "anbu_mask" && dir !== "up") {
    // Máscara de Raposa ANBU Branca com orelhas
    p(4, 2 + bob, 8, 4, "#f8fafc");
    p(4, 2 + bob, 2, 1, "#ef4444");
    p(10, 2 + bob, 2, 1, "#ef4444");
    p(5, 4 + bob, 2, 1, "#090d16");
    p(9, 4 + bob, 2, 1, "#090d16");
  } else if (look.accessoryStyle === "demon_horns") {
    // Chifres Oni / Kaidou curvos dourados/carmesim
    p(2, -2 + bob, 2, 3, "#f8fafc");
    p(1, -2 + bob, 1, 2, "#dc2626");
    p(12, -2 + bob, 2, 3, "#f8fafc");
    p(14, -2 + bob, 1, 2, "#dc2626");
  } else if (look.accessoryStyle === "earrings" && dir !== "up") {
    // Brincos Hanafuda do Tanjiro (Brancos com Sol Vermelho)
    p(3, 5 + bob, 1, 2, "#ffffff");
    p(3, 5 + bob, 1, 1, "#ef4444");
    p(12, 5 + bob, 1, 2, "#ffffff");
    p(12, 5 + bob, 1, 1, "#ef4444");
  } else if (look.accessoryStyle === "scarf") {
    p(3, 6 + bob, 10, 2, "#be123c");
    p(10, 7 + bob, 2, 3, "#e11d48");
  } else if (look.accessoryStyle === "mask" && dir !== "up") {
    // Máscara Hollow de Ichigo (Branca com Listras Vermelhas)
    p(4, 2 + bob, 4, 4, "#f8fafc");
    p(5, 2 + bob, 1, 4, "#dc2626");
    p(5, 4 + bob, 2, 1, "#facc15");
  } else if (look.accessoryStyle === "halo") {
    // Auréola do Outro Mundo (Goku)
    p(4, -2 + bob, 8, 1, "#fde047");
    p(5, -3 + bob, 6, 1, "#ffffff");
  }
}

function drawMountSprite(ctx, mountId, x, y, scale = 3, frame = 0) {
  if (!mountId || mountId === "none") return;
  const m = mountsCatalog.find(mt => mt.id === mountId);
  if (!m) return;
  const bob = frame % 2 === 0 ? 0 : -2;
  ctx.save();
  ctx.fillStyle = "rgba(0,0,0,0.35)";
  ctx.beginPath();
  ctx.ellipse(x + 8 * scale, y + 14.5 * scale, 7 * scale, 2.4 * scale, 0, 0, Math.PI * 2);
  ctx.fill();

  if (mountId === "kintoun") {
    // Nuvem Voadora Dourada fofa
    ctx.fillStyle = "#ca8a04";
    ctx.fillRect(x + 1 * scale, y + 11 * scale + bob, 14 * scale, 4 * scale);
    ctx.fillStyle = "#fde047";
    ctx.fillRect(x + 2 * scale, y + 10 * scale + bob, 12 * scale, 4 * scale);
    ctx.fillRect(x + 4 * scale, y + 9 * scale + bob, 8 * scale, 2 * scale);
  } else if (mountId === "shibuya_bike") {
    // Moto Tática com rodas negras e farol ciano
    ctx.fillStyle = "#090b10";
    ctx.fillRect(x + 1 * scale, y + 11 * scale, 4 * scale, 4 * scale);
    ctx.fillRect(x + 11 * scale, y + 11 * scale, 4 * scale, 4 * scale);
    ctx.fillStyle = "#dc2626";
    ctx.fillRect(x + 3 * scale, y + 9 * scale + bob, 10 * scale, 3 * scale);
    ctx.fillStyle = "#38bdf8";
    ctx.fillRect(x + 12 * scale, y + 9 * scale + bob, 2 * scale, 1.5 * scale);
  } else if (mountId === "shenlong_flight" || mountId === "igris_steed") {
    const bodyC = mountId === "shenlong_flight" ? "#10b981" : "#4f46e5";
    const lightC = mountId === "shenlong_flight" ? "#fbbf24" : "#38bdf8";
    ctx.fillStyle = "#090b10";
    ctx.fillRect(x + 0 * scale, y + 9 * scale + bob, 16 * scale, 5 * scale);
    ctx.fillStyle = bodyC;
    ctx.fillRect(x + 1 * scale, y + 10 * scale + bob, 14 * scale, 3.5 * scale);
    ctx.fillStyle = lightC;
    ctx.fillRect(x + 2 * scale, y + 8 * scale + bob, 3 * scale, 2 * scale);
    ctx.fillRect(x + 11 * scale, y + 8 * scale + bob, 3 * scale, 2 * scale);
  } else {
    // Cão Ninken / DMT
    ctx.fillStyle = "#090b10";
    ctx.fillRect(x + 2 * scale, y + 10 * scale + bob, 12 * scale, 4.5 * scale);
    ctx.fillStyle = m.color || "#d97706";
    ctx.fillRect(x + 3 * scale, y + 10.5 * scale + bob, 10 * scale, 3 * scale);
  }
  ctx.restore();
}

function drawCompanionSprite(ctx, companionId, x, y, scale = 3, frame = 0) {
  if (!companionId || companionId === "none") return;
  const pet = companionsCatalog.find(c => c.id === companionId);
  if (!pet) return;
  const bob = frame % 2 === 0 ? 0 : -2;
  const cMain = pet.color || "#f97316";
  ctx.save();
  // Sombra
  ctx.fillStyle = "rgba(0,0,0,0.4)";
  ctx.fillRect(x + 2 * scale, y + 9 * scale, 6 * scale, 1.5 * scale);

  // Contorno escuro do pet
  ctx.fillStyle = "#090b10";
  ctx.fillRect(x + 1 * scale, y + 2 * scale + bob, 8 * scale, 7 * scale);
  ctx.fillRect(x + 0 * scale, y + 0 * scale + bob, 3 * scale, 3 * scale);
  ctx.fillRect(x + 7 * scale, y + 0 * scale + bob, 3 * scale, 3 * scale);

  // Corpo e orelhas
  ctx.fillStyle = cMain;
  ctx.fillRect(x + 2 * scale, y + 3 * scale + bob, 6 * scale, 5 * scale);
  ctx.fillRect(x + 1 * scale, y + 1 * scale + bob, 2 * scale, 2 * scale);
  ctx.fillRect(x + 7 * scale, y + 1 * scale + bob, 2 * scale, 2 * scale);

  // Barriga clara e olhos brilhantes
  ctx.fillStyle = shade(cMain, 45);
  ctx.fillRect(x + 3 * scale, y + 6 * scale + bob, 4 * scale, 2 * scale);
  ctx.fillStyle = "#090b10";
  ctx.fillRect(x + 3 * scale, y + 4 * scale + bob, 1.5 * scale, 1.5 * scale);
  ctx.fillRect(x + 6 * scale, y + 4 * scale + bob, 1.5 * scale, 1.5 * scale);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(x + 3 * scale, y + 4 * scale + bob, 0.8 * scale, 0.8 * scale);
  ctx.fillRect(x + 6 * scale, y + 4 * scale + bob, 0.8 * scale, 0.8 * scale);
  ctx.restore();
}

function getGameLook() {
  return {
    hairStyle: game.hairStyle,
    outfitStyle: game.outfitStyle,
    accessoryStyle: game.accessoryStyle,
    hairColor: game.hairColor,
    skinColor: game.skinColor,
    eyeColor: game.eyeColor,
    outfitColor: game.outfitColor,
    standId: game.equippedStand
  };
}

function getFormLook() {
  return {
    hairStyle: sanitizeHairStyle(document.getElementById("hairStyle")?.value || game.hairStyle),
    outfitStyle: sanitizeOutfitStyle(document.getElementById("outfitStyle")?.value || game.outfitStyle),
    accessoryStyle: sanitizeAccessoryStyle(document.getElementById("accessoryStyle")?.value || game.accessoryStyle),
    hairColor: sanitizeColor(document.getElementById("hairColor")?.value, game.hairColor),
    skinColor: sanitizeColor(document.getElementById("skinColor")?.value, game.skinColor),
    eyeColor: sanitizeColor(document.getElementById("eyeColor")?.value, game.eyeColor),
    outfitColor: sanitizeColor(document.getElementById("outfitColor")?.value, game.outfitColor),
    standId: document.getElementById("characterStandSelect")?.value || game.equippedStand,
    auraStyle: document.getElementById("activeAuraStyleSelect")?.value || game.activeAuraStyle || "auto"
  };
}

function drawAvatarCanvas(canvasId, look, options = {}) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const W = canvas.width;
  const H = canvas.height;
  ctx.clearRect(0, 0, W, H);

  // Fundo estilo Pedestal de Personagem JRPG
  const grad = ctx.createRadialGradient(W / 2, H * 0.55, 4, W / 2, H / 2, W * 0.72);
  grad.addColorStop(0, "#1e293b");
  grad.addColorStop(0.65, "#0f172a");
  grad.addColorStop(1, "#070a10");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // Plataforma / Círculo Mágico sob os pés do personagem
  if (W >= 90) {
    ctx.save();
    ctx.fillStyle = "#1e293b";
    ctx.beginPath();
    ctx.ellipse(W / 2, H * 0.82, W * 0.34, H * 0.09, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "rgba(251, 191, 36, 0.55)";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();
  }

  const scale = Math.max(2, Math.floor(W / 20));
  const spriteX = Math.floor((W - 16 * scale) / 2);
  const spriteY = Math.floor((H - 16 * scale) / 2) + 2;

  const cls = getActiveClassObj();
  if (options.showMount !== false && game.equippedMount && game.equippedMount !== "none" && W >= 140) {
    drawMountSprite(ctx, game.equippedMount, spriteX, spriteY + Math.floor(scale * 1.5), scale, options.frame || 0);
  }
  const auraChoice = look.auraStyle && look.auraStyle !== "auto" ? look.auraStyle : null;
  drawSprite(ctx, look, spriteX, spriteY, scale, {
    frame: options.frame || 0,
    dir: options.dir || "down",
    moving: Boolean(options.moving),
    auraColor: auraChoice || (game.equippedSkills.length > 0 ? (cls ? cls.ultColor : "#fbbf24") : null),
    hasSword: Boolean(game.equippedItems.weapon),
    standId: options.showStand !== false ? (look.standId || game.equippedStand) : null
  });

  if (options.showPet !== false && game.companion && game.companion !== "none" && W >= 120) {
    drawCompanionSprite(ctx, game.companion, spriteX - 14, spriteY + 20, Math.max(2, Math.floor(scale * 0.5)), options.frame || 0);
  }
}

function renderCharacter() {
  const setVal = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.value = val;
  };

  setVal("characterName", game.name);
  setVal("hairStyle", game.hairStyle);
  setVal("outfitStyle", game.outfitStyle);
  setVal("accessoryStyle", game.accessoryStyle);
  setVal("hairColor", game.hairColor);
  setVal("skinColor", game.skinColor);
  setVal("eyeColor", game.eyeColor);
  setVal("outfitColor", game.outfitColor);
  setVal("activeAuraStyleSelect", game.activeAuraStyle || "auto");

  const classSelect = document.getElementById("characterClassSelect");
  if (classSelect) {
    classSelect.innerHTML = classesCatalog.map(c => {
      const unlocked = (game.unlockedClasses || []).includes(c.id) || game.level >= (c.minLevel || 1);
      const rm = getRarityMeta(c.rarity);
      return `<option value="${escapeHTML(c.id)}" ${!unlocked ? "disabled" : ""}>[${escapeHTML(rm.label)}] ${escapeHTML(c.name)} ${!unlocked ? "(Roleta)" : `— ${escapeHTML(c.ultName)}`}</option>`;
    }).join("");
    classSelect.value = game.charClass || "adventurer";
  }

  const standSelect = document.getElementById("characterStandSelect");
  if (standSelect) {
    standSelect.innerHTML = standsCatalog.map(st => {
      const unlocked = st.id === "none" || (game.unlockedStands || []).includes(st.id);
      const rm = getRarityMeta(st.rarity);
      return `<option value="${escapeHTML(st.id)}" ${!unlocked ? "disabled" : ""}>${st.icon} ${escapeHTML(st.name)} ${st.id !== "none" ? `[${escapeHTML(rm.label)}]` : ""} ${!unlocked ? "(Bloqueado)" : ""}</option>`;
    }).join("");
    standSelect.value = game.equippedStand || "none";
  }

  const clsObj = getActiveClassObj();
  const standObj = getActiveStandObj();
  const classHint = document.getElementById("classDetailHint");
  if (classHint && clsObj) {
    classHint.textContent = `Classe: ${clsObj.passiveText} | Stand: ${standObj.id !== "none" ? `${standObj.name} (${standObj.abilityName})` : "Nenhum Stand equipado"}`;
  }

  const titleSelect = document.getElementById("characterTitle");
  if (titleSelect) {
    const unlockedTitles = titlesCatalog.filter(t => t.check(game));
    titleSelect.innerHTML = unlockedTitles.map(t =>
      `<option value="${escapeHTML(t.id)}">${escapeHTML(t.name)} (${escapeHTML(t.reqText)})</option>`
    ).join("");
    titleSelect.value = unlockedTitles.some(t => t.id === game.title) ? game.title : "novice";
  }

  const compSelect = document.getElementById("characterCompanion");
  if (compSelect) {
    const unlockedPets = companionsCatalog.filter(c => c.unlocked(game));
    compSelect.innerHTML = unlockedPets.map(c =>
      `<option value="${escapeHTML(c.id)}">${c.icon} ${escapeHTML(c.name)} (${escapeHTML(c.bonusText)})</option>`
    ).join("");
    compSelect.value = unlockedPets.some(c => c.id === game.companion) ? game.companion : "fox";
  }

  const compUpBox = document.getElementById("companionUpgradeBox");
  if (compUpBox) {
    const pet = companionsCatalog.find(c => c.id === game.companion);
    if (!pet || pet.id === "none") {
      compUpBox.innerHTML = `<span>🐾 Selecione um Companheiro para ativar assistência em combate e evolução!</span>`;
    } else {
      const pLvl = (game.companionLevels && game.companionLevels[pet.id]) || 1;
      const cost = 70 * pLvl;
      compUpBox.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;width:100%;">
          <span>${pet.icon} <strong>${escapeHTML(pet.name)}</strong> (Nv.${pLvl}/5) • <small>${escapeHTML(pet.combatDesc || pet.bonusText)}</small></span>
          ${pLvl < 5 ? `<button type="button" class="secondary-btn" style="padding:5px 10px;font-size:12px;" data-action="upgrade-companion" data-id="${escapeHTML(pet.id)}">⬆ Evoluir (${cost} 🪙)</button>` : `<span class="rarity-badge rarity-legendary">Nv. Máx ★</span>`}
        </div>
      `;
    }
  }

  const totals = getTotalStats();
  const attrList = document.getElementById("attributesList");
  if (attrList) {
    const rows = [
      { key: "atk", name: "⚔️ Ataque (ATK)", desc: "Aumenta o dano físico, de Habilidades e Stand", val: totals.atk },
      { key: "def", name: "🛡️ Defesa (DEF)", desc: "Reduz o dano sofrido em batalhas", val: totals.def },
      { key: "hp", name: "❤️ Vida Máxima (HP)", desc: "Resistência total em combate (+20 por ponto)", val: totals.maxHp },
      { key: "mp", name: "💧 Energia Máxima (EN)", desc: "Reserva para técnicas e Stand (+10 por ponto)", val: totals.maxMp },
      { key: "spd", name: "💨 Agilidade (SPD)", desc: `Chance de esquiva e Crítico (${totals.crit}%)`, val: totals.spd }
    ];
    attrList.innerHTML = rows.map(r => `
      <div class="attr-row">
        <div class="attr-row-info">
          <strong>${r.name}</strong>
          <small>${r.desc}</small>
        </div>
        <div class="attr-row-val">
          <span>${r.val}</span>
          <button class="attr-plus-btn" data-action="alloc-stat" data-id="${r.key}" ${game.statPoints <= 0 ? "disabled" : ""} title="Adicionar ponto">+</button>
        </div>
      </div>
    `).join("");
  }

  drawAvatarCanvas("customAvatar", getGameLook(), {
    frame: previewAnimFrame,
    dir: previewDir,
    moving: previewWalking
  });
  drawAvatarCanvas("homeAvatar", getGameLook(), {
    frame: previewAnimFrame,
    dir: "down",
    moving: true
  });
  drawAvatarCanvas("miniAvatar", getGameLook(), {
    frame: 0,
    dir: "down",
    moving: false,
    showPet: false,
    showStand: false
  });
}

function updateCharacterPreviewFromInputs() {
  const nameInput = document.getElementById("characterName");
  const previewName = document.getElementById("previewName");
  if (nameInput && previewName) {
    previewName.textContent = nameInput.value.trim() || game.name || "Aventureiro";
  }
  const clsVal = document.getElementById("characterClassSelect")?.value;
  const clsObj = classesCatalog.find(c => c.id === clsVal) || getActiveClassObj();
  const stVal = document.getElementById("characterStandSelect")?.value;
  const stObj = standsCatalog.find(s => s.id === stVal) || getActiveStandObj();
  const classHint = document.getElementById("classDetailHint");
  if (classHint && clsObj) {
    classHint.textContent = `Classe: ${clsObj.passiveText} | Stand: ${stObj.id !== "none" ? `${stObj.name} (${stObj.abilityName})` : "Nenhum Stand equipado"}`;
  }
  const notice = document.getElementById("charPreviewNotice");
  if (notice) {
    notice.textContent = "👀 Pré-visualização ao vivo — clique em 'Salvar personagem' para confirmar o visual!";
    notice.classList.remove("hidden");
  }
  drawAvatarCanvas("customAvatar", getFormLook(), {
    frame: previewAnimFrame,
    dir: previewDir,
    moving: previewWalking
  });
}

function saveCharacter() {
  const nameInput = document.getElementById("characterName");
  const look = getFormLook();

  game.name = (nameInput?.value.trim() || "Aventureiro").slice(0, 20);
  const clsVal = document.getElementById("characterClassSelect")?.value;
  if (clsVal && classesCatalog.some(c => c.id === clsVal)) {
    game.charClass = clsVal;
    if (!game.unlockedClasses.includes(clsVal)) game.unlockedClasses.push(clsVal);
  }

  const stVal = document.getElementById("characterStandSelect")?.value;
  if (stVal && (stVal === "none" || (game.unlockedStands || []).includes(stVal))) {
    game.equippedStand = stVal;
  }

  const titleVal = document.getElementById("characterTitle")?.value;
  if (titleVal && titlesCatalog.some(t => t.id === titleVal && t.check(game))) game.title = titleVal;

  const compVal = document.getElementById("characterCompanion")?.value;
  if (compVal && companionsCatalog.some(c => c.id === compVal && c.unlocked(game))) game.companion = compVal;

  game.hairStyle = look.hairStyle;
  game.outfitStyle = look.outfitStyle;
  game.accessoryStyle = look.accessoryStyle;
  game.hairColor = look.hairColor;
  game.skinColor = look.skinColor;
  game.eyeColor = look.eyeColor;
  game.outfitColor = look.outfitColor;
  game.activeAuraStyle = look.auraStyle || "auto";

  const notice = document.getElementById("charPreviewNotice");
  if (notice) notice.classList.add("hidden");

  playSFX("click");
  saveGame();
  renderAll();
  notify("Visual, Classe e Stand de " + game.name + " salvos com sucesso!");
}

function cyclePreviewDir() {
  const dirs = ["down", "left", "up", "right"];
  previewDir = dirs[(dirs.indexOf(previewDir) + 1) % dirs.length];
  drawAvatarCanvas("customAvatar", getFormLook(), {
    frame: previewAnimFrame,
    dir: previewDir,
    moving: previewWalking
  });
}

function togglePreviewWalk() {
  previewWalking = !previewWalking;
  const btn = document.getElementById("walkBtn");
  if (btn) btn.textContent = previewWalking ? "⏸ Parar" : "▶ Andar";
  drawAvatarCanvas("customAvatar", getFormLook(), {
    frame: previewAnimFrame,
    dir: previewDir,
    moving: previewWalking
  });
}

let previewLoopId = null;
let previewLoopTimer = null;
function previewLoop() {
  previewLoopTimer = null;
  if (typeof document !== "undefined" && document.hidden) {
    previewLoopTimer = setTimeout(previewLoop, 450);
    return;
  }
  previewAnimFrame = (previewAnimFrame + 1) % 4;
  const charPage = document.getElementById("page-character");
  if (charPage && charPage.classList.contains("active")) {
    drawAvatarCanvas("customAvatar", getFormLook(), {
      frame: previewAnimFrame,
      dir: previewDir,
      moving: previewWalking
    });
  }
  const homePage = document.getElementById("page-home");
  if (homePage && homePage.classList.contains("active")) {
    drawAvatarCanvas("homeAvatar", getGameLook(), {
      frame: previewAnimFrame,
      dir: "down",
      moving: true
    });
  }
  const q = game.gfxQuality || "high";
  const delay = q === "low" ? 480 : q === "medium" ? 360 : 280;
  previewLoopTimer = setTimeout(() => { previewLoopId = requestAnimationFrame(previewLoop); }, delay);
}

function startPreviewLoop() {
  if (previewLoopId !== null || previewLoopTimer !== null) return;
  previewLoopId = requestAnimationFrame(previewLoop);
}

/* =========================================================
   9. HABILIDADES, INVENTÁRIO, FORJA (+1 A +10), LOJA E UNIVERSOS
========================================================= */

let activeSkillFilter = "Todos";

function unlockSkill(id) {
  const skill = skills.find(item => item.id === id);
  if (!skill) return;

  if (game.unlockedSkills.includes(id)) {
    notify("Habilidade já desbloqueada.");
    return;
  }

  if (game.coins < skill.cost) {
    notify("Moedas insuficientes.");
    return;
  }

  game.coins -= skill.cost;
  game.unlockedSkills.push(id);
  game.skillLevels[id] = 1;

  if (game.equippedSkills.length < 4) {
    game.equippedSkills.push(id);
  }

  playSFX("levelup");
  updateAchievements();
  saveGame();
  renderAll();
  notify(skill.name + " desbloqueada e equipada!");
}

function upgradeSkill(id) {
  if (!game.unlockedSkills.includes(id)) return;
  const currentLvl = game.skillLevels[id] || 1;
  if (currentLvl >= 5) {
    notify("Esta habilidade já está no nível máximo (Nv. 5)!");
    return;
  }

  const sk = skills.find(s => s.id === id);
  const upCost = Math.round((sk ? sk.cost : 60) * currentLvl * 0.85);
  if (game.coins < upCost) {
    notify(`Você precisa de ${upCost} 🪙 para evoluir esta habilidade.`);
    return;
  }

  game.coins -= upCost;
  game.skillLevels[id] = currentLvl + 1;
  playSFX("levelup");
  saveGame();
  renderAll();
  notify(`${sk.name} evoluiu para o Nível ${game.skillLevels[id]}!`);
}

function toggleEquipSkill(id) {
  if (!game.unlockedSkills.includes(id)) return;

  const idx = game.equippedSkills.indexOf(id);
  if (idx >= 0) {
    game.equippedSkills.splice(idx, 1);
    notify("Habilidade desequipada.");
  } else {
    if (game.equippedSkills.length >= 4) {
      notify("Limite máximo de 4 habilidades equipadas atingido! Desequipe uma antes.");
      return;
    }
    game.equippedSkills.push(id);
    notify("Habilidade equipada!");
  }

  playSFX("click");
  saveGame();
  renderAll();
}

function renderSkills() {
  const eqContainer = document.getElementById("equippedSkills");
  if (eqContainer) {
    const slots = [0, 1, 2, 3];
    eqContainer.innerHTML = slots.map(slotIdx => {
      const skId = game.equippedSkills[slotIdx];
      const sk = skills.find(s => s.id === skId);
      if (!sk) {
        return `<div class="equipped-slot">Slot ${slotIdx + 1}: Vazio</div>`;
      }
      const lvl = game.skillLevels[sk.id] || 1;
      return `
        <div class="equipped-slot">
          <div>
            <strong>${sk.icon} ${escapeHTML(sk.name)} (Nv.${lvl})</strong>
            <small style="display:block;color:var(--muted);">${escapeHTML(sk.anime)} • CD: ${sk.cd || 2}t</small>
          </div>
          <button class="secondary-btn" style="margin-top:8px;padding:5px 10px;" data-action="equip-skill" data-id="${escapeHTML(sk.id)}">Remover</button>
        </div>
      `;
    }).join("");
  }

  const filterBar = document.getElementById("skillFilterBar");
  if (filterBar) {
    const animes = ["Todos", ...new Set(skills.map(s => s.anime))];
    filterBar.innerHTML = animes.map(a => `
      <button class="filter-pill ${activeSkillFilter === a ? "active" : ""}" data-action="filter-skill" data-id="${escapeHTML(a)}">${escapeHTML(a)}</button>
    `).join("");
  }

  const container = document.getElementById("skillsList");
  if (!container) return;

  const filtered = activeSkillFilter === "Todos" ? skills : skills.filter(s => s.anime === activeSkillFilter);

  container.innerHTML = filtered.map(skill => {
    const unlocked = game.unlockedSkills.includes(skill.id);
    const equipped = game.equippedSkills.includes(skill.id);
    const lvl = game.skillLevels[skill.id] || 1;
    const upCost = Math.round(skill.cost * lvl * 0.85);
    const pwr = Math.round(skill.power * (1 + (lvl - 1) * 0.22));

    return `
      <div class="skill-card ${unlocked ? (equipped ? "equipped" : "") : "locked"}">
        <div>
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <span class="skill-icon">${skill.icon}</span>
            <span class="rarity-badge rarity-epic">${escapeHTML(skill.anime)}</span>
          </div>
          <h3>${escapeHTML(skill.name)} ${unlocked ? `<span class="refine-tag">Nv.${lvl}</span>` : ""}</h3>
          <p>${escapeHTML(skill.description)}</p>
          <div class="skill-stats-line">⚡ Poder: ${pwr} • 💧 ${skill.mpCost} EN • ⏳ CD: ${skill.cd || 2}t</div>
          <span class="skill-cost">${escapeHTML(skill.passiveText)}</span>
        </div>
        <div class="skill-card-actions">
          ${!unlocked ? `
            <button data-action="unlock-skill" data-id="${escapeHTML(skill.id)}">
              Desbloquear (${skill.cost} 🪙)
            </button>
          ` : `
            <button data-action="equip-skill" data-id="${escapeHTML(skill.id)}">
              ${equipped ? "Equipada ✓" : "Equipar"}
            </button>
            <button data-action="upgrade-skill" data-id="${escapeHTML(skill.id)}" ${lvl >= 5 ? "disabled" : ""}>
              ${lvl >= 5 ? "Nível Máx" : `Evoluir (${upCost} 🪙)`}
            </button>
          `}
        </div>
      </div>
    `;
  }).join("");
}

/* --- FORJA DIMENSIONAL (+1 A +10) --- */
function refineEquipment(itemId) {
  const item = game.inventory.find(i => i.id === itemId);
  if (!item || !["weapon", "armor", "accessory"].includes(item.type)) return;

  const currentLvl = getItemRefineLevel(itemId);
  if (currentLvl >= 10) {
    notify("Este equipamento já atingiu a perfeição máxima (+10)!");
    return;
  }

  const nextLvl = currentLvl + 1;
  const coinCost = 45 * nextLvl;
  const gemCost = nextLvl >= 4 ? Math.floor(nextLvl / 2) : 1;

  if (game.coins < coinCost || game.gems < gemCost) {
    notify(`Recursos insuficientes! Necessário: ${coinCost} 🪙 e ${gemCost} 💎.`);
    return;
  }

  game.coins -= coinCost;
  game.gems -= gemCost;
  if (!game.itemRefines) game.itemRefines = {};
  game.itemRefines[itemId] = nextLvl;

  playSFX("levelup");
  updateAchievements();
  saveGame();
  renderAll();
  notify(`🔨 Sucesso na Forja! ${item.name} agora é +${nextLvl} (+${nextLvl * 15}% Atributos)!`);
}

function equipOrUseItem(itemId) {
  const item = game.inventory.find(i => i.id === itemId);
  if (!item) return;

  if (item.type === "consumable") {
    if (item.grantStreakFreeze || item.id === "streak_freeze") {
      if ((game.streakFreezes || 0) >= 5) {
        notify("❄️ Você já possui o máximo de 5 Cristais de Gelo Temporal acumulados!");
        return;
      }
      game.streakFreezes = Math.min(5, (game.streakFreezes || 0) + 1);
      item.qty = (item.qty || 1) - 1;
      if (item.qty <= 0) {
        game.inventory = game.inventory.filter(i => i.id !== itemId);
      }
      playSFX("stand");
      notify(`❄️ Cristal de Gelo Temporal guardado no reservatório! (${game.streakFreezes}/5 proteções de sequência)`);
      saveGame();
      renderAll();
      return;
    }

    if (item.grantStandArrow || item.id === "stand_arrow_item") {
      game.standArrows = (game.standArrows || 0) + 1;
      game.classSpins = (game.classSpins || 0) + 1;
      item.qty = (item.qty || 1) - 1;
      if (item.qty <= 0) {
        game.inventory = game.inventory.filter(i => i.id !== itemId);
      }
      playSFX("stand");
      notify("🏹 Você absorveu a Flecha Requiem! (+1 Flecha de Stand e +1 Giro de Classe!)");
      saveGame();
      renderAll();
      return;
    }

    const totals = getTotalStats();
    game.hp = Math.min(totals.maxHp, game.hp + (item.healHp || 50));
    game.mp = Math.min(totals.maxMp, game.mp + (item.healMp || 30));
    item.qty = (item.qty || 1) - 1;
    if (item.qty <= 0) {
      game.inventory = game.inventory.filter(i => i.id !== itemId);
    }
    playSFX("quest");
    notify(`Você usou ${item.name}! Vida e Energia restauradas.${item.grantShield || item.grantRage ? " (Escudo/Despertar só têm efeito em batalha)" : ""}`);
  } else if (["weapon", "armor", "accessory"].includes(item.type)) {
    if (game.equippedItems[item.type] === item.id) {
      game.equippedItems[item.type] = null;
      notify(`${item.name} desequipado.`);
    } else {
      game.equippedItems[item.type] = item.id;
      if (item.outfitStyle) game.outfitStyle = item.outfitStyle;
      if (item.accessoryStyle) game.accessoryStyle = item.accessoryStyle;
      notify(`${item.name} equipado!`);
    }
    playSFX("click");
  }

  saveGame();
  renderAll();
}

function sellInventoryItem(itemId) {
  const item = game.inventory.find(i => i.id === itemId);
  if (!item || item.type === "medal") {
    notify("Medalhas especiais não podem ser vendidas.");
    return;
  }

  const shopRef = shopCatalog.find(s => s.id === itemId);
  const sellPrice = Math.max(5, Math.floor(((shopRef ? shopRef.priceCoins : 20) || 20) * 0.5));

  if (["weapon", "armor", "accessory"].includes(item.type) && game.equippedItems[item.type] === itemId && (item.qty || 1) <= 1) {
    game.equippedItems[item.type] = null;
  }

  item.qty = (item.qty || 1) - 1;
  if (item.qty <= 0) {
    game.inventory = game.inventory.filter(i => i.id !== itemId);
  }

  game.coins += sellPrice;
  playSFX("click");
  saveGame();
  renderAll();
  notify(`${item.name} vendido por ${sellPrice} 🪙.`);
}

function buyShopItem(itemId) {
  const shopItem = shopCatalog.find(s => s.id === itemId);
  if (!shopItem) return;

  const coinCost = shopItem.priceCoins || 0;
  const gemCost = shopItem.priceGems || 0;

  if (game.coins < coinCost || game.gems < gemCost) {
    notify("Moedas ou Gemas insuficientes para comprar este item!");
    return;
  }

  game.coins -= coinCost;
  game.gems -= gemCost;

  addInventoryItem(shopItem, 1);
  if (["weapon", "armor", "accessory"].includes(shopItem.type) && !game.equippedItems[shopItem.type]) {
    game.equippedItems[shopItem.type] = shopItem.id;
    if (shopItem.outfitStyle) game.outfitStyle = shopItem.outfitStyle;
    if (shopItem.accessoryStyle) game.accessoryStyle = shopItem.accessoryStyle;
  }

  playSFX("quest");
  saveGame();
  renderAll();
  notify(`Você comprou ${shopItem.name}!`);
}

function renderInventory() {
  const eqSummary = document.getElementById("equippedGearGrid");
  if (eqSummary) {
    const slots = [
      { key: "weapon", label: "🗡️ Arma" },
      { key: "armor", label: "🛡️ Armadura" },
      { key: "accessory", label: "💍 Acessório" }
    ];
    eqSummary.innerHTML = slots.map(s => {
      const id = game.equippedItems[s.key];
      const item = game.inventory.find(i => i.id === id) || shopCatalog.find(i => i.id === id);
      const refLvl = id ? getItemRefineLevel(id) : 0;
      return `
        <div class="equipped-slot">
          <div>
            <small class="muted">${s.label}</small>
            <strong style="display:block;margin-top:4px;">${item ? `${item.icon} ${escapeHTML(item.name)} ${refLvl > 0 ? `<span class="refine-tag">+${refLvl}</span>` : ""}` : "Nenhum equipado"}</strong>
          </div>
          ${item ? `<button class="secondary-btn" style="margin-top:8px;padding:5px 10px;" data-action="use-item" data-id="${escapeHTML(item.id)}">Remover</button>` : ""}
        </div>
      `;
    }).join("");
  }

  const forgeContainer = document.getElementById("forgeList");
  if (forgeContainer) {
    const equipables = game.inventory.filter(i => ["weapon", "armor", "accessory"].includes(i.type));
    if (!equipables.length) {
      forgeContainer.innerHTML = `<p class="muted">Compre ou encontre Armas, Armaduras ou Acessórios para aprimorá-los na Forja.</p>`;
    } else {
      forgeContainer.innerHTML = equipables.map(item => {
        const refLvl = getItemRefineLevel(item.id);
        const nextLvl = refLvl + 1;
        const coinCost = 45 * nextLvl;
        const gemCost = nextLvl >= 4 ? Math.floor(nextLvl / 2) : 1;
        const statsPreview = [];
        if (item.atk) statsPreview.push(`ATK +${getRefinedStat(item.atk, refLvl)}`);
        if (item.def) statsPreview.push(`DEF +${getRefinedStat(item.def, refLvl)}`);
        if (item.hp) statsPreview.push(`HP +${getRefinedStat(item.hp, refLvl)}`);
        if (item.mp) statsPreview.push(`EN +${getRefinedStat(item.mp, refLvl)}`);
        if (item.spd) statsPreview.push(`SPD +${getRefinedStat(item.spd, refLvl)}`);
        const rm = getRarityMeta(item.rarity);

        return `
          <div class="inventory-item">
            <div>
              <div class="inventory-icon">${escapeHTML(item.icon)}</div>
              <span class="rarity-badge ${rm.cls}">Forja +${refLvl} / +10</span>
              <strong>${escapeHTML(item.name)} ${refLvl > 0 ? `<span class="refine-tag">+${refLvl}</span>` : ""}</strong>
              <p>${statsPreview.join(" • ") || "Atributos Base"}</p>
            </div>
            <div class="item-btn-row">
              <button data-action="refine-item" data-id="${escapeHTML(item.id)}" ${refLvl >= 10 ? "disabled" : ""}>
                ${refLvl >= 10 ? "Nível Máximo (+10)" : `🔨 Refinar +${nextLvl} (${coinCost} 🪙 + ${gemCost} 💎)`}
              </button>
            </div>
          </div>
        `;
      }).join("");
    }
  }

  const countTag = document.getElementById("inventoryCountTag");
  if (countTag) countTag.textContent = `${game.inventory.length} ITENS`;

  const container = document.getElementById("inventoryList");
  if (container) {
    container.innerHTML = game.inventory.map(item => {
      const isEquipped = ["weapon", "armor", "accessory"].includes(item.type) && game.equippedItems[item.type] === item.id;
      const rm = getRarityMeta(item.rarity);
      const refLvl = getItemRefineLevel(item.id);
      return `
        <div class="inventory-item ${isEquipped ? "equipped" : ""}">
          <div>
            <div class="inventory-icon">${escapeHTML(item.icon)}</div>
            <span class="rarity-badge ${rm.cls}">${escapeHTML(rm.label)} (x${item.qty || 1})</span>
            <strong>${escapeHTML(item.name)} ${refLvl > 0 ? `<span class="refine-tag">+${refLvl}</span>` : ""}</strong>
            <p>${escapeHTML(item.description)}</p>
          </div>
          <div class="item-btn-row">
            ${item.type === "consumable" ? `
              <button data-action="use-item" data-id="${escapeHTML(item.id)}">Usar</button>
            ` : ["weapon", "armor", "accessory"].includes(item.type) ? `
              <button data-action="use-item" data-id="${escapeHTML(item.id)}">
                ${isEquipped ? "Equipado ✓" : "Equipar"}
              </button>
            ` : ""}
            ${item.type !== "medal" ? `
              <button class="danger-btn" data-action="sell-item" data-id="${escapeHTML(item.id)}">Vender</button>
            ` : ""}
          </div>
        </div>
      `;
    }).join("");
  }

  const shopContainer = document.getElementById("shopList");
  if (shopContainer) {
    shopContainer.innerHTML = shopCatalog.map(item => {
      const priceParts = [];
      if (item.priceCoins) priceParts.push(`${item.priceCoins} 🪙`);
      if (item.priceGems) priceParts.push(`${item.priceGems} 💎`);
      const rm = getRarityMeta(item.rarity);
      return `
        <div class="inventory-item">
          <div>
            <div class="inventory-icon">${escapeHTML(item.icon)}</div>
            <span class="rarity-badge ${rm.cls}">${escapeHTML(rm.label)}</span>
            <strong>${escapeHTML(item.name)}</strong>
            <p>${escapeHTML(item.description)}</p>
          </div>
          <div class="item-btn-row">
            <button data-action="buy-item" data-id="${escapeHTML(item.id)}">Comprar (${priceParts.join(" + ")})</button>
          </div>
        </div>
      `;
    }).join("");
  }
}

function renderAnime() {
  const container = document.getElementById("animeList");
  if (!container) return;

  container.innerHTML = animeUniverses.map(item => {
    const zoneIdx = zones.findIndex(z => z.id === item.zoneId);
    const visited = game.visitedZones.includes(zoneIdx >= 0 ? zoneIdx : 0);
    const bossDefeated = (game.defeatedBosses || []).includes(item.bossId);
    const totalSkills = skills.filter(s => s.anime === item.name).length;
    const unlockedCount = skills.filter(s => s.anime === item.name && game.unlockedSkills.includes(s.id)).length;

    return `
      <div class="anime-card">
        <div>
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <span class="anime-icon">${item.icon}</span>
            <span class="rarity-badge ${bossDefeated ? "rarity-legendary" : visited ? "rarity-rare" : "rarity-common"}">
              ${bossDefeated ? "👑 Chefe Derrotado" : visited ? "🗺️ Explorado" : "Disponível"}
            </span>
          </div>
          <h3>${escapeHTML(item.name)}</h3>
          <p>${escapeHTML(item.description)}</p>
        </div>
        <div class="skill-stats-line">✨ Poderes: ${unlockedCount}/${totalSkills}</div>
      </div>
    `;
  }).join("");
}

function renderAchievements() {
  const totalBosses = enemiesCatalog.filter(e => e.isBoss).length;
  const summary = document.getElementById("achievementSummary");
  if (summary) {
    summary.innerHTML = `
      <div><strong>${game.unlockedAchievements.length}/${achievements.length}</strong><small>Conquistas Desbloqueadas</small></div>
      <div><strong>${(game.unlockedClasses || []).length}/${classesCatalog.length}</strong><small>Classes Desbloqueadas</small></div>
      <div><strong>${(game.unlockedStands || []).length}/${standsCatalog.length - 1}</strong><small>Stands Despertos</small></div>
      <div><strong>${game.defeatedBosses.length}/${totalBosses}</strong><small>Chefes Derrotados</small></div>
    `;
  }

  const container = document.getElementById("achievementsList");
  if (!container) return;

  container.innerHTML = achievements.map(item => {
    const unlocked = game.unlockedAchievements.includes(item.id);
    return `
      <div class="achievement ${unlocked ? "" : "locked"}">
        <div class="achievement-icon">${item.icon}</div>
        <div>
          <span class="rarity-badge ${unlocked ? "rarity-legendary" : "rarity-common"}">${unlocked ? "Desbloqueada 🏆" : "Bloqueada 🔒"}</span>
          <h4>${escapeHTML(item.name)}</h4>
          <p>${escapeHTML(item.description)}</p>
        </div>
      </div>
    `;
  }).join("");
}

/* =========================================================
   10. DOJO DE TREINAMENTO ATIVO, ALVOS, MESTRES E BASE (#page-dojo)
========================================================= */

let dojoAnimFrame = 0;
let dojoLoopId = null;
let dojoStrikeFlash = 0;
let dojoAnimAction = { timer: 0, label: "", color: "#fbbf24" };

function getDojoLevel() {
  return Math.min(10, 1 + (game.dojoUpgrades || []).length + Math.floor((game.totalDojoTrains || 0) / 5));
}

function checkDojoSkillUnlocks() {
  const dojoLvl = getDojoLevel();
  skills.filter(s => s.dojoUnlockLevel && dojoLvl >= s.dojoUnlockLevel).forEach(sk => {
    if (!game.unlockedSkills.includes(sk.id)) {
      game.unlockedSkills.push(sk.id);
      game.skillLevels[sk.id] = game.skillLevels[sk.id] || 1;
      if (!game.unlockedDojoSkills) game.unlockedDojoSkills = [];
      if (!game.unlockedDojoSkills.includes(sk.id)) game.unlockedDojoSkills.push(sk.id);
      if (game.equippedSkills.length < 4 && !game.equippedSkills.includes(sk.id)) {
        game.equippedSkills.push(sk.id);
      }
      notify(`🏯 Técnica do Dojo Nv.${dojoLvl} desbloqueada: ${sk.icon} ${sk.name}!`);
    }
  });
}

function getMaxDojoSessions() {
  return 5 + (game.dojoUpgrades || []).length + Math.floor((getDojoLevel() - 1) / 3);
}

function trainDojoStat(trainingId) {
  checkDailyReset();
  const tr = dojoTrainingCatalog.find(t => t.id === trainingId);
  if (!tr) return;

  const maxSessions = getMaxDojoSessions();
  if ((game.dojoTrainingsToday || 0) >= maxSessions) {
    notify(`Limite diário de treino atingido (${maxSessions}/${maxSessions})! Use 'Recuperar Fôlego' ou construa mais instalações.`);
    return;
  }

  game.dojoTrainingsToday = (game.dojoTrainingsToday || 0) + 1;
  game.totalDojoTrains = (game.totalDojoTrains || 0) + 1;

  if (tr.statKey === "atk") game.stats.atk += tr.gainVal;
  else if (tr.statKey === "def") game.stats.def += tr.gainVal;
  else if (tr.statKey === "spd") game.stats.spd += tr.gainVal;
  else if (tr.statKey === "mp") {
    game.stats.mp += tr.gainVal;
    game.mp += tr.gainVal;
  } else if (tr.statKey === "skill") {
    game.coins += 15;
    if (game.totalDojoTrains % 3 === 0) {
      game.classSpins = (game.classSpins || 0) + 1;
    }
  }

  const dojoMult = 1 + (getDojoLevel() - 1) * 0.1;
  const gainedXp = gainXP(Math.round(tr.xpGain * dojoMult));
  dojoStrikeFlash = 10;
  dojoAnimAction = {
    timer: 14,
    label: `+${tr.statKey === "skill" ? "Skill" : tr.gainVal + " " + tr.statKey.toUpperCase()} • +${gainedXp} XP`,
    color: tr.statKey === "atk" ? "#ef4444" : tr.statKey === "def" ? "#22c55e" : tr.statKey === "spd" ? "#38bdf8" : "#a855f7"
  };
  checkDojoSkillUnlocks();
  playSFX("attack");
  updateAchievements();
  saveGame();
  renderAll();
  notify(`🥋 ${tr.name} (Dojo Nv.${getDojoLevel()})! +${gainedXp} XP (${game.dojoTrainingsToday}/${maxSessions})`);
}

function refillDojoEnergy() {
  if ((game.dojoTrainingsToday || 0) === 0) {
    notify("Sua energia de treinamento já está cheia!");
    return;
  }
  if (game.coins < 25) {
    notify("Você precisa de 25 🪙 para recuperar o fôlego de treinamento.");
    return;
  }
  game.coins -= 25;
  game.dojoTrainingsToday = Math.max(0, (game.dojoTrainingsToday || 0) - 3);
  playSFX("quest");
  saveGame();
  renderAll();
  notify("🍙 Fôlego restaurado! Você pode realizar mais 3 sessões de treinamento hoje.");
}

function strikeDojoTarget() {
  game.dojoTargetHits = (game.dojoTargetHits || 0) + 1;
  dojoStrikeFlash = 6;
  playSFX("attack");

  if (game.dojoTargetHits % 5 === 0) {
    const xpGained = gainXP(15);
    game.coins += 5;
    notify(`🎯 Combo de ${game.dojoTargetHits} golpes no Alvo! (+${xpGained} XP, +5 🪙)`);
  }
  saveGame();
  renderDojo();
}

function claimDojoTrainerQuest(dqId) {
  const dq = dojoTrainersCatalog.find(q => q.id === dqId);
  if (!dq || (game.claimedDojoQuests || []).includes(dqId)) return;
  if (dq.progress(game) < dq.target) {
    notify("Complete os requisitos do Mestre Treinador primeiro!");
    return;
  }

  game.claimedDojoQuests.push(dqId);
  const xpGained = gainXP(dq.xp);
  const coinsGained = gainCoins(dq.coins);
  game.classSpins = (game.classSpins || 0) + (dq.spins || 0);
  game.standArrows = (game.standArrows || 0) + (dq.arrows || 0);

  playSFX("levelup");
  saveGame();
  renderAll();
  notify(`🧙 Desafio de ${dq.trainer} concluído! +${xpGained} XP, +${coinsGained} 🪙 e +${dq.spins || 0} Giro(s)!`);
}

function buyDojoUpgrade(upId) {
  const up = dojoCatalog.find(d => d.id === upId);
  if (!up) return;
  if (!game.dojoUpgrades) game.dojoUpgrades = [];
  if (game.dojoUpgrades.includes(upId)) {
    notify("Esta instalação já foi construída no seu Dojo!");
    return;
  }

  if (game.coins < (up.costCoins || 0) || game.gems < (up.costGems || 0)) {
    notify("Moedas ou Gemas insuficientes para construir esta instalação.");
    return;
  }

  game.coins -= (up.costCoins || 0);
  game.gems -= (up.costGems || 0);
  game.dojoUpgrades.push(upId);

  playSFX("levelup");
  updateAchievements();
  saveGame();
  renderAll();
  notify(`🏯 ${up.name} construído no seu Dojo! (${up.bonusText})`);
}

function claimDojoDailyReward() {
  const today = todayString();
  if (game.dojoClaimDate === today) {
    notify("Você já coletou a recompensa do treino do Dojo hoje. Volte amanhã!");
    return;
  }

  game.dojoClaimDate = today;
  const upCount = (game.dojoUpgrades || []).length;
  const xpReward = 40 + upCount * 25;
  const coinReward = 20 + upCount * 15;
  const gemReward = upCount >= 3 ? 2 : 1;

  const gainedXp = gainXP(xpReward);
  const gainedCoins = gainCoins(coinReward);
  game.gems += gemReward;

  playSFX("levelup");
  saveGame();
  renderAll();
  notify(`🏯 Treino Diário do Dojo coletado! +${gainedXp} XP, +${gainedCoins} 🪙 e +${gemReward} 💎!`);
}

function renderDojo() {
  const upCount = (game.dojoUpgrades || []).length;
  const dojoLvl = getDojoLevel();
  const maxSessions = getMaxDojoSessions();
  const usedSessions = game.dojoTrainingsToday || 0;

  const titleEl = document.getElementById("dojoTitleHeading");
  if (titleEl) {
    titleEl.textContent = `Santuário de ${game.name} (Dojo Nível ${dojoLvl})`;
  }
  const lvlBadge = document.getElementById("dojoLevelBadge");
  if (lvlBadge) {
    lvlBadge.textContent = `🏯 Dojo Nv. ${dojoLvl} (+${(dojoLvl - 1) * 10}% XP Treino)`;
  }

  const techList = document.getElementById("dojoTechniquesList");
  if (techList) {
    const dojoTechs = skills.filter(s => s.dojoUnlockLevel);
    techList.innerHTML = dojoTechs.map(sk => {
      const unlocked = game.unlockedSkills.includes(sk.id);
      return `
        <div class="skill-card ${unlocked ? "equipped" : "locked"}">
          <div>
            <div style="display:flex;justify-content:space-between;align-items:center;">
              <span class="skill-icon">${sk.icon}</span>
              <span class="rarity-badge ${unlocked ? "rarity-legendary" : "rarity-common"}">${unlocked ? "Desbloqueada ✓" : `🔒 Dojo Nv.${sk.dojoUnlockLevel}`}</span>
            </div>
            <h3>${escapeHTML(sk.name)}</h3>
            <p>${escapeHTML(sk.description)}</p>
            <span class="skill-cost">${escapeHTML(sk.passiveText)}</span>
          </div>
        </div>
      `;
    }).join("");
  }

  const energyBadge = document.getElementById("dojoEnergyBadge");
  if (energyBadge) {
    energyBadge.textContent = `⚡ Sessões Hoje: ${usedSessions}/${maxSessions}`;
  }

  const claimBtn = document.getElementById("claimDojoRewardBtn");
  if (claimBtn) {
    const claimedToday = game.dojoClaimDate === todayString();
    claimBtn.disabled = claimedToday;
    claimBtn.textContent = claimedToday
      ? "✓ Treino Diário Coletado"
      : `🎁 Coletar Treino Diário (+${40 + upCount * 25} XP, +${20 + upCount * 15} 🪙)`;
  }

  const summaryEl = document.getElementById("dojoStatsSummary");
  if (summaryEl) {
    summaryEl.innerHTML = `
      <div><strong>${game.totalDojoTrains || 0}</strong><small>Treinos Realizados</small></div>
      <div><strong>${game.dojoTargetHits || 0}</strong><small>Golpes no Alvo</small></div>
      <div><strong>${upCount}/${dojoCatalog.length}</strong><small>Instalações do Dojo</small></div>
      <div><strong>${(game.defeatedBosses || []).length}</strong><small>Troféus de Chefes</small></div>
    `;
  }

  const trainGrid = document.getElementById("dojoTrainingGrid");
  if (trainGrid) {
    const limitReached = usedSessions >= maxSessions;
    trainGrid.innerHTML = dojoTrainingCatalog.map(tr => `
      <div class="skill-card">
        <div>
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <span class="skill-icon">${tr.icon}</span>
            <span class="rarity-badge rarity-uncommon">+${tr.xpGain} XP</span>
          </div>
          <h3>${escapeHTML(tr.name)}</h3>
          <p>${escapeHTML(tr.desc)}</p>
        </div>
        <div class="skill-card-actions">
          <button data-action="train-dojo-stat" data-id="${escapeHTML(tr.id)}" ${limitReached ? "disabled" : ""}>
            ${limitReached ? "Limite Diário Atingido" : `Treinar Agora (${usedSessions}/${maxSessions})`}
          </button>
        </div>
      </div>
    `).join("");
  }

  const trainersBox = document.getElementById("dojoTrainersList");
  if (trainersBox) {
    trainersBox.innerHTML = dojoTrainersCatalog.map(dq => {
      const prog = Math.min(dq.target, dq.progress(game));
      const ready = prog >= dq.target;
      const claimed = (game.claimedDojoQuests || []).includes(dq.id);
      return `
        <div class="quest-item ${claimed ? "done" : ""}">
          <div>
            <span class="rarity-badge rarity-legendary">${dq.icon} ${escapeHTML(dq.trainer)}</span>
            <div class="quest-name">${escapeHTML(dq.name)}</div>
            <div class="quest-meta">${escapeHTML(dq.desc)} • <span class="quest-reward">+${dq.xp} XP • +${dq.coins} 🪙 • +${dq.spins} Giro(s)${dq.arrows ? ` • +${dq.arrows} Flecha` : ""}</span></div>
          </div>
          <button class="complete-btn" data-action="claim-dojo-quest" data-id="${escapeHTML(dq.id)}" ${(!ready || claimed) ? "disabled" : ""}>
            ${claimed ? "Concluído ✓" : ready ? "Resgatar!" : `${prog}/${dq.target}`}
          </button>
        </div>
      `;
    }).join("");
  }

  const shopList = document.getElementById("dojoUpgradesList");
  if (shopList) {
    shopList.innerHTML = dojoCatalog.map(up => {
      const owned = (game.dojoUpgrades || []).includes(up.id);
      const costStr = `${up.costCoins} 🪙${up.costGems ? ` + ${up.costGems} 💎` : ""}`;
      return `
        <div class="skill-card ${owned ? "equipped" : ""}">
          <div>
            <div style="display:flex;justify-content:space-between;align-items:center;">
              <span class="skill-icon">${up.icon}</span>
              <span class="rarity-badge ${owned ? "rarity-legendary" : "rarity-rare"}">${owned ? "Instalado ✓" : costStr}</span>
            </div>
            <h3>${escapeHTML(up.name)}</h3>
            <p>${escapeHTML(up.description)}</p>
            <div class="skill-stats-line">${escapeHTML(up.bonusText)}</div>
          </div>
          <div class="skill-card-actions">
            <button data-action="buy-dojo" data-id="${escapeHTML(up.id)}" ${owned ? "disabled" : ""}>
              ${owned ? "Construído ✓" : `Construir (${costStr})`}
            </button>
          </div>
        </div>
      `;
    }).join("");
  }

  drawDojoCanvas();
}

function drawDojoCanvas() {
  const dojoPage = document.getElementById("page-dojo");
  if (dojoPage && dojoPage.classList && !dojoPage.classList.contains("active")) return;
  const canvas = document.getElementById("dojoCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const W = canvas.width;
  const H = canvas.height;
  ctx.clearRect(0, 0, W, H);

  // 1. Parede Superior de Madeira Nobre & Painéis Shoji Japoneses
  ctx.fillStyle = "#1c120c";
  ctx.fillRect(0, 0, W, 102);
  ctx.fillStyle = "#2d1d12";
  ctx.fillRect(0, 88, W, 14);
  ctx.fillStyle = "#090b10";
  ctx.fillRect(0, 100, W, 3);

  // Vigas de madeira verticais
  for (let x = 0; x < W; x += 96) {
    ctx.fillStyle = "#2b1b11";
    ctx.fillRect(x, 0, 10, 100);
    ctx.fillStyle = "#3f2819";
    ctx.fillRect(x + 2, 0, 3, 100);
  }

  // Janelas Shoji com treliça e luz de entardecer
  const shojiXList = [70, 230, W - 320, W - 160];
  shojiXList.forEach(sx => {
    const g = ctx.createLinearGradient(sx, 14, sx, 78);
    g.addColorStop(0, "#fde68a");
    g.addColorStop(1, "#f59e0b");
    ctx.fillStyle = g;
    ctx.fillRect(sx, 14, 92, 66);
    ctx.strokeStyle = "#3f2819";
    ctx.lineWidth = 3;
    ctx.strokeRect(sx, 14, 92, 66);
    ctx.lineWidth = 1.5;
    for (let lx = sx + 23; lx < sx + 90; lx += 23) {
      ctx.beginPath(); ctx.moveTo(lx, 14); ctx.lineTo(lx, 80); ctx.stroke();
    }
    for (let ly = 36; ly < 78; ly += 22) {
      ctx.beginPath(); ctx.moveTo(sx, ly); ctx.lineTo(sx + 92, ly); ctx.stroke();
    }
  });

  // Pergaminho Caligráfico Central ("武道" - Caminho Marcial)
  const scrollX = Math.floor(W / 2) - 34;
  ctx.fillStyle = "#7f1d1d";
  ctx.fillRect(scrollX - 4, 8, 76, 80);
  ctx.fillStyle = "#fef3c7";
  ctx.fillRect(scrollX + 2, 14, 64, 68);
  ctx.fillStyle = "#fbbf24";
  ctx.fillRect(scrollX - 6, 6, 80, 5);
  ctx.fillRect(scrollX - 6, 85, 80, 5);
  ctx.fillStyle = "#111827";
  ctx.font = "900 24px serif";
  ctx.fillText("武", scrollX + 22, 44);
  ctx.fillText("道", scrollX + 22, 72);

  // 2. Piso de Tatami Tradicional com Bordas Bordô/Verdes
  ctx.fillStyle = "#5f7c50";
  ctx.fillRect(0, 103, W, H - 103);

  const tatamiW = 128;
  const tatamiH = 64;
  for (let y = 103; y < H; y += tatamiH) {
    for (let x = 0; x < W; x += tatamiW) {
      const alt = ((x / tatamiW) + Math.floor((y - 103) / tatamiH)) % 2 === 0;
      ctx.fillStyle = alt ? "#688758" : "#5c7a4d";
      ctx.fillRect(x + 2, y + 2, tatamiW - 4, tatamiH - 4);
      // Textura de fibra do tatami
      ctx.fillStyle = "rgba(255,255,255,0.05)";
      for (let ty = y + 6; ty < y + tatamiH - 4; ty += 6) {
        ctx.fillRect(x + 4, ty, tatamiW - 8, 2);
      }
      // Borda tecida do tatami
      ctx.strokeStyle = "#7f1d1d";
      ctx.lineWidth = 3;
      ctx.strokeRect(x + 1.5, y + 1.5, tatamiW - 3, tatamiH - 3);
    }
  }

  // Círculo de Combate Central no Tatami
  ctx.save();
  ctx.strokeStyle = "rgba(251, 191, 36, 0.45)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.ellipse(Math.floor(W / 2) - 10, Math.floor(H / 2) + 34, 88, 36, 0, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();

  // 3. Instalações Construídas no Dojo (Desenhadas em Pixel/Vector Art)
  const owned = game.dojoUpgrades || [];
  const positions = [
    { x: 95, y: 155 },
    { x: 245, y: 155 },
    { x: 625, y: 155 },
    { x: 110, y: 272 },
    { x: 705, y: 272 }
  ];
  dojoCatalog.forEach((up, idx) => {
    const pos = positions[idx] || { x: 100 + idx * 120, y: 155 };
    const isBuilt = owned.includes(up.id);
    ctx.save();
    ctx.globalAlpha = isBuilt ? 1 : 0.35;

    // Tapete/Base da Instalação
    ctx.fillStyle = "#090d16";
    ctx.fillRect(pos.x - 42, pos.y - 26, 124, 64);
    ctx.fillStyle = isBuilt ? "#151d2e" : "#0f1420";
    ctx.fillRect(pos.x - 40, pos.y - 24, 120, 60);
    ctx.strokeStyle = isBuilt ? "#fbbf24" : "#334155";
    ctx.lineWidth = 2;
    ctx.strokeRect(pos.x - 40, pos.y - 24, 120, 60);

    // Ilustração específica da instalação
    const ix = pos.x - 28;
    const iy = pos.y - 12;
    if (idx === 0) {
      // Saco de pancadas / Boneco
      ctx.fillStyle = "#b45309";
      ctx.fillRect(ix + 6, iy, 16, 30);
      ctx.fillStyle = "#fde68a";
      ctx.fillRect(ix + 6, iy + 10, 16, 6);
    } else if (idx === 1) {
      // Bonsai / Jardim Zen
      ctx.fillStyle = "#78350f";
      ctx.fillRect(ix + 4, iy + 18, 20, 10);
      ctx.fillStyle = "#10b981";
      ctx.beginPath(); ctx.arc(ix + 14, iy + 10, 12, 0, Math.PI * 2); ctx.fill();
    } else if (idx === 2) {
      // Câmara de Gravidade
      ctx.fillStyle = "#38bdf8";
      ctx.beginPath(); ctx.arc(ix + 14, iy + 14, 13, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = "#ffffff"; ctx.stroke();
    } else if (idx === 3) {
      // Cachoeira Espiritual
      ctx.fillStyle = "#0284c7";
      ctx.fillRect(ix + 4, iy, 20, 28);
      ctx.fillStyle = "#bae6fd";
      ctx.fillRect(ix + 8, iy + (dojoAnimFrame % 3) * 4, 4, 18);
      ctx.fillRect(ix + 16, iy + ((dojoAnimFrame + 1) % 3) * 4, 4, 18);
    } else {
      // Santuário / Altar Dourado
      ctx.fillStyle = "#dc2626";
      ctx.fillRect(ix + 2, iy + 2, 24, 5);
      ctx.fillRect(ix + 6, iy + 7, 4, 22);
      ctx.fillRect(ix + 18, iy + 7, 4, 22);
    }

    ctx.fillStyle = isBuilt ? "#fbbf24" : "#94a3b8";
    ctx.font = "700 11px 'Chakra Petch', sans-serif";
    ctx.fillText(isBuilt ? "★ ATIVO" : "🔒 CONSTRUIR", pos.x + 6, pos.y - 4);
    ctx.fillStyle = "#ffffff";
    ctx.font = "700 12px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText(up.name.split(" ")[0], pos.x + 6, pos.y + 14);
    ctx.restore();
  });

  // 4. Boneco Makiwara Interativo de Treinamento (Com Base e Cordas de Palha)
  const shakeX = dojoStrikeFlash > 0 ? (dojoStrikeFlash % 2 === 0 ? 6 : -6) : 0;
  const dummyX = Math.floor(W / 2) + 88 + shakeX;
  const dummyY = Math.floor(H / 2) - 16;

  // Sombra e base do boneco
  ctx.fillStyle = "rgba(0,0,0,0.45)";
  ctx.beginPath(); ctx.ellipse(dummyX + 14, dummyY + 56, 22, 7, 0, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#090b10";
  ctx.fillRect(dummyX - 12, dummyY - 4, 52, 60);
  // Braços de madeira
  ctx.fillStyle = "#78350f";
  ctx.fillRect(dummyX - 10, dummyY + 14, 48, 8);
  // Tronco do boneco
  ctx.fillStyle = dojoStrikeFlash > 0 ? "#ef4444" : "#92400e";
  ctx.fillRect(dummyX + 2, dummyY, 24, 52);
  // Faixas de corda de impacto
  ctx.fillStyle = dojoStrikeFlash > 0 ? "#fef08a" : "#fde68a";
  ctx.fillRect(dummyX + 2, dummyY + 10, 24, 14);
  ctx.fillStyle = "#dc2626";
  ctx.fillRect(dummyX + 10, dummyY + 13, 8, 8);

  if (dojoStrikeFlash > 0) {
    ctx.strokeStyle = "#fde047";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(dummyX + 14, dummyY + 18, 28, 0, Math.PI * 2);
    ctx.stroke();
  }

  ctx.fillStyle = "#090b10";
  ctx.fillRect(dummyX - 10, dummyY - 24, 50, 16);
  ctx.fillStyle = "#fbbf24";
  ctx.font = "700 11px 'Chakra Petch', sans-serif";
  ctx.fillText("ALVO", dummyX + 1, dummyY - 12);

  // 5. Estante de Troféus de Chefes no Canto Superior Direito
  ctx.fillStyle = "#0b101b";
  ctx.fillRect(W - 220, 110, 202, 58);
  ctx.strokeStyle = "#fbbf24";
  ctx.lineWidth = 2;
  ctx.strokeRect(W - 220, 110, 202, 58);
  ctx.fillStyle = "#fbbf24";
  ctx.font = "700 13px 'Chakra Petch', sans-serif";
  ctx.fillText("TROFÉUS DE CHEFES: " + (game.defeatedBosses || []).length, W - 206, 132);
  ctx.fillStyle = "#cbd5e1";
  ctx.font = "600 12px 'JetBrains Mono', monospace";
  ctx.fillText(`Treinos: ${game.totalDojoTrains || 0} | Hits: ${game.dojoTargetHits || 0}`, W - 206, 152);

  // 6. Companheiros passeando no Dojo
  const unlockedPets = companionsCatalog.filter(c => c.id !== "none" && c.unlocked(game));
  unlockedPets.forEach((pet, idx) => {
    const px = 240 + idx * 75 + Math.sin((dojoAnimFrame + idx) * 0.6) * 8;
    const py = 272 + (idx % 2) * 24;
    drawCompanionSprite(ctx, pet.id, px, py, 3, dojoAnimFrame + idx);
  });

  // 7. Jogador treinando no centro do Tatami (com animação de avanço/aura quando treina!)
  const cls = getActiveClassObj();
  const trainAdvance = dojoAnimAction.timer > 0 ? Math.min(48, (14 - dojoAnimAction.timer) * 6) : 0;
  drawSprite(ctx, getGameLook(), Math.floor(W / 2) - 36 + trainAdvance, Math.floor(H / 2) - 22, 4, {
    frame: dojoAnimFrame,
    dir: dojoStrikeFlash > 0 || dojoAnimAction.timer > 0 ? "right" : "down",
    moving: true,
    auraColor: dojoAnimAction.timer > 0 ? dojoAnimAction.color : (cls ? cls.ultColor : "#fbbf24"),
    hasSword: Boolean(game.equippedItems.weapon),
    standId: game.equippedStand
  });

  if (dojoAnimAction.timer > 0) {
    ctx.save();
    ctx.font = "800 15px 'Chakra Petch', sans-serif";
    ctx.lineWidth = 3.5;
    ctx.strokeStyle = "#05070b";
    ctx.fillStyle = dojoAnimAction.color || "#fbbf24";
    const ty = Math.floor(H / 2) - 52 - (14 - dojoAnimAction.timer) * 2;
    ctx.strokeText(dojoAnimAction.label, Math.floor(W / 2) - 48, ty);
    ctx.fillText(dojoAnimAction.label, Math.floor(W / 2) - 48, ty);
    ctx.restore();
    dojoAnimAction.timer--;
  }

  if (dojoStrikeFlash > 0) dojoStrikeFlash--;

  ctx.fillStyle = "rgba(16, 13, 29, 0.88)";
  ctx.fillRect(Math.floor(W / 2) - 95, Math.floor(H / 2) - 44, 190, 20);
  ctx.fillStyle = "#f6c453";
  ctx.font = "bold 12px Rajdhani, sans-serif";
  ctx.fillText(`${game.name} • Dojo Nv.${getDojoLevel()}`, Math.floor(W / 2) - 86, Math.floor(H / 2) - 30);
}

let dojoLoopTimer = null;
function dojoLoop() {
  dojoLoopTimer = null;
  if (typeof document !== "undefined" && document.hidden) {
    dojoLoopTimer = setTimeout(dojoLoop, 450);
    return;
  }
  dojoAnimFrame = (dojoAnimFrame + 1) % 8;
  const dojoPage = document.getElementById("page-dojo");
  if (dojoPage && dojoPage.classList.contains("active")) {
    drawDojoCanvas();
  }
  const q = game.gfxQuality || "high";
  const delay = q === "low" ? 500 : q === "medium" ? 380 : 320;
  dojoLoopTimer = setTimeout(() => { dojoLoopId = requestAnimationFrame(dojoLoop); }, delay);
}

function startDojoLoop() {
  if (dojoLoopId !== null || dojoLoopTimer !== null) return;
  dojoLoopId = requestAnimationFrame(dojoLoop);
}

/* =========================================================
   11. CICLO DIA/NOITE, PAINEL PRINCIPAL E NAVEGAÇÃO
========================================================= */

function getCurrentTimePeriod() {
  if (game.timeMode && game.timeMode !== "auto") return game.timeMode;
  const hour = new Date().getHours();
  if (hour >= 6 && hour < 16) return "day";
  if (hour >= 16 && hour < 19) return "sunset";
  return "night";
}

function renderTimeAndAudioUI() {
  const period = getCurrentTimePeriod();
  const icons = { day: "☀️", sunset: "🌇", night: "🌙" };
  const labels = { day: "Dia", sunset: "Entardecer", night: "Noite" };

  const setText = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  };

  setText("timeIcon", icons[period] || "☀️");
  setText("timeLabel", labels[period] || "Dia");
  setText("sidebarCalendar", `Dia ${game.journeyDays || 1} • ${icons[period] || "☀️"} ${labels[period] || "Dia"}`);
  setText("homeBannerTag", `SISTEMA DE PROGRESSÃO • DIA ${game.journeyDays || 1}`);
  setText("soundIcon", game.muted ? "🔇" : "🔊");
  setText("sfxVolLabel", `${game.sfxVolume}%`);
  setText("bgmVolLabel", `${game.bgmVolume}%`);

  const timeSel = document.getElementById("timeModeSelect");
  if (timeSel) timeSel.value = game.timeMode || "auto";

  const sfxRange = document.getElementById("sfxVolume");
  if (sfxRange) sfxRange.value = game.sfxVolume;

  const bgmRange = document.getElementById("bgmVolume");
  if (bgmRange) bgmRange.value = game.bgmVolume;
}

/* =========================================================
   11B. MODOS ROTINA/AVENTURA, TUTORIAL 3 ETAPAS & SISTEMAS SOCIAIS
========================================================= */

let activeRankingTab = "level";
let tutorialStep = 1;

const TUTORIAL_STEPS = [
  {
    eyebrow: "ETAPA 1 DE 3 • MODO ROTINA",
    title: "📋 Transforme sua Rotina Real em Poder",
    body: `<p>No <strong>Modo Rotina</strong> (aba <em>Missões &amp; Foco</em>), você registra tarefas reais, cria <strong>Hábitos Diários (Dailies)</strong> com bônus cumulativo de sequência e usa o <strong>Pomodoro RPG</strong>.</p>
           <ul style="margin:10px 0 0 18px;display:grid;gap:6px;">
             <li>✅ Cada tarefa concluída dá <strong>XP</strong>, <strong>🪙 Moedas</strong> e <strong>🔋 Energia de Rotina</strong>.</li>
             <li>🧊 Faltou 1 dia? Use <strong>Cristais de Gelo</strong> ou agende hábitos só de Seg–Sex!</li>
             <li>🌿 Minutos focados no Pomodoro fazem suas ervas crescerem no Pátio do Dojo.</li>
           </ul>`
  },
  {
    eyebrow: "ETAPA 2 DE 3 • MODO AVENTURA",
    title: "🗺️ Explore 14 Mundos & Encare Chefes Táticos",
    body: `<p>Troque para o <strong>Modo Aventura</strong> no topo para explorar os <strong>14 Mundos 2D</strong> (de Konoha e Cairo até Wano, Trevo e Ilha Jeju).</p>
           <ul style="margin:10px 0 0 18px;display:grid;gap:6px;">
             <li>🕹️ Mova-se com <strong>WASD / Setas / Toque</strong> ou pelo <strong>Joystick Virtual Mobile</strong> e aperte <strong>E</strong> perto de Mestres, Baús, Portais e Passagens Secretas!</li>
             <li>⚔️ No combate, combine ataques para montar <strong>Combos</strong> e fique atento às <strong>Intenções dos Chefes</strong> (Fase 2, Escudos e Golpes Carregados).</li>
           </ul>`
  },
  {
    eyebrow: "ETAPA 3 DE 3 • EVOLUÇÃO & SISTEMAS",
    title: "🎰 Roleta, Stands Requiem, Dojo, Montarias & Ranking",
    body: `<p>Use as recompensas da sua rotina para evoluir de forma completa:</p>
           <ul style="margin:10px 0 0 18px;display:grid;gap:6px;">
             <li>🎰 <strong>Classes &amp; Stands:</strong> gire a Roleta (7 raridades com sorte garantida!), desperte 13 Stands de JoJo e evolua até <em>Requiem / Over Heaven</em>.</li>
             <li>🏯 <strong>Dojo &amp; Social:</strong> desbloqueie técnicas no Dojo, equipe <strong>Montarias</strong>, lidere sua <strong>Guilda</strong>, participe de <strong>Eventos</strong> e alcance o Top 1 do <strong>Ranking</strong>!</li>
           </ul>`
  }
];

function renderTutorialStep() {
  const modal = document.getElementById("tutorialModal");
  const ey = document.getElementById("tutStepEyebrow");
  const ti = document.getElementById("tutStepTitle");
  const bo = document.getElementById("tutStepBody");
  const dots = document.getElementById("tutStepDots");
  const prevBtn = document.getElementById("tutPrevBtn");
  const nextBtn = document.getElementById("tutNextBtn");
  const finishBtn = document.getElementById("closeTutorialBtn");
  const data = TUTORIAL_STEPS[tutorialStep - 1] || TUTORIAL_STEPS[0];
  if (ey) ey.textContent = data.eyebrow;
  if (ti) ti.textContent = data.title;
  if (bo) bo.innerHTML = data.body;
  if (dots) {
    dots.innerHTML = TUTORIAL_STEPS.map((_, idx) => `<span class="tut-dot ${idx + 1 === tutorialStep ? "active" : ""}"></span>`).join("");
  }
  if (prevBtn) prevBtn.disabled = tutorialStep <= 1;
  if (nextBtn) nextBtn.classList.toggle("hidden", tutorialStep >= TUTORIAL_STEPS.length);
  if (finishBtn) finishBtn.classList.toggle("hidden", tutorialStep < TUTORIAL_STEPS.length);
  if (modal) modal.classList.remove("hidden");
}

function setTutorialStep(deltaOrAbsolute, isAbsolute = false) {
  tutorialStep = isAbsolute ? deltaOrAbsolute : tutorialStep + deltaOrAbsolute;
  tutorialStep = Math.max(1, Math.min(TUTORIAL_STEPS.length, tutorialStep));
  renderTutorialStep();
}

function switchGameMode(mode, navigate = false) {
  const m = mode === "adventure" ? "adventure" : "routine";
  game.gameMode = m;
  document.querySelectorAll(".mode-tab-btn[data-gamemode]").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.gamemode === m);
  });
  const rHub = document.getElementById("homeRoutineHub");
  const aHub = document.getElementById("homeAdventureHub");
  if (rHub) rHub.classList.toggle("active", m === "routine");
  if (aHub) aHub.classList.toggle("active", m === "adventure");

  document.querySelectorAll(".nav-btn[data-mode]").forEach(btn => {
    const bm = btn.dataset.mode;
    const isMatch = bm === "all" || bm === m;
    btn.classList.toggle("mode-highlighted", isMatch && bm !== "all");
    btn.classList.toggle("mode-secondary", !isMatch);
  });

  if (navigate) {
    openPage(m === "routine" ? "quests" : "map");
  }
  scheduleSave();
}

function addGuildXp(amount) {
  if (!game.guild) return;
  game.guild.xp = (game.guild.xp || 0) + Math.round(amount);
  while (game.guild.level < 10 && game.guild.xp >= game.guild.level * 120) {
    game.guild.xp -= game.guild.level * 120;
    game.guild.level++;
    notify(`🏰 Sua Guilda "${game.guild.name}" subiu para o Nível ${game.guild.level}!`);
  }
}

function joinGuild(guildId) {
  const gd = guildsCatalog.find(g => g.id === guildId);
  if (!gd) return;
  const curLvl = game.guild ? game.guild.level : 1;
  const curXp = game.guild ? game.guild.xp : 0;
  game.guild = { id: gd.id, name: gd.name, icon: gd.icon, level: curLvl, xp: curXp, custom: false };
  playSFX("levelup");
  saveGame();
  renderAll();
  notify(`🏰 Você entrou na guilda ${gd.icon} ${gd.name}!`);
}

function createCustomGuild() {
  const inp = document.getElementById("customGuildNameInput");
  const name = (inp?.value || "").trim().slice(0, 24);
  if (!name) {
    notify("Digite um nome para fundar sua Guilda!");
    return;
  }
  if (game.coins < 100) {
    notify("Você precisa de 100 🪙 para fundar uma Guilda própria.");
    return;
  }
  game.coins -= 100;
  const curLvl = game.guild ? game.guild.level : 1;
  const curXp = game.guild ? game.guild.xp : 0;
  game.guild = { id: "custom", name, icon: "⚔️", level: curLvl, xp: curXp, custom: true };
  if (inp) inp.value = "";
  playSFX("levelup");
  saveGame();
  renderAll();
  notify(`🏰 Guilda "${name}" fundada com sucesso!`);
}

function claimGuildMission(gmId) {
  const gm = guildMissionsCatalog.find(m => m.id === gmId);
  if (!gm || (game.claimedGuildMissions || []).includes(gmId)) return;
  if (gm.progress(game) < gm.target) {
    notify("Progresso da missão de Guilda ainda incompleto!");
    return;
  }
  if (!game.claimedGuildMissions) game.claimedGuildMissions = [];
  game.claimedGuildMissions.push(gmId);
  addGuildXp(gm.guildXp);
  const c = gainCoins(gm.coins);
  game.gems += gm.gems || 0;
  game.classSpins = (game.classSpins || 0) + (gm.spins || 0);
  playSFX("levelup");
  saveGame();
  renderAll();
  notify(`🏰 Missão de Guilda entregue! +${gm.guildXp} XP Guilda, +${c} 🪙, +${gm.gems} 💎, +${gm.spins} Giro(s)!`);
}

function buyOrEquipMount(mountId, mode = "auto") {
  const m = mountsCatalog.find(mt => mt.id === mountId);
  if (!m) return;
  if (!game.unlockedMounts) game.unlockedMounts = ["none"];
  const unlocked = game.unlockedMounts.includes(mountId);
  if (unlocked && mode !== "buy") {
    game.equippedMount = mountId;
    playSFX("click");
    saveGame();
    renderAll();
    notify(mountId === "none" ? "🥾 Desmontou." : `${m.icon} Montaria equipada: ${m.name} (+${Math.round((m.speedMult - 1) * 100)}% Velocidade)!`);
    return;
  }
  if (!unlocked) {
    if (game.coins < m.priceCoins || game.gems < m.priceGems) {
      notify(`Necessário ${m.priceCoins} 🪙 e ${m.priceGems} 💎 para adquirir ${m.name}.`);
      return;
    }
    game.coins -= m.priceCoins;
    game.gems -= m.priceGems;
    game.unlockedMounts.push(mountId);
    game.equippedMount = mountId;
    playSFX("levelup");
    saveGame();
    renderAll();
    notify(`${m.icon} Nova Montaria adquirida e equipada: ${m.name}!`);
  }
}

function upgradeCompanion(compId) {
  const pet = companionsCatalog.find(c => c.id === compId);
  if (!pet || pet.id === "none" || !pet.unlocked(game)) return;
  if (!game.companionLevels) game.companionLevels = {};
  const lvl = game.companionLevels[compId] || 1;
  if (lvl >= 5) {
    notify(`${pet.name} já está no Nível Máximo (Nv.5)!`);
    return;
  }
  const cost = 70 * lvl;
  if (game.coins < cost) {
    notify(`Necessário ${cost} 🪙 para evoluir ${pet.name}.`);
    return;
  }
  game.coins -= cost;
  game.companionLevels[compId] = lvl + 1;
  playSFX("levelup");
  saveGame();
  renderAll();
  notify(`${pet.icon} ${pet.name} evoluiu para o Nível ${lvl + 1}! (+25% atributos & poder de assistência)`);
}

function switchActiveEvent(evtId) {
  if (!eventsCatalog.some(ev => ev.id === evtId)) return;
  game.activeEventId = evtId;
  playSFX("click");
  saveGame();
  renderAll();
}

function claimEventMission(emId) {
  const ev = eventsCatalog.find(e => e.id === game.activeEventId) || eventsCatalog[0];
  const m = ev.missions.find(ms => ms.id === emId);
  if (!m || (game.claimedEventMissions || []).includes(emId)) return;
  if (!m.check(game)) {
    notify("Complete o requisito do Evento primeiro!");
    return;
  }
  if (!game.claimedEventMissions) game.claimedEventMissions = [];
  game.claimedEventMissions.push(emId);
  const xpG = gainXP(m.xp);
  const coinG = gainCoins(m.coins);
  game.gems += m.gems || 0;
  if (ev.missions.every(ms => game.claimedEventMissions.includes(ms.id)) && ev.rewardItemId) {
    const it = shopCatalog.find(s => s.id === ev.rewardItemId);
    if (it) addInventoryItem(it, 1);
    notify(`🎉 EVENTO COMPLETO: ${ev.name}! Item exclusivo recebido: ${it ? it.name : "Relíquia"}!`);
  } else {
    notify(`🎁 Missão de Evento: +${xpG} XP, +${coinG} 🪙, +${m.gems} 💎!`);
  }
  playSFX("levelup");
  saveGame();
  renderAll();
}

function applyGfxQuality(q) {
  const valid = ["high", "medium", "low"].includes(q) ? q : "high";
  game.gfxQuality = valid;
  if (document.body && document.body.classList) {
    document.body.classList.toggle("gfx-low", valid === "low");
  }
  const sel = document.getElementById("gfxQualitySelect");
  if (sel) sel.value = valid;
}

function renderSocialPage() {
  // 1. Eventos Temporários
  const evtBox = document.getElementById("activeEventBox");
  const activeEv = eventsCatalog.find(e => e.id === game.activeEventId) || eventsCatalog[0];
  if (evtBox && activeEv) {
    const switchBtns = eventsCatalog.map(ev => `
      <button class="filter-pill ${ev.id === activeEv.id ? "active" : ""}" data-action="switch-event" data-id="${escapeHTML(ev.id)}">${escapeHTML(ev.badge)}</button>
    `).join("");
    const missionsHtml = activeEv.missions.map(m => {
      const done = (game.claimedEventMissions || []).includes(m.id);
      const ready = m.check(game) && !done;
      return `
        <div class="quest-item ${done ? "done" : ""}">
          <div>
            <span class="quest-name">${escapeHTML(m.name)}</span>
            <div class="quest-meta">Recompensa: <span class="quest-reward">+${m.xp} XP • +${m.coins} 🪙 • +${m.gems} 💎</span></div>
          </div>
          <div class="quest-actions">
            <button class="complete-btn" data-action="claim-event-mission" data-id="${escapeHTML(m.id)}" ${!ready ? "disabled" : ""}>
              ${done ? "Resgatado ✓" : ready ? "Resgatar 🎁" : "Em andamento"}
            </button>
          </div>
        </div>
      `;
    }).join("");
    evtBox.innerHTML = `
      <div class="panel-heading">
        <div>
          <span class="rarity-badge rarity-secret">${escapeHTML(activeEv.badge)} ATIVO</span>
          <h3 style="margin-top:4px;">${escapeHTML(activeEv.name)}</h3>
          <p class="muted">${escapeHTML(activeEv.desc)}</p>
        </div>
        <div style="display:flex;gap:6px;flex-wrap:wrap;align-items:center;">
          ${switchBtns}
          <button class="ultimate-btn" data-action="challenge-boss" data-id="${escapeHTML(activeEv.bossId)}">⚔ Chefe do Evento</button>
        </div>
      </div>
      <div class="quest-list">${missionsHtml}</div>
    `;
  }

  // 2. Guildas
  const gTag = document.getElementById("guildLevelTag");
  const gBox = document.getElementById("guildOverviewBox");
  const gSel = document.getElementById("guildSelectorBar");
  const gMissions = document.getElementById("guildMissionsList");
  const curG = game.guild || { id: "scout_corps", name: "Tropa de Exploração", icon: "🕊️", level: 1, xp: 0 };
  const gReq = curG.level * 120;
  const gDef = guildsCatalog.find(gd => gd.id === curG.id);
  if (gTag) gTag.textContent = `Guilda Nv. ${curG.level}/10`;
  if (gBox) {
    gBox.innerHTML = `
      <div class="skill-card equipped">
        <div>
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <span class="skill-icon">${escapeHTML(curG.icon)}</span>
            <span class="rarity-badge rarity-legendary">Nível ${curG.level}</span>
          </div>
          <h3>${escapeHTML(curG.name)}</h3>
          <p>${escapeHTML(gDef ? gDef.bonusDesc : "+ATK, +DEF e +Crítico por Nível de Guilda")}</p>
          <div class="xp-info"><span>XP da Guilda</span><span>${curG.xp}/${gReq} XP</span></div>
          <div class="progress-track"><div class="progress-fill" style="width:${Math.min(100, Math.round((curG.xp / gReq) * 100))}%"></div></div>
        </div>
      </div>
    `;
  }
  if (gSel) {
    gSel.innerHTML = guildsCatalog.map(gd => `
      <button type="button" class="secondary-btn ${curG.id === gd.id ? "active" : ""}" data-action="join-guild" data-id="${escapeHTML(gd.id)}">${gd.icon} ${escapeHTML(gd.name)}</button>
    `).join("");
  }
  if (gMissions) {
    gMissions.innerHTML = guildMissionsCatalog.map(gm => {
      const done = (game.claimedGuildMissions || []).includes(gm.id);
      const prog = Math.min(gm.target, gm.progress(game));
      const ready = prog >= gm.target && !done;
      return `
        <div class="quest-item ${done ? "done" : ""}">
          <div>
            <span class="quest-name">${escapeHTML(gm.name)}</span>
            <div class="quest-meta">Progresso: ${prog}/${gm.target} • <span class="quest-reward">+${gm.guildXp} XP Guilda • +${gm.coins} 🪙 • +${gm.gems} 💎 • +${gm.spins} Giro</span></div>
          </div>
          <div class="quest-actions">
            <button class="complete-btn" data-action="claim-guild-mission" data-id="${escapeHTML(gm.id)}" ${!ready ? "disabled" : ""}>
              ${done ? "Concluída ✓" : ready ? "Entregar" : `${prog}/${gm.target}`}
            </button>
          </div>
        </div>
      `;
    }).join("");
  }

  // 3. Montarias
  const mGrid = document.getElementById("mountsGrid");
  const mTag = document.getElementById("activeMountTag");
  const eqMount = mountsCatalog.find(m => m.id === game.equippedMount) || mountsCatalog[0];
  if (mTag) mTag.textContent = `${eqMount.icon} ${eqMount.name}`;
  if (mGrid) {
    mGrid.innerHTML = mountsCatalog.map(m => {
      const unlocked = (game.unlockedMounts || ["none"]).includes(m.id);
      const equipped = (game.equippedMount || "none") === m.id;
      return `
        <div class="skill-card ${unlocked ? (equipped ? "equipped" : "") : "locked"}">
          <div>
            <div style="display:flex;justify-content:space-between;align-items:center;">
              <span class="skill-icon">${m.icon}</span>
              <span class="rarity-badge ${equipped ? "rarity-legendary" : unlocked ? "rarity-rare" : "rarity-common"}">${equipped ? "Equipada ✓" : unlocked ? "Desbloqueada" : `${m.priceCoins} 🪙${m.priceGems ? ` + ${m.priceGems} 💎` : ""}`}</span>
            </div>
            <h3>${escapeHTML(m.name)}</h3>
            <p>${escapeHTML(m.desc)}</p>
          </div>
          <div class="skill-card-actions">
            <button data-action="buy-mount" data-id="${escapeHTML(m.id)}" ${equipped ? "disabled" : ""}>
              ${equipped ? "Em Uso ✓" : unlocked ? "Montar / Equipar" : `Adquirir (${m.priceCoins} 🪙${m.priceGems ? ` + ${m.priceGems}💎` : ""})`}
            </button>
          </div>
        </div>
      `;
    }).join("");
  }

  // 4. Ranking do Multiverso
  const rankTabBar = document.getElementById("rankingTabBar");
  const rankList = document.getElementById("rankingList");
  if (rankTabBar) {
    rankTabBar.querySelectorAll(".filter-pill").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.id === activeRankingTab);
    });
  }
  if (rankList) {
    const totals = getTotalStats();
    const myPower = totals.atk * 2 + totals.def * 2 + totals.spd * 2 + Math.round(totals.maxHp * 0.4) + Math.round(totals.maxMp * 0.3);
    const entries = [
      ...rankingRivalsCatalog.map(r => ({ ...r, isPlayer: false })),
      {
        name: `${game.name} (Você)`,
        anime: getActiveClassObj().name,
        level: game.level,
        power: myPower,
        bosses: (game.defeatedBosses || []).length,
        achievements: (game.unlockedAchievements || []).length,
        isPlayer: true
      }
    ].sort((a, b) => (b[activeRankingTab] || 0) - (a[activeRankingTab] || 0));

    rankList.innerHTML = entries.map((e, idx) => `
      <div class="quest-item ${e.isPlayer ? "done" : ""}" style="${e.isPlayer ? "border-color:var(--gold);background:rgba(246,196,83,0.12);" : ""}">
        <div>
          <span class="quest-name"><strong>#${idx + 1}</strong> ${e.isPlayer ? "⭐" : "🥷"} ${escapeHTML(e.name)} <small class="muted">(${escapeHTML(e.anime)})</small></span>
          <div class="quest-meta">Nível ${e.level} • Poder ${e.power} • Chefes ${e.bosses} • Conquistas ${e.achievements}</div>
        </div>
        <span class="rarity-badge ${idx === 0 ? "rarity-secret" : idx <= 2 ? "rarity-legendary" : "rarity-common"}">${e[activeRankingTab]} pts</span>
      </div>
    `).join("");
  }
}

function getProgressionHint(totals) {
  const totalBosses = enemiesCatalog.filter(e => e.isBoss).length;
  if ((game.totalCompleted || 0) === 0) {
    return "🌟 Próximo passo: abra <strong>Missões &amp; Foco</strong> e conclua sua 1ª tarefa real ou faça um Pomodoro para ganhar XP e Moedas.";
  }
  if ((game.battlesWon || 0) === 0) {
    return "⚔️ Próximo passo: entre no <strong>Mapa 2D</strong> ou na <strong>Arena de Combate</strong> e vença sua 1ª batalha para desbloquear melhorias.";
  }
  if ((game.dailies || []).length === 0) {
    return "📅 Dica de consistência: crie pelo menos <strong>1 Hábito Diário (Daily)</strong> em Missões &amp; Foco para multiplicar sua ofensiva!";
  }
  if ((game.unlockedStands || []).length === 0 && (game.standArrows || 0) > 0) {
    return "🏹 Você possui uma <strong>Flecha Requiem</strong>! Vá em <strong>Classes &amp; Stands</strong> e desperte seu primeiro Stand de JoJo.";
  }
  if ((game.statPoints || 0) > 0) {
    return `⚡ Você tem <strong>${game.statPoints} pts de atributo</strong> livres! Distribua na aba <strong>Personagem</strong> para fortalecer seu ATK/HP.`;
  }
  if (game.level >= 3 && (game.clearedDungeons || []).length === 0) {
    return "🏰 Nível 3+ alcançado! Entre na <strong>Arena de Combate</strong> e desafie a Masmorra <strong>Mansão das Sombras do Cairo</strong> para ganhar minérios.";
  }
  if ((game.dojoGarden && game.dojoGarden.plots || []).some(p => p && p.unlocked && !p.seedId)) {
    return "🌱 Dica do Dojo: você tem canteiros vazios no <strong>Pátio do Dojo</strong> — plante sementes espirituais para preparar poções!";
  }
  return `🌌 Jornada em curso: ${game.defeatedBosses.length}/${totalBosses} Chefes derrotados • Ofensiva ${getEffectiveStreak()}d (${totals.determinationPct || 0}% ATK bônus).`;
}

function renderStats() {
  const totals = getTotalStats();
  const maxXp = xpForNextLevel(game.level);
  const xpPercent = Math.min(100, Math.round((game.xp / maxXp) * 100));
  const hpPercent = Math.min(100, Math.round((game.hp / totals.maxHp) * 100));
  const mpPercent = Math.min(100, Math.round((game.mp / totals.maxMp) * 100));
  const effectiveStreak = getEffectiveStreak();
  const titleObj = titlesCatalog.find(t => t.id === game.title) || titlesCatalog[0];
  const clsObj = getActiveClassObj();
  const standObj = getActiveStandObj();
  const totalBosses = enemiesCatalog.filter(e => e.isBoss).length;

  const setText = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  };

  // Sidebar & Topbar
  setText("sideName", game.name);
  setText("sideLevel", `Nível ${game.level}`);
  setText("sideTitle", titleObj.name);
  setText("topSpins", game.classSpins || 0);
  setText("topRoutineEnergy", `${game.routineEnergy || 0}/${game.routineMaxEnergy || 100}`);
  setText("topEnergy", `${game.mp}/${totals.maxMp}`);
  setText("topCoins", game.coins);
  setText("topGems", game.gems);

  const pendingRoutines = game.quests.filter(q => !q.completed).length;
  setText("routineModeSummaryBadge", `${pendingRoutines} Missão(ões) Pendentes • ${game.routineEnergy || 0} 🔋`);
  setText("adventureModeSummaryBadge", `${zones.length} Mundos • Poder ${(totals.atk + totals.def + totals.spd)}`);

  // Home Dashboard
  setText("homeXP", `${game.totalXp} XP`);
  setText("homeXPSub", `${game.xp}/${maxXp} no nível atual`);
  setText("homeLevel", game.level);
  setText("homePointsSub", `${game.statPoints} pts de atributo livres`);
  setText("homeCompleted", game.totalCompleted);
  setText("homeBattlesSub", `${game.battlesWon} batalhas vencidas`);
  setText("homeStreak", `${effectiveStreak} ${effectiveStreak === 1 ? "dia" : "dias"}`);
  setText("homeBuffSub", `Determinação: +${totals.determinationPct || 0}% ATK${(game.streakFreezes || 0) > 0 ? ` • ❄️ ${game.streakFreezes}G` : ""}`);
  setText("levelLabel", `NÍVEL ${game.level}`);
  setText("xpCurrent", `${game.xp} XP`);
  setText("xpNeeded", `${maxXp} XP`);
  setText("homeHpText", `${game.hp} / ${totals.maxHp}`);
  setText("homeMpText", `${game.mp} / ${totals.maxMp}`);
  setText("homeCharacterName", game.name);
  setText("homeCharacterTitle", titleObj.name);
  setText("homeCharacterClass", `CLASSE: ${clsObj.name.toUpperCase()} (${getRarityMeta(clsObj.rarity).label.toUpperCase()})`);
  setText("homeZone", zones[game.zone]?.name || "Vila Inicial");

  // Character Page
  setText("previewName", game.name);
  setText("previewTitleTag", `${clsObj.name.toUpperCase()} • ${standObj.id !== "none" ? standObj.name.toUpperCase() : titleObj.name.toUpperCase()}`);
  setText("statPointsBadge", `${game.statPoints} Pontos disponíveis`);

  const xpBar = document.getElementById("xpBar");
  const hpBar = document.getElementById("homeHpBar");
  const mpBar = document.getElementById("homeMpBar");
  if (xpBar) xpBar.style.width = xpPercent + "%";
  if (hpBar) hpBar.style.width = hpPercent + "%";
  if (mpBar) mpBar.style.width = mpPercent + "%";

  const attrStrip = document.getElementById("homeAttributesStrip");
  if (attrStrip) {
    attrStrip.innerHTML = `
      <div class="attr-pill">⚔️ ATK <span>${totals.atk}</span></div>
      <div class="attr-pill">🛡️ DEF <span>${totals.def}</span></div>
      <div class="attr-pill">❤️ HP <span>${totals.maxHp}</span></div>
      <div class="attr-pill">💧 EN <span>${totals.maxMp}</span></div>
      <div class="attr-pill">💨 SPD <span>${totals.spd}</span></div>
      <div class="attr-pill">💥 CRIT <span>${totals.crit}%</span></div>
    `;
  }

  const eqBadges = document.getElementById("homeEquippedBadges");
  if (eqBadges) {
    const pet = companionsCatalog.find(c => c.id === game.companion);
    const mt = mountsCatalog.find(m => m.id === game.equippedMount);
    eqBadges.innerHTML = `
      <span class="mini-badge">👻 ${standObj.id !== "none" ? escapeHTML(standObj.name) : "Sem Stand"}</span>
      <span class="mini-badge">✨ ${game.equippedSkills.length}/4 Poderes</span>
      <span class="mini-badge">${pet ? `${pet.icon} ${escapeHTML(pet.name)}` : "Sem Pet"}</span>
      <span class="mini-badge">${mt && mt.id !== "none" ? `${mt.icon} ${escapeHTML(mt.name)}` : "🥾 A Pé"}</span>
      <span class="mini-badge">🏰 ${escapeHTML((game.guild && game.guild.name) || "Guilda")} (Nv.${(game.guild && game.guild.level) || 1})</span>
      <span class="mini-badge">🏯 Dojo Nv.${getDojoLevel()}</span>
    `;
  }

  const worldCards = document.getElementById("homeWorldCards");
  if (worldCards) {
    worldCards.innerHTML = `
      <div class="world-mini-card"><strong>${game.visitedZones.length}/${zones.length} Regiões</strong><small>Mundos explorados</small></div>
      <div class="world-mini-card"><strong>${game.openedChests.length}/${zones.length} Baús</strong><small>Tesouros encontrados</small></div>
      <div class="world-mini-card"><strong>${game.defeatedBosses.length}/${totalBosses} Chefes</strong><small>Lendas derrotadas</small></div>
      <div class="world-mini-card"><strong>${(game.unlockedStands || []).length}/${standsCatalog.length - 1} Stands</strong><small>Espíritos despertos</small></div>
    `;
  }

  const hintEl = document.getElementById("homeProgressionHint");
  if (hintEl) {
    hintEl.innerHTML = getProgressionHint(totals);
  }
}

function renderAll() {
  checkDailyReset();
  updateAchievements();
  renderStats();
  renderQuests();
  renderClassesAndStandsPage();
  renderCharacter();
  renderSkills();
  renderInventory();
  renderAnime();
  renderAchievements();
  renderDojo();
  renderDailies();
  renderGardenAndAlchemy();
  renderProductivityStats();
  renderDungeons();
  renderSocialPage();
  renderTimeAndAudioUI();
  drawMap();
  renderBattle();
}

let mapLoopId = null;
let battleLoopId = null;

function openPage(pageId, triggerButton = null) {
  document.querySelectorAll(".page").forEach(page => page.classList.remove("active"));
  document.querySelectorAll(".nav-btn").forEach(button => button.classList.remove("active"));

  const targetPage = document.getElementById("page-" + pageId);
  if (targetPage) targetPage.classList.add("active");

  const activeButton = triggerButton || document.querySelector(`.nav-btn[data-page="${pageId}"]`);
  if (activeButton) activeButton.classList.add("active");

  const pageTitles = {
    home: "Painel do aventureiro",
    map: "Mapa 2D do Multiverso (14 Mundos)",
    classes: "Roleta de Classes & Stands de JoJo",
    dojo: "Dojo Dimensional de Treinamento",
    battle: "Arena do Multiverso & Chefes",
    social: "Guildas, Montarias, Ranking & Eventos",
    character: "Personagem, Classe, Stand & Atributos",
    quests: "Missões, Foco & Consistência",
    skills: "Árvore de Habilidades",
    inventory: "Inventário, Forja & Loja",
    anime: "Universos de Anime",
    achievements: "Conquistas & Coleção",
    settings: "Configurações do Sistema"
  };
  const titleEl = document.getElementById("pageTitle");
  if (titleEl && pageTitles[pageId]) titleEl.textContent = pageTitles[pageId];

  if (pageId === "map") {
    syncMapState();
    startMapLoop();
    drawMap();
  } else {
    stopMapLoop();
  }

  if (pageId === "battle") {
    startBattleLoop();
    renderBattle();
  } else {
    stopBattleLoop();
  }

  if (pageId === "dojo") {
    renderDojo();
  }

  if (pageId === "classes") {
    renderClassesAndStandsPage();
  }

  if (pageId === "quests") {
    renderProductivityStats();
    drawFocusAvatar();
  }

  if (pageId === "social") {
    renderSocialPage();
  }
}

/* =========================================================
   12. MAPA 2D EXPANDIDO (8 MUNDOS 30x18), CÂMERA, MINI-MAPA E NPC MODAL
========================================================= */

const mapState = {
  x: game.mapX * TILE,
  y: game.mapY * TILE,
  dir: "down",
  frame: 0,
  frameTick: 0,
  moving: false,
  targetTile: null,
  auraTimer: 0,
  joystickVector: { vx: 0, vy: 0 },
  patrolEntities: [],
  patrolZone: -1
};

let mapBgCache = { zoneIdx: -1, canvas: null, w: 0, h: 0 };
let mapLoopTimeout = null;

function getZoneSecretSpot(zoneIdx) {
  const z = zones[zoneIdx] || zones[0];
  if (z.secretSpot) return z.secretSpot;
  const defaultBossMap = { 0: "madara_ten_tails", 4: "pucci_heaven" };
  return {
    x: 32,
    y: 3,
    id: `sec_${z.id}`,
    coins: 120 + zoneIdx * 30,
    gems: 4 + Math.floor(zoneIdx / 2),
    itemId: zoneIdx % 2 === 0 ? "stand_arrow_item" : "senzu",
    bossId: defaultBossMap[zoneIdx] || null
  };
}

const keysPressed = {};

function initZonePatrols(zoneIdx) {
  const z = zones[zoneIdx] || zones[0];
  mapState.patrolZone = zoneIdx;
  mapState.patrolEntities = (z.patrols || []).map((p, idx) => ({
    id: `${zoneIdx}-patrol-${idx}`,
    enemyId: p.enemyId,
    x: p.x * TILE,
    y: p.y * TILE,
    spawnX: p.x * TILE,
    spawnY: p.y * TILE,
    axis: idx % 2 === 0 ? "x" : "y",
    range: 3 * TILE,
    dirSign: 1,
    speed: 1.2,
    alive: true,
    respawnTick: 0,
    alerted: false
  }));
}

function syncMapState() {
  mapState.x = game.mapX * TILE;
  mapState.y = game.mapY * TILE;
  if (mapState.patrolZone !== game.zone) {
    initZonePatrols(game.zone);
  }
}

function isPixelWalkable(px, py) {
  const margin = 10;
  const corners = [
    [px + margin, py + margin],
    [px + TILE - margin, py + margin],
    [px + margin, py + TILE - margin],
    [px + TILE - margin, py + TILE - margin]
  ];
  return corners.every(([cx, cy]) => {
    const tx = Math.floor(cx / TILE);
    const ty = Math.floor(cy / TILE);
    return !isBlockedIn(game.zone, tx, ty);
  });
}

function getMapMoveSpeed() {
  const mount = mountsCatalog.find(m => m.id === game.equippedMount);
  return 3.4 * (mount ? mount.speedMult : 1.0);
}

function stepTowardTarget() {
  if (!mapState.targetTile) return { dx: 0, dy: 0 };
  const targetPx = mapState.targetTile.x * TILE;
  const targetPy = mapState.targetTile.y * TILE;
  const diffX = targetPx - mapState.x;
  const diffY = targetPy - mapState.y;

  if (Math.hypot(diffX, diffY) < 4) {
    mapState.x = targetPx;
    mapState.y = targetPy;
    mapState.targetTile = null;
    return { dx: 0, dy: 0 };
  }

  const speed = getMapMoveSpeed();
  return {
    dx: Math.abs(diffX) > 2 ? Math.sign(diffX) * Math.min(speed, Math.abs(diffX)) : 0,
    dy: Math.abs(diffY) > 2 ? Math.sign(diffY) * Math.min(speed, Math.abs(diffY)) : 0
  };
}

function updateEnemyPatrols() {
  if (mapState.patrolZone !== game.zone) {
    initZonePatrols(game.zone);
  }

  const pCenterX = mapState.x + TILE / 2;
  const pCenterY = mapState.y + TILE / 2;

  mapState.patrolEntities.forEach(ent => {
    if (!ent.alive) {
      ent.respawnTick--;
      if (ent.respawnTick <= 0) {
        ent.alive = true;
        ent.x = ent.spawnX;
        ent.y = ent.spawnY;
      }
      return;
    }

    const eCenterX = ent.x + TILE / 2;
    const eCenterY = ent.y + TILE / 2;
    const distToPlayer = Math.hypot(pCenterX - eCenterX, pCenterY - eCenterY);

    ent.alerted = distToPlayer < TILE * 2.8;

    const nextX = ent.axis === "x" ? ent.x + ent.speed * ent.dirSign : ent.x;
    const nextY = ent.axis === "y" ? ent.y + ent.speed * ent.dirSign : ent.y;

    if (
      (ent.axis === "x" && Math.abs(nextX - ent.spawnX) >= ent.range) ||
      (ent.axis === "y" && Math.abs(nextY - ent.spawnY) >= ent.range) ||
      !isPixelWalkable(nextX, nextY)
    ) {
      ent.dirSign *= -1;
    } else {
      ent.x = nextX;
      ent.y = nextY;
    }

    if (distToPlayer < TILE * 0.72) {
      ent.alive = false;
      ent.respawnTick = 600;
      const enemyRef = enemiesCatalog.find(e => e.id === ent.enemyId);
      notify(`⚔️ Emboscada! ${enemyRef ? enemyRef.name : "Inimigo"} desafiou você!`);
      selectBattleEnemy(ent.enemyId);
      openPage("battle");
    }
  });
}

function updateMap() {
  const speed = getMapMoveSpeed();
  let dx = 0;
  let dy = 0;

  if (keysPressed["ArrowUp"] || keysPressed["w"]) { dy -= speed; mapState.dir = "up"; mapState.targetTile = null; }
  if (keysPressed["ArrowDown"] || keysPressed["s"]) { dy += speed; mapState.dir = "down"; mapState.targetTile = null; }
  if (keysPressed["ArrowLeft"] || keysPressed["a"]) { dx -= speed; mapState.dir = "left"; mapState.targetTile = null; }
  if (keysPressed["ArrowRight"] || keysPressed["d"]) { dx += speed; mapState.dir = "right"; mapState.targetTile = null; }

  if (dx === 0 && dy === 0 && mapState.joystickVector && (Math.abs(mapState.joystickVector.vx) > 0.08 || Math.abs(mapState.joystickVector.vy) > 0.08)) {
    mapState.targetTile = null;
    dx = mapState.joystickVector.vx * speed;
    dy = mapState.joystickVector.vy * speed;
    if (Math.abs(dx) > Math.abs(dy)) mapState.dir = dx > 0 ? "right" : "left";
    else mapState.dir = dy > 0 ? "down" : "up";
  }

  if (dx === 0 && dy === 0 && mapState.targetTile) {
    const step = stepTowardTarget();
    dx = step.dx;
    dy = step.dy;
    if (Math.abs(dx) > Math.abs(dy)) mapState.dir = dx > 0 ? "right" : "left";
    else if (dy !== 0) mapState.dir = dy > 0 ? "down" : "up";
  }

  if (dx !== 0 && dy !== 0 && !mapState.joystickVector?.vx && !mapState.joystickVector?.vy) {
    dx *= 0.7071;
    dy *= 0.7071;
  }

  mapState.moving = false;
  if (dx !== 0 && isPixelWalkable(mapState.x + dx, mapState.y)) {
    mapState.x += dx;
    mapState.moving = true;
  }
  if (dy !== 0 && isPixelWalkable(mapState.x, mapState.y + dy)) {
    mapState.y += dy;
    mapState.moving = true;
  }

  if (!mapState.moving && mapState.targetTile) {
    mapState.targetTile = null;
  }

  const newTileX = Math.max(1, Math.min(MAP_WIDTH - 2, Math.round(mapState.x / TILE)));
  const newTileY = Math.max(1, Math.min(MAP_HEIGHT - 2, Math.round(mapState.y / TILE)));
  if (newTileX !== game.mapX || newTileY !== game.mapY) {
    game.mapX = newTileX;
    game.mapY = newTileY;
    scheduleSave();
  }

  mapState.frameTick++;
  if (mapState.moving) {
    if (mapState.frameTick % 7 === 0) mapState.frame = (mapState.frame + 1) % 4;
  } else if (mapState.frameTick % 24 === 0) {
    mapState.frame = (mapState.frame + 1) % 2;
  }

  if (mapState.auraTimer > 0) mapState.auraTimer--;

  updateEnemyPatrols();
}

function getTerrain() {
  return zones[game.zone] || zones[0];
}

function renderZoneSelector() {
  const terrain = getTerrain();
  const zName = document.getElementById("zoneName");
  if (zName) zName.textContent = `${terrain.name} (${terrain.anime})`;

  const container = document.getElementById("zoneTravelButtons");
  if (!container) return;
  container.innerHTML = zones.map((z, idx) => {
    const unlocked = game.level >= (z.minLevel || 1);
    return `
      <button class="zone-pill ${game.zone === idx ? "active" : ""}" data-action="travel-zone" data-id="${idx}" ${!unlocked ? "disabled" : ""}>
        ${escapeHTML(z.name)} ${!unlocked ? `(Nv.${z.minLevel})` : ""}
      </button>
    `;
  }).join("");
}

const MAP_BIOME_PALETTES = [
  { grass: "#88b446", grass2: "#7da83d", path: "#eccb7a", pathBorder: "#b88a44", cliff: "#5c4028", cliffTop: "#c29b61", leafLight: "#a3e635", leafMid: "#4d9e22", leafDark: "#1e4d10" }, // 0: Konoha
  { grass: "#64748b", grass2: "#57667a", path: "#cbd5e1", pathBorder: "#475569", cliff: "#334155", cliffTop: "#94a3b8", leafLight: "#38bdf8", leafMid: "#0284c7", leafDark: "#0f172a" }, // 1: Cidade Heróis
  { grass: "#7bc678", grass2: "#6ab867", path: "#f5d78e", pathBorder: "#c29b53", cliff: "#6b4c35", cliffTop: "#d6b47c", leafLight: "#bef264", leafMid: "#65a30d", leafDark: "#365314" }, // 2: Ilha Pirata
  { grass: "#4c3b6e", grass2: "#423261", path: "#b39ddb", pathBorder: "#67508c", cliff: "#2e2147", cliffTop: "#7e68a8", leafLight: "#f0abfc", leafMid: "#c084fc", leafDark: "#581c87" }, // 3: Floresta Glicínias
  { grass: "#deb878", grass2: "#d2ab68", path: "#f3d79b", pathBorder: "#a67c3e", cliff: "#6e4e2e", cliffTop: "#cfa76e", leafLight: "#fde047", leafMid: "#ca8a04", leafDark: "#713f12" }, // 4: Cairo JoJo
  { grass: "#334155", grass2: "#293548", path: "#64748b", pathBorder: "#1e293b", cliff: "#1e1b4b", cliffTop: "#475569", leafLight: "#f43f5e", leafMid: "#be123c", leafDark: "#4c0519" }, // 5: Shibuya
  { grass: "#94a3b8", grass2: "#8494aa", path: "#f1f5f9", pathBorder: "#64748b", cliff: "#475569", cliffTop: "#cbd5e1", leafLight: "#f9a8d4", leafMid: "#ec4899", leafDark: "#831843" }, // 6: Seireitei
  { grass: "#7dd3fc", grass2: "#67c6f7", path: "#fef08a", pathBorder: "#ca8a04", cliff: "#4338ca", cliffTop: "#a5b4fc", leafLight: "#fde047", leafMid: "#eab308", leafDark: "#78350f" }, // 7: Templo Z
  { grass: "#7d8b74", grass2: "#707e68", path: "#d6cec2", pathBorder: "#78716c", cliff: "#44403c", cliffTop: "#a8a29e", leafLight: "#fbbf24", leafMid: "#b45309", leafDark: "#451a03" }, // 8: Central City (FMA)
  { grass: "#9a8c56", grass2: "#8a7d4a", path: "#cbd5e1", pathBorder: "#64748b", cliff: "#57534e", cliffTop: "#d6d3d1", leafLight: "#f97316", leafMid: "#b45309", leafDark: "#431407" }, // 9: Shiganshina (AoT)
  { grass: "#1e293b", grass2: "#172030", path: "#38bdf8", pathBorder: "#0284c7", cliff: "#312e81", cliffTop: "#818cf8", leafLight: "#67e8f9", leafMid: "#0891b2", leafDark: "#083344" }, // 10: Torre Celestial (HxH)
  { grass: "#88a45c", grass2: "#7a964f", path: "#f5d79b", pathBorder: "#b45309", cliff: "#5c4033", cliffTop: "#fda4af", leafLight: "#f9a8d4", leafMid: "#f472b6", leafDark: "#9d174d" }, // 11: Wano (One Piece)
  { grass: "#3e6b48", grass2: "#345b3d", path: "#cbd5e1", pathBorder: "#475569", cliff: "#27303f", cliffTop: "#94a3b8", leafLight: "#4ade80", leafMid: "#15803d", leafDark: "#14532d" }, // 12: Reino do Trevo (Black Clover)
  { grass: "#2e2640", grass2: "#251d36", path: "#6366f1", pathBorder: "#312e81", cliff: "#17142b", cliffTop: "#818cf8", leafLight: "#a78bfa", leafMid: "#6d28d9", leafDark: "#2e1065" }  // 13: Ilha Jeju (Solo Leveling)
];

function drawMapStaticLayer(ctx, terrain, pal, startCol, endCol, startRow, endRow) {
  for (let y = startRow; y <= endRow; y++) {
    for (let x = startCol; x <= endCol; x++) {
      const cell = terrain.layout[y][x];
      const px = x * TILE;
      const py = y * TILE;
      const hash = (x * 19 + y * 37) % 17;

      // 1. Grama / Terreno
      ctx.fillStyle = (x + y) % 2 === 0 ? pal.grass : pal.grass2;
      ctx.fillRect(px, py, TILE, TILE);

      ctx.fillStyle = shade(pal.grass, -14);
      ctx.fillRect(px + 6, py + 10, 4, 3);
      ctx.fillRect(px + 8, py + 8, 2, 3);
      ctx.fillRect(px + 30, py + 28, 4, 3);
      ctx.fillStyle = shade(pal.grass, 16);
      ctx.fillRect(px + 18, py + 34, 4, 3);

      if (cell !== "1" && y > 0 && terrain.layout[y - 1][x] === "1") {
        ctx.fillStyle = "rgba(0,0,0,0.22)";
        ctx.fillRect(px, py, TILE, 6);
      }

      if (cell === "0" && hash < 4) {
        const flowerColors = ["#ef4444", "#3b82f6", "#facc15", "#f472b6"];
        ctx.fillStyle = "#15803d";
        ctx.fillRect(px + 22, py + 18, 4, 4);
        ctx.fillStyle = flowerColors[hash];
        ctx.fillRect(px + 21, py + 16, 4, 4);
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(px + 22, py + 17, 2, 2);
      } else if (cell === "0" && hash === 7) {
        ctx.fillStyle = pal.leafDark;
        ctx.fillRect(px + 8, py + 12, 32, 24);
        ctx.fillStyle = pal.leafMid;
        ctx.fillRect(px + 10, py + 10, 28, 22);
        ctx.fillStyle = pal.leafLight;
        ctx.fillRect(px + 12, py + 12, 6, 8);
        ctx.fillRect(px + 24, py + 12, 6, 8);
      }

      if (cell === "1") {
        ctx.fillStyle = "#1c1209";
        ctx.fillRect(px, py, TILE, TILE);
        ctx.fillStyle = pal.cliffTop;
        ctx.fillRect(px + 2, py + 2, TILE - 4, 10);
        ctx.fillStyle = pal.cliff;
        ctx.fillRect(px + 2, py + 12, TILE - 4, TILE - 14);
        ctx.fillStyle = shade(pal.cliff, -22);
        ctx.fillRect(px + 8, py + 12, 6, TILE - 14);
        ctx.fillRect(px + 24, py + 12, 8, TILE - 14);
        ctx.fillRect(px + 38, py + 12, 4, TILE - 14);
        ctx.fillStyle = pal.cliffTop;
        ctx.fillRect(px + 6, py + 18, 4, 3);
        ctx.fillRect(px + 20, py + 28, 4, 3);

        if (y === 0 && (x === 14 || x === 15)) {
          ctx.fillStyle = "#090b10";
          ctx.beginPath();
          ctx.arc(px + 24, py + 44, 18, Math.PI, 0);
          ctx.fill();
        }
      } else if (cell === "2") {
        ctx.fillStyle = pal.pathBorder;
        ctx.fillRect(px, py, TILE, TILE);
        ctx.fillStyle = pal.path;
        ctx.fillRect(px + 3, py + 3, TILE - 6, TILE - 6);
        ctx.fillStyle = shade(pal.path, -16);
        ctx.fillRect(px + 8, py + 10, 5, 4);
        ctx.fillRect(px + 28, py + 24, 6, 4);
        ctx.fillRect(px + 16, py + 34, 4, 3);
        ctx.fillStyle = shade(pal.path, 14);
        ctx.fillRect(px + 20, py + 12, 8, 5);
      } else if (cell === "3") {
        // Rio / Água bloqueada
        ctx.fillStyle = "#0369a1";
        ctx.fillRect(px, py, TILE, TILE);
        ctx.fillStyle = "#0284c7";
        ctx.fillRect(px + 4, py, TILE - 8, TILE);
        ctx.fillStyle = "#7dd3fc";
        ctx.fillRect(px + 10, py + 12, 14, 3);
        ctx.fillRect(px + 22, py + 32, 12, 3);
      } else if (cell === "4") {
        // Ponte de Madeira sobre o rio
        ctx.fillStyle = "#0369a1";
        ctx.fillRect(px, py, TILE, TILE);
        ctx.fillStyle = "#451a03";
        ctx.fillRect(px, py + 6, TILE, TILE - 12);
        ctx.fillStyle = "#92400e";
        for (let plank = 4; plank < TILE; plank += 10) {
          ctx.fillRect(px + plank, py + 8, 7, TILE - 16);
        }
        ctx.fillStyle = "#b45309";
        ctx.fillRect(px, py + 4, TILE, 4);
        ctx.fillRect(px, py + TILE - 8, TILE, 4);
      } else if (cell === "5") {
        // Passagem Secreta escondida para área secreta!
        ctx.fillStyle = "#0369a1";
        ctx.fillRect(px, py, TILE, TILE);
        ctx.fillStyle = "#312e81";
        ctx.fillRect(px + 2, py + 6, TILE - 4, TILE - 12);
        ctx.fillStyle = "#facc15";
        ctx.fillRect(px + 8, py + 16, TILE - 16, 16);
        ctx.fillStyle = "#fef08a";
        ctx.fillRect(px + 16, py + 20, 16, 8);
      }
    }
  }

  // Cercas de Madeira Estilo Vila RPG
  for (let fx = 8; fx <= 13; fx++) {
    const fpx = fx * TILE;
    const fpy = 6 * TILE;
    ctx.fillStyle = "#3e2723";
    ctx.fillRect(fpx + 4, fpy + 20, 8, 22);
    ctx.fillRect(fpx + 28, fpy + 20, 8, 22);
    ctx.fillStyle = "#8d6e63";
    ctx.fillRect(fpx + 6, fpy + 22, 4, 18);
    ctx.fillRect(fpx + 30, fpy + 22, 4, 18);
    ctx.fillStyle = "#6d4c41";
    ctx.fillRect(fpx, fpy + 26, TILE, 4);
    ctx.fillRect(fpx, fpy + 34, TILE, 4);
  }

  // Árvores em Camadas
  terrain.trees.forEach(([tx, ty]) => {
    const px = tx * TILE;
    const py = ty * TILE;
    ctx.fillStyle = "rgba(0,0,0,0.35)";
    ctx.beginPath();
    ctx.ellipse(px + 24, py + 42, 18, 7, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#27160c";
    ctx.fillRect(px + 16, py + 24, 16, 19);
    ctx.fillRect(px + 13, py + 38, 22, 5);
    ctx.fillStyle = "#5c3a21";
    ctx.fillRect(px + 18, py + 25, 12, 17);
    ctx.fillStyle = "#855836";
    ctx.fillRect(px + 19, py + 25, 4, 16);

    ctx.fillStyle = "#090b10";
    ctx.beginPath(); ctx.arc(px + 24, py + 16, 20, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = pal.leafDark;
    ctx.beginPath(); ctx.arc(px + 24, py + 18, 18, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = pal.leafMid;
    ctx.beginPath(); ctx.arc(px + 24, py + 14, 16, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = pal.leafLight;
    ctx.beginPath(); ctx.arc(px + 19, py + 10, 10, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(px + 28, py + 12, 7, 0, Math.PI * 2); ctx.fill();
  });

  // Casa de Madeira / Guilda
  const hx = (terrain.npcPos.x - 1) * TILE;
  const hy = Math.max(TILE, (terrain.npcPos.y - 2) * TILE);
  ctx.fillStyle = "rgba(0,0,0,0.38)";
  ctx.fillRect(hx - 8, hy + 8, TILE * 2 + 16, TILE + 12);
  ctx.fillStyle = "#334155";
  ctx.fillRect(hx - 8, hy + 38, 26, 12);
  ctx.fillRect(hx + TILE * 2 - 18, hy + 38, 26, 12);
  ctx.fillStyle = "#64748b";
  ctx.fillRect(hx - 6, hy + 40, 10, 4);
  ctx.fillRect(hx + 6, hy + 40, 10, 4);
  ctx.fillRect(hx + TILE * 2 - 16, hy + 40, 10, 4);

  ctx.fillStyle = "#27160c";
  ctx.fillRect(hx - 2, hy - 6, TILE * 2 + 4, TILE + 14);
  ctx.fillStyle = "#9c6644";
  ctx.fillRect(hx + 2, hy + 14, TILE * 2 - 4, 32);
  ctx.fillStyle = "#7f5539";
  for (let wy = hy + 18; wy < hy + 44; wy += 6) {
    ctx.fillRect(hx + 2, wy, TILE * 2 - 4, 2);
  }

  ctx.fillStyle = "#1e293b";
  ctx.fillRect(hx - 6, hy - 4, TILE * 2 + 12, 20);
  ctx.fillStyle = "#475569";
  for (let rx = hx - 2; rx < hx + TILE * 2 + 4; rx += 8) {
    ctx.fillRect(rx, hy - 2, 6, 7);
    ctx.fillRect(rx + 2, hy + 7, 6, 7);
  }
  ctx.fillStyle = "#38bdf8";
  ctx.fillRect(hx + 8, hy + 2, 4, 4);
  ctx.fillRect(hx + TILE * 2 - 16, hy + 6, 4, 4);

  ctx.fillStyle = "#3e2723";
  ctx.fillRect(hx + TILE - 10, hy + 22, 20, 24);
  ctx.fillStyle = "#5d4037";
  ctx.fillRect(hx + TILE - 8, hy + 24, 16, 20);
  ctx.fillStyle = "#3e2723";
  ctx.fillRect(hx + 8, hy + 22, 16, 14);
  ctx.fillRect(hx + TILE * 2 - 24, hy + 22, 16, 14);
  ctx.fillStyle = "#bae6fd";
  ctx.fillRect(hx + 10, hy + 24, 12, 10);
  ctx.fillRect(hx + TILE * 2 - 22, hy + 24, 12, 10);
  ctx.fillStyle = "#22c55e";
  ctx.fillRect(hx + 10, hy + 38, 8, 6);
  ctx.fillRect(hx + TILE * 2 - 18, hy + 38, 8, 6);
  ctx.fillStyle = "#38bdf8";
  ctx.fillRect(hx + 12, hy + 36, 4, 4);
  ctx.fillStyle = "#facc15";
  ctx.fillRect(hx + TILE * 2 - 16, hy + 36, 4, 4);
}

function getOrBuildMapBgCache(zoneIdx, terrain, pal) {
  const worldW = MAP_WIDTH * TILE;
  const worldH = MAP_HEIGHT * TILE;
  if (mapBgCache.zoneIdx === zoneIdx && mapBgCache.canvas && mapBgCache.w === worldW && mapBgCache.h === worldH) {
    return mapBgCache.canvas;
  }
  if (typeof document === "undefined" || typeof document.createElement !== "function") return null;
  try {
    const off = document.createElement("canvas");
    off.width = worldW;
    off.height = worldH;
    const octx = off.getContext && off.getContext("2d");
    if (!octx) return null;
    drawMapStaticLayer(octx, terrain, pal, 0, MAP_WIDTH - 1, 0, MAP_HEIGHT - 1);
    mapBgCache = { zoneIdx, canvas: off, w: worldW, h: worldH };
    return off;
  } catch {
    return null;
  }
}

function drawMap() {
  renderZoneSelector();
  if (mapState.patrolZone !== game.zone) {
    initZonePatrols(game.zone);
  }
  const mapPage = document.getElementById("page-map");
  if (mapPage && mapPage.classList && !mapPage.classList.contains("active")) return;
  const canvas = document.getElementById("gameMap");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const terrain = getTerrain();
  const worldW = MAP_WIDTH * TILE;
  const worldH = MAP_HEIGHT * TILE;

  const camX = Math.max(0, Math.min(worldW - VIEW_WIDTH, Math.round(mapState.x + TILE / 2 - VIEW_WIDTH / 2)));
  const camY = Math.max(0, Math.min(worldH - VIEW_HEIGHT, Math.round(mapState.y + TILE / 2 - VIEW_HEIGHT / 2)));

  ctx.clearRect(0, 0, VIEW_WIDTH, VIEW_HEIGHT);
  ctx.save();
  ctx.translate(-camX, -camY);

  const pal = MAP_BIOME_PALETTES[game.zone] || MAP_BIOME_PALETTES[0];
  const cachedBg = (typeof ctx.drawImage === "function") ? getOrBuildMapBgCache(game.zone, terrain, pal) : null;
  if (cachedBg && typeof ctx.drawImage === "function") {
    ctx.drawImage(cachedBg, camX, camY, VIEW_WIDTH, VIEW_HEIGHT, camX, camY, VIEW_WIDTH, VIEW_HEIGHT);
  } else {
    const startCol = Math.max(0, Math.floor(camX / TILE));
    const endCol = Math.min(MAP_WIDTH - 1, Math.ceil((camX + VIEW_WIDTH) / TILE));
    const startRow = Math.max(0, Math.floor(camY / TILE));
    const endRow = Math.min(MAP_HEIGHT - 1, Math.ceil((camY + VIEW_HEIGHT) / TILE));
    drawMapStaticLayer(ctx, terrain, pal, startCol, endCol, startRow, endRow);
  }

  // Portão Torii Tradicional (Entrada do Dojo Pessoal)
  if (terrain.dojoPos) {
    const dx = terrain.dojoPos.x * TILE;
    const dy = terrain.dojoPos.y * TILE;
    ctx.fillStyle = "rgba(0,0,0,0.4)";
    ctx.fillRect(dx + 4, dy + 38, 40, 6);
    ctx.fillStyle = "#090b10";
    ctx.fillRect(dx + 2, dy + 2, 44, 12);
    ctx.fillRect(dx + 8, dy + 12, 8, 32);
    ctx.fillRect(dx + 32, dy + 12, 8, 32);
    ctx.fillStyle = "#dc2626";
    ctx.fillRect(dx + 4, dy + 4, 40, 5);
    ctx.fillRect(dx + 6, dy + 11, 36, 4);
    ctx.fillRect(dx + 10, dy + 12, 5, 30);
    ctx.fillRect(dx + 33, dy + 12, 5, 30);
    ctx.fillStyle = "#fbbf24";
    ctx.fillRect(dx + 20, dy + 5, 8, 8);
    // Placa de madeira estilo RPG
    ctx.fillStyle = "#451a03";
    ctx.fillRect(dx - 4, dy - 16, 56, 15);
    ctx.strokeStyle = "#fbbf24";
    ctx.lineWidth = 1.5;
    ctx.strokeRect(dx - 4, dy - 16, 56, 15);
    ctx.fillStyle = "#fef08a";
    ctx.font = "700 10px 'Chakra Petch', sans-serif";
    ctx.fillText("🏯 DOJO", dx + 4, dy - 5);
  }

  // Altar / Área Secreta além do Rio (Relíquia & Chefe Secreto)
  const secretSpot = getZoneSecretSpot(game.zone);
  if (secretSpot) {
    const sxp = secretSpot.x * TILE;
    const syp = secretSpot.y * TILE;
    const secOpened = game.openedChests.includes(secretSpot.id);
    const secPulse = Math.sin(mapState.frameTick * 0.14) * 3;
    ctx.save();
    ctx.fillStyle = secOpened ? "rgba(100,116,139,0.28)" : "rgba(192, 132, 252, 0.32)";
    ctx.beginPath(); ctx.arc(sxp + 24, syp + 24, 19 + secPulse * 0.4, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = secOpened ? "#475569" : (secretSpot.bossId ? "#dc2626" : "#a855f7");
    ctx.fillRect(sxp + 14, syp + 12, 20, 22);
    ctx.fillStyle = "#fde047";
    ctx.fillRect(sxp + 19, syp + 17, 10, 10);
    ctx.fillStyle = "#fef08a";
    ctx.font = "700 9px 'Chakra Petch', sans-serif";
    ctx.fillText(secretSpot.bossId ? "💀 SEGREDO" : "🔮 SEGREDO", sxp - 2, syp - 6);
    ctx.restore();
  }

  // Baú de Tesouro Detalhado
  if (terrain.chestPos) {
    const cx = terrain.chestPos.x * TILE;
    const cy = terrain.chestPos.y * TILE;
    const opened = game.openedChests.includes(terrain.chestPos.id);

    ctx.fillStyle = "rgba(0,0,0,0.45)";
    ctx.fillRect(cx + 8, cy + 35, 32, 6);
    ctx.fillStyle = "#090b10";
    ctx.fillRect(cx + 8, cy + 10, 32, 28);
    ctx.fillStyle = opened ? "#475569" : "#b45309";
    ctx.fillRect(cx + 10, cy + 16, 28, 20);
    ctx.fillStyle = opened ? "#94a3b8" : "#fbbf24";
    ctx.fillRect(cx + 10, cy + 12, 28, 6);
    ctx.fillRect(cx + 10, cy + 23, 28, 3);
    ctx.fillStyle = "#fef08a";
    ctx.fillRect(cx + 21, cy + 21, 6, 7);
  }

  // Portal Dimensional Estilizado
  const portalX = terrain.portalPos.x * TILE;
  const portalY = terrain.portalPos.y * TILE;
  const pulse = Math.sin(mapState.frameTick * 0.12) * 3;

  ctx.save();
  ctx.fillStyle = "#090b10";
  ctx.beginPath(); ctx.arc(portalX + 24, portalY + 24, 20, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = "#38bdf8";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(portalX + 24, portalY + 24, 16 + pulse * 0.4, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = "#0284c7";
  ctx.beginPath();
  ctx.arc(portalX + 24, portalY + 24, 12, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#e0f2fe";
  ctx.beginPath();
  ctx.arc(portalX + 24, portalY + 24, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Mestre NPC + Balão de Exclamação "!!" Estilo Pokémon GBA (Imagem 4!)
  const npcX = terrain.npcPos.x * TILE;
  const npcY = terrain.npcPos.y * TILE;
  drawSprite(ctx, terrain.npcLook, npcX + 4, npcY + 2, 2.5, {
    frame: Math.floor(mapState.frameTick / 20) % 2,
    dir: "down",
    moving: false,
    auraColor: "#fbbf24"
  });

  // Balão de diálogo branco com "!!" vermelho acima do Mestre (exatamente como na Imagem 4!)
  ctx.fillStyle = "#090b10";
  ctx.beginPath(); ctx.ellipse(npcX + 24, npcY - 12, 15, 10, 0, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#ffffff";
  ctx.beginPath(); ctx.ellipse(npcX + 24, npcY - 12, 13, 8, 0, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#dc2626";
  ctx.font = "900 12px 'Chakra Petch', sans-serif";
  ctx.fillText("!!", npcX + 19, npcY - 8);

  // Placa do nome do Mestre
  ctx.fillStyle = "#3e2723";
  ctx.fillRect(npcX - 18, npcY + 42, 84, 15);
  ctx.strokeStyle = "#fbbf24";
  ctx.lineWidth = 1.5;
  ctx.strokeRect(npcX - 18, npcY + 42, 84, 15);
  ctx.fillStyle = "#fef08a";
  ctx.font = "700 10px 'Chakra Petch', sans-serif";
  ctx.fillText(terrain.npc, npcX - 12, npcY + 53);

  // Inimigos em Patrulha Viva + Balão de Alerta "!!"
  mapState.patrolEntities.forEach(ent => {
    if (!ent.alive) return;
    const enemyData = enemiesCatalog.find(e => e.id === ent.enemyId);
    if (!enemyData) return;

    drawSprite(ctx, enemyData.look, Math.round(ent.x) + 6, Math.round(ent.y) + 4, 2.2, {
      frame: Math.floor(mapState.frameTick / 10) % 4,
      dir: ent.dirSign > 0 ? "right" : "left",
      moving: true,
      auraColor: enemyData.isBoss ? "#ef4444" : "#f59e0b",
      standId: enemyData.standId || null
    });

    if (ent.alerted) {
      ctx.fillStyle = "#ffffff";
      ctx.beginPath(); ctx.ellipse(Math.round(ent.x) + 24, Math.round(ent.y) - 10, 12, 8, 0, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#dc2626";
      ctx.font = "900 11px 'Chakra Petch', sans-serif";
      ctx.fillText("!!", Math.round(ent.x) + 19, Math.round(ent.y) - 6);
    }
  });

  // Companheiro seguindo o jogador
  if (game.companion && game.companion !== "none") {
    const offsetMap = {
      down: { x: -20, y: -14 },
      up: { x: -20, y: 20 },
      left: { x: 26, y: 6 },
      right: { x: -26, y: 6 }
    };
    const off = offsetMap[mapState.dir] || offsetMap.down;
    drawCompanionSprite(ctx, game.companion, Math.round(mapState.x + off.x), Math.round(mapState.y + off.y), 2.2, mapState.frame);
  }

  // Montaria + Jogador
  const cls = getActiveClassObj();
  if (game.equippedMount && game.equippedMount !== "none") {
    drawMountSprite(ctx, game.equippedMount, Math.round(mapState.x) + 4, Math.round(mapState.y) + 12, 2, mapState.frame);
  }
  const customAuraColor = game.auraStyle && game.auraStyle !== "auto" ? game.auraStyle : null;
  drawSprite(ctx, getGameLook(), Math.round(mapState.x) + 8, Math.round(mapState.y) + (game.equippedMount && game.equippedMount !== "none" ? 2 : 6), 2, {
    frame: mapState.frame,
    dir: mapState.dir,
    moving: mapState.moving,
    auraColor: mapState.auraTimer > 0 ? "#f6c453" : (customAuraColor || (game.equippedSkills.length ? (cls ? cls.ultColor : "#9565ff") : null)),
    hasSword: Boolean(game.equippedItems.weapon),
    standId: game.equippedStand
  });

  ctx.restore();

  // Ciclo Dia / Entardecer / Noite
  const period = getCurrentTimePeriod();
  if (period === "sunset") {
    ctx.fillStyle = "rgba(251, 146, 60, 0.14)";
    ctx.fillRect(0, 0, VIEW_WIDTH, VIEW_HEIGHT);
  } else if (period === "night") {
    ctx.fillStyle = "rgba(11, 9, 20, 0.36)";
    ctx.fillRect(0, 0, VIEW_WIDTH, VIEW_HEIGHT);
  }

  // HUD Superior Esquerdo
  ctx.fillStyle = "rgba(11, 9, 20, 0.85)";
  ctx.fillRect(14, 14, 440, 58);
  ctx.strokeStyle = "rgba(149, 101, 255, 0.45)";
  ctx.strokeRect(14, 14, 440, 58);

  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 14px Orbitron, sans-serif";
  ctx.fillText(`📍 ${terrain.name}`, 26, 36);

  const stand = getActiveStandObj();
  ctx.fillStyle = "#b99aff";
  ctx.font = "14px Rajdhani, sans-serif";
  ctx.fillText(
    `${game.name} (${cls.name}${stand.id !== "none" ? ` • ${stand.name}` : ""}) • Pos (${game.mapX}, ${game.mapY})`,
    26,
    56
  );

  // Mini-Mapa no Canto Superior Direito
  drawMiniMap(ctx, terrain);
}

function drawMiniMap(ctx, terrain) {
  const mw = 150;
  const mh = 90;
  const mx = VIEW_WIDTH - mw - 14;
  const my = 14;
  const sx = mw / MAP_WIDTH;
  const sy = mh / MAP_HEIGHT;

  ctx.save();
  ctx.fillStyle = "rgba(11, 9, 20, 0.88)";
  ctx.fillRect(mx - 2, my - 2, mw + 4, mh + 4);
  ctx.strokeStyle = "rgba(149, 101, 255, 0.65)";
  ctx.strokeRect(mx - 2, my - 2, mw + 4, mh + 4);

  for (let y = 0; y < MAP_HEIGHT; y++) {
    for (let x = 0; x < MAP_WIDTH; x++) {
      const c = terrain.layout[y][x];
      ctx.fillStyle = c === "1" ? terrain.wall : c === "2" ? terrain.path : c === "3" ? "#0284c7" : c === "4" ? "#92400e" : c === "5" ? "#facc15" : terrain.ground;
      ctx.fillRect(mx + x * sx, my + y * sy, Math.ceil(sx), Math.ceil(sy));
    }
  }

  ctx.fillStyle = "#f6c453";
  ctx.fillRect(mx + terrain.npcPos.x * sx - 2, my + terrain.npcPos.y * sy - 2, 5, 5);

  ctx.fillStyle = "#54d9f5";
  ctx.fillRect(mx + terrain.portalPos.x * sx - 2, my + terrain.portalPos.y * sy - 2, 5, 5);

  const secretSpot = getZoneSecretSpot(game.zone);
  if (secretSpot) {
    ctx.fillStyle = "#c084fc";
    ctx.fillRect(mx + secretSpot.x * sx - 2, my + secretSpot.y * sy - 2, 5, 5);
  }

  if (terrain.dojoPos) {
    ctx.fillStyle = "#ff9f43";
    ctx.fillRect(mx + terrain.dojoPos.x * sx - 2, my + terrain.dojoPos.y * sy - 2, 5, 5);
  }

  ctx.fillStyle = "#ff647d";
  mapState.patrolEntities.forEach(ent => {
    if (!ent.alive) return;
    const ex = ent.x / TILE;
    const ey = ent.y / TILE;
    ctx.fillRect(mx + ex * sx - 1.5, my + ey * sy - 1.5, 4, 4);
  });

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(mx + (mapState.x / TILE) * sx - 2.5, my + (mapState.y / TILE) * sy - 2.5, 6, 6);
  ctx.restore();
}

function mapGameLoop() {
  mapLoopTimeout = null;
  const mapPage = document.getElementById("page-map");
  if (!mapPage || !mapPage.classList.contains("active")) {
    mapLoopId = null;
    return;
  }
  if (typeof document !== "undefined" && document.hidden) {
    mapLoopTimeout = setTimeout(() => { mapLoopId = requestAnimationFrame(mapGameLoop); }, 450);
    return;
  }
  updateMap();
  drawMap();
  const q = game.gfxQuality || "high";
  if (q === "low") {
    mapLoopTimeout = setTimeout(() => { mapLoopId = requestAnimationFrame(mapGameLoop); }, 42);
  } else if (q === "medium") {
    mapLoopTimeout = setTimeout(() => { mapLoopId = requestAnimationFrame(mapGameLoop); }, 20);
  } else {
    mapLoopId = requestAnimationFrame(mapGameLoop);
  }
}

function startMapLoop() {
  if (mapLoopId !== null || mapLoopTimeout !== null) return;
  mapLoopId = requestAnimationFrame(mapGameLoop);
}

function stopMapLoop() {
  if (mapLoopTimeout !== null) {
    clearTimeout(mapLoopTimeout);
    mapLoopTimeout = null;
  }
  if (mapLoopId !== null) {
    cancelAnimationFrame(mapLoopId);
    mapLoopId = null;
  }
}

function travelToZone(zoneIdx) {
  const targetZone = Number(zoneIdx);
  if (!Number.isFinite(targetZone) || targetZone < 0 || targetZone >= zones.length) return;
  const targetObj = zones[targetZone];
  if (game.level < (targetObj.minLevel || 1)) {
    notify(`Alcance o Nível ${targetObj.minLevel} para viajar para ${targetObj.name}!`);
    return;
  }
  game.zone = targetZone;
  mapBgCache.zoneIdx = -1;
  if (!game.visitedZones.includes(game.zone)) {
    game.visitedZones.push(game.zone);
  }
  game.mapX = zones[game.zone].spawn.x;
  game.mapY = zones[game.zone].spawn.y;
  syncMapState();
  mapState.targetTile = null;
  playSFX("portal");
  updateAchievements();
  saveGame();
  renderAll();
  const msgEl = document.getElementById("mapMessage");
  if (msgEl) msgEl.textContent = `🌀 Você chegou em ${zones[game.zone].name}! Converse com ${zones[game.zone].npc} ou explore os baús.`;
  notify("Você viajou para " + zones[game.zone].name + "!");
}

/* --- MODAL DE DIÁLOGO DE NPC ESTILO RPG CLÁSSICO --- */
let activeDialogZoneIdx = 0;

function openNpcDialog(zoneIdx) {
  activeDialogZoneIdx = zoneIdx;
  const terrain = zones[zoneIdx] || zones[0];
  const modal = document.getElementById("npcDialogModal");
  if (!modal) return;

  const zoneEl = document.getElementById("npcDialogZone");
  const nameEl = document.getElementById("npcDialogName");
  const roleEl = document.getElementById("npcDialogRole");
  const speechEl = document.getElementById("npcDialogText");
  const questBtn = document.getElementById("npcBtnQuest");

  if (zoneEl) zoneEl.textContent = terrain.name.toUpperCase();
  if (nameEl) nameEl.textContent = terrain.npc;
  if (roleEl) roleEl.textContent = `MESTRE DE ${terrain.anime.toUpperCase()}`;
  if (speechEl) speechEl.textContent = `"${terrain.dialogue}"`;

  const nq = npcQuestsCatalog.find(q => q.zone === zoneIdx && !game.claimedNpcQuests.includes(q.id)) ||
             npcQuestsCatalog.find(q => q.zone === zoneIdx);
  if (nq && questBtn) {
    const claimed = game.claimedNpcQuests.includes(nq.id);
    const ready = nq.progress(game) >= nq.target;
    questBtn.disabled = claimed;
    questBtn.textContent = claimed
      ? "✅ Missão do Mestre Concluída"
      : ready
        ? `🎁 Entregar: ${nq.name}`
        : `📜 Missão: ${nq.name} (${Math.min(nq.target, nq.progress(game))}/${nq.target})`;
  } else if (questBtn) {
    questBtn.disabled = true;
    questBtn.textContent = "📜 Sem missão ativa nesta zona";
  }

  const pCanvas = document.getElementById("npcDialogCanvas");
  if (pCanvas) {
    const pCtx = pCanvas.getContext("2d");
    pCtx.clearRect(0, 0, pCanvas.width, pCanvas.height);
    const grad = pCtx.createRadialGradient(48, 48, 6, 48, 48, 46);
    grad.addColorStop(0, "rgba(246, 196, 83, 0.35)");
    grad.addColorStop(1, "rgba(16, 13, 29, 0.95)");
    pCtx.fillStyle = grad;
    pCtx.fillRect(0, 0, pCanvas.width, pCanvas.height);
    drawSprite(pCtx, terrain.npcLook, 16, 14, 4, { frame: 0, dir: "down", moving: false, auraColor: "#f6c453" });
  }

  modal.classList.remove("hidden");
}

function closeNpcDialog() {
  const modal = document.getElementById("npcDialogModal");
  if (modal) modal.classList.add("hidden");
}

function handleNpcQuestAction() {
  const nq = npcQuestsCatalog.find(q => q.zone === activeDialogZoneIdx && !game.claimedNpcQuests.includes(q.id)) ||
             npcQuestsCatalog.find(q => q.zone === activeDialogZoneIdx);
  if (!nq) return;
  if (game.claimedNpcQuests.includes(nq.id)) {
    notify("Você já concluiu todas as missões deste Mestre!");
    return;
  }
  const speechEl = document.getElementById("npcDialogText");
  if (nq.progress(game) >= nq.target) {
    claimNpcQuest(nq.id);
    if (speechEl) speechEl.textContent = `"Impressionante, ${game.name}! Você concluiu '${nq.name}' com perfeição. Receba sua recompensa!"`;
    openNpcDialog(activeDialogZoneIdx);
  } else {
    if (speechEl) speechEl.textContent = `"Sua missão atual é: ${nq.description} (Progresso: ${nq.progress(game)}/${nq.target}). Recompensa: +${nq.xp} XP e +${nq.coins} 🪙!"`;
    notify(`Progresso da missão: ${nq.progress(game)}/${nq.target}`);
  }
}

function handleNpcTrainAction() {
  const terrain = zones[activeDialogZoneIdx] || zones[0];
  if (game.coins < 30) {
    notify("Você precisa de 30 🪙 para realizar o treino especial com o Mestre.");
    return;
  }
  game.coins -= 30;
  const gainedXp = gainXP(45);
  const totals = getTotalStats();
  game.hp = totals.maxHp;
  game.mp = totals.maxMp;
  playSFX("levelup");
  saveGame();
  renderAll();
  const speechEl = document.getElementById("npcDialogText");
  if (speechEl) {
    speechEl.textContent = `"Excelente treino, ${game.name}! Sua Vida e Energia foram restauradas ao máximo e você ganhou +${gainedXp} XP!"`;
  }
  notify(`🥋 Treino com ${terrain.npc} concluído! +${gainedXp} XP e HP/EN 100%!`);
}

function handleNpcLoreAction() {
  const terrain = zones[activeDialogZoneIdx] || zones[0];
  const speechEl = document.getElementById("npcDialogText");
  if (speechEl) {
    speechEl.textContent = `"${terrain.lore || terrain.dialogue}"`;
  }
  playSFX("click");
}

function interactMap() {
  const terrain = getTerrain();
  const pTileX = mapState.x / TILE;
  const pTileY = mapState.y / TILE;
  const msgEl = document.getElementById("mapMessage");

  const distNpc = Math.hypot(pTileX - terrain.npcPos.x, pTileY - terrain.npcPos.y);
  const distPortal = Math.hypot(pTileX - terrain.portalPos.x, pTileY - terrain.portalPos.y);
  const distChest = terrain.chestPos ? Math.hypot(pTileX - terrain.chestPos.x, pTileY - terrain.chestPos.y) : 999;
  const secretSpot = getZoneSecretSpot(game.zone);
  const distSecret = secretSpot ? Math.hypot(pTileX - secretSpot.x, pTileY - secretSpot.y) : 999;
  const distDojo = terrain.dojoPos ? Math.hypot(pTileX - terrain.dojoPos.x, pTileY - terrain.dojoPos.y) : 999;

  if (distNpc <= 2.4) {
    playSFX("click");
    openNpcDialog(game.zone);
    return;
  }

  if (distDojo <= 2.2) {
    playSFX("portal");
    openPage("dojo");
    notify("🏯 Bem-vindo ao seu Dojo Dimensional!");
    return;
  }

  if (distChest <= 2.2 && terrain.chestPos) {
    if (game.openedChests.includes(terrain.chestPos.id)) {
      notify("Este baú secreto já foi aberto.");
      return;
    }
    game.openedChests.push(terrain.chestPos.id);
    const coins = terrain.chestPos.coins || 50;
    const gems = terrain.chestPos.gems || 2;
    const xp = gainXP(60);
    game.coins += coins;
    game.gems += gems;

    if (terrain.chestPos.itemId) {
      const refItem = shopCatalog.find(i => i.id === terrain.chestPos.itemId);
      if (refItem) addInventoryItem(refItem, 1);
    }

    playSFX("chest");
    updateAchievements();
    saveGame();
    renderAll();
    if (msgEl) msgEl.textContent = `🎁 Baú de ${terrain.name} aberto! Você recebeu +${xp} XP, +${coins} 🪙 e +${gems} 💎!`;
    notify(`🎁 Baú Secreto aberto! +${xp} XP, +${coins} 🪙 e +${gems} 💎!`);
    return;
  }

  if (distSecret <= 2.4 && secretSpot) {
    if (!game.openedChests.includes(secretSpot.id)) {
      game.openedChests.push(secretSpot.id);
      const coins = secretSpot.coins || 150;
      const gems = secretSpot.gems || 5;
      const xp = gainXP(120);
      game.coins += coins;
      game.gems += gems;
      if (secretSpot.itemId) {
        const refItem = shopCatalog.find(i => i.id === secretSpot.itemId);
        if (refItem) addInventoryItem(refItem, 1);
      }
      playSFX("chest");
      updateAchievements();
      saveGame();
      renderAll();
      if (msgEl) msgEl.textContent = `🔮 Área Secreta descoberta em ${terrain.name}! +${xp} XP, +${coins} 🪙 e +${gems} 💎!`;
      notify(`🔮 Área Secreta descoberta! +${xp} XP, +${coins} 🪙 e +${gems} 💎!`);
      return;
    } else if (secretSpot.bossId) {
      const bossRef = enemiesCatalog.find(e => e.id === secretSpot.bossId);
      const diffSel = document.getElementById("battleDifficultySelect");
      if (diffSel) diffSel.value = "boss";
      selectBattleEnemy(secretSpot.bossId);
      openPage("battle");
      notify(`💀 Chefe Secreto invocado: ${bossRef ? bossRef.name : secretSpot.bossId}!`);
      return;
    } else {
      notify("🔮 Esta relíquia secreta já foi coletada.");
      return;
    }
  }

  if (distPortal <= 2.2) {
    const nextZone = (game.zone + 1) % zones.length;
    travelToZone(nextZone);
    return;
  }

  if (msgEl) msgEl.textContent = "Aproxime-se do Mestre 🧙, da Porta do Dojo 🏯, do Baú 🎁, do Altar Secreto 🔮 ou do Portal 🌀 e pressione E.";
  notify("Aproxime-se do Mestre, Dojo, Baú, Área Secreta ou Portal!");
}

function triggerMapAura() {
  const stand = getActiveStandObj();
  if (stand && stand.id !== "none") {
    mapState.auraTimer = 160;
    playSFX("stand");
    notify(`👻 Stand Manifestado: ${stand.name} — "${stand.cry}"!`);
    return;
  }
  if (!game.unlockedSkills.length) {
    notify("Desbloqueie uma habilidade ou desperte um Stand primeiro!");
    return;
  }
  mapState.auraTimer = 140;
  playSFX("skill");
  const skill = skills.find(s => s.id === (game.equippedSkills[0] || game.unlockedSkills[0]));
  notify(`⚡ Aura ativada: ${skill ? skill.name : "Energia Anime"}!`);
}

function restOnMap() {
  const totals = getTotalStats();
  game.hp = totals.maxHp;
  game.mp = totals.maxMp;
  playSFX("quest");
  saveGame();
  renderAll();
  notify("🍙 Você descansou e recuperou 100% da Vida e Energia!");
}

/* =========================================================
   13. COMBATE DINÂMICO 2D (STANDS, CHEFES 2 FASES, CRÍTICOS E DANO FLUTUANTE)
========================================================= */

const battleState = {
  enemyId: "bandit",
  enemyHp: 85,
  enemyMaxHp: 85,
  defending: false,
  turnLocked: false,
  enemyTurnTimeout: null,
  rage: 0,
  ultimateTurns: 0,
  standCooldown: 0,
  standSummonTimer: 0,
  bossPhase: 1,
  bossPhase2Triggered: false,
  enemyHitShake: 0,
  playerHitShake: 0,
  defeatAnimTimer: 0,
  turnCount: 1,
  playerStatuses: {},
  enemyStatuses: {},
  skillCooldowns: {},
  floatingTexts: [],
  particles: [],
  log: [{ text: "Escolha um oponente acima ou encontre um inimigo patrulhando no Mapa 2D!", cls: "" }],
  animTick: 0,
  effectTimer: 0,
  effectColor: "#f6c453",
  effectTarget: "enemy",
  effectType: "slash",
  playerShield: 0,
  enemyShield: 0,
  combo: 0,
  classHitCount: 0,
  bossIntent: "normal",
  bossIntentText: "",
  playerDashX: 0,
  enemyDashX: 0,
  screenShakeTimer: 0,
  critFlashTimer: 0,
  victoryAnimTimer: 0
};

/* --- EFEITOS ELEMENTAIS TÁTICOS (v6): CONGELAR, VENENO CUMULATIVO E ROUBO DE VIDA --- */
const POISON_MAX_STACKS = 5;

function applyPoisonToEnemy(stacks = 1) {
  const st = battleState.enemyStatuses;
  st.poisonStacks = Math.min(POISON_MAX_STACKS, (st.poisonStacks || 0) + stacks);
  st.poisonTurns = 3;
  return st.poisonStacks;
}

function getEnemyPoisonAtkMult() {
  return 1 - Math.min(0.2, (battleState.enemyStatuses.poisonStacks || 0) * 0.04);
}

// Golpes pesados / de fogo contra alvo congelado causam Estilhaçar (+50% e 8% HP máx.)
function tryShatter(baseDmg, isHeavyOrFire) {
  if (!isHeavyOrFire || !(battleState.enemyStatuses.freeze > 0)) return { dmg: baseDmg, shattered: false };
  battleState.enemyStatuses.freeze = 0;
  const bonus = Math.round(battleState.enemyMaxHp * 0.08);
  return { dmg: Math.round(baseDmg * 1.5) + bonus, shattered: true };
}

function applyDrainHeal(dmg, drainPct) {
  const totals = getTotalStats();
  const heal = Math.floor(dmg * drainPct);
  const missing = totals.maxHp - game.hp;
  const healed = Math.min(missing, heal);
  game.hp += healed;
  const overflow = heal - healed;
  let shield = 0;
  if (overflow > 0) {
    shield = Math.floor(overflow * 0.5);
    battleState.playerShield = Math.min(Math.round(totals.maxHp * 0.4), (battleState.playerShield || 0) + shield);
  }
  spawnFloatingText(`🧛 +${healed} HP${shield ? ` (+${shield} 🛡)` : ""}`, 150, 120, "#fb7185", true);
  return { healed, shield };
}

function spawnFloatingText(text, x, y, color = "#ffffff", isBig = false) {
  battleState.floatingTexts.push({
    text,
    x,
    y,
    vy: -1.4,
    alpha: 1.0,
    color,
    isBig
  });
}

function spawnImpactParticles(x, y, color = "#f6c453", count = 14) {
  const q = game.gfxQuality || "high";
  const mult = q === "low" ? 0.35 : q === "medium" ? 0.65 : 1.0;
  const maxPool = q === "low" ? 24 : q === "medium" ? 50 : 90;
  const finalCount = Math.max(2, Math.round(count * mult));
  if (battleState.particles.length > maxPool) {
    battleState.particles.splice(0, battleState.particles.length - maxPool);
  }
  for (let i = 0; i < finalCount; i++) {
    const angle = (Math.PI * 2 * i) / finalCount + Math.random() * 0.4;
    const speed = 1.8 + Math.random() * 3.5;
    battleState.particles.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 16 + Math.floor(Math.random() * 10),
      color,
      size: 3 + Math.floor(Math.random() * 4)
    });
  }
}

function getClassCombatPerks() {
  return CLASS_PERKS[game.charClass] || CLASS_PERKS.adventurer;
}

function getCombatAvailableSkills() {
  const baseIds = game.equippedSkills.length ? [...game.equippedSkills] : game.unlockedSkills.slice(0, 4);
  const perks = getClassCombatPerks();
  if (perks.signatureSkillId && !baseIds.includes(perks.signatureSkillId) && skills.some(s => s.id === perks.signatureSkillId)) {
    baseIds.push(perks.signatureSkillId);
  }
  return baseIds;
}

function registerCombatCombo() {
  const perks = getClassCombatPerks();
  battleState.combo = Math.min(8, (battleState.combo || 0) + 1);
  const stepBonus = perks.comboBonus || 0.06;
  return 1 + Math.min(0.45, (battleState.combo - 1) * stepBonus);
}

function applyDamageToEnemy(rawDmg, opts = {}) {
  let dmg = Math.max(1, Math.round(rawDmg));
  if (!opts.pierceShield && battleState.enemyShield > 0) {
    const absorbed = Math.min(battleState.enemyShield, dmg);
    battleState.enemyShield -= absorbed;
    dmg -= absorbed;
    spawnFloatingText(`🛡 Escudo -${absorbed}`, 610, 108, "#94a3b8");
  }
  battleState.enemyHp = Math.max(0, battleState.enemyHp - dmg);
  battleState.classHitCount = (battleState.classHitCount || 0) + 1;

  const perks = getClassCombatPerks();
  if (perks.shadowFollowUp && battleState.enemyHp > 0 && battleState.classHitCount % 3 === 0) {
    const bonusShadowDmg = Math.max(12, Math.round(getTotalStats().atk * 0.65));
    battleState.enemyHp = Math.max(0, battleState.enemyHp - bonusShadowDmg);
    spawnFloatingText(`👤 Cavaleiro Sombrio -${bonusShadowDmg}!`, 565, 92, "#38bdf8", true);
    addBattleLog(`👤 [Monarca das Sombras] Cavaleiro Sombrio executou ataque extra (-${bonusShadowDmg})!`, "log-win");
  }
  return dmg;
}

function chooseNextBossIntent(enemy) {
  if (!enemy || !enemy.isBoss) {
    battleState.bossIntent = "normal";
    battleState.bossIntentText = "";
    return;
  }
  const t = battleState.turnCount || 1;
  const p = enemy.patternType || "heavy_charge";
  if (t % 3 === 0) {
    battleState.bossIntent = p;
    if (p === "shield_burst") battleState.bossIntentText = "🛡️ Intenção do Chefe: Barreira Absoluta + Contra-ataque no próximo turno!";
    else if (p === "status_storm") battleState.bossIntentText = "☠️ Intenção do Chefe: Tempestade Amaldiçoada (Aplica Veneno/Queimadura)!";
    else if (p === "time_accel") battleState.bossIntentText = "⏱️ Intenção do Chefe: Aceleração Dupla (2 golpes velozes)!";
    else if (p === "meteor_truth") battleState.bossIntentText = "☄️ Intenção do Chefe: Meteoro Celestial (Use Defender ou Paralise)!";
    else if (p === "knight_duel") battleState.bossIntentText = "⚔️ Intenção do Chefe: Corte Relâmpago + Sangramento!";
    else battleState.bossIntentText = "💥 Intenção do Chefe: Golpe Carregado 1.75x (Use Defender/Congelar)!";
  } else {
    battleState.bossIntent = "normal";
    battleState.bossIntentText = "";
  }
}

function triggerCompanionCombatAssist(totals) {
  if (!game.companion || game.companion === "none") return;
  if ((battleState.turnCount || 1) % 2 !== 0) return;
  const pet = companionsCatalog.find(c => c.id === game.companion);
  if (!pet || pet.combatRole === "none") return;
  const petLvl = (game.companionLevels && game.companionLevels[pet.id]) || 1;
  const scale = 1 + (petLvl - 1) * 0.25;

  if (pet.combatRole === "heal_pulse") {
    const heal = Math.max(8, Math.round(totals.maxHp * 0.05 * scale));
    game.hp = Math.min(totals.maxHp, game.hp + heal);
    if (pet.id === "chopper") game.mp = Math.min(totals.maxMp, game.mp + 6);
    spawnFloatingText(`${pet.icon} +${heal} HP`, 125, 165, "#63e6a4");
    addBattleLog(`${pet.icon} ${pet.name} (Nv.${petLvl}) auxiliou restaurando +${heal} HP!`, "log-player");
  } else if (pet.combatRole === "sand_shield") {
    const sh = Math.round(14 * scale);
    battleState.playerShield = (battleState.playerShield || 0) + sh;
    spawnFloatingText(`${pet.icon} +${sh} 🛡`, 125, 165, "#fbbf24");
    addBattleLog(`${pet.icon} ${pet.name} (Nv.${petLvl}) ergueu +${sh} Escudo de Areia!`, "log-player");
  } else if (battleState.enemyHp > 0) {
    const petDmg = Math.max(6, Math.round((totals.atk * 0.28 + 6) * scale));
    battleState.enemyHp = Math.max(0, battleState.enemyHp - petDmg);
    if (pet.combatRole === "bleed_bite") battleState.enemyStatuses.bleed = Math.max(1, battleState.enemyStatuses.bleed || 0);
    if (pet.combatRole === "dragon_roar") game.mp = Math.min(totals.maxMp, game.mp + 8);
    spawnFloatingText(`${pet.icon} -${petDmg}`, 655, 165, pet.color || "#38bdf8");
    addBattleLog(`${pet.icon} ${pet.name} (Nv.${petLvl}) atacou junto (-${petDmg} dano)!`, "log-player");
  }
}

function getDifficultyMultiplier() {
  const sel = document.getElementById("battleDifficultySelect");
  const val = sel ? sel.value : "normal";
  if (val === "hard") return { statMult: 1.4, rewardMult: 1.5 };
  if (val === "boss") return { statMult: 2.0, rewardMult: 2.5 };
  return { statMult: 1.0, rewardMult: 1.0 };
}

function getCurrentEnemy() {
  return enemiesCatalog.find(e => e.id === battleState.enemyId) || enemiesCatalog[0];
}

function selectBattleEnemy(enemyId, fromDungeon = false) {
  if (!fromDungeon && dungeonRun.active) abandonDungeon();
  clearTimeout(battleState.enemyTurnTimeout);
  battleState.enemyTurnTimeout = null;
  battleState.turnLocked = false;
  const enemy = enemiesCatalog.find(e => e.id === enemyId) || enemiesCatalog[0];
  const diff = getDifficultyMultiplier();

  battleState.enemyId = enemy.id;
  battleState.playerShield = 0;
  battleState.enemyShield = 0;
  battleState.combo = 0;
  battleState.classHitCount = 0;
  battleState.bossIntent = "normal";
  battleState.bossIntentText = "";
  battleState.playerDashX = 0;
  battleState.enemyDashX = 0;
  battleState.screenShakeTimer = 0;
  battleState.critFlashTimer = 0;
  battleState.victoryAnimTimer = 0;
  battleState.combatBuff = null;
  battleState.enemyMaxHp = Math.round(enemy.hp * diff.statMult);
  battleState.enemyHp = battleState.enemyMaxHp;
  battleState.defending = false;
  battleState.rage = 0;
  battleState.ultimateTurns = 0;
  battleState.standCooldown = 0;
  battleState.standSummonTimer = 0;
  battleState.bossPhase = 1;
  battleState.bossPhase2Triggered = false;
  battleState.enemyHitShake = 0;
  battleState.playerHitShake = 0;
  battleState.defeatAnimTimer = 0;
  battleState.turnCount = 1;
  battleState.playerStatuses = {};
  battleState.enemyStatuses = {};
  battleState.skillCooldowns = {};
  battleState.floatingTexts = [];
  battleState.particles = [];

  const totals = getTotalStats();
  if (game.hp <= 0) game.hp = totals.maxHp;

  battleState.log = [{ text: `⚔️ ${enemy.name} (${enemy.anime}) entrou na arena!`, cls: "log-player" }];
  renderBattle();
}

function addBattleLog(text, cls = "") {
  battleState.log.unshift({ text, cls });
  battleState.log = battleState.log.slice(0, 14);
}

function addBattleRage(amount) {
  battleState.rage = Math.max(0, Math.min(100, battleState.rage + amount));
}

function tickCooldownsAndEffects() {
  battleState.turnCount++;
  Object.keys(battleState.skillCooldowns).forEach(k => {
    if (battleState.skillCooldowns[k] > 0) battleState.skillCooldowns[k]--;
  });
  if (battleState.standCooldown > 0) battleState.standCooldown--;

  if (battleState.ultimateTurns > 0) {
    battleState.ultimateTurns--;
    if (battleState.ultimateTurns === 0) {
      addBattleLog("✨ O efeito do seu Despertar chegou ao fim.", "");
    }
  }
}

function checkBossPhaseTwoTrigger() {
  const enemy = getCurrentEnemy();
  if (!enemy.isBoss || battleState.bossPhase2Triggered) return false;
  if (battleState.enemyHp > 0 && battleState.enemyHp <= Math.floor(battleState.enemyMaxHp * 0.5)) {
    battleState.bossPhase2Triggered = true;
    battleState.bossPhase = 2;
    const healAmount = Math.round(battleState.enemyMaxHp * 0.22);
    battleState.enemyHp = Math.min(battleState.enemyMaxHp, battleState.enemyHp + healAmount);

    spawnFloatingText("⚠️ FASE 2 DESPERTA!", 600, 110, "#ff647d", true);
    spawnImpactParticles(630, 175, "#ff647d", 22);
    playSFX("stand");
    addBattleLog(`👑 FASE 2! ${enemy.phase2Name || enemy.name} liberou seu poder oculto (+${healAmount} HP e +25% ATK)!`, "log-enemy");
    notify(`⚠️ CHEFE EM FASE 2: ${enemy.phase2Name || enemy.name}!`);
    renderBattle();
    return true;
  }
  return false;
}

function processEnemyStatusBeforeTurn(enemy) {
  let skipTurn = false;

  if (battleState.enemyStatuses.burn && battleState.enemyStatuses.burn > 0) {
    const burnDmg = Math.max(6, Math.round(battleState.enemyMaxHp * 0.06));
    battleState.enemyHp = Math.max(0, battleState.enemyHp - burnDmg);
    battleState.enemyStatuses.burn--;
    spawnFloatingText(`🔥 -${burnDmg}`, 620, 140, "#ff9f43");
    addBattleLog(`🔥 Queimadura causou ${burnDmg} de dano contínuo em ${enemy.name}!`, "log-player");
  }

  if (battleState.enemyStatuses.bleed && battleState.enemyStatuses.bleed > 0) {
    const bleedDmg = Math.max(8, Math.round(battleState.enemyMaxHp * 0.08));
    battleState.enemyHp = Math.max(0, battleState.enemyHp - bleedDmg);
    battleState.enemyStatuses.bleed--;
    spawnFloatingText(`🩸 -${bleedDmg}`, 620, 165, "#ef4444");
    addBattleLog(`🩸 Sangramento causou ${bleedDmg} de dano em ${enemy.name}!`, "log-player");
  }

  if (battleState.enemyStatuses.poisonTurns > 0 && battleState.enemyStatuses.poisonStacks > 0) {
    const totals = getTotalStats();
    const stacks = battleState.enemyStatuses.poisonStacks;
    const poisonDmg = stacks * (Math.floor(0.035 * battleState.enemyMaxHp) + Math.floor(0.15 * totals.atk));
    battleState.enemyHp = Math.max(0, battleState.enemyHp - poisonDmg);
    battleState.enemyStatuses.poisonTurns--;
    if (battleState.enemyStatuses.poisonTurns <= 0) battleState.enemyStatuses.poisonStacks = 0;
    spawnFloatingText(`🧪 -${poisonDmg}`, 640, 150, "#a855f7");
    addBattleLog(`🧪 Veneno (${stacks}x) causou ${poisonDmg} de dano em ${enemy.name}!`, "log-player");
  }

  if (battleState.enemyHp <= 0) {
    handleBattleVictory();
    return true;
  }

  if (battleState.enemyStatuses.freeze && battleState.enemyStatuses.freeze > 0) {
    battleState.enemyStatuses.freeze--;
    spawnFloatingText("❄️ CONGELADO!", 610, 120, "#38bdf8", true);
    addBattleLog(`❄️ ${enemy.name} está CONGELADO e perdeu o turno!`, "log-win");
    return true;
  }

  if (battleState.enemyStatuses.stun && battleState.enemyStatuses.stun > 0) {
    battleState.enemyStatuses.stun--;
    spawnFloatingText("⚡ PARALISADO!", 610, 120, "#fde047", true);
    addBattleLog(`⚡ ${enemy.name} está PARALISADO e perdeu o turno!`, "log-win");
    skipTurn = true;
  }

  return skipTurn;
}

function checkEnemyDefeatedOrCounter() {
  if (battleState.enemyHp <= 0) {
    handleBattleVictory();
    return;
  }
  checkBossPhaseTwoTrigger();
  battleState.turnLocked = true;
  renderBattle();
  clearTimeout(battleState.enemyTurnTimeout);
  battleState.enemyTurnTimeout = setTimeout(enemyTurn, 340);
}

function handleBattleVictory() {
  clearTimeout(battleState.enemyTurnTimeout);
  battleState.enemyTurnTimeout = null;
  battleState.turnLocked = false;
  const enemy = getCurrentEnemy();
  const diff = getDifficultyMultiplier();
  const xpGain = gainXP(Math.round(enemy.xp * diff.rewardMult));
  const coinGain = gainCoins(Math.round(enemy.coins * diff.rewardMult));
  const gemGain = enemy.gems || 0;

  game.gems += gemGain;
  game.battlesWon++;
  recordAnalytics("battles", 1);
  if (typeof addGuildXp === "function") addGuildXp(enemy.isBoss ? 35 : 15);
  battleState.defeatAnimTimer = 22;
  battleState.victoryAnimTimer = 26;
  battleState.combo = 0;
  battleState.enemyShield = 0;
  spawnFloatingText("🏆 DERROTADO!", 610, 130, "#63e6a4", true);
  spawnImpactParticles(630, 175, "#f6c453", 24);

  if (enemy.isBoss) {
    if (!game.defeatedBosses.includes(enemy.id)) {
      game.defeatedBosses.push(enemy.id);
      game.classSpins = (game.classSpins || 0) + 1;
      if (enemy.dropId) {
        const dropRef = shopCatalog.find(i => i.id === enemy.dropId);
        if (dropRef) addInventoryItem(dropRef, 1);
      }
    } else if (enemy.dropId && Math.random() < 0.35) {
      const dropRef = shopCatalog.find(i => i.id === enemy.dropId);
      if (dropRef) addInventoryItem(dropRef, 1);
    }
  }

  addBattleLog(`🏆 VITÓRIA! Você derrotou ${enemy.name} (+${xpGain} XP, +${coinGain} 🪙, +${gemGain} 💎)!`, "log-win");
  playSFX("levelup");
  notify(`Vitória contra ${enemy.name}! +${xpGain} XP, +${coinGain} 🪙!`);

  if (dungeonRun.active && advanceDungeonAfterVictory()) {
    updateAchievements();
    saveGame();
    renderAll();
    return;
  }

  battleState.enemyHp = battleState.enemyMaxHp;
  battleState.bossPhase = 1;
  battleState.bossPhase2Triggered = false;
  battleState.enemyStatuses = {};
  battleState.playerStatuses = {};
  updateAchievements();
  saveGame();
  renderAll();
}

function enemyTurn() {
  battleState.turnLocked = false;
  battleState.enemyTurnTimeout = null;
  const enemy = getCurrentEnemy();
  const diff = getDifficultyMultiplier();
  const totals = getTotalStats();
  const perks = getClassCombatPerks();

  const skipped = processEnemyStatusBeforeTurn(enemy);
  if (skipped) {
    battleState.bossIntent = "normal";
    battleState.bossIntentText = "";
    chooseNextBossIntent(enemy);
    tickCooldownsAndEffects();
    saveGame();
    renderAll();
    return;
  }

  const dodgeChance = Math.min(0.45, Math.max(0.05, (totals.spd - 5) * 0.012 + (perks.dodgeBonus || 0)));
  if (Math.random() < dodgeChance) {
    battleState.enemyDashX = -24;
    spawnFloatingText("💨 ESQUIVA!", 160, 130, "#54d9f5", true);
    addBattleLog(`💨 Esquiva veloz! Você desviou do ataque de ${enemy.name}!`, "log-player");
    battleState.defending = false;
    chooseNextBossIntent(enemy);
    tickCooldownsAndEffects();
    renderBattle();
    return;
  }

  if (battleState.playerStatuses.clone_shield && battleState.playerStatuses.clone_shield > 0) {
    battleState.playerStatuses.clone_shield = 0;
    battleState.enemyDashX = -18;
    spawnFloatingText("🛡️ BLOQUEADO!", 160, 130, "#a855f7", true);
    addBattleLog(`👥 Sua barreira espiritual bloqueou o ataque de ${enemy.name}!`, "log-player");
    battleState.defending = false;
    chooseNextBossIntent(enemy);
    tickCooldownsAndEffects();
    renderBattle();
    return;
  }

  // Padrão Tático de Ataque do Chefe
  let bossMult = 1.0;
  let patternMsg = "";
  battleState.enemyDashX = -30;
  const intent = battleState.bossIntent || "normal";
  if (intent === "heavy_charge" || intent === "meteor_truth") {
    bossMult = 1.70;
    patternMsg = intent === "meteor_truth" ? " [☄️ Meteoro Celestial!]" : " [💥 Golpe Carregado!]";
  } else if (intent === "shield_burst") {
    const shAmt = Math.round(battleState.enemyMaxHp * 0.14);
    battleState.enemyShield = (battleState.enemyShield || 0) + shAmt;
    bossMult = 1.1;
    patternMsg = ` [🛡️ Barreira +${shAmt}]`;
  } else if (intent === "time_accel") {
    bossMult = 1.45;
    patternMsg = " [⏱️ Golpe Acelerado Duplo!]";
  } else if (intent === "status_storm" || intent === "knight_duel") {
    bossMult = 1.35;
    battleState.playerStatuses.burn = 1;
    patternMsg = " [🔥 Tempestade!]";
  }

  const phaseMult = battleState.bossPhase === 2 ? 1.25 : 1.0;
  const enemyAtk = Math.round(enemy.atk * diff.statMult * phaseMult * bossMult * getEnemyPoisonAtkMult());
  const ultDefMult = battleState.ultimateTurns > 0 ? 1.35 : 1;
  const effectiveDef = Math.round(totals.def * ultDefMult);
  const rawDmg = Math.max(4, enemyAtk - Math.floor(effectiveDef * 0.55) + Math.floor(Math.random() * 6));
  let finalDmg = battleState.defending ? Math.max(2, Math.floor(rawDmg * 0.42)) : rawDmg;
  if (perks.damageReduction) {
    finalDmg = Math.max(2, Math.round(finalDmg * (1 - perks.damageReduction)));
  }

  if (battleState.playerShield > 0) {
    const absorbed = Math.min(battleState.playerShield, finalDmg);
    battleState.playerShield -= absorbed;
    finalDmg -= absorbed;
    spawnFloatingText(`🛡 -${absorbed} absorvido`, 130, 105, "#a78bfa");
    addBattleLog(`🛡 Escudo espiritual absorveu ${absorbed} de dano!`, "log-player");
  }

  game.hp = Math.max(0, game.hp - finalDmg);
  if (!battleState.defending && finalDmg > 20 && battleState.combo > 0) {
    battleState.combo = Math.max(0, battleState.combo - 1);
  }
  const wasDefending = battleState.defending;
  battleState.defending = false;
  battleState.playerHitShake = 8;
  battleState.screenShakeTimer = finalDmg > 30 ? 8 : 4;
  addBattleRage(Math.round(15 * (perks.rageGainMult || 1)));

  // Tank contra-ataque ao defender!
  if (wasDefending && perks.counterOnDefend && battleState.enemyHp > 0) {
    const counterDmg = Math.max(8, Math.round(totals.def * 1.1));
    battleState.enemyHp = Math.max(0, battleState.enemyHp - counterDmg);
    spawnFloatingText(`🛡️ Contra-ataque -${counterDmg}`, 580, 160, "#63e6a4");
    addBattleLog(`🛡️ [Tanque] Escudo refletiu ${counterDmg} de dano!`, "log-player");
  }

  battleState.effectTimer = 14;
  battleState.effectColor = "#ff647d";
  battleState.effectTarget = "player";
  battleState.effectType = "slash";
  spawnFloatingText(`-${finalDmg}`, 170, 140, "#ff647d");
  spawnImpactParticles(170, 175, "#ff647d", 10);
  playSFX("hit");

  addBattleLog(`💥 ${battleState.bossPhase === 2 && enemy.phase2Name ? enemy.phase2Name : enemy.name} atacou${patternMsg} causando ${finalDmg} de dano!`, "log-enemy");

  if (game.hp <= 0) {
    game.hp = Math.round(totals.maxHp * 0.6);
    game.mp = Math.round(totals.maxMp * 0.6);
    if (dungeonRun.active) {
      const dg = getActiveDungeon();
      abandonDungeon(true);
      addBattleLog(`🏳️ Você caiu na Masmorra ${dg ? dg.name : ""}. A raid foi encerrada.`, "log-enemy");
    }
    battleState.enemyHp = battleState.enemyMaxHp;
    battleState.enemyShield = 0;
    battleState.combo = 0;
    battleState.bossPhase = 1;
    battleState.bossPhase2Triggered = false;
    battleState.enemyStatuses = {};
    battleState.playerStatuses = {};
    addBattleLog("💫 Você recuou para recuperar suas forças (60% HP/EN).", "log-enemy");
    notify("Você foi derrotado na batalha, mas recuou em segurança!");
  }

  chooseNextBossIntent(enemy);
  tickCooldownsAndEffects();
  saveGame();
  renderAll();
}

function playerBasicAttack() {
  if (battleState.turnLocked) return;
  const totals = getTotalStats();
  const enemy = getCurrentEnemy();
  const diff = getDifficultyMultiplier();
  const perks = getClassCombatPerks();
  const enemyDef = Math.round(enemy.def * diff.statMult);

  const comboMult = registerCombatCombo();
  const firstTurnMult = (battleState.turnCount === 1 && perks.firstStrikeBonus) ? (1 + perks.firstStrikeBonus) : 1;
  const lowHpMult = (perks.lowHpEnrage && game.hp < totals.maxHp * 0.5) ? (1 + perks.lowHpEnrage) : 1;
  const isCrit = Math.random() * 100 < (totals.crit || 8);
  const critMult = isCrit ? (perks.critMult || 1.65) : 1.0;
  const ultAtkMult = battleState.ultimateTurns > 0 ? 1.35 : 1;
  const effectiveAtk = Math.round(totals.atk * ultAtkMult * critMult * comboMult * firstTurnMult * lowHpMult);
  const baseDmg = Math.max(6, effectiveAtk - Math.floor(enemyDef * 0.4) + Math.floor(Math.random() * 7));
  const shatter = tryShatter(baseDmg, isCrit);
  const dmg = applyDamageToEnemy(shatter.dmg);
  if (shatter.shattered) {
    spawnFloatingText("❄️💥 ESTILHAÇAR!", 590, 100, "#bae6fd", true);
    addBattleLog("❄️💥 Golpe crítico estilhaçou o gelo! (+50% dano e 8% do HP máximo)", "log-win");
  }
  if ((isCrit && perks.bleedOnCrit) || (perks.bleedOnAttack && Math.random() < perks.bleedOnAttack)) {
    battleState.enemyStatuses.bleed = Math.max(2, battleState.enemyStatuses.bleed || 0);
  }

  battleState.playerDashX = 38;
  battleState.enemyHitShake = 10;
  if (isCrit) {
    battleState.critFlashTimer = 6;
    battleState.screenShakeTimer = 6;
  }
  game.mp = Math.min(totals.maxMp, game.mp + 6);
  addBattleRage(Math.round(22 * (perks.rageGainMult || 1)));

  battleState.effectTimer = 14;
  battleState.effectColor = isCrit ? "#fde047" : (battleState.ultimateTurns > 0 ? "#f6c453" : "#54d9f5");
  battleState.effectTarget = "enemy";
  battleState.effectType = "slash";
  spawnFloatingText(`${isCrit ? "💥 CRÍTICO! " : ""}-${dmg}${battleState.combo >= 2 ? ` (x${battleState.combo})` : ""}`, 590, 140, isCrit ? "#fde047" : "#54d9f5", isCrit);
  spawnImpactParticles(630, 175, battleState.effectColor, isCrit ? 18 : 10);
  playSFX("attack");

  addBattleLog(`🗡️ Ataque Básico ${isCrit ? "(CRÍTICO!) " : ""}${battleState.combo >= 2 ? `[Combo x${battleState.combo}] ` : ""}causou ${dmg} de dano em ${enemy.name}! (+6 EN)`, "log-player");
  triggerCompanionCombatAssist(totals);
  renderBattle();
  checkEnemyDefeatedOrCounter();
}

function playerSummonStand() {
  if (battleState.turnLocked) return;
  const stand = getActiveStandObj();
  if (!stand || stand.id === "none") {
    notify("Desperte e equipe um Stand de JoJo na aba 'Classes & Stands' primeiro!");
    return;
  }
  if (battleState.standCooldown > 0) {
    notify(`O poder do Stand está em recarga (${battleState.standCooldown} turno(s))!`);
    return;
  }
  if (game.mp < stand.mpCost) {
    notify(`Energia insuficiente para invocar ${stand.name} (${stand.mpCost} EN)!`);
    return;
  }

  const perks = getClassCombatPerks();
  const sLvl = (game.standLevels && game.standLevels[stand.id]) || 1;
  game.mp -= stand.mpCost;
  battleState.standCooldown = Math.max(1, (stand.cd || 2) - (perks.standCdBonus || 0));
  battleState.standSummonTimer = 28;
  battleState.playerDashX = 34;
  addBattleRage(Math.round(30 * (perks.rageGainMult || 1)));

  const totals = getTotalStats();
  const enemy = getCurrentEnemy();
  const diff = getDifficultyMultiplier();
  const enemyDef = Math.round(enemy.def * diff.statMult);
  const comboMult = registerCombatCombo();

  const isCrit = Math.random() * 100 < (totals.crit + 12);
  const standMult = (1 + (totals.standBonus || 0) / 100) * (perks.standPowerMult || 1) * (1 + (sLvl - 1) * 0.25);
  const rawPower = Math.round((totals.atk + stand.power) * standMult * comboMult * (isCrit ? 1.55 : 1));
  const pierceDefense = stand.id === "tusk_act4" || (sLvl >= 3 && stand.id === "the_world");
  const baseStandDmg = Math.max(20, rawPower - (pierceDefense ? 0 : Math.floor(enemyDef * 0.25)));
  const standShatter = tryShatter(baseStandDmg, true);
  const dmg = applyDamageToEnemy(standShatter.dmg, { pierceShield: pierceDefense });
  if (standShatter.shattered) {
    spawnFloatingText("❄️💥 ESTILHAÇAR!", 590, 95, "#bae6fd", true);
    addBattleLog("❄️💥 A rajada do Stand estilhaçou o gelo! (+50% dano)", "log-win");
  }

  battleState.enemyHitShake = 14;
  battleState.screenShakeTimer = 8;
  if (isCrit) battleState.critFlashTimer = 6;
  battleState.effectTimer = 22;
  battleState.effectColor = stand.auraColor || "#f6c453";
  battleState.effectTarget = "enemy";
  battleState.effectType = stand.statusEffect === "stun" ? "time_stop" : stand.statusEffect === "freeze" ? "freeze" : "stand_rush";
  playSFX("stand");

  spawnFloatingText(`👻 ${stand.cry} (-${dmg})`, 560, 120, stand.auraColor || "#fde047", true);
  spawnImpactParticles(630, 175, stand.color || "#a855f7", 22);

  let extraMsg = "";
  if (stand.statusEffect === "stun") {
    battleState.enemyStatuses.stun = 1;
    extraMsg = " • ⏱️ Tempo Parado (Inimigo Paralisado)!";
  } else if (stand.statusEffect === "freeze") {
    battleState.enemyStatuses.freeze = 1;
    Object.keys(battleState.skillCooldowns).forEach(k => {
      if (battleState.skillCooldowns[k] > 0) battleState.skillCooldowns[k]--;
    });
    extraMsg = " • ⏱️ Aceleração + Inimigo Congelado!";
  } else if (stand.statusEffect === "burn") {
    battleState.enemyStatuses.burn = 3;
    extraMsg = " • 💣 Queimadura Explosiva (3t)!";
  } else if (stand.statusEffect === "bleed") {
    battleState.enemyStatuses.bleed = 2;
    battleState.playerStatuses.clone_shield = 1;
    extraMsg = " • 🩸 Sangramento + Previsão Ativa!";
  } else if (stand.statusEffect === "drain") {
    const res = applyDrainHeal(dmg, 0.35);
    extraMsg = ` • 🟢 Drenou +${res.healed} HP!`;
  } else if (stand.statusEffect === "clone_shield") {
    battleState.playerStatuses.clone_shield = 1;
    extraMsg = " • 🧵 Barreira de Fios Ativa!";
  } else if (stand.statusEffect === "heal") {
    const healHp = Math.round(totals.maxHp * 0.24);
    game.hp = Math.min(totals.maxHp, game.hp + healHp);
    spawnFloatingText(`+${healHp} HP`, 160, 125, "#63e6a4", true);
    extraMsg = ` • 💚 Restaurou +${healHp} HP!`;
  }
  if (sLvl >= 2 && stand.requiemName) {
    extraMsg += ` [Estágio ${sLvl}: ${stand.requiemName}]`;
  }

  addBattleLog(`👻 STAND [${stand.name} Lv.${sLvl}] usou ${stand.abilityName}: "${stand.cry}" causando ${dmg} de dano!${extraMsg}`, "log-win");
  triggerCompanionCombatAssist(totals);
  renderBattle();
  checkEnemyDefeatedOrCounter();
}

function playerSkillAttack(specificSkillId = null) {
  if (battleState.turnLocked) return;
  const equippedIds = getCombatAvailableSkills();
  if (!equippedIds.length) {
    notify("Desbloqueie uma habilidade na aba Habilidades primeiro!");
    return;
  }

  const targetId = specificSkillId || equippedIds.find(id => !(battleState.skillCooldowns[id] > 0));
  if (!targetId || battleState.skillCooldowns[targetId] > 0) {
    notify("Esta habilidade está em tempo de recarga (Cooldown)!");
    return;
  }

  const chosenSkill = skills.find(s => s.id === targetId) || skills[0];
  const lvl = game.skillLevels[chosenSkill.id] || 1;

  if (game.mp < chosenSkill.mpCost) {
    notify(`Energia insuficiente! Precisa de ${chosenSkill.mpCost} EN.`);
    return;
  }

  const perks = getClassCombatPerks();
  game.mp -= chosenSkill.mpCost;
  battleState.skillCooldowns[chosenSkill.id] = chosenSkill.cd || 2;
  addBattleRage(Math.round(30 * (perks.rageGainMult || 1)));

  const totals = getTotalStats();
  const enemy = getCurrentEnemy();
  const diff = getDifficultyMultiplier();
  const enemyDef = Math.round(enemy.def * diff.statMult);
  const comboMult = registerCombatCombo();

  const isCrit = Math.random() * 100 < (totals.crit || 8);
  const skillBonus = Math.round(chosenSkill.power * (1 + (lvl - 1) * 0.22) * (1 + (totals.skillBonus || 0) / 100) * (perks.skillPowerMult || 1));
  const ultAtkMult = battleState.ultimateTurns > 0 ? 1.35 : 1;
  const buffAtkMult = battleState.combatBuff && battleState.combatBuff.turns > 0 ? 1 + battleState.combatBuff.atkPct / 100 : 1;
  const rawSkillDmg = Math.max(14, Math.round((totals.atk + skillBonus) * ultAtkMult * buffAtkMult * comboMult * (isCrit ? 1.55 : 1)) - Math.floor(enemyDef * 0.3) + Math.floor(Math.random() * 10));
  const skillShatter = tryShatter(rawSkillDmg, chosenSkill.statusEffect === "burn" || isCrit);
  const dmg = applyDamageToEnemy(skillShatter.dmg, { pierceShield: chosenSkill.id === "infinite_rotation" });

  if (isCrit && perks.mpRefundOnCrit) {
    const refund = Math.max(3, Math.round(chosenSkill.mpCost * perks.mpRefundOnCrit));
    game.mp = Math.min(totals.maxMp, game.mp + refund);
    spawnFloatingText(`+${refund} EN Arcano`, 140, 105, "#38bdf8");
  }

  battleState.playerDashX = 32;
  battleState.enemyHitShake = 12;
  if (isCrit) {
    battleState.critFlashTimer = 6;
    battleState.screenShakeTimer = 6;
  }
  battleState.effectTimer = 20;
  battleState.effectColor = chosenSkill.effectColor || "#54d9f5";
  battleState.effectTarget = "enemy";
  battleState.effectType = chosenSkill.statusEffect === "freeze" ? "freeze" : chosenSkill.statusEffect === "poison" ? "poison" : chosenSkill.statusEffect === "drain" ? "drain" : (chosenSkill.animType || "beam");
  spawnFloatingText(`${chosenSkill.icon} -${dmg}${isCrit ? "!" : ""}`, 600, 130, chosenSkill.effectColor || "#54d9f5", isCrit);
  spawnImpactParticles(630, 175, chosenSkill.effectColor || "#54d9f5", 16);
  playSFX("skill");

  let statusMsg = "";
  const effType = chosenSkill.statusEffect;
  if (effType === "clone_shield") {
    battleState.playerStatuses.clone_shield = 1;
    statusMsg = " • 👥 Escudo de Clone Ativo!";
  } else if (effType === "burn") {
    battleState.enemyStatuses.burn = perks.statusExtend ? 3 : 2;
    statusMsg = ` • 🔥 Queimadura (${battleState.enemyStatuses.burn}t)!`;
  } else if (effType === "stun") {
    battleState.enemyStatuses.stun = 1;
    statusMsg = " • ⚡ Inimigo Paralisado (1t)!";
  } else if (effType === "bleed") {
    battleState.enemyStatuses.bleed = perks.statusExtend ? 3 : 2;
    statusMsg = ` • 🩸 Sangramento (${battleState.enemyStatuses.bleed}t)!`;
  } else if (effType === "freeze") {
    battleState.enemyStatuses.freeze = 1;
    statusMsg = " • ❄️ Congelado (1t)! Próximo golpe crítico/de fogo/Stand ESTILHAÇA!";
  } else if (effType === "poison") {
    const stacks = applyPoisonToEnemy(1);
    statusMsg = ` • 🧪 Veneno ${stacks}/${POISON_MAX_STACKS} (−${stacks * 4}% ATK inimigo)!`;
  } else if (effType === "drain") {
    const res = applyDrainHeal(dmg, chosenSkill.drainPct || 0.35);
    statusMsg = ` • 🧛 Drenou +${res.healed} HP${res.shield ? ` e +${res.shield} de Escudo` : ""}!`;
  }
  if (skillShatter.shattered) {
    spawnFloatingText("❄️💥 ESTILHAÇAR!", 590, 95, "#bae6fd", true);
    statusMsg += " • ❄️💥 ESTILHAÇAR (+50%)!";
  }

  addBattleLog(`✨ ${chosenSkill.name} (Nv.${lvl}) ${battleState.combo >= 2 ? `[Combo x${battleState.combo}] ` : ""}causou ${dmg} de dano!${statusMsg}`, "log-player");
  triggerCompanionCombatAssist(totals);
  renderBattle();
  checkEnemyDefeatedOrCounter();
}

function playerUseUltimate() {
  if (battleState.turnLocked) return;
  if (battleState.rage < 100) {
    notify(`Barra de Despertar em ${battleState.rage}%. Atinga 100% para ativar!`);
    return;
  }

  const cls = getActiveClassObj();
  const totals = getTotalStats();
  const perks = getClassCombatPerks();
  const comboMult = registerCombatCombo();

  battleState.rage = 0;
  battleState.ultimateTurns = 3;
  battleState.playerDashX = 46;
  battleState.critFlashTimer = 8;
  battleState.screenShakeTimer = 10;

  const ultDmg = applyDamageToEnemy(Math.round((totals.atk * 2.1 + 35) * comboMult), { pierceShield: true });
  battleState.enemyHitShake = 16;
  game.hp = Math.min(totals.maxHp, game.hp + Math.round(totals.maxHp * 0.25));
  game.mp = Math.min(totals.maxMp, game.mp + Math.round(totals.maxMp * 0.35));
  if (perks.shieldOnUlt) {
    battleState.playerShield = (battleState.playerShield || 0) + perks.shieldOnUlt;
  }

  battleState.effectTimer = 24;
  battleState.effectColor = cls.ultColor || "#f6c453";
  battleState.effectTarget = "enemy";
  battleState.effectType = "beam";
  spawnFloatingText(`🔥 ${cls.ultName}! -${ultDmg}`, 540, 110, cls.ultColor || "#f6c453", true);
  spawnImpactParticles(630, 175, cls.ultColor || "#f6c453", 24);
  playSFX("levelup");

  addBattleLog(`🔥 DESPERTAR SUPREMO: ${cls.ultName}! Causou ${ultDmg} de dano e elevou ATK/DEF em +35% por 3 turnos!`, "log-win");
  notify(`🔥 ${cls.ultName} ativado!`);
  renderBattle();
  checkEnemyDefeatedOrCounter();
}

function playerDefend() {
  if (battleState.turnLocked) return;
  const totals = getTotalStats();
  const perks = getClassCombatPerks();
  battleState.defending = true;
  game.mp = Math.min(totals.maxMp, game.mp + 18);
  game.hp = Math.min(totals.maxHp, game.hp + 10);
  addBattleRage(Math.round(20 * (perks.rageGainMult || 1)));
  spawnFloatingText("🛡️ DEFESA (+18 EN)", 140, 130, "#54d9f5");
  playSFX("click");
  addBattleLog("🛡️ Postura defensiva ativada (+10 HP, +18 EN, reduziu próximo dano em 58%)!", "log-player");
  battleState.turnLocked = true;
  renderBattle();
  clearTimeout(battleState.enemyTurnTimeout);
  battleState.enemyTurnTimeout = setTimeout(enemyTurn, 300);
}

function playerUsePotion() {
  if (battleState.turnLocked) return;
  const consumable = game.inventory.find(i => i.type === "consumable" && !i.grantStandArrow && !i.grantStreakFreeze && (i.qty || 1) > 0);
  const totals = getTotalStats();

  if (consumable) {
    game.hp = Math.min(totals.maxHp, game.hp + (consumable.healHp || 60));
    game.mp = Math.min(totals.maxMp, game.mp + (consumable.healMp || 30));
    consumable.qty = (consumable.qty || 1) - 1;
    if (consumable.qty <= 0) {
      game.inventory = game.inventory.filter(i => i.id !== consumable.id);
    }
    const extras = [];
    if (consumable.cleansesStatus) {
      battleState.playerStatuses = {};
      extras.push("status purificados");
    }
    if (consumable.grantShield) {
      battleState.playerShield = (battleState.playerShield || 0) + consumable.grantShield;
      extras.push(`+${consumable.grantShield} de Escudo`);
    }
    if (consumable.grantRage) {
      addBattleRage(consumable.grantRage);
      extras.push(`+${consumable.grantRage}% Despertar`);
    }
    spawnFloatingText(`+${consumable.healHp || 60} HP`, 160, 130, "#63e6a4", true);
    playSFX("quest");
    addBattleLog(`🧪 Você usou ${consumable.name} do inventário!${extras.length ? ` (${extras.join(", ")})` : ""}`, "log-player");
  } else {
    if (game.coins < 15) {
      notify("Sem consumíveis no inventário e moedas insuficientes (15 🪙)!");
      return;
    }
    game.coins -= 15;
    game.hp = Math.min(totals.maxHp, game.hp + 60);
    game.mp = Math.min(totals.maxMp, game.mp + 30);
    spawnFloatingText("+60 HP / +30 EN", 150, 130, "#63e6a4", true);
    playSFX("quest");
    addBattleLog("🧪 Poção de Emergência usada (-15 🪙): +60 HP e +30 EN!", "log-player");
  }

  battleState.turnLocked = true;
  saveGame();
  renderAll();
  clearTimeout(battleState.enemyTurnTimeout);
  battleState.enemyTurnTimeout = setTimeout(enemyTurn, 300);
}

function playerFleeBattle() {
  if (battleState.turnLocked) return;
  selectBattleEnemy(battleState.enemyId);
  addBattleLog("🏃 Você recuou taticamente e reiniciou o combate.", "");
  notify("Combate reiniciado.");
  renderBattle();
}

function renderStatusBadges() {
  const stand = getActiveStandObj();
  const pBadges = document.getElementById("playerStatusBadges");
  if (pBadges) {
    const items = [];
    if (stand && stand.id !== "none") {
      items.push(`<span class="status-pill">${stand.icon} Stand: ${escapeHTML(stand.name)}</span>`);
    }
    if (battleState.ultimateTurns > 0) {
      const cls = getActiveClassObj();
      items.push(`<span class="status-pill">🔥 ${escapeHTML(cls.ultName)} (${battleState.ultimateTurns}t)</span>`);
    }
    if (battleState.playerStatuses.clone_shield > 0) {
      items.push(`<span class="status-pill">👥 Barreira Ativa</span>`);
    }
    if (battleState.playerShield > 0) {
      items.push(`<span class="status-pill">🛡 Escudo ${battleState.playerShield}</span>`);
    }
    if (isConsistencyAuraActive()) {
      items.push(`<span class="status-pill">🔥 Aura de Consistência</span>`);
    }
    if (dungeonRun.active) {
      const dg = getActiveDungeon();
      items.push(`<span class="status-pill" style="border-color:var(--gold);">🏰 Onda ${dungeonRun.waveIdx + 1}/${dg ? dg.waves.length : 3}</span>`);
    }
    if (battleState.defending) {
      items.push(`<span class="status-pill">🛡️ Defendendo</span>`);
    }
    pBadges.innerHTML = items.join("");
  }

  const eBadges = document.getElementById("enemyStatusBadges");
  if (eBadges) {
    const items = [];
    if (battleState.bossPhase === 2) {
      items.push(`<span class="status-pill" style="border-color:var(--red);color:var(--gold);">👑 FASE 2 DESPERTA</span>`);
    }
    if (battleState.enemyStatuses.burn > 0) {
      items.push(`<span class="status-pill">🔥 Queimadura (${battleState.enemyStatuses.burn}t)</span>`);
    }
    if (battleState.enemyStatuses.stun > 0) {
      items.push(`<span class="status-pill">⚡ Paralisado (${battleState.enemyStatuses.stun}t)</span>`);
    }
    if (battleState.enemyStatuses.bleed > 0) {
      items.push(`<span class="status-pill">🩸 Sangramento (${battleState.enemyStatuses.bleed}t)</span>`);
    }
    if (battleState.enemyStatuses.freeze > 0) {
      items.push(`<span class="status-pill" style="border-color:#38bdf8;">❄️ Congelado (${battleState.enemyStatuses.freeze}t)</span>`);
    }
    if (battleState.enemyStatuses.poisonStacks > 0) {
      items.push(`<span class="status-pill" style="border-color:#a855f7;">🧪 Veneno ${battleState.enemyStatuses.poisonStacks}x (${battleState.enemyStatuses.poisonTurns}t)</span>`);
    }
    eBadges.innerHTML = items.join("");
  }
}

function renderBattle() {
  const enemy = getCurrentEnemy();
  const totals = getTotalStats();
  const cls = getActiveClassObj();
  const stand = getActiveStandObj();

  // Galeria de Chefes
  const bossBar = document.getElementById("bossQuickSelectBar");
  const bossCountTag = document.getElementById("bossDefeatedCountTag");
  const allBosses = enemiesCatalog.filter(e => e.isBoss);
  if (bossCountTag) {
    bossCountTag.textContent = `${(game.defeatedBosses || []).length}/${allBosses.length} CHEFES DERROTADOS`;
  }
  if (bossBar) {
    bossBar.innerHTML = allBosses.map(b => {
      const defeated = (game.defeatedBosses || []).includes(b.id);
      const tierLabel = b.bossTier === "secret" ? "🕳️ SECRETO" : b.bossTier === "world" ? "🌍 MUNDIAL" : `👑 ${escapeHTML(b.anime)}`;
      return `
        <div class="boss-card ${defeated ? "defeated" : ""}">
          <div style="display:flex;align-items:center;gap:10px;">
            <canvas class="card-portrait-canvas" id="bossCardCanvas_${escapeHTML(b.id)}" width="56" height="56"></canvas>
            <div>
              <span class="rarity-badge ${defeated ? "rarity-legendary" : b.bossTier === "world" ? "rarity-secret" : "rarity-mythic"}">${defeated ? "🏆 Derrotado" : tierLabel}</span>
              <strong>${escapeHTML(b.name.replace(" (Chefe)", ""))}</strong>
              <small>HP: ${b.hp} • ATK: ${b.atk} • 2 Fases</small>
            </div>
          </div>
          <button class="secondary-btn" style="padding:6px 10px;font-size:13px;" data-action="challenge-boss" data-id="${escapeHTML(b.id)}">⚔ Desafiar Chefe</button>
        </div>
      `;
    }).join("");

    allBosses.forEach(b => {
      const bc = document.getElementById(`bossCardCanvas_${b.id}`);
      if (bc) {
        const bctx = bc.getContext("2d");
        bctx.clearRect(0, 0, 56, 56);
        drawSprite(bctx, b.look, 14, 12, 2.4, {
          frame: 0,
          dir: "down",
          moving: false,
          hasSword: true,
          standId: b.standId || null
        });
      }
    });
  }

  const phaseBanner = document.getElementById("bossPhaseBanner");
  const enemyCard = document.getElementById("enemyFighterCard");
  if (phaseBanner) {
    if (battleState.bossIntentText) {
      phaseBanner.classList.remove("hidden");
      phaseBanner.textContent = battleState.bossIntentText;
    } else if (battleState.bossPhase === 2) {
      phaseBanner.classList.remove("hidden");
      phaseBanner.textContent = `⚠️ CHEFE EM FASE 2: ${(enemy.phase2Name || enemy.name).toUpperCase()} (+25% PODER)!`;
    } else {
      phaseBanner.classList.add("hidden");
    }
  }
  if (enemyCard) {
    if (battleState.bossPhase === 2) enemyCard.classList.add("phase-two");
    else enemyCard.classList.remove("phase-two");
  }

  const enemySelect = document.getElementById("battleEnemySelect");
  if (enemySelect && enemySelect.options.length !== enemiesCatalog.length) {
    enemySelect.innerHTML = enemiesCatalog.map(e =>
      `<option value="${escapeHTML(e.id)}">${e.isBoss ? "👑 CHEFE: " : "⚔️ "}${escapeHTML(e.name)} (${escapeHTML(e.anime)})</option>`
    ).join("");
  }
  if (enemySelect) enemySelect.value = battleState.enemyId;

  const setText = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  };

  setText("battlePlayerName", game.name);
  setText("battlePlayerLvl", `Nv. ${game.level} • ${cls.name}`);
  setText("battlePlayerHp", `${game.hp}/${totals.maxHp}`);
  setText("battlePlayerMp", `${game.mp}/${totals.maxMp}`);
  setText("battleRageText", `${battleState.rage}%`);
  setText("battleEnemyName", battleState.bossPhase === 2 && enemy.phase2Name ? enemy.phase2Name : enemy.name);
  setText("battleEnemyTag", enemy.isBoss ? `👑 CHEFE • ${enemy.anime}` : enemy.anime);
  setText("battleEnemyHp", `${battleState.enemyHp}/${battleState.enemyMaxHp}`);
  setText("battleEnemyDesc", `${enemy.desc} (+${enemy.xp} XP, +${enemy.coins} 🪙)`);
  setText("battleTurnIndicator", `Turno ${battleState.turnCount}`);

  const pHpBar = document.getElementById("battlePlayerHpBar");
  const pMpBar = document.getElementById("battlePlayerMpBar");
  const pRageBar = document.getElementById("battleRageBar");
  const eHpBar = document.getElementById("battleEnemyHpBar");

  if (pHpBar) pHpBar.style.width = Math.min(100, Math.round((game.hp / totals.maxHp) * 100)) + "%";
  if (pMpBar) pMpBar.style.width = Math.min(100, Math.round((game.mp / totals.maxMp) * 100)) + "%";
  if (pRageBar) pRageBar.style.width = Math.min(100, battleState.rage) + "%";
  if (eHpBar) eHpBar.style.width = Math.min(100, Math.round((battleState.enemyHp / battleState.enemyMaxHp) * 100)) + "%";

  const isLocked = !!battleState.turnLocked;
  ["btnAttack", "btnDefend", "btnUseItem", "btnFlee"].forEach(id => {
    const b = document.getElementById(id);
    if (b) b.disabled = isLocked;
  });

  const standBtn = document.getElementById("btnSummonStand");
  if (standBtn) {
    if (!stand || stand.id === "none") {
      standBtn.disabled = isLocked;
      standBtn.textContent = "👻 Sem Stand (Despertar)";
    } else {
      const cd = battleState.standCooldown || 0;
      standBtn.disabled = isLocked || cd > 0;
      standBtn.textContent = cd > 0
        ? `👻 ${stand.name} (CD: ${cd}t)`
        : `👻 ${stand.name} (${stand.mpCost} EN)`;
    }
  }

  const ultBtn = document.getElementById("btnUltimate");
  if (ultBtn) {
    ultBtn.disabled = isLocked || battleState.rage < 100;
    ultBtn.textContent = battleState.rage >= 100
      ? `🔥 DESPERTAR: ${cls.ultName}!`
      : `🔥 Despertar (${battleState.rage}%)`;
  }

  const skillsBar = document.getElementById("battleSkillsBar");
  if (skillsBar) {
    const equippedIds = getCombatAvailableSkills();
    if (!equippedIds.length) {
      skillsBar.innerHTML = `<button class="skill-use-btn" data-action="cast-skill" data-id="" ${isLocked ? "disabled" : ""}>✨ Desbloqueie habilidades na aba Habilidades para usá-las em combate!</button>`;
    } else {
      const perks = getClassCombatPerks();
      skillsBar.innerHTML = equippedIds.map(skId => {
        const sk = skills.find(s => s.id === skId);
        if (!sk) return "";
        const cd = battleState.skillCooldowns[sk.id] || 0;
        const lvl = game.skillLevels[sk.id] || 1;
        const isSig = perks.signatureSkillId === sk.id && !game.unlockedSkills.includes(sk.id);
        return `
          <button class="skill-use-btn" data-action="cast-skill" data-id="${escapeHTML(sk.id)}" ${cd > 0 || isLocked ? "disabled" : ""}>
            <div>${sk.icon} ${escapeHTML(sk.name)} ${isSig ? "(Classe)" : `(Nv.${lvl})`}</div>
            <small>${cd > 0 ? `⏳ Recarga: ${cd} turno(s)` : `💧 ${sk.mpCost} EN • ⚡ Poder ${sk.power}`}</small>
          </button>
        `;
      }).join("");
    }
  }

  renderStatusBadges();

  const logEl = document.getElementById("battleLog");
  if (logEl) {
    logEl.innerHTML = battleState.log.map(item =>
      `<p class="${escapeHTML(item.cls || "")}">${escapeHTML(item.text)}</p>`
    ).join("");
  }

  drawBattleCanvas();
}

function drawBattleSpecialEffect(ctx, W, H) {
  if (battleState.effectTimer <= 0) return;

  const targetX = battleState.effectTarget === "enemy" ? W - 220 : 190;
  const targetY = battleState.effectTarget === "enemy" ? 132 : 168;
  const sourceX = battleState.effectTarget === "enemy" ? 210 : W - 235;
  const sourceY = battleState.effectTarget === "enemy" ? 168 : 132;

  ctx.save();
  const type = battleState.effectType || "slash";

  if (type === "beam") {
    const beamGrad = ctx.createLinearGradient(sourceX, sourceY, targetX, targetY);
    beamGrad.addColorStop(0, "#ffffff");
    beamGrad.addColorStop(0.4, battleState.effectColor);
    beamGrad.addColorStop(1, "#3b82f6");
    ctx.strokeStyle = beamGrad;
    ctx.lineWidth = 22 + (battleState.effectTimer % 4) * 3;
    ctx.beginPath();
    ctx.moveTo(sourceX, sourceY);
    ctx.lineTo(targetX, targetY);
    ctx.stroke();

    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(targetX, targetY, 32, 0, Math.PI * 2);
    ctx.fill();
  } else if (type === "time_stop") {
    ctx.fillStyle = "rgba(250, 204, 21, 0.22)";
    ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = "#fde047";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(targetX, targetY, (24 - battleState.effectTimer) * 14, 0, Math.PI * 2);
    ctx.stroke();
  } else if (type === "stand_rush") {
    for (let i = 0; i < 6; i++) {
      const fx = targetX - 55 + ((battleState.effectTimer * 17 + i * 23) % 90);
      const fy = targetY - 45 + ((battleState.effectTimer * 13 + i * 19) % 80);
      ctx.fillStyle = battleState.effectColor || "#a855f7";
      ctx.beginPath();
      ctx.arc(fx, fy, 11, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#ffffff";
      ctx.font = "800 13px 'Chakra Petch', sans-serif";
      ctx.fillText("ORA!", fx - 14, fy - 12);
    }
  } else if (type === "lightning") {
    ctx.strokeStyle = "#fde047";
    ctx.lineWidth = 4;
    for (let i = 0; i < 4; i++) {
      ctx.beginPath();
      ctx.moveTo(targetX - 35 + i * 20, targetY - 75);
      ctx.lineTo(targetX - 15 + i * 10, targetY - 25);
      ctx.lineTo(targetX - 30 + i * 15, targetY);
      ctx.lineTo(targetX, targetY + 40);
      ctx.stroke();
    }
  } else if (type === "sphere") {
    for (let r = 12; r <= 42; r += 10) {
      ctx.strokeStyle = r === 12 ? "#ffffff" : (battleState.effectColor || "#54d9f5");
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(targetX, targetY, r, 0, Math.PI * 2);
      ctx.stroke();
    }
  } else if (type === "freeze") {
    ctx.strokeStyle = "#bae6fd";
    ctx.fillStyle = "rgba(56, 189, 248, 0.32)";
    ctx.beginPath();
    ctx.arc(targetX, targetY, 42, 0, Math.PI * 2);
    ctx.fill();
    ctx.lineWidth = 3;
    for (let i = 0; i < 6; i++) {
      const a = (Math.PI * i) / 3;
      ctx.beginPath();
      ctx.moveTo(targetX - Math.cos(a) * 34, targetY - Math.sin(a) * 34);
      ctx.lineTo(targetX + Math.cos(a) * 34, targetY + Math.sin(a) * 34);
      ctx.stroke();
    }
  } else if (type === "poison") {
    for (let i = 0; i < 6; i++) {
      const bx = targetX - 30 + ((battleState.effectTimer * 11 + i * 19) % 60);
      const by = targetY - 25 + ((battleState.effectTimer * 7 + i * 17) % 50);
      ctx.fillStyle = i % 2 === 0 ? "#a855f7" : "#4ade80";
      ctx.beginPath();
      ctx.arc(bx, by, 7, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (type === "drain") {
    ctx.strokeStyle = "#e11d48";
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(targetX, targetY);
    ctx.quadraticCurveTo(W / 2, 70, sourceX, sourceY);
    ctx.stroke();
  } else if (type === "clones") {
    drawSprite(ctx, getGameLook(), 240, 128, 3, { frame: 1, dir: "right", moving: true, auraColor: "#54d9f5" });
    drawSprite(ctx, getGameLook(), 110, 142, 3, { frame: 2, dir: "right", moving: true, auraColor: "#54d9f5" });
  } else {
    ctx.strokeStyle = battleState.effectColor;
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(targetX - 42, targetY - 42);
    ctx.lineTo(targetX + 42, targetY + 42);
    ctx.moveTo(targetX + 42, targetY - 42);
    ctx.lineTo(targetX - 42, targetY + 42);
    ctx.stroke();
  }

  ctx.restore();
}

function drawBattleCanvas() {
  const battlePage = document.getElementById("page-battle");
  if (battlePage && battlePage.classList && !battlePage.classList.contains("active")) return;
  const canvas = document.getElementById("battleCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  ctx.imageSmoothingEnabled = false;
  const W = canvas.width;
  const H = canvas.height;
  const enemy = getCurrentEnemy();
  const cls = getActiveClassObj();
  const isPhase2 = battleState.bossPhase === 2;

  const shakeCamX = battleState.screenShakeTimer > 0 ? (battleState.screenShakeTimer % 2 === 0 ? -4 : 4) : 0;
  const shakeCamY = battleState.screenShakeTimer > 0 ? (battleState.screenShakeTimer % 2 === 0 ? 3 : -3) : 0;
  ctx.clearRect(0, 0, W, H);
  ctx.save();
  ctx.translate(shakeCamX, shakeCamY);

  // 1. Base de Floresta Profunda 16-Bit (Inspirada na Ref 2)
  ctx.fillStyle = isPhase2 ? "#1c0812" : "#0b160e";
  ctx.fillRect(0, 0, W, H);

  // Sub-bosque musgoso ao redor da clareira
  ctx.fillStyle = isPhase2 ? "#2d101c" : "#1f3514";
  ctx.beginPath();
  ctx.ellipse(W * 0.5, H * 0.62, W * 0.52, H * 0.52, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = isPhase2 ? "#3f1728" : "#2f4c1c";
  ctx.beginPath();
  ctx.ellipse(W * 0.5, H * 0.66, W * 0.45, H * 0.44, 0, 0, Math.PI * 2);
  ctx.fill();

  // 2. Clareira de Areia Dourada / Terra Quente com Textura Pixelada (Ref 2)
  // Sombra de transição da clareira
  ctx.fillStyle = isPhase2 ? "#6b3838" : "#9c7b48";
  ctx.beginPath();
  ctx.ellipse(W * 0.48, H * 0.69, W * 0.39, H * 0.36, 0, 0, Math.PI * 2);
  ctx.fill();

  // Base de areia quente
  ctx.fillStyle = isPhase2 ? "#b88276" : "#dcb97c";
  ctx.beginPath();
  ctx.ellipse(W * 0.48, H * 0.70, W * 0.37, H * 0.34, 0, 0, Math.PI * 2);
  ctx.fill();

  // Textura quadriculada/pixelada de areia na clareira
  for (let sy = Math.floor(H * 0.37); sy < H - 8; sy += 8) {
    for (let sx = Math.floor(W * 0.12); sx < Math.floor(W * 0.84); sx += 10) {
      const dx = (sx - W * 0.48) / (W * 0.35);
      const dy = (sy - H * 0.70) / (H * 0.32);
      if (dx * dx + dy * dy <= 0.94) {
        const hash = (sx * 13 + sy * 29) % 11;
        if (hash < 3) {
          ctx.fillStyle = isPhase2 ? "#a67064" : "#cfa968";
          ctx.fillRect(sx, sy, 6, 4);
        } else if (hash === 7) {
          ctx.fillStyle = isPhase2 ? "#c9968a" : "#e8ca92";
          ctx.fillRect(sx + 2, sy + 2, 4, 3);
        }
      }
    }
  }

  // 3. Árvores Pixel-Art com Troncos Retorcidos e Copas Coloridas (Azul, Verde e Roxo - Ref 2)
  const drawForestTree = (tx, ty, palette) => {
    // Sombra no chão
    ctx.fillStyle = "rgba(0,0,0,0.42)";
    ctx.beginPath();
    ctx.ellipse(tx, ty + 28, 34, 11, 0, 0, Math.PI * 2);
    ctx.fill();

    // Tronco retorcido com raízes (estilo pixel art da Ref 2)
    ctx.fillStyle = "#2b1d26";
    ctx.fillRect(tx - 15, ty - 28, 30, 52);
    ctx.fillRect(tx - 24, ty + 12, 48, 12); // raízes largas
    ctx.fillStyle = "#523c49";
    ctx.fillRect(tx - 12, ty - 26, 24, 48);
    ctx.fillRect(tx - 20, ty + 14, 14, 9);
    ctx.fillRect(tx + 8, ty + 14, 14, 9);
    ctx.fillStyle = "#6e5362";
    ctx.fillRect(tx - 6, ty - 22, 10, 40);
    ctx.fillRect(tx - 14, ty + 15, 8, 6);
    // Veios escuros da casca
    ctx.fillStyle = "#362530";
    ctx.fillRect(tx - 2, ty - 16, 3, 28);
    ctx.fillRect(tx + 5, ty - 10, 2, 22);

    // Copa densa de folhas em clusters pixelados
    const [darkC, midC, lightC, specC] = palette;
    ctx.fillStyle = "#090d12";
    ctx.beginPath();
    ctx.arc(tx, ty - 42, 42, 0, Math.PI * 2);
    ctx.arc(tx - 28, ty - 30, 28, 0, Math.PI * 2);
    ctx.arc(tx + 28, ty - 30, 28, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = darkC;
    ctx.beginPath();
    ctx.arc(tx, ty - 42, 39, 0, Math.PI * 2);
    ctx.arc(tx - 26, ty - 30, 25, 0, Math.PI * 2);
    ctx.arc(tx + 26, ty - 30, 25, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = midC;
    ctx.beginPath();
    ctx.arc(tx - 4, ty - 48, 31, 0, Math.PI * 2);
    ctx.arc(tx - 22, ty - 34, 19, 0, Math.PI * 2);
    ctx.arc(tx + 20, ty - 36, 19, 0, Math.PI * 2);
    ctx.fill();

    // Clusters de folhas brilhantes orgânicas em pixel-art
    ctx.fillStyle = lightC;
    const leafPuffs = [
      [-18, -58, 12, 8], [-4, -64, 14, 9], [10, -56, 12, 8],
      [-26, -42, 11, 8], [-10, -46, 15, 9], [8, -42, 13, 8],
      [-16, -30, 12, 7], [2, -30, 12, 7]
    ];
    leafPuffs.forEach(([ox, oy, lw, lh]) => {
      ctx.fillRect(tx + ox, ty + oy, lw, lh);
    });
    ctx.fillStyle = specC;
    ctx.fillRect(tx - 14, ty - 56, 6, 4);
    ctx.fillRect(tx - 2, ty - 62, 7, 4);
    ctx.fillRect(tx + 12, ty - 54, 5, 4);
    ctx.fillRect(tx - 22, ty - 40, 5, 4);
    ctx.fillRect(tx - 6, ty - 44, 6, 4);
  };

  const blueCanopy = ["#172554", "#1d4ed8", "#2563eb", "#60a5fa"];
  const greenCanopy = ["#14532d", "#15803d", "#22c55e", "#86efac"];
  const purpleCanopy = ["#2e1065", "#4c1d95", "#6d28d9", "#a78bfa"];

  // Fileira de árvores ao fundo e nas laterais formando o anfiteatro natural (Ref 2)
  drawForestTree(115, 76, blueCanopy);
  drawForestTree(255, 62, blueCanopy);
  drawForestTree(365, 58, greenCanopy);
  drawForestTree(465, 64, purpleCanopy);
  drawForestTree(585, 56, purpleCanopy);
  drawForestTree(695, 72, greenCanopy);
  // Árvores laterais emoldurando a clareira
  drawForestTree(38, 148, blueCanopy);
  drawForestTree(732, 152, purpleCanopy);
  drawForestTree(22, 232, greenCanopy);

  // 4. Samambaias (Ferns) e Arbustos Pontiagudos ao redor da clareira (Ref 2)
  const drawFernBush = (fx, fy, tone = "green") => {
    const isGold = tone === "gold";
    const cDark = isGold ? "#451a03" : "#14532d";
    const cMid = isGold ? "#a16207" : "#3f6212";
    const cBright = isGold ? "#eab308" : "#84cc16";
    // Sombra
    ctx.fillStyle = "rgba(0,0,0,0.32)";
    ctx.fillRect(fx - 14, fy + 4, 28, 5);
    // Folhas pontiagudas em leque
    const fronds = [
      [-14, -8, 6, 12], [-8, -14, 6, 18], [-2, -16, 6, 20],
      [4, -14, 6, 18], [10, -8, 6, 12]
    ];
    ctx.fillStyle = "#090d12";
    fronds.forEach(([ox, oy, w, h]) => ctx.fillRect(fx + ox - 1, fy + oy - 1, w + 2, h + 2));
    ctx.fillStyle = cDark;
    fronds.forEach(([ox, oy, w, h]) => ctx.fillRect(fx + ox, fy + oy, w, h));
    ctx.fillStyle = cMid;
    fronds.forEach(([ox, oy, w, h]) => ctx.fillRect(fx + ox + 1, fy + oy + 1, w - 2, h - 4));
    ctx.fillStyle = cBright;
    fronds.forEach(([ox, oy]) => ctx.fillRect(fx + ox + 1, fy + oy + 1, 3, 4));
  };

  // Samambaias na borda superior e nas laterais da clareira
  drawFernBush(195, 108, "green");
  drawFernBush(305, 106, "gold");
  drawFernBush(402, 102, "gold");
  drawFernBush(525, 104, "green");
  drawFernBush(142, 144, "green");
  drawFernBush(105, 185, "gold");
  drawFernBush(102, 212, "green");
  drawFernBush(595, 146, "green");
  // Samambaias no primeiro plano (borda inferior como na Ref 2)
  drawFernBush(125, H - 14, "green");
  drawFernBush(308, H - 12, "green");
  drawFernBush(485, H - 14, "green");
  drawFernBush(618, H - 24, "gold");
  drawFernBush(642, H - 10, "green");

  // 5. Pequenos Cogumelos Coloridos Pixelados na Clareira (Vermelho, Azul, Amarelo, Verde - Ref 2)
  const drawTinyMushroom = (mx, my, capColor) => {
    ctx.fillStyle = "rgba(0,0,0,0.3)";
    ctx.fillRect(mx - 3, my + 3, 7, 2);
    ctx.fillStyle = "#090d12";
    ctx.fillRect(mx - 4, my - 5, 9, 9);
    ctx.fillStyle = "#fde68a"; // caule
    ctx.fillRect(mx - 1, my, 3, 3);
    ctx.fillStyle = capColor; // chapéu
    ctx.fillRect(mx - 3, my - 4, 7, 4);
    ctx.fillStyle = "#ffffff"; // pintinha brilhante
    ctx.fillRect(mx - 2, my - 3, 2, 2);
  };

  drawTinyMushroom(275, 134, "#ef4444");
  drawTinyMushroom(312, 136, "#3b82f6");
  drawTinyMushroom(336, 162, "#eab308");
  drawTinyMushroom(364, 152, "#22c55e");
  drawTinyMushroom(252, 118, "#22c55e");
  drawTinyMushroom(602, 212, "#3b82f6");

  // 6. Círculo Pixelado Brilhante sob os Pés do Jogador e do Inimigo (Ref 2)
  const playerFootX = 190;
  const playerFootY = 196;
  const enemyFootX = W - 220;
  const enemyFootY = 148;

  // Anel verde neon pixelado sob o jogador (exatamente como na Ref 2)
  ctx.fillStyle = "rgba(34, 197, 94, 0.28)";
  ctx.beginPath();
  ctx.ellipse(playerFootX, playerFootY, 34, 12, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#4ade80";
  ctx.lineWidth = 3;
  ctx.setLineDash([6, 4]);
  ctx.beginPath();
  ctx.ellipse(playerFootX, playerFootY, 30, 10, 0, 0, Math.PI * 2);
  ctx.stroke();
  ctx.setLineDash([]);

  // Anel sob o inimigo / chefe
  ctx.fillStyle = isPhase2 ? "rgba(239, 68, 68, 0.30)" : "rgba(245, 158, 11, 0.24)";
  ctx.beginPath();
  ctx.ellipse(enemyFootX, enemyFootY, 38, 13, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = isPhase2 ? "#ef4444" : (enemy.isBoss ? "#fbbf24" : "#f97316");
  ctx.lineWidth = 3;
  ctx.setLineDash([6, 4]);
  ctx.beginPath();
  ctx.ellipse(enemyFootX, enemyFootY, 34, 11, 0, 0, Math.PI * 2);
  ctx.stroke();
  ctx.setLineDash([]);

  // 7. Renderização do Jogador + Stand + Companheiro na Clareira
  const baseLook = getGameLook();
  const playerBattleLook = battleState.ultimateTurns > 0
    ? { ...baseLook, hairColor: cls.ultHair || baseLook.hairColor }
    : baseLook;

  const pFrame = Math.floor(battleState.animTick / 12) % 2;
  const pShakeX = (battleState.playerHitShake > 0 ? (battleState.playerHitShake % 2 === 0 ? -6 : 6) : 0) + (battleState.playerDashX || 0);

  drawSprite(ctx, playerBattleLook, playerFootX - 38 + pShakeX, playerFootY - 76, 4.8, {
    frame: pFrame,
    dir: "right",
    moving: true,
    auraColor: battleState.ultimateTurns > 0
      ? (cls.ultColor || "#fbbf24")
      : battleState.defending
        ? "#38bdf8"
        : (game.equippedSkills.length ? cls.ultColor : null),
    hasSword: Boolean(game.equippedItems.weapon),
    standId: game.equippedStand
  });

  if (game.companion && game.companion !== "none") {
    drawCompanionSprite(ctx, game.companion, playerFootX - 82, playerFootY - 38, 3, pFrame);
  }

  // 8. Renderização do Inimigo / Chefe na Diagonal Superior Direita da Clareira (Ref 2)
  const eScale = enemy.isBoss ? 5.2 : 4.8;
  const eShakeX = (battleState.enemyHitShake > 0 ? (battleState.enemyHitShake % 2 === 0 ? 7 : -7) : 0) + (battleState.enemyDashX || 0);

  ctx.save();
  if (battleState.defeatAnimTimer > 0) {
    ctx.globalAlpha = Math.max(0.2, battleState.defeatAnimTimer / 22);
  }
  drawSprite(ctx, enemy.look, enemyFootX - 40 + eShakeX, enemyFootY - 80, eScale, {
    frame: Math.floor((battleState.animTick + 6) / 12) % 2,
    dir: "left",
    moving: true,
    auraColor: isPhase2 ? "#ef4444" : (enemy.isBoss ? "#fbbf24" : "#f97316"),
    hasSword: enemy.isBoss,
    standId: enemy.standId || null
  });
  ctx.restore();

  // 9. Efeitos Especiais de Ataque / Poder / Stand
  drawBattleSpecialEffect(ctx, W, H);

  // 10. Partículas de Impacto com Contorno
  battleState.particles.forEach(pt => {
    ctx.fillStyle = "#090b10";
    ctx.fillRect(pt.x - 1, pt.y - 1, pt.size + 2, pt.size + 2);
    ctx.fillStyle = pt.color;
    ctx.fillRect(pt.x, pt.y, pt.size, pt.size);
  });

  // 11. Molduras Flutuantes de Status em Cobre/Madeira no Canvas (Exatamente como na Ref 2)
  const drawCopperStatusPill = (opts) => {
    const { x, y, w, h, name, level, hp, maxHp, mp, maxMp, orbSide, orbColors } = opts;
    ctx.save();

    // Nome e Nível acima da pílula com contorno pixelado preto
    ctx.font = "800 12px 'Chakra Petch', sans-serif";
    ctx.lineWidth = 3.5;
    ctx.strokeStyle = "#05070b";
    ctx.fillStyle = "#ffffff";
    const nameX = orbSide === "left" ? x + 46 : x + 14;
    const lvlText = `Lvl ${level}`;
    const lvlW = ctx.measureText(lvlText).width;
    const lvlX = orbSide === "left" ? x + w - lvlW - 10 : x + w - 48 - lvlW;
    const maxNameW = Math.max(40, lvlX - nameX - 8);
    let dispName = String(name || "").replace(/\s*\(Chefe\)/i, "").trim().toUpperCase();
    while (dispName.length > 3 && ctx.measureText(dispName).width > maxNameW) {
      dispName = dispName.slice(0, -2) + "…";
    }
    ctx.strokeText(dispName, nameX, y - 5);
    ctx.fillText(dispName, nameX, y - 5);
    ctx.strokeText(lvlText, lvlX, y - 5);
    ctx.fillText(lvlText, lvlX, y - 5);

    // Sombra da pílula
    ctx.fillStyle = "rgba(0,0,0,0.45)";
    ctx.beginPath();
    ctx.roundRect(x + 2, y + 3, w, h, h / 2);
    ctx.fill();

    // Borda externa preta
    ctx.fillStyle = "#1c1008";
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, h / 2);
    ctx.fill();

    // Moldura de cobre/madeira entalhada
    const frameGrad = ctx.createLinearGradient(x, y, x, y + h);
    frameGrad.addColorStop(0, "#d97706");
    frameGrad.addColorStop(0.5, "#92400e");
    frameGrad.addColorStop(1, "#78350f");
    ctx.fillStyle = frameGrad;
    ctx.beginPath();
    ctx.roundRect(x + 2, y + 2, w - 4, h - 4, (h - 4) / 2);
    ctx.fill();

    // Interior ardósia escuro da pílula
    const innerX = orbSide === "left" ? x + 40 : x + 6;
    const innerW = w - 46;
    ctx.fillStyle = "#1c1917";
    ctx.beginPath();
    ctx.roundRect(innerX, y + 5, innerW, h - 10, (h - 10) / 2);
    ctx.fill();
    ctx.fillStyle = "#44403c";
    ctx.beginPath();
    ctx.roundRect(innerX + 2, y + 7, innerW - 4, h - 14, (h - 14) / 2);
    ctx.fill();

    // Engaste circular do Orbe (Esquerda para Jogador, Direita para Inimigo)
    const orbCX = orbSide === "left" ? x + 22 : x + w - 22;
    const orbCY = y + h / 2;
    const orbR = Math.floor(h / 2) - 2;
    ctx.fillStyle = "#1c1008";
    ctx.beginPath(); ctx.arc(orbCX, orbCY, orbR + 2, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#b45309";
    ctx.beginPath(); ctx.arc(orbCX, orbCY, orbR, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = orbColors[0];
    ctx.beginPath(); ctx.arc(orbCX, orbCY, orbR - 4, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = orbColors[1];
    ctx.beginPath(); ctx.arc(orbCX - 1, orbCY - 1, orbR - 6, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = orbColors[2];
    ctx.fillRect(orbCX - 5, orbCY - 6, 4, 4);

    // Barras internas (PV e PL/EN)
    const drawMiniBar = (bx, by, bw, bh, label, val, maxVal, fillStart, fillEnd) => {
      ctx.font = "800 10px 'Chakra Petch', sans-serif";
      ctx.fillStyle = "#f5f5f4";
      ctx.fillText(label, bx, by + bh - 2);
      const trackX = bx + 22;
      const trackW = bw - 22;
      ctx.fillStyle = "#1c1917";
      ctx.beginPath(); ctx.roundRect(trackX, by, trackW, bh, 4); ctx.fill();
      const ratio = Math.max(0, Math.min(1, val / Math.max(1, maxVal)));
      if (ratio > 0) {
        const g = ctx.createLinearGradient(trackX, by, trackX + trackW, by);
        g.addColorStop(0, fillStart);
        g.addColorStop(1, fillEnd);
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.roundRect(trackX + 1, by + 1, Math.max(4, (trackW - 2) * ratio), bh - 2, 3); ctx.fill();
      }
      // Valor numérico centralizado
      const txt = `${Math.max(0, Math.round(val))}/${Math.round(maxVal)}`;
      ctx.font = "700 9px 'JetBrains Mono', monospace";
      const tw = ctx.measureText(txt).width;
      ctx.fillStyle = "#ffffff";
      ctx.fillText(txt, trackX + (trackW - tw) / 2, by + bh - 2);
    };

    if (mp !== undefined && maxMp !== undefined) {
      drawMiniBar(innerX + 10, y + 10, innerW - 20, 11, "PV:", hp, maxHp, "#b91c1c", "#ef4444");
      drawMiniBar(innerX + 10, y + 25, innerW - 20, 11, "PL:", mp, maxMp, "#1d4ed8", "#3b82f6");
    } else {
      drawMiniBar(innerX + 10, y + Math.floor((h - 12) / 2), innerW - 20, 12, "PV:", hp, maxHp, "#b91c1c", "#ef4444");
    }

    ctx.restore();
  };

  // Pílula Superior Esquerda: Jogador (Orbe Verde + PV/PL)
  const totals = getTotalStats();
  drawCopperStatusPill({
    x: 18,
    y: 22,
    w: 236,
    h: 46,
    name: game.name || "Herói",
    level: game.level,
    hp: game.hp,
    maxHp: totals.maxHp,
    mp: game.mp,
    maxMp: totals.maxMp,
    orbSide: "left",
    orbColors: ["#15803d", "#22c55e", "#bbf7d0"]
  });

  // Pílula Inferior Direita: Inimigo / Chefe (Orbe Vermelho + PV)
  drawCopperStatusPill({
    x: W - 254,
    y: H - 60,
    w: 236,
    h: 42,
    name: enemy.name || "Inimigo",
    level: Math.max(1, ((enemy.zone || 0) + 1) * 2 + (enemy.isBoss ? 2 : 0)),
    hp: battleState.enemyHp,
    maxHp: battleState.enemyMaxHp,
    orbSide: "right",
    orbColors: ["#991b1b", "#ef4444", "#fecaca"]
  });

  // 12. Indicadores Flutuantes de Dano e Crítico + Combo + Banner JoJo Stand Cut-In
  if ((battleState.combo || 0) >= 2) {
    ctx.save();
    ctx.fillStyle = "rgba(15, 23, 42, 0.88)";
    ctx.strokeStyle = "#f59e0b";
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.roundRect(18, 76, 118, 26, 8); ctx.fill(); ctx.stroke();
    ctx.font = "800 13px 'Chakra Petch', sans-serif";
    ctx.fillStyle = "#fde047";
    ctx.fillText(`🔥 COMBO x${battleState.combo}`, 28, 94);
    ctx.restore();
  }

  if (battleState.enemyShield > 0) {
    ctx.save();
    ctx.font = "800 11px 'JetBrains Mono', monospace";
    ctx.fillStyle = "#38bdf8";
    ctx.strokeStyle = "#05070b";
    ctx.lineWidth = 3;
    const shTxt = `🛡 Escudo Inimigo: ${battleState.enemyShield}`;
    ctx.strokeText(shTxt, W - 245, H - 70);
    ctx.fillText(shTxt, W - 245, H - 70);
    ctx.restore();
  }

  if ((battleState.standSummonTimer || 0) > 10) {
    const st = getActiveStandObj();
    if (st && st.id !== "none") {
      ctx.save();
      ctx.fillStyle = "rgba(88, 28, 135, 0.72)";
      ctx.fillRect(0, 88, W, 38);
      ctx.font = "900 18px 'Chakra Petch', sans-serif";
      ctx.fillStyle = st.auraColor || "#fde047";
      ctx.fillText(`ゴゴゴ ${st.name.toUpperCase()} — "${st.cry}" ゴゴゴ`, 40, 113);
      ctx.restore();
    }
  }

  if ((battleState.critFlashTimer || 0) > 0) {
    ctx.save();
    ctx.fillStyle = `rgba(254, 240, 138, ${Math.min(0.28, battleState.critFlashTimer * 0.04)})`;
    ctx.fillRect(0, 0, W, H);
    ctx.restore();
  }

  battleState.floatingTexts.forEach(ft => {
    ctx.save();
    ctx.globalAlpha = Math.max(0, ft.alpha);
    ctx.font = ft.isBig ? "800 19px 'Chakra Petch', sans-serif" : "700 16px 'Chakra Petch', sans-serif";
    ctx.lineWidth = 4;
    ctx.strokeStyle = "#05070b";
    ctx.strokeText(ft.text, ft.x, ft.y);
    ctx.fillStyle = ft.color;
    ctx.fillText(ft.text, ft.x, ft.y);
    ctx.restore();
  });
  ctx.restore();
}

let battleLoopTimeout = null;
function scheduleNextBattleFrame() {
  battleLoopTimeout = null;
  if (typeof document !== "undefined" && document.hidden) {
    battleLoopTimeout = setTimeout(() => { battleLoopId = requestAnimationFrame(battleLoop); }, 450);
    return;
  }
  const q = game.gfxQuality || "high";
  if (q === "low") {
    battleLoopTimeout = setTimeout(() => { battleLoopId = requestAnimationFrame(battleLoop); }, 45);
  } else if (q === "medium") {
    battleLoopTimeout = setTimeout(() => { battleLoopId = requestAnimationFrame(battleLoop); }, 25);
  } else {
    battleLoopId = requestAnimationFrame(battleLoop);
  }
}

function battleLoop() {
  battleLoopTimeout = null;
  const battlePage = document.getElementById("page-battle");
  if (!battlePage || !battlePage.classList.contains("active")) {
    battleLoopId = null;
    return;
  }
  if (typeof document !== "undefined" && document.hidden) {
    scheduleNextBattleFrame();
    return;
  }
  battleState.animTick++;
  if (battleState.effectTimer > 0) battleState.effectTimer--;
  if (battleState.standSummonTimer > 0) battleState.standSummonTimer--;
  if (battleState.enemyHitShake > 0) battleState.enemyHitShake--;
  if (battleState.playerHitShake > 0) battleState.playerHitShake--;
  if (battleState.defeatAnimTimer > 0) battleState.defeatAnimTimer--;
  if (battleState.victoryAnimTimer > 0) battleState.victoryAnimTimer--;
  if (battleState.screenShakeTimer > 0) battleState.screenShakeTimer--;
  if (battleState.critFlashTimer > 0) battleState.critFlashTimer--;
  if (battleState.playerDashX > 0) battleState.playerDashX = Math.max(0, battleState.playerDashX - 4);
  if (battleState.enemyDashX < 0) battleState.enemyDashX = Math.min(0, battleState.enemyDashX + 4);

  // Atualizar partículas
  for (let i = battleState.particles.length - 1; i >= 0; i--) {
    const pt = battleState.particles[i];
    pt.x += pt.vx;
    pt.y += pt.vy;
    pt.life--;
    if (pt.life <= 0) battleState.particles.splice(i, 1);
  }

  // Atualizar textos flutuantes
  for (let i = battleState.floatingTexts.length - 1; i >= 0; i--) {
    const ft = battleState.floatingTexts[i];
    ft.y += ft.vy;
    ft.alpha -= 0.028;
    if (ft.alpha <= 0) battleState.floatingTexts.splice(i, 1);
  }

  drawBattleCanvas();
  scheduleNextBattleFrame();
}

function startBattleLoop() {
  if (battleLoopId !== null || battleLoopTimeout !== null) return;
  battleLoopId = requestAnimationFrame(battleLoop);
}

function stopBattleLoop() {
  if (battleLoopTimeout !== null) {
    clearTimeout(battleLoopTimeout);
    battleLoopTimeout = null;
  }
  if (battleLoopId !== null) {
    cancelAnimationFrame(battleLoopId);
    battleLoopId = null;
  }
}

/* =========================================================
   14. SISTEMA DE SALVAMENTO, PWA E INICIALIZAÇÃO DE EVENTOS
========================================================= */

function exportSaveData() {
  try {
    const dataStr = JSON.stringify(game, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `anime-life-rpg-save-${todayString()}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    notify("Salvamento exportado com sucesso!");
  } catch (e) {
    notify("Erro ao exportar salvamento.");
  }
}

function importSaveData(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = event => {
    try {
      const parsed = JSON.parse(event.target.result);
      saveGame(true);
      game = normalizeGame(parsed);
      syncMapState();
      saveGame();
      applyTheme(game.theme);
      renderBackupStatus();
      renderAll();
      notify("Progresso importado com sucesso! (Backup do estado anterior salvo.)");
    } catch (err) {
      notify("Arquivo inválido! Escolha um arquivo .json do Anime Life RPG.");
    }
  };
  reader.readAsText(file);
}

function resetAllProgress() {
  const confirmed = window.confirm("Tem certeza que deseja apagar todo o progresso e recomeçar do zero?");
  if (!confirmed) return;

  pauseFocusTimer();
  clearFocusTimerStorage();
  try { localStorage.removeItem(getActiveProfileSaveKey()); } catch {}
  game = createInitialState();
  syncMapState();
  selectBattleEnemy("bandit");
  allowEmptyResetSave = true;
  saveGame(true);
  allowEmptyResetSave = false;
  applyTheme(game.theme);
  applyGfxQuality(game.gfxQuality);
  switchGameMode(game.gameMode, false);
  renderBackupStatus();
  renderAll();
  openPage("home");
  notify("Progresso resetado com sucesso.");
}

function switchProfileSlot(slotId) {
  const validSlots = ["slot1", "slot2", "slot3"];
  const chosen = validSlots.includes(slotId) ? slotId : "slot1";
  saveGame(true);
  try { localStorage.setItem(PROFILES_KEY, chosen); } catch {}
  const prevBackup = allowEmptyResetSave;
  allowEmptyResetSave = true;
  game = loadGame();
  allowEmptyResetSave = prevBackup;
  mapBgCache.zoneIdx = -1;
  syncMapState();
  selectBattleEnemy(battleState.enemyId || "bandit");
  applyTheme(game.theme);
  applyGfxQuality(game.gfxQuality);
  switchGameMode(game.gameMode, false);
  renderBackupStatus();
  renderAll();
  notify(`👤 Conta alterada para Perfil ${chosen.replace("slot", "")}: ${game.name} (Nv.${game.level})`);
}

function copySyncCode() {
  const code = exportSyncCode();
  const input = document.getElementById("syncCodeInput");
  if (input) input.value = code;
  if (typeof navigator !== "undefined" && navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(code).then(() => {
      notify("📋 Código de Sincronização copiado! Cole em outro PC ou celular.");
    }).catch(() => {
      notify("📋 Código gerado no campo abaixo — copie manualmente!");
    });
  } else {
    notify("📋 Código gerado no campo abaixo!");
  }
}

async function pushCloudSave() {
  const urlInput = document.getElementById("cloudSyncUrlInput");
  const statusEl = document.getElementById("cloudSyncStatusText");
  const url = String(urlInput ? urlInput.value : "").trim();
  if (!url) {
    notify("Informe uma URL HTTPS válida ou use o Código entre Dispositivos.");
    return;
  }
  try { localStorage.setItem(CLOUD_SYNC_KEY, url); } catch {}
  if (statusEl) statusEl.textContent = "⏳ Enviando progresso para a nuvem...";
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ version: SAVE_VERSION, code: exportSyncCode(), updatedAt: new Date().toISOString() })
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    if (statusEl) statusEl.textContent = `✅ Sincronizado na nuvem em ${new Date().toLocaleTimeString("pt-BR")}`;
    notify("☁️ Progresso enviado para a nuvem com sucesso!");
  } catch (e) {
    if (statusEl) statusEl.textContent = "⚠️ Falha ao conectar ao endpoint. Seus saves locais continuam seguros.";
    notify("⚠️ Não foi possível alcançar a URL de nuvem informada.");
  }
}

async function pullCloudSave() {
  const urlInput = document.getElementById("cloudSyncUrlInput");
  const statusEl = document.getElementById("cloudSyncStatusText");
  const url = String(urlInput ? urlInput.value : "").trim();
  if (!url) {
    notify("Informe uma URL HTTPS válida para baixar.");
    return;
  }
  try { localStorage.setItem(CLOUD_SYNC_KEY, url); } catch {}
  if (statusEl) statusEl.textContent = "⏳ Baixando progresso da nuvem...";
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const payload = await res.json();
    if (payload && typeof payload.code === "string") {
      const ok = importSyncCode(payload.code);
      if (statusEl) statusEl.textContent = ok ? `✅ Baixado da nuvem às ${new Date().toLocaleTimeString("pt-BR")}` : "❌ Código inválido retornado pela nuvem.";
    } else if (payload && payload.g && typeof payload.g === "object") {
      saveGame(true);
      game = normalizeGame(payload.g);
      syncMapState();
      saveGame(true);
      applyTheme(game.theme);
      applyGfxQuality(game.gfxQuality);
      renderAll();
      if (statusEl) statusEl.textContent = `✅ Baixado da nuvem às ${new Date().toLocaleTimeString("pt-BR")}`;
      notify("☁️ Progresso baixado da nuvem!");
    } else {
      throw new Error("Formato inválido");
    }
  } catch {
    if (statusEl) statusEl.textContent = "⚠️ Não foi possível baixar da URL informada.";
    notify("⚠️ Falha ao baixar progresso da nuvem.");
  }
}

function setupVirtualJoystick() {
  const joy = document.getElementById("mobileMapJoystick");
  const knob = document.getElementById("joystickKnob");
  if (!joy || !knob || typeof joy.addEventListener !== "function") return;

  let active = false;
  const maxDist = 34;

  const updateStick = (clientX, clientY) => {
    const rect = joy.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    let dx = clientX - cx;
    let dy = clientY - cy;
    const dist = Math.hypot(dx, dy);
    if (dist > maxDist && dist > 0) {
      dx = (dx / dist) * maxDist;
      dy = (dy / dist) * maxDist;
    }
    knob.style.transform = `translate(${dx}px, ${dy}px)`;
    mapState.joystickVector = { vx: dx / maxDist, vy: dy / maxDist };
  };

  const resetStick = () => {
    active = false;
    knob.style.transform = "translate(0px, 0px)";
    mapState.joystickVector = { vx: 0, vy: 0 };
  };

  joy.addEventListener("pointerdown", e => {
    active = true;
    if (joy.setPointerCapture) {
      try { joy.setPointerCapture(e.pointerId); } catch {}
    }
    updateStick(e.clientX, e.clientY);
  });
  joy.addEventListener("pointermove", e => {
    if (!active) return;
    updateStick(e.clientX, e.clientY);
  });
  joy.addEventListener("pointerup", resetStick);
  joy.addEventListener("pointercancel", resetStick);
}

/* --- SUPORTE PWA INSTALÁVEL --- */
let deferredPwaPrompt = null;

function setupPwaSupport() {
  if ("serviceWorker" in navigator && (location.protocol === "http:" || location.protocol === "https:")) {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  }

  window.addEventListener("beforeinstallprompt", e => {
    e.preventDefault();
    deferredPwaPrompt = e;
    const installBtn = document.getElementById("installPwaBtn");
    if (installBtn) installBtn.classList.remove("hidden");
  });

  document.getElementById("installPwaBtn")?.addEventListener("click", async () => {
    if (!deferredPwaPrompt) {
      notify("Para instalar, use a opção 'Instalar Aplicativo' do seu navegador.");
      return;
    }
    deferredPwaPrompt.prompt();
    await deferredPwaPrompt.userChoice;
    deferredPwaPrompt = null;
    const installBtn = document.getElementById("installPwaBtn");
    if (installBtn) installBtn.classList.add("hidden");
  });
}

function setupEventListeners() {
  document.querySelectorAll(".mode-tab-btn[data-gamemode]").forEach(btn => {
    btn.addEventListener("click", () => {
      playSFX("click");
      switchGameMode(btn.dataset.gamemode, false);
    });
  });

  document.getElementById("useRoutineBurstBtn")?.addEventListener("click", useRoutineBurst);

  document.querySelectorAll(".nav-btn[data-page]").forEach(button => {
    button.addEventListener("click", () => {
      playSFX("click");
      openPage(button.dataset.page, button);
    });
  });

  document.querySelectorAll("[data-goto]").forEach(button => {
    button.addEventListener("click", () => {
      playSFX("click");
      openPage(button.dataset.goto);
    });
  });

  // Roleta de Classes & Stands (JoJo)
  document.getElementById("spinClassTicketBtn")?.addEventListener("click", () => spinClassRoulette("ticket"));
  document.getElementById("spinClassCoinsBtn")?.addEventListener("click", () => spinClassRoulette("coins"));
  document.getElementById("spinClassGemsBtn")?.addEventListener("click", () => spinClassRoulette("gems"));
  document.getElementById("standAwakenBtn")?.addEventListener("click", () => awakenStand("arrow"));
  document.getElementById("standCoinAwakenBtn")?.addEventListener("click", () => awakenStand("coins"));

  // Missões
  document.getElementById("addQuest")?.addEventListener("click", addOrSaveCustomQuest);
  document.getElementById("cancelEditQuest")?.addEventListener("click", cancelEditQuest);
  document.getElementById("newQuestName")?.addEventListener("keydown", e => {
    if (e.key === "Enter") addOrSaveCustomQuest();
  });

  // Cronômetro de Foco (Pomodoro RPG)
  document.getElementById("focusStartBtn")?.addEventListener("click", startFocusTimer);
  document.getElementById("focusStartBreakBtn")?.addEventListener("click", startActiveBreak);
  document.getElementById("focusPulseKiBtn")?.addEventListener("click", pulseKiRing);
  document.getElementById("focusBreakModeSelect")?.addEventListener("change", e => {
    if (focusState.phase !== "break") focusState.breakMode = e.target.value === "rhythm" ? "rhythm" : "meditation";
  });

  // Hábitos Diários (Dailies)
  document.getElementById("addDailyBtn")?.addEventListener("click", addDaily);
  document.getElementById("newDailyTitle")?.addEventListener("keydown", e => {
    if (e.key === "Enter") addDaily();
  });

  // Temas Visuais
  document.getElementById("quickThemeBtn")?.addEventListener("click", cycleTheme);
  document.querySelectorAll(".theme-select-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      playSFX("click");
      applyTheme(btn.dataset.theme, true);
    });
  });
  document.getElementById("focusPauseBtn")?.addEventListener("click", pauseFocusTimer);
  document.getElementById("focusResetBtn")?.addEventListener("click", resetFocusTimer);
  document.getElementById("focusDurationSelect")?.addEventListener("change", e => setFocusDuration(e.target.value));
  document.getElementById("focusQuestSelect")?.addEventListener("change", e => {
    focusState.questId = e.target.value;
  });

  // Delegação Global de Botões Dinâmicos
  document.addEventListener("click", event => {
    const presetBtn = event.target.closest(".preset-char-btn[data-preset]");
    if (presetBtn) {
      applyAnimePreset(presetBtn.dataset.preset);
      return;
    }

    const swatch = event.target.closest(".color-swatch");
    if (swatch) {
      const targetId = swatch.dataset.target;
      const colorVal = swatch.dataset.color;
      const inputEl = document.getElementById(targetId);
      if (inputEl && colorVal) {
        inputEl.value = colorVal;
        updateCharacterPreviewFromInputs();
      }
      return;
    }

    const btn = event.target.closest("button[data-action]");
    if (!btn) return;
    const action = btn.dataset.action;
    const id = btn.dataset.id;

    if (action === "complete-quest") completeQuest(id);
    else if (action === "focus-quest") selectQuestForFocus(id);
    else if (action === "edit-quest") startEditQuest(id);
    else if (action === "delete-quest") deleteQuest(id);
    else if (action === "claim-challenge") claimChallenge(id);
    else if (action === "claim-npc-quest") claimNpcQuest(id);
    else if (action === "unlock-skill") unlockSkill(id);
    else if (action === "equip-skill") toggleEquipSkill(id);
    else if (action === "upgrade-skill") upgradeSkill(id);
    else if (action === "filter-skill") { activeSkillFilter = id; renderSkills(); }
    else if (action === "use-item") equipOrUseItem(id);
    else if (action === "sell-item") sellInventoryItem(id);
    else if (action === "buy-item") buyShopItem(id);
    else if (action === "refine-item") refineEquipment(id);
    else if (action === "buy-dojo") buyDojoUpgrade(id);
    else if (action === "train-dojo-stat") trainDojoStat(id);
    else if (action === "claim-dojo-quest") claimDojoTrainerQuest(id);
    else if (action === "equip-class") equipUnlockedClass(id);
    else if (action === "equip-stand") equipStand(id);
    else if (action === "evolve-stand") evolveStand(id);
    else if (action === "claim-jojo-quest") claimJojoQuest(id);
    else if (action === "join-guild") joinGuild(id);
    else if (action === "claim-guild-mission") claimGuildMission(id);
    else if (action === "buy-mount") buyOrEquipMount(id);
    else if (action === "upgrade-companion") upgradeCompanion(id);
    else if (action === "rank-tab") { activeRankingTab = id; renderSocialPage(); }
    else if (action === "switch-event") switchActiveEvent(id);
    else if (action === "claim-event-mission") claimEventMission(id);
    else if (action === "challenge-boss") {
      const diffSel = document.getElementById("battleDifficultySelect");
      if (diffSel) diffSel.value = "boss";
      selectBattleEnemy(id);
      notify("👑 Desafio de Chefe iniciado!");
    }
    else if (action === "alloc-stat") allocateStatPoint(id);
    else if (action === "travel-zone") travelToZone(id);
    else if (action === "cast-skill") playerSkillAttack(id || null);
    else if (action === "complete-daily") completeDaily(id);
    else if (action === "delete-daily") deleteDaily(id);
    else if (action === "plant-seed") plantSeed(id, btn.dataset.herb);
    else if (action === "harvest-plot") harvestPlot(id);
    else if (action === "unlock-plot") unlockPlot(id);
    else if (action === "brew-recipe") brewRecipe(id);
    else if (action === "start-dungeon") startDungeon(id);
    else if (action === "abandon-dungeon") { abandonDungeon(); selectBattleEnemy(battleState.enemyId); renderAll(); }
  });

  // Personagem e Classes
  document.getElementById("saveCharacter")?.addEventListener("click", saveCharacter);
  document.getElementById("turnBtn")?.addEventListener("click", cyclePreviewDir);
  document.getElementById("walkBtn")?.addEventListener("click", togglePreviewWalk);
  document.getElementById("customAvatar")?.addEventListener("click", cyclePreviewDir);

  ["characterName", "characterClassSelect", "characterStandSelect", "hairStyle", "outfitStyle", "accessoryStyle", "activeAuraStyleSelect", "hairColor", "skinColor", "eyeColor", "outfitColor"].forEach(id => {
    const element = document.getElementById(id);
    if (!element) return;
    element.addEventListener("input", updateCharacterPreviewFromInputs);
    element.addEventListener("change", updateCharacterPreviewFromInputs);
  });

  // Mapa 2D, Joystick Mobile e Ações Rápidas
  document.getElementById("interactBtn")?.addEventListener("click", interactMap);
  document.getElementById("mobileMapInteractBtn")?.addEventListener("click", interactMap);
  document.getElementById("mapSkillBtn")?.addEventListener("click", triggerMapAura);
  document.getElementById("mobileMapAuraBtn")?.addEventListener("click", triggerMapAura);
  document.getElementById("toggleTouchControlsBtn")?.addEventListener("click", () => {
    const wrap = document.getElementById("mapFrameWrap");
    if (wrap) {
      wrap.classList.toggle("force-touch-controls");
      notify(wrap.classList.contains("force-touch-controls") ? "🕹️ Controles Touch exibidos na tela!" : "🕹️ Controles Touch no modo automático mobile.");
    }
  });
  setupVirtualJoystick();
  document.getElementById("mapQuestBtn")?.addEventListener("click", () => openNpcDialog(game.zone));
  document.getElementById("mapDojoBtn")?.addEventListener("click", () => openPage("dojo"));
  document.getElementById("mapBattleBtn")?.addEventListener("click", () => {
    const terrain = getTerrain();
    selectBattleEnemy(terrain.enemyPos?.enemyId || "bandit");
    openPage("battle");
  });
  document.getElementById("mapHealBtn")?.addEventListener("click", restOnMap);

  const worldMapCanvas = document.getElementById("gameMap");
  if (worldMapCanvas) {
    worldMapCanvas.addEventListener("click", event => {
      const rect = worldMapCanvas.getBoundingClientRect();
      const scaleX = worldMapCanvas.width / rect.width;
      const scaleY = worldMapCanvas.height / rect.height;

      const worldW = MAP_WIDTH * TILE;
      const worldH = MAP_HEIGHT * TILE;
      const camX = Math.max(0, Math.min(worldW - VIEW_WIDTH, Math.round(mapState.x + TILE / 2 - VIEW_WIDTH / 2)));
      const camY = Math.max(0, Math.min(worldH - VIEW_HEIGHT, Math.round(mapState.y + TILE / 2 - VIEW_HEIGHT / 2)));

      const clickWorldX = (event.clientX - rect.left) * scaleX + camX;
      const clickWorldY = (event.clientY - rect.top) * scaleY + camY;
      const tileX = Math.floor(clickWorldX / TILE);
      const tileY = Math.floor(clickWorldY / TILE);

      if (!isBlockedIn(game.zone, tileX, tileY)) {
        mapState.targetTile = { x: tileX, y: tileY };
      } else {
        const terrain = getTerrain();
        if (
          (tileX === terrain.npcPos.x && tileY === terrain.npcPos.y) ||
          (terrain.chestPos && tileX === terrain.chestPos.x && tileY === terrain.chestPos.y) ||
          (terrain.dojoPos && tileX === terrain.dojoPos.x && tileY === terrain.dojoPos.y)
        ) {
          interactMap();
        }
      }
    });
  }

  // Modal de Diálogo do NPC
  document.getElementById("npcBtnQuest")?.addEventListener("click", handleNpcQuestAction);
  document.getElementById("npcBtnTrain")?.addEventListener("click", handleNpcTrainAction);
  document.getElementById("npcBtnLore")?.addEventListener("click", handleNpcLoreAction);
  document.getElementById("npcBtnClose")?.addEventListener("click", closeNpcDialog);

  // Meu Dojo Dimensional
  document.getElementById("claimDojoRewardBtn")?.addEventListener("click", claimDojoDailyReward);
  document.getElementById("dojoStrikeTargetBtn")?.addEventListener("click", strikeDojoTarget);
  document.getElementById("dojoCanvas")?.addEventListener("click", strikeDojoTarget);
  document.getElementById("dojoRefillEnergyBtn")?.addEventListener("click", refillDojoEnergy);

  // Combate
  document.getElementById("startBattleBtn")?.addEventListener("click", () => {
    const sel = document.getElementById("battleEnemySelect");
    if (sel) selectBattleEnemy(sel.value);
  });
  document.getElementById("battleEnemySelect")?.addEventListener("change", e => selectBattleEnemy(e.target.value));
  document.getElementById("battleDifficultySelect")?.addEventListener("change", () => selectBattleEnemy(battleState.enemyId));
  document.getElementById("btnAttack")?.addEventListener("click", playerBasicAttack);
  document.getElementById("btnSummonStand")?.addEventListener("click", playerSummonStand);
  document.getElementById("btnUltimate")?.addEventListener("click", playerUseUltimate);
  document.getElementById("btnDefend")?.addEventListener("click", playerDefend);
  document.getElementById("btnUseItem")?.addEventListener("click", playerUsePotion);
  document.getElementById("btnFlee")?.addEventListener("click", playerFleeBattle);

  // Áudio, Ciclo Dia/Noite, Tutorial e Save
  document.getElementById("soundToggleBtn")?.addEventListener("click", () => {
    game.muted = !game.muted;
    toggleBGM(!game.muted && bgmPlaying);
    saveGame();
    renderTimeAndAudioUI();
  });

  document.getElementById("toggleBgmBtn")?.addEventListener("click", () => {
    game.muted = false;
    toggleBGM();
    saveGame();
    renderTimeAndAudioUI();
    notify(bgmPlaying ? "🎵 Música Ambiente ativada!" : "🔇 Música Ambiente pausada.");
  });

  document.getElementById("timeCycleBtn")?.addEventListener("click", () => {
    const modes = ["auto", "day", "sunset", "night"];
    const next = modes[(modes.indexOf(game.timeMode || "auto") + 1) % modes.length];
    game.timeMode = next;
    saveGame();
    renderTimeAndAudioUI();
    drawMap();
  });

  document.getElementById("sfxVolume")?.addEventListener("input", e => {
    game.sfxVolume = Number(e.target.value);
    saveGame();
    renderTimeAndAudioUI();
  });

  document.getElementById("bgmVolume")?.addEventListener("input", e => {
    game.bgmVolume = Number(e.target.value);
    saveGame();
    renderTimeAndAudioUI();
  });

  document.getElementById("timeModeSelect")?.addEventListener("change", e => {
    game.timeMode = e.target.value;
    saveGame();
    renderTimeAndAudioUI();
    drawMap();
  });

  document.getElementById("createCustomGuildBtn")?.addEventListener("click", createCustomGuild);

  document.getElementById("gfxQualitySelect")?.addEventListener("change", e => {
    applyGfxQuality(e.target.value);
    saveGame();
    notify(`⚡ Qualidade gráfica ajustada para: ${game.gfxQuality.toUpperCase()}`);
  });
  document.getElementById("profileSlotSelect")?.addEventListener("change", e => switchProfileSlot(e.target.value));
  document.getElementById("copySyncCodeBtn")?.addEventListener("click", copySyncCode);
  document.getElementById("applySyncCodeBtn")?.addEventListener("click", () => {
    const code = document.getElementById("syncCodeInput")?.value || "";
    importSyncCode(code);
  });
  document.getElementById("pushCloudBtn")?.addEventListener("click", pushCloudSave);
  document.getElementById("pullCloudBtn")?.addEventListener("click", pullCloudSave);

  document.getElementById("exportSave")?.addEventListener("click", exportSaveData);
  document.getElementById("restoreBackupBtn")?.addEventListener("click", restoreLatestBackup);
  document.getElementById("importSave")?.addEventListener("change", e => {
    if (e.target.files && e.target.files[0]) {
      importSaveData(e.target.files[0]);
      e.target.value = "";
    }
  });
  document.getElementById("resetGame")?.addEventListener("click", resetAllProgress);

  document.addEventListener("visibilitychange", () => {
    if (!document.hidden && focusState.running) {
      catchUpFocusClock();
    }
  });

  document.getElementById("helpTutorialBtn")?.addEventListener("click", () => setTutorialStep(1, true));
  document.getElementById("openTutorialBtn")?.addEventListener("click", () => setTutorialStep(1, true));
  document.getElementById("tutPrevBtn")?.addEventListener("click", () => setTutorialStep(-1));
  document.getElementById("tutNextBtn")?.addEventListener("click", () => setTutorialStep(1));

  const closeTutorialHandler = () => {
    const modal = document.getElementById("tutorialModal");
    if (modal) modal.classList.add("hidden");
    game.tutorialSeen = true;
    saveGame();
  };
  document.getElementById("tutSkipBtn")?.addEventListener("click", closeTutorialHandler);
  document.getElementById("closeTutorialBtn")?.addEventListener("click", closeTutorialHandler);

  document.getElementById("closeCelebrationBtn")?.addEventListener("click", () => {
    const overlay = document.getElementById("rarityCelebrationOverlay");
    if (overlay) overlay.classList.add("hidden");
  });

  // Teclado para movimentação no Mapa
  document.addEventListener("keydown", event => {
    const mapPage = document.getElementById("page-map");
    if (!mapPage || !mapPage.classList.contains("active")) return;

    const tag = document.activeElement ? document.activeElement.tagName.toLowerCase() : "";
    if (tag === "input" || tag === "textarea" || tag === "select") return;

    const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "w", "a", "s", "d"].includes(key)) {
      event.preventDefault();
      keysPressed[key] = true;
    } else if (key === "e" || key === "Enter") {
      event.preventDefault();
      interactMap();
    } else if (key === "q" || key === " ") {
      event.preventDefault();
      triggerMapAura();
    }
  });

  document.addEventListener("keyup", event => {
    const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
    delete keysPressed[key];
  });

  window.addEventListener("blur", () => {
    Object.keys(keysPressed).forEach(k => delete keysPressed[k]);
  });
}

const savedProfileSlot = (() => { try { return localStorage.getItem(PROFILES_KEY) || "slot1"; } catch { return "slot1"; } })();
const profileSelEl = document.getElementById("profileSlotSelect");
if (profileSelEl) profileSelEl.value = savedProfileSlot;
const cloudInputEl = document.getElementById("cloudSyncUrlInput");
if (cloudInputEl) {
  try { cloudInputEl.value = localStorage.getItem(CLOUD_SYNC_KEY) || ""; } catch {}
}

setupPwaSupport();
setupEventListeners();
applyTheme(game.theme);
applyGfxQuality(game.gfxQuality);
switchGameMode(game.gameMode, false);
checkDojoSkillUnlocks();
syncMapState();
selectBattleEnemy("bandit");
renderBackupStatus();
restoreFocusTimerState();
renderAll();
startPreviewLoop();
startDojoLoop();

if (!game.tutorialSeen) {
  setTutorialStep(1, true);
}
