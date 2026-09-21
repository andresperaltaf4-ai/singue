export type CategoryType = 
  | 'all' 
  | 'girls' 
  | 'couples' 
  | 'men' 
  | 'trans' 
  | 'popular' 
  | 'new' 
  | 'vr' 
  | 'interactive' 
  | 'hd';

export interface TipMenuItem {
  id: string;
  name: string;
  tokens: number;
  icon?: string;
  description?: string;
}

export interface Model {
  id: string;
  name: string;
  age: number;
  country: string;
  countryCode: string;
  category: 'girls' | 'couples' | 'men' | 'trans';
  tags: string[];
  imageUrl: string;
  secondaryImageUrl?: string;
  viewers: number;
  isHD: boolean;
  isVR: boolean;
  hasToy: boolean;
  toyName?: string;
  currentGoal: {
    title: string;
    current: number;
    target: number;
  };
  statusMessage: string;
  bio: string;
  likes: number;
  isFavorite?: boolean;
  tipMenu: TipMenuItem[];
  gallery: string[];
  languages: string[];
}

export interface ChatMessage {
  id: string;
  username: string;
  text: string;
  isModel?: boolean;
  isTip?: boolean;
  tipAmount?: number;
  userBadge?: 'vip' | 'knight' | 'fan' | 'user';
  timestamp: string;
}

export interface TokenPackage {
  id: string;
  tokens: number;
  bonusTokens: number;
  price: number;
  isPopular?: boolean;
  badge?: string;
}

export interface UserState {
  tokens: number;
  username: string;
  isVip: boolean;
  favorites: string[];
  soundEnabled: boolean;
  language: 'es' | 'en';
}
