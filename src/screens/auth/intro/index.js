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
export default function IntroScreen({ navigation, route }) {
  return (
    <ScreenWrapper>
      <View style={styles.mainViewContainer}>
        <View style={{ alignItems: "center", marginBottom: height(5) }}>
          <Image source={Logo} style={styles.imageStyle} resizeMode="contain" />
          <SmallText
            size={5}
            fontFamily={FontFamily.montserrat_BoldItalic}
            color={AppColors.scndry}
          >
            Welcome to Valueable ERP
          </SmallText>
          <SmallText
            size={4}
            fontFamily={FontFamily.montserrat_Regular}
            color={AppColors.scndry}
            textStyles={styles.desText}
          >
            Welcome as you learn a world changing skill to get a better job.
          </SmallText>
        </View>

        <Button
          fontFamily={FontFamily.montserrat_Bold}
          containerStyle={styles.btnStyle}
          title={"Get Started"}
          onPress={() => navigation.navigate(ScreenNames.LOGIN)}
        />
      </View>
    </ScreenWrapper>
  );
}
