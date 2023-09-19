import { StyleSheet } from "react-native";
import AppColors from "~utills/AppColors";
import { height, width } from "~utills/Dimension";

// import { height, width } from "../../utills/Dimension";
// import AppColors from "../../utills/AppColors";

const styles = StyleSheet.create({
  container: {

    alignSelf: "center",
    width: width(85),
    paddingHorizontal: width(3),
    paddingVertical: height(1.2),
    flexDirection: "row",
    borderRadius: width(2),
    alignItems: "center",
    borderWidth: width(0.3),
    backgroundColor:AppColors.scndry,
    borderColor: AppColors.primary,

    // backgroundColor: AppColors.btnprimary + '20',
  },
  rightIcon: {
    width: width(6),

    // marginTop: height(2),
    // backgroundColor: 'green',
  },
  nameText: {
    color: AppColors.white,
    fontSize: width(4),
    fontWeight: "600",
    marginLeft: width(3),
  },
});
export default styles;
