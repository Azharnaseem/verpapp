import React, { useState, useRef, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useDispatch, useSelector } from "react-redux";
import { IntroScreen, LoginScreen, ResgisterScreen } from "~screens/auth";
import { Loader } from "~components";
import ScreenNames from "./routes";
import SplashScreen from "react-native-splash-screen";
import { Accounts, AdminDrawer, AllLeads, AllOppartunaties, AttendenceScreen, Contract, ContractDetailScreen, ContractScreen, HomeScreen, InvoiceScreen, InvoicesScreen, LeadDetailInfo, OppartunityDetailInfo, PdfReportScreen, SearchScreen, TicketDetailScreen, TicketsScreen } from "~screens/app";
import { selectIsLoggedIn, selectUserMeta, setIsLoggedIn, setRolesData, setRolesviewScreen, setToken, setUserMeta } from "~redux/slices/user";
import { createDrawerNavigator } from "@react-navigation/drawer";
import styles from "./styles";
import Azhar from "~screens/app/azhar";
import BottomTabBar from "./bottomTabBar";
import Home from "~screens/app/home";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BackgroundTimer from 'react-native-background-timer';
import { AppState, Text, TouchableOpacity } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { erroMessage, successMessage } from "~utills/Methods";
import Modal from 'react-native-modal';
import VersionCheck from 'react-native-version-check';
import { View,Linking } from "react-native";
import axios from "axios";
import { setAppLoader } from "~redux/slices/config";
import { Alert } from "react-native";
// import styles from "./styles";
// import styles from "./styles";
let timerReference = null;
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
export default function Routes() {
  const [isConnected, setIsconected]=useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [rolesviewdata,setRolesviewdata ] = useState([]);
  const [viewScreensList,setviewScreensList ] = useState();
  const userInfo = useSelector(selectUserMeta);
  // console.log("111111111=======>>>",viewScreensList);
  

  var stringify = JSON.parse(userInfo);
  // console.log("azha========>>>>",stringify);
    useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
  }, []);
  
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      // console.log("Connection typeeeeeeeeeeeeeeee======", state);
      // console.log("Is connected?", state.isConnected);
      if(state.isConnected==true) {
        // console.log("ccccccccccccccccc");
        successMessage("Your are Online")
      }else{
        // console.log("eeeeeeeeeeeeeeeeeeeeeeeee");
        erroMessage("Your are Offline")
      }
    });
    
    // Unsubscribe
    return ()=>{
      unsubscribe();
    };
  }, []);
  const dispatch = useDispatch();
  useEffect(() => {
    checkUpdate();
  }, []);
  async function checkUpdate() {
    VersionCheck.needUpdate().then(async res => {
     
      console.log("update is====22222222=========>",res);
      if (res.isNeeded) {
        // Alert.alert("Update Available", "You must update the app before use",[
        //   // {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
        //   {text: 'OK', onPress: () => {goToStore()}},
    
        // ],)
        setModalVisible(true);
      }
    });
  }
  async function goToStore() {
    setModalVisible(false);
    if (Platform.OS === 'android') {
      console.log("=====calllled link");
      Linking.openURL(
        'https://play.google.com/store/apps/details?id=com.verpsolution&hl=en&gl=US',
      );
    } else {
      Linking.openURL('https://apps.apple.com/us/app/808080/id1481558476');
    }
  }
 
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
  const checkToken = async () => {
    try {
      let token = await AsyncStorage.getItem("userToken");
      let userData = await AsyncStorage.getItem("userData");
      // console.log("data =33333333333333333333===", userData, "=======token===:", token);
      if (token) {
        console.log("yes we have token");
        dispatch(setToken(token));
        dispatch(setIsLoggedIn(true));
        dispatch(setUserMeta(userData));
      } else {
        // console.log("Something went wrong");
        // erroMessage("Something went wrong");
        // SplashScreen.hide();
      }
    } catch (error) {
      // SplashScreen.hide();
      // erroMessage("Something went wrong unable to get the token");
      // console.log("Something went wrong unable to get the token", error);
    }
  };
  const isLogin = useSelector(selectIsLoggedIn);
   
  useEffect(() => {
    checkToken();
  }, []);
  useEffect(() => {
    // (async () => {
      if(stringify?.groupName !="Admin"){
        getrollesdata();
      }
        
      
  
    
  
    // })();
  }, [userInfo]);
  useEffect(() => {
    if(stringify?.groupName !="Admin"){
    getviewScreenList(rolesviewdata);}
}, [rolesviewdata]);
  const getrollesdata = async (text) => {
    // console.log("text-----", text);  
    
    dispatch(setAppLoader(true));
        // console.log("callled 11111111",userInfo);
        if(userInfo){
        await axios
        .get(
          `http://192.168.0.220:8080/api/RolesAndRights/roleRights?groupname=${stringify?.groupName}&databasename=${stringify?.dbName}`
        )
      .then(response => {
      // console.log("222221212111===ttttt====",response); 
        //  setLoader(false);
         if (response !=[]){
          const filteredData = response?.filter(item => item.formControlName === "View");
          // console.log("data on filter=====", filteredData);  
          setRolesviewdata(filteredData);
          dispatch(setAppLoader(false));
         
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
         
          console.log("error11111 in  DATA GETTING", error);
          dispatch(setAppLoader(false));
        });
      }
        // setLoader(false);
        // setSearchQuery(resp?.data?.result);
        // setLoader(false);
      
   
  
    // console.log('----------------------------', text);
  };
  const getviewScreenList = async (data) => {
    dispatch(setAppLoader(true));
      
    let temp =[];
    let temps=   [{"formControlId": 2928, "formControlName": "View", "formId": 564, "formModule": "CRM", "formName": "frmTicketOpening", "groupId": 1, "groupName": "System Engineer"},{"formControlId": 2928, "formControlName": "View", "formId": 564, "formModule": "CRM", "formName": "frmContractOpening", "groupId": 1, "groupName": "System Engineer"}]
  
  data?.map(item => {
      if(item.formName==="frmTicketOpening" ||item.formName==="frmContractOpening"||item.formName==="frmLeadProfileList2"||item.formName==="frmOpportunityList"||item.formName==="frmInvoiceDueReport"){
       temp?.push(item?.formName)
      }
      
      // console.log("====2222====",temp);
  
   
   });
  //  console.log("====temppppppp====",temp);
   setviewScreensList(temp);
   dispatch(setRolesData(temp));
   dispatch(setAppLoader(false));
  //  dispatch(setRolesData(temp));
  
  }
  // const handleUserActivity = () => {
  //   // console.log("cllllllllllllllllllllllllllllllllllllllllll");
  //   // Reset the timer on user activity
  //   if (timerReference) {
  //     BackgroundTimer.clearTimeout(timerReference);
  //   }

  //   // Start a new timer for 15 minutes
  //   timerReference = BackgroundTimer.setTimeout(handleLogout, 1 * 60 * 1000);
  //   // console.log("=====",timerReference);
  // };
  // const handleAppStateChange = (nextAppState) => {
  //   // Reset the timer when the app is resumed from the background
  //   if (nextAppState === 'active') {
  //     handleUserActivity();
  //   }
  // };
  // const handleLogout = () => {
  //   // dispatch(setAppLoader(true));
         
  //           dispatch(setUserMeta(null));
  //           AsyncStorage.clear();
  //           dispatch(setIsLoggedIn(false));
  //           // dispatch(setAppLoader(false));
        
  // };
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
       <Modal
        isVisible={modalVisible}
        animationIn={'zoomInUp'}
        animationOut={'zoomOutDown'}
        style={{flex: 1}}>
        <View style={{backgroundColor: 'white', padding: 15, borderRadius: 5}}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 24,
              textAlign: 'center',
              marginBottom: 20,
            }}>
            Update Available
          </Text>
          <Text
            style={{
              fontWeight: '400',
              fontSize: 18,
              textAlign: 'center',
              marginBottom: 40,
            }}>
            You must update the app before use.
          </Text>
          <TouchableOpacity
            style={{alignSelf: 'flex-end', backgroundColor: ''}}
            onPress={() => goToStore()}>
            <Text style={{color: '#0B0080', fontSize: 18, padding: 5}}>
              Update
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
          <Stack.Screen name={ScreenNames.OPPARTUNITYDETAILINFO} component={OppartunityDetailInfo} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
    
  );
}
