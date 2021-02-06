import {Book} from "../../shared/objects/domain/book";
import {CommitStatus} from "./commit-status";

export abstract class MobRepository {
	abstract createObject(book: Book): Promise<any>;
	abstract deleteObject(book: Book): Promise<any>;
	abstract findObject(book: Book): Promise<any>;
	abstract updateObject(book: Book, newBook: Partial<Book>): Promise<void>;
	abstract replicateObject(commitStatus: CommitStatus): Promise<void>;
	abstract restoreObject(): Promise<void>;
}

