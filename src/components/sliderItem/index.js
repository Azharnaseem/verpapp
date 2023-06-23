import React,{useEffect} from "react";
import { Dimensions, Image } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

const SliderItem = ({
  image,index,currentIndex
}) => {
const animation=useSharedValue(0);
  useEffect(()=>{
    animation.value=currentIndex;
 },[currentIndex]);
 const animatedStyle=useAnimatedStyle(()=>{
  return{
    transform:[{scale:animation.value==index?withSpring(1):withSpring(0.5)}]
  }
 });
 console.log("======",image);
  return (
    <Animated.View style={[
      { alignSelf:"center", width:Dimensions.get('window').width-40,height:Dimensions.get('window').height,alignItems:"center",justifyContent:"center"},animatedStyle]}>
     <Image source={image} style={{width:"70%",height:"70%"}} resizeMode="contain"  />
    </Animated.View>
  );
};

export default SliderItem;
