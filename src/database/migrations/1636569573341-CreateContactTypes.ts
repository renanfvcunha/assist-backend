import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateContactTypes1636569573341 implements MigrationInterface {
    name = 'CreateContactTypes1636569573341'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tipos_contato" ("id" SERIAL NOT NULL, "nome" character varying(50) NOT NULL, CONSTRAINT "PK_277a817e38e355012339ca971c0" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "tipos_contato"`);
    }

}
