import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, Dimensions } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Button, ScreenWrapper, SliderItem } from "~components";
import { setAppLoader } from "~redux/slices/config";
import { selectUserMeta, setIsLoggedIn, setUserMeta } from "~redux/slices/user";
import styles from "./styles";
import { imagesData } from "~utills/DummyData";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
export default function Accounts({ navigation, route }) {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserMeta);
  const [currentIndex,setCurrentIndex]=useState(0)
//   const animation=useSharedValue(0);
//   useEffect(()=>{
//     animation.value=currentIndex;
//  },[currentIndex]);
 
// const  renderItem=(({item,index})=>{
//   const animatedStyle=useAnimatedStyle(()=>{
//     return{
//       transform:[{scale:animation.value==index?withSpring(1):withSpring(0.5)}]
//     }
//    })
//   return (
//     <Animated.View style={[
//       {width:Dimensions.get('window').width-40,height:Dimensions.get('window').height,alignItems:"center",justifyContent:"center"},animatedStyle]}>
//      <Image source={item?.image} style={{width:200,height:200}} resizeMode="contain"  />
//     </Animated.View>
//   );

// })

  
  return (
    <ScreenWrapper>
      <View style={styles.mainViewContainer}>
        <Text style={styles.title}>Accounts SCREEN</Text>
        {/* <FlatList
        pagingEnabled
        horizontal
         onScroll={(e)=>{
          const X=e.nativeEvent.contentOffset.x;
          // console.log("====",(X/Dimensions.get('window').width).toFixed(0));
          setCurrentIndex((X/Dimensions.get('window').width).toFixed(0))

         }}
          data={imagesData}
          keyExtractor={(i, n) => n}
          // renderItem={({item,index}) => {
          //   const animation=useSharedValue(0);
          //   useEffect(()=>{
          //      animation.value=currentIndex;
          //   },[currentIndex])
          //   const animatedStyle=useAnimatedStyle()
          //   return (
          //     <Animated.View style={{width:Dimensions.get('window').width-40,height:Dimensions.get('window').height,alignItems:"center",justifyContent:"center"}}>
          //      <Image source={item?.image} style={{width:200,height:200}} resizeMode="contain"  />
          //     </Animated.View>
          //   );
          // }}
          renderItem={({item,index})=>{
            return(
              
                <SliderItem image={item.image} index={index} currentIndex={currentIndex}  />
             
            )
          }}
          loop
          // style={styles.flatlistFilterStyle}
          // contentContainerStyle={[CommonStyles.marginBottom_5]}
          // showsVerticalScrollIndicator={false}
        /> */}

        {/* <Button
          title={"Logout"}
          onPress={() => {
            dispatch(setAppLoader(true));
            setTimeout(() => {
              dispatch(setUserMeta(null));
              dispatch(setIsLoggedIn(false));
              dispatch(setAppLoader(false));
            }, 600);
          }}
        /> */}
      </View>
    </ScreenWrapper>
  );
}
