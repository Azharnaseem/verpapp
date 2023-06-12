import { Platform, StyleSheet } from "react-native";
import AppColors from "~utills/AppColors";
import { width } from "~utills/Dimension";
// import { width } from "../../utills/Dimension";
// import AppColors from "../../utills/AppColors";
// import AppColors from "~utills/AppColors";
// import { height, width } from "~utills/Dimension";
const styles = StyleSheet.create({
  mainContainer: {
    width: width(100),
    backgroundColor: AppColors.red,
  },
  container: {
    flex: 1,
    backgroundColor: AppColors.white,
  },
});
export default styles;
