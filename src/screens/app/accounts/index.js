import React, { useRef, useEffect, useState } from "react";
import { View, Text, FlatList, Image, Dimensions, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Button, PageHeader, ScreenWrapper, SliderItem } from "~components";
import { setAppLoader } from "~redux/slices/config";
import { selectUserMeta, setIsLoggedIn, setUserMeta } from "~redux/slices/user";
import styles from "./styles";
import { imagesData } from "~utills/DummyData";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import DrawerModal from "~components/drawerModal";
import { FontFamily } from "~assets/fonts";
import { InvoiceIcon, Tickets } from "~assets/images";
import AppColors from "~utills/AppColors";
import { SmallText } from "~components/texts";
import ScreenNames from "~routes/routes";



export default function Accounts({ navigation, route }) {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserMeta);
  const [currentIndex, setCurrentIndex] = useState(0);
  const drawerRef = useRef();
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
    <ScreenWrapper
    headerUnScrollable={() => {
      return (
        <View>
          <PageHeader
            pageTitle="Accounts"
            onPressBack={() => navigation.goBack()}
          />
        </View>
      );
    }}
    >
      <View style={styles.mainViewContainer}>
      <TouchableOpacity
          style={styles.contractBoxStyle}
          onPress={() => navigation.navigate(ScreenNames.INVOICESSCREEN)}
        >
          <Image
            source={InvoiceIcon}
            style={styles.imageStyle}
            resizeMode="contain"
          />
          <SmallText
            size={5}
            fontFamily={FontFamily.montserrat_Bold}
            color={AppColors.scndry}
          >
         Invoice Due/Not Due
          </SmallText>
        </TouchableOpacity>
        {/* <Text style={styles.title}>Accounts SCREEN</Text> */}
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
          title={"openDrawer"}
          onPress={() => {
            drawerRef?.current?.show();
          }}
          // onPress={() => {
          //   dispatch(setAppLoader(true));
          //   setTimeout(() => {
          //     dispatch(setUserMeta(null));
          //     dispatch(setIsLoggedIn(false));
          //     dispatch(setAppLoader(false));
          //   }, 600);
          // }}
        /> */}
      </View>
     <DrawerModal ref={drawerRef}  />
    </ScreenWrapper>
  );
}
