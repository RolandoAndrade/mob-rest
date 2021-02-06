import {MobService} from "../src/mob/application/mob.service";
import {MobXmlRepository} from "../src/mob/infrastructure/mob-xml.repository";
import {ConsoleLogger} from "../src/shared/loggers/infrastructure/console.logger";

describe("mob service", ()=>{
    let service: MobService;

    beforeEach(()=>{
        service = new MobService(new MobXmlRepository(), new ConsoleLogger());
    });

    it("should create object", async ()=>{
        const created = await service.createObject({
            title: "Something",
            author: {
                name: "Name",
                surname: "Surname"
            }
        });
        expect(created).toEqual(true);
    })
})
