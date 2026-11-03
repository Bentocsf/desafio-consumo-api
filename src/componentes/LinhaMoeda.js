import { Pressable, StyleSheet, Text, View } from 'react-native';
import { cores } from '../estilos/cores';

export function LinhaMoeda({
  codigo,
  nome,
  favoritada,
  desabilitado,
  aoPressionarFavorito,
}) {
  return (
    <View style={estilos.linha}>
      <View style={estilos.informacoes}>
        <Text style={estilos.codigo}>{codigo}</Text>
        <Text style={estilos.nome}>{nome}</Text>
      </View>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={
          favoritada
            ? `Remover ${codigo} dos favoritos`
            : `Adicionar ${codigo} aos favoritos`
        }
        accessibilityState={{ selected: favoritada, disabled: desabilitado }}
        disabled={desabilitado}
        onPress={aoPressionarFavorito}
        hitSlop={8}
        style={estilos.botaoFavorito}
      >
        <Text style={[estilos.iconeFavorito, favoritada && estilos.iconeFavoritoAtivo]}>
          {favoritada ? '★' : '☆'}
        </Text>
      </Pressable>
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
  botaoFavorito: {
    minWidth: 44,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconeFavorito: {
    color: cores.cinzaTexto,
    fontSize: 26,
  },
  iconeFavoritoAtivo: {
    color: cores.azulEscuro,
  },
});
