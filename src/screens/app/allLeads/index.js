import React, {useEffect, useState } from "react";
import { View, Text, Image, FlatList, ActivityIndicator, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  HomeHeader,
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
import { AllLeadsData } from "~utills/DummyData";
import { log } from "react-native-reanimated";
import AppColors from "~utills/AppColors";
import { SmallText } from "~components/texts";
import BottomTabBar from "~routes/bottomTabBar";
import axios from "axios";
import { setAppLoader } from "~redux/slices/config";
import { erroMessage } from "~utills/Methods";

// import { PDFGenerator } from "~utills/Methods";
export default function AllLeads({ navigation, route }) {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserMeta);
  var stringify =JSON.parse(userInfo)
  let AllLeadsDataa=route?.params?.allLeadData;
  const [leadData, setLeadData] = useState([]);
console.log("======222222222====>>>",leadData);
  const [searchQuery, setSearchQuery] = useState(null);
  // console.log("====",searchQuery);
  const [loader, setLoader] = useState(false);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getLeadData();
  }, [userInfo]);
  const getLeadData = async () => {
    // try {
      dispatch(setAppLoader(true));
      let res = await axios
        .get(
          `http://192.168.0.220:8080/api/Lead/GetLead/GetLeadListtest?rows=10&pagenumber=${page}&Databasename=${stringify?.dbName}&usergroup=${stringify?.groupType}&userid=${stringify?.userId}`
        )
        .catch((error) => {
          dispatch(setAppLoader(false));
          console.log("error11111 in list by main catagory", error);
        }).then((resss) => {
          if(resss.error){
            setLoading(false);
            dispatch(setAppLoader(false));
            erroMessage("Please connect Vpn")
          }else{
            console.log("=======+=====++++++++",resss);
            if (resss != null&& page == 0) {
              console.log("iffffffffffffffffffffffffffff");
              setLeadData(resss);
              setPage(page+1);
              dispatch(setAppLoader(false));
            } else {
           console.log("elsssssssssssssssssssssss");
              let temp = [...leadData];
              temp.push(...resss);
              setLeadData(temp);
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
  // console.log("----", loader);
  const getData = async (text) => {
    // console.log("text-----", text);
    setLoader(true);
    setTimeout(async() => {
      try {
        await axios
        .get(
          `http://192.168.0.220:8080/api/Lead/GetLeadSearch/GetLeadListtestSearch?rows=10&pagenumber=0&Databasename=${stringify?.dbName}&usergroup=${stringify?.groupType}&userid=${stringify?.userId}&Companyname=${text}`
        ).then(response => {
          console.log("data on Search",response);
          setSearchQuery(response);
          setLoader(false);
        })
        .catch((error) => {
          console.log("error11111 in list by main catagory", error);
        });
        // setSearchQuery(
        //   AllLeadsData?.filter((i) =>
        //     i.companyName.toLowerCase().includes(text.toLowerCase())
        //   )
        // );
        // setSearchQuery(AllLeadsData);
        setLoader(false);
        // setSearchQuery(resp?.data?.result);
        // setLoader(false);
      } catch (error) {
        setLoader(false);
        console.log("error is ===", error);
      }
    }, 1000);

    // console.log('----------------------------', text);
  };
  const searchMethod = async (text) => {
    if (text == "") {
      setSearchQuery([]);
    } else {
      clearTimeout(window.ChangeInterval);
      clearTimeout(window.CInterval);
      if (text.length > 1) {
        window.ChangeInterval = setTimeout(() => {
          getData(text);

          // getData(text);
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

  const RenderAllLeads = ({ item, index }) => {
    // console.log("leadessss=============",item);
    
    return (
      <View style={{ marginVertical: width(1) }}>
        <LeadsOppComponent
         
          type={item?.type}
          leadOwner={item?.employeeName}
          companyName={item?.companyName}
          LeadDate={item?.docDate}
          onPress={() => {
            navigation.navigate(ScreenNames.LEADDETAILINFO, {
              id: item?.companyName,
              name: "Lead Detail Info",
              leadProfileId: item?.leadProfileId,
            });
          }}
        />
      </View>
    );
  };

  return (
    <ScreenWrapper
      // scrollEnabled
      headerUnScrollable={() => {
        return (
          <View>
            <PageHeader pageTitle="All Leads" onPressBack={() => navigation.goBack()} />
            <SearchField
              onChangeText={searchMethod}
              //  onPressBar={()=>navigation.navigate(ScreenNames.SEARCHSCREEN)} editable={false}
              placeholder={"Search Leads"}
              containerStyle={{ marginVertical: height(1) }}
            />
          </View>
        );
      }}
    
    >
      <View style={styles.mainViewContainer}>
        {/* <Text>ddd</Text> */}
        <View style={{ marginVertical: height(1) }}>
          {searchQuery === null ? (
            <FlatList
              //  ListHeaderComponent={()=>{
              //   return(
              //     <Text>
              //       eeeee
              //     </Text>
              //   )
              //  }}
              data={leadData}
              keyExtractor={(i, n) => n}
              renderItem={RenderAllLeads}
              loop
              // style={styles.flatlistFilterStyle}
              contentContainerStyle={[CommonStyles.marginBottom_5]}
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
                      { leadData?.length === 0 ?
                      <Text>No Lead Found</Text>:
                      <Button
                        containerStyle={{ width: width(30) }}
                        title={"Load More"}
                        onPress={()=>{
                          setLoading(true)
                          getLeadData()
                        }}
                      />}
                        </View>
                     
                    )}
                  </View>)
                );
              }}
            />
          ) : (
            <>
              {loader ? (
                <ActivityIndicator size={"large"} color={AppColors.primary} />
              ) : (
                <FlatList
                  //  ListHeaderComponent={()=>{
                  //   return(
                  //     <Text>
                  //       99999
                  //     </Text>
                  //   )
                  //  }}
                  data={searchQuery}
                  keyExtractor={(i, n) => n}
                  renderItem={RenderAllLeads}
                  loop
                  // style={styles.flatlistFilterStyle}
                  contentContainerStyle={[CommonStyles.marginBottom_5]}
                  showsVerticalScrollIndicator={false}
                  ListEmptyComponent={() => {
                    return (
                      <View
                        style={{
                          flex: 1,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <SmallText color={AppColors.greyText2}>
                          Data Not Found
                        </SmallText>
                      </View>
                    );
                  }}
                />
              )}
            </>
          )}
        </View>
      </View>
    </ScreenWrapper>
  );
}
