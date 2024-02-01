import { StyleSheet } from "react-native";
import { height, width } from "~utills/Dimension";
import AppColors from "../../../utills/AppColors";

const styles = StyleSheet.create({
  mainViewContainer: {
    flex: 1,
    backgroundColor: AppColors.white,
    justifyContent: "center",
    alignItems: "center",
  },
  mainText:{
    // backgroundColor:"red",
    textAlign:"center",
     width: width(75),

  },
  desText: {
    width: width(90),
    textAlign: "center",
    marginVertical: height(2),
  },
  imageStyle: {
    width: width(70),
    height: width(70),
    // backgroundColor: "red",
  },
  title: {
    color: AppColors.black,
    fontWeight: "bold",
    fontSize: width(4),
    marginBottom: height(2),
  },
  btnStyle: {
    marginVertical: height(2),
  },
});
export default styles;
