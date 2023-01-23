import { v4 as uuidv4 } from 'uuid';

class UUID {
    static generateId(): string {
        return uuidv4();
    }
}

export { UUID };
