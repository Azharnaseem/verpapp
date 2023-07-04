import { StyleSheet } from 'react-native';
import { height, width } from '~utills/Dimension';
import AppColors from '../../../utills/AppColors';

const styles = StyleSheet.create({
  mainViewContainer: {
    flex: 1,
    //  backgroundColor: "green",
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnStyle:{
    width:"70%",
    marginVertical:height(1),

  },
  title: {
    color: AppColors.black,
    fontWeight: 'bold',
    fontSize: width(4),
    marginBottom: height(2)
  },
  pdf:{
    paddingVertical:height(2),
    backgroundColor:AppColors.grey,
    height:height(80),
    width:width(100),
     
  }
});
export default styles;
