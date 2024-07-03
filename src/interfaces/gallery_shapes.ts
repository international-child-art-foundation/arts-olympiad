import { filterableOptions as initialFilterableOptions } from "../../mock/filterableOptionsData";
import { sortValue as sortValueType } from "../../mock/sortValueType";
import { userArtworkSchema } from "../../mock/userArtworkSchema";

export interface artworkDataRequest {
  filterableOptions: typeof initialFilterableOptions;
  pageNumber: number;
  sortValue: sortValueType;
}

export type artworkDataResponse = userArtworkSchema[] | undefined;