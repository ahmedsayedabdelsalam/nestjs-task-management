import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import * as config from 'config'

const dbConfig = config.get('db')

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: dbConfig.type,
    host: process.env.RDBS_HOSTNAME || dbConfig.host,
    port: process.env.RDBS_PORT || dbConfig.port,
    username: process.env.RDBS_USERNAME || dbConfig.username,
    password: process.env.RDBS_PASSWORD || dbConfig.password,
    database: process.env.RDBS_DB_NAME || dbConfig.database,
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: process.env.TYPEORM_SYNC || dbConfig.synchronize
}