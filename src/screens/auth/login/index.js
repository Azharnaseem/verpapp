import React, { useRef, useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { Alert, FlatList, Pressable, Text, View } from "react-native";
import styles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import {
  BottomSheet,
  Button,
  CheckList,
  ScreenWrapper,
  TextField,
} from "~components";
import { setIsLoggedIn, setMacAddress, setUserMeta } from "~redux/slices/user";
import { selectLoader, setAppLoader } from "~redux/slices/config";
import OpenEyeSVG from "~assets/SVG/openEyeSvg";
import { FontFamily } from "~assets/fonts";
import { height, width } from "~utills/Dimension";
import AppColors from "~utills/AppColors";
import ScreenNames from "~routes/routes";
import { Image } from "react-native";
import { Logo } from "~assets/images";
import { SmallText } from "~components/texts";
import SvgIcon from "~assets/SVG";
import { DatabaseCountries } from "~utills/DummyData";
import CommonStyles from "~utills/CommonStyles";
import TextInputSimple from "~components/textInputSimple";
import { erroMessage, successMessage } from "~utills/Methods";
import { ApiManager } from "~backend/ApiManager";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { log } from "react-native-reanimated";
import DeviceInfo from 'react-native-device-info';


import Geolocation from "@react-native-community/geolocation";
import axios from "axios";
export default function Login({ navigation, route }) {
  const dispatch = useDispatch();
  const passwordRef = useRef(null);
  const bottomSheetRef = useRef(null);
  const dataBaseRef = useRef(null);
  const [macAddress, setMacAddress] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [country, setCountry] = useState(false);
  const [dbName, setDbName] = useState("");
  const [location, setLocation] = useState(null);
  const Loader= useSelector(selectLoader)
   console.log("item---------", Loader);
  const [seletedItem, setSelectedItem] = useState("");
  // const macAddress = useSelector(setMacAddress);
  // console.log("==============2222222===",macAddress);
  const schema = Yup.object().shape({
    username: Yup.string().required("User name is required"),
    password: Yup.string().required("Password is required"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "all",
    defaultValues: { username: "", password: "" },
    // defaultValues: { email: 'tiffany@myhairdays.com', password: 'Davis1986' },
    // defaultValues: { email: 'test@test.com', password: 'test@123' },
    resolver: yupResolver(schema),
  });
  // const getLocation = () => {
  //   Geolocation.getCurrentPosition(
  //     (position) => {
  //       const { latitude, longitude } = position.coords;
  //       setLocation({ latitude, longitude });
  //     },
  //     (error) => {
  //       console.error(error);
  //     },
  //     { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
  //   );
  // };
  // useEffect(() => {
  //   getLocation();
  // }, []);
  // console.log("loggg location", location);
  useEffect(() => {
    let deviceId = DeviceInfo.getDeviceId();
    console.log("deviceId=====ddddd3333333333333333",deviceId);
    // dispatch(setMacAddress(deviceId));
    setMacAddress(deviceId);

  }, []);
  const _login = async (data) => {
    // console.log("======","calllllll");
    // try {
      // let userName=data?.username
      dispatch(setAppLoader(true));
     
    // if(!Loader){
    //    setTimeout(() => {
    //     erroMessage("Please conrnect VPN");
    //     // Alert.alert("vpn issss");
    //     dispatch(setAppLoader(false));
    //   }, 4000);
    //   //  erroMessage("Please connect VPN");
    // }

      // const res = await ApiManager.get(
      //   `${data?.username.toUpperCase()}/${data?.password}/${dbName}`
      // )
      await axios
        .get(
          `http://192.168.0.220:8080/api/User/GetUser/${data?.username.toUpperCase()}/${
            data?.password
          }/${dbName}/${macAddress}`
        )
        .then(async (res) => {
          console.log(res,"===============222222222==", res?.error);
          if (res.error) {
            console.log("2222222222211111111111111");
            erroMessage("Please connect VPN");
            // Alert.alert("vpn issss");
            dispatch(setAppLoader(false));
          } else {
            console.log("resssssssssssssssssss11111111111111===>>>1", res);
            if (res?.data === null) {
              console.log("callllllllled ifff");
              erroMessage("Error", res?.messages);
              dispatch(setAppLoader(false));
            } else {
              console.log("elsssssssssssssssseeeeee callll4442");
              let {
                email,
                password,
                fullname,
                groupType,
                user_Code,
                user_ID,
                user_Name,
                employeeId,
              } = res?.data[0];
            

             
              // await AsyncStorage.setItem("userData", JSON.stringify(res?.data));

              let userDataa = {
                name: user_Name,
                email: email,
                password: password,
                fullname: fullname,
                userCode: user_Code,
                userId: user_ID,
                groupType: groupType,
                employeeId: employeeId,
                dbName: dbName,
                DataBaseName: country,
              };
              await AsyncStorage.setItem("userToken", JSON.stringify(user_ID));
              await AsyncStorage.setItem("userData", JSON.stringify(userDataa));
              dispatch(setUserMeta(JSON.stringify(userDataa)));
              // dispatch(setToken(user_ID));
              dispatch(setIsLoggedIn(true));
              dispatch(setAppLoader(false));  
              successMessage("Login Successfully");
              dispatch(setAppLoader(false));
            }
          // }
        // });
    // } catch (error) {
    //   dispatch(setAppLoader(false));
    //   erroMessage("Please connect Vpn");
    //   console.log("ssssssssssssssssssscallllllllllllllllllllllllllllllll3");
    // }
  }})

};
  const renderSelectedCountry = ({ item, index }) => {
    return (
      <View>
        <CheckList
          containerViewStyle={CommonStyles.marginBottom_1}
          selected={seletedItem === index}
          onPress={() => {
            setSelectedItem(index);
            setCountry(item.name);
            setDbName(item?.dbName);
            setTimeout(() => {
              bottomSheetRef.current.close();
            }, 10);
          }}
          tittle={item.name}
        />
      </View>
    );
  };
  return (
    <ScreenWrapper>
      <View style={styles.mainViewContainer}>
        <View style={{ marginBottom: height(5) }}>
          <Image source={Logo} style={styles.imageStyle} resizeMode="contain" />
          <SmallText
            fontFamily={FontFamily.montserrat_BoldItalic}
            color={AppColors.scndry}
          >
            Login to continue
          </SmallText>
        </View>

        {/* <View style={styles.whiteBox}> */}
        <TextField
          prefixIcon={<SvgIcon.User />}
          innerRow={{ width: width(85) }}
          numberOfLines={1}
          label={"User Name"}
          placeholder="Enter your user name"
          control={control}
          errorMsg={errors?.username}
          name="username"
          returnKeyType={"next"}
          onSubmitEditing={() => passwordRef.current.focus()}
        />
        <TextField
          autoCapitalize={"none"}
          // keyboardType={"numeric"}
          prefixIcon={<SvgIcon.Password />}
          ref={passwordRef}
          innerRow={{ width: width(85) }}
          label={"Password"}
          placeholder="Enter your password"
          control={control}
          errorMsg={errors?.password}
          name="password"
          Icon={
            <OpenEyeSVG
              color={passwordVisible ? AppColors.primary : AppColors.darkGrey}
            />
          }
          secureTextEntry={!passwordVisible}
          onIconPress={() => setPasswordVisible(!passwordVisible)}
          onSubmitEditing={() => dataBaseRef.current.focus()}
          // onPressForgot={() => navigation.navigate(ScreenNames.FORGOTPASSWORD)}
          // showForgotPassword
        />
        <TextInputSimple
          prefixIcon={<SvgIcon.Database />}
          innerRow={{ width: width(85) }}
          label={"Database"}
          placeholder={"Select database "}
          editable={false}
          textValue={country}
          onPress={() => {
            bottomSheetRef.current.open();
          }}
          Icon={<SvgIcon.DownArrow />}
          ref={dataBaseRef}
        />
        <Button
          fontFamily={FontFamily.montserrat_Bold}
          containerStyle={styles.btnStyle}
          // buttonIcon={<LoginSVG />}
          title={"Login"}
          // onPress={()=>{
          //   navigation.navigate(ScreenNames.REGISTERSCREEN)
          // }}
          onPress={handleSubmit(_login)}
        />
          <Pressable onPress={()=>navigation.navigate(ScreenNames.REGISTERSCREEN)}>
        <SmallText
          size={3.5}
          fontFamily={FontFamily.montserrat_Bold}
          
          // onPress={() => navigation.navigate(ScreenNames.REGISTERSCREEN)}
        >
          Dont't have an account!
          {/* <Text
            style={{
              color: AppColors.scndry,
              fontFamily: FontFamily.montserrat_SemiBoldItalic,
            }}
          >
            Register
          </Text> */}
        

          
          <Text
            style={{
              fontSize:width(4),
              color: AppColors.primary,
              fontFamily: FontFamily.montserrat_SemiBoldItalic,
            }}
          >
            { ` Register`}
          </Text>
        
        </SmallText>
        </Pressable>
        {/* <View style={styles.row}>
            <HorizontalLine customWidth="30%" />
            <SmallText color={AppColors.darkGrey}>Or login use</SmallText>
            <HorizontalLine customWidth="30%" />
          </View>
          <View style={styles.socialRow}>
            <SocialBtn icon={<FbSVG />} />
            <SocialBtn icon={<GoogleSVG />} />
          </View>
          <View style={styles.row}>
            <SmallText color={AppColors.grey1}>
              Don't have an account yet?
            </SmallText>
            <SmallText
              color={AppColors.primary}
              fontFamily={FontFamily.montserrat_Bold}
              onPress={() => navigation.pop()}
            >
              Register
            </SmallText>
          </View> */}
        {/* </View> */}
        {/* <Button
          title={"Login"}
          onPress={() => {
            dispatch(setAppLoader(true));
            setTimeout(() => {
              dispatch(setIsLoggedIn(true));
              dispatch(
                setUserMeta({
                  name: "John",
                  email: "John Doe",
                })
              );
              dispatch(setAppLoader(false));
            }, 600);
          }}
        /> */}
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
            data={DatabaseCountries}
            contentContainerStyle={{ paddingBottom: height(30) }}
            showsVerticalScrollIndicator={false}
            keyExtractor={(i, n) => n}
            renderItem={renderSelectedCountry}
          />
        </View>
      </BottomSheet>
    </ScreenWrapper>
  );
            }
