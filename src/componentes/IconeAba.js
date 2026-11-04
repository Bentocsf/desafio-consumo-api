import { StyleSheet, Text } from 'react-native';

// Mapeio os nomes das abas para símbolos simples, sem precisar instalar ícones.
const simbolos = {
  moedas: '¤',
  favoritas: '☆',
  favoritasSelecionada: '★',
  converter: '⇄',
};

export function IconeAba({ nome, cor, tamanho, selecionada }) {
  // A estrela muda quando a aba de favoritos está selecionada.
  const simbolo = nome === 'favoritas' && selecionada
    ? simbolos.favoritasSelecionada
    : simbolos[nome];

  return (
    <Text accessibilityElementsHidden style={[estilos.icone, { color: cor, fontSize: tamanho }]}>
      {simbolo}
    </Text>
  );
}

// Alinho o símbolo no espaço reservado pelo navegador.
const estilos = StyleSheet.create({
  icone: {
    textAlign: 'center',
    fontWeight: '600',
    lineHeight: 28,
  },
});
