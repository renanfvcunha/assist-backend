import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateAddress1636718618311 implements MigrationInterface {
    name = 'CreateAddress1636718618311'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "enderecos" ("id" SERIAL NOT NULL, "logradouro" character varying(50) NOT NULL, "numero" integer, "complemento" character varying(50), "referencia" character varying(100), "cep" character varying(9) NOT NULL, "bairro" character varying(50) NOT NULL, CONSTRAINT "PK_208b05002dcdf7bfbad378dcac1" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "enderecos"`);
    }

}
