import { filterableOptions as initialFilterableOptions } from "../../mock/filterableOptionsData";
import { sortValue as sortValueType } from "../../mock/sortValueType";
import { UserArtworkSchema } from "./artwork_shapes";
import { ArtworksPage } from "./artwork_shapes";
export interface ArtworksDataRequest {
  filterableOptions: typeof initialFilterableOptions;
  pageNumber: number;
  sortValue: sortValueType;
}

export type ArtworksResponse =
  | { success: true; data: ArtworksPage }
  | { success: false; error: string };
