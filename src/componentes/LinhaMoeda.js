import { StyleSheet, Text, View } from 'react-native';
import { cores } from '../estilos/cores';

export function LinhaMoeda({ codigo, nome }) {
  return (
    <View style={estilos.linha}>
      <View style={estilos.informacoes}>
        <Text style={estilos.codigo}>{codigo}</Text>
        <Text style={estilos.nome}>{nome}</Text>
      </View>
      <Text style={estilos.espacoFavorito} accessibilityLabel="Espaço para favoritar">
        ☆
      </Text>
    </View>
  );
}

const estilos = StyleSheet.create({
  linha: {
    minHeight: 68,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: cores.cinzaBorda,
    paddingHorizontal: 4,
  },
  informacoes: {
    gap: 4,
  },
  codigo: {
    color: cores.preto,
    fontSize: 16,
    fontWeight: '600',
  },
  nome: {
    color: cores.cinzaTexto,
    fontSize: 14,
  },
  espacoFavorito: {
    color: cores.cinzaTexto,
    fontSize: 24,
    paddingHorizontal: 8,
  },
});
