import { ScrollView, StyleSheet, Text } from 'react-native';
import { ListaMoedas } from '../componentes/ListaMoedas';
import { cores } from '../estilos/cores';

export function TelaFavoritas() {
  return (
    <ScrollView contentContainerStyle={estilos.container}>
      <Text style={estilos.titulo}>Moedas favoritas</Text>
      <ListaMoedas moedas={[]} mensagemVazia="Você ainda não tem moedas favoritas." />
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
});
