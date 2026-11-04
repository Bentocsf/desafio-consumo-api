import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SeletorMoeda } from '../componentes/SeletorMoeda';
import { AreaSegura } from '../componentes/AreaSegura';
import { cores } from '../estilos/cores';
import { buscarMoedas, converterParMoedas, validarValorConversao } from '../servicos/servicoMoedas';

// Mostro todos os números no formato brasileiro, com três casas decimais.
const formatarValor = (valor) => valor.toLocaleString('pt-BR', {
  minimumFractionDigits: 3,
  maximumFractionDigits: 3,
});

export function TelaConverter() {
  // Esses estados guardam o que a pessoa escolheu e o que a API respondeu.
  const [valor, setValor] = useState('');
  const [moedaOrigem, setMoedaOrigem] = useState('USD');
  const [moedaDestino, setMoedaDestino] = useState('BRL');
  const [moedas, setMoedas] = useState([]);
  const [carregandoMoedas, setCarregandoMoedas] = useState(true);
  const [carregandoConversao, setCarregandoConversao] = useState(false);
  const [erro, setErro] = useState('');
  const [resultado, setResultado] = useState(null);

  const carregarMoedas = useCallback(async () => {
    setCarregandoMoedas(true);
    setErro('');
    try {
      const lista = await buscarMoedas();
      setMoedas(lista);
    } catch (erroConsulta) {
      setErro(erroConsulta.message || 'Não foi possível carregar as moedas.');
    } finally {
      setCarregandoMoedas(false);
    }
  }, []);

  useEffect(() => {
    // A tela precisa da lista para preencher os seletores de origem e destino.
    carregarMoedas();
  }, [carregarMoedas]);

  const realizarConversao = async () => {
    // Limpo o resultado anterior para não confundir com a nova tentativa.
    setResultado(null);
    setErro('');

    let valorNumerico;
    try {
      valorNumerico = validarValorConversao(valor);
    } catch (erroValidacao) {
      setErro(erroValidacao.message);
      return;
    }

    if (!moedaOrigem || !moedaDestino) {
      setErro('Selecione as moedas de origem e destino.');
      return;
    }

    setCarregandoConversao(true);
    try {
      // O serviço conversa com a API e devolve os dados já organizados.
      const conversao = await converterParMoedas(moedaOrigem, moedaDestino, valorNumerico);
      setResultado(conversao);
    } catch (erroConsulta) {
      setErro(erroConsulta.message || 'Não foi possível realizar a conversão.');
    } finally {
      setCarregandoConversao(false);
    }
  };

  const inverterMoedas = () => {
    // Troco os dois códigos de lugar e apago mensagens da conversão anterior.
    setMoedaOrigem(moedaDestino);
    setMoedaDestino(moedaOrigem);
    setResultado(null);
    setErro('');
  };

  return (
    <AreaSegura>
      <ScrollView contentContainerStyle={estilos.container} keyboardShouldPersistTaps="handled">
        <Text style={estilos.titulo}>Converter valores</Text>
        <View style={estilos.formulario}>
          <View style={estilos.campo}>
            <Text style={estilos.rotulo}>Valor</Text>
            <TextInput
              accessibilityLabel="Valor para conversão"
              keyboardType="decimal-pad"
              onChangeText={(texto) => {
                setValor(texto);
                setResultado(null);
              }}
              placeholder="Ex.: 100,00"
              placeholderTextColor={cores.cinzaTexto}
              style={estilos.entrada}
              value={valor}
            />
          </View>

          {/* Enquanto a API responde, evito mostrar seletores ainda vazios. */}
          {carregandoMoedas ? (
            <View style={estilos.estado}><ActivityIndicator color={cores.azulEscuro} /><Text style={estilos.textoAuxiliar}>Carregando moedas...</Text></View>
          ) : moedas.length ? (
            <>
              <SeletorMoeda rotulo="Moeda de origem" valor={moedaOrigem} moedas={moedas} aoSelecionar={(codigo) => { setMoedaOrigem(codigo); setResultado(null); }} />
              <Pressable accessibilityRole="button" onPress={inverterMoedas} style={estilos.botaoInverter}>
                <Text style={estilos.textoInverter}>Inverter moedas</Text>
              </Pressable>
              <SeletorMoeda rotulo="Moeda de destino" valor={moedaDestino} moedas={moedas} aoSelecionar={(codigo) => { setMoedaDestino(codigo); setResultado(null); }} />
            </>
          ) : (
            <View style={estilos.estado}>
              <Text style={estilos.mensagemErro}>{erro || 'Nenhuma moeda disponível.'}</Text>
              <Pressable accessibilityRole="button" onPress={carregarMoedas} style={estilos.botaoTentarNovamente}>
                <Text style={estilos.textoTentarNovamente}>Tentar novamente</Text>
              </Pressable>
            </View>
          )}

          <Pressable
            accessibilityRole="button"
            accessibilityState={{ disabled: carregandoConversao || carregandoMoedas, busy: carregandoConversao }}
            disabled={carregandoConversao || carregandoMoedas || !moedas.length}
            onPress={realizarConversao}
            style={[estilos.botao, (carregandoConversao || carregandoMoedas || !moedas.length) && estilos.botaoDesabilitado]}
          >
            {carregandoConversao ? <ActivityIndicator color={cores.branco} /> : <Text style={estilos.textoBotao}>Converter</Text>}
          </Pressable>

          {(erro && moedas.length > 0) ? <Text accessibilityLiveRegion="polite" style={estilos.mensagemErro}>{erro}</Text> : null}

          {/* A caixa é atualizada quando chega uma resposta da conversão. */}
          <View accessibilityLiveRegion="polite" style={estilos.resultado}>
            <Text style={estilos.rotulo}>Resultado</Text>
            {resultado ? (
              <View style={estilos.detalhesResultado}>
                <Text style={estilos.textoResultado}>{formatarValor(resultado.valorOriginal)} {resultado.moedaOrigem} =</Text>
                <Text style={estilos.valorConvertido}>{formatarValor(resultado.valorConvertido)} {resultado.moedaDestino}</Text>
                <Text style={estilos.textoAuxiliar}>Taxa: 1 {resultado.moedaOrigem} = {formatarValor(resultado.taxaConversao)} {resultado.moedaDestino}</Text>
              </View>
            ) : <Text style={estilos.textoResultado}>O resultado será exibido aqui.</Text>}
          </View>
        </View>
      </ScrollView>
    </AreaSegura>
  );
}

// Organizo os estilos da tela por função: formulário, botões e resultado.
const estilos = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: cores.branco },
  titulo: { color: cores.azulEscuro, fontSize: 22, fontWeight: '700', marginBottom: 20 },
  formulario: { gap: 18 },
  campo: { gap: 7 },
  rotulo: { color: cores.preto, fontSize: 14, fontWeight: '600' },
  entrada: { minHeight: 48, borderWidth: 1, borderColor: cores.cinzaBorda, borderRadius: 6, color: cores.preto, fontSize: 15, paddingHorizontal: 12 },
  botao: { minHeight: 48, alignItems: 'center', justifyContent: 'center', backgroundColor: cores.azulEscuro, borderRadius: 6, marginTop: 2 },
  botaoDesabilitado: { opacity: 0.6 },
  textoBotao: { color: cores.branco, fontSize: 15, fontWeight: '600' },
  botaoInverter: { alignSelf: 'flex-start', paddingVertical: 2 },
  textoInverter: { color: cores.azulEscuro, fontSize: 14, fontWeight: '600' },
  estado: { alignItems: 'center', gap: 10, paddingVertical: 12 },
  textoAuxiliar: { color: cores.cinzaTexto, fontSize: 14, lineHeight: 21 },
  mensagemErro: { color: '#A12622', fontSize: 14, lineHeight: 20 },
  botaoTentarNovamente: { minHeight: 40, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: cores.azulEscuro, borderRadius: 6, paddingHorizontal: 14 },
  textoTentarNovamente: { color: cores.azulEscuro, fontWeight: '600' },
  resultado: { gap: 7, borderWidth: 1, borderColor: cores.cinzaBorda, borderRadius: 6, padding: 14 },
  detalhesResultado: { gap: 5 },
  textoResultado: { color: cores.cinzaTexto, fontSize: 15, lineHeight: 22 },
  valorConvertido: { color: cores.preto, fontSize: 20, fontWeight: '700' },
});
