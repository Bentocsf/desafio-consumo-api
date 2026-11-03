import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavegadorAbas } from './NavegadorAbas';
import { TelaInicio } from '../telas/TelaInicio';
import { TelaSobre } from '../telas/TelaSobre';

const MenuLateral = createDrawerNavigator();

export function NavegadorPrincipal() {
  return (
    <NavigationContainer>
      <MenuLateral.Navigator>
        <MenuLateral.Screen
          name="Inicio"
          component={TelaInicio}
          options={{ title: 'Início' }}
        />
        <MenuLateral.Screen
          name="Sobre"
          component={TelaSobre}
          options={{ title: 'Sobre' }}
        />
        <MenuLateral.Screen
          name="Moedas"
          component={NavegadorAbas}
          options={{ title: 'Moedas' }}
        />
      </MenuLateral.Navigator>
    </NavigationContainer>
  );
}
