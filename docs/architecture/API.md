# Padrões de Desenvolvimento [API]

Esse documento deve definir como qualquer funcionalidade backend será implementada.

## Estrutura sugerida

### Objetivo

Estabelecer os padrões arquiteturais, técnicos e de qualidade para o desenvolvimento da API do Yume Fit.

### Tecnologias oficiais

* Node.js.
* TypeScript.
* Express.
* TypeORM.
* PostgreSQL.
* Redis.
* Tsyringe.
* Zod ou biblioteca definida para validação.
* Jest ou Vitest.
* Supertest.

### Organização por módulos

```
modules/
└─ users/
   ├─ dtos/
   ├─ infrastructure/
   │  ├─ http/
   │  │  ├─ controllers/
   │  │  ├─ middlewares/
   │  │  └─ routes/
   │  └─ typeorm/
   │     ├─ entities/
   │     └─ repositories/
   ├─ providers/
   ├─ repositories/
   ├─ services/
   └─ types/
```

### Responsabilidades das camadas

**Controller**

* Recebe a requisição.
* Extrai e valida os dados.
* Executa o caso de uso.
* Retorna a resposta HTTP.
* Não contém regra de negócio.
* Não acessa diretamente o banco de dados.

**Service ou Use Case**

* Implementa regras de negócio.
* Depende de contratos, não de implementações concretas.
* Não conhece Express, Request ou Response.
* Deve ser testável isoladamente.

**Repository**

* Define o contrato de acesso aos dados.
* Encapsula consultas e persistência.
* Não contém regra de negócio.
* Possui implementação real e fake quando necessário.

**Entity**

* Representa os dados persistidos.
* Não deve ser utilizada diretamente como DTO de resposta.
* Não deve expor campos sensíveis.

**Provider**

* Encapsula serviços substituíveis ou externos.
* Exemplos: hash, tokens, cache, e-mail, data e geração de identificadores.

### Regras de endpoints

* Utilizar substantivos nas rotas.
* Utilizar verbos HTTP corretamente.
* Retornar códigos HTTP coerentes.
* Validar todos os dados de entrada.
* Padronizar respostas de erro.
* Não retornar senha, hashes, tokens internos ou dados sensíveis.
* Implementar paginação em endpoints de listagem.
* Documentar endpoints no OpenAPI.

### Regras de banco de dados

* Alterações estruturais devem utilizar migrations.
* Nunca usar sincronização automática de schema em produção.
* Criar índices para campos frequentemente pesquisados.
* Usar transações quando uma operação alterar múltiplos recursos relacionados.
* Evitar consultas repetidas dentro de loops.
* Documentar exclusões lógicas e físicas.
* Não alterar migrations que já foram executadas em ambientes compartilhados.

### Segurança

* Senhas somente como hash.
* Refresh tokens somente como hash.
* Segredos somente por variáveis de ambiente.
* Rate limiting em endpoints sensíveis.
* Autorização validada no backend.
* Mensagens de autenticação não devem revelar informações desnecessárias.
* Dados de entrada nunca devem ser considerados confiáveis.

### Testes obrigatórios

* Regras de negócio devem possuir testes unitários.
* Fluxos críticos devem possuir testes de integração.
* Correções de bugs devem incluir teste de regressão.
* Testes não devem depender de dados manuais.
* Serviços externos devem ser simulados quando necessário.