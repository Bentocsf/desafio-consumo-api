# Conversor de Moedas

Aplicativo acadêmico criado com React Native, Expo e JavaScript.

## Executar

```bash
npx expo start
```

## Configurar a API

Copie `.env.example` para `.env` e configure `EXPO_PUBLIC_EXCHANGE_RATE_API_KEY`
com sua chave da ExchangeRate-API. O arquivo `.env` é local e ignorado pelo Git.
Variáveis com prefixo `EXPO_PUBLIC_` ficam visíveis no aplicativo compilado.

## Organização

- `App.js`: componente raiz e contêiner de gestos.
- `index.js`: registro do componente raiz no Expo.
- `app.json`: configurações do projeto Expo.
- `assets/`: imagens do projeto.
- `src/navegacao/`: Drawer principal e abas inferiores.
- `src/telas/`: as cinco telas do aplicativo.
- `src/componentes/`: linhas, listas e seletores reutilizáveis.
- `src/contextos/`: estado compartilhado dos favoritos entre as abas.
- `src/dados/`: dados temporários das moedas.
- `src/estilos/`: cores compartilhadas da interface.
- `src/servicos/`: requisições para a ExchangeRate-API.
- `src/servicos/servicoFavoritas.js`: leitura e gravação dos favoritos no AsyncStorage.

Os favoritos ficam salvos localmente no dispositivo. A conversão real ainda não está implementada.
