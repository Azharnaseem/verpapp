// import React, { useState } from "react";
// import { View, Text, Image, FlatList } from "react-native";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   Button,
//   HomeHeader,
//   LeadsOppComponent,
//   PageHeader,
//   ScreenWrapper,
// } from "~components";

// import { selectUserMeta, setIsLoggedIn, setUserMeta } from "~redux/slices/user";
// import styles from "./styles";

// import CommonStyles from "~utills/CommonStyles";
// import { height, width } from "~utills/Dimension";
// import SearchField from "~components/searchField";
// import { ActivityIndicator } from "react-native";
// import AppColors from "~utills/AppColors";
// import { AllOppartunatiesData } from "~utills/DummyData";
// import ScreenNames from "~routes/routes";
// import { SmallText } from "~components/texts";

// // import { PDFGenerator } from "~utills/Methods";
// export default function AllOppartunaties({ navigation, route }) {
//   const dispatch = useDispatch();
//   const userInfo = useSelector(selectUserMeta);
//   const [searchQuery, setSearchQuery] = useState(null);
//   console.log("====", searchQuery);
//   const [loader, setLoader] = useState(false);
//   const getData = async (text) => {
//     setLoader(true);
//     setTimeout(() => {
//       console.log("==ttttttttttttt==", text);
//       try {
//         setSearchQuery(
//           AllOppartunatiesData?.filter((i) => {
//             console.log("i===================", i?.opportunityName);
//             i.opportunityName.toLowerCase().includes(text.toLowerCase());
//           })
//         );
//         // setSearchQuery(AllLeadsData);
//         setLoader(false);
//         // setSearchQuery(resp?.data?.result);
//         // setLoader(false);
//       } catch (error) {
//         setLoader(false);
//         console.log("error is ===", error);
//       }
//     }, 1000);

//     // console.log('----------------------------', text);
//   };
//   const searchMethod = async (text) => {
//     console.log("text==========", text);
//     if (text == "") {
//       setSearchQuery([]);
//     } else {
//       clearTimeout(window.ChangeInterval);
//       clearTimeout(window.CInterval);
//       if (text.length > 1) {
//         window.ChangeInterval = setTimeout(() => {
//           getData(text);
//         }, 1000);
//       } else {
//         window.CInterval = setTimeout(() => {
//           clearTimeout(window.ChangeInterval);
//           if (text.length > 0) {
//             getData(text);
//           }
//         }, 800);
//       }
//     }
//   };

//   const RenderOppartunities = ({ item, index }) => {
//     return (
//       <View style={{ marginVertical: width(1) }}>
//         <LeadsOppComponent
//           showLead={false}
//           opportunityName={item?.opportunityName}
//           documentNo={item.documentNo}
//           companyName={item.companyName}
//           leadOwner={item?.opportunityOwner}
//           stage={item.stage}
//           onPress={() => {
//             navigation.navigate(ScreenNames.LEADDETAILINFO, {
//               id: item?.companyName,
//               name: "Opportunity Detail Info",
//             });
//           }}
//         />
//       </View>
//     );
//   };

//   return (
//     <ScreenWrapper
//       scrollEnabled
//       headerUnScrollable={() => {
//         return (
//           <View>
//             <PageHeader
//               pageTitle={"All Oppartunity"}
//               onPressBack={() => navigation.goBack()}
//             />
//             <SearchField
//               onChangeText={searchMethod}
//               placeholder={"Search Oppartunity"}
//               containerStyle={{ marginVertical: height(1) }}
//             />
//           </View>
//         );
//       }}
//     >
//       <View style={styles.mainViewContainer}>
//         <View style={{ marginVertical: height(1) }}>
//           {searchQuery === null ? (
//             <FlatList
//               ListHeaderComponent={() => {
//                 return <Text>eeeee</Text>;
//               }}
//               data={AllOppartunatiesData}
//               keyExtractor={(i, n) => n}
//               renderItem={RenderOppartunities}
//               loop
//               // style={styles.flatlistFilterStyle}
//               contentContainerStyle={[CommonStyles.marginBottom_5]}
//               showsVerticalScrollIndicator={false}
//             />
//           ) : (
//             <>
//               {loader ? (
//                 <ActivityIndicator size={"large"} color={AppColors.primary} />
//               ) : (
//                 <FlatList
//                   ListHeaderComponent={() => {
//                     return <Text>9999</Text>;
//                   }}
//                   data={searchQuery}
//                   keyExtractor={(i, n) => n}
//                   renderItem={RenderOppartunities}
//                   loop
//                   // style={styles.flatlistFilterStyle}
//                   contentContainerStyle={[CommonStyles.marginBottom_5]}
//                   showsVerticalScrollIndicator={false}
//                   ListEmptyComponent={() => {
//                     return (
//                       <View
//                         style={{
//                           flex: 1,
//                           alignItems: "center",
//                           justifyContent: "center",
//                         }}
//                       >
//                         <SmallText color={AppColors.greyText2}>
//                           Data Not Found
//                         </SmallText>
//                       </View>
//                     );
//                   }}
//                 />
//               )}
//             </>
//           )}
//         </View>
//       </View>
//     </ScreenWrapper>
//   );
// }

import React, { useEffect,useState } from "react";
import { View, Text, Image, FlatList, ActivityIndicator } from "react-native";
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
import { AllLeadsData, AllOppartunatiesData } from "~utills/DummyData";
import { log } from "react-native-reanimated";
import AppColors from "~utills/AppColors";
import { SmallText } from "~components/texts";
import axios from "axios";
import { setAppLoader } from "~redux/slices/config";
import { erroMessage } from "~utills/Methods";

// import { PDFGenerator } from "~utills/Methods";
export default function AllOppartunaties({ navigation, route }) {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserMeta);
  var stringify =JSON.parse(userInfo) ;
   // console.log("---------------->>>",route?.params?.AllOppartunatiesDataaaa);
  let allOppartunatiesData = route?.params?.AllOppartunatiesDataaaa;
  const [searchQuery, setSearchQuery] = useState(null);
  const [active, setActive] = useState(false);
    console.log("==========",active);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [oppartunityHardwareData, setOppartunityhardwareData] = useState([]);
  const [oppartunitySupportData, setOppartunitySupportData] = useState([]);
  console.log("00000000000000>>>>,",oppartunitySupportData);
  // console.log("====",searchQuery);
  const [loader, setLoader] = useState(false);
  // console.log("----", loader);
  const getData = async (text) => {
    // console.log("text-----", text);
    setLoader(true);
    setTimeout(async () => {
      try {
        await axios
          .get(
            `http://192.168.0.220:8080/api/Opportunity/GetOpportunitySearch/GetOpportunitySearch?Databasename=${stringify?.dbName}&usergroup=${stringify?.groupType}&userId=${stringify?.userId}&DocNo=${text}`
          )
          .then((response) => {
            console.log("data on Search", response);
            setSearchQuery(response);
            setLoader(false);
          })
          .catch((error) => {
            console.log("error11111 in list by main catagory", error);
          });
        // setSearchQuery(
        //   AllOppartunatiesData?.filter((i) =>
        //     i.opportunityName.toLowerCase().includes(text.toLowerCase())
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

  const RenderOppartunities = ({ item, index }) => {
    // console.log("item:===========",item);
    return (
      <View style={{ marginVertical: width(1) }}>
        <LeadsOppComponent
          showLead={false}
          opportunityName={item?.opportunityName}
          docNo={item?.docNo}
          companyName={item?.companyName}
          opportunityOwner={item?.opportunityOwner}
          opportunityType={item?.opportunityType}
          stage={item?.stage}
          onPress={() => {
            navigation.navigate(ScreenNames.OPPARTUNITYDETAILINFO, {
              opportunityId: item?.opportunityId,
              opportunityType: item?.opportunityType,
            });
          }}
        />
      </View>
    );
  };
  useEffect(() => {
    // dispatch(setAppLoader(true));
    getOpportunitySupportData();
    getOpportunityHardwareData();
    // dispatch(setAppLoader(false));
  }, [userInfo]);
  const getOpportunityHardwareData = async () => {
    dispatch(setAppLoader(true));
    console.log("ifffffff callllllllllllllllllllllllllllllll");
    // try {
      // let res = 
      await axios
        .get(
          `http://192.168.0.220:8080/api/Opportunity/OpportunityHardware/GetOpportunityHardware?rows=10&pagenumber=${page}&Databasename=${stringify?.dbName}&usergroup=${stringify?.groupType}&userId=${stringify?.userId}&Type=Hardware`
        )
        .catch((error) => {
          dispatch(setAppLoader(false));
          console.log("error11111 in list by main catagory opp", error);
        }).then((resss) => {
          dispatch(setAppLoader(true));
          if(resss.error){
            dispatch(setAppLoader(false));
            erroMessage("Please connect Vpn")
          }else{
            if (resss != null && page == 0) {
            
              setOppartunityhardwareData(resss);
              setPage(page + 1);
              dispatch(setAppLoader(false));
            } else {
              console.log("elsee callllleddddddddddddd");
              let temp = [...oppartunityHardwareData];
              temp.push(...resss);
              setOppartunityhardwareData(temp);
              setPage(page + 1);
              setLoading(false);
              dispatch(setAppLoader(false));
            }
          }});
      // console.log("========..............api====", res);
      // if (res != null && page == 0) {
      //   setOppartunityhardwareData(res);
      //   setPage(page + 1);
      // } else {
      //   console.log("elsee callllleddddddddddddd");
      //   let temp = [...oppartunityHardwareData];
      //   temp.push(...res);
      //   setOppartunityhardwareData(temp);
      //   setPage(page + 1);
      //   setLoading(false);
      // }
    // } catch (error) {
    //   console.log("error is  ooooppp getting", error);
    // }
  };
  const getOpportunitySupportData = async () => {
    dispatch(setAppLoader(true));
    console.log("ifffffff callllllllllllllllllllllllllllllll");
    // try {
      // let res =
       await axios
        .get(
          `http://192.168.0.220:8080/api/Opportunity/OpportunityHardware/GetOpportunityHardware?rows=10&pagenumber=${page}&Databasename=${stringify?.dbName}&usergroup=${stringify?.groupType}&userId=${stringify?.userId}&Type=Support`
        )
        .catch((error) => {
          dispatch(setAppLoader(false));
          console.log("error11111 in list by main catagory opp", error);
        }).then((res) => {
          if(res.error){
            dispatch(setAppLoader(false));
            erroMessage("Please connect Vpn")
          }else{
          if (res != null && page == 0) {
            setOppartunitySupportData(res);
            setPage(page + 1);
            dispatch(setAppLoader(false));
          } else {
            console.log("elsee callllleddddddddddddd");
            let temp = [...oppartunitySupportData];
            temp.push(...res);
            setOppartunitySupportData(temp);
            setPage(page + 1);
            setLoading(false);
            dispatch(setAppLoader(false));
          }}
        });
      // console.log("========..............api====", res);
      // if (res != null && page == 0) {
      //   setOppartunitySupportData(res);
      //   setPage(page + 1);
      // } else {
      //   console.log("elsee callllleddddddddddddd");
      //   let temp = [...oppartunitySupportData];
      //   temp.push(...res);
      //   setOppartunitySupportData(temp);
      //   setPage(page + 1);
      //   setLoading(false);
      // }
    // } catch (error) {
    //   console.log("error is  ooooppp getting", error);
    // }
  };

  return (
    <ScreenWrapper
      // scrollEnabled
      headerUnScrollable={() => {
        return (
          <View>
            <PageHeader
              pageTitle={"All Opportunities"}
              onPressBack={() => navigation.goBack()}
            />
            <SearchField
              onChangeText={searchMethod}
              //  onPressBar={()=>navigation.navigate(ScreenNames.SEARCHSCREEN)} editable={false}
              placeholder={"Search Opportunities"}
              containerStyle={{ marginVertical: height(1) }}
            />
            <View
              style={{
                width: width(90),
                // backgroundColor: "red",
                // alignItems: "center",
                // justifyContent: "center",
                alignSelf: "center",
                paddingHorizontal: width(2),
                flexDirection: "row",
                justifyContent: "space-evenly",
              }}
            >
              <Button
                onPress={() => {
                  setActive(false);
                }}
                textStyle={{color:active?AppColors?.textColor:AppColors.white}}
                containerStyle={[
                  styles.btnStyle,
                  {
                    backgroundColor: active
                      ? AppColors.lightGrey
                      : AppColors?.primary,
                      borderWidth:active?1:0,
                  },
                ]}
                title={"Hardware"}
              />
              <Button
                onPress={() => {
                  setActive(true);
                }}
                containerStyle={[styles.btnStyle, {
                  backgroundColor: active
                    ? AppColors.primary
                    : AppColors?.lightGrey,
                    borderWidth:active?0 :1,
                },]}
                textStyle={{color:active?AppColors?.white:AppColors.textColor}}
                title={"Support"}
              />
            </View>
          </View>
        );
      }}
    >
      <View style={styles.mainViewContainer}>
        {/* <Text>dsssssssssssssssd</Text> */}
       {!active? <View style={{ marginVertical: height(1) }}>
          {searchQuery === null ? (
            <FlatList
              //  ListHeaderComponent={()=>{
              //   return(
              //     <Text>
              //       eeeee
              //     </Text>
              //   )
              //  }}
              data={oppartunityHardwareData}
              keyExtractor={(i, n) => n}
              renderItem={RenderOppartunities}
              loop
              // style={styles.flatlistFilterStyle}
              contentContainerStyle={[CommonStyles.marginBottom_5]}
              showsVerticalScrollIndicator={false}
              ListFooterComponent={() => {
                return (
                  <View style={{ marginVertical: height(1) }}>
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
                      { oppartunityHardwareData?.length === 0 ?<Text>
                        No oppartunity found

                      </Text> :<Button
                        containerStyle={{ width: width(30) }}
                        title={"Load More"}
                        onPress={()=>{
                          setLoading(true)
                          getOpportunityHardwareData()
                        }}
                      />}
                        </View>
                     
                    )}
                  </View>
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
                  renderItem={RenderOppartunities}
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
        </View>:<View style={{ marginVertical: height(1) }}>
          {searchQuery === null ? (
            <FlatList
              //  ListHeaderComponent={()=>{
              //   return(
              //     <Text>
              //       eeeee
              //     </Text>
              //   )
              //  }}
              data={oppartunitySupportData}
              keyExtractor={(i, n) => n}
              renderItem={RenderOppartunities}
              loop
              // style={styles.flatlistFilterStyle}
              contentContainerStyle={[CommonStyles.marginBottom_5]}
              showsVerticalScrollIndicator={false}
              ListFooterComponent={() => {
                return (
                  <View style={{ marginVertical: height(1) }}>
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
                      { oppartunitySupportData?.length === 0?<Text>No oppartunity found</Text>:  <Button
                        containerStyle={{ width: width(30) }}
                        title={"Load More"}
                        onPress={()=>{
                          setLoading(true)
                          getOpportunitySupportData()
                        }}
                      />}
                        </View>
                     
                    )}
                  </View>
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
                  renderItem={RenderOppartunities}
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
        </View>}
      </View>
    </ScreenWrapper>
  );
}
