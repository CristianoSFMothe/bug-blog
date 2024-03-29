# Bug Blog

## Pré-requisitos

* <a href="https://nestjs.com/" target="_blank">NestJS</a> como o framework backend
* <a href="https://www.prisma.io/" target="_blank">Prisma</a> como o Mapeador Objeto-Relacional (ORM)
* <a href="https://www.postgresql.org/" target="_blank">PostgreSQL</a> como o banco de dados
* <a href="https://swagger.io/" target="_blank">Swagger</a> como a ferramenta de documentação da API
* <a href="https://www.typescriptlang.org/" target="_blank">TypeScript</a> como a linguagem de programação
* <a href="https://dbeaver.io/download/" target="_blank">DBeaver</a> cliente SQL e uma ferramenta de administração de banco de dados
* <a href="https://www.docker.com/" target="_blank"></a> Docker é um conjunto de produtos de plataforma como serviço que usam virtualização de nível de sistema operacional para entregar software em pacotes chamados contêineres.
* <a href="https://code.visualstudio.com/" target="_blank">Visual Studio Code</a> IDE do utilizada durante a criação do projeto

## Gerar o Projeto NestJS

A primeira coisa que precisará é instalar o NestJS CLI. O NestJS CLI é muito útil quando se trabalha com um projeto NestJS. Ele vem com utilitários internos que ajudam você a inicializar, desenvolver e manter seu aplicativo NestJS.

Pode realizar a instalação da CLI do NestJs de forma global, com o comando abaixo:

```bash
npm i -g @nestjs/cli
```

Ou executar via o `NPX` (Node Package Manager) que permite executar pacotes diretamente. Ele é usado para executar pacotes sem precisar instalá-los globalmente. Isso é útil para executar comandos de pacotes específicos apenas uma vez, sem precisar poluir o ambiente global com esses pacotes.

```bash
npx @nestjs/cli new project_name
```

### Estrutura inicial

Abra o projeto em seu editor de código preferido (utilizado VSCode nesse caso). Você deve ver os seguintes arquivos:

```js
project_name
  ├── node_modules
  ├── src
  │   ├── app.controller.spec.ts
  │   ├── app.controller.ts
  │   ├── app.module.ts
  │   ├── app.service.ts
  │   └── main.ts
  ├── test
  │   ├── app.e2e-spec.ts
  │   └── jest-e2e.json
  ├── README.md
  ├── nest-cli.json
  ├── package-lock.json
  ├── package.json
  ├── tsconfig.build.json
  └── tsconfig.json

```

#### Removendo arquivos

Alguns arquivos criado inicialmente não serão utilizados, deixando a estrutura do projeto como abaixo:

```js

backend
  ├── node_modules
  ├── src
  │   ├── app.controller.spec.ts
  │   ├── app.controller.ts
  │   ├── app.module.ts
  │   ├── app.service.ts
  │   └── main.ts
  ├── test
  │   ├── app.e2e-spec.ts
  │   └── jest-e2e.json
  ├── README.md
  ├── nest-cli.json
  ├── package-lock.json
  ├── package.json
  ├── tsconfig.build.json
  └── tsconfig.json

```

Iniciar seu projeto usando o seguinte comando:

```bash
npm run start:dev
```

## Crie uma instância do PostgreSQL

Estaremos utilizando o `PostgreSQL` como banco de dados para o seu aplicativo NestJS. Este tutorial mostrará como instalar e executar o PostgreSQL em sua máquina através de um contêiner Docker.

> Nota: Se você não quiser usar o Docker, pode configure uma instância do PostgreSQL nativamente ou obter um banco de dados PostgreSQL hospedado no Heroku.


Primeiro, crie um `docker-compose.yml` arquivo na pasta principal do seu projeto:

```bash
touch docker-compose.yml
```

Isto `docker-compose.yml` o arquivo é um arquivo de configuração que conterá as especificações para executar um contêiner docker com a configuração do PostgreSQL dentro

```bash
# docker-compose.yml

version: '3.8'
services:

  postgres:
    image: postgres:13.5
    restart: always
    environment:
      - POSTGRES_USER=myuser
      - POSTGRES_PASSWORD=mypassword
    volumes:
      - postgres:/var/lib/postgresql/data
    ports:
      - '5432:5432'

volumes:
  postgres:

```

* Algumas coisas para entender sobre essa configuração:

1. O `image` opção define qual imagem do Docker usar. Aqui, você está usando o `postgres` imagem versão 13.5.
2. O `environment` opção especifica as variáveis de ambiente passadas para o container durante a inicialização. Você pode definir as opções de configuração e segredos – como o nome de usuário e senha – que o container usará aqui.
3. O `volumes` opção é usada para dados persistentes no sistema de arquivos host.
4. O `ports` a opção mapeia as portas da máquina host para o contêiner. O formato segue a `'host_port:container_port'` convenção. Nesse caso, você está mapeando a porta `5432` da máquina host para porta `5432` do `postgres` recipiente. `5432` é convencionalmente a porta usada pelo PostgreSQL.

Para iniciar o `postgres` container, abra uma nova janela de terminal e execute o seguinte comando na pasta principal do seu projeto:

```bash
# Com essa opção o terminal irá ficar travado ocupado com a execução do Docker Compose
docker-compose up

# Com essa opção o terminal irá ficar livre para utilizar e o Docker Compose executando no segundo plano
docker-compose up -d
```

> Nota: Se você fechar a janela do terminal, ele também irá parar o recipiente. Você pode evitar isso se adicionar um `-d` opção para o fim do comando, assim: `docker-compose up -d.` Isso executará indefinidamente o contêiner em segundo plano.

## Configurar Prisma

Agora que o banco de dados está pronto, é hora de configurar o Prisma!

### Inicializar Prisma

Para começar, primeiro instale o Prisma CLI como uma dependência de desenvolvimento. O Prisma CLI permitirá que você execute vários comandos e interaja com seu projeto.

```bash
npm install -D prisma
```

Inicializar o Prisma dentro do seu projeto executando:

```bash
npx prisma init
```

### Defina sua variável de ambiente

Dentro do `.env` arquivo, você deve ver um `DATABASE_URL` variável de ambiente com uma sequência de conexão fictícia. Substitua esta sequência de conexão pela da sua instância do PostgreSQL.

> Nota: Se você não usou o docker (, conforme mostrado na seção anterior ) para criar seu banco de dados PostgreSQL, sua sequência de conexão será diferente da mostrada acima. O formato da sequência de conexão para PostgreSQL está disponível no Prisma Docs

## Modele os dados

Agora é hora de definir os modelos de dados para sua aplicação.

```bash
model Article {
  id          String   @id @default(uuid())
  title       String   @unique
  description String?
  body        String
  published   Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@map("articles")
}
```

## Migrar o banco de dados

Com o esquema Prisma definido, executará migrações para criar as tabelas reais no banco de dados. Para gerar e executar sua primeira migração, execute o seguinte comando no terminal:

```bash
npx prisma migrate dev --name "create-table-article"
```

> o arquivo de migração gerado para ter uma ideia sobre o que o Prisma Migrate

## Criar um serviço Prisma

Dentro do seu aplicativo NestJS, é uma boa prática abstrair a API do Prisma Client do seu aplicativo. Para fazer isso, criará um novo serviço que conterá o Prisma Client. Este serviço, chamado PrismaService, será responsável por instanciar um PrismaClient instância e conexão ao seu banco de dados.

A CLI Nest oferece uma maneira fácil de gerar módulos e serviços diretamente da CLI. Execute o seguinte comando no seu terminal:

```bash
# Criação do modulo do Prisma
npx nest generate module prisma

# Criação do service do Prisma
npx nest generate service prisma
```

> Nota: Em alguns casos, executar o nest generate o comando com o servidor já em execução pode resultar em NestJS lançando uma exceção que diz: Error: Cannot find module './app.controller'. Se você encontrar esse erro, execute o seguinte comando do terminal: rm -rf dist e reinicie o servidor.

> Inicialmente nesse projeto não irá ser trato os testes unitários do back-end

> Mas será feito uma abstração dos arquivos para uma pasta especifica

O módulo Prisma será responsável por criar um <a href="https://docs.nestjs.com/modules#shared-modules" target="_blank">singleton</a> instância do `PrismaService` e permitir o compartilhamento do serviço em toda a sua aplicação. Para fazer isso, você adicionará o `PrismaService` ao exports matriz no `prisma.module.ts`.

Agora, qualquer módulo que importações o PrismaModule terá acesso a PrismaService e pode injetá-lo em seus próprios componentes/serviços. Este é um padrão comum para aplicações NestJS.


# Configurar o Swagger

<a href="https://swagger.io/" target="_blank">Swagger</a> é uma ferramenta para documentar sua API usando o <a href="https://github.com/OAI/OpenAPI-Specification" target="_blank">Especificação OpenAPI</a>. Nest tem um módulo dedicado para Swagger, que você estará usando em breve.

```bash
npm install --save @nestjs/swagger swagger-ui-express
```
Agora no arquivo `main.ts` e inicializar Swagger usando o `SwaggerModule`

# CRUD para Article modelo

Implantar as operações Criar, Ler, Atualizar e Excluir (CRUD) para o Article modelo e qualquer lógica de negócios que o acompanhe.

## Gerar recursos REST

Antes de implementar a API REST, precisará gerar os recursos REST para o Article modelo. Isso pode ser feito rapidamente usando o Nest CLI. Execute o seguinte comando no seu terminal:

```bash
npx nest generate resource
```
Responda às perguntas de acordo:

1. What name would you like to use for this resource (plural, e.g., "users")? `arthicles`
2. What transport layer do you use? `API REST`
3. Would you like to generate CRUD entry points? `yes`

Deverá ser criado um novo arquivo dentro `src/articles` diretório com todo o boilerplate para seus endpoints REST

IMAGEM

O `SwaggerModule` pesquisas para todos `@Body()`, `@Query()`, e `@Param()` decoradores nos manipuladores de rotas para gerar esta página da API.

## Adicionar PrismaClient ao Articles módulo

Para acessar `PrismaClient` dentro do `Articles` módulo, você deve adicionar o `PrismaModule` como uma importação. Adicione o seguinte `imports` para `ArticlesModule`.

Agora pode injetar o `PrismaService` dentro do `ArticlesService` e usá-lo para acessar o banco de dados. Para fazer isso, adicione um construtor para `articles.service.ts`.

### Definir GET /articles endpoint

O `controller` para este ponto module `findAll`. Este endpoint retornará todos os artigos publicados no banco de dados.

> O `findMany` a consulta retornará tudo article registros que correspondem ao `where` condição.

> Nota: Você também pode executar todas as solicitações no navegador diretamente ou através de um cliente REST (como <a href="https://www.postman.com/" target="_blank">Postman</a> ou <a href="https://insomnia.rest/download" target="_blank">Insomnia</a>). O Swagger também gera os comandos curl para cada solicitação caso você queira executar as solicitações HTTP no terminal.

### Definir GET /articles/drafts endpoint

Criação de  uma nova rota para buscar todos os artigos em rascunho. O NestJS não gerou automaticamente o manipulador de rota do controlador para esse endpoint, então você precisa escrevê-lo

```bash
# Controller Article
@Get('drafts')
  findDrafts() {
    return this.articleService.findDrafts();
  }
  
# Service Article
 findAll() {
    return this.prisma.article.findMany({
      where: {
        published: true,
      },
    });
  }

```

### Definir GET /articles/:id endpoint

Rota do controlador para este endpoint é chamado `findOne`, método no `ArticlesService` para devolver o artigo com o id dado:

```bash
async findOne(id: string) {
    const article = await this.prisma.article.findFirst({
      where: {
        id,
      },
    });

    if (!article) {
      throw new NotFoundException('Article not found');
    }

    return article;
  }
```

### Definir POST /articles endpoint

Este é o endpoint para a criação de novos artigos. O manipulador de rota do controlador para este ponto de extremidade é chamado `create`.

Observe que espera argumentos do tipo Creat`eArticleDto no corpo do pedido. Um `DTO` (Data Transfer Object) é um objeto que define como os dados serão enviados pela red

```bash
import { ApiProperty } from '@nestjs/swagger';

export class CreateArticleDto {
  @ApiProperty()
  title: string;

  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty()
  body: string;

  @ApiProperty({ required: false, default: false })
  published?: boolean = false;
}
```

O `@ApiProperty` os decoradores são obrigados a tornar as propriedades da classe visíveis para o `SwaggerModule`

### Definir PATCH /articles/:id endpoint

Este endpoint é para atualizar artigos existentes. O manipulador de rota para este terminal é chamado `update`.

```bash
async update(id: string, updateArticleDto: UpdateArticleDto) {
    const existingArticle = await this.prisma.article.findUnique({
      where: {
        id,
      },
    });

    if (!existingArticle) {
      throw new Error('Article does not exist or not found');
    }

    return this.prisma.article.update({
      where: { id },
      data: updateArticleDto,
    });
  }
```

O `updateArticleDto` definição é definida como `PartialType` de `CreateArticleDto`. Portanto, ele pode ter todas as propriedades de CreateArticleDto.

O `article.update` operação tentará encontrar um Article registro com o dado `id` e atualize-o com os dados de `updateArticleDto`.

### Definir DELETE /articles/:id endpoint

Este endpoint é excluir artigos existentes. O manipulador de rota para este ponto de extremidade é chamado `remove`.

```bash
 async remove(id: string) {
    const existingArticle = await this.prisma.article.findUnique({
      where: {
        id,
      },
    });

    if (!existingArticle) {
      throw new Error('Article not found');
    }

    return this.prisma.article.delete({
      where: {
        id,
      },
    });
  }
```
