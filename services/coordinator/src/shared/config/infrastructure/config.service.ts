import {ConfigManager} from "../domain/config.manager";
const configFile = require('config.json');

export class ConfigService implements ConfigManager{
    private readonly configFile: { [key: string]: string };

    constructor() {
        this.configFile = configFile;
    }

    get(key: string): any {
        return this.configFile[key];
    }
}
