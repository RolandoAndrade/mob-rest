import {Book} from "./book";
import {ParsedBook} from "./parsed-book";

export interface Library{
    library: {
        book: ( ParsedBook | Book)[];
    }

}
