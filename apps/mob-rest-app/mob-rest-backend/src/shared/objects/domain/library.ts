import {Book} from "./book";

export interface Library{
    library: {
        book: ( | Book)[];
    }

}
