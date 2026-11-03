import { ScrollView, StyleSheet, Text } from 'react-native';
import { ListaMoedas } from '../componentes/ListaMoedas';
import { moedasTemporarias } from '../dados/moedasTemporarias';
import { cores } from '../estilos/cores';

export function TelaMoedas() {
  return (
    <ScrollView contentContainerStyle={estilos.container}>
      <Text style={estilos.titulo}>Moedas disponíveis</Text>
      <Text style={estilos.descricao}>Lista temporária para demonstração.</Text>
      <ListaMoedas moedas={moedasTemporarias} />
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
  descricao: {
    color: cores.cinzaTexto,
    fontSize: 14,
    marginTop: 6,
    marginBottom: 12,
  },
});
