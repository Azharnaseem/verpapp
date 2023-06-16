import React, { useRef, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { FlatList, Text, View } from "react-native";
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
import { Logo } from "~assets/images";
import { SmallText } from "~components/texts";
import SvgIcon from "~assets/SVG";
import { DatabaseCountries } from "~utills/DummyData";
import CommonStyles from "~utills/CommonStyles";
import TextInputSimple from "~components/textInputSimple";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function ResgisterScreen({ navigation, route }) {
  const dispatch = useDispatch();
  const titleRef = useRef(null);
  const sernameRef = useRef(null);
  const databaseuserRef = useRef(null);
  const databasenameRef= useRef(null);
  const bottomSheetRef = useRef(null);
  const passwordRef = useRef(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [country, setCountry] = useState(false);
  const [arr, setArr] = useState([]);
  const [seletedItem, setSelectedItem] = useState("");
  const schema = Yup.object().shape({
    tittle: Yup.string().required("User name is required"),
    servername: Yup.string().required("User name is required"),
    databaseuser: Yup.string().required("User name is required"),
    password: Yup.string().required("Password is required"),
    databasename: Yup.string().required("User name is required"),
  });
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "all",
    defaultValues: { tittle: "", servername: "",databaseuser: "", password: "", databasename: "",  },
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
  const renderSelectedCountry = ({ item, index }) => {
    return (
      <View>
        <CheckList
          containerViewStyle={CommonStyles.marginBottom_1}
          selected={seletedItem === index}
          onPress={() => {
            setSelectedItem(index);
            setCountry(item.name);
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
    <ScreenWrapper scrollEnabled >
      <View style={styles.mainViewContainer}>
        <View style={{ alignItems:"center",justifyContent:"center", marginBottom: height(5) }}>
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
          ref={titleRef}
          label={"Tittle"}
          placeholder="Enter tittle"
          control={control}
          errorMsg={errors?.tittle}
          name="tittle"
          returnKeyType={"next"}
          onSubmitEditing={() => sernameRef.current.focus()}
        />
         <TextField
         ref={sernameRef}
          innerRow={{ width: width(85) }}
          numberOfLines={1}
          label={"servername"}
          placeholder="Enter tittle"
          control={control}
          errorMsg={errors?.servername}
          name="servername"
          returnKeyType={"next"}
          onSubmitEditing={() => databaseuserRef.current.focus()}
        />
         <TextField
          innerRow={{ width: width(85) }}
          numberOfLines={1}
          ref={databaseuserRef}
          label={"databaseuser"}
          placeholder="Enter databaseuser"
          control={control}
          errorMsg={errors?.databaseuser}
          name="databaseuser"
          returnKeyType={"next"}
          onSubmitEditing={() => passwordRef.current.focus()}
        />
        <TextField
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
          onSubmitEditing={() => databasenameRef.current.focus()}
          // onPressForgot={() => navigation.navigate(ScreenNames.FORGOTPASSWORD)}
          // showForgotPassword
          returnKeyType={"next"}
        />
         <TextField
          innerRow={{ width: width(85) }}
          numberOfLines={1}
          ref={databasenameRef}
          label={"Database Name"}
          placeholder="Enter database name"
          control={control}
          errorMsg={errors?.databasename}
          name="databasename"
          returnKeyType={"done"}
         
        />
        
        <Button
          fontFamily={FontFamily.montserrat_Bold}
          containerStyle={styles.btnStyle}
          // buttonIcon={<LoginSVG />}
          title={"Create account"}
          onPress={handleSubmit(_resgister)}
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