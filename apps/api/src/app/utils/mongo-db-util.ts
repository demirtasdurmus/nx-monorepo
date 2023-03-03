import { ConfigService } from '@nestjs/config';

export class MongoDBUtil {
    public static getConnectionUri(configService: ConfigService): string {
        const host = configService.get('MONGODB_HOST', 'mongodb://localhost:27017/');
        const db = configService.get('MONGODB_DB', 'nx-monorepo');
        const options = configService.get('MONGODB_OPTIONS', '?authSource=admin');
        return `${host}${db}${options}`;
    }
}
