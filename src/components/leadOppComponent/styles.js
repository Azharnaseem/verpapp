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
    backgroundColor: AppColors.scndry+"10",
    borderRadius: width(2),
    borderWidth:1.5,
    borderColor:AppColors.primary,
  
    // marginVertical: width(1),
    
  },
  nameText:{
    fontSize:width(3.5),
    fontFamily:FontFamily.montserrat_SemiBold,
    color:AppColors.scndry,
    // backgroundColor:"green",
   
    marginVertical:1
    
  },
  valueName:{
    // backgroundColor:'red',
    fontSize:width(3.2),
    color:AppColors.greyText2


  }
 
});
export default styles;
