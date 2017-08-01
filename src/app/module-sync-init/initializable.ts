export abstract class Initializable {
    static is(value: any): value is Initializable {
        return value && ('run' in value);
    }
    abstract run(): void
}
