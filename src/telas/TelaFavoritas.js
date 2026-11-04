import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ListaMoedas } from '../componentes/ListaMoedas';
import { AreaSegura } from '../componentes/AreaSegura';
import { useFavoritas } from '../contextos/ContextoFavoritas';
import { cores } from '../estilos/cores';

// Essa tela só precisa ler o contexto: a lista e os botões ficam reutilizados.
export function TelaFavoritas() {
  const { moedasFavoritas, carregandoFavoritas } = useFavoritas();

  return (
    <AreaSegura>
      <ScrollView contentContainerStyle={estilos.container}>
        <Text style={estilos.titulo}>Moedas favoritas</Text>
        {/* Enquanto o celular lê o armazenamento, mostro um estado de carregamento. */}
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
    </AreaSegura>
  );
}

// Uso os mesmos espaçamentos da tela de moedas para manter o padrão visual.
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
