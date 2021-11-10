import {MigrationInterface, QueryRunner} from "typeorm";

export class AddRelationsBetweenContactsAndContactTypes1636570112220 implements MigrationInterface {
    name = 'AddRelationsBetweenContactsAndContactTypes1636570112220'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contatos" ADD "id_tipo_contato" integer`);
        await queryRunner.query(`ALTER TABLE "contatos" ADD CONSTRAINT "FK_e35ea3e07cc0b23a3824b1c51fa" FOREIGN KEY ("id_tipo_contato") REFERENCES "tipos_contato"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contatos" DROP CONSTRAINT "FK_e35ea3e07cc0b23a3824b1c51fa"`);
        await queryRunner.query(`ALTER TABLE "contatos" DROP COLUMN "id_tipo_contato"`);
    }

}
