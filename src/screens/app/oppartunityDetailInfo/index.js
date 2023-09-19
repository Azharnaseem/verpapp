import React, { useState,useRef, useEffect } from "react";
import { View, Text, Image, FlatList, Linking } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  DescriptionModal,
  HomeHeader,
  LeadOpprtunityInfoDetail,
  LeadsOppComponent,
  OppartunityDetail,
  PageHeader,
  ScreenWrapper,
  SupprtOppartunityDetail,
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
export default function OppartunityDetailInfo({ navigation, route }) {
  const routsData = route.params;
  const descriptionRef=useRef()
  console.log("==222222ssssssssssssssssssssss2==", routsData);
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserMeta);
  // console.log("----",userInfo?.dbName);
  const [oppInfoData, setOppInfoData] = useState(null);
  const [suprtOppInfoData, setSuprtOppInfoData] = useState(null);
  const [showEmptyComponent, setShowEmptyComponent] = useState(false);
  const makePhoneCall = (mobile) => {
    const phoneNumber = "+923407685573"; // Replace with the desired phone number

    Linking.openURL(`tel:${phoneNumber}`).catch((error) =>
      console.log("Error making phone call:", error)
    );
  };
  useEffect(() => {
    if(routsData?.opportunityType=="Hardware"){
      getHardOppDataInfo();
    }else{
      getSupportOppDataInfo();
    }
    
    //
  }, [userInfo]);
  const getHardOppDataInfo = async () => {
    try {
      dispatch(setAppLoader(true));
      let res = await axios
        .get(
          `http://192.168.0.220:8080/api/Opportunity/GetOpportunityHardware/OpportunityHardware?Databasename=${userInfo?.dbName}&OpportunityId=${routsData?.opportunityId}`
        )
        .catch((error) => {
          dispatch(setAppLoader(false));
          console.log("error11111 in list by main catagory", error);
        });
      console.log("========..............api>>>>====", res);
      if (res != null) {

        setOppInfoData(res);
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
  const getSupportOppDataInfo = async () => {
    try {
      dispatch(setAppLoader(true));
      let res = await axios
        .get(
          `http://192.168.0.220:8080/api/Opportunity/GetOpportunitySupport/OpportunitySupport?Databasename=${userInfo?.dbName}&OpportunityId=${routsData?.opportunityId}`
        )
        .catch((error) => {
          dispatch(setAppLoader(false));
          console.log("error11111 in list by main catagory", error);
        });
      console.log("========..............api>>>>====", res);
      if (res != null) {

        setSuprtOppInfoData(res);
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
    }, 1300);

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
  const RenderHardOppInfo = ({ item, index }) => {
    // console.log("==================item is=========",item);

   
    return (
      <View style={{ marginVertical: width(1) }}>
         <OppartunityDetail 
         item={item}
         onPressDescription={()=>{descriptionRef.current?.show({des:item?.description})}}
         onPressViewDetail={() => navigation.navigate(ScreenNames.PDFREPORTSCREEN,{opportunityId:item?.opportunityId})}
         />
         
       
      </View>
    );
  };
  const RenderSupportOppInfo = ({ item, index }) => {
   
    return (
      <View style={{ marginVertical: width(1) }}>
         <SupprtOppartunityDetail 
         item={item}
         onPressViewDetail={() => navigation.navigate(ScreenNames.PDFREPORTSCREEN)}
         />
      </View>
    );
  };
  const DATA = [
       {
        invoiceNumber: "Pur-11 00022",
        invoiceAmount: "60,000.00 $",
        dueDate: "16/09/2023",
        remarks: "Nill",
        customeraName: "Rammes Sol",
        detailCode: "RE-122-323-33",
        creditTerm: "Credit",
        creditDay: "12",
        due: "0.00$",
        recieptAmount: "0.00$",
        invoiceDate: "06/09/2022",
      }, 
      {
        invoiceNumber: "Pur-11 00022",
        invoiceAmount: "60,000.00 $",
        dueDate: "16/09/2023",
        remarks: "Nill",
        customeraName: "Agrius IT",
        detailCode: "RE-122-323-33",
        creditTerm: "Credit",
        creditDay: "12",
        due: "0.00$",
        recieptAmount: "0.00$",
        invoiceDate: "06/09/2022",
      },
      {
        PartNo: "Pur-11 00022",
        TotalAmount: "60,000.00 $",
        dueDate: "16/09/2023",
        Type: "Nill",
        customeraName: "Agrius IT",
        detailCode: "RE-122-323-33",
        creditTerm: "Credit",
        creditDay: "12",
        due: "0.00$",
        recieptAmount: "0.00$",
        invoiceDate: "06/09/2022",
      },
      {
        invoiceNumber: "Pur-11 00022",
        invoiceAmount: "60,000.00 $",
        dueDate: "16/09/2023",
        remarks: "Nill",
        customeraName: "Agrius IT",
        detailCode: "RE-122-323-33",
        creditTerm: "Credit",
        creditDay: "12",
        due: "0.00$",
        recieptAmount: "0.00$",
        invoiceDate: "06/09/2022",
      },
  ];

  return (
    <ScreenWrapper
      headerUnScrollable={() => {
        return (
          <View>
            <PageHeader
              pageTitle={`${routsData?.opportunityType} Opportunities`}
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
            data={routsData?.opportunityType=="Hardware"?oppInfoData:suprtOppInfoData}
            keyExtractor={(i, n) => n}
            renderItem={routsData?.opportunityType=="Hardware"?RenderHardOppInfo:RenderSupportOppInfo}
            // loop
            // style={styles.flatlistFilterStyle}
            contentContainerStyle={[CommonStyles.marginBottom_5]}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              // EmptyComponent
              // setTimeout(() => {
                showEmptyComponent ? EmptyComponent : null
              // }, 800);
             
            }
          />
        </View>
      </View>
      <DescriptionModal ref={descriptionRef}   />
    </ScreenWrapper>
  );
}
