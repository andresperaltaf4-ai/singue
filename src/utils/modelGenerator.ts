import { Model, CategoryType } from '../types';

// High quality, vetted Unsplash portraits suitable for live cam aesthetic
const MODEL_PHOTOS: { img: string; hover: string; gender: 'female' | 'male' | 'couple' }[] = [
  {
    img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=700&q=80',
    hover: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=700&q=80',
    gender: 'female',
  },
  {
    img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=700&q=80',
    hover: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=700&q=80',
    gender: 'female',
  },
  {
    img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=700&q=80',
    hover: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=700&q=80',
    gender: 'female',
  },
  {
    img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=700&q=80',
    hover: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=700&q=80',
    gender: 'female',
  },
  {
    img: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=700&q=80',
    hover: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=700&q=80',
    gender: 'female',
  },
  {
    img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=700&q=80',
    hover: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=700&q=80',
    gender: 'female',
  },
  {
    img: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=700&q=80',
    hover: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=700&q=80',
    gender: 'female',
  },
  {
    img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=700&q=80',
    hover: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=700&q=80',
    gender: 'female',
  },
  {
    img: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=700&q=80',
    hover: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=700&q=80',
    gender: 'male',
  },
  {
    img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=700&q=80',
    hover: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=700&q=80',
    gender: 'male',
  },
  {
    img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=700&q=80',
    hover: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=700&q=80',
    gender: 'male',
  },
  {
    img: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=700&q=80',
    hover: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=700&q=80',
    gender: 'couple',
  },
  {
    img: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=700&q=80',
    hover: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=700&q=80',
    gender: 'female',
  },
  {
    img: 'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?auto=format&fit=crop&w=700&q=80',
    hover: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=700&q=80',
    gender: 'female',
  },
  {
    img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=700&q=80',
    hover: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=700&q=80',
    gender: 'male',
  },
  {
    img: 'https://images.unsplash.com/photo-1496440737103-cd596325d314?auto=format&fit=crop&w=700&q=80',
    hover: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=700&q=80',
    gender: 'female',
  },
  {
    img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=700&q=80',
    hover: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=700&q=80',
    gender: 'female',
  },
  {
    img: 'https://images.unsplash.com/photo-1524638431109-937329914a4c?auto=format&fit=crop&w=700&q=80',
    hover: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=700&q=80',
    gender: 'female',
  }
];

const COUNTRIES = [
  { name: 'Colombia', code: '🇨🇴' },
  { name: 'España', code: '🇪🇸' },
  { name: 'México', code: '🇲🇽' },
  { name: 'Argentina', code: '🇦🇷' },
  { name: 'Brasil', code: '🇧🇷' },
  { name: 'Ucrania', code: '🇺🇦' },
  { name: 'Francia', code: '🇫🇷' },
  { name: 'Italia', code: '🇮🇹' },
  { name: 'Rumania', code: '🇷🇴' },
  { name: 'Estados Unidos', code: '🇺🇸' },
  { name: 'Venezuela', code: '🇻🇪' },
  { name: 'Chile', code: '🇨🇱' },
];

const FEMALE_NAMES = [
  'Sofia_Latina', 'Isabella_Queen', 'Mia_Hot_VIP', 'Valery_Sweet', 'Lucia_Glow',
  'Daniela_Sensual', 'Kylie_Angel', 'Carla_Fire', 'Nicole_VipLive', 'Emma_Cosplay',
  'Catalina_Babe', 'Tatiana_Hot', 'Natalia_Kiss', 'Gabriela_Baila', 'Diana_Sweet23',
  'Paula_Smile', 'Andrea_Wild', 'Yuliana_Lush', 'Mariana_LiveCam', 'Fernanda_Bella',
  'Alessandra_Fire', 'Camila_Ruby', 'Julieta_Passion', 'Laura_Lover', 'Veronica_Vip',
];

const MALE_NAMES = [
  'David_Muscle', 'Lucas_Fit', 'Carlos_Beast', 'Diego_Tattoo', 'Sebastian_Abs',
  'Marco_Italian', 'Alejandro_Coach', 'Thiago_Gym', 'Nicolas_Strong', 'Julian_Hot',
];

const COUPLE_NAMES = [
  'Max_and_Sara', 'Nico_and_Valen', 'Leo_and_Marta', 'Pablo_and_Laura',
  'HotCouple_Latino', 'Danny_and_Kelly', 'Erick_and_Sofi', 'Wild_Duo_VIP',
];

const TRANS_NAMES = [
  'Tiffany_Goddess', 'Sammy_Doll', 'Lorena_Trans_VIP', 'Kim_Diva',
  'Evelyn_Queen', 'Alana_Star', 'Bruna_Trans_Brasil', 'Jessica_Sweet_Trans',
];

const GOAL_TITLES = [
  'Baile sensual con traje cosplay + sorpresa',
  'Quitar sostén y lencería al completar la meta',
  'Vibración nivel extremo 60s con juguete Lovense',
  'Aceite corporal caliente y masajes íntimos',
  'Baile de twerk y desfile de bikinis',
  'Show especial de pies y medias de red',
  'Cambio a lencería de encaje transparente',
  'Especial VIP de media noche en directo',
  'Ruleta de retos atrevidos en privado',
  'Ducha caliente con espuma en vivo',
];

const STATUS_MESSAGES = [
  '¡Hola amores! Bienvenidos a mi sala caliente 🔥 Haz vibrar mi juguete con tus propinas 💋',
  '¡Meta muy cerca de completarse! ¿Quién me ayuda a llegar? ❤️',
  'Transmisión en Ultra HD 60fps con audio binaural activado ✨',
  'Noche de fiesta y baile interactivo. ¡Todos son bienvenidos!',
  'Conectada con Lovense Lush 3 activado a máxima potencia ⚡',
  'Cumpliendo todas las peticiones de mi menú de propinas 👑',
  'Especial de fin de semana, sala muy activa y divertida 💖',
  '¡Llegando a la meta me quito la lencería en vivo! 🎯',
  'Charla íntima y shows privados disponibles 1 a 1 🔒',
];

const TOY_NAMES = ['Lovense Lush 3', 'Lovense Domi 2', 'Lovense Nora', 'Lovense Max 2', 'Lovense Ferri'];

let globalModelCounter = 100;

export function generateSingleModel(categoryOverride?: CategoryType): Model {
  globalModelCounter++;
  const id = `stream-model-${globalModelCounter}-${Math.random().toString(36).substr(2, 6)}`;

  // Determine category
  let category: 'girls' | 'couples' | 'men' | 'trans' = 'girls';
  if (categoryOverride && ['girls', 'couples', 'men', 'trans'].includes(categoryOverride)) {
    category = categoryOverride as 'girls' | 'couples' | 'men' | 'trans';
  } else {
    const rand = Math.random();
    if (rand < 0.65) category = 'girls';
    else if (rand < 0.78) category = 'couples';
    else if (rand < 0.90) category = 'trans';
    else category = 'men';
  }

  // Name selection
  let name = '';
  let genderType: 'female' | 'male' | 'couple' = 'female';
  if (category === 'girls') {
    name = FEMALE_NAMES[Math.floor(Math.random() * FEMALE_NAMES.length)] + '_' + Math.floor(18 + Math.random() * 15);
    genderType = 'female';
  } else if (category === 'men') {
    name = MALE_NAMES[Math.floor(Math.random() * MALE_NAMES.length)];
    genderType = 'male';
  } else if (category === 'couples') {
    name = COUPLE_NAMES[Math.floor(Math.random() * COUPLE_NAMES.length)];
    genderType = 'couple';
  } else {
    name = TRANS_NAMES[Math.floor(Math.random() * TRANS_NAMES.length)];
    genderType = 'female';
  }

  // Country
  const countryObj = COUNTRIES[Math.floor(Math.random() * COUNTRIES.length)];

  // Photo match
  const eligiblePhotos = MODEL_PHOTOS.filter((p) => p.gender === genderType);
  const photo = eligiblePhotos.length > 0
    ? eligiblePhotos[Math.floor(Math.random() * eligiblePhotos.length)]
    : MODEL_PHOTOS[0];

  const viewers = Math.floor(Math.random() * 4500) + 250;
  const age = Math.floor(Math.random() * 11) + 18; // 18 to 28
  const hasToy = Math.random() > 0.15; // 85% have interactive toy
  const isHD = Math.random() > 0.1;
  const isVR = Math.random() > 0.7;
  const targetGoal = (Math.floor(Math.random() * 15) + 5) * 100; // 500 to 2000
  const currentGoalTokens = Math.floor(Math.random() * (targetGoal * 0.9));

  const tagsPool = ['latina', 'dance', 'sensual', 'lovense', 'cosplay', 'gamer', 'oil', 'hd', 'blonde', 'tattoo', 'fitness', 'squirt', 'feet'];
  const shuffledTags = [...tagsPool].sort(() => 0.5 - Math.random());
  const tags = [category, ...shuffledTags.slice(0, 4)];

  return {
    id,
    name,
    age,
    country: countryObj.name,
    countryCode: countryObj.code,
    category,
    tags,
    imageUrl: photo.img,
    secondaryImageUrl: photo.hover,
    viewers,
    isHD,
    isVR,
    hasToy,
    toyName: hasToy ? TOY_NAMES[Math.floor(Math.random() * TOY_NAMES.length)] : undefined,
    currentGoal: {
      title: GOAL_TITLES[Math.floor(Math.random() * GOAL_TITLES.length)],
      current: currentGoalTokens,
      target: targetGoal,
    },
    statusMessage: STATUS_MESSAGES[Math.floor(Math.random() * STATUS_MESSAGES.length)],
    bio: `¡Hola! Transmitiendo en directo desde ${countryObj.name}. Conectada y lista para complacerte.`,
    likes: Math.floor(Math.random() * 50000) + 2000,
    languages: [countryObj.name === 'Brasil' ? 'Português' : 'Español', 'English'],
    tipMenu: [
      { id: '1', name: 'Mandar un Beso volado', tokens: 5, icon: '💋' },
      { id: '2', name: 'Saludo personalizado', tokens: 15, icon: '🎤' },
      { id: '3', name: 'Poner tu canción favorita', tokens: 25, icon: '🎵' },
      { id: '4', name: 'Baile sensual 1 min', tokens: 50, icon: '💃' },
      { id: '5', name: 'Vibración nivel extremo (45s)', tokens: 100, icon: '⚡' },
      { id: '6', name: 'Show Privado C2C', tokens: 60, icon: '🔒' },
    ],
    gallery: [photo.img, photo.hover],
  };
}

export function generateInitialBatch(count: number = 36): Model[] {
  const batch: Model[] = [];
  for (let i = 0; i < count; i++) {
    batch.push(generateSingleModel());
  }
  return batch;
}

export function generateMoreModels(count: number = 18, category?: CategoryType): Model[] {
  const batch: Model[] = [];
  for (let i = 0; i < count; i++) {
    batch.push(generateSingleModel(category));
  }
  return batch;
}
