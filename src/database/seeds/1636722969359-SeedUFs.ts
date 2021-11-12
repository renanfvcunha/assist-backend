import { MigrationInterface, QueryRunner } from 'typeorm';
import axios, { AxiosResponse } from 'axios';

type UF = {
  sigla: string;
};

export class SeedUFs1636722969359 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    try {
      let query = `INSERT INTO "ufs" ("sigla") VALUES `;
      const ufs: string[] = [];

      const response: AxiosResponse<UF[]> = await axios.get(
        'https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome',
      );

      response.data.forEach((uf) => {
        ufs.push(`('${uf.sigla}')`);
      });

      query += ufs.join(', ');

      await queryRunner.query(query);
    } catch (err) {
      console.log(err);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "ufs"`);
  }
}
