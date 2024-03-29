import { createDrawerNavigator } from "@react-navigation/drawer";
import { useContext } from "react";

import useMainHeader from "../hooks/useMainHeader";

import HomeScreen from "../screens/HomeScreen";
import SimpleCalculatorNavigation from "./SimpleCalculatorNavigation";

export type MainNavigationParams = {
  [name: string]: undefined;
};

const Drawer = createDrawerNavigator<MainNavigationParams>();

const MainNavigation = () => {
  return (
    <Drawer.Navigator
      screenOptions={(options) => useMainHeader(options)}
      initialRouteName={"Home"}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />

      <Drawer.Screen
        name="Simple Calculator"
        options={{
          headerShown: false,
        }}
        component={SimpleCalculatorNavigation}
      />
    </Drawer.Navigator>
  );
};

export default MainNavigation;
