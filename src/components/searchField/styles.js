import { StyleSheet } from "react-native";
import { FontFamily } from "~assets/fonts";
import { height, width } from "~utills/Dimension";
import AppColors from "../../utills/AppColors";
const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: AppColors.primary,
    borderWidth: 1.5,
    width: width(94),
    height: height(7),
    backgroundColor: AppColors.white,
    borderRadius: width(3),
    paddingRight: width(2),
    alignSelf: "center",
  },
  searchIcon: {
    paddingLeft: width(6),
    padding: width(2.2),
  },
  closeIcon: {
    padding: width(2.8),
  },
  searchInput: {
    fontSize: width(3.8),
    color: AppColors.textColor,
    fontFamily: FontFamily.montserrat_Regular,
    flex: 1,
  },
});
export default styles;
