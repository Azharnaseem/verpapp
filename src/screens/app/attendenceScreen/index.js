import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  ActivityIndicator,
  Pressable,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  CheckList,
  HomeHeader,
  LeadsOppComponent,
  PageHeader,
  ProfileDetail,
  ScreenWrapper,
  BottomSheet,
  SuccessModal,
  ConfirmationModal,
} from "~components";

import { selectUserMeta, setIsLoggedIn, setUserMeta } from "~redux/slices/user";
import styles from "./styles";
import dayjs from "dayjs";
import CommonStyles from "~utills/CommonStyles";
import { height, width } from "~utills/Dimension";
import SearchField from "~components/searchField";
import ScreenNames from "~routes/routes";
import {
  AllLeadsData,
  DatabaseCountries,
  EmployeeAttendenceData,
  OfficesLocationData,
} from "~utills/DummyData";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppColors from "~utills/AppColors";
import { SmallText } from "~components/texts";
import BottomTabBar from "~routes/bottomTabBar";
import { FontFamily } from "~assets/fonts";
import { TapIcon } from "~assets/images";
import MapSVG from "~assets/SVG/mapSvg";
import Geolocation from "@react-native-community/geolocation";
import TextInputSimple from "~components/textInputSimple";
import SvgIcon from "~assets/SVG";
import TickCheck from "~assets/SVG/tickCheck";
import GetLocation from "react-native-get-location";
import axios from "axios";
import { useIsFocused,useFocusEffect } from "@react-navigation/native";
import { selectLoader, setAppLoader } from "~redux/slices/config";
import { erroMessage, successMessage } from "~utills/Methods";
import { baseUrl } from "~utills/Constants";
// import { useFocusEffect } from '@react-navigation/native';

// import { PDFGenerator } from "~utills/Methods";
export default function AttendenceScreen({ navigation, route }) {
  const dispatch = useDispatch();

  const successModalRef = useRef();
  const CheckModelRef = useRef();
  const confirmationModal = useRef();
  const bottomSheetRef = useRef(null);
  const userInfo = useSelector(selectUserMeta);
  const load=useSelector(selectLoader)
  // console.log("--load--",load);
  var stringify = JSON.parse(userInfo);
  const [office, setOffice] = useState("");
  const [seletedItem, setSelectedItem] = useState("");
  const [officeLocation, setOfficeLocation] = useState("");
  // let userData =  AsyncStorage.getItem("userData");
  const isFocused = useIsFocused();
  

  const radiusInMeters = 50;
  const [location, setLocation] = useState(null);
  // console.log("===33333333333333333333====3333333=", officeLocation);
  // console.log("location is ====", officeLocation);

  // console.log("issssssssss focused====",isFocused);

  const [dt, setDt] = useState(new Date().toLocaleString());
  const [distancee, setDistance] = useState(null);
  // console.log(radiusInMeters, "==============================++++", distancee);
  const [markAttendence, setAttendence] = useState("");
  let checkIn="CheckIn";
  let checkOut="CheckOut";
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // This block will be executed every time the screen comes into focus
      console.log('Screen is sss2222/////////focused. Execute useEffect logic.');
      getLocation();
      setOffice("");
      setOfficeLocation("");
      setSelectedItem("");
      // Your useEffect logsic here
    });

    // The cleanup function, will be called when the component unmounts
    return unsubscribe;
  }, [navigation]);
  // console.log("============state===", markAttendence);
  const [selectedTimeZone, setSelectedTimeZone] = useState("Asia/Karachi");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [date, SetDate] = useState("");
  // console.log(currentTime,"===222222222222====>>>>",currentTime.substring(0,10));
  // console.log("--------dateee---------->ssss>>>",date);
  // console.log("timeeeeeeee", dayjs(currentTime).format("h:mm A"));

  const [searchQuery, setSearchQuery] = useState(null);
  // console.log("====",searchQuery);
  const [loader, setLoader] = useState(false);
  // console.log("----", loader);
  const currentTimer = dayjs().format("h:mm A");
  // let attdate=currentTime.getDate();
// console.log("-------------------rrrrrrrr--------22222222222992222222229--",attdate);
  useEffect(() => {
    const unsubscribee = navigation.addListener('focus', () => {
    (async () => {
      let userData = await AsyncStorage.getItem("attendnceStatus");
      let date = await AsyncStorage.getItem("attendnceDate");
    // console.log("-------------------rrrrrrrr--------992222222229--",dayjs(date)?.format("ddd, MMMM YYYY"),"--",dayjs()?.format("ddd, MMMM YYYY"));
    if(userData==='CheckOut' 
     && dayjs(date)?.format("ddd, MMMM YYYY")===dayjs()?.format("ddd, MMMM YYYY")
     ){
      setAttendence("CheckOut")
    }
    else{
      setAttendence("CheckIn")
    }
    })();
  });
  return unsubscribee;

  }, [navigation]);
  // useEffect(() => {
  //   getLocation();
  // }, [isFocused]);
  const getLocation = () => {
    dispatch(setAppLoader(true));
    // console.log("1111111111111111111111111111111111111 getlocation");
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout:0,
    })
      .then((location) => {
        // console.log("---->>>", location?.latitude);
        const { latitude, longitude } = location;
        console.log("===========location----===========>>>", latitude, longitude);
        setLocation({ latitude, longitude });
        dispatch(setAppLoader(false));
      })
      .catch((error) => {
        const { code, message } = error;
        dispatch(setAppLoader(false));
        console.warn("errorrrr+++", code, message);
        Alert.alert("Turn on your device location");
      });
    // Geolocation.getCurrentPosition(
    //   (position) => {
    //     console.log("=====================", position?.coords);
    //     const { latitude, longitude } = position?.coords;
    //     console.log("=============", latitude, "=====",longitude);
    //     setLocation({ latitude, longitude });
    //   },
    //   (error) => {
    //     console.error("location err",error);
    //   },
    //   { enableHighAccuracy: true, timeout: 16000, maximumAge: 10000 }
    // );
  };
  //   useEffect(() => {
  //     let secTimerr = setInterval( () => {
  //       console.log("callllllll after 5 seconds");
  //       // setDt(new Date().toLocaleString())
  //     },5000)

  //     return () => clearInterval(secTimerr);
  // }, []);
  const handleCountryChange = async (newCountry, offset) => {
    let linkhttps =
      "https://timeapi.io/api/Time/current/zone?timeZone=Europe/Amsterdam";
    // setSelectedCountry(newCountry);
    await axios
      .get(
        `https://timeapi.io/api/Time/current/zone?timeZone=${selectedTimeZone}`
      )
      .catch((error) => {
        console.log("error11111 in list by main catagory", error);
      })
      .then((res) => {
        // console.log("resss=====>>", dayjs(res?.dateTime).format("h:mm A"));
        setCurrentTime(res?.dateTime);
        // dayjs(currentTime)?.format("ddd, MMMM YYYY")
        SetDate(dayjs(res?.dateTime)?.format("DD/MM/YYYY"));
        // setSelectedCountryTime(res?.dateTime)
      });
    // var b =new Date();
    // var utc=b.getTime()+(b.getTimezoneOffset()*60000);
    // var nd =new Date(utc+(3600000*offset));
    // return console.log(newCountry,"=sssssssssssssssssssss===>P__>>>>",nd.toLocaleString());

    // Calculate the current time in the selected time zone
    // const currentLocalTime = DateTime.now().setZone(newCountry);
    // setCurrentTime(currentLocalTime.toFormat('yyyy-MM-dd HH:mm:ss'));
  };
  const markAttdence = async (newCountry, offset) => {
    // dispatch(setAppLoader(true));
    console.log("FUNCTUION44444444444444444444444444444444444 CALLLED");
    let linkhttps =
      "https://timeapi.io/api/Time/current/zone?timeZone=Europe/Amsterdam";
    // setSelectedCountry(newCountry);
    let addAttendance = {
      empID: stringify?.employeeId,
      attendanceDate: currentTime?.substring(0, 10),
      attendanceType: markAttendence,
      attendanceTime: currentTime,
      attendanceStatus: "Present",
      shiftId: 0,
      officeLocation: office,
      latitude: officeLocation?.latitude,
      longitude: officeLocation?.longitude,
    };
    // console.log("333222222222222222",stringify?.dbName);
    // console.log("------33332---",addAttendance);
    
    await axios
      .post(
        `${baseUrl}/Attendance/AddAttendance/Attendance?Databasename=${stringify?.dbName}`,
        addAttendance
      )

      .catch((error) => {
        dispatch(setAppLoader(false));
        Alert.alert("${error} in mark attendence");
        // console.log("error in mark attendence", error);
      })
      .then(async(res) => {
        console.log("resss=====>>Done this task check in", res);
        if(res?.error){
          // console.log("----555---",res?.error);
          erroMessage("Please Connect your VPN to CheckIn")
          dispatch(setAppLoader(false));
          // console.log("errro",res);
        }
        else{
          console.log("else is calllllllleeeed");
          // dispatch(setAppLoader(false));


          // if(load===false){

          

          // successMessage("")
          // Alert.alert("success")
          // if (
             
          //   markAttendence === "CheckIn"
          // ) {
            // markAttdence();
            successModalRef.current.show();
            // Alert.alert("success");
            setAttendence("CheckOut");
            
            setTimeout(async() => {
              
              successModalRef.current.hide();
              
              setOffice("");
              setOfficeLocation("");
              setSelectedItem("");
             
              navigation.goBack();
            }, 2000);
          // } else if (
          //   markAttendence === "CheckOut"
          // ) {
          //   // setAttendence("CheckIn");

          //   confirmationModal.current.show();

          //   // setTimeout(() => {
          //   //   CheckModelRef.current.hide();
          //   //   // navigation.navigate(ScreenNames.HOME);
          //   // }, 2000);
          // }
          await AsyncStorage.setItem(
            "attendnceStatus",
            checkOut          );
            await AsyncStorage.setItem(
              "attendnceDate",
          currentTime
            );
        }
      // }

        // setSelectedCountryTime(res?.dateTime)
      });
    // var b =new Date();
    // var utc=b.getTime()+(b.getTimezoneOffset()*60000);
    // var nd =new Date(utc+(3600000*offset));
    // return console.log(newCountry,"=sssssssssssssssssssss===>P__>>>>",nd.toLocaleString());

    // Calculate the current time in the selected time zone
    // const currentLocalTime = DateTime.now().setZone(newCountry);
    // setCurrentTime(currentLocalTime.toFormat('yyyy-MM-dd HH:mm:ss'));
  };
  const markAttdenceCheckOut = async (newCountry, offset) => {
    // dispatch(setAppLoader(true));
    console.log("Function Check Outtt Called CALLLED");
    let linkhttps =
      "https://timeapi.io/api/Time/current/zone?timeZone=Europe/Amsterdam";
    // setSelectedCountry(newCountry);
    let addAttendance = {
      empID: stringify?.employeeId,
      attendanceDate: currentTime?.substring(0, 10),
      attendanceType: markAttendence,
      attendanceTime: currentTime,
      attendanceStatus: "Present",
      shiftId: 0,
      officeLocation: office,
      latitude: officeLocation?.latitude,
      longitude: officeLocation?.longitude,
    };
    // console.log("333222222222222222",stringify?.dbName);
    await axios
      .post(
        `${baseUrl}/Attendance/AddAttendance/Attendance?Databasename=${stringify?.dbName}`,
        addAttendance
      )

      .catch((error) => {
        dispatch(setAppLoader(false));
        Alert.alert("${error} in mark attendence");
        // console.log("error in mark attendence", error);
      })
      .then(async(res) => {
        console.log("resss=====>>Done this task checkout", res);
        if(res?.error){
          erroMessage("Please Connect your VPN to CheckIn")
          dispatch(setAppLoader(false));
          console.log("errro",res);
        }else{
          dispatch(setAppLoader(false));
          setAttendence("CheckIn");
          // await AsyncStorage.setItem(
          //   "attendnceStatus",
          //   JSON.stringify(markAttendence)
          // );
          // confirmationModal.current.hide();
          CheckModelRef.current.show();
          setTimeout(async() => {
            
            CheckModelRef.current.hide();
            setOffice("");
            setOfficeLocation("");
            setSelectedItem("");
           
            navigation.goBack();
            // navigation.navigate(ScreenNames.HOME);
          }, 4000);
          await AsyncStorage.setItem(
            "attendnceStatus",
        checkIn
          );
          
        }

        // setSelectedCountryTime(res?.dateTime)
      });
    // var b =new Date();
    // var utc=b.getTime()+(b.getTimezoneOffset()*60000);
    // var nd =new Date(utc+(3600000*offset));
    // return console.log(newCountry,"=sssssssssssssssssssss===>P__>>>>",nd.toLocaleString());

    // Calculate the current time in the selected time zone
    // const currentLocalTime = DateTime.now().setZone(newCountry);
    // setCurrentTime(currentLocalTime.toFormat('yyyy-MM-dd HH:mm:ss'));
  };
  useEffect(() => {
    handleCountryChange();
  }, [office]);

  const renderSelectedCountry = ({ item, index }) => {
    // console.log("sssssssssssssssssssss===>>>))", item);
    return (
      <View>
        <CheckList
          containerViewStyle={CommonStyles.marginBottom_1}
          selected={seletedItem === index}
          onPress={() => {
            setSelectedItem(index);
            setOffice(item.name);
            setOfficeLocation(item?.location);
            setSelectedTimeZone(item?.timeZone);
            setTimeout(() => {
              bottomSheetRef.current.close();
            }, 1000);
          }}
          tittle={item.name}
        />
      </View>
    );
  };
  const renderEmployeeList = ({ item, index }) => {
    // console.log("data==============>>",item);
    return (
      <View style={{ marginBottom: height(1) }}>
        <ProfileDetail
          name={item?.name}
          profession={item?.professional}
          icon={
            <TickCheck
              color={
                item?.attendence == "Absent"
                  ? AppColors.red
                  : AppColors.darkGreen
              }
            />
          }
        />
      </View>
    );
  };

  const calculateCircularBoundaries = (
    centerLat,
    centerLng,
    radiusInMeters
  ) => {
    const earthRadius = 6371000; // Earth's radius in meters

    const latOffset = (radiusInMeters / earthRadius) * (180 / Math.PI);
    const lngOffset =
      ((radiusInMeters / earthRadius) * (180 / Math.PI)) /
      Math.cos(centerLat * (Math.PI / 180));

    const minLat = centerLat - latOffset;
    const maxLat = centerLat + latOffset;
    const minLng = centerLng - lngOffset;
    const maxLng = centerLng + lngOffset;

    return {
      minLat,
      maxLat,
      minLng,
      maxLng,
    };
  };
  function calculateHaversineDistance(lat1, lon1, lat2, lon2) {
    // console.log("222222222222222222 call distance");
    const earthRadius = 6371000; // Earth's radius in meters

    const latDiff = (lat2 - lat1) * (Math.PI / 180);
    const lonDiff = (lon2 - lon1) * (Math.PI / 180);

    const a =
      Math.sin(latDiff / 2) * Math.sin(latDiff / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(lonDiff / 2) *
        Math.sin(lonDiff / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = earthRadius * c;
    return distance;
  }
  // useEffect(() => {
  //   getLocation();
  //   setOffice("");
  //   setOfficeLocation("");
  //   setSelectedItem("");
  //   //  handleCountryChange();
  //   // const myLat = location?.latitude; // Your latitude
  //   // const myLon = location?.longitude; // Your longitude
  //   // const otherUserLat = officeLocation?.latitude; // Other user's latitude
  //   // const otherUserLon = officeLocation?.longitude; // Other user's longitude

  //   // const distance = calculateHaversineDistance(
  //   //   myLat,
  //   //   myLon,
  //   //   otherUserLat,
  //   //   otherUserLon
  //   // );
  //   // setDistance(distance);
  // }, [isFocused===true]);
  useEffect(() => {
    // getLocation();
    const myLat = location?.latitude; // Your latitude
    const myLon = location?.longitude; // Your longitude
    const otherUserLat = officeLocation?.latitude; // Other user's latitude
    const otherUserLon = officeLocation?.longitude; // Other user's longitude

    const distance = calculateHaversineDistance(
      myLat,
      myLon,
      otherUserLat,
      otherUserLon
    );
    console.log("===distanceccece====",distance);
    setDistance(distance);
  }, [officeLocation]);
  //   useEffect(() => {
  //     let secTimer = setInterval( () => {
  //       setDt(new Date().toLocaleString())
  //     },1000)

  //     return () => clearInterval(secTimer);
  // }, []);
  // Your radius in meters

  // if (distancee <= radiusInMeters) {
  //   console.log("The other user is within your radius.");
  // } else {
  //   console.log("The other user is outside your radius.");
  // }

  // console.log(distancee, "---------=====", location);
  let role = "user";

  return (
    <ScreenWrapper
      scrollEnabled
      headerUnScrollable={() => {
        return (
          <View>
            <PageHeader
            
              pageTitle={
                role == "admin" ? "Check Attendence" : "Mark Attendence"
              }
              onPressBack={() => navigation.goBack()}
            />
          </View>
        );
      }}
    >
      <View style={styles.mainViewContainer}>
        {/* <Text>ddd</Text> */}
        {role == "admin" ? (
          <View>
            <FlatList
              data={EmployeeAttendenceData}
              contentContainerStyle={{
                paddingBottom: height(10),
                marginVertical: height(1),
              }}
              showsVerticalScrollIndicator={false}
              keyExtractor={(i, n) => n}
              renderItem={renderEmployeeList}
            />
          </View>
        ) : (
          <>
            <ProfileDetail name={stringify?.fullname} onPress={()=>{
               successModalRef.current.show();
            }}  />
            <TextInputSimple
              mainContainerStyle={{ marginTop: height(1) }}
              prefixIcon={<SvgIcon.Database />}
              innerRow={{ width: width(85) }}
              label={"Office Location "}
              placeholder={"Choose Your Office Location "}
              editable={false}
              textValue={office}
              onPress={() => {
                bottomSheetRef.current.open();
              }}
              Icon={<SvgIcon.DownArrow />}
              // ref={dataBaseRef}
            />
            <View style={{ alignItems: "center", marginVertical: height(3) }}>
              <SmallText
                color={AppColors?.primary}
                size={5}
                fontFamily={FontFamily?.montserrat_Bold}
              >
                {/* {
                   new Date().toLocaleString("en-US",{timeStyle:"medium",timeZone:"Asia/Pakistan"})
              } */}
                {dayjs(currentTime)?.format("h:mm A")}
                {/* {dayjs()?.format("h:mm:ss A")} */}
              </SmallText>
              <SmallText size={4}>
                {dayjs()?.format("ddd, MMMM YYYY")}
              </SmallText>
              {/* <Text>
            {distancee <= radiusInMeters ? "azharr sai" : "waqaq galat"}
          </Text> */}
            </View>
            <Pressable
              onPress={() =>{
                if (
                  distancee <= radiusInMeters &&
                  markAttendence === "CheckIn"
                ){
                  markAttdence();
                }
                else if (distancee <= radiusInMeters &&
                  markAttendence === "CheckOut"){
                    confirmationModal.current.show();
                  }
                
                
                
                }}
              style={{
                marginVertical: height(1),
                borderRadius: width(100),
                backgroundColor: AppColors.lightGrey,
                width: width(40),
                height: width(40),
                alignItems: "center",
                justifyContent: "center",
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 5,
                },
                shadowOpacity: 0.36,
                shadowRadius: 6.68,

                elevation: 11,
              }}
            >
              <Image
                source={TapIcon}
                style={{
                  width: width(18),
                  height: width(18),
                  tintColor:
                    distancee <= radiusInMeters && markAttendence === "CheckIn"
                      ? "green"
                      : distancee <= radiusInMeters &&
                        markAttendence === "CheckOut"
                      ? AppColors.primary
                      : "#B0A4A4",
                  marginBottom: height(2),
                }}
                resizeMode="contain"
              />
              <SmallText
                fontFamily={FontFamily.montserrat_Bold}
                color={
                  distancee <= radiusInMeters && markAttendence === "CheckIn"
                    ? "green"
                    : distancee <= radiusInMeters &&
                      markAttendence === "CheckOut"
                    ? AppColors.primary
                    : "#B0A4A4"
                }
              >
                {markAttendence === "CheckIn" ? "Check-in" : "Check Out"}
              </SmallText>
            </Pressable>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MapSVG />
              <View style={{ flexDirection: "row", marginVertical: height(2) }}>
                <SmallText
                  color={AppColors.primary}
                  fontFamily={FontFamily.montserrat_Bold}
                >
                  Location:
                </SmallText>
                <SmallText>
                  {distancee <= radiusInMeters
                    ? "You are in Office reach"
                    : "You are not in Office reach"}
                </SmallText>
              </View>
            </View>
          </>
        )}
      </View>
      <BottomSheet ref={bottomSheetRef} bottomSheetHeight={height(60)}>
        <View
          style={{
            height: height(80),
            paddingHorizontal: width(3),
            // backgroundColor:"g"
            // paddingVertical: height(3),
          }}
        >
          <View style={{ paddingVertical: height(2), alignItems: "center" }}>
            <Text
              style={{
                color: AppColors.white,
                fontSize: width(5),
                fontFamily: FontFamily.montserrat_Bold,
              }}
            >
              Select Database
            </Text>
          </View>

          {/* <CheckList /> */}
          {/* <CheckList /> */}
          <FlatList
            data={OfficesLocationData}
            contentContainerStyle={{ paddingBottom: height(30) }}
            showsVerticalScrollIndicator={false}
            keyExtractor={(i, n) => n}
            renderItem={renderSelectedCountry}
          />
        </View>
      </BottomSheet>
      <SuccessModal
        // yesBtnName="Logout"
        ref={successModalRef}

        // onNoPress={() => confirmationModal.current.hide()}
        // onYesPress={() => {
        //   dispatch(setAppLoader(true));
        //   setTimeout(() => {
        //     dispatch(setUserMeta(null));
        //     AsyncStorage.clear();
        //     dispatch(setIsLoggedIn(false));
        //     dispatch(setAppLoader(false));
        //   }, 600);
        //   confirmationModal.current.hide();
        // }}
      />
      <ConfirmationModal
        yesBtnName="Yes"
        ref={confirmationModal}
        text={`Are you sure to Checkout?`}
        onNoPress={() => confirmationModal.current.hide()}
        onYesPress={() => {
          if (distancee <= radiusInMeters &&
            markAttendence === "CheckOut"){
              confirmationModal.current.hide()
              setTimeout(() => {
                markAttdenceCheckOut();
              }, 800);
             
            }
          
          // markAttdence();
          // dispatch(setAppLoader(true))
          // setAttendence("CheckIn");
          // // await AsyncStorage.setItem(
          // //   "attendnceStatus",
          // //   JSON.stringify(markAttendence)
          // // );
          // confirmationModal.current.hide();
          // CheckModelRef.current.show();
          // setTimeout(() => {
          //   CheckModelRef.current.hide();
          //   setOffice("");
          //   setOfficeLocation("");
          //   setSelectedItem("");
          //   navigation.goBack();
          //   // navigation.navigate(ScreenNames.HOME);
          // }, 2000);
        }}
      />
      <SuccessModal
        text="Good Bye!"
        description="You are Successfully Checked out"
        ref={CheckModelRef}
      />
    </ScreenWrapper>
  );
}
