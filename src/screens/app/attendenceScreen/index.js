import React, { useState, useEffect } from "react";
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
  HomeHeader,
  LeadsOppComponent,
  PageHeader,
  ProfileDetail,
  ScreenWrapper,
} from "~components";

import { selectUserMeta, setIsLoggedIn, setUserMeta } from "~redux/slices/user";
import styles from "./styles";
import dayjs from "dayjs";
import CommonStyles from "~utills/CommonStyles";
import { height, width } from "~utills/Dimension";
import SearchField from "~components/searchField";
import ScreenNames from "~routes/routes";
import { AllLeadsData } from "~utills/DummyData";
import { log } from "react-native-reanimated";
import AppColors from "~utills/AppColors";
import { SmallText } from "~components/texts";
import BottomTabBar from "~routes/bottomTabBar";
import { FontFamily } from "~assets/fonts";
import { TapIcon } from "~assets/images";
import MapSVG from "~assets/SVG/mapSvg";
import Geolocation from "@react-native-community/geolocation";

// import { PDFGenerator } from "~utills/Methods";
export default function AttendenceScreen({ navigation, route }) {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserMeta);
  const radiusInMeters = 1000;
  const [location, setLocation] = useState(null);
  const [dt, setDt] = useState(new Date().toLocaleString());
  const [distancee, setDistance] = useState(null);

  const [searchQuery, setSearchQuery] = useState(null);
  // console.log("====",searchQuery);
  const [loader, setLoader] = useState(false);
  // console.log("----", loader);
  const currentTime = dayjs().format("h:mm A");
  const getLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
      },
      (error) => {
        console.error(error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };
  useEffect(() => {
    let secTimerr = setInterval( () => {
      console.log("callllllll after 5 seconds");
      // setDt(new Date().toLocaleString())
    },5000)

    return () => clearInterval(secTimerr);
}, []);
  useEffect(() => {
   
      getLocation()
    
   
  },[]);
  
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
    const otherUserLat = location?.latitude; // Other user's latitude
    const otherUserLon = location?.longitude; // Other user's longitude

    const distance = calculateHaversineDistance(
      myLat,
      myLon,
      otherUserLat,
      otherUserLon
    );
    setDistance(distance);
  }, [location != null]);
  useEffect(() => {
    let secTimer = setInterval( () => {
    
      setDt(new Date().toLocaleString())
    },5000)

    return () => clearInterval(secTimer);
}, []);
  // Your radius in meters

  // if (distancee <= radiusInMeters) {
  //   console.log("The other user is within your radius.");
  // } else {
  //   console.log("The other user is outside your radius.");
  // }

  // console.log(distancee, "---------=====", location);

  return (
    <ScreenWrapper
      scrollEnabled
      headerUnScrollable={() => {
        return (
          <View>
            <PageHeader
              pageTitle="Attendance"
              onPressBack={() => navigation.goBack()}
            />
          </View>
        );
      }}
    >
      <View style={styles.mainViewContainer}>
        {/* <Text>ddd</Text> */}
        <ProfileDetail />
        <View style={{ alignItems: "center", marginVertical: height(3) }}>
          <SmallText
            color={AppColors.primary}
            size={5}
            fontFamily={FontFamily.montserrat_Bold}
          >
            {dayjs(dt).format("h:mm:ss A")}
          </SmallText>
          <SmallText size={4}>{dayjs().format("ddd, MMMM YYYY")}</SmallText>
          {/* <Text>
            {distancee <= radiusInMeters ? "azharr sai" : "waqaq galat"}
          </Text> */}
        </View>
        <Pressable
          style={{
            marginVertical: height(3),
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
              tintColor:distancee <= radiusInMeters ? "green" : "#B0A4A4",
              marginBottom: height(2),
            }}
            resizeMode="contain"
          />
          <SmallText
            fontFamily={FontFamily.montserrat_Bold}
            color={distancee <= radiusInMeters ? "green" : "#B0A4A4"}
          >
            Check-in
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
            <SmallText>{distancee <= radiusInMeters ?"You are in Office reach": "You are not in Office reach"}</SmallText>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
}
