export interface userArtworkSchema {
	sk: string;
	f_name: string;
	// title: string;
	sport: string;
	location: string;
	is_ai_gen: boolean;
  model?: string;
	prompt?: string;
	is_approved: boolean;
	votes: number;
  url: string;
	description: string;
	file_type: string;
}

export type ApiArtworksResponse = {
  success?: boolean;
  message: userArtworkSchema[];
};
