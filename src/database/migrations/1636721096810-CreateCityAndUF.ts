import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateCityAndUF1636721096810 implements MigrationInterface {
    name = 'CreateCityAndUF1636721096810'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cidades" ("id" SERIAL NOT NULL, "nome" character varying(50) NOT NULL, "sigla_uf" character varying(2) NOT NULL, CONSTRAINT "PK_cc606d4fea4335e32bd19f3a9fa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ufs" ("id" SERIAL NOT NULL, "sigla" character varying(2) NOT NULL, CONSTRAINT "PK_86aacd4a546571859ee029203db" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "enderecos" ADD "id_cidade" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "enderecos" ADD "id_uf" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "enderecos" ADD CONSTRAINT "FK_f6ad6447d16f64f5bd7284d0fae" FOREIGN KEY ("id_cidade") REFERENCES "cidades"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "enderecos" ADD CONSTRAINT "FK_e1751eb6d610e8705227e84b2ff" FOREIGN KEY ("id_uf") REFERENCES "ufs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "enderecos" DROP CONSTRAINT "FK_e1751eb6d610e8705227e84b2ff"`);
        await queryRunner.query(`ALTER TABLE "enderecos" DROP CONSTRAINT "FK_f6ad6447d16f64f5bd7284d0fae"`);
        await queryRunner.query(`ALTER TABLE "enderecos" DROP COLUMN "id_uf"`);
        await queryRunner.query(`ALTER TABLE "enderecos" DROP COLUMN "id_cidade"`);
        await queryRunner.query(`DROP TABLE "ufs"`);
        await queryRunner.query(`DROP TABLE "cidades"`);
    }

}
