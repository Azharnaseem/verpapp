import React, { useEffect, useState } from "react";
import { View, Text,Image, FlatList, Linking, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Button, ContractBox, ContractTicketBox, HomeHeader, LeadOpprtunityInfoDetail, LeadsOppComponent, PageHeader, ScreenWrapper } from "~components";

import { selectUserMeta, setIsLoggedIn, setUserMeta } from "~redux/slices/user";
import styles from "./styles";

import CommonStyles from "~utills/CommonStyles";
import { height, width } from "~utills/Dimension";
import SearchField from "~components/searchField";
import ScreenNames from "~routes/routes";
import axios from "axios";
import { setAppLoader } from "~redux/slices/config";
import AppColors from "~utills/AppColors";
import { SmallText } from "~components/texts";



// import { PDFGenerator } from "~utills/Methods";
export default function ContractScreen({ navigation, route }) {
  const routsData=route.params;
  // console.log("==2222222==",routsData);
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserMeta);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [contractData, setContractData] = useState([]);
  var stringify =JSON.parse(userInfo)
  const makePhoneCall = () => {
    const phoneNumber = '+923407685573'; // Replace with the desired phone number
  
    Linking.openURL(`tel:${phoneNumber}`)
      .catch(error => console.log('Error making phone call:', error));
  };
  useEffect(() => {
    getContractData();
  }, [userInfo]);
  const getContractData = async () => {
    // try {
      dispatch(setAppLoader(true));
      let res = await axios
        .get(
          // 'http://192.168.0.220:8080/api/Contract/GetContract/GetContract?rows=5&pagenumber=1&Databasename=SIRIUS1_DB&usergroup=Administrator&userId=3099'
          `http://192.168.0.220:8080/api/Contract/GetContract/GetContract?rows=5&pagenumber=${page}&Databasename=${stringify?.dbName}&usergroup=${stringify?.groupType}&userid=${stringify?.userId}`
        )
        .catch((error) => {
          
          dispatch(setAppLoader(false));
          console.log("error11111 in list by main catagory", error);
        }).then((resss) => {
          // console.log("===+++",resss);
          if(resss.error){
            setLoading(false);
            dispatch(setAppLoader(false));
            erroMessage("Please connect Vpn")
          }else{
            
            if (resss != null&& page == 0) {
              console.log("iffffffffffffffffffffffffffff");
              console.log("=======+=====++++++++",resss);
              setContractData(resss);
              setPage(page+1);
              dispatch(setAppLoader(false));
            } else {
           console.log("elsssssssssssssssssssssss");
              let temp = [...contractData];
              temp.push(...resss);
              setContractData(temp);
              setPage(page + 1);
              setLoading(false);
              dispatch(setAppLoader(false));
              // console.log("data is nilllllll");
            }
          }
         
          // console.log("leadddddddddddddddddddddooooo",resss);
        });
      // console.log("========..............api====", res);
      
    // } catch (error) {
    //   console.log("error is  lear getting", error);
    // }
  };
 
  
  const RenderContractInfo = ({ item, index }) => {
    return (
      <View style={{ marginVertical: width(1) }}>
        <ContractBox  item={item}/>
         {/* <ContractTicketBox onPressViewDetail={()=>navigation.navigate(ScreenNames.CONTRACTDETAILSCREEN)}
         contractNo={item?.contractNo}
          // onPressPhoneNo={makePhoneCall} 
          // onPressEmail={() => Linking.openURL('mailto:support@example.com') } 
          // onPressPdf={()=>navigation.navigate(ScreenNames.PDFREPORTSCREEN)}
          /> */}
      </View>
    );
  };

  return (
    <ScreenWrapper  headerUnScrollable={()=>{
      return(
        <View>
          <PageHeader pageTitle={"Contracts"} onPressBack={()=>navigation.goBack()}/>
          <SearchField
              // onChangeText={searchMethod}
              //  onPressBar={()=>navigation.navigate(ScreenNames.SEARCHSCREEN)} editable={false}
              placeholder={"Search Contract"}
              containerStyle={{ marginVertical: height(1) }}
            />
          {/* <SearchField onPressBar={()=>navigation.navigate(ScreenNames.SEARCHSCREEN)} editable={false} placeholder={"Search Leads"} containerStyle={{marginVertical:height(1)}} /> */}
        </View>
      )
    }}>
      <View style={styles.mainViewContainer}>
        <View style={{marginVertical:height(1)}} >
         
        <FlatList
          data={contractData}
          keyExtractor={(i, n) => n}
          renderItem={RenderContractInfo}
          loop
          // style={styles.flatlistFilterStyle}
          contentContainerStyle={[
            CommonStyles.marginBottom_5,
         
          ]}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={() => {
            return (
          
            (  <View style={{ marginVertical: height(1) }}>
                {loading ? (
                  <View style={styles.containers}>
                    <ActivityIndicator
                      size="small"
                      color={AppColors.primary}
                    />
                    <Text style={styles.text}>Loading ...</Text>
                  </View>
                ) : (
                  <View>
                  { contractData?.length === 0 ?
                  <Text>No contract Found</Text>:
                  <Button
                    containerStyle={{ width: width(30) }}
                    title={"Load More"}
                    onPress={()=>{
                      setLoading(true)
                      getContractData()
                    }}
                  />}
                    </View>
                 
                )}
              </View>)
            );
          }}
          // ListEmptyComponent={() => {
          //   return (
          //     <View
          //       style={{
          //         flex: 1,
          //         alignItems: "center",
          //         justifyContent: "center",
          //       }}
          //     >
          //       <SmallText color={AppColors.greyText2}>
          //         Data Not Found
          //       </SmallText>
          //     </View>
          //   );
          // }}
        />
        </View>
      </View>
    </ScreenWrapper>
  );
}
