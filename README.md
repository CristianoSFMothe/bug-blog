# Bug Blog

## 🚧 Projeto em andamento

Este projeto está atualmente em construção, com o objetivo de aprimorar o conhecimento na construção de uma API utilizando o <a href="https://nestjs.com/" target="_blank">NestJs</a>, empregando o <a href="https://www.devmedia.com.br/orm-object-relational-mapper/19056" target="_blank">ORM</a> <a href="https://www.prisma.io/" target="_blank">Prisma</a>e o banco de dados <a href="https://www.postgresql.org/" target="_blank">PostgreSQL</a>, além do gerenciamento do <a href="https://www.docker.com/" target="_blank">Docker</a> através do docker-compose.

A primeira etapa do projeto consistiu na criação de uma API simples, a qual possui as seguintes rotas:

- **Articles**: Destinada à criação de artigos. Inicialmente, os artigos são criados com o status de publicação como falso, podendo ser alterado posteriormente.
- **Users**: Destinada à criação de usuários para acessar a aplicação.
- **Auth**: Rota exclusiva para autenticação, utilizando JWT como estratégia de desenvolvimento.

## 💡Futuras implementações

- [ ] Melhoria da lógica na rota de articles: criação de um endpoint específico para alterar o status de publicação. Atualmente, é possível alterar todos os campos do artigo, o que pode ser melhorado.
- [ ] Aprimoramento na rota de users: implementação de mais verificações e criação de endpoints para edição de dados do usuário.
- [ ] Criação de uma rota para logout. Atualmente, só está disponível a rota de login.
- [ ] Implementação de uma rota para recuperação de senha.
- [ ] Implementação de uma rota para alteração de senha.
- [ ] Desenvolvimento de um frontend para o projeto, inicialmente utilizando ReactJs.
- [ ] Realizar o deploy da aplicação: Pesquisar e implementar a estratégia de deployment para disponibilizar a aplicação online, pois atualmente está sendo executada localmente.

## 👍 Contribuindo

Se você deseja contribuir para o aprimoramento deste projeto, siga as etapas abaixo:

1. Faça um fork do [repositório](https://github.com/CristianoSFMothe/bug-blog) para sua própria conta no GitHub.
2. Clone o fork do repositório para sua máquina local:

```bash
git clone https://github.com/seu-usuario/bug-blog.git
```

3. Crie uma nova branch para suas contribuições:

```bash
git checkout -b minha-contribuicao
```

4. Faça suas melhorias e modificações no código, seguindo as diretrizes e as necessidades do projeto.
5. Após realizar as alterações desejadas, adicione e faça commit das mudanças:

```bash
git add .
git commit -m "Descrição concisa das alterações realizadas"
```

6. Faça o push das alterações para sua branch:

```bash
git push origin minha-contribuicao
```

7. Abra um pull request para o repositório original, descrevendo detalhadamente as alterações feitas e as melhorias implementadas. Certifique-se de mencionar qualquer problema ou funcionalidade relacionada ao pull request.

Após revisão, suas contribuições serão avaliadas e integradas ao projeto principal. Obrigado por ajudar a melhorar o Bug Blog!


## 🙎Sobre o Autor

Este projeto foi concebido por [Cristiano da Silva Ferreira](https://www.linkedin.com/in/cristiano-da-silva-ferreira/), um entusiasta da tecnologia e um fervoroso defensor do aprendizado contínuo. Atuando como QA (Quality Assurance), trago uma abordagem que transcende a simples execução de testes, reconhecendo que um verdadeiro profissional de QA vai muito além de clicar em botões, abrir telas e preencher formulários.

Acredito firmemente que um QA eficaz deve possuir uma compreensão profunda do sistema como um todo e não apenas das tarefas superficiais. Para isso, busco constantemente aprimorar meu conhecimento sobre o trabalho de um desenvolvedor, reconhecendo a importância de entender suas práticas e desafios. Este compromisso com a ampliação de perspectivas e habilidades é fundamental para garantir a qualidade e a excelência em cada projeto em que estou envolvido.