import { ScrollView, StyleSheet, Text } from 'react-native';
import { cores } from '../estilos/cores';

export function TelaSobre() {
  return (
    <ScrollView contentContainerStyle={estilos.container}>
      <Text style={estilos.nomeAplicativo}>Conversor de Moedas</Text>
      <Text style={estilos.tituloSecao}>Objetivo</Text>
      <Text style={estilos.paragrafo}>
        O aplicativo foi desenvolvido para consultar moedas e facilitar a conversão de valores.
      </Text>
      <Text style={estilos.tituloSecao}>Como funciona</Text>
      <Text style={estilos.paragrafo}>
        Será possível escolher as moedas de origem e destino, informar um valor e consultar o resultado.
      </Text>
      <Text style={estilos.tituloSecao}>Fonte dos dados</Text>
      <Text style={estilos.paragrafo}>
        As cotações serão obtidas pela ExchangeRate-API.
      </Text>
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: cores.branco,
  },
  nomeAplicativo: {
    color: cores.azulEscuro,
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 24,
  },
  tituloSecao: {
    color: cores.preto,
    fontSize: 16,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 6,
  },
  paragrafo: {
    color: cores.cinzaTexto,
    fontSize: 15,
    lineHeight: 23,
  },
});
