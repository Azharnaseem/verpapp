import React, { useState, useRef, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useDispatch, useSelector } from "react-redux";
import { IntroScreen, LoginScreen, ResgisterScreen } from "~screens/auth";
import { Loader } from "~components";
import ScreenNames from "./routes";
import SplashScreen from "react-native-splash-screen";
import { Accounts, AdminDrawer, AllLeads, AllOppartunaties, AttendenceScreen, Contract, ContractDetailScreen, ContractScreen, HomeScreen, InvoiceScreen, InvoicesScreen, LeadDetailInfo, PdfReportScreen, SearchScreen, TicketDetailScreen, TicketsScreen } from "~screens/app";
import { selectIsLoggedIn, setIsLoggedIn, setToken, setUserMeta } from "~redux/slices/user";
import { createDrawerNavigator } from "@react-navigation/drawer";
import styles from "./styles";
import Azhar from "~screens/app/azhar";
import BottomTabBar from "./bottomTabBar";
import Home from "~screens/app/home";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BackgroundTimer from 'react-native-background-timer';
import { AppState } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { erroMessage, successMessage } from "~utills/Methods";
// import styles from "./styles";
// import styles from "./styles";
let timerReference = null;
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
export default function Routes() {
  const [isConnected, setIsconected]=useState(false)
    useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
  }, []);
  
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
      if(state.isConnected==true) {
        console.log("ccccccccccccccccc");
        successMessage("Your are Online")
      }else{
        console.log("eeeeeeeeeeeeeeeeeeeeeeeee");
        erroMessage("Your are Offline")
      }
    });
    
    // Unsubscribe
    return ()=>{
      unsubscribe();
    };
  }, []);
  const dispatch = useDispatch();
  // const checkToken = async () => {
  //   try {
  //     let token = await AsyncStorage.getItem("userToken");
  //     let userData = await AsyncStorage.getItem("userData");
  //     console.log("data ====", userData, "=======token===:", token);
  //     if (token) {
  //       console.log("yes we have token");
  //       dispatch(setToken(token));
  //       dispatch(setUserMeta(userData));
  //       dispatch(setIsLoggedIn(true));
  //     } else {
  //       console.log("Something went wrong");
  //       // erroMessage("Something went wrong");
  //       // SplashScreen.hide();
  //     }
  //   } catch (error) {
  //     // SplashScreen.hide();
  //     // erroMessage("Something went wrong unable to get the token");
  //     console.log("Something went wrong unable to get the token", error);
  //   }
  // };
  const isLogin = useSelector(selectIsLoggedIn);
   
  const handleUserActivity = () => {
    console.log("cllllllllllllllllllllllllllllllllllllllllll");
    // Reset the timer on user activity
    if (timerReference) {
      BackgroundTimer.clearTimeout(timerReference);
    }

    // Start a new timer for 15 minutes
    timerReference = BackgroundTimer.setTimeout(handleLogout, 1 * 60 * 1000);
    console.log("=====",timerReference);
  };
  const handleAppStateChange = (nextAppState) => {
    // Reset the timer when the app is resumed from the background
    if (nextAppState === 'active') {
      handleUserActivity();
    }
  };
  const handleLogout = () => {
    // dispatch(setAppLoader(true));
         
            dispatch(setUserMeta(null));
            AsyncStorage.clear();
            dispatch(setIsLoggedIn(false));
            // dispatch(setAppLoader(false));
        
  };
  // useEffect(() => {
  //   console.log("cllllllllllllllllllllllllllllllllllllllllll22222222");
  //   // Start the initial timer on app load
  //   handleUserActivity();
  //   AppState.addEventListener('change', handleAppStateChange);

  //   // Clean up the timer on unmount
  //   return () => {
      
  //     if (timerReference) {
  //       BackgroundTimer.clearTimeout(timerReference);
  //     }
  //     AppState.removeEventListener('change', handleAppStateChange);
  //   };
  // }, []);

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
          {/* <Stack.Screen name={ScreenNames.AZHAR} component={Azhar} /> */}
          {/* <Stack.Screen name={ScreenNames.ACCOUNTS} component={Accounts} /> */}
          {/* <Stack.Screen name={ScreenNames.CONTRACT} component={Contract} /> */}
          {/* <Stack.Screen name={ScreenNames.HOME} component={Home} /> */}
          <Stack.Screen name={ScreenNames.AllLEADS} component={AllLeads}
          //  options={{
          //   headerShown: false,
          //   presentation: 'modal',
          //   animationTypeForReplace: 'push',
          //   animation:'slide_from_right'
          // }}
           />
          <Stack.Screen name={ScreenNames.ALLOPPARTUNATIES} component={AllOppartunaties} />
          <Stack.Screen name={ScreenNames.ATTENDENCESCREEN} component={AttendenceScreen} />
          <Stack.Screen name={ScreenNames.LEADDETAILINFO} component={LeadDetailInfo} />
        <Stack.Screen name={ScreenNames.SEARCHSCREEN} component={SearchScreen} />
          <Stack.Screen name={ScreenNames.PDFREPORTSCREEN} component={PdfReportScreen} />
          <Stack.Screen name={ScreenNames.CONTRACTSCREEN} component={ContractScreen} />
          <Stack.Screen name={ScreenNames.TICKETSSCREEN} component={TicketsScreen} />
          <Stack.Screen name={ScreenNames.CONTRACTDETAILSCREEN} component={ContractDetailScreen} />
          <Stack.Screen name={ScreenNames.TICKETDETAILSCREEN} component={TicketDetailScreen} />
          <Stack.Screen name={ScreenNames.INVOICESSCREEN} component={InvoiceScreen} />
          <Stack.Screen name={ScreenNames.HOME} component={HomeScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
