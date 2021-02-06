import {Book} from "./book";

export interface Library{
    library: {
        book: ({
            "creation-date": {
                "_text": string;
            };
            title: {
                "_text": string;
            };
            author: {
                name: {
                    "_text": string;
                };
                surname: {
                    "_text": string;
                };
            }
        } | Book)[];
    }

}
