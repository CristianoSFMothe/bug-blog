import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

// initialize Prisma Client
const prisma = new PrismaClient();

const roundsOfHashing = 10;

async function main() {
  const QadminPassword = await bcrypt.hash('Q@dmin1234', roundsOfHashing);

  const Qadmin = await prisma.user.upsert({
    where: { email: 'qadmin@admin.com' },
    update: {
      password: QadminPassword,
    },
    create: {
      email: 'qadmin@admin.com',
      name: 'QA Admin',
      password: QadminPassword,
    },
  });
  // create two dummy articles
  const post1 = await prisma.article.upsert({
    where: { title: 'Lorem Ipsum' },
    update: {},
    create: {
      title: 'Lorem Ipsum',
      body: `O Lorem Ipsum é um texto modelo da indústria tipográfica e de impressão. O Lorem Ipsum tem vindo a ser o texto padrão usado por estas indústrias desde o ano de 1500, 
      quando uma misturou os caracteres de um texto para criar um espécime de livro`,
      description: 'Este texto não só sobreviveu 5 séculos',
      published: false,
    },
  });

  console.log({
    post1,
    Qadmin,
  });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
