export interface FeedList {
  readonly id: number;
  title: string;
  icon?: string;
  sublist?: Sublist[];
}

interface Sublist {
  readonly id: number;
  title: string;
  icon?: string;
}
