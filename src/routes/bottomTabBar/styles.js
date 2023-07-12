import { StyleSheet } from "react-native";
import { Platform } from "react-native";
import { FontFamily } from "~assets/fonts";
import AppColors from "~utills/AppColors";
import { height, width } from "~utills/Dimension";

const styles = StyleSheet.create({
  tab: {
  
    // width: width(90),

    height: Platform.OS == "ios" ? height(11) : height(9),
    //  borderTopWidth: 5,
    // `borderTopColor: AppColors.primary,
    paddingBottom: Platform.OS == "ios" ? height(3) : height(0.3),
    position: "absolute",
    // borderWidth: width(1),
    borderEndWidth:width(1),
    borderEndColor:AppColors.primary,
    borderStartWidth:width(1),
    borderStartColor:AppColors.primary,
    
    // borderRadius: width(2),
    borderTopLeftRadius: width(5),
    borderTopWidth:0.3,
    borderTopColor:AppColors.primary,
    borderTopRightRadius: width(5),
    backgroundColor: AppColors.grey4,
    shadowColor: AppColors.primary,
    shadowOffset: {
      width: 0,
      height: 7,
    },
    // borderTopEndRadius:width(3),
    // border
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
