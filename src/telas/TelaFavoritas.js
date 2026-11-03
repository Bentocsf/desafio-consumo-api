import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ListaMoedas } from '../componentes/ListaMoedas';
import { useFavoritas } from '../contextos/ContextoFavoritas';
import { cores } from '../estilos/cores';

export function TelaFavoritas() {
  const { moedasFavoritas, carregandoFavoritas } = useFavoritas();

  return (
    <ScrollView contentContainerStyle={estilos.container}>
      <Text style={estilos.titulo}>Moedas favoritas</Text>
      {carregandoFavoritas ? (
        <View style={estilos.estado}>
          <ActivityIndicator color={cores.azulEscuro} />
          <Text style={estilos.mensagem}>Carregando favoritos...</Text>
        </View>
      ) : (
        <ListaMoedas
          moedas={moedasFavoritas}
          mensagemVazia="Você ainda não tem moedas favoritas."
        />
      )}
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: cores.branco,
  },
  titulo: {
    color: cores.azulEscuro,
    fontSize: 22,
    fontWeight: '700',
  },
  estado: {
    alignItems: 'center',
    gap: 12,
    paddingVertical: 24,
  },
  mensagem: {
    color: cores.cinzaTexto,
    fontSize: 15,
  },
});
