# Conversor de Moedas

Aplicativo acadêmico para consultar moedas, salvar moedas favoritas no dispositivo e converter valores usando cotações da ExchangeRate-API.

## Funcionalidades

- Navegação principal por menu lateral: Início, Sobre e Moedas.
- Abas de moedas disponíveis, favoritas e conversão.
- Listagem de códigos e nomes obtidos pela ExchangeRate-API.
- Favoritos compartilhados entre as telas e persistidos no dispositivo com AsyncStorage.
- Conversão de valores pela API, com busca de moedas, validação, taxa e resultado.

## Tecnologias

- JavaScript, React Native e Expo.
- React Navigation: Drawer e Bottom Tabs.
- AsyncStorage para persistência local dos favoritos.
- `fetch` para consultar a ExchangeRate-API.

## Configuração e execução

1. Instale o [Node.js](https://nodejs.org/) e clone este repositório.
2. No diretório do projeto, instale as dependências:

   ```bash
   npm install
   ```

3. Copie `.env.example` para `.env` e informe sua chave da ExchangeRate-API:

   ```env
   EXPO_PUBLIC_EXCHANGE_RATE_API_KEY=sua_chave_aqui
   ```

   Obtenha uma chave em [exchangerate-api.com](https://www.exchangerate-api.com/). O `.env` é local e está ignorado pelo Git. A variável `EXPO_PUBLIC_` é incluída no bundle do aplicativo; não a trate como segredo em um app distribuído.

4. Inicie o Expo:

   ```bash
   npx expo start
   ```

   Abra o projeto no Expo Go ou em um emulador compatível. Se alterar `.env` enquanto o servidor estiver aberto, reinicie o Expo para carregar a configuração.

## Organização do código

- `App.js` e `index.js`: inicialização do aplicativo.
- `src/navegacao/`: Drawer e Bottom Tabs.
- `src/telas/`: telas Início, Sobre, Moedas, Favoritas e Converter.
- `src/componentes/`: lista, linha e seletor de moedas reutilizáveis.
- `src/contextos/ContextoFavoritas.js`: estado compartilhado dos favoritos.
- `src/servicos/servicoFavoritas.js`: persistência dos favoritos no AsyncStorage.
- `src/servicos/servicoMoedas.js`: listagem e conversão usando a ExchangeRate-API.
- `src/estilos/cores.js`: cores compartilhadas da interface.

## API

A lista de moedas usa o endpoint `/codes`; a conversão usa `/pair/{MOEDA_ORIGEM}/{MOEDA_DESTINO}/{VALOR}`. Consulte a [documentação da ExchangeRate-API](https://www.exchangerate-api.com/docs/overview).
