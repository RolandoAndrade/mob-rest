export abstract class LoggerService {
    abstract error(
        message: any,
        trace?: string | object,
        context?: string
    ): boolean;
    abstract log(message: any, context?: string, data?: {}): boolean;
    abstract warn(message: any, context?: string): boolean;
    abstract debug(message: any, context?: string): boolean;
}
