import { useNavigation } from '@react-navigation/native';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { AreaSegura } from '../componentes/AreaSegura';
import { cores } from '../estilos/cores';

export function TelaInicio() {
  const navegacao = useNavigation();

  return (
    <AreaSegura bordas={['left', 'right', 'bottom']}>
      <View style={estilos.container}>
        <Text style={estilos.titulo}>Conversor de Moedas</Text>
        <Text style={estilos.descricao}>
          Consulte moedas e converta valores entre diferentes moedas em um só lugar.
        </Text>
        <Pressable
          accessibilityRole="button"
          onPress={() => navegacao.navigate('Moedas')}
          style={estilos.botao}
        >
          <Text style={estilos.textoBotao}>Acessar moedas</Text>
        </Pressable>
      </View>
    </AreaSegura>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: cores.branco,
  },
  titulo: {
    color: cores.azulEscuro,
    fontSize: 30,
    fontWeight: '700',
    marginBottom: 12,
  },
  descricao: {
    color: cores.cinzaTexto,
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
  },
  botao: {
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    backgroundColor: cores.azulEscuro,
    borderRadius: 6,
    paddingHorizontal: 18,
  },
  textoBotao: {
    color: cores.branco,
    fontSize: 15,
    fontWeight: '600',
  },
});
