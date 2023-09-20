import { StyleSheet } from 'react-native';
import { height, width } from '~utills/Dimension';
import AppColors from '../../../utills/AppColors';

const styles = StyleSheet.create({
  mainViewContainer: {
    // flex: 1,
    backgroundColor: AppColors.white,
    // justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
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
    paddingRight:width(4),

    // height: height(20),
    // backgroundColor: "red",
  },
  // newww
  contractBoxStyle: {
    marginVertical:height(0),
    alignItems: "center",
    justifyContent: "center",
    width: width(70),
    backgroundColor: AppColors.grey2,
    height: width(30),
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
    width: width(15),
    height: width(15),
    marginBottom:height(2),
    tintColor:AppColors?.primary
  },
});
export default styles;
