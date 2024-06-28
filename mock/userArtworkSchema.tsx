export interface userArtworkSchema {
	id: string;
	f_name: string;
	age: number;
	sport: string;
	location: string;
	is_ai_gen: boolean;
  model?: string;
	prompt?: string;
	is_approved: boolean;
	votes: number;
	description: string;
	file_type: string;
}

export type ApiArtworksResponse = {
  success?: boolean;
  message: userArtworkSchema[];
};
