import { StyleSheet } from "react-native";
import AppColors from "~utills/AppColors";
import { height, width } from "~utills/Dimension";
const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: "center",
    alignSelf: "center",
    padding: 0,
    margin: 0,
    elevation: 10,
    width: width(100),
  },
  shadow: {
    height: height(10),
    width: width(90),
    position: "absolute",
    top: -height(6),
    borderTopLeftRadius: width(4),
    borderTopRightRadius: width(4),
    elevation: 10,
  },
  modalInnerContainer: {
    backgroundColor: AppColors.white,
    // borderTopRightRadius: width(5.5),
    // borderTopLeftRadius: width(5.5),
    borderRadius:width(2),
    paddingVertical: height(1),
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
});
export default styles;
