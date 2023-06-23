import React, { useState } from "react";
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
import { AllLeadsData } from "~utills/DummyData";
import { log } from "react-native-reanimated";
import AppColors from "~utills/AppColors";
import { SmallText } from "~components/texts";

// import { PDFGenerator } from "~utills/Methods";
export default function AllLeads({ navigation, route }) {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserMeta);

  const [searchQuery, setSearchQuery] = useState(null);
  // console.log("====",searchQuery);
  const [loader, setLoader] = useState(false);
  console.log("----", loader);
  const getData = async (text) => {
    console.log("text-----", text);
    setLoader(true);
    setTimeout(() => {
      try {
        setSearchQuery(
          AllLeadsData?.filter((i) =>
            i.companyName.toLowerCase().includes(text.toLowerCase())
          )
        );
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
    return (
      <View style={{ marginVertical: width(1) }}>
        <LeadsOppComponent
         
          type={item?.type}
          leadOwner={item?.leadOwner}
          leadNo={item?.leadNo}
          companyName={item?.companyName}
          onPress={() => {
            navigation.navigate(ScreenNames.LEADDETAILINFO, {
              id: item?.companyName,
              name: "Lead Detail Info",
            });
          }}
        />
      </View>
    );
  };

  return (
    <ScreenWrapper
      scrollEnabled
      headerUnScrollable={() => {
        return (
          <View>
            <PageHeader onPressBack={() => navigation.goBack()} />
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
              data={AllLeadsData}
              keyExtractor={(i, n) => n}
              renderItem={RenderAllLeads}
              loop
              // style={styles.flatlistFilterStyle}
              contentContainerStyle={[CommonStyles.marginBottom_5]}
              showsVerticalScrollIndicator={false}
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
