import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import {
  carregarMoedasFavoritas,
  salvarMoedasFavoritas,
} from '../servicos/servicoFavoritas';

const ContextoFavoritas = createContext(null);

export function ProvedorFavoritas({ children }) {
  const [moedasFavoritas, setMoedasFavoritas] = useState([]);
  const [carregandoFavoritas, setCarregandoFavoritas] = useState(true);
  const moedasFavoritasRef = useRef([]);
  const carregamentoConcluidoRef = useRef(false);
  const filaDeGravacaoRef = useRef(Promise.resolve());

  useEffect(() => {
    let ativo = true;

    async function carregar() {
      try {
        const moedasSalvas = await carregarMoedasFavoritas();
        if (ativo) {
          moedasFavoritasRef.current = moedasSalvas;
          setMoedasFavoritas(moedasSalvas);
        }
      } catch {
        if (ativo) {
          moedasFavoritasRef.current = [];
          setMoedasFavoritas([]);
        }
      } finally {
        if (ativo) {
          carregamentoConcluidoRef.current = true;
          setCarregandoFavoritas(false);
        }
      }
    }

    carregar();

    return () => {
      ativo = false;
    };
  }, []);

  const alternarMoedaFavorita = useCallback((moeda) => {
    if (!carregamentoConcluidoRef.current) {
      return Promise.reject(new Error('Os favoritos ainda estão carregando.'));
    }

    const gravacao = filaDeGravacaoRef.current
      .catch(() => {})
      .then(async () => {
        const jaFavorita = moedasFavoritasRef.current.some(
          (item) => item.codigo === moeda.codigo,
        );
        const novasMoedasFavoritas = jaFavorita
          ? moedasFavoritasRef.current.filter((item) => item.codigo !== moeda.codigo)
          : [...moedasFavoritasRef.current, moeda];

        await salvarMoedasFavoritas(novasMoedasFavoritas);
        moedasFavoritasRef.current = novasMoedasFavoritas;
        setMoedasFavoritas(novasMoedasFavoritas);
      });

    filaDeGravacaoRef.current = gravacao;
    return gravacao;
  }, []);

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

  if (!contexto) {
    throw new Error('useFavoritas deve ser usado dentro de ProvedorFavoritas.');
  }

  return contexto;
}
