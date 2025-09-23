# Microsserviço de Registro de Refeições Servidas

Este microsserviço tem como objetivo registrar as refeições servidas aos usuários no sistema, permitindo que sejam armazenadas as informações sobre cada refeição consumida.

## Funcionalidades

- **Gerenciamento de itens**: Deve criar, visualizar, atualizar e excluir os registros de refeições feitas.
- **Campos do registro:**
  - ID do Usuário
  - ID do Cardápio Consumido
  - Data da Refeição
  - Período da Refeição

- *Regra de Negócio*: Um usuário pode registrar apenas uma refeição por turno (manhã, tarde, noite) em um mesmo dia.

- *Endpoint Para Consulta de Refeições por usuário:*
    - Deve fornecer um endpoint para informar as refeições feitas por um usuário autenticado, essa autenticação deve vir de outro serviço ou frontend.

- *Endpoint Para Consulta de Refeições no Dia:*
    - Deve fornecer um endpoint para informar o numero total de refeições feitas em uma data específica.