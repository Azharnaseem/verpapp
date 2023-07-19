import { StyleSheet } from 'react-native';
import { height, width } from '~utills/Dimension';
import AppColors from '../../../utills/AppColors';

const styles = StyleSheet.create({
  mainViewContainer: {
    flex: 1,
    // backgroundColor: AppColors.white,
    justifyContent: 'center',
    alignItems: 'center'
  },
  contractBoxStyle: {
    marginVertical:height(3),
    alignItems: "center",
    justifyContent: "center",
    width: width(70),
    backgroundColor: AppColors.grey2,
    height: width(50),
    borderRadius: width(3),
    marginBottom: 33,
    shadowColor: AppColors.primary,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,

    elevation: 13,
  },
  imageStyle: {
    // backgroundColor:"red",
    width: width(25),
    height: width(25),
    marginBottom:height(2),
    tintColor: AppColors.primary
    
  },
  title: {
    color: AppColors.primary,
    fontWeight: 'bold',
    fontSize: width(4),
    marginBottom: height(2)
  }
});
export default styles;
