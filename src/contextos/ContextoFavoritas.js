import { createContext, useContext, useEffect, useState } from 'react';
import { carregarMoedasFavoritas, salvarMoedasFavoritas } from '../servicos/servicoFavoritas';

const ContextoFavoritas = createContext(null);

// O provedor deixa a mesma lista de favoritos acessível em todas as telas.
export function ProvedorFavoritas({ children }) {
  const [moedasFavoritas, setMoedasFavoritas] = useState([]);
  const [carregandoFavoritas, setCarregandoFavoritas] = useState(true);

  useEffect(() => {
    // Se ainda não houver favoritos salvos, começamos com uma lista vazia.
    carregarMoedasFavoritas()
      .then(setMoedasFavoritas)
      .catch(() => setMoedasFavoritas([]))
      .finally(() => setCarregandoFavoritas(false));
  }, []);

  async function alternarMoedaFavorita(moeda) {
    // Se já estiver salva, tiro da lista; caso contrário, acrescento.
    const jaFavorita = moedasFavoritas.some((item) => item.codigo === moeda.codigo);
    const atualizadas = jaFavorita
      ? moedasFavoritas.filter((item) => item.codigo !== moeda.codigo)
      : [...moedasFavoritas, moeda];

    // Só atualizo a tela depois que o salvamento no aparelho termina.
    await salvarMoedasFavoritas(atualizadas);
    setMoedasFavoritas(atualizadas);
  }

  return (
    <ContextoFavoritas.Provider
      value={{ moedasFavoritas, carregandoFavoritas, alternarMoedaFavorita }}
    >
      {children}
    </ContextoFavoritas.Provider>
  );
}

export function useFavoritas() {
  // Esse atalho evita importar e consultar o contexto manualmente em cada tela.
  const contexto = useContext(ContextoFavoritas);
  if (!contexto) throw new Error('Use os favoritos dentro do ProvedorFavoritas.');
  return contexto;
}
