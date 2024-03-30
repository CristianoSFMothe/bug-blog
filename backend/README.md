# Bug Blog

## Pré-requisitos

* <a href="https://nestjs.com/" target="_blank">NestJS</a> como o framework backend
* <a href="https://www.prisma.io/" target="_blank">Prisma</a> como o Mapeador Objeto-Relacional (ORM)
* <a href="https://www.postgresql.org/" target="_blank">PostgreSQL</a> como o banco de dados
* <a href="https://swagger.io/" target="_blank">Swagger</a> como a ferramenta de documentação da API
* <a href="https://www.typescriptlang.org/" target="_blank">TypeScript</a> como a linguagem de programação
* <a href="https://dbeaver.io/download/" target="_blank">DBeaver</a> cliente SQL e uma ferramenta de administração de banco de dados
* <a href="https://www.docker.com/" target="_blank">Docker</a> é um conjunto de produtos de plataforma como serviço que usam virtualização de nível de sistema operacional para entregar software em pacotes chamados contêineres.
* <a href="https://code.visualstudio.com/" target="_blank">Visual Studio Code</a> IDE do utilizada durante a criação do projeto

## Clone o repositório

Você poderá clonar esse projeto ou realizar um fork do mesmo para pode contribuir para melhorias do projeto.

```bash
# Para realizar o clone
git clone https://github.com/CristianoSFMothe/bug-blog
```
Navegue até o diretório clonado:

1. Instalar dependências:

```bash
npm install
```

2. Inicie o banco de dados PostgreSQL com docker:

```bash
docker-compose up -d
```

3. Aplicar migrações de banco de dados:

```bash
npx prisma migrate dev
```

4. Inicie o projeto:

```bash
npm run start:dev
```

## Gerar o Projeto NestJS

A primeira coisa que precisará é instalar o NestJS CLI. O NestJS CLI é muito útil quando se trabalha com um projeto NestJS. Ele vem com utilitários internos que ajudam você a inicializar, desenvolver e manter seu aplicativo NestJS.

Pode realizar a instalação da CLI do NestJs de forma global, com o comando abaixo:

```bash
npm i -g @nestjs/cli
```

Ou executar via o `npm` (Node Package Manager) que permite executar pacotes diretamente. Ele é usado para executar pacotes sem precisar instalá-los globalmente. Isso é útil para executar comandos de pacotes específicos apenas uma vez, sem precisar poluir o ambiente global com esses pacotes.

```bash
# Caso tenha instalado a CLI do NestJs globlamente
npm nest new project_name

# Caso não tenha instalado a CLI do NestJs globlamente
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

<img src="https://github.com/CristianoSFMothe/bug-blog/assets/68359459/32b25879-ca5d-4c84-adab-101742547ae8" alt="Swagger CRUD Article">



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

```bash
 async create(createArticleDto: CreateArticleDto) {
    const existingArticle = await this.prisma.article.findUnique({
      where: {
        title: createArticleDto.title,
      },
    });

    if (existingArticle) {
      throw new BadRequestException(
        'The article with that title already exists',
      );
    }

    return this.prisma.article.create({
      data: createArticleDto,
    });
  }
```

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

# Agrupe os endpoints juntos em Swagger

Adicionar um `@ApiTags` decorador para o `ArticlesController` classe, para agrupar todos os endpoint articles juntos no `Swagger`:

## Atualizar os tipos de resposta do Swagger

A *Respostas* guia sob cada endpoint em `Swagger`, você vai achar que o Descrição está vazio. Isso ocorre porque o Swagger não conhece os tipos de resposta para nenhum dos endpoints

```bash
import { ApiProperty } from '@nestjs/swagger';
import { Article } from '@prisma/client';

export class ArticleEntity implements Article {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty({ required: false, nullable: true })
  description: string | null;

  @ApiProperty()
  body: string;

  @ApiProperty()
  published: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
```

Esta é uma implementação do `Article` tipo gerado pelo `Prisma Client`, com `@ApiProperty` decoradores adicionados a cada propriedade.

<img width="1840" alt="response-types" src="https://github.com/CristianoSFMothe/bug-blog/assets/68359459/129c87f1-946b-434c-9e2a-fd3801b4649d">


# Validações

Para realizar a validação de entrada, estará usando <a href="https://docs.nestjs.com/pipes" target="_blank">NestJS Pipes</a>. Os `Pipes` operam nos argumentos que estão sendo processados por um manipulador de rotas. O Nest invoca um pipe antes do manipulador de rotas e o pipe recebe os argumentos destinados ao manipulador de rotas. Os pipes podem fazer várias coisas, como validar a entrada, adicionar campos à entrada, etc. Os pipes são semelhantes a <a href="https://docs.nestjs.com/middleware" target="_blank">middleware</a>, mas o escopo dos `pipes é limitado ao processamento de argumentos de entrada.

Os pipes têm dois casos de uso típicos:

* *Validação*: Avalie os dados de entrada e, se válidos, passe-os inalterados; caso contrário, lance uma exceção quando os dados estiverem incorretos.
* *Transformação*: Transforme os dados de entrada para o formulário desejado (por exemplo, de string para inteiro).

<img src="https://github.com/CristianoSFMothe/bug-blog/assets/68359459/92f2184c-37e4-4910-be8b-2aa18a1ef2c8" alt="Pipes NestJs">

---

<img src="https://github.com/CristianoSFMothe/bug-blog/assets/68359459/289b18b6-088c-4761-9458-bf13062aca35" alt="Pipes Nestjs">


## Configurar ValidationPipe globalmente

Para executar a validação de entrada, você estará usando o NestJS incorporado `ValidationPipe`. O `ValidationPipe` fornece uma abordagem conveniente para aplicar regras de validação para todas as cargas úteis recebidas do cliente, onde as regras de validação são declaradas com decoradores da` class-validator` pacote.

```bash
npm install class-validator class-transformer
```

Agora importe o `ValidationPipe` no seu main.ts arquivo e use o `app.useGlobalPipes` método para disponibilizá-lo globalmente em seu aplicativo:

```bash
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('bug-blog')
    .setDescription('Documentação da API do Back-End do Bug Blog')
    .setVersion('0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('bug-blog', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
```

## Adicionar regras de validação para CreateArticleDto

Usar o class-validator pacote para adicionar decoradores de validação CreateArticleDto

1. `title` não pode estar vazio ou com menos de 5 caracteres.
2. `description` tem que ter um comprimento máximo de 300.
3. `body` e description não pode estar vazio.
4. `title`, `description` e `body` deve ser do tipo `string` e `published` deve ser do tipo `boolean`.

Este diagrama explica o que o `ValidationPipe` está fazendo sob o capô para entradas inválidas para o /articles rota:

<img src="https://github.com/CristianoSFMothe/bug-blog/assets/68359459/4316f961-db4f-4366-8590-7de5e1151fcf" alt="Pipes">


> Nota: O NestJS ValidationPipe é altamente configurável. Todas as opções de configuração disponíveis estão documentadas no NestJS docs.

# Adicionar um User modelo para o banco de dados

Atualmente, o banco de dados tem apenas um único modelo: `Article`. Um artigo pode ser escrito por um usuário registrado. Então, vamos adicionar um `User`

```bash

model Article {
  id          String   @id @default(uuid())
  title       String   @unique
  description String?
  body        String
  published   Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  author   User?   @relation(fields: [authorId], references: [id])
  authorId String?

  @@map("articles")
}

model User {
  id        String    @id @default(uuid())
  name      String?
  email     String    @unique
  password  String
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  articles  Article[]

  @@map("users")
}

```

Agora, para aplicar as alterações ao seu banco de dados, execute o comando de migração:

```bash
npx prisma migrate dev --name "add-table-user"
```

## Adicionar um authorId campo para ArticleEntity

Depois de executar a migração, você deve ter notado um novo erro TypeScript. O `ArticleEntity` classe implements o Article tipo gerado pelo Prisma. O Article o tipo tem um novo `authorId` campo, mas o `ArticleEntity` classe não tem esse campo definido. O TypeScript reconhece essa incompatibilidade nos tipos e está gerando um erro. Você corrigirá esse erro adicionando o `authorId` campo para o `ArticleEntity` classe.

Dentro `ArticleEntity` adicionar um novo `authorId` campo:

```bash
@ApiProperty({ required: false, nullable: true })
  authorId: number | null;
```

# Implementar endpoints CRUD para usuários

Implementar o `/users` recursos na sua API REST. Isso permitirá que execute operações CRUD nos usuários no banco de dados.

## Gerar novo users Recurso REST

Para gerar um novo recurso REST para `users` execute o seguinte comando:

```bash
npx nest generate resource
```

Receberá algumas instruções CLI. Responda às perguntas de acordo:

1. What name would you like to use for this resource (plural, e.g., "users")? `users`
2. What transport layer do you use? `API REST`
3. Would you like to generate CRUD entry points? `Yes`

## Adicionar PrismaClient ao Users módulo

Para acessar `PrismaClient` dentro do `Users` módulo, você deve adicionar o PrismaModule como uma importação. Adicione o seguinte `imports` para `UsersModule`.

Com injetar pode `PrismaService` dentro do `UsersService` e usá-lo para acessar o banco de dados. Para fazer isso, adicione um construtor para `users.service.ts`

## Definir o User classes de entidade e DTO

Assim como `ArticleEntity`, que definir um `UserEntity` classe que será usada para representar o User entidade na camada da API. Definir o `UserEntity` classe no `user.entity.ts` arquivo da seguinte forma:

```bash
import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';

export class UserEntity implements User {
  @ApiProperty()
  id: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}
```

Um `DTO` (Data Transfer Object) é um objeto que define como os dados serão enviados pela rede. Você precisará implementar o `CreateUserDto` e `UpdateUserDto` classes para definir os dados que serão enviados para a API ao criar e atualizar um usuário, respectivamente.

```bash
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty()
  password: string;
}
```

### Definir o UsersService classe

O `UsersService` é responsável por modificar e buscar dados do banco de dados usando o Prisma Client e fornecê-los ao `UsersController`.

### Definir o UsersController classe

O `UsersController` é responsável por lidar com solicitações e respostas ao users pontos finais. Ele vai alavancar o `UsersService` para acessar o banco de dados, o `UserEntity` para definir o corpo de resposta e o `CreateUserDto` e `UpdateUserDto` para definir o corpo da solicitação.

## Retornando o autor junto com um artigo

Atualmente, o endpoint `GET /articles/:id` não retorna o `author` de um artigo, apenas o `authorId`. Para buscar o author você tem que fazer uma solicitação adicional para o endpoint `GET /users/:id`. Isso não é ideal se você precisar do artigo e do autor, porque precisa fazer duas solicitações de API. Podemos melhorar isso retornando o author junto com o Article objeto.

# Implementar autenticação na sua API REST

Existem dois tipos principais de autenticação usados na web: baseado em sessão autenticação e baseado em token autenticação. Nesse caso iremos utilizar a autenticação baseada em token usando `Tokens da Web JSON` ( JWT ).

crie um novo `auth` módulo em sua aplicação. Execute o seguinte comando para gerar um novo módulo:

```bash
npx nest generate resource
```

Receberá algumas instruções CLI. Responda às perguntas de acordo:

1. What name would you like to use for this resource (plural, e.g., "users")? `auth`
2. What transport layer do you use? `API REST`
3. Would you like to generate CRUD entry points? `No`

## Instalar e configurar passport

`passport` é uma biblioteca de autenticação popular para aplicativos Node.js. É altamente configurável e suporta uma ampla gama de estratégias de autenticação. Ele deve ser usado com o <a href="https://expressjs.com/" target="_blank"></a> framework web, no qual o NestJS é construído. O NestJS tem uma integração de primeira parte com `passport` chamado `@nestjs/passport` isso torna mais fácil de usar em seu aplicativo NestJS.

```bash
# Instalar o Nestjs Passport, JWT e Passport JWT
npm install --save @nestjs/passport passport @nestjs/jwt passport-jwt

# Instalar as tipage o Nestjs Passport JWT
npm install --save-dev @types/passport-jwt
```

## Configurar passport em sua aplicação

Configurar passport em sua aplicação. Abra o `src/auth.module.ts` arquive e adicione o seguinte código:

```bash
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}

```

O `@nestjs/passpor`t o módulo fornece um `PassportModule` que você pode importar para o seu aplicativo. O `PassportModule` é um invólucro em torno do passport biblioteca que fornece utilitários específicos do NestJS. Você pode ler mais sobre o `PassportModule` no <a href="https://docs.nestjs.com/recipes/passport" target="_blank">documentação oficial</a>.

O `JwtModule` é um invólucro em torno do jsonwebtoken biblioteca. O secret fornece uma chave secreta que é usada para assinar os JWTs. O `expiresIn` objeto define o tempo de expiração dos JWTs.

## Implementar um endpoint POST /auth/login 

O `POST /login` o endpoint será usado para autenticar usuários. Ele aceitará um nome de usuário e senha e retornará um JWT se as credenciais forem válidas. Primeiro você cria um `LoginDto` classe que definirá a forma do corpo da solicitação.

Crie um novo arquivo chamado `login.dto.ts` dentro do `src/auth/dto` diretório:

```bash
# Criar o diretório
mkdir src/auth/dto

# Criar o arquivo
touch src/auth/dto/login.dto.ts
```

Definir um novo `AuthEntity` isso descreverá a forma da carga útil JWT. Crie um novo arquivo chamado auth.entity.ts dentro do `src/auth/entity` diretório:

```bash
# Criar o diretório
mkdir src/auth/entity

# Criar o arquivo
touch src/auth/entity/auth.entity.ts
```

```bash
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AuthEntity } from './entity/auth.entity';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string): Promise<AuthEntity> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new NotFoundException('No user found for email');
    }

    const isPasswordValid = user.password === password;

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return {
      accessToken: this.jwtService.sign({ userId: user.id }),
      email: user.email,
    };
  }
}
```

O `login` o método primeiro busca um usuário com o email fornecido. Se nenhum usuário for encontrado, ele lança um `NotFoundException`. Se um usuário for encontrado, ele verifica se a senha está correta. Se a senha estiver incorreta, ela lança um `UnauthorizedException`. Se a senha estiver correta, ela gera um JWT contendo o ID do usuário e retorna-o.

### Implementar a estratégia de autenticação JWT

No Passaporte, a <a href="https://www.passportjs.org/concepts/authentication/strategies/" target="_blank">estratégia</a> é responsável pela autenticação de solicitações, que realiza implementando um mecanismo de autenticação.

Não utilizaremos o `passport` pacote diretamente, mas sim interagir com o pacote wrapper `@nestjs/passport`, que chamará o `passport` pacote sob o capô. Para configurar uma estratégia com `@nestjs/passport`, é necessário criar uma classe que estenda o `PassportStrategy` classe. Você precisará fazer duas coisas principais nesta classe:

1. Não passará opções e configurações específicas da estratégia JWT para o `super()` método no construtor.
2. A `validate()` método de retorno de chamada que irá interagir com seu banco de dados para buscar um usuário com base na carga útil JWT. Se um usuário for encontrado, o `validate()` espera-se que o método retorne o objeto do usuário.

Primeiro crie um novo arquivo chamado `jwt.strategy.ts` dentro do `src/auth/strategy` diretório:

```bash
# Criar o diretório
mkdir src/auth/strategy 

# criar o arquivo
touch src/auth/strategy/jwt.strategy.ts
```

Agora implementar o `JwtStrategy` classe:

```bash
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from 'src/users/users.service';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: { userId: string }) {
    const user = await this.usersService.findOne(payload.userId);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
```

Criou um `JwtStrategy` classe que estende o `PassportStrategy` classe. O `PassportStrategy` classe leva dois argumentos: uma implementação de estratégia e o nome da estratégia. Aqui você está usando uma estratégia predefinida da biblioteca `passport-jwt`.

Adicione o novo `JwtStrategy` como um provedor no `AuthModule`.

Agora o `JwtStrategy` pode ser usado por outros módulos. Você também adicionou o `UsersModule` no imports, porque o `UsersService` está sendo usado no `JwtStrategy` classe.

Fazer `UsersService` acessível no `JwtStrategy` classe, você também precisa adicioná-lo no exports do `UsersModule`

## Implementar o protetor de autenticação JWT

<a href="https://docs.nestjs.com/guards" target="_blank">Guards</a> são uma construção NestJS que determina se uma solicitação deve ser autorizada a prosseguir ou não. Nesta seção, você implementará um costume `JwtAuthGuard` isso será usado para proteger rotas que exigem autenticação.

Crie um novo arquivo chamado `jwt-auth.guard.ts` dentro do `src/auth` diretório:

```bash
# Criar o diretório
mkdir src/auth/guards

# Criar o arquivo
touch src/auth/guards/jwt-auth.guard.ts
```

Agora implementar o JwtAuthGuard classe:

```bash
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
```

O `AuthGuard` a classe espera o nome de uma estratégia. Nesse caso, estamos usando o `JwtStrategy`, que é nomeada `jwt`.

Agora podemos usar esse protetor como decorador para proteger seus endpoints. Adicione o `JwtAuthGuard` para rotas no `UsersController`.

## Integrar autenticação no Swagger

Adicionar um `@ApiBearerAuth()` decorador para nos `controllers` para indicar que a autenticação é necessária no Swagger.

Adicionar o `.addBearerAuth()` chamada de método para o `SwaggerModule` configuração em `main.ts`.

# Hashing senhas

Atualmente, o `User.password` o campo é armazenado em texto simples. Este é um risco de segurança, porque se o banco de dados está comprometido, assim são todas as senhas. Para corrigir isso, você pode hash as senhas antes de armazená-los no banco de dados.

Utilizar o `bcrypt` biblioteca de criptografia para hash de senhas. Instale-o com `npm`:

```bash
# Instalar o bcrypt
npm install bcrypt

# Instalar as tipagens do bcrypt
npm install --save-dev @types/bcrypt
```

Atualizar o create e update métodos no `UsersService` para hash a senha antes de armazená-la no banco de dados

Atualizar o `login` método para usar senhas com hash