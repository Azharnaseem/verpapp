import { StyleSheet } from 'react-native';
import { height, width } from '~utills/Dimension';
import AppColors from '../../../utills/AppColors';
import { FontFamily } from '~assets/fonts';

const styles = StyleSheet.create({
  mainViewContainer: {
    flex: 1,
    backgroundColor: AppColors.white,
    // justifyContent: 'center',
    alignItems: 'center'
  },
  imageContainer:{
    marginTop:height(1),
     width:width(20),
     height:width(20),
    borderRadius:width(100),
     backgroundColor:AppColors.lightGrey,
     justifyContent:'center',
     alignItems:'center',
     shadowColor: AppColors.primary,
shadowOffset: {
	width: 0,
	height: 9,
},
shadowOpacity: 0.48,
shadowRadius: 11.95,

elevation: 18,
  },
  imageStyle:{
           width:"50%",
           height:"50%",
  },
  headingTextStyle: {
    color: AppColors.scndry,
    fontWeight: 'bold',
    fontSize: width(4),
    marginVertical: height(1.5)
  },
  mainInfoContainer: {
    padding:8,
    borderWidth:1,
    borderColor:AppColors.primary,
    borderRadius:width(2),
    justifyContent: 'center',
    alignItems:'center',
  },
  priceTextStyle:{
    fontFamily:FontFamily.montserrat_Bold,
    color:AppColors.primary,
    marginBottom:height(1)
  }
});
export default styles;
