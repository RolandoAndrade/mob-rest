export abstract class MobRepository {
	abstract createObject(object): Promise<any>;
	abstract deleteObject(id): Promise<any>;
	abstract consultObject(id): Promise<any>;
	abstract updateObject(id, object): Promise<void>;
	abstract replicateObject(): Promise<void>;
	abstract restoreObject(): Promise<void>;
}

