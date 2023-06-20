import React, { useState } from "react";
import { View, Text,Image, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Button, HomeHeader, LeadsOppComponent, PageHeader, ScreenWrapper } from "~components";

import { selectUserMeta, setIsLoggedIn, setUserMeta } from "~redux/slices/user";
import styles from "./styles";

import CommonStyles from "~utills/CommonStyles";
import { height, width } from "~utills/Dimension";
import SearchField from "~components/searchField";



// import { PDFGenerator } from "~utills/Methods";
export default function AllOppartunaties({ navigation, route }) {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserMeta);
 
 
  
  const RenderOppartunities = ({ item, index }) => {
    return (
      <View style={{ marginVertical: width(1) }}>
        <LeadsOppComponent showLead={false} />
      </View>
    );
  };

  return (
    <ScreenWrapper scrollEnabled headerUnScrollable={()=>{
      return(
        <View>
          <PageHeader pageTitle={"All Oppartunity"} onPressBack={()=>navigation.goBack()}/>
          <SearchField placeholder={"Search Oppartunity"} containerStyle={{marginVertical:height(1)}} />
        </View>
      )
    }}>
      <View style={styles.mainViewContainer}>
        <View style={{marginVertical:height(1)}} >
        <FlatList
          data={["1", "2", "3", "5","6","7","8","9"]}
          keyExtractor={(i, n) => n}
          renderItem={RenderOppartunities}
          loop
          // style={styles.flatlistFilterStyle}
          contentContainerStyle={[
            CommonStyles.marginBottom_5,
         
          ]}
          showsVerticalScrollIndicator={false}
        />
        </View>
        
        
      
        
       
    
      </View>
    </ScreenWrapper>
  );
}
