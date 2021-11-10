import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateContacts1636569205388 implements MigrationInterface {
    name = 'CreateContacts1636569205388'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "contatos" ("id" SERIAL NOT NULL, "contato" character varying(60) NOT NULL, CONSTRAINT "PK_994cdcb2c56dfb5b66217c854cc" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "contatos"`);
    }

}
