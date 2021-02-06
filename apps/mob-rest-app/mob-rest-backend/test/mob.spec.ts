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
    });

    it("should update objects", async ()=>{
        let created = await service.updateObject({
            title: "Something"
        }, {
            title: "some"
        });
        expect(created).toEqual(true);
    });

    it("should remove object", async ()=>{
        const created = await service.deleteObject({
            title: "some"
        });
        expect(created).toEqual(true);
    });

    it("should retrieve objects", async ()=>{
        let created = await service.getObjects({
            title: "Domain-driven design"
        });
        expect(created.length).toEqual(1);
        created = await service.getObjects({
            name: "Vaughn"
        });
        expect(created.length).toEqual(2);
    });
})
