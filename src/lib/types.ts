export type User = {
  id: string;
  name: string;
  avatarUrl: string;
  status: 'online' | 'offline';
  lastSeen?: string;
};

export type Task = {
  id: string;
  text: string;
  completed: boolean;
};

export type ChatMessage = {
  id: string;
  userId: string;
  userName: string;
  avatarUrl: string;
  message: string;
  timestamp: string;
};

export type LeaderboardEntry = {
  id: string;
  name: string;
  avatarUrl: string;
  score: number;
  rank: number;
};
