![Alt text](/public/images/logo-petz.svg)

# Desafio prático PETZ

## Tecnologias e padrões utilizados

### Core

- MVVM
- CleanCode
- Next.JS 13.0.7 (Page Routes)
- TypeScript
- Tailwind
  - Tailwind Merge
- SWR
- ZOD

### Testes

- Jest
- React Testing Library

***

## Iniciando o projeto

- É necessário rodar o `npm install` para instalar todas as dependências do projeto.

***

## Scripts

- Iniciar o servidor de desenvolvimento
  - `npm run dev`
- Iniciar projeto em produção
  - `npm run start`
- Criar build para produção
  - `npm run build`
- Verificar existencia de erros de lint
  - `npm run start`
- Rodar testes
  - Apenas uma vez
    - `npm run test`
  - Em tempo real
    - `npm run test:watch`
  - Ambiente CI
    - `npm run test:ci`

***

## Notas

Eu gostei bastante da proposta do projeto, me surpreendi quando vi que era de pokémom (Acho que era o único que ainda não havia feito algo usando a pokeAPI).

Tentei passar por todos os pontos sugeridos na descrição do teste. E uma das coisas que mais me agradou foi o MVVM, confesso que não o conhecia antes (apenas o seu irmão, o MVC aplicado em node). Gastei os primeiros momentos do projeto estudando sobre e, sei que ainda tenho um chão para percorrer nessa metodologia, mas creio que tenha conseguido usar e mandado bem pra um primeiro contato.

Tentei incrementar um pouco e deixar responsívo (até porque sem responsívidade não tem sentido programar 😁).
Também travei a main para não aceitar commits direto sem passar por PR e criei um workflow para rodar os testes unitários a cada abertura de PR.

Tem bastante coisa que gostaria de melhorar, como:

- Implementar search no select
- Desvincular a necessidade atual de o usar junto com o hookforms e dentro de um FormProvider.
- Criar mais testes
- Implementar cypress para E2E.
- Finalizar as documentações para todos os componentes e melhorar as já existentes.
- Creio que também dê pra otimizar as chamadas as APIs (embora com o incremental static regeneration já otimizou bastante na build.)