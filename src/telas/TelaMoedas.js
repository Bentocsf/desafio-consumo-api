import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ListaMoedas } from '../componentes/ListaMoedas';
import { AreaSegura } from '../componentes/AreaSegura';
import { cores } from '../estilos/cores';
import { buscarMoedas } from '../servicos/servicoMoedas';

// Aqui consulto a API e apresento o resultado com a lista reutilizável.
export function TelaMoedas() {
  const [moedas, setMoedas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  // Uso a mesma função na abertura da tela e no botão de tentar de novo.
  async function carregarMoedas() {
    setCarregando(true);
    setErro('');

    try {
      const listaMoedas = await buscarMoedas();
      setMoedas(listaMoedas);
    } catch (erroConsulta) {
      setMoedas([]);
      setErro(erroConsulta.message || 'Não foi possível carregar as moedas.');
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    // A lista é buscada quando essa tela aparece pela primeira vez.
    carregarMoedas();
  }, []);

  return (
    <AreaSegura>
      <ScrollView contentContainerStyle={estilos.container}>
        <Text style={estilos.titulo}>Moedas disponíveis</Text>
        <Text style={estilos.descricao}>Códigos e nomes de moedas disponíveis.</Text>
        {/* A tela mostra carregamento, erro ou lista, conforme o que aconteceu. */}
        {carregando ? (
          <View style={estilos.estado}>
            <ActivityIndicator color={cores.azulEscuro} />
            <Text style={estilos.mensagem}>Carregando moedas...</Text>
          </View>
        ) : erro ? (
          <View style={estilos.estado}>
            <Text style={estilos.mensagemErro}>{erro}</Text>
            <Pressable accessibilityRole="button" onPress={carregarMoedas} style={estilos.botaoTentarNovamente}>
              <Text style={estilos.textoBotao}>Tentar novamente</Text>
            </Pressable>
          </View>
        ) : (
          <ListaMoedas moedas={moedas} mensagemVazia="Nenhuma moeda foi encontrada." />
        )}
      </ScrollView>
    </AreaSegura>
  );
}

// A tela usa espaçamentos simples para funcionar bem em diferentes celulares.
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
  estado: {
    alignItems: 'center',
    gap: 12,
    paddingVertical: 24,
  },
  mensagem: {
    color: cores.cinzaTexto,
    fontSize: 15,
    textAlign: 'center',
  },
  mensagemErro: {
    color: cores.preto,
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
  },
  botaoTentarNovamente: {
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: cores.azulEscuro,
    borderRadius: 6,
    paddingHorizontal: 16,
  },
  textoBotao: {
    color: cores.azulEscuro,
    fontSize: 15,
    fontWeight: '600',
  },
});
