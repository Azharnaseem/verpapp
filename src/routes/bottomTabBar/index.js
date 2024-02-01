import { View,Keyboard, LogBox } from "react-native";
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
import { useDispatch, useSelector } from "react-redux";
import {selectUserMeta, selectviewScreenData, setRolesData } from "~redux/slices/user";
import axios from "axios";

// import { HomeSvg, ProfileSvg } from "~assets/svg";

const BottomTabBar = ({navigation}) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(true);
  const [loader, setLoader] = useState(false);
  const [rolesviewdata,setRolesviewdata ] = useState([]);
  const [viewScreensList,setviewScreensList ] = useState();
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const CrmStack = createNativeStackNavigator();
  const ContractStack = createNativeStackNavigator();
  const AcntStack = createNativeStackNavigator();
  const userInfo = useSelector(selectUserMeta);
   const viewScreenList = useSelector(selectviewScreenData);
   console.log("aaaa ========>>>>>>>",viewScreenList);
  
  

  var stringify = JSON.parse(userInfo);
  // console.log(" hellow =======>>>>222====", viewScreensList);
  // let a ="system engineer";
  // console.log(stringify?.groupName,"dtaaa====",stringify?.dbName);

const CrmStackScreen = ()=>{
  return (
    <CrmStack.Navigator initialRouteName="home">
      <CrmStack.Screen name={ScreenNames.HOME} component={HomeScreen} />
      <CrmStack.Screen name={ScreenNames.AllLEADS} component={AllLeads} />
      <CrmStack.Screen name={ScreenNames.ALLOPPARTUNATIES} component={AllOppartunaties} />
    </CrmStack.Navigator>
  );
} 
// useEffect(() => {
 
//     getrollesdata();
 
  
// }, [userInfo]);
// useEffect(() => {
//   // (async () => {
    
//       getrollesdata();
    

  

//   // })();
// }, [userInfo]);
// useEffect(() => {
//     getviewScreenList(rolesviewdata);
// }, [rolesviewdata]);
const getMoviesFromApi = () => {
  return fetch('https://reactnative.dev/movies.json')
    .then(response => response.json())
    .then(json => {
      console.log("res=2111211===",json);
      return json.movies;
    }) 
    .catch(error => {
      console.error("==111==6666",error);
    });
};

const getrollesdata = async (text) => {
  // console.log("text-----", text);  
  
  // setLoader(true);
      console.log("callled 11111111");
      if(userInfo){
      await axios
      .get(
        `http://192.168.0.220:8070/api/RolesAndRights/roleRights?groupname=${stringify?.groupName}&databasename=${stringify?.dbName}`
      )
    .then(response => {
      debugger
      //  console.log("222221212111===ttttt====",response); 
      //  setLoader(false);
       if (response !=[]){
        const filteredData = response?.filter(item => item.formControlName === "View");
        // console.log("data on filter=====", filteredData);  
        setRolesviewdata(filteredData);
       
    //  let temps=   [{"formControlId": 2928, "formControlName": "View", "formId": 564, "formModule": "CRM", "formName": "frmTicketOpening", "groupId": 1, "groupName": "System Engineer"},{"formControlId": 2928, "formControlName": "View", "formId": 564, "formModule": "CRM", "formName": "frmContractOpening", "groupId": 1, "groupName": "System Engineer"}]
    // if(filteredData !=[]) {
    //   temps?.map(item => {
    //     if(item.formName==="frmTicketOpening" ||item.formName==="frmContractOpening"||item.formName==="frmLeadProfileList2"||item.formName==="frmOpportunityList"||item.formName==="frmInvoiceDueReport"){
    //      // console.log("item is ===============",item?.formName);
    //      temp?.push(item?.formName)
    //     }
        
    //  console.log("temp===========",temp);
    //  setRolesviewdata(temp);
    //  if(temp =![]){
    //   setRolesviewdata(temp);
    //     // dispatch(setRolesData(temp));

    //  }
    //  });
    // }
    
    //     // onsole.log("122233445444444444=====", data);
       
    //     setLoader(false);

       }
        
      })
      .catch((error) => {
        debugger
        console.log("error11111 in  DATA GETTING", error);
      });
    }
      // setLoader(false);
      // setSearchQuery(resp?.data?.result);
      // setLoader(false);
    
 

  // console.log('----------------------------', text);
};
const getviewScreenList = async (data) => {
  
      
      let temp =[];
      let temps=   [{"formControlId": 2928, "formControlName": "View", "formId": 564, "formModule": "CRM", "formName": "frmTicketOpening", "groupId": 1, "groupName": "System Engineer"},{"formControlId": 2928, "formControlName": "View", "formId": 564, "formModule": "CRM", "formName": "frmContractOpening", "groupId": 1, "groupName": "System Engineer"}]
    
    data?.map(item => {
        if(item.formName==="frmTicketOpening" ||item.formName==="frmContractOpening"||item.formName==="frmLeadProfileList2"||item.formName==="frmOpportunityList"||item.formName==="frmInvoiceDueReport"){
         temp?.push(item?.formName)
        }
        
        // console.log("====2222====",temp);
    
     
     });
    //  console.log("====2222====",temp);
     setviewScreensList(temp);
     dispatch(setRolesData(temp));
    
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


// console.log( "===22222222===",rolesviewdata)
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
  
    stringify?.groupName ==="Admin"?
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
  </Tab.Navigator>:

      <Tab.Navigator
      initialRouteName="home"
      screenOptions={{
        header: () => false,
        tabBarStyle: styles.tab,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard:true,
       
      }}
    >
      {/* { viewScreenList?.includes("frmOpportunityList"||"frmLeadProfileList2")  && */}
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
                {viewScreenList?.length >0? "CRM":"Home"}
                </SmallText>
              </View>
            );
          },
        }}
      />
      {/* } */}
   { viewScreenList?.includes("frmContractOpening")  &&
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
      />}
   {viewScreenList?.includes("frmInvoiceDueReport")  &&   
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
      />}
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
      {/* { viewScreenList?.includes("frmInvoiceDueReport"||"frmLeadProfileList2"||"frmOpportunityList"||"frmContractOpening"||"frmTicketOpening")  &&   */}
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
      {/* } */}
    </Tab.Navigator>
    // : 

    
    
    
    
 
  );
};

export default BottomTabBar;
