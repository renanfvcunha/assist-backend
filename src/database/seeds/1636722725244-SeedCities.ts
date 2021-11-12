import { MigrationInterface, QueryRunner } from 'typeorm';
import axios, { AxiosResponse } from 'axios';

type City = {
  nome: string;
  'regiao-imediata': {
    'regiao-intermediaria': {
      UF: {
        sigla: string;
      };
    };
  };
};

export class SeedCities1636722725244 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    try {
      let query = `INSERT INTO "cidades" ("nome", "sigla_uf") VALUES `;
      const cities: string[] = [];

      const response: AxiosResponse<City[]> = await axios.get(
        'https://servicodados.ibge.gov.br/api/v1/localidades/municipios?orderBy=nome',
      );

      response.data.forEach((city) => {
        cities.push(
          `('${city.nome.replace(`'`, `''`)}', '${
            city['regiao-imediata']['regiao-intermediaria']['UF']['sigla']
          }')`,
        );
      });

      query += cities.join(', ');

      await queryRunner.query(query);
    } catch (err) {
      console.log(err);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "cidades"`);
  }
}
