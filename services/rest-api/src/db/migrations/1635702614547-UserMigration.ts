import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserMigration1635702614547 implements MigrationInterface {
  name = 'UserMigration1635702614547';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" varchar PRIMARY KEY NOT NULL, "first_name" varchar NOT NULL, "last_name" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
