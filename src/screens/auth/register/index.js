import React, { useEffect, useRef, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { Alert, FlatList, Pressable, Text, View } from "react-native";
import styles from "./styles";
import { useDispatch } from "react-redux";
import {
  BottomSheet,
  Button,
  CheckList,
  ScreenWrapper,
  TextField,
} from "~components";
import { setIsLoggedIn, setUserMeta } from "~redux/slices/user";
import { setAppLoader } from "~redux/slices/config";
import OpenEyeSVG from "~assets/SVG/openEyeSvg";
import { FontFamily } from "~assets/fonts";
import { height, width } from "~utills/Dimension";
import AppColors from "~utills/AppColors";
import ScreenNames from "~routes/routes";
import { Image } from "react-native";
import DeviceInfo from 'react-native-device-info';
import { BackIcon, Logo } from "~assets/images";
import { SmallText } from "~components/texts";
import SvgIcon from "~assets/SVG";
import { DatabaseCountries } from "~utills/DummyData";
import CommonStyles from "~utills/CommonStyles";
import TextInputSimple from "~components/textInputSimple";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { erroMessage } from "~utills/Methods";
export default function ResgisterScreen({ navigation, route }) {
  const dispatch = useDispatch();
  const emailRef = useRef(null);
  const titleRef = useRef(null);
  const sernameRef = useRef(null);
  const databaseuserRef = useRef(null);
  const databasenameRef= useRef(null);
  const bottomSheetRef = useRef(null);
  const passwordRef = useRef(null);
  const dataBaseRef = useRef(null);
  const confirmPassword=useRef(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [macAddress, setMacAddress] = useState(null);
  const [country, setCountry] = useState(false);
  const [dbName, setDbName] = useState("");
  const [arr, setArr] = useState([]);
  const [seletedItem, setSelectedItem] = useState("");
  const schema = Yup.object().shape({
    tittle: Yup.string().required("User name is required"),
    // servername: Yup.string().required("User name is required"),
    // databaseuser: Yup.string().required("User name is required"),
    email: Yup.string().required("email is required"),
    password: Yup.string().required("Password is required"),
    confrmpassword: Yup.string().required("confirmed is required"),
    confrmpassword: Yup.string()
    .oneOf([Yup.ref('password'), null], `password not matched`)
    .required(`confirmed password is required`),

    // databasename: Yup.string().required("User name is required"),
  });
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "all",
    defaultValues: { tittle: "",email:"", password: "", confrmpassword: "",  },
    resolver: yupResolver(schema),
  });
  const _resgister = async (data) => {
   let getData= await AsyncStorage.getItem("userData");
   console.log("====",getData);
   if(getData===null){
    const arrayData = [data]
    await AsyncStorage.setItem("userData",JSON.stringify(arrayData));
   }else  {
    // await AsyncStorage.clear();

    const parseData = JSON.parse(getData);
    const arrayData = [...parseData,data];
    await AsyncStorage.setItem("userData",JSON.stringify(arrayData));
    navigation.navigate(ScreenNames.LOGIN)
   }
  };
  useEffect(() => {
    let deviceId = DeviceInfo.getDeviceId();
    console.log("deviceId=====ddddd",deviceId);
    // dispatch(setMacAddress(deviceId));
    setMacAddress(deviceId);

  }, []);
  const _register= async (data) => {
    console.log("data====",data);
    console.log("====dbname[[[",dbName);
   
       dispatch(setAppLoader(true));
    
      await axios
        .put(
          `http://192.168.0.220:8080/api/User/UpdateUser?password=${data?.password}&usercode=${data?.tittle?.toUpperCase()}&PhoneAddress=${macAddress}&Databasename=${dbName}`
        )
        .then((res) => { 
         console.log("res in register====",res);
         if(res?.error){
          dispatch(setAppLoader(false));
          erroMessage("Please connect VPN ")
          
         }else{
          dispatch(setAppLoader(false));
          Alert.alert("Responce",res, [
            // {
            //   text: 'Ask me later',
            //   onPress: () => console.log('Ask me later pressed'),
            // },
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'OK', onPress: () => navigation.navigate(ScreenNames.LOGIN)},
          ])
         }
        
            }
        ).catch((err) => {
          console.log("erroooooooooooorrrrrrrrr",err);
          erroMessage("Please connect VPN ")
        }
        )
    
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
            }, 1000);
          }}
          tittle={item.name}
        />
      </View>
    );
  };
  return (
    <ScreenWrapper scrollEnabled headerUnScrollable={()=>{
      return(
        <Pressable style={{marginLeft:width(4),marginTop:height(1.5)}} onPress={()=>{navigation.goBack()}}>
          <Image source={BackIcon} style={styles.backIconStyle} resizeMode="contain" />
        </Pressable>
      )
    }} >
      <View style={styles.mainViewContainer}>
        <View style={{ alignItems:"center",justifyContent:"center", marginBottom: height(4) }}>
          <Image source={Logo} style={styles.imageStyle} resizeMode="contain" />
          <SmallText
            fontFamily={FontFamily.montserrat_BoldItalic}
            color={AppColors.scndry}
          >
            create your account
          </SmallText>
        </View>

        {/* <View style={styles.whiteBox}> */}
        <TextField
          innerRow={{ width: width(85) }}
          numberOfLines={1}
          ref={emailRef}
          label={"E-Mail"}
          placeholder="Enter user e-mail"
          control={control}
          errorMsg={errors?.email}
          name="email"
          returnKeyType={"next"}
          onSubmitEditing={() => titleRef.current.focus()}
        />
        <TextField
          innerRow={{ width: width(85) }}
          numberOfLines={1}
          ref={titleRef}
          label={"User Name"}
          placeholder="Enter user name"
          control={control}
          errorMsg={errors?.tittle}
          name="tittle"
          returnKeyType={"next"}
          onSubmitEditing={() => passwordRef.current.focus()}
        />
         {/* <TextField
         ref={sernameRef}
          innerRow={{ width: width(85) }}
          numberOfLines={1}
          label={"Phone Number"}
          placeholder="Enter Phone Number"
          control={control}
          errorMsg={errors?.servername}
          name="servername"
          returnKeyType={"next"}
          onSubmitEditing={() => databaseuserRef.current.focus()}
        /> */}
         {/* <TextField
          innerRow={{ width: width(85) }}
          numberOfLines={1}
          ref={databaseuserRef}
          label={""}
          placeholder="Enter databaseuser"
          control={control}
          errorMsg={errors?.databaseuser}
          name="databaseuser"
          returnKeyType={"next"}
          onSubmitEditing={() => passwordRef.current.focus()}
        /> */}
         <TextField
         autoCapitalize={"none"}
          // prefixIcon={<SvgIcon.Password />}
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
          onSubmitEditing={() => confirmPassword.current.focus()}
          // onPressForgot={() => navigation.navigate(ScreenNames.FORGOTPASSWORD)}
          // showForgotPassword
          returnKeyType={"next"}
        />
        <TextField
          autoCapitalize={"none"}
          // prefixIcon={<SvgIcon.Password />}
          ref={confirmPassword}
          innerRow={{ width: width(85) }}
          label={"Confirm Password"}
          placeholder="Confirm your password"
          control={control}
          errorMsg={errors?.confrmpassword}
          name="confrmpassword"
          Icon={
            <OpenEyeSVG
              color={passwordVisible ? AppColors.primary : AppColors.darkGrey}
            />
          }
          secureTextEntry={!passwordVisible}
          onIconPress={() => setPasswordVisible(!passwordVisible)}
          returnKeyType={"done"}
          // onSubmitEditing={() => databasenameRef.current.focus()}
          // onPressForgot={() => navigation.navigate(ScreenNames.FORGOTPASSWORD)}
          // showForgotPassword
          // returnKeyType={"next"}
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
          title={"Create account"}
          onPress={handleSubmit(_register)}
          // onPress={()=>navigation.navigate(ScreenNames.LOGIN)}
        />
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
// You will first want to set an initial array:
// AsyncStorage.setItem("myNumbers", [1, 2, 3])

// // Now if we want to append other values to it.
// // It's important to enclose it in bracket (otherwise you'd get an error trying to modify an object)

// const arr = [await AsyncStorage.getItem("myNumbers")]
// arr.push(15)
// AsyncStorage.setItem('myNumbers', arr)
// If you'd like to get the final result:

// const modified = await AsyncStorage.getItem("myNumbers")
// console.log(modified) //gives us 1, 2, 3, 15