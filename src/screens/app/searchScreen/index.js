import React, { useState } from "react";
import { View, Text,Image, FlatList, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Button, HomeHeader, LeadsOppComponent, PageHeader, ScreenWrapper } from "~components";

import { selectUserMeta, setIsLoggedIn, setUserMeta } from "~redux/slices/user";
import styles from "./styles";

import CommonStyles from "~utills/CommonStyles";
import { height, width } from "~utills/Dimension";
import SearchField from "~components/searchField";
import { AllLeadsData } from "~utills/DummyData";
import AppColors from "~utills/AppColors";



// import { PDFGenerator } from "~utills/Methods";
export default function SearchScreen({ navigation, route }) {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserMeta);
  const [searchQuery, setSearchQuery] = useState([]);
  const [loader, setLoader] = useState(false);
  const getData = async text => {
    setLoader(true);
    // console.log('----------------------------', text);
    try {
      setSearchQuery(AllLeadsData?.filter((i)=>i.companyName.toLowerCase().includes(text.toLowerCase())))
      // setSearchQuery(AllLeadsData);
      setLoader(false);
      // setSearchQuery(resp?.data?.result);
      // setLoader(false);
    } catch (error) {
      setLoader(false);
      console.log('error is ===', error);
    }
  };
  const searchMethod = async text => {
    if (text == '') {
      setSearchQuery([]);
    } else {
      clearTimeout(window.ChangeInterval);
      clearTimeout(window.CInterval);
      if (text.length > 1) {
        window.ChangeInterval = setTimeout(() => {
          getData(text);
        }, 1000);
      } else {
        window.CInterval = setTimeout(() => {
          clearTimeout(window.ChangeInterval);
          if (text.length > 0) {
            getData(text);
          }
        }, 800);
      }
    }
  };
 
  
  const RenderOppartunities = ({ item, index }) => {
    return (
      <View style={{ marginVertical: width(1) }}>
        <LeadsOppComponent companyName={item?.companyName} leadNo={item?.leadNo} type={item?.type}  leadOwner={item?.leadOwner}/>
      </View>
    );
  };

  return (
    <ScreenWrapper scrollEnabled headerUnScrollable={()=>{
      return(
        <View>
          <PageHeader pageTitle="Search" onPressBack={()=>navigation.goBack()}/>
          <SearchField onChangeText={searchMethod} placeholder={"Search Leads"} containerStyle={{marginVertical:height(1)}} />
        </View>
      )
    }}>
      <View style={styles.mainViewContainer}>
        <View style={{marginVertical:height(1)}} >
        {loader ? (
          <ActivityIndicator size={20} color={AppColors.primary} />
        ) : (
        <FlatList
          data={searchQuery}
          keyExtractor={(i, n) => n}
          renderItem={RenderOppartunities}
          loop
          // style={styles.flatlistFilterStyle}
          contentContainerStyle={[
            CommonStyles.marginBottom_5,
         
          ]}
          showsVerticalScrollIndicator={false}
        />)}
        </View>
        
        
      
        
       
    
      </View>
    </ScreenWrapper>
  );
}
