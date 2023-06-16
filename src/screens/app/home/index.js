import React, { useState } from "react";
import { View, Text,Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Button, HomeHeader, ScreenWrapper } from "~components";
import { setAppLoader } from "~redux/slices/config";
import { selectUserMeta, setIsLoggedIn, setUserMeta } from "~redux/slices/user";
import styles from "./styles";
// import PDFGenerator from "~utills/pdfGenerator";
import RNHTMLtoPDF from "react-native-html-to-pdf";
import Pdf from 'react-native-pdf';
import CommonStyles from "~utills/CommonStyles";
import { height, width } from "~utills/Dimension";
import AppColors from "~utills/AppColors";
import { SmallText } from "~components/texts";
import { FontFamily } from "~assets/fonts";
import SearchField from "~components/searchField";
import { welcomeImage } from "~assets/images";

// import { PDFGenerator } from "~utills/Methods";
export default function Home({ navigation, route }) {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserMeta);
  const [pdfFile,setPdfFile]=useState(null);
  console.log("pdf file is :",pdfFile);
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
  return (
    <ScreenWrapper headerUnScrollable={()=>{
      return(
        <View>
          <HomeHeader/>
        </View>
      )
    }}>
      <View style={styles.mainViewContainer}>
        <View style={{alignSelf:"flex-start",marginHorizontal:width(3.5) ,}}>
        <SmallText size={5} fontFamily={FontFamily.montserrat_Bold}>Hello ,Azhar Naseem</SmallText>
        <SmallText color={AppColors.darkGrey}>What do you want ?</SmallText>
        <SearchField placeholder={"Search..."} containerStyle={{marginVertical:height(1)}} />
        <Image source={welcomeImage} resizeMode="contain"  style={{width:width(93),height:width(30),}}/>
        </View>
        
      
        <Text style={styles.title}>HOME SCREEN</Text>
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
    </ScreenWrapper>
  );
}
