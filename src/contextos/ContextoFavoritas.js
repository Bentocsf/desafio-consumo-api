import { createContext, useContext, useEffect, useState } from 'react';
import { carregarMoedasFavoritas, salvarMoedasFavoritas } from '../servicos/servicoFavoritas';

const ContextoFavoritas = createContext(null);

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
    const jaFavorita = moedasFavoritas.some((item) => item.codigo === moeda.codigo);
    const atualizadas = jaFavorita
      ? moedasFavoritas.filter((item) => item.codigo !== moeda.codigo)
      : [...moedasFavoritas, moeda];

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
  const contexto = useContext(ContextoFavoritas);
  if (!contexto) throw new Error('Use os favoritos dentro do ProvedorFavoritas.');
  return contexto;
}
