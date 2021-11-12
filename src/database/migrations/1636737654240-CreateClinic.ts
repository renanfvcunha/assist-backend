import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateClinic1636737654240 implements MigrationInterface {
    name = 'CreateClinic1636737654240'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "clinica" ("id" SERIAL NOT NULL, "nome" character varying(60) NOT NULL, "sigla" character varying(10) NOT NULL, "cnpj" character varying(18) NOT NULL, "logo" character varying(60), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a5868356fca535972d7aa945704" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "clinica"`);
    }

}
