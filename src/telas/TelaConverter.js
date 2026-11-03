import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SeletorMoeda } from '../componentes/SeletorMoeda';
import { moedasTemporarias } from '../dados/moedasTemporarias';
import { cores } from '../estilos/cores';

export function TelaConverter() {
  const [valor, setValor] = useState('');
  const [moedaOrigem, setMoedaOrigem] = useState('USD');
  const [moedaDestino, setMoedaDestino] = useState('BRL');
  const [mensagemResultado, setMensagemResultado] = useState('O resultado será exibido aqui.');

  return (
    <ScrollView contentContainerStyle={estilos.container}>
      <Text style={estilos.titulo}>Converter valores</Text>
      <View style={estilos.formulario}>
        <View style={estilos.campo}>
          <Text style={estilos.rotulo}>Valor</Text>
          <TextInput
            accessibilityLabel="Valor para conversão"
            keyboardType="decimal-pad"
            onChangeText={setValor}
            placeholder="Ex.: 100,00"
            placeholderTextColor={cores.cinzaTexto}
            style={estilos.entrada}
            value={valor}
          />
        </View>
        <SeletorMoeda
          rotulo="Moeda de origem"
          valor={moedaOrigem}
          moedas={moedasTemporarias}
          aoSelecionar={setMoedaOrigem}
        />
        <SeletorMoeda
          rotulo="Moeda de destino"
          valor={moedaDestino}
          moedas={moedasTemporarias}
          aoSelecionar={setMoedaDestino}
        />
        <Pressable
          accessibilityRole="button"
          onPress={() => setMensagemResultado('A conversão será habilitada após a integração com a API.')}
          style={estilos.botao}
        >
          <Text style={estilos.textoBotao}>Converter</Text>
        </Pressable>
        <View accessibilityLiveRegion="polite" style={estilos.resultado}>
          <Text style={estilos.rotulo}>Resultado</Text>
          <Text style={estilos.textoResultado}>{mensagemResultado}</Text>
        </View>
      </View>
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
    marginBottom: 20,
  },
  formulario: {
    gap: 18,
  },
  campo: {
    gap: 7,
  },
  rotulo: {
    color: cores.preto,
    fontSize: 14,
    fontWeight: '600',
  },
  entrada: {
    minHeight: 48,
    borderWidth: 1,
    borderColor: cores.cinzaBorda,
    borderRadius: 6,
    color: cores.preto,
    fontSize: 15,
    paddingHorizontal: 12,
  },
  botao: {
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: cores.azulEscuro,
    borderRadius: 6,
    marginTop: 2,
  },
  textoBotao: {
    color: cores.branco,
    fontSize: 15,
    fontWeight: '600',
  },
  resultado: {
    gap: 7,
    borderWidth: 1,
    borderColor: cores.cinzaBorda,
    borderRadius: 6,
    padding: 14,
  },
  textoResultado: {
    color: cores.cinzaTexto,
    fontSize: 15,
    lineHeight: 22,
  },
});
