import { StyleSheet } from "react-native";
import { Platform } from "react-native";
import { FontFamily } from "~assets/fonts";
import AppColors from "~utills/AppColors";
import { height, width } from "~utills/Dimension";

const styles = StyleSheet.create({
  tab: {
    // width: width(90),

    height: Platform.OS == "ios" ? height(11) : height(9),
   borderTopWidth: 2,
    borderTopColor: AppColors.primary,
    paddingBottom: Platform.OS == "ios" ? height(3) : height(0.3),
    position: "absolute",
    // borderWidth: width(0.1),
    // borderRadius: width(2),
    // borderTopLeftRadius: width(5),
    // borderTopRightRadius: width(5),
    backgroundColor: AppColors.white,
    shadowColor: AppColors.primary,
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,

    elevation: 15,
  },
  tabContainer: {
    // backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    // borderBottomWidth: width(1),
  },
  plusIcon: {
    marginBottom: height(3.5),
    // backgroundColor:'red',
    alignItems: "center",
  },
  bottomTabIcon: {
    height: width(8),
    width: width(8),
    // marginBottom: height(2)
  },
  bottomTabPlusIcon: {
    height: width(15),
    width: width(15),
    // height: width(8),
    // width: width(8),
    marginBottom: height(0.8),
  },
  barTitle: {
    marginTop: -height(1),
    fontFamily: FontFamily.montserrat_SemiBold,
  },
});
export default styles;
