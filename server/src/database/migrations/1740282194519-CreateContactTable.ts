import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateContactTable1740282194519 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE contacts (
            "id" SERIAL PRIMARY KEY,
            "name" VARCHAR(255) NOT NULL,
            "email" VARCHAR(255) NOT NULL,
            "phone" VARCHAR(255),
            "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE contacts;`);
  }
}
