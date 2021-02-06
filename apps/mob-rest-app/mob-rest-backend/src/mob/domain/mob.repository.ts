import { Book } from '../../shared/objects/domain/book';
import { FindQuery } from './find-query';

export abstract class MobRepository {
    abstract createObject(book: Book): Promise<boolean>;
    abstract deleteObject(findQuery: FindQuery): Promise<boolean>;
    abstract findObject(findQuery: FindQuery): Promise<Book[]>;
    abstract updateObject(
        findQuery: FindQuery,
        newBook: Partial<Book>,
    ): Promise<boolean>;
}
