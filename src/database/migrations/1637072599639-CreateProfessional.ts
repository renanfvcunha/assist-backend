import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateProfessional1637072599639 implements MigrationInterface {
    name = 'CreateProfessional1637072599639'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "profissionais" ("conselho" character varying(30) NOT NULL, "id_usuario" uuid NOT NULL, CONSTRAINT "REL_e7f73345c6f3688c738736a6aa" UNIQUE ("id_usuario"), CONSTRAINT "PK_e7f73345c6f3688c738736a6aa3" PRIMARY KEY ("id_usuario"))`);
        await queryRunner.query(`ALTER TABLE "profissionais" ADD CONSTRAINT "FK_e7f73345c6f3688c738736a6aa3" FOREIGN KEY ("id_usuario") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profissionais" DROP CONSTRAINT "FK_e7f73345c6f3688c738736a6aa3"`);
        await queryRunner.query(`DROP TABLE "profissionais"`);
    }

}
