# Yume Fit Web

Este documento define a configuracao base e a arquitetura recomendada para a aplicacao web do Yume Fit, utilizada por administradores, personal trainers e demais usuarios que operam o produto pelo navegador.

## Objetivo

Estabelecer os padroes de desenvolvimento, organizacao e manutencao da aplicacao web, mantendo o codigo previsivel, testavel e orientado as funcionalidades reais do produto.

## Tecnologias oficiais

A aplicacao web deve utilizar a seguinte stack:

- React para construcao da interface.
- TypeScript para tipagem estatica.
- Vite como ferramenta de build e desenvolvimento.
- React Router para roteamento client-side.
- TanStack Query para estado remoto, cache e sincronizacao com a API.
- React Hook Form para formularios.
- Zod para validacao e parse de dados.
- shadcn/ui como biblioteca base de componentes.
- Tailwind CSS como camada de estilos utilitarios do design system.
- Vitest como ferramenta oficial de testes unitarios e de componentes.
- Testing Library para testes orientados ao comportamento do usuario.
- MSW para mocks de API em testes de integracao de componentes.

## Estrutura de pastas

A organizacao deve ser feita por funcionalidades do produto. Evite separar o codigo apenas por tipos tecnicos globais, como uma pasta unica de `components`, `hooks` ou `services` para toda a aplicacao.

```txt
apps/web/
|-- public/
|-- src/
|   |-- app/
|   |   |-- providers/
|   |   |-- routes/
|   |   |-- styles/
|   |   `-- main.tsx
|   |-- features/
|   |   |-- auth/
|   |   |   |-- components/
|   |   |   |-- hooks/
|   |   |   |-- pages/
|   |   |   |-- schemas/
|   |   |   |-- services/
|   |   |   `-- types/
|   |   |-- students/
|   |   |   |-- components/
|   |   |   |-- hooks/
|   |   |   |-- pages/
|   |   |   |-- schemas/
|   |   |   |-- services/
|   |   |   `-- types/
|   |   `-- workouts/
|   |       |-- components/
|   |       |-- hooks/
|   |       |-- pages/
|   |       |-- schemas/
|   |       |-- services/
|   |       `-- types/
|   |-- shared/
|   |   |-- components/
|   |   |   |-- feedback/
|   |   |   |-- forms/
|   |   |   |-- layout/
|   |   |   `-- ui/
|   |   |-- hooks/
|   |   |-- lib/
|   |   |-- services/
|   |   `-- types/
|   `-- test/
|       |-- mocks/
|       `-- setup.ts
|-- index.html
|-- package.json
|-- tsconfig.json
`-- vite.config.ts
```

## Responsabilidades das pastas

`src/app` contem a composicao da aplicacao: providers, rotas, estilos globais e ponto de entrada. Essa pasta deve conhecer as funcionalidades, mas nao deve concentrar regras de negocio.

`src/features` contem os modulos funcionais do produto. Cada feature deve agrupar suas paginas, componentes especificos, hooks, schemas, services e tipos. Exemplos: `auth`, `students`, `workouts`, `professionals`, `plans`, `billing`, `appointments` e `dashboard`.

`src/shared` contem codigo reutilizavel e independente de feature. Um item em `shared` nao deve depender de `features`.

`src/shared/components/ui` contem componentes primitivos do design system. Componentes de dominio nao devem morar aqui.

`src/shared/services` contem infraestrutura de comunicacao, como cliente HTTP, tratamento de erros, autenticacao em requests e adaptadores externos.

`src/shared/lib` contem funcoes utilitarias sem estado de aplicacao, como formatadores, helpers de data, normalizadores e configuracoes de bibliotecas.

`src/test` contem configuracao e utilitarios de teste compartilhados pela aplicacao web.

## Regras para componentes

Componentes devem ter responsabilidade clara e pequena o suficiente para serem entendidos sem navegar por muitos arquivos.

Componentes de pagina devem apenas orquestrar funcionalidades: carregar dados, montar layout, controlar estados da tela e delegar interacoes para componentes e hooks da feature.

Regras de negocio nao devem ficar no JSX. Extraia decisoes, validacoes, transformacoes e calculos para hooks, services, schemas ou funcoes puras.

Componentes compartilhados nao devem depender de uma funcionalidade especifica. Se o componente conhece termos como aluno, treino, plano ou personal, ele pertence a uma feature.

Evite componentes excessivamente configuraveis. Prefira componentes simples e especificos quando isso tornar o fluxo mais claro.

Separe componentes quando houver ganho real de legibilidade, isolamento de comportamento ou reutilizacao comprovada.

Nao crie abstracoes para usos hipoteticos. A terceira ocorrencia parecida costuma ser um bom momento para avaliar extracao.

## Estado e comunicacao com a API

Estado remoto deve ser gerenciado com TanStack Query.

Estado local deve permanecer o mais proximo possivel do componente que o utiliza.

Estado global so deve ser usado quando varios fluxos independentes precisarem acessar ou alterar a mesma informacao. Preferir primeiro estado local, contexto pequeno ou cache do TanStack Query.

Toda requisicao HTTP deve passar por uma camada centralizada em `src/shared/services/http`.

Componentes nao devem conhecer detalhes de autenticacao, refresh token, headers padrao, serializacao ou tratamento bruto de erros HTTP.

Services de feature devem expor funcoes orientadas ao dominio, por exemplo `listStudents`, `createWorkout` ou `updateStudentStatus`, e nao detalhes genericos de endpoint.

Queries e mutations devem usar chaves padronizadas por feature:

```ts
export const studentQueryKeys = {
  all: ['students'] as const,
  lists: () => [...studentQueryKeys.all, 'list'] as const,
  list: (filters: StudentFilters) => [...studentQueryKeys.lists(), filters] as const,
  detail: (studentId: string) => [...studentQueryKeys.all, 'detail', studentId] as const,
};
```

Invalidacoes, atualizacao otimista e sincronizacao de cache devem ficar nos hooks da feature, nao nos componentes de pagina.

Erros da API devem ser convertidos em mensagens compreensiveis antes de chegar na interface.

## Formularios

Formularios devem usar React Hook Form.

Validacao deve usar schemas Zod, preferencialmente na pasta `schemas` da feature.

Erros devem ser exibidos proximos aos campos correspondentes.

Nao duplique regras de validacao em varios componentes. Reutilize schemas e mensagens quando o comportamento esperado for o mesmo.

Submissoes repetidas devem ser bloqueadas enquanto a mutation estiver pendente.

Dados preenchidos pelo usuario devem ser preservados quando uma operacao recuperavel falhar.

Transformacoes entre formato do formulario e formato da API devem ficar fora do JSX.

## Interface e experiencia

Use componentes do design system como primeira opcao.

Evite valores visuais arbitrarios. Cores, espacamentos, raios, sombras, tipografia e estados interativos devem seguir tokens ou convencoes do design system.

Todas as paginas devem prever os seguintes estados:

- Carregamento.
- Erro.
- Sem dados.
- Sucesso.
- Sem permissao, quando aplicavel.

Garanta navegacao por teclado em formularios, menus, modais, tabelas e acoes principais.

Use HTML semantico. Prefira `button`, `nav`, `main`, `section`, `form`, `label`, `table` e elementos nativos quando fizerem sentido.

Nao use apenas cor para comunicar estados. Combine cor com texto, icone, borda, aria attributes ou outro sinal perceptivel.

Priorize comportamento responsivo desde o inicio. Telas administrativas devem continuar escaneaveis em desktop e funcionais em tablets e celulares.

## Testes

Testes devem validar comportamento, nao detalhes internos de implementacao.

Fluxos criticos devem ter testes de integracao de componentes com Testing Library e MSW. Exemplos: login, criacao de aluno, criacao de treino, edicao de plano e recuperacao de erro da API.

Funcoes complexas devem ter testes unitarios com Vitest.

Bugs corrigidos devem receber testes de regressao.

Evite snapshots extensos sem valor claro. Snapshots so devem ser usados quando ajudarem a proteger uma saida pequena, estavel e dificil de verificar de outra forma.

## Configuracao inicial recomendada

Quando o app for criado, mantenha estes scripts no `apps/web/package.json`:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc --noEmit && vite build",
    "preview": "vite preview",
    "test": "vitest run",
    "test:watch": "vitest",
    "typecheck": "tsc --noEmit"
  }
}
```

Use aliases para evitar imports relativos longos:

```ts
// vite.config.ts
resolve: {
  alias: {
    '@': path.resolve(__dirname, './src'),
  },
}
```

O `tsconfig.json` do app deve estender o `tsconfig.base.json` da raiz do monorepo.

## Criterios para novas features

Antes de criar uma nova feature, confirme se ela representa uma capacidade do produto e nao apenas uma separacao tecnica.

Toda feature que acessa API deve ter:

- `services` com funcoes de comunicacao.
- `hooks` com queries e mutations.
- `schemas` quando houver entrada de usuario ou validacao de contrato.
- `types` quando houver tipos compartilhados internamente pela feature.
- `pages` quando a feature possuir rotas proprias.
- `components` para componentes especificos daquele fluxo.

Se um arquivo comecar a ser usado por mais de uma feature, avalie se ele realmente e generico. So mova para `shared` quando ele nao depender mais da linguagem de uma feature especifica.
