import React, { useState } from "react";
import { View, Text,Image, FlatList, Linking, SectionList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Button, ContractTicketBox, HomeHeader, InboxDueTicketBox, LeadOpprtunityInfoDetail, LeadsOppComponent, PageHeader, ScreenWrapper } from "~components";

import { selectUserMeta, setIsLoggedIn, setUserMeta } from "~redux/slices/user";
import styles from "./styles";

import CommonStyles from "~utills/CommonStyles";
import { height, width } from "~utills/Dimension";
import SearchField from "~components/searchField";
import ScreenNames from "~routes/routes";
import { DueInvoiceData } from "~utills/DummyData";
import { InvoiceIcon } from "~assets/images";



// import { PDFGenerator } from "~utills/Methods";
export default function InvoiceScreen({ navigation, route }) {
  const routsData=route.params;
  // console.log("==2222222==",routsData);
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserMeta);
  const makePhoneCall = () => {
    const phoneNumber = '+923407685573'; // Replace with the desired phone number
  
    Linking.openURL(`tel:${phoneNumber}`)
      .catch(error => console.log('Error making phone call:', error));
  };
 
  
  const RenderContractInfo = ({ item, index }) => {
    // console.log("=============section data================:",item);
    return (
      <View style={{ marginVertical: width(1) }}>
         <InboxDueTicketBox 
         item={item}

        //  onPressViewDetail={()=>navigation.navigate(ScreenNames.INVOICESSCREEN)}
          // onPressPhoneNo={makePhoneCall} 
          // onPressEmail={() => Linking.openURL('mailto:support@example.com') } 
          // onPressPdf={()=>navigation.navigate(ScreenNames.PDFREPORTSCREEN)}
          />
      </View>
    );
  };
  const DATA = [
    {
      title: 'Agriust IT',
      data: [ {
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
        // image: InvoiceIcon,
        invoiceDate: "06/09/2022",
      }, {
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
        // image: InvoiceIcon,
        invoiceDate: "06/09/2022",
      },],
    },
    {
      title: 'Rammes Sol',
      data: [ {
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
        // image: InvoiceIcon,
        invoiceDate: "06/09/2022",
      }, {
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
        image: InvoiceIcon,
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
        // image: InvoiceIcon,
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
        // image: InvoiceIcon,
        invoiceDate: "06/09/2022",
      }
    ],
    },
    
  ];

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
         
        {/* <SectionList
          data={DueInvoiceData}
          keyExtractor={(i, n) => n}
          renderItem={RenderContractInfo}
          // renderSectionHeader={({section: {title}}) => (
          //   <Text style={styles.header}>{title}</Text>
          // )}
          // loop
          // style={styles.flatlistFilterStyle}
          // contentContainerStyle={[
          //   CommonStyles.marginBottom_5,
         
          // ]}
          // showsVerticalScrollIndicator={false}
        /> */}
         <SectionList
      sections={DATA}
      keyExtractor={(item, index) => item + index}
      renderItem={RenderContractInfo}
      renderSectionHeader={({section: {title}}) => (
        <Text style={styles.header}>{title}</Text>
      )}
    />
        </View>
      </View>
    </ScreenWrapper>
  );
}
