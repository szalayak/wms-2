import { MigrationInterface, QueryRunner } from 'typeorm';
import { insertDefaultAdmin } from '../entities/auth/User.entity';

export class UserMigration1635859106156 implements MigrationInterface {
  name = 'UserMigration1635859106156';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "role_descriptions" ("id" varchar PRIMARY KEY NOT NULL, "locale" varchar NOT NULL, "name" varchar NOT NULL, "roleId" varchar)`,
    );
    await queryRunner.query(
      `CREATE TABLE "roles" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, CONSTRAINT "UQ_648e3f5447f725579d7d4ffdfb7" UNIQUE ("name"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" varchar PRIMARY KEY NOT NULL, "first_name" varchar, "last_name" varchar, "email" varchar, "username" varchar NOT NULL, "password" varchar NOT NULL, "created_by_id" varchar, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "last_changed_by_id" varchar, "updated_at" datetime DEFAULT (datetime('now')), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_roles" ("userId" varchar NOT NULL, "rolesId" varchar NOT NULL, PRIMARY KEY ("userId", "rolesId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_472b25323af01488f1f66a06b6" ON "user_roles" ("userId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_13380e7efec83468d73fc37938" ON "user_roles" ("rolesId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_role_descriptions" ("id" varchar PRIMARY KEY NOT NULL, "locale" varchar NOT NULL, "name" varchar NOT NULL, "roleId" varchar, CONSTRAINT "FK_14d703612138842caa002448971" FOREIGN KEY ("roleId") REFERENCES "roles" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_role_descriptions"("id", "locale", "name", "roleId") SELECT "id", "locale", "name", "roleId" FROM "role_descriptions"`,
    );
    await queryRunner.query(`DROP TABLE "role_descriptions"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_role_descriptions" RENAME TO "role_descriptions"`,
    );
    await queryRunner.query(`DROP INDEX "IDX_472b25323af01488f1f66a06b6"`);
    await queryRunner.query(`DROP INDEX "IDX_13380e7efec83468d73fc37938"`);
    await queryRunner.query(
      `CREATE TABLE "temporary_user_roles" ("userId" varchar NOT NULL, "rolesId" varchar NOT NULL, CONSTRAINT "FK_472b25323af01488f1f66a06b67" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_13380e7efec83468d73fc37938e" FOREIGN KEY ("rolesId") REFERENCES "roles" ("id") ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY ("userId", "rolesId"))`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_user_roles"("userId", "rolesId") SELECT "userId", "rolesId" FROM "user_roles"`,
    );
    await queryRunner.query(`DROP TABLE "user_roles"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_user_roles" RENAME TO "user_roles"`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_472b25323af01488f1f66a06b6" ON "user_roles" ("userId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_13380e7efec83468d73fc37938" ON "user_roles" ("rolesId") `,
    );
    await insertDefaultAdmin(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_13380e7efec83468d73fc37938"`);
    await queryRunner.query(`DROP INDEX "IDX_472b25323af01488f1f66a06b6"`);
    await queryRunner.query(
      `ALTER TABLE "user_roles" RENAME TO "temporary_user_roles"`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_roles" ("userId" varchar NOT NULL, "rolesId" varchar NOT NULL, PRIMARY KEY ("userId", "rolesId"))`,
    );
    await queryRunner.query(
      `INSERT INTO "user_roles"("userId", "rolesId") SELECT "userId", "rolesId" FROM "temporary_user_roles"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_user_roles"`);
    await queryRunner.query(
      `CREATE INDEX "IDX_13380e7efec83468d73fc37938" ON "user_roles" ("rolesId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_472b25323af01488f1f66a06b6" ON "user_roles" ("userId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "role_descriptions" RENAME TO "temporary_role_descriptions"`,
    );
    await queryRunner.query(
      `CREATE TABLE "role_descriptions" ("id" varchar PRIMARY KEY NOT NULL, "locale" varchar NOT NULL, "name" varchar NOT NULL, "roleId" varchar)`,
    );
    await queryRunner.query(
      `INSERT INTO "role_descriptions"("id", "locale", "name", "roleId") SELECT "id", "locale", "name", "roleId" FROM "temporary_role_descriptions"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_role_descriptions"`);
    await queryRunner.query(`DROP INDEX "IDX_13380e7efec83468d73fc37938"`);
    await queryRunner.query(`DROP INDEX "IDX_472b25323af01488f1f66a06b6"`);
    await queryRunner.query(`DROP TABLE "user_roles"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "roles"`);
    await queryRunner.query(`DROP TABLE "role_descriptions"`);
  }
}
