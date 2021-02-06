import { ConfigManager } from '../domain/config.manager';
import configFile from 'config.json';

export class ConfigService implements ConfigManager {
    private readonly configFile: { [key: string]: any };

    constructor() {
        this.configFile = configFile;
    }

    get(key: string): any {
        return this.configFile[key];
    }
}
