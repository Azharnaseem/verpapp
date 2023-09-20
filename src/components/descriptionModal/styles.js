import { StyleSheet } from "react-native";
import { withSafeAreaInsets } from "react-native-safe-area-context";
import AppColors from "~utills/AppColors";
import { height, width } from "~utills/Dimension";

const styles = StyleSheet.create({
  modalStyle: {
    alignSelf:"center",
    alignItems:"center",
    justifyContent:"center",
    width: width(90),
    backgroundColor: AppColors.white,
    paddingTop: height(3.69),
    paddingBottom: height(5),
    borderRadius:width(5),
    // paddingHorizontal:width(22)
  },
  textView: {
    width: "90%",
    marginBottom: height(1),
    // marginHorizontal:width(23),
    // backgroundColor:"red"
  },
  subTextView: {
    marginBottom: height(3),
    width: width(80),
  },
  row: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: height(3),
  },
  btn: {
    width: width(35),
    height: height(7),
    borderRadius: width(3.5),
    backgroundColor: AppColors.red,
  },
  btnText: {
    // backgroundColor: "red",
    color: AppColors.white,
  },
});
export default styles;
