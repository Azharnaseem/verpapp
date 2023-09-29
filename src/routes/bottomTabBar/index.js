import { View,Keyboard } from "react-native";
import React, { useState, useEffect } from "react";
import styles from "./styles";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AppColors from "~utills/AppColors";
import { IconPlus, exploreIcon, journeyIcon, plusIcon } from "~assets/images";
// import Journey from "~screens/app/journey";
import {
  Accounts,
  AllConversationData,
  AllLeads,
  AllLongTextData,
  AllOppartunaties,
  AttendenceScreen,
  Contract,
  ContractDetailScreen,
  ContractScreen,
  ConversationScreen,
  EditProfile,
  HomeScreen,
  InvoiceScreen,
  LeadDetailInfo,
  LongTextScreen,
  Profile,
  TextsScreen,
  TicketDetailScreen,
  TicketsScreen,
} from "~screens/app";
import { FontFamily } from "~assets/fonts";
import HomeSvg from "~assets/SVG/homeSvg";
import LongTextSvg from "~assets/SVG/longTextSvg";
import ConversationSVg from "~assets/SVG/conversationSvg";
import { SmallText } from "~components/texts";
import AccountSvg from "~assets/SVG/AccountSvg";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ScreenNames from "~routes/routes";
import AttendenceSvg from "~assets/SVG/Attendence";
// import { HomeSvg, ProfileSvg } from "~assets/svg";

const BottomTabBar = ({navigation}) => {
  const [visible, setVisible] = useState(true);
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const CrmStack = createNativeStackNavigator();
  const ContractStack = createNativeStackNavigator();
  const AcntStack = createNativeStackNavigator();

const CrmStackScreen = ()=>{
  return (
    <CrmStack.Navigator initialRouteName="home">
      <CrmStack.Screen name={ScreenNames.HOME} component={HomeScreen} />
      <CrmStack.Screen name={ScreenNames.AllLEADS} component={AllLeads} />
      <CrmStack.Screen name={ScreenNames.ALLOPPARTUNATIES} component={AllOppartunaties} />
    </CrmStack.Navigator>
  );
} 


const ContractStackScreen=()=> {
  return (
    <ContractStack.Navigator initialRouteName={ScreenNames.CONTRACT}>
      <ContractStack.Screen name={ScreenNames.CONTRACTSCREEN} component={Contract} />
      <ContractStack.Screen name={ScreenNames.CONTRACTSCREEN} component={ContractScreen} />
      <ContractStack.Screen name={ScreenNames.CONTRACTSCREEN} component={TicketsScreen} />
      <ContractStack.Screen name={ScreenNames.TICKETDETAILSCREEN} component={TicketDetailScreen} />
      <ContractStack.Screen name={ScreenNames.CONTRACTDETAILSCREEN} component={ContractDetailScreen} />
    </ContractStack.Navigator>
  );
}


const AcntStackScreen=() =>{
  return (
    <AcntStack.Navigator initialRouteName={ScreenNames.ACCOUNTS}>
      <AcntStack.Screen name={ScreenNames.ACCOUNTS} component={Accounts} />
      <AcntStack.Screen name={ScreenNames.INVOICESSCREEN} component={InvoiceScreen} />
    </AcntStack.Navigator>
  );
}
  // useEffect(() => {
  //   const keyboardDidShowListener = Keyboard.addListener(
  //     'keyboardDidShow',
  //     () => {
  //       setKeyboardOpen(true);
  //     }
  //   );

  //   const keyboardDidHideListener = Keyboard.addListener(
  //     'keyboardDidHide',
  //     () => {
  //       setKeyboardOpen(false);
  //     }
  //   );

  //   return () => {
  //     keyboardDidShowListener.remove();
  //     keyboardDidHideListener.remove();
  //   };
  // }, []);
  // const isFocused = useIsFocused();
  // console.log("LOGEDDD ISSSS=========S", isFocused);
  const Tab = createBottomTabNavigator();
  // useEffect(() => {
  //   if (isFocused) {
  //     setVisible(true); // Show the TabBar when the screen is focused
  //   }
  // }, [isFocused]);
  return (
  
    <Tab.Navigator
      initialRouteName="home"
      screenOptions={{
        header: () => false,
        tabBarStyle: styles.tab,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard:true,
       
      }}
    >
      <Tab.Screen
        name='home'
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={styles.tabContainer}>
                <HomeSvg
               color={focused ? AppColors.primary : AppColors.black+"90"}
                />
              
                <SmallText
                  fontFamily={FontFamily.montserrat_SemiBold}
                  color={focused ? AppColors.primary : AppColors.black+"90"}
                  size={3}
                >
                 CRM
                </SmallText>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Contract"
        component={Contract}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={styles.tabContainer}>
                <LongTextSvg
                 color={focused ? AppColors.primary :AppColors.black+"90"}
                />
              
                <SmallText
                  fontFamily={FontFamily.montserrat_SemiBold}
                  color={focused ? AppColors.primary : AppColors.black+"90"}
                  size={3}
                >
                 Contract
                </SmallText>
              </View>
            );
          },
        }}
      />
      
      <Tab.Screen
        name="Accounts"
        component={Accounts}
        options={{
          // tabBarStyle: { display: "none" },
          tabBarIcon: ({ focused }) => {
            return (
              <View style={styles.tabContainer}>
                <AccountSvg
                  color={focused ? AppColors.primary : AppColors.black+"90"}
                />
          
                <SmallText
                  numberOfLines={1}
                  fontFamily={FontFamily.montserrat_SemiBold}
                  color={focused ? AppColors.primary : AppColors.black+"90"}
                  size={3}
                >
                  Accounts
                </SmallText>
              </View>
            );
          },
        }}
      />
      {/* <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={styles.tabContainer}>
               
                <ProfileSvg
                  color={focused ? AppColors.primary : AppColors.scndry}
                />
                
                <SmallText
                  fontFamily={FontFamily.montserrat_SemiBold}
                  color={focused ? AppColors.primary : AppColors.scndry}
                  size={2.8}
                >
                  Profile
                </SmallText>
              </View>
            );
          },
        }}
      /> */}
      <Tab.Screen
        name="AttendenceScreen"
        component={AttendenceScreen}
        options={{
          // tabBarStyle: { display: "none" },
          tabBarIcon: ({ focused }) => {
            return (
              <View style={styles.tabContainer}>
                <AttendenceSvg
                  color={focused ? AppColors.primary : AppColors.black+"90"}
                />
          
                <SmallText
                  numberOfLines={1}
                  fontFamily={FontFamily.montserrat_SemiBold}
                  color={focused ? AppColors.primary : AppColors.black+"90"}
                  size={3}
                >
                  Attendance
                </SmallText>
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
 
  );
};

export default BottomTabBar;
