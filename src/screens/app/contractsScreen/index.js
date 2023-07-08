import React, { useState } from "react";
import { View, Text,Image, FlatList, Linking } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Button, ContractTicketBox, HomeHeader, LeadOpprtunityInfoDetail, LeadsOppComponent, PageHeader, ScreenWrapper } from "~components";

import { selectUserMeta, setIsLoggedIn, setUserMeta } from "~redux/slices/user";
import styles from "./styles";

import CommonStyles from "~utills/CommonStyles";
import { height, width } from "~utills/Dimension";
import SearchField from "~components/searchField";
import ScreenNames from "~routes/routes";



// import { PDFGenerator } from "~utills/Methods";
export default function ContractScreen({ navigation, route }) {
  const routsData=route.params;
  console.log("==2222222==",routsData);
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserMeta);
  const makePhoneCall = () => {
    const phoneNumber = '+923407685573'; // Replace with the desired phone number
  
    Linking.openURL(`tel:${phoneNumber}`)
      .catch(error => console.log('Error making phone call:', error));
  };
 
  
  const RenderContractInfo = ({ item, index }) => {
    return (
      <View style={{ marginVertical: width(1) }}>
         <ContractTicketBox phoneNumber="+923407685573"
          // onPressPhoneNo={makePhoneCall} 
          // onPressEmail={() => Linking.openURL('mailto:support@example.com') } 
          // onPressPdf={()=>navigation.navigate(ScreenNames.PDFREPORTSCREEN)}
          />
      </View>
    );
  };

  return (
    <ScreenWrapper  headerUnScrollable={()=>{
      return(
        <View>
          <PageHeader pageTitle={"Contracts"} onPressBack={()=>navigation.goBack()}/>
          {/* <SearchField onPressBar={()=>navigation.navigate(ScreenNames.SEARCHSCREEN)} editable={false} placeholder={"Search Leads"} containerStyle={{marginVertical:height(1)}} /> */}
        </View>
      )
    }}>
      <View style={styles.mainViewContainer}>
        <View style={{marginVertical:height(1)}} >
         
        <FlatList
          data={["1", "2", "3", "5","6","7","8","9"]}
          keyExtractor={(i, n) => n}
          renderItem={RenderContractInfo}
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
