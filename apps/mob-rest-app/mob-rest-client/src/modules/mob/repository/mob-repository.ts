import {Book} from "@/modules/mob/domain/book";
import {FindOptions} from "@/modules/mob/domain/find-options";

const baseURL = process.env.VUE_APP_HOST;

function parseParams(findOptions: Partial<FindOptions>){
    let s = "?"
    for(const i in findOptions){
        if((findOptions as any)[i].length){
            s+=`${i}=${(findOptions as any)[i]}&`
        }
    }
    return s;
}

export class MobRepository {
    public async listBooks(findOptions: Partial<FindOptions>): Promise<Book[]>{
        const data = await fetch(`${baseURL}/mob${parseParams(findOptions)}`);
        return data.json();
    }

    public async deleteBook(findOptions: Partial<FindOptions>): Promise<Book[]>{
        const data = await fetch(`${baseURL}/mob${parseParams(findOptions)}`, {
            method: "DELETE"
        });
        return data.json();
    }

    public async createBook(book: Partial<Book>): Promise<Book[]>{
        const data = await fetch(`${baseURL}/mob`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(book)
        });
        return data.json();
    }

    public async updateBook(findOptions: Partial<FindOptions>, book: Book): Promise<Book[]>{
        const data = await fetch(`${baseURL}/mob${parseParams({
            title: book.title, 
            name: book.author.name, 
            surname: book.author.surname
        })}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(book)
        });
        return data.json();
    }
}

const mobRepository = new MobRepository();

export default mobRepository;
