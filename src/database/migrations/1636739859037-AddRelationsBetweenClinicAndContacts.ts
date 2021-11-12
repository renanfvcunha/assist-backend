import {MigrationInterface, QueryRunner} from "typeorm";

export class AddRelationsBetweenClinicAndContacts1636739859037 implements MigrationInterface {
    name = 'AddRelationsBetweenClinicAndContacts1636739859037'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contatos" ADD "id_clinica" integer`);
        await queryRunner.query(`ALTER TABLE "contatos" ADD CONSTRAINT "FK_0a0268eafd3a78790617989ac5a" FOREIGN KEY ("id_clinica") REFERENCES "clinica"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contatos" DROP CONSTRAINT "FK_0a0268eafd3a78790617989ac5a"`);
        await queryRunner.query(`ALTER TABLE "contatos" DROP COLUMN "id_clinica"`);
    }

}
