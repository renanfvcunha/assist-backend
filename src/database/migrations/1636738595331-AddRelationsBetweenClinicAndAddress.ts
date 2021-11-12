import {MigrationInterface, QueryRunner} from "typeorm";

export class AddRelationsBetweenClinicAndAddress1636738595331 implements MigrationInterface {
    name = 'AddRelationsBetweenClinicAndAddress1636738595331'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "enderecos" ADD "id_clinica" integer`);
        await queryRunner.query(`ALTER TABLE "enderecos" ADD CONSTRAINT "UQ_aa2fd3c15136dcbdd4ff7b8d7b0" UNIQUE ("id_clinica")`);
        await queryRunner.query(`ALTER TABLE "enderecos" ADD CONSTRAINT "FK_aa2fd3c15136dcbdd4ff7b8d7b0" FOREIGN KEY ("id_clinica") REFERENCES "clinica"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "enderecos" DROP CONSTRAINT "FK_aa2fd3c15136dcbdd4ff7b8d7b0"`);
        await queryRunner.query(`ALTER TABLE "enderecos" DROP CONSTRAINT "UQ_aa2fd3c15136dcbdd4ff7b8d7b0"`);
        await queryRunner.query(`ALTER TABLE "enderecos" DROP COLUMN "id_clinica"`);
    }

}
