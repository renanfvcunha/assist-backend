# Assist - API

## Sobre o Projeto

Assist é uma aplicação web desenvolvida com a finalidade de auxiliar na gestão de clínicas médicas.
Dentre as funcionalidades, estão a de cadastrar pacientes, agendar consultas, cadastrar profissionais, entre outras.

Atualmente a aplicação encontra-se em desenvolvimento.

## Tecnologias e Estrutura
O projeto foi escrito utilizando as seguintes tecnologias:

* Linguagem: Typescript
* Plataforma: NodeJS
* Framework Principal: NestJS
* Mapeamento Objeto-Relacional: TypeORM
* Banco de dados preferencial: Postgres

O projeto segue a estruturação padrão do framework NestJS, onde se é utilizado o padrão de injeção de dependências.

## Como executar o projeto
### Desenvolvimento
1. Instalar as dependências.
```bash
$ npm i

$ yarn
```

2. Copiar o arquivo .env.example nomeando como .env e setar as variáveis de
ambiente necessárias.

3. Executar as migrations
```bash
$ npm run typeorm migration:run

$ yarn typeorm migration:run
```

4. Executar as seeds
```bash
$ npm run seed:run

$ yarn seed:run
```

5. Executar o projeto.
```bash
$ npm run start:dev

$ yarn start:dev
```

6. Após isso o projeto estará pronto para ser utilizado em desenvolvimento.

### Produção
1. Instalar as dependências.
```bash
$ npm i

$ yarn
```

2. Gerar a build de produção.
```bash
$ npm run build

$ yarn build
```

3. Repetir o passo 2 da execução de desenvolvimento.

4. Repetir o passo 3 da execução de desenvolvimento.
   
5. Repetir o passo 4 da execução de desenvolvimento.

6. Executar o projeto.
```bash
$ npm run start:prod

$ yarn start:prod
```

7. Após isso o projeto estará pronto para ser utilizado em produção.