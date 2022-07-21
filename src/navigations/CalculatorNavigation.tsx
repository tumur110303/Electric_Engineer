import { createStackNavigator } from "@react-navigation/stack";
import useMainHeader from "../hooks/useMainHeader";

// Screens...
import CalculatorScreen from "../screens/Calculators";
import PowerToVoltageCalculator from "../screens/PowerToVoltageCalculator";
import PowerToAmpCalculator from "../screens/PowerToAmpCalculator";
import PowerCalculator from "../screens/PowerCalculator";
import PowerFactorCalculator from "../screens/PowerFactorCalculator";
import ResistanceToVoltageCalculator from "../screens/ResistanceToVoltageCalculator";
import PowerToResistanceAmpsCalculator from "../screens/PowerToResistanceAmpsCalculator";
import PowerToCapacityCalculator from "../screens/PowerToCapacityCalculator";
import CapacityToPowerCalculator from "../screens/CapacityToPowerCalculator";
import ResistanceToAmpsCalculator from "../screens/ResistanceToAmpsCalculator";
import PowerToReactiveCalculator from "../screens/PowerToReactiveCalculator";
import CapacityToReactiveCalculator from "../screens/CapacityToReactiveCalculator";
import PowerReactiveToCapacity from "../screens/PowerReactiveToCapacity";
import CapacityPowerToPower from "../screens/CapacityPowerToPower";
import ResistanceVoltageToPowerCalculator from "../screens/ResistanceVoltageToPowerCalculator";
import ResistanceAmpsToPowerCalculator from "../screens/ResistanceAmpsToPowerCalculator";
import PowerToResistanceVoltageCalculator from "../screens/PowerToResistanceVoltageCalculator";
import PowerToVoltageAmps from "../screens/PowerToVoltageAmps";

export type StackNavigationParams = {
  [name: string]: undefined;
};

const Stack = createStackNavigator<StackNavigationParams>();

const CalculatorNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={(options) => useMainHeader(options)}
      initialRouteName="Calculator"
    >
      <Stack.Screen name="Calculator" component={CalculatorScreen} />
      <Stack.Screen
        name="power & current to voltage"
        component={PowerToVoltageCalculator}
      />
      <Stack.Screen
        name="Power & voltage to Amps"
        component={PowerToAmpCalculator}
      />
      <Stack.Screen
        name="Power to Resistance & Amps"
        component={PowerToResistanceAmpsCalculator}
      />
      <Stack.Screen
        name="Power to Voltage"
        component={PowerToResistanceVoltageCalculator}
      />
      <Stack.Screen
        name="Power to Voltage & Amps"
        component={PowerToVoltageAmps}
      />
      <Stack.Screen
        name="Active Power to Apparent Power"
        component={PowerToCapacityCalculator}
      />
      <Stack.Screen
        name="Apparent power to Active Power"
        component={CapacityToPowerCalculator}
      />
      <Stack.Screen
        name="Active power to Reactive Power"
        component={PowerToReactiveCalculator}
      />
      <Stack.Screen
        name="Apparent power to Reactive Power"
        component={CapacityToReactiveCalculator}
      />
      <Stack.Screen
        name="Active & Reactive to Apparent power"
        component={PowerReactiveToCapacity}
      />
      <Stack.Screen
        name="Active or Reactive power"
        component={CapacityPowerToPower}
      />
      <Stack.Screen
        name="Power factor calculator"
        component={PowerFactorCalculator}
      />
      <Stack.Screen name="Power calculator" component={PowerCalculator} />
      <Stack.Screen
        name="Resistance to Voltage"
        component={ResistanceToVoltageCalculator}
      />
      <Stack.Screen
        name="Resistance to Current"
        component={ResistanceToAmpsCalculator}
      />
      <Stack.Screen
        name="Resistance & Voltage to Power"
        component={ResistanceVoltageToPowerCalculator}
      />
      <Stack.Screen
        name="Resistance & Current to Power"
        component={ResistanceAmpsToPowerCalculator}
      />
    </Stack.Navigator>
  );
};

export default CalculatorNavigation;
