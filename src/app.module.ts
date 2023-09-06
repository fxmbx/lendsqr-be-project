import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { KnexModule } from 'nestjs-knex';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/.env.${process.env.NODE_ENV}`,
      isGlobal: true,
    }),
    KnexModule.forRoot({
      config: {
        client: 'mysql2',
        useNullAsDefault: true,
        version: '8.0.30',
        connection: {
          host: 'mysql-2831fdff-olutundelearn-1dd7.aivencloud.com',
          user: 'avnadmin',
          password: 'AVNS_Mxu_3GxGMFr4GTq2cqV',
          database: 'defaultdb',
          port: 25372,
        },
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
