import { StyleSheet } from "react-native";
import AppColors from "~utills/AppColors";
import { height, width } from "~utills/Dimension";

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: AppColors.green,
    // width: width(80),
  },
  DrawerItem: {
    alignItems: "center",
  },
  imageBorder: {
    justifyContent: "center",
    alignItems: "center",
    height: height(8),
    width: height(8),
    borderRadius: height(7),
    borderWidth: width(0.5),
    borderColor: AppColors.black,
    marginHorizontal: width(2),
    padding: width(8),
    // backgroundColor: AppColors.secndry,
  },
  ProfileInfoContainer: {
    flexDirection: "row",
    marginTop: height(5),
  },
  profileName: {
    color: AppColors.white,
    // fontFamily: FontFamily.inter_Regular,
    fontSize: width(4),
    marginVertical: height(1.5),
  },
  profilePhoneNumber: {
    color: AppColors.white,
    fontSize: width(3),
  },
  drawerButton: {
    width: width(60),
    borderRadius: height(3),
    marginVertical: height(3),
    height: height(6),
  },
  sideMenuProfileIcon: {
    //backgroundColor: '#f4511e',
    resizeMode: "contain",
    width: height(10),
    height: height(10),
    borderRadius: height(10),
    marginHorizontal: width(5),
  },

  dawerLabel: {
    // backgroundColor: "pink",
    color: AppColors.white,
    fontSize: width(3.5),
    marginLeft: width(1.5),
  },

  DrawerBtmText: {
    textAlign: "center",
    lineHeight: height(3),
    marginVertical: height(6),
    color: AppColors.black,
    fontSize: width(3),
  },
});
export default styles;
