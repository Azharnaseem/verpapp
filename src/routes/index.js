import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import { LoginScreen } from "~screens/auth";
import { Loader } from "~components";
import ScreenNames from "./routes";
import { AdminDrawer, HomeScreen } from "~screens/app";
import { selectIsLoggedIn } from "~redux/slices/user";
import { createDrawerNavigator } from "@react-navigation/drawer";
import styles from "./styles";
// import styles from "./styles";
// import styles from "./styles";
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
export default function Routes() {
  const isLogin = useSelector(selectIsLoggedIn);
  return (
    <NavigationContainer>
      <Loader />
      {!isLogin ? (
        <Stack.Navigator
          initialRouteName={ScreenNames.LOGIN}
          screenOptions={{ header: () => false }}
        >
          <Stack.Screen name={ScreenNames.LOGIN} component={LoginScreen} />
        </Stack.Navigator>
      ) : (
        <Drawer.Navigator
          initialRouteName="HomeScreen"
          screenOptions={{
            headerShown: false,
            drawerStyle: styles.drawerCon,
          }}
          drawerContent={(props) => <AdminDrawer {...props} />}
        >
          <Drawer.Screen name={ScreenNames.HOME} component={HomeScreen} />
          {/* <Drawer.Screen name={ScreenNames.ADMINHOME} component={AdminHome} /> */}
        </Drawer.Navigator>

        // <Stack.Navigator initialRouteName={ScreenNames.HOME} screenOptions={{ header: () => false }}>
        //   <Stack.Screen name={ScreenNames.HOME} component={HomeScreen} />
        // </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
