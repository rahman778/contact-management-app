import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import databaseConfig from './config/database.config';
import { ContactModule } from './contacts/contact.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        databaseConfig,
      ],
    }),
    DatabaseModule,
    ContactModule
    // Add feature modules here
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
