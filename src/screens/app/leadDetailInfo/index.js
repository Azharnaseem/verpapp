import React, { useState, useEffect } from "react";
import { View, Text, Image, FlatList, Linking } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  HomeHeader,
  LeadOpprtunityInfoDetail,
  LeadsOppComponent,
  PageHeader,
  ScreenWrapper,
} from "~components";

import { selectUserMeta, setIsLoggedIn, setUserMeta } from "~redux/slices/user";
import styles from "./styles";

import CommonStyles from "~utills/CommonStyles";
import { height, width } from "~utills/Dimension";
import SearchField from "~components/searchField";
import ScreenNames from "~routes/routes";
import axios from "axios";
import { setAppLoader } from "~redux/slices/config";

// import { PDFGenerator } from "~utills/Methods";
export default function LeadDetailInfo({ navigation, route }) {
  const routsData = route.params;
  console.log("==2222222==", routsData?.leadProfileId);
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserMeta);
  var stringify=JSON.parse(userInfo);
  const [leadInfoData, setLeadInfoData] = useState(null);
  const [showEmptyComponent, setShowEmptyComponent] = useState(false);
  const makePhoneCall = (mobile) => {
    // console.log("CALLLLLLLLLLLLLLLL",mobile);
    const phoneNumber = "+923407685573"; // Replace with the desired phone number

    Linking.openURL(`tel:${mobile}`).catch((error) =>
      console.log("Error making phone call:", error)
    );
  };
  const makeMail = (emailAddress) => {
   // Replace with the desired phone number

    Linking.openURL(`mailto:${emailAddress}`).catch((error) =>
      console.log("Error making email :", error)
    );
  };
  useEffect(() => {
    getLeadDataInfo();
  }, [userInfo]);
  const getLeadDataInfo = async () => {
    try {
      dispatch(setAppLoader(true));
      let res = await axios
        .get(
          `http://192.168.0.220:8080/api/Lead/GetLeadContact/GetLeadContact?Databasename=${stringify?.dbName}&LeadProfileId=${routsData?.leadProfileId}`
        )
        .catch((error) => {
          dispatch(setAppLoader(false));
          console.log("error11111 in list by main catagory", error);
        });
      // console.log("========..............api>>>>====", res);
      if (res != null) {

        setLeadInfoData(res);
        dispatch(setAppLoader(false));
      } else {
        console.log("data is nilllllll");
        dispatch(setAppLoader(false));
      }
    } catch (error) {
      console.log("error is  lear getting", error);
      dispatch(setAppLoader(false));
    }
  };
  useEffect(() => {
    // Delay the rendering of EmptyComponent by 800 milliseconds
    const timeout = setTimeout(() => {
      setShowEmptyComponent(true);
    }, 2000);

    // Clear the timeout to avoid unnecessary updates if the component unmounts
    return () => clearTimeout(timeout);
  }, []);
  
  const EmptyComponent = () => {
    
    return(
      <View>
      <Text>No Contact Found</Text>
    </View>
    )
   
    };
  const RenderLeadsInfo = ({ item, index }) => {
    console.log("=====bbbbbbbbbbb========",item);
    return (
      <View style={{ marginVertical: width(1) }}>
        <LeadOpprtunityInfoDetail
          item={item}
          // email={item?.email1?item?.email1:item?.email2}
          // phoneNumber={item?.phone}
          // department={item?.department}
          // country={item?.country}
          onPressPhoneNo={() => makePhoneCall(item?.phone)}
          onPressEmail={() => {
            makeMail(item?.email1)
          // console.log("sssssssssssssssssss clicked",item?.email1);
          //   Linking.openURL("azhar@gmail.com")
          }}
          // onPressPdf={() => navigation.navigate(ScreenNames.PDFREPORTSCREEN)}
        />
      </View>
    );
  };

  return (
    <ScreenWrapper
      headerUnScrollable={() => {
        return (
          <View>
            <PageHeader
              pageTitle={routsData?.name}
              onPressBack={() => navigation.goBack()}
            />
            {/* <SearchField onPressBar={()=>navigation.navigate(ScreenNames.SEARCHSCREEN)} editable={false} placeholder={"Search Leads"} containerStyle={{marginVertical:height(1)}} /> */}
          </View>
        );
      }}
    >
      <View style={styles.mainViewContainer}>
        <View style={{ marginVertical: height(1) }}>
          <FlatList
            data={leadInfoData}
            keyExtractor={(i, n) => n}
            renderItem={RenderLeadsInfo}
            loop
            // style={styles.flatlistFilterStyle}
            contentContainerStyle={[CommonStyles.marginBottom_5]}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              // setTimeout(() => {
                showEmptyComponent ? EmptyComponent : null
              // }, 800);
             
            }
          />
        </View>
      </View>
    </ScreenWrapper>
  );
}
