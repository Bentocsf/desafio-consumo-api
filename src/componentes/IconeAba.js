import { StyleSheet, Text } from 'react-native';

const simbolos = {
  moedas: '¤',
  favoritas: '☆',
  favoritasSelecionada: '★',
  converter: '⇄',
};

export function IconeAba({ nome, cor, tamanho, selecionada }) {
  const simbolo = nome === 'favoritas' && selecionada
    ? simbolos.favoritasSelecionada
    : simbolos[nome];

  return (
    <Text accessibilityElementsHidden style={[estilos.icone, { color: cor, fontSize: tamanho }]}>
      {simbolo}
    </Text>
  );
}

const estilos = StyleSheet.create({
  icone: {
    textAlign: 'center',
    fontWeight: '600',
    lineHeight: 28,
  },
});
