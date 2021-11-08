import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateUsers1636402229723 implements MigrationInterface {
    name = 'CreateUsers1636402229723'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "usuarios" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying(50) NOT NULL, "nome_usuario" character varying(16) NOT NULL, "cpf" character varying(14) NOT NULL, "senha" character varying(150) NOT NULL, "criado_em" TIMESTAMP NOT NULL DEFAULT now(), "atualizado_em" TIMESTAMP NOT NULL DEFAULT now(), "excluido_em" TIMESTAMP, CONSTRAINT "UQ_ebebcaef8457dcff6e6d69f17b0" UNIQUE ("cpf"), CONSTRAINT "PK_d7281c63c176e152e4c531594a8" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "usuarios"`);
    }

}
