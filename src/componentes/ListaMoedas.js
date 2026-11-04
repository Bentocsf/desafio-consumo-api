import { useCallback } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { useFavoritas } from '../contextos/ContextoFavoritas';
import { cores } from '../estilos/cores';
import { LinhaMoeda } from './LinhaMoeda';

// Essa lista serve tanto para todas as moedas quanto para as favoritas.
export function ListaMoedas({ moedas, mensagemVazia }) {
  const {
    moedasFavoritas,
    carregandoFavoritas,
    alternarMoedaFavorita,
  } = useFavoritas();

  const aoPressionarFavorito = useCallback((moeda) => {
    // Se o celular não conseguir salvar, aviso a pessoa em vez de falhar em silêncio.
    alternarMoedaFavorita(moeda).catch(() => {
      Alert.alert('Não foi possível atualizar os favoritos', 'Tente novamente.');
    });
  }, [alternarMoedaFavorita]);

  if (moedas.length === 0) {
    // A mensagem muda conforme a lista está sendo usada.
    return <Text style={estilos.mensagemVazia}>{mensagemVazia}</Text>;
  }

  return (
    <View>
      {moedas.map((moeda) => (
        <LinhaMoeda
          key={moeda.codigo}
          codigo={moeda.codigo}
          nome={moeda.nome}
          favoritada={moedasFavoritas.some((item) => item.codigo === moeda.codigo)}
          desabilitado={carregandoFavoritas}
          aoPressionarFavorito={() => aoPressionarFavorito(moeda)}
        />
      ))}
    </View>
  );
}

// A lista vazia continua alinhada e legível mesmo sem resultados.
const estilos = StyleSheet.create({
  mensagemVazia: {
    color: cores.cinzaTexto,
    fontSize: 15,
    paddingVertical: 24,
    textAlign: 'center',
  },
});
