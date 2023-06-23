import React, { useState } from "react";
import { View, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import RNHTMLtoPDF from "react-native-html-to-pdf";
import Pdf from "react-native-pdf";
import { Button, ScreenWrapper } from "~components";
import { setAppLoader } from "~redux/slices/config";
import { selectUserMeta, setIsLoggedIn, setUserMeta } from "~redux/slices/user";
import styles from "./styles";
import AppColors from "~utills/AppColors";
import { height, width } from "~utills/Dimension";
import { Logo } from "~assets/images";
export default function Contract({ navigation, route }) {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserMeta);
  const [pdfFile, setPdfFile] = useState(null);
  const a1 = 'https://nodejs.org/static/images/logo.svg';
    
  console.log("pdf file is :", pdfFile);
  let name="Azhar"
  const generatePDF = async () => {
    try {
      // Define the HTML content to convert to PDF
      const htmlContent = `
      <!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      
    }
    .mainContainer{
      flex:1,
    //  display: flex;
    //    background-color:red
      // align-items: center;
    //  max-width: 100%;
    }

    .container {
      display: flex;
      flex-direction: row;
      max-width:100%;
      align-items: center;
      justify-content:space-between;
     
  
      
    }

    .company-info {
      margin-top:15px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      max-width: 30%;
    }

    .company-info-text {
      margin: 1px 0;
      font-size: 10px;
    }

    .header {
      display: flex;
      align-items: center;
    }

    .quotation-heading {
      font-size: 20px;
      font-weight: bold;
      margin-left: 20px;
    }

    .header img {
      align-items: center;
       max-width: 100%;
     height: auto;
    
    }
    .decumentInfo{
      max-width:20%;
      display:flex;
      background-color:red;
      align-items:flex-end;
      flex-direction:row;
    }
    .box {
      max-width:10%
      border: 1px solid black;
      background-color: gray;
      padding: 10px;
    }

    .box-row {
      margin-bottom: 2px;
    }
  </style>
</head>
<body>
<div class="mainContainer">
  <div class="container">
    <div class="company-info">
      <div class="company-info-text">AGRIUS IT (PVT) LTD</div>
      <div class="company-info-text">Office No. 509, 5th Floor, Gulberg Empire, Civic Center, Gulberg Green, Islamabad.</div>
      <div class="company-info-text">Tel No: +92 51 2362020</div>
      <div class="company-info-text">Email: info@agriusit.com</div>
      <div class="company-info-text">Website: www.agriusit.com</div>
    </div>
    <div class="header">
      <img src="https://lh3.googleusercontent.com/p/AF1QipPSI5wGdZMdCQ4XMo7hr-blFoaczv6TOXK2T5bP=s1360-w1360-h1020" alt="Company Logo" width="100" height="100">
    </div>
    <div class="quotation-heading">QUOTATION</div>
  </div>
  <div class="decumentInfo">
    <div>
      <div class="company-info-text">Decument No</div>
      <div class="company-info-text">Decument Date</div>
      <div class="company-info-text">Quote Subject</div>
    </div>
    <div class="box">
      <div class="box-row">Azhar</div>
      <div class="box-row">Waqr</div>
      <div class="box-row">Murtaza</div>
    </div>
  </div>
  </div>
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
    <ScreenWrapper scrollEnabled>
      <View style={styles.mainViewContainer}>
        <Text style={styles.title}>Contract SCREEN</Text>
        <View
          style={{
            height:height(70),
            width:width(100),
            // flex: 1,
            backgroundColor: AppColors.pink,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Pdf
            trustAllCerts={false}
            source={{
              uri:pdfFile,
              cache: true,
            }}
            onLoadComplete={(numberOfPages, filePath) => {
              console.log(`Number of pages: ${numberOfPages}`);
            }}
            onPageChanged={(page, numberOfPages) => {
              console.log(`Current page: ${page}`);
            }}
            onError={(error) => {
              console.log("ddddddd", error);
            }}
            onPressLink={(uri) => {
              console.log(`Link pressed: ${uri}`);
            }}
            style={styles.pdf}
          />
        </View>

         <Button containerStyle={styles.btnStyle} title={"create  pdf "} onPress={() => generatePDF()} />

        {/* <Button
          title={"Logout"}
          onPress={() => {
            dispatch(setAppLoader(true));
            setTimeout(() => {
              dispatch(setUserMeta(null));
              dispatch(setIsLoggedIn(false));
              dispatch(setAppLoader(false));
            }, 600);
          }}
        />  */}
      </View>
    </ScreenWrapper>
  );
}
