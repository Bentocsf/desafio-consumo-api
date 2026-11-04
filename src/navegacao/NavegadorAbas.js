import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { IconeAba } from '../componentes/IconeAba';
import { TelaConverter } from '../telas/TelaConverter';
import { TelaFavoritas } from '../telas/TelaFavoritas';
import { TelaMoedas } from '../telas/TelaMoedas';

const Abas = createBottomTabNavigator();

// Dentro da seção Moedas, uso abas para deixar as três funções à mão.
export function NavegadorAbas() {
  return (
    <Abas.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#17324D',
        tabBarInactiveTintColor: '#66717D',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#D9DEE5',
        },
      }}
    >
      {/* O componente de ícone recebe automaticamente as cores da aba. */}
      <Abas.Screen
        name="Moedas"
        component={TelaMoedas}
        options={{ tabBarIcon: ({ color, size, focused }) => <IconeAba nome="moedas" cor={color} tamanho={size} selecionada={focused} /> }}
      />
      <Abas.Screen
        name="Favoritas"
        component={TelaFavoritas}
        options={{ tabBarIcon: ({ color, size, focused }) => <IconeAba nome="favoritas" cor={color} tamanho={size} selecionada={focused} /> }}
      />
      <Abas.Screen
        name="Converter"
        component={TelaConverter}
        options={{ tabBarIcon: ({ color, size, focused }) => <IconeAba nome="converter" cor={color} tamanho={size} selecionada={focused} /> }}
      />
    </Abas.Navigator>
  );
}
