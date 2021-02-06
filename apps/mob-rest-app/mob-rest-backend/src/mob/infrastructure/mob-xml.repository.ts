import {MobRepository} from "../domain/mob.repository";
import {Book} from "../../shared/objects/domain/book";
import {FindQuery} from "../domain/find-query";
import * as parser from "xml-js";
import * as fs from "fs";
import {Library} from "../../shared/objects/domain/library";
import {ParsedBook} from "../../shared/objects/domain/parsed-book";
import {ConfigService} from "../../shared/config/infrastructure/config.service";

export class MobXmlRepository implements MobRepository{

	constructor(private readonly configService: ConfigService){}

	private checkFilter(book: ParsedBook, filters: FindQuery): boolean{
		const title =book.title._text.toLowerCase();
		const name = book.author.name._text.toLowerCase();
		const surname = book.author.surname._text.toLowerCase();
		const qTitle = (filters.title || "").toLowerCase();
		const qName = (filters.name || "").toLowerCase();
		const qSurname = (filters.name || "").toLowerCase();
		return title === qTitle || name === qName || qSurname === surname;
	}

	private getLibrary(): Library{
		const options = {compact: true, ignoreComment: true, spaces: 4, alwaysChildren: true};
		const xmlFile = fs.readFileSync(this.configService.get("repository")).toString();
		return parser.xml2js(xmlFile, options) as Library;
	}

	private saveLibrary(library: Library){
		const options = {compact: true, ignoreComment: true, spaces: 4};
		const xml = parser.js2xml(library, options);
		fs.writeFileSync(this.configService.get("repository"),xml);
	}

	public async createObject(book: Book): Promise<boolean> {
		const library = this.getLibrary();
		book["creation-date"] = new Date().toISOString();
		if(library && library.library && library.library.book){
			if(library.library.book instanceof Array){
				library.library.book.push(book);
			}
			else {
				library.library.book = [library.library.book as any, book];
			}
			this.saveLibrary(library);
		}
		else {
			this.saveLibrary({
				library: {
					book: [book]
				}
			})
		}
		return true;
	}

	public async deleteObject(query: FindQuery): Promise<boolean>{
		const library = this.getLibrary();
		if(library && library.library && library.library.book){
			if(!(library.library.book instanceof Array)){
				library.library.book = [library.library.book as any];
			}
			library.library.book = library.library.book.filter((book: ParsedBook)=>{
				return !this.checkFilter(book, query);
			});
		}
		this.saveLibrary(library);
		return true;
	}


	public async findObject(findQuery: FindQuery): Promise<Book[]>{
		const library = this.getLibrary();
		let results: Book[] = [];
		if(library && library.library && library.library.book){
			if(!(library.library.book instanceof Array)){
				library.library.book = [library.library.book as any];
			}
			results = library.library.book.filter((book: ParsedBook)=>{
				return this.checkFilter(book, findQuery);
			}).map((book: ParsedBook)=>{
				return {
					title: book.title._text,
					author: {
						name: book.author.name._text,
						surname: book.author.surname._text
					}
				}
			});
		}
		return results;
	}

	public async updateObject(findQuery: FindQuery, newBook: Partial<Book>): Promise<boolean>{
		const library = this.getLibrary();
		if(library && library.library && library.library.book){
			if(!(library.library.book instanceof Array)){
				library.library.book = [library.library.book as any];
			}
			library.library.book = library.library.book.map((book: ParsedBook)=>{
				if(this.checkFilter(book, findQuery)){
					return {
						title: newBook.title || book.title,
						author: {
							name:  newBook.author ? newBook.author.name : book.author.name,
							surname: newBook.author ? newBook.author.surname : book.author.surname
						},
						"creation-date": new Date().toISOString()
					}
				}
				return book
			}) as any;
			this.saveLibrary(library);
		}
		return true;
	}
}
