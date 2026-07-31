# Padrões de Desenvolvimento [MOBILE]

O mobile pode compartilhar conceitos com o web, mas precisa de regras próprias porque possui navegação, armazenamento, permissões e ciclos de publicação diferentes.

## Estrutura sugerida

### Objetivo

Definir os padrões para o desenvolvimento dos aplicativos móveis do Yume Fit.

### Tecnologias oficiais

Definam a stack utilizada, por exemplo:

* React Native.
* Expo.
* TypeScript.
* Expo Router ou React Navigation.
* TanStack Query.
* React Hook Form.
* Zod.
* Secure Store.
* Biblioteca oficial de testes.

### Organização por funcionalidades

```
src/
├─ features/
│  ├─ auth/
│  ├─ profile/
│  ├─ workouts/
│  └─ progress/
├─ shared/
│  ├─ components/
│  ├─ hooks/
│  ├─ services/
│  ├─ storage/
│  ├─ theme/
│  └─ types/
└─ app/
```

### Regras de componentes

* Componentes devem funcionar corretamente em diferentes dimensões de tela.
* Evitar tamanhos fixos sem necessidade.
* Considerar safe areas.
* Utilizar componentes e tokens do design system.
* Lógicas específicas de plataforma devem ficar isoladas.
* Evitar duplicação entre Android e iOS quando o comportamento for igual.

### Navegação

* Rotas devem ser centralizadas.
* Parâmetros de navegação devem ser tipados.
* Telas protegidas devem validar autenticação antes da exibição.
* Deep links devem seguir um padrão documentado.
* A navegação não deve ser utilizada como armazenamento de estado permanente.

### Armazenamento e segurança

* Tokens não devem ser armazenados em armazenamento comum sem proteção.
  -amento e segurança
* Credenciais e tokens devem utilizar armazenamento seguro.
* Dados sensíveis não devem ser registrados em logs.
* Limpar dados locais durante logout.
* Documentar quais informações podem funcionar offline.
* Não confiar apenas em verificações realizadas no aplicativo.

### Comunicação com a API

* Utilizar o mesmo contrato da API consumido pelo web.
* Centralizar o cliente HTTP.
* Tratar perda de conexão.
* Definir comportamento de retry.
* Não realizar tentativas ilimitadas.
* Exibir estados de sincronização quando relevante.
* Resolver conflitos de dados de maneira explícita.

### Desempenho

* Evitar renderizações desnecessárias.
* Virtualizar listas grandes.
* Otimizar imagens.
* Evitar processamento pesado na thread principal.
* Medir antes de realizar otimizações complexas.
* Testar em dispositivos reais ou representativos.

### Permissões nativas

* Solicitar permissões somente no momento em que forem necessárias.
* Explicar o motivo antes da solicitação quando apropriado.
* Tratar permissões negadas.
* Não bloquear todo o aplicativo por uma permissão opcional.

### Testes e publicação

* Testar Android e iOS.
* Testar estados de conectividade limitada.
* Testar atualização de versão.
* Definir canais de desenvolvimento, homologação e produção.
* Documentar versionamento e publicação nas lojas.
* Configurar variáveis e credenciais por ambiente.