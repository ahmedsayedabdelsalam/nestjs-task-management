import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { Task } from '../tasks/task.entity'

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'ahmed',
    password: '123456789',
    database: 'taskmanagement',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true
}