import {MigrationInterface, QueryRunner} from "typeorm";

export class AddRelationsBetweenUsersAndPermissions1636553547798 implements MigrationInterface {
    name = 'AddRelationsBetweenUsersAndPermissions1636553547798'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "usuarios_permissoes" ("id_permissao" integer NOT NULL, "id_usuario" uuid NOT NULL, CONSTRAINT "PK_6cdc92fd1f381a4f593f708e030" PRIMARY KEY ("id_permissao", "id_usuario"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b5277b2c58ba21100207ded2bb" ON "usuarios_permissoes" ("id_permissao") `);
        await queryRunner.query(`CREATE INDEX "IDX_601a29249fda1af3cd4123a3a7" ON "usuarios_permissoes" ("id_usuario") `);
        await queryRunner.query(`ALTER TABLE "usuarios_permissoes" ADD CONSTRAINT "FK_b5277b2c58ba21100207ded2bb8" FOREIGN KEY ("id_permissao") REFERENCES "permissoes"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "usuarios_permissoes" ADD CONSTRAINT "FK_601a29249fda1af3cd4123a3a79" FOREIGN KEY ("id_usuario") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuarios_permissoes" DROP CONSTRAINT "FK_601a29249fda1af3cd4123a3a79"`);
        await queryRunner.query(`ALTER TABLE "usuarios_permissoes" DROP CONSTRAINT "FK_b5277b2c58ba21100207ded2bb8"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_601a29249fda1af3cd4123a3a7"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b5277b2c58ba21100207ded2bb"`);
        await queryRunner.query(`DROP TABLE "usuarios_permissoes"`);
    }

}
