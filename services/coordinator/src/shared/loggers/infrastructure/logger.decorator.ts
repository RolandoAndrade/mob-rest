import { logger } from './constant.logger';

export function log(message: string) {
    return (
        target: Object,
        propertyKey: string,
        descriptor: PropertyDescriptor,
    ) => {
        descriptor.value = (...args: any[]) => {
            logger.log(
                `${propertyKey}: ${message} `,
                `${target.constructor.name}`,
                args,
            );
        };
    };
}
