import { createStackNavigator } from "@react-navigation/stack";
import useMainHeader from "../hooks/useMainHeader";

import CalculatorScreen from "../screens/CalculatorsScreen";
import ApartmentCalculator from "../screens/ApartmentCalculator";
import CoeffMethodScreen from "../screens/CoeffMethodScreen";
import PrivatePowerScreen from "../screens/PrivatePowerScreen";

export type StackNavigationParams = {
  [name: string]: undefined;
};

const Stack = createStackNavigator<StackNavigationParams>();

const CalculatorNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Тооцооны програм">
      <Stack.Screen name="Тооцооны програм" component={CalculatorScreen} />
      <Stack.Screen name="Орон сууц" component={ApartmentCalculator} />
      <Stack.Screen
        name="Ашиглалтын коэффициентийн арга"
        component={CoeffMethodScreen}
      />
      <Stack.Screen name="Хувийн чадлын арга" component={PrivatePowerScreen} />
    </Stack.Navigator>
  );
};

export default CalculatorNavigation;
