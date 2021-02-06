import {Book} from "../../shared/objects/domain/book";
import {CommitStatus} from "./commit-status";
import {FindQuery} from "./find-query";

export abstract class MobRepository {
	abstract createObject(book: Book): Promise<boolean>;
	abstract deleteObject(findQuery: FindQuery): Promise<boolean>;
	abstract findObject(findQuery: FindQuery): Promise<Book[]>;
	abstract updateObject(findQuery: FindQuery, newBook: Partial<Book>): Promise<void>;
	abstract replicateObject(commitStatus: CommitStatus): Promise<void>;
	abstract restoreObject(): Promise<void>;
}

