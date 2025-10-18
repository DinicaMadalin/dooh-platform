export interface Event {
  screen_id: string;
  campaign_id: string;
  timestamp: string;
}

export interface Campaign {
  id: string;
  play_count: number;
}

export interface Screens {
  id: string;
  play_count: number;
}

export interface WorkerStatus {
  paused: boolean
}
