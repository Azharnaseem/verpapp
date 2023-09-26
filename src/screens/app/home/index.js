import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  ScrollView,
  Pressable,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  ConfirmationModal,
  HomeHeader,
  LeadsOppComponent,
  ScreenWrapper,
} from "~components";
import { setAppLoader } from "~redux/slices/config";
import { selectUserMeta, setIsLoggedIn, setUserMeta } from "~redux/slices/user";
import styles from "./styles";
// import PDFGenerator from "~utills/pdfGenerator";
import RNHTMLtoPDF from "react-native-html-to-pdf";
import Pdf from "react-native-pdf";
import CommonStyles from "~utills/CommonStyles";
import { height, width } from "~utills/Dimension";
import AppColors from "~utills/AppColors";
import { SmallText } from "~components/texts";
import { FontFamily } from "~assets/fonts";
import SearchField from "~components/searchField";
import { ContractImage, LeadIcon, Oppartunity, Tickets, welcomeImage } from "~assets/images";
import ScreenNames from "~routes/routes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SearchSVG from "~assets/SVG/searchSvg";
import axios from "axios";
import { PlusIcon } from "~assets/SVG";
import CalBack from "~assets/SVG/calBack";
import FrwordSvg from "~assets/SVG/frwrdSvg";
import BackSvg from "~assets/SVG/backSvg";

// import { PDFGenerator } from "~utills/Methods";
export default function Home({ navigation, route }) {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserMeta);
  // console.log("login infooo ===>>>>>>>>>>>>>>>>>", userInfo);
  const [pdfFile, setPdfFile] = useState(null);
  const [page, setPage] = useState(0);
  const leadRef = useRef(null);
  const [leadData, setLeadData] = useState(null);
  const [oppartunityData, setOppartunityData] = useState(null);
  const [index, setIndex] = useState(0);
  const [loader, setLoader] = useState(false);
  const [currentItemIndex, setCurrentItemIndex] = useState(null);
  // console.log("==================",oppartunityData);
  const confirmationModal = useRef();
  // const flatlistRef = useRef(null);
  // const screenScroll = useRef(null);
  // const handleScrolllllll = (event) => {
  //   const offsetY = event.nativeEvent.contentOffset.y;
  //   const itemHeight = height(8); /* specify the height of each item */
  //   const index = Math.floor(offsetY / itemHeight);
  //   setCurrentItemIndex(index);
  // };
  // const scrollToIndex = (index) => {
  //   scrollViewRef.current?.scrollToPosition(0, index * itemHeight, true);
  // };

  const generatePDF = async () => {
    try {
      // Define the HTML content to convert to PDF
      const htmlContent = `
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
              }
              h1 {
                color: #333;
                text-align: center;
              }
            </style>
          </head>
          <body>
            <h1>PDF Report</h1>
          </body>
        </html>
      `;
      //  const htmlContent = `<h1>Hello, World!</h1>`; // Replace with your HTML content

      // Generate PDF options
      const options = {
        html: htmlContent,
        fileName: "example",
        directory: "Documents",
      };

      // Generate the PDF using react-native-html-to-pdf
      const pdf = await RNHTMLtoPDF.convert(options);
      setPdfFile(pdf?.filePath);
      // console.log("PDF file generated:", pdf.filePath);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    dispatch(setAppLoader(true));
    getLeadData();
    getOpportunityData();
    dispatch(setAppLoader(false));
  }, [userInfo]);
  // useEffect(() => {
  //   getOpportunityData();
  // }, [userInfo]);
  const getLeadData = async () => {
    try {
      let res = await axios
        .get(
          `http://192.168.0.220:8080/api/Lead/GetLead/GetLeadListtest?rows=10&pagenumber=0&Databasename=${userInfo?.dbName}&usergroup=${userInfo?.groupType}&userid=${userInfo?.userId}`
        )
        .catch((error) => {
          console.log("error11111 in list by main catagory", error);
        });
      // console.log("========..............api====", res);
      if (res != null) {
        setLeadData(res);
      } else {
        console.log("data is nilllllll");
      }
    } catch (error) {
      console.log("error is  lear getting", error);
    }
  };
  const getOpportunityData = async () => {
    console.log("ifffffff callllllllllllllllllllllllllllllll");
    try {
      let res = await axios
        .get(
          `http://192.168.0.220:8080/api/Opportunity/GetOpportunity/GetOpportunity?rows=10&pagenumber=${page}&Databasename=${userInfo?.dbName}&usergroup=${userInfo?.groupType}&userId=${userInfo?.userId}`
        )
        .catch((error) => {
          console.log("error11111 in list by main catagory opp", error);
        });
      // console.log("========..............api====", res);
      if (res != null && page == 0) {
        setOppartunityData(res);
        setPage(page + 1);
      } else {
        console.log("elsee callllleddddddddddddd");
        let temp = [...oppartunityData];
        temp.push(...res);
        setOppartunityData(temp);
        setPage(page + 1);
        setLoader(false);
      }
    } catch (error) {
      console.log("error is  ooooppp getting", error);
    }
  };

  const RenderLeads = ({ item, index }) => {
    // console.log("item of lead data:::::::::::::::::::== ", item);
    return (
      <View style={{ marginHorizontal: width(1) }}>
        <LeadsOppComponent
          companyName={item?.companyName}
          leadOwner={item?.employeeName}
          type={item?.type}
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
  const scrollToIndex = () => {
    // Check if data is not empty before calling scrollToIndex
    if (leadData.length > 0) {
      console.log("calllllll2222222111111111111");
      if (index == leadData.length - 1) {
        return;
      } else {
        setIndex(index + 1);
        leadRef.current.scrollToIndex({ animated: true, index });
      }
    } else {
      console.log("calllllll2222222");
      if (index == 0) {
        return;
      } else {
        setIndex(index - 1);
        leadRef.current.scrollToIndex({ animated: true, index });
      }
    }
  };
  const scrollToIndexx = () => {
    // Check if data is not empty before calling scrollToIndex

    // console.log("calllllll2222222");
    if (index == 0) {
      return;
    } else {
      setIndex(index - 1);
      leadRef.current.scrollToIndex({ animated: true, index });
    }
  };
  // useEffect(() => {
  //   // if(index< leadData.length){
  // //  leadRef?.current.scrollToIndex({
  // //   index,
  // //   animated: true,
  // //  })
  // }, [index]);
  // const handleEndReached = () => {
  //   // console.log("end reached");
  //   let tepmDta = data;
  //   tepmDta.push();
  //   // flatlistRef.current.scrollToIndex({ animated: true, index: 0 });
  // };

  // const itemWidth = width(51); // Replace with the actual item width
  // const [currentIndex, setCurrentIndex] = useState(0);
  // const handleScroll = (event) => {
  //   // console.log("sssssssssssss");
  //   const scrollOffset = event.nativeEvent.contentOffset.x;
  //   // const { contentOffset, layoutMeasurement } = event.nativeEvent;
  //   const index = Math.floor(scrollOffset / itemWidth);
  //   // const index = Math.floor(scrollOffset / itemWidth);
  //   // const index = Math.floor(contentOffset.x / layoutMeasurement);
  //   // console.log(index,"===",data.length);
  //   if (index === data.length) {
  //     // console.log("callled if ");
  //     // Reached the last item, scroll back to the first item
  //     flatlistRef.current.scrollToIndex({ animated: false, index: 0 });
  //   }
  //   setCurrentIndex(index);
  // };
  // const getItemLayout = (_, index) => ({
  //   length: itemWidth,
  //   offset: itemWidth * index,
  //   index,
  // });

  // const handleScroll = (event) => {
  //   console.log("callllll");
  //   const { contentOffset, layoutMeasurement } = event.nativeEvent;
  //   const currentIndex = Math.floor(contentOffset.x / layoutMeasurement.width);
  //   console.log(currentIndex,"=====",data.length - 3);

  //   if (currentIndex === data.length - 3) {
  //     console.log("callled if ");
  //     // Reached the last item, scroll back to the first item
  //     flatlistRef.current.scrollToIndex({ animated: false, index: 0 });
  //   }
  // };
  const RenderOppartunities = ({ item, index }) => {
    console.log("iteem====SSSSSSS======", item?.opportunityId);
    return (
      <View style={{ marginVertical: width(1) }}>
        <LeadsOppComponent
          showLead={false}
          opportunityName={item?.opportunityName}
          companyName={item?.companyName}
          stage={item?.stage}
          opportunityOwner={item?.opportunityOwner}
          docNo={item?.docNo}
          opportunityType={item?.opportunityType}
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
  // const hhandleScroll = (event) => {
  //   const { contentOffset } = event.nativeEvent;
  //   const scrollX = contentOffset.x; // Horizontal scroll position
  //   const scrollY = contentOffset.y; // Vertical scroll position

  //   // console.log('Scroll position:', { scrollX, scrollY });
  // };

  return (
    <ScreenWrapper
      scrollEnabled
      // ref={screenScroll}
      headerUnScrollable={() => {
        return (
          <View>
            <HomeHeader
              onPressLogout={() => {
                confirmationModal.current.show();
              }}
            />
          </View>
        );
      }}
    >
      {/* <ScrollView 
      accessibilityRole=""
      onScroll={hhandleScroll}
      showsVerticalScrollIndicator={false}> */}
      <View style={styles.mainViewContainer}>
        <>
          <View
            style={{ alignSelf: "flex-start", marginHorizontal: width(3.5) }}
          >
            <SmallText
              size={4}
              color={AppColors.scndry}
              fontFamily={FontFamily.montserrat_Bold}
            >
              {`Welcome ${userInfo?.fullname}`}
            </SmallText>
            {/* <SmallText color={AppColors.darkGrey}>What do you want ?</SmallText> */}
            {/* <SearchField placeholderColor={AppColors.black} placeholder={"Search..."} containerStyle={{marginVertical:height(1)}} /> */}
            <Image
              source={welcomeImage}
              resizeMode="stretch"
              resizeMethod="resize"
              style={{
                width: width(93),
                height: width(30),
                marginVertical: height(1),
              }}
            />
            </View>
            </>
            {/* newwww */}
            <TouchableOpacity
          style={styles.contractBoxStyle}
          onPress={() => navigation.navigate(ScreenNames.AllLEADS)}
        >
          <Image
            source={LeadIcon}
            style={styles.imageStyle}
            resizeMode="contain"
          />
          <SmallText
            size={5}
            fontFamily={FontFamily.montserrat_Bold}
            color={AppColors.scndry}
          >
            Leads
          </SmallText>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.contractBoxStyle}
          onPress={() => navigation.navigate(ScreenNames.ALLOPPARTUNATIES)}
        >
          <Image
            source={Oppartunity}
            style={styles.imageStyle}
            resizeMode="contain"
          />
          <SmallText
            size={5}
            fontFamily={FontFamily.montserrat_Bold}
            color={AppColors.scndry}
          >
            Opportunities
          </SmallText>
        </TouchableOpacity>
            {/* newwww */}
            {/* <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: width(1),
              }}
            >
              <SmallText
                size={4}
                color={AppColors.scndry}
                fontFamily={FontFamily.montserrat_SemiBold}
              >
                Leads
              </SmallText>
              <Pressable
                onPress={() => {
                  navigation.navigate(ScreenNames.AllLEADS,{
                    allLeadData:leadData
                  });
                }}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: width(20),
                  justifyContent: "space-between",
                }}
              >
                <SearchSVG width={15} height={15} color={AppColors.primary} />
                <SmallText
                  size={4}
                  color={AppColors.primary}
                  fontFamily={FontFamily.montserrat_SemiBold}
                >
                  Search
                </SmallText>
              </Pressable>
            </View> */}
          {/* </View> */}
          {/* <View
            style={{
              // flex: 1,
              height: height(16),
              alignItems: "center",
              justifyContent: "center",
              // backgroundColor:",
            }}
          >
            <FlatList
              // ref={flatlistRef}
              ref={leadRef}
              initialScrollIndex={index}
              data={leadData}
              // data={["1", "2", "3", "4", "5", "6]}
              keyExtractor={(i, n) => n}
              renderItem={RenderLeads}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              // onScroll={handleScroll}

              // getItemLayout={getItemLayout}
              // initialScrollIndex={currentIndex}
              // snapToInterval={itemWidth}
              // decelerationRate={'fast'}
              // initialScrollIndex={data.length}
              // getItemLayout={(data, index) => ({
              //   length: width(20), // Replace ITEM_WIDTH with the actual item width
              //   offset: width(20) * index,
              //   index,
              // })}
              // snapToAlignment="start"
              // snapToInterval={ width(20)}
              // onScroll={handleScroll}
              // onEndReached={handleEndReached}
              style={styles.flatlistFilterStyle}
              contentContainerStyle={[
                { paddingVertical: height(1) },
                // CommonStyles.marginBottom_5,
                // CommonStyles.paddingLeft_4,
                CommonStyles.paddingRight_6,
              ]}
              showsVerticalScrollIndicator={false}
              // pagingEnabled={true}
              // snapToInterval={width(10)}
            />
          </View> */}
          {/* <View
            style={{
              flexDirection: "row",
              alignSelf: "flex-end",
              marginRight: width(4),
            }}
          >
            <Pressable
              style={{ marginRight: width(3) }}
              onPress={
                scrollToIndexx
              //   () => {
              //   if (index === 0) {
              //     return;
              //   }
              //   setIndex(index - 1);
              // }
            }
            >
              <BackSvg />
            </Pressable>
            <Pressable
              onPress={
                // ()=>{
                // if(index===leadData.length-1){
                //   return;
                // }
                scrollToIndex
                // setIndex(index+1);
                // }
              }
            >
              <FrwordSvg />
            </Pressable>
          </View> */}
          {/* <View
            style={{
              width: width(95),
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: width(1),
            }}
          >
            <SmallText
              size={4}
              color={AppColors.scndry}
              fontFamily={FontFamily.montserrat_SemiBold}
            >
              Opportunities
            </SmallText>
            <Pressable
              onPress={() => {
                navigation.navigate(ScreenNames.ALLOPPARTUNATIES, {
                  AllOppartunatiesDataaaa: oppartunityData,
                });
              }}
              style={{
                width: width(20),
                justifyContent: "space-between",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <SearchSVG width={15} height={15} color={AppColors.primary} />
              <SmallText
                size={4}
                color={AppColors.primary}
                fontFamily={FontFamily.montserrat_SemiBold}
              >
                Search
              </SmallText>
            </Pressable>
          </View> */}
        {/* </> */}

        {/* <View style={{ marginVertical: height(1) }}>
          <FlatList
            data={oppartunityData}
            // data={["1", "2", "3", "4", "5", "6", "7", "8", "9"]}
            keyExtractor={(i, n) => n}
            renderItem={RenderOppartunities}
            // onScroll={handleScrolllllll}
            loop
            // style={styles.flatlistFilterStyle}
            contentContainerStyle={[CommonStyles.paddingBottom_10]}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={() => {
              return (
                <View style={{ marginVertical: height(1) }}>
                  {loader ? (
                    <View style={styles.container}>
                      <ActivityIndicator
                        size="small"
                        color={AppColors.primary}
                      />
                      <Text style={styles.text}>Loading ...</Text>
                    </View>
                  ) : (
                    <View>
                    { oppartunityData&&  <Button
                      containerStyle={{ width: width(30) }}
                      title={"Load More"}
                      onPress={()=>{
                        setLoader(true)
                        getOpportunityData()
                      }}
                    />}
                      </View>
                   
                  )}
                </View>
              );
            }}
            // ListHeaderComponent={() => (
            //   <Text
            //     style={{
            //       textTransform: "uppercase",
            //       // alignSelf: "center",
            //       paddingVertical: height(1.5),
            //       marginLeft: width(2),
            //       fontSize: width(3.5),
            //       color: AppColors.black,
            //       fontFamily: FontFamily.inter_Bold,
            //       // marginBottom: height(2),
            //       // textDecorationLine: "underline",

            //       // fontWeight: "bold",
            //     }}
            //   >
            //     {`Conversation`}
            //   </Text>
            // )}
          />
        </View> */}

        {/* <PDFGenerator /> */}
        {/* <Text style={styles.title}>{userInfo?.name}</Text>
        <Text style={styles.title}>{userInfo?.email}</Text> */}
        {/* {pdfFile&&  */}
        {/*        
       <View style={{flex:1,backgroundColor:AppColors.green,alignItems:"center",justifyContent:"center"}}>
        <Pdf  trustAllCerts={false}
                    source={{uri:'http://samples.leanpub.com/thereactnativebook-sample.pdf',cache: true,}}
                    onLoadComplete={(numberOfPages,filePath) => {
                        console.log(`Number of pages: ${numberOfPages}`);
                    }}
                    onPageChanged={(page,numberOfPages) => {
                        console.log(`Current page: ${page}`);
                    }}
                    onError={(error) => {
                        console.log("ddddddd",error);
                    }}
                    onPressLink={(uri) => {
                        console.log(`Link pressed: ${uri}`);
                    }}
                    style={styles.pdf}/>
                    </View> */}
        {/* } */}

        {/* <Button title={"create  pdf "} onPress={() => generatePDF()} /> */}
        {/* <View style={CommonStyles.marginBottom_2}/>
        <Button
          title={"Logout"}
          onPress={() => {
            dispatch(setAppLoader(true));
            setTimeout(() => {
              dispatch(setUserMeta(null));
              dispatch(setIsLoggedIn(false));
              dispatch(setAppLoader(false));
            }, 600);
          }}
        /> */}
      </View>
      {/* </ScrollView> */}
      <ConfirmationModal
        yesBtnName="Logout"
        ref={confirmationModal}
        text={`Are you sure to logout?`}
        onNoPress={() => confirmationModal.current.hide()}
        onYesPress={() => {
          dispatch(setAppLoader(true));
          setTimeout(() => {
            dispatch(setUserMeta(null));
            AsyncStorage.clear();
            dispatch(setIsLoggedIn(false));
            dispatch(setAppLoader(false));
          }, 600);
          confirmationModal.current.hide();
        }}
      />
    </ScreenWrapper>
  );
}
