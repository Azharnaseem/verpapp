import React, { useRef, useState } from "react";
import { View, Text, Image, FlatList, ScrollView } from "react-native";
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
import { welcomeImage } from "~assets/images";
import ScreenNames from "~routes/routes";

// import { PDFGenerator } from "~utills/Methods";
export default function Home({ navigation, route }) {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserMeta);
  const [pdfFile, setPdfFile] = useState(null);
  const [currentItemIndex, setCurrentItemIndex] = useState(null);
  console.log("==================",currentItemIndex);
  const confirmationModal = useRef();
  const flatlistRef = useRef(null);
  const screenScroll = useRef(null);
  const handleScrolllllll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const itemHeight = height(8) /* specify the height of each item */;
    const index = Math.floor(offsetY / itemHeight);
    setCurrentItemIndex(index);
  };
  const scrollToIndex = (index) => {
    scrollViewRef.current?.scrollToPosition(0, index * itemHeight, true);
  };
  const data = [
    { name: "Azhar naseem", cname: "Agriust It", type: "it sprt" },
    { name: "Azhar mughal", cname: "Agriust It", type: "it sprt" },
    { name: "naseem", cname: "Agriust It", type: "it sprt" },
    { name: "Azhar em", cname: "Agriust It", type: "it sprt" },
    { name: "Azhar ", cname: "Agriust It", type: "it sprt" },
  ];
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
      console.log("PDF file generated:", pdf.filePath);
    } catch (error) {
      console.log(error);
    }
  };
  const RenderLeads = ({ item, index }) => {
    return (
      <View style={{ marginHorizontal: width(1) }}>
        <LeadsOppComponent
          containerViewStyle={{ width: width(70) }}
          companyName={item?.cname}
          leadOwner={item?.name}
          type={item?.type}
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
  const handleEndReached = () => {
    console.log("end reached");
    let tepmDta = data;
    tepmDta.push();
    // flatlistRef.current.scrollToIndex({ animated: true, index: 0 });
  };
  
  const itemWidth = width(51); // Replace with the actual item width
 const [currentIndex, setCurrentIndex] = useState(0);
  const handleScroll = (event) => {
    console.log("sssssssssssss");
    const scrollOffset = event.nativeEvent.contentOffset.x;
    // const { contentOffset, layoutMeasurement } = event.nativeEvent;
    const index = Math.floor(scrollOffset / itemWidth);
    // const index = Math.floor(scrollOffset / itemWidth);
    // const index = Math.floor(contentOffset.x / layoutMeasurement);
    // console.log(index,"===",data.length);
      if (index === data.length) {
      console.log("callled if ");
      // Reached the last item, scroll back to the first item
      flatlistRef.current.scrollToIndex({ animated: false, index: 0 });
    }
    setCurrentIndex(index);
  };
  const getItemLayout = (_, index) => ({
    length: itemWidth,
    offset: itemWidth * index,
    index,
  });

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

    return (
      <View style={{ marginVertical: width(1) }}>
        <LeadsOppComponent
          showLead={false}
          onPress={() => {
            navigation.navigate(ScreenNames.LEADDETAILINFO, {
              id: item?.companyName,
              name: "Opportunity Detail Info",
            });
          }}
        />
      </View>
    );
  };
  const hhandleScroll = (event) => {
    const { contentOffset } = event.nativeEvent;
    const scrollX = contentOffset.x; // Horizontal scroll position
    const scrollY = contentOffset.y; // Vertical scroll position
    
    console.log('Scroll position:', { scrollX, scrollY });
  };

  return (
    
    <ScreenWrapper
    
      // scrollEnabled
      ref={screenScroll}
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
      <ScrollView 
      accessibilityRole=""
      onScroll={hhandleScroll}
      showsVerticalScrollIndicator={false}>
      <View style={styles.mainViewContainer}>
       {currentItemIndex<=4?(
        <>
       <View style={{ alignSelf: "flex-start", marginHorizontal: width(3.5) }}>
          <SmallText
            size={5}
            color={AppColors.scndry}
            fontFamily={FontFamily.montserrat_Bold}
          >
            Hello ,Azhar Naseem
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
          <View
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
            <SmallText
              onPress={() => {
                navigation.navigate(ScreenNames.AllLEADS);
              }}
              size={4}
              color={AppColors.primary}
              fontFamily={FontFamily.montserrat_SemiBold}
            >
              View All
            </SmallText>
          </View>
        </View>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <FlatList
            ref={flatlistRef}
            data={data}
            keyExtractor={(i, n) => n}
            renderItem={RenderLeads}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
          
            getItemLayout={getItemLayout}
            initialScrollIndex={currentIndex}
            snapToInterval={itemWidth}
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
            pagingEnabled={true}
            // snapToInterval={width(10)}
          />
        </View>
        <View
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
            Opportunity
          </SmallText>
          <SmallText
            onPress={() => {
              navigation.navigate(ScreenNames.ALLOPPARTUNATIES);
            }}
            size={4}
            color={AppColors.primary}
            fontFamily={FontFamily.montserrat_SemiBold}
          >
            View All
          </SmallText>
        </View>
        </>):(<View><SmallText>this happen</SmallText></View>)}
        <View style={{backgroundColor:"red", marginVertical: height(1), }}>
          <FlatList
            data={["1", "2", "3", "5","6","7","8","9","10","11","12","13","14","15"]}
            keyExtractor={(i, n) => n}
            renderItem={RenderOppartunities}
            // onScroll={handleScrolllllll}
            loop
            // style={styles.flatlistFilterStyle}
            contentContainerStyle={[CommonStyles.paddingBottom_5]}
            showsVerticalScrollIndicator={false}
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
        </View>

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
      </ScrollView>
      <ConfirmationModal
        yesBtnName="Logout"
        ref={confirmationModal}
        text={`Are you sure to logout?`}
        onNoPress={() => confirmationModal.current.hide()}
        onYesPress={() => {
          dispatch(setAppLoader(true));
          setTimeout(() => {
            dispatch(setUserMeta(null));
            dispatch(setIsLoggedIn(false));
            dispatch(setAppLoader(false));
          }, 600);
          confirmationModal.current.hide();
        }}
      />
    </ScreenWrapper>
  );
}
