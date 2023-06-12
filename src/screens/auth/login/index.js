import React, { useRef, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { Text, View } from "react-native";
import styles from "./styles";
import { useDispatch } from "react-redux";
import { Button, ScreenWrapper, TextField } from "~components";
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
export default function Login({ navigation, route }) {
  const dispatch = useDispatch();
  const passwordRef = useRef(null);
  const dataBaseRef = useRef(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const schema = Yup.object().shape({
    username: Yup.string().required("User name is required"),
    password: Yup.string().required("Password is required"),
    database: Yup.string().required("Database is required"),
  });
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "all",
    defaultValues: { username: "", password: "", database: "" },
    // defaultValues: { email: 'tiffany@myhairdays.com', password: 'Davis1986' },
    // defaultValues: { email: 'test@test.com', password: 'test@123' },
    resolver: yupResolver(schema),
  });
  const _login = async (data) => {
    // let details = {
    //   email: data.email,
    //   password: data.password,
    // };
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
  };
  return (
    <ScreenWrapper>
      <View style={styles.mainViewContainer}>
        <View style={{ marginBottom: height(5) }}>
          <Image source={Logo} style={styles.imageStyle} resizeMode="contain" />
          <SmallText
            fontFamily={FontFamily.montserrat_Bold}
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
          placeholder="Enter your User Name"
          control={control}
          errorMsg={errors?.email}
          name="username"
          returnKeyType={"next"}
          onSubmitEditing={() => passwordRef.current.focus()}
        />
        <TextField
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
        <TextField
          prefixIcon={<SvgIcon.Database />}
          innerRow={{ width: width(85) }}
          label={"Database"}
          placeholder="Enter your Database "
          control={control}
          errorMsg={errors?.database}
          name="database"
          Icon={
            <SvgIcon.DownArrow />
            // <OpenEyeSVG
            //   color={passwordVisible ? AppColors.primary : AppColors.darkGrey}
            // />
          }
          // secureTextEntry={!passwordVisible}
          onIconPress={() => setPasswordVisible(!passwordVisible)}
          ref={dataBaseRef}
          // onPressForgot={() => navigation.navigate(ScreenNames.FORGOTPASSWORD)}
          // showForgotPassword
        />
        <Button
          fontFamily={FontFamily.montserrat_Bold}
          containerStyle={styles.btnStyle}
          // buttonIcon={<LoginSVG />}
          title={"Login"}
          onPress={handleSubmit(_login)}
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
    </ScreenWrapper>
  );
}
