import {MigrationInterface, QueryRunner} from "typeorm";

export class CreatePermissions1636550662546 implements MigrationInterface {
    name = 'CreatePermissions1636550662546'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "permissoes" ("id" SERIAL NOT NULL, "nome" character varying(50) NOT NULL, CONSTRAINT "PK_5a83561e7be8610760090b45c98" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "permissoes"`);
    }

}
