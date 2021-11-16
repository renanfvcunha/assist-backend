import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateSpecialityAndSubSpeciality1637082009819 implements MigrationInterface {
    name = 'CreateSpecialityAndSubSpeciality1637082009819'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "sub_especialidades" ("id" SERIAL NOT NULL, "nome" character varying(50) NOT NULL, "id_especialidade" integer, CONSTRAINT "PK_3e2f0212d8230d8e8ff233d73ac" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "especialidades" ("id" SERIAL NOT NULL, "nome" character varying(50) NOT NULL, CONSTRAINT "PK_73c2740deb4cbe08c28ac487705" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "profissionais" ADD "id_especialidade" integer`);
        await queryRunner.query(`ALTER TABLE "profissionais" ADD "id_sub_especialidade" integer`);
        await queryRunner.query(`ALTER TABLE "profissionais" DROP CONSTRAINT "FK_e7f73345c6f3688c738736a6aa3"`);
        await queryRunner.query(`ALTER TABLE "profissionais" ADD CONSTRAINT "UQ_e7f73345c6f3688c738736a6aa3" UNIQUE ("id_usuario")`);
        await queryRunner.query(`ALTER TABLE "sub_especialidades" ADD CONSTRAINT "FK_1ed64bcd94300bcab078ab208c5" FOREIGN KEY ("id_especialidade") REFERENCES "especialidades"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "profissionais" ADD CONSTRAINT "FK_e7f73345c6f3688c738736a6aa3" FOREIGN KEY ("id_usuario") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "profissionais" ADD CONSTRAINT "FK_acb6f344cc86e3f8cf356334611" FOREIGN KEY ("id_especialidade") REFERENCES "especialidades"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "profissionais" ADD CONSTRAINT "FK_4df18bbf391acd25f3948d49ee7" FOREIGN KEY ("id_sub_especialidade") REFERENCES "sub_especialidades"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profissionais" DROP CONSTRAINT "FK_4df18bbf391acd25f3948d49ee7"`);
        await queryRunner.query(`ALTER TABLE "profissionais" DROP CONSTRAINT "FK_acb6f344cc86e3f8cf356334611"`);
        await queryRunner.query(`ALTER TABLE "profissionais" DROP CONSTRAINT "FK_e7f73345c6f3688c738736a6aa3"`);
        await queryRunner.query(`ALTER TABLE "sub_especialidades" DROP CONSTRAINT "FK_1ed64bcd94300bcab078ab208c5"`);
        await queryRunner.query(`ALTER TABLE "profissionais" DROP CONSTRAINT "UQ_e7f73345c6f3688c738736a6aa3"`);
        await queryRunner.query(`ALTER TABLE "profissionais" ADD CONSTRAINT "FK_e7f73345c6f3688c738736a6aa3" FOREIGN KEY ("id_usuario") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "profissionais" DROP COLUMN "id_sub_especialidade"`);
        await queryRunner.query(`ALTER TABLE "profissionais" DROP COLUMN "id_especialidade"`);
        await queryRunner.query(`DROP TABLE "especialidades"`);
        await queryRunner.query(`DROP TABLE "sub_especialidades"`);
    }

}
