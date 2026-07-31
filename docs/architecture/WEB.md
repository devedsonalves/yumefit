# Padrões de Desenvolvimento [WEB]

Esse documento deve orientar a aplicação utilizada por administradores, personal trainers e outros usuários web.

## Estrutura sugerida

### Objetivo

Estabelecer os padrões para desenvolvimento, organização e manutenção da aplicação web do Yume Fit.

### Tecnologias oficiais

Definam explicitamente a stack, por exemplo:

* React.
* TypeScript.
* Vite ou Next.js.
* React Router, caso aplicável.
* TanStack Query.
* React Hook Form.
* Zod.
* Biblioteca oficial de componentes.
* Ferramenta oficial de testes.

### Arquitetura por funcionalidades

A organização deve seguir funcionalidades do produto, e não apenas tipos técnicos.

```
src/
├─ features/
│  ├─ auth/
│  │  ├─ components/
│  │  ├─ hooks/
│  │  ├─ pages/
│  │  ├─ schemas/
│  │  ├─ services/
│  │  └─ types/
│  ├─ students/
│  └─ workouts/
├─ shared/
│  ├─ components/
│  ├─ hooks/
│  ├─ lib/
│  ├─ services/
│  └─ types/
└─ app/
```

### Regras para componentes

* Componentes devem possuir responsabilidade clara.
* Componentes de página apenas orquestram funcionalidades.
* Regras de negócio não devem ficar no JSX.
* Componentes compartilhados não devem depender de uma funcionalidade específica.
* Evitar componentes excessivamente configuráveis.
* Separar componentes quando houver ganho de legibilidade ou reutilização real.
* Não criar abstrações para usos hipotéticos.

### Estado e comunicação com a API

* Estado remoto deve ser gerenciado pela ferramenta oficial de consultas.
* Estado local deve permanecer próximo do componente que o utiliza.
* Evitar estado global sem necessidade.
* Requisições HTTP devem passar por uma camada centralizada.
* Componentes não devem conhecer detalhes de autenticação ou renovação de token.
* Cache, invalidação e atualização otimista devem seguir um padrão definido.
* Erros da API devem ser convertidos em mensagens compreensíveis.

### Formulários

* Utilizar a biblioteca oficial de formulários.
* Utilizar schemas para validação.
* Exibir erros próximos aos campos.
* Evitar duplicar regras de validação em vários componentes.
* Desabilitar submissões repetidas.
* Preservar os dados quando uma operação recuperável falhar.

### Interface e experiência

* Utilizar componentes do design system.
* Evitar valores visuais arbitrários.
* Todas as páginas devem possuir estados de:
  * Carregamento.
  * Erro.
  * Sem dados.
  * Sucesso.
  * Sem permissão, quando necessário.
* Garantir navegação por teclado.
* Utilizar HTML semântico.
* Não utilizar apenas cores para comunicar estados.
* Priorizar comportamento responsivo.

### Testes

* Testar comportamento, não detalhes internos.
* Fluxos críticos devem possuir testes de integração de componentes.
* Funções complexas devem possuir testes unitários.
* Bugs corrigidos devem receber testes de regressão.
* Evitar snapshots extensos sem valor claro.