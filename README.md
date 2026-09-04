# node-api — Projeto P1 (Programação Web 2)

API REST em **Node.js + Express + TypeScript + TypeORM + MySQL**, desenvolvida acompanhando as aulas do Prof. Adriano Baião.

- Aluno: Rafael Rabelo de Souza
- Curso: Engenharia de Software — UNIFAN
- Disciplina: Programação Web 2 — 6º período

---

## Requisitos

- Node.js 22 ou superior (`node -v`)
- MySQL 8 ou superior (`mysql --version`)
- Visual Studio Code (recomendado)

## Instalação

```bash
git clone <url-do-repositorio>
cd node-api
npm install
cp .env.example .env   # preencha as credenciais do seu MySQL
```

Criar a base de dados:

```sql
CREATE DATABASE node_api CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

## Subindo o MySQL (instalação portátil via scoop)

```bash
mysqld --console                       # inicia o servidor (deixe o terminal aberto)
mysql -u root -p -e "SHOW DATABASES;"  # testa a conexao
```

Para registrar como serviço do Windows (terminal como administrador):

```bash
mysqld --install MySQL --defaults-file="C:\Users\<usuario>\scoop\apps\mysql\current\my.ini"
```

## Execução

| Comando | O que faz |
|---------|-----------|
| `npm run build` | Compila o TypeScript (`src/`) para JavaScript (`dist/`) |
| `npm start` | Executa o servidor a partir de `dist/index.js` |
| `npm run watch` | Compilador em modo observador |
| `npm run start:watch` | Compila e reinicia o servidor a cada alteração (desenvolvimento) |

Servidor padrão: <http://localhost:8080>

---

## Estrutura

```
node-api/
├── src/
│   ├── controllers/
│   │   ├── AuthController.ts        # rota raiz (login)
│   │   └── SituationsController.ts  # rotas de situations
│   ├── entity/
│   │   ├── situations.ts    # entidade da tabela situations
│   │   └── users.ts         # entidade da tabela users
│   ├── migration/            # migrations do TypeORM (versionamento do banco)
│   ├── data-source.ts      # conexão do TypeORM com o MySQL
│   └── index.ts            # inicialização do Express e das rotas
├── .env                    # variáveis de ambiente (não versionado)
├── .env.example            # modelo das variáveis de ambiente
├── tsconfig.json
└── package.json
```

Arquitetura MVC: **model** gerencia os registros do banco, **controller** concentra a regra de negócio e as rotas.

## Rotas

| Metodo | Rota | Descricao |
|--------|------|-----------|
| GET | `/` | tela de login |
| GET | `/situations` | lista todas as situacoes |
| GET | `/situations/:id` | visualiza uma situacao pelo id (404 se nao existir) |
| POST | `/situations` | cadastra uma situacao |
| PUT | `/situations/:id` | edita uma situacao pelo id (404 se nao existir) |
| DELETE | `/situations/:id` | remove uma situacao pelo id (404 se nao existir) |

Exemplo de cadastro:

```bash
curl -X POST http://localhost:8080/situations \n  -H "Content-Type: application/json" \n  -d '{"nameSituation":"Ativo"}'
```

Respostas: `201` com a situacao criada, `500` em caso de erro (ex.: `nameSituation` repetido, que e unico).

## Migrations

```bash
# criar um arquivo de migration vazio
npx typeorm migration:create src/migration/NomeDaMigration

# aplicar as migrations pendentes (rode npm run build antes)
npx typeorm migration:run -d dist/data-source.js

# desfazer a ultima migration
npx typeorm migration:revert -d dist/data-source.js
```

Migrations existentes:

| Ordem | Migration | Cria |
|-------|-----------|------|
| 1 | `CreateTableSituations` | tabela `situations` |
| 2 | `CreateTableUsers` | tabela `users` + FK `situationId` → `situations.id` (`ON DELETE CASCADE`) |

## Variáveis de ambiente

| Variável | Descrição |
|----------|-----------|
| `PORT` | Porta do servidor HTTP |
| `DB_DIALECT` | Dialeto do banco (`mysql`, `mariadb`, `postgres`, `mongodb`) |
| `DB_HOST` | Host do banco |
| `DB_PORT` | Porta do banco (MySQL: 3306) |
| `DB_USERNAME` | Usuário do banco |
| `DB_PASSWORD` | Senha do banco |
| `DB_DATABASE` | Nome da base de dados |

---

## Roteiro das aulas

- [x] Aula 01 — Configurando a API (Express, TypeScript, TypeORM, variáveis de ambiente)
- [x] Aula 02 — Migrations (parte 1): entities `situations` e `users`, relacionamento 1:N
- [x] Aula 03 — Migrations (parte 2): migrations de `situations` e `users` + chave estrangeira
- [x] Aula 04 — CRUD: POST — cadastro de situacoes
- [x] Aula 05 — CRUD: GET (List & View) — listagem e visualizacao por id
- [x] Aula 06 — CRUD: PUT — edicao de situacao por id
- [x] Aula 07 — CRUD: DELETE — remocao de situacao por id
- [ ] Aula 08 — Seeds
- [ ] Aula 09 — Pagination
- [ ] Aula 10 — Pagination Service

## Comandos usados na Aula 01

```bash
npm init -y
npm i express
npm i -D typescript ts-node @types/express @types/node
npx tsc --init
npm i -D concurrently
npm i typeorm reflect-metadata mysql2
npm i dotenv
```
