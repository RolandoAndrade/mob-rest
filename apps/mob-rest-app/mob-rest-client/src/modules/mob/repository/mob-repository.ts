import {Book} from "@/modules/mob/domain/book";

const baseURL = process.env.HOST;

export class MobRepository {
    public async listBooks(): Promise<Book[]>{
        const data = await fetch(`${baseURL}/mob`);
        return data.json();
    }
}

const mobRepository = new MobRepository();

export default mobRepository;
