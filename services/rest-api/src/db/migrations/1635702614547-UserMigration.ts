import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';
import { hash } from 'bcrypt';

export class UserMigration1635702614547 implements MigrationInterface {
  name = 'UserMigration1635702614547';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" varchar PRIMARY KEY NOT NULL, "first_name" varchar NOT NULL, "last_name" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL)`,
    );

    if (process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD) {
      await getRepository('users').save({
        firstName: process.env.ADMIN_FIRSTNAME,
        lastName: process.env.ADMIN_LASTNAME,
        email: process.env.ADMIN_EMAIL,
        password: await hash(
          process.env.ADMIN_PASSWORD,
          process.env.HASH_ROUNDS ? parseInt(process.env.HASH_ROUNDS) : 10,
        ),
      });
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
