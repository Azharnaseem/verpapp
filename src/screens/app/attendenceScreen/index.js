import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  ActivityIndicator,
  Pressable,
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
import { log } from "react-native-reanimated";
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

// import { PDFGenerator } from "~utills/Methods";
export default function AttendenceScreen({ navigation, route }) {
  const dispatch = useDispatch();
  const successModalRef = useRef();
  const CheckModelRef = useRef();
  const bottomSheetRef = useRef(null);
  const userInfo = useSelector(selectUserMeta);
  const [office, setOffice] = useState(false);
  const [seletedItem, setSelectedItem] = useState("");
  const [officeLocation, setOfficeLocation] = useState("");
  const radiusInMeters = 1000;
  const [location, setLocation] = useState(null);
  // console.log("location is ====",officeLocation);

  const [dt, setDt] = useState(new Date().toLocaleString());
  const [distancee, setDistance] = useState(null);
  const [markAttendence, setAttendence] = useState("CheckIn");

  const [searchQuery, setSearchQuery] = useState(null);
  // console.log("====",searchQuery);
  const [loader, setLoader] = useState(false);
  // console.log("----", loader);
  const currentTime = dayjs().format("h:mm A");
  const getLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        console.log("=====================", position?.coords);
        const { latitude, longitude } = position?.coords;
        setLocation({ latitude, longitude });
      },
      (error) => {
        console.error(error);
      },
      { enableHighAccuracy: true, timeout: 16000, maximumAge: 10000 }
    );
  };
  //   useEffect(() => {
  //     let secTimerr = setInterval( () => {
  //       console.log("callllllll after 5 seconds");
  //       // setDt(new Date().toLocaleString())
  //     },5000)

  //     return () => clearInterval(secTimerr);
  // }, []);
  useEffect(() => {
    getLocation();
  }, []);
  const renderSelectedCountry = ({ item, index }) => {
    return (
      <View>
        <CheckList
          containerViewStyle={CommonStyles.marginBottom_1}
          selected={seletedItem === index}
          onPress={() => {
            setSelectedItem(index);
            setOffice(item.name);
            setOfficeLocation(item?.location);
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
      <View style={{marginBottom:height(1)}}>
       <ProfileDetail name={item?.name} profession={item?.professional}  icon={<TickCheck color={item?.attendence=="Absent"?AppColors.red:AppColors.darkGreen}/>}/>
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
  useEffect(() => {
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
  let role = "admin";

  return (
    <ScreenWrapper
      scrollEnabled
      headerUnScrollable={() => {
        return (
          <View >
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
              contentContainerStyle={{ paddingBottom: height(10),marginVertical:height(1) }}
              showsVerticalScrollIndicator={false}
              keyExtractor={(i, n) => n}
              renderItem={renderEmployeeList}
            />
          </View>
        ) : (
          <>
          
            <ProfileDetail />
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
                {dayjs()?.format("h:mm:ss A")}
              </SmallText>
              <SmallText size={4}>
                {dayjs()?.format("ddd, MMMM YYYY")}
              </SmallText>
              {/* <Text>
            {distancee <= radiusInMeters ? "azharr sai" : "waqaq galat"}
          </Text> */}
            </View>
            <Pressable
              onPress={() => {
                if (
                  distancee <= radiusInMeters &&
                  markAttendence === "CheckIn"
                ) {
                  successModalRef.current.show();
                  setAttendence("CheckOut");

                  setTimeout(() => {
                    successModalRef.current.hide();
                    navigation.navigate(ScreenNames.HOME);
                  }, 2000);
                } else {
                  setAttendence("CheckIn");
                  CheckModelRef.current.show();

                  setTimeout(() => {
                    CheckModelRef.current.hide();
                    navigation.navigate(ScreenNames.HOME);
                  }, 2000);
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
      <SuccessModal
        text="Good Bye!"
        description="You are Successfully Checked out"
        ref={CheckModelRef}
      />
    </ScreenWrapper>
  );
}
