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
  AllLongTextData,
  Contract,
  ConversationScreen,
  EditProfile,
  HomeScreen,
  LongTextScreen,
  Profile,
  TextsScreen,
} from "~screens/app";
import { FontFamily } from "~assets/fonts";
import HomeSvg from "~assets/SVG/homeSvg";
import LongTextSvg from "~assets/SVG/longTextSvg";
import ConversationSVg from "~assets/SVG/conversationSvg";
import { SmallText } from "~components/texts";
import AccountSvg from "~assets/SVG/AccountSvg";
// import { HomeSvg, ProfileSvg } from "~assets/svg";

const BottomTabBar = ({navigation}) => {
  const [visible, setVisible] = useState(true);
  const [keyboardOpen, setKeyboardOpen] = useState(false);
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
        name="home"
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
      {/* <Tab.Screen
        name="newadd"
        component={ConversationScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={styles.plusIcon}>
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: AppColors.secndry,
                    width: width(14),
                    height: width(14),
                    borderRadius: width(100),
                    marginBottom: height(1),
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 12,
                    },
                    shadowOpacity: 0.58,
                    shadowRadius: 16.0,

                    elevation: 24,
                  }}
                >
                  <PlusSvg
                    color={focused ? AppColors.white : AppColors.lightWhite}
                  />
                </View>

                <SmallText
                  fontFamily={FontFamily.montserrat_Medium}
                  color={focused ? AppColors.white : AppColors.lightWhite}
                  size={2.8}
                >
                  New Chat
                </SmallText>
              </View>
            );
          },
          tabBarStyle: { display: "none" },
        }}
      /> */}
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
    </Tab.Navigator>
  );
};

export default BottomTabBar;
