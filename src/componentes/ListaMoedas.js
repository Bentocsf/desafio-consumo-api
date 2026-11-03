import { StyleSheet, Text, View } from 'react-native';
import { cores } from '../estilos/cores';
import { LinhaMoeda } from './LinhaMoeda';

export function ListaMoedas({ moedas, mensagemVazia }) {
  if (moedas.length === 0) {
    return <Text style={estilos.mensagemVazia}>{mensagemVazia}</Text>;
  }

  return (
    <View>
      {moedas.map((moeda) => (
        <LinhaMoeda key={moeda.codigo} codigo={moeda.codigo} nome={moeda.nome} />
      ))}
    </View>
  );
}

const estilos = StyleSheet.create({
  mensagemVazia: {
    color: cores.cinzaTexto,
    fontSize: 15,
    paddingVertical: 24,
    textAlign: 'center',
  },
});
