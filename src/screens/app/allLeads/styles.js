import { StyleSheet } from 'react-native';
import { height, width } from '~utills/Dimension';
import AppColors from '../../../utills/AppColors';

const styles = StyleSheet.create({
  mainViewContainer: {
    flex: 1,
    backgroundColor: AppColors.white,
    // justifyContent: 'center',
    alignItems: 'center',
    height:height(100)
  },
  text:{
    color:AppColors.primary
   },
   containers: {
    // backgroundColor: AppColors.white,
    // width: width(50),
    // paddingVertical: height(3),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    // borderRadius: width(3),
    flexDirection: 'row',
},
  title: {
    color: AppColors.black,
    fontWeight: 'bold',
    fontSize: width(4),
    marginBottom: height(2)
  },
  flatlistFilterStyle: {
    paddingLeft: width(4),

    // height: height(20),
    // backgroundColor: "red",
  },
});
export default styles;
