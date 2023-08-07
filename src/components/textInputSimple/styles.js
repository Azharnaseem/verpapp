import { Platform, StyleSheet } from "react-native";
import { FontFamily } from "~assets/fonts";
import { height, width } from "~utills/Dimension";
import AppColors from "../../utills/AppColors";
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "flex-start",
  },
  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: width(75),
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: width(90),
    backgroundColor: AppColors.white,
    borderRadius: width(2),
    borderWidth: 2,
    borderColor: AppColors.primary,
    paddingHorizontal: width(2.2),
    height: height(7),
  },
  prefixIcon: {
    width: width(10),
    height: width(10),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: width(5),
  },
  iconStyle: {
    marginRight: width(2),
  },
  inputText: {
    color: AppColors.textColor,
    alignItems:"center",
    justifyContent:"center",
    fontFamily: FontFamily.montserrat_Regular,
    fontSize: width(3.5),
    height: Platform.OS === "android" ? height(6) : height(5),
      // backgroundColor: AppColors.red,
    flex: 1,
    // borderRadius: width(4),
    paddingHorizontal: width(4),
    // borderTopWidth: 1,
    // borderBottomWidth: 1,
    // borderTopColor: AppColors.primary,
    // borderBottomColor: AppColors.primary,
  },
  error: {
    color: AppColors.red,
    fontSize: width(6),
  },
  errorText: {
    textAlign: "left",
    width: width(76),
    paddingLeft: width(2),
    lineHeight: width(3.5),
  },
});
export default styles;
