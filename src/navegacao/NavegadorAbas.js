import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TelaConverter } from '../telas/TelaConverter';
import { TelaFavoritas } from '../telas/TelaFavoritas';
import { TelaMoedas } from '../telas/TelaMoedas';

const Abas = createBottomTabNavigator();

export function NavegadorAbas() {
  return (
    <Abas.Navigator>
      <Abas.Screen name="Moedas" component={TelaMoedas} />
      <Abas.Screen name="Favoritas" component={TelaFavoritas} />
      <Abas.Screen name="Converter" component={TelaConverter} />
    </Abas.Navigator>
  );
}
