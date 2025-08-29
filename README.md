  Teste INTEGRALE CONSULTA DE CEP - GABRIEL ANGELOTTI

  Uma aplicação web simples consultar informações de endereços através do CEP utilizando a API do ViaCEP.

  Funcionalidades

- Consulta de CEP: Busca informações completas de endereço através do CEP
- Validação de Formato: Aceita CEPs nos formatos XXXXX-XXX ou XXXXXXXX
- Interface Responsiva: Design moderno que funciona em desktop e mobile
- Feedback Visual: Indicadores de loading e tratamento de erros
- Máscara Automática: Formatação automática do CEP durante a digitação

  Informações Exibidas

  Para cada CEP consultado, a aplicação exibe:

- CEP: Código de Endereçamento Postal formatado
- Logradouro: Nome da rua/avenida
- Bairro: Bairro do endereço
- Cidade: Município
- UF: Estado (Unidade Federativa)
- DDD: Código de Discagem Direta à Distância

  Tecnologias Utilizadas

- HTML5: Estrutura semântica da página
- CSS3: Estilização moderna com gradientes e animações
- JavaScript (ES6+): Lógica de validação e integração com API
- API ViaCEP: Webservice gratuito para consulta de CEPs brasileiros

  Como Usar

1. Abra o arquivo index.html em qualquer navegador moderno
2. Digite um CEP no campo de entrada (ex: 01310-100 ou 01310100)
3. Clique em "Consultar ou pressione Enter
4. Visualize os resultados exibidos na tela

  Funcionalidades Técnicas

  Validação de CEP
- Aceita CEPs com ou sem hífen
- Valida formato numérico (8 dígitos)
- Remove caracteres especiais automaticamente

  Tratamento de Erros
- CEP inválido ou mal formatado
- CEP não encontrado na base de dados
- Erros de conexão com a API
- Feedback visual claro para o usuário

  Interface Responsiva
- Design adaptável para diferentes tamanhos de tela
- Layout otimizado para dispositivos móveis
- Animações suaves e feedback visual

  API Utilizada

  A aplicação utiliza a API ViaCEP disponível em [viacep.com.br](https://viacep.com.br/):

  Endpoint: `https://viacep.com.br/ws/{cep}/json/`

  Características do Design

- Gradiente Moderno: Fundo com gradiente roxo/azul
- Cards Elevados: Interface com sombras e bordas arredondadas
- Animações: Transições suaves e feedback visual
- Tipografia: Fonte moderna e legível
- Cores: Paleta harmoniosa e acessível

  Segurança

- Validação client-side para melhor experiência do usuário
- Sanitização de entrada para prevenir injeção de código
- Tratamento adequado de erros da API

  Suporte

  Para dúvidas ou problemas:

- API ViaCEP: [viacep.com.br](https://viacep.com.br/)
- Documentação: Consulte este README
- Teste: Use CEPs válidos como 01310-100, 20040-007, etc.

  Licença

Este projeto é de uso somente para avaliação técnica do processo seletivo integrale.

