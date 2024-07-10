import { filterableOptions as initialFilterableOptions } from "../../mock/filterableOptionsData";
import { sortValue as sortValueType } from "../../mock/sortValueType";
import { UserArtworkSchema } from "./artwork_shapes";
export interface ArtworksDataRequest {
  filterableOptions: typeof initialFilterableOptions;
  pageNumber: number;
  sortValue: sortValueType;
}

export type ArtworksResponse = ArtworkDataResponse | ArtworkFailureResponse

export interface ArtworkDataResponse {
  success: boolean;
  data: UserArtworkSchema[];
}

interface ArtworkFailureResponse {
  success: false;
  error: string;
}
