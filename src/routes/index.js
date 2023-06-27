import React, { useState, useRef, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import { IntroScreen, LoginScreen, ResgisterScreen } from "~screens/auth";
import { Loader } from "~components";
import ScreenNames from "./routes";
import SplashScreen from "react-native-splash-screen";
import { Accounts, AdminDrawer, AllLeads, AllOppartunaties, Contract, HomeScreen, LeadDetailInfo, PdfReportScreen, SearchScreen } from "~screens/app";
import { selectIsLoggedIn } from "~redux/slices/user";
import { createDrawerNavigator } from "@react-navigation/drawer";
import styles from "./styles";
import Azhar from "~screens/app/azhar";
import BottomTabBar from "./bottomTabBar";
import Home from "~screens/app/home";
// import styles from "./styles";
// import styles from "./styles";
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
export default function Routes() {
  const isLogin = useSelector(selectIsLoggedIn);
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
  }, []);
  return (
    <NavigationContainer>
      <Loader />
      {!isLogin ? (
        <Stack.Navigator
          initialRouteName={ScreenNames.INTROSCREEN}
          screenOptions={{ header: () => false }}
        >
          <Stack.Screen
            name={ScreenNames.INTROSCREEN}
            component={IntroScreen}
          />
          <Stack.Screen name={ScreenNames.REGISTERSCREEN} component={ResgisterScreen} />
          <Stack.Screen name={ScreenNames.LOGIN} component={LoginScreen} />
        </Stack.Navigator>
      ) : (
        // <Drawer.Navigator
        //   initialRouteName="HomeScreen"
        //   screenOptions={{
        //     headerShown: false,
        //     drawerStyle: styles.drawerCon,
        //   }}
        //   drawerContent={(props) => <AdminDrawer {...props} />}
        // >
        //   <Drawer.Screen name={ScreenNames.HOME} component={HomeScreen} />
        //   {/* <Drawer.Screen name={ScreenNames.ADMINHOME} component={AdminHome} /> */}
        // </Drawer.Navigator>

        <Stack.Navigator
          initialRouteName={ScreenNames.BOTTOMTABBAR}
          screenOptions={{ header: () => false }}
        >
          <Stack.Screen name={ScreenNames.BOTTOMTABBAR} component={BottomTabBar} />
          <Stack.Screen name={ScreenNames.AZHAR} component={Azhar} />
          <Stack.Screen name={ScreenNames.ACCOUNTS} component={Accounts} />
          <Stack.Screen name={ScreenNames.CONTRACT} component={Contract} />
          <Stack.Screen name={ScreenNames.HOME} component={Home} />
          <Stack.Screen name={ScreenNames.AllLEADS} component={AllLeads}
           options={{
            headerShown: false,
            presentation: 'modal',
            animationTypeForReplace: 'push',
            animation:'slide_from_right'
          }}
           />
          <Stack.Screen name={ScreenNames.ALLOPPARTUNATIES} component={AllOppartunaties} />
          <Stack.Screen name={ScreenNames.LEADDETAILINFO} component={LeadDetailInfo} />
          <Stack.Screen name={ScreenNames.SEARCHSCREEN} component={SearchScreen} />
          <Stack.Screen name={ScreenNames.PDFREPORTSCREEN} component={PdfReportScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
