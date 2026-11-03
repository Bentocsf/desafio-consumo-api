import { ScrollView, StyleSheet, Text } from 'react-native';
import { cores } from '../estilos/cores';

export function TelaSobre() {
  return (
    <ScrollView contentContainerStyle={estilos.container}>
      <Text style={estilos.nomeAplicativo}>Conversor de Moedas</Text>
      <Text style={estilos.tituloSecao}>Objetivo</Text>
      <Text style={estilos.paragrafo}>
        O aplicativo permite consultar moedas, salvar favoritas e converter valores.
      </Text>
      <Text style={estilos.tituloSecao}>Como funciona</Text>
      <Text style={estilos.paragrafo}>
        Escolha as moedas de origem e destino, informe um valor e consulte a taxa e o resultado retornados pela API.
      </Text>
      <Text style={estilos.tituloSecao}>Fonte dos dados</Text>
      <Text style={estilos.paragrafo}>
        A lista e as cotações são obtidas pela ExchangeRate-API.
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
