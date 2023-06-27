import { StyleSheet } from 'react-native';
import { height, width } from '~utills/Dimension';
import AppColors from '../../../utills/AppColors';

const styles = StyleSheet.create({
  mainViewContainer: {
    flex: 1,
    // backgroundColor: "green",
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnStyle:{
    width:"45%",
    marginVertical:height(2),

  },
  title: {
    color: AppColors.black,
    fontWeight: 'bold',
    fontSize: width(4),
    marginBottom: height(2)
  },
  pdf:{

    backgroundColor:AppColors.white,
    height:height(70),
    width:width(100)
  }
});
export default styles;
