import { createDrawerNavigator } from "@react-navigation/drawer";
import { useContext } from "react";

import useMainHeader from "../hooks/useMainHeader";

import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import CalculatorNavigation from "./CalculatorNavigation";

export type MainNavigationParams = {
  [name: string]: undefined;
};

const Drawer = createDrawerNavigator<MainNavigationParams>();

const MainNavigation = () => {
  return (
    <Drawer.Navigator
      screenOptions={(options) => useMainHeader(options)}
      initialRouteName={"Нүүр хуудас"}
    >
      <Drawer.Screen name="Нүүр хуудас" component={HomeScreen} />

      <Drawer.Screen
        name="Тооцоолол"
        options={{
          headerShown: false,
        }}
        component={CalculatorNavigation}
      />
    </Drawer.Navigator>
  );
};

export default MainNavigation;
