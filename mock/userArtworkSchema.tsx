export interface userArtworkSchema {
	id: string;
	title: string;
	sport: string[];
	location: string;
	is_ai_gen: boolean;
  model?: string;
	prompt?: string;
	is_approved: boolean;
	votes: number;
  url: string;
}