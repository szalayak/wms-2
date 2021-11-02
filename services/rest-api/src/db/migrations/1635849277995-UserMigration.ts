import { hash, genSalt } from 'bcrypt';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { RoleEntity } from '../entities/auth/Role.entity';
import { RoleDescriptionEntity } from '../entities/auth/RoleDescription.entity';
import { UserEntity } from '../entities/auth/User.entity';

export class UserMigration1635849277995 implements MigrationInterface {
  name = 'UserMigration1635849277995';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "role_descriptions" ("id" varchar PRIMARY KEY NOT NULL, "locale" varchar NOT NULL, "name" varchar NOT NULL, "roleId" varchar)`,
    );
    await queryRunner.query(
      `CREATE TABLE "roles" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, CONSTRAINT "UQ_648e3f5447f725579d7d4ffdfb7" UNIQUE ("name"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" varchar PRIMARY KEY NOT NULL, "first_name" varchar, "last_name" varchar, "email" varchar, "username" varchar NOT NULL, "password" varchar NOT NULL, "created_by" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "last_changed_by" varchar, "updated_at" datetime DEFAULT (datetime('now')), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users_roles_roles" ("usersId" varchar NOT NULL, "rolesId" varchar NOT NULL, PRIMARY KEY ("usersId", "rolesId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_df951a64f09865171d2d7a502b" ON "users_roles_roles" ("usersId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b2f0366aa9349789527e0c36d9" ON "users_roles_roles" ("rolesId") `,
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
    await queryRunner.query(`DROP INDEX "IDX_df951a64f09865171d2d7a502b"`);
    await queryRunner.query(`DROP INDEX "IDX_b2f0366aa9349789527e0c36d9"`);
    await queryRunner.query(
      `CREATE TABLE "temporary_users_roles_roles" ("usersId" varchar NOT NULL, "rolesId" varchar NOT NULL, CONSTRAINT "FK_df951a64f09865171d2d7a502b1" FOREIGN KEY ("usersId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_b2f0366aa9349789527e0c36d97" FOREIGN KEY ("rolesId") REFERENCES "roles" ("id") ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY ("usersId", "rolesId"))`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_users_roles_roles"("usersId", "rolesId") SELECT "usersId", "rolesId" FROM "users_roles_roles"`,
    );
    await queryRunner.query(`DROP TABLE "users_roles_roles"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_users_roles_roles" RENAME TO "users_roles_roles"`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_df951a64f09865171d2d7a502b" ON "users_roles_roles" ("usersId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b2f0366aa9349789527e0c36d9" ON "users_roles_roles" ("rolesId") `,
    );

    // default admin user
    if (process.env.ADMIN_PASSWORD) {
      const roleDescription = await queryRunner.manager.save(
        new RoleDescriptionEntity({
          locale: 'en',
          description: 'Super User',
        }),
      );
      const adminRole = await queryRunner.manager.save(
        new RoleEntity({
          name: 'superuser',
          descriptions: [roleDescription],
        }),
      );
      await queryRunner.manager.save(
        new UserEntity({
          username: 'admin',
          password: await hash(process.env.ADMIN_PASSWORD, await genSalt()),
          roles: [adminRole],
          createdAt: new Date(),
          createdBy: 'SYSTEM',
        }),
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_b2f0366aa9349789527e0c36d9"`);
    await queryRunner.query(`DROP INDEX "IDX_df951a64f09865171d2d7a502b"`);
    await queryRunner.query(
      `ALTER TABLE "users_roles_roles" RENAME TO "temporary_users_roles_roles"`,
    );
    await queryRunner.query(
      `CREATE TABLE "users_roles_roles" ("usersId" varchar NOT NULL, "rolesId" varchar NOT NULL, PRIMARY KEY ("usersId", "rolesId"))`,
    );
    await queryRunner.query(
      `INSERT INTO "users_roles_roles"("usersId", "rolesId") SELECT "usersId", "rolesId" FROM "temporary_users_roles_roles"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_users_roles_roles"`);
    await queryRunner.query(
      `CREATE INDEX "IDX_b2f0366aa9349789527e0c36d9" ON "users_roles_roles" ("rolesId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_df951a64f09865171d2d7a502b" ON "users_roles_roles" ("usersId") `,
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
    await queryRunner.query(`DROP INDEX "IDX_b2f0366aa9349789527e0c36d9"`);
    await queryRunner.query(`DROP INDEX "IDX_df951a64f09865171d2d7a502b"`);
    await queryRunner.query(`DROP TABLE "users_roles_roles"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "roles"`);
    await queryRunner.query(`DROP TABLE "role_descriptions"`);
  }
}
