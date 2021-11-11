import {MigrationInterface, QueryRunner} from "typeorm";

export class AddRelationsBetweenUsersAndContacts1636574016561 implements MigrationInterface {
    name = 'AddRelationsBetweenUsersAndContacts1636574016561'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contatos" ADD "id_usuario" uuid`);
        await queryRunner.query(`ALTER TABLE "contatos" ADD CONSTRAINT "FK_45ccd6cc69ed50ea847e72b7f83" FOREIGN KEY ("id_usuario") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contatos" DROP CONSTRAINT "FK_45ccd6cc69ed50ea847e72b7f83"`);
        await queryRunner.query(`ALTER TABLE "contatos" DROP COLUMN "id_usuario"`);
    }

}
