import { StyleSheet } from "react-native";
import { height, width } from "../../utills/Dimension";
import AppColors from "../../utills/AppColors";
import { FontFamily } from "~assets/fonts";
import { color } from "react-native-reanimated";

const styles = StyleSheet.create({
  container: {
    // alignSelf: "center",
    width: width(93),
    // height: height(10),
    paddingHorizontal: width(3),
    paddingVertical: height(2),
    backgroundColor: AppColors.scndry+"90",
    borderRadius: width(2),

    // marginVertical: width(1),
    
  },
  nameText:{
    fontSize:width(4),
    fontFamily:FontFamily.montserrat_SemiBold,
    color:AppColors.black,
  },
  valueName:{
    width:width(3),
    color:AppColors.graylight


  }
 
});
export default styles;
