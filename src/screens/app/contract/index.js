import React, { useState,useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import RNHTMLtoPDF from "react-native-html-to-pdf";
import Pdf from "react-native-pdf";
import { Button, PageHeader, ScreenWrapper } from "~components";
import { setAppLoader } from "~redux/slices/config";
import { selectUserMeta, setIsLoggedIn, setRolesData, setUserMeta } from "~redux/slices/user";
import styles from "./styles";
import AppColors from "~utills/AppColors";
import { height, width } from "~utills/Dimension";
import { ContractImage, Logo, Tickets } from "~assets/images";
import { SmallText } from "~components/texts";
import { FontFamily } from "~assets/fonts";
import ScreenNames from "~routes/routes";

export default function Contract({ navigation, route }) {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserMeta);
  const rolesScreen=useSelector(setRolesData)
  // console.log("-----====",rolesScreen);
  const [pdfFile, setPdfFile] = useState(null);
  const a1 = "https://nodejs.org/static/images/logo.svg";

  // console.log("pdf file is :", pdfFile);
  let name = "Azhar";
  // useEffect(() => {
  //   // (async () => {
  
  //         getMoviesFromApi();
  
  //   // })();
  // }, []);
  const getMoviesFromApi = () => {
    return fetch('https://reactnative.dev/movies.json')
      .then(response => response.json())
      .then(json => {
        console.log("res=333===",json);
        return json.movies;
      }) 
      .catch(error => {
        console.error("=====6666",error);
      });
  };
  
  //   const generatePDF = async () => {
  //     try {
  //       // Define the HTML content to convert to PDF
  //       const htmlContent = `
  //       <!DOCTYPE html>
  // <html>
  // <head>
  //   <style>
  //     body {
  //       font-family: Arial, sans-serif;

  //     }
  //     .mainContainer{
  //       flex:1,
  //     //  display: flex;
  //     //    background-color:red
  //       // align-items: center;
  //     //  max-width: 100%;
  //     }

  //     .container {
  //       display: flex;
  //       flex-direction: row;
  //       max-width:100%;
  //       align-items: center;
  //       justify-content:space-between;

  //     }

  //     .company-info {
  //       margin-top:15px;
  //       display: flex;
  //       flex-direction: column;
  //       justify-content: center;
  //       max-width: 30%;
  //     }

  //     .company-info-text {
  //       margin: 1px 0;
  //       font-size: 10px;
  //     }

  //     .header {
  //       display: flex;
  //       align-items: center;
  //     }

  //     .quotation-heading {
  //       font-size: 20px;
  //       font-weight: bold;
  //       margin-left: 20px;
  //     }

  //     .header img {
  //       align-items: center;
  //     max-width: 100%;
  //      height: auto;

  //     }
  //     .document-container {
  //       margin-top:10px;
  //       background-color:"red";
  //       display: flex;
  //       justify-content: flex-end;
  //     }

  //     .document-info {
  //       margin-right: 20px;
  //       align-items:center;
  //       justify-content:center;

  //       margin-top:15px
  //     }

  //     .company-info-text {
  //       padding:3px;
  //       margin-bottom: 5px;
  //     }
  //     .box {

  //       padding: 10px;
  //       max-width: 200px; /* Adjust the value to your desired fixed width */
  //       border: 2px solid #40464D;
  //       background-color:  #BFBFBF;
  //       word-break: break-word;

  //     }

  //     .box-row {
  //       // background-color: green;
  //       // inline-size: 150px;
  //       // overflow-wrap: ;
  //       margin-bottom: 2px;
  //     }
  //     .header-container {
  //       margin-top:10px;
  //       // display: flex;
  //       // justify-content: space-between;
  //       background-color: darkblue;
  //       width: 100%;
  //     }

  //     .heading {
  //       font-size:15px;
  //       color: white;
  //       padding: 5px;
  //     }
  //     .heading-wrapper {
  //       display: flex;
  //       justify-content: space-between;
  //       width: 68%;
  //     }
  //     .main-container {
  //       margin-top:10px;
  //       display: flex;
  //       justify-content: space-between;
  //       width: 100%;
  //     }

  //     .inner-container {
  //       padding: 1px;
  //       width: 48%;
  //       // background-color:green
  //     }

  //     table {
  //       margin-top:10px;
  //       width: 100%;
  //       border-collapse: collapse;
  //     }

  //     th, td {
  //       padding: 10px;
  //       text-align: center;
  //       border: 1px solid #40464D;
  //     }

  //     th {
  //       background-color: #BFBFBF;
  //       color: black;
  //       font-weight:bold;
  //     }
  //     .custom-table {
  //       margin-top:20px;
  //       width: 100%;
  //       border-collapse: collapse;
  //     }

  //     .column-header, .column-data {
  //       padding: 10px;
  //       text-align: center;
  //       border: 1px solid #40464D;
  //     }

  //     .column-header {
  //       background-color: #BFBFBF;
  //       color: black;
  //     }

  //   </style>
  // </head>
  // <body>
  // <div class="mainContainer">
  //   <div class="container">
  //     <div class="company-info">
  //       <div class="company-info-text">AGRIUS IT (PVT) LTD</div>
  //       <div class="company-info-text">Office No. 509, 5th Floor, Gulberg Empire, Civic Center, Gulberg Green, Islamabad.</div>
  //       <div class="company-info-text">Tel No: +92 51 2362020</div>
  //       <div class="company-info-text">Email: info@agriusit.com</div>
  //       <div class="company-info-text">Website: www.agriusit.com</div>
  //     </div>
  //     <div class="header">
  //       <img src="https://lh3.googleusercontent.com/p/AF1QipPSI5wGdZMdCQ4XMo7hr-blFoaczv6TOXK2T5bP=s1360-w1360-h1020" alt="Company Logo" width="150" height="150">
  //     </div>
  //     <div class="quotation-heading">QUOTATION</div>
  //   </div>

  // <div class="document-container">
  //   <div class="document-info">
  //     <div class="company-info-text">Document No</div>
  //     <div class="company-info-text">Document Date</div>
  //     <div class="company-info-text">Quote Subject</div>
  //   </div>
  //   <div class="box">
  //     <div class="box-row">OP-PK-01-0109</div>
  //     <div class="box-row">10/02/2021</div>
  //     <div class="box-row">Re:Required Prices:Hard Devic</div>
  //   </div>
  // </div>

  // <div class="header-container">
  //   <div class="heading-wrapper">
  //      <h1 class="heading">Customer</h1>
  //     <h1 class="heading">Delivery Address</h1>
  //   </div>
  // </div>

  // <div class="main-container">
  //   <div class="inner-container">
  //      <div class="company-info-texts"><b>Customer:</b>Premier Star Technology (Private) Limited </div>
  //      <div class="company-info-texts"><b>Atn:</b>Muhammad Zaheed Khan</div>
  //      <div class="company-info-texts"><b>Address:</b>Suite No. 305, 3rd Floor, Shah Tower, Main Double Road, E-11/2, Islamabad, Pakistan</div>
  //   </div>
  //   <div class="inner-container">
  //         <div class="company-info-texts"><b>Country:</b>Pakistan</div>
  //         <div class="company-info-texts"><b>City:</b>Islamabad</div>

  //   </div>
  // </div>

  // <div class="main-container">
  //   <div class="inner-container">
  //      <div class="company-info-texts"><b>Contact No:</b>+92-51-230 4998 </div>
  //      <div class="company-info-texts"><b>Email:</b>zaheed@pstechnology.ae</div>

  //   </div>
  //   <div class="inner-container">
  //         <div class="company-info-texts"><b>* LT = Lead Time (Working Days)</b></div>
  //         <div class="company-info-texts"><b>Quote Validity = 7 Days or while stock last</b></div>

  //   </div>
  // </div>

  // <table>
  //   <tr>
  //     <th>Sales Person</th>
  //     <th>Email</th>
  //     <th>Payment Terms</th>
  //     <th>INCOTERMS</th>
  //     <th>CURRENCY</th>
  //   </tr>
  //   <tr>
  //     <td>MUHAMMAD FAKHAR ALI</td>
  //     <td>m.fakhar@agriusit.com</td>
  //     <td>Pre-Payment</td>
  //     <td>DDP</td>
  //     <td>US$</td>
  //   </tr>
  // </table>

  // <table class="custom-table">
  // <tr>
  //   <th class="column-header">QTY</th>
  //   <th class="column-header">ITEM/PART NO</th>
  //   <th class="column-header">DESCRIPTION</th>
  //   <th class="column-header">LT *</th>
  //   <th class="column-header">WARRANTY<br>(MONTH)</th>
  //   <th class="column-header">STATE</th>
  //   <th class="column-header">UNIT PRICE</th>
  //   <th class="column-header">TOTAL</th>
  // </tr>
  // <tr>
  //   <td class="column-data">1.00</td>
  //   <td class="column-data">0M40TH</td>
  //   <td class="column-data">DELL 8TB, SAS, 12GBPS, 7.2K RPM</td>
  //   <td class="column-data">16-18</td>
  //   <td class="column-data">3</td>
  //   <td class="column-data">Refurb</td>
  //   <td class="column-data">514.80</td>
  //   <td class="column-data">514.80</td>
  // </tr>
  // <tr>
  //   <td class="column-data">1.00</td>
  //   <td class="column-data">0GWFRY</td>
  //   <td class="column-data">DELL 300GB, SAS, 12GBPS, 10K</td>
  //   <td class="column-data">16-18</td>
  //   <td class="column-data">3</td>
  //   <td class="column-data">Refurb</td>
  //   <td class="column-data">387.08</td>
  //   <td class="column-data">387.08</td>
  // </tr>
  // </table>

  // <div class="document-container">
  //   <div class="document-info">
  //     <div class="company-info-text">Sub Total</div>
  //     <div class="company-info-text">GST/SST</div>
  //     <div class="company-info-text">Total</div>
  //   </div>
  //   <div class="box">
  //     <div class="box-row">1,933,33</div>
  //     <div class="box-row">123.00</div>
  //     <div class="box-row">3,333,3.00</div>
  //   </div>
  // </div>

  //   </div>
  // </body>
  // </html>

  //       `;
  //       //  const htmlContent = `<h1>Hello, World!</h1>`; // Replace with your HTML content

  //       // Generate PDF options
  //       const options = {
  //         html: htmlContent,
  //         fileName: "example",
  //         directory: "Documents",
  //       };

  //       // Generate the PDF using react-native-html-to-pdf
  //       const pdf = await RNHTMLtoPDF.convert(options);
  //       setPdfFile(pdf?.filePath);
  //       console.log("PDF file generated:", pdf.filePath);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  return (
    <ScreenWrapper
      scrollEnabled
      headerUnScrollable={() => {
        return (
          <View>
            <PageHeader
              pageTitle="Contract & Tickets"
              onPressBack={() => navigation.goBack()}
            />
          </View>
        );
      }}
    >
      <View style={styles.mainViewContainer}>
        <TouchableOpacity
          style={styles.contractBoxStyle}
          onPress={() => navigation.navigate(ScreenNames.CONTRACTSCREEN)}
        >
          <Image
            source={ContractImage}
            style={styles.imageStyle}
            resizeMode="contain"
          />
          <SmallText
            size={5}
            fontFamily={FontFamily.montserrat_Bold}
            color={AppColors.scndry}
          >
            Contract
          </SmallText>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.contractBoxStyle}
          onPress={() => navigation.navigate(ScreenNames.TICKETSSCREEN)}
        >
          <Image
            source={Tickets}
            style={styles.imageStyle}
            resizeMode="contain"
          />
          <SmallText
            size={5}
            fontFamily={FontFamily.montserrat_Bold}
            color={AppColors.scndry}
          >
            Tickets
          </SmallText>
        </TouchableOpacity>

        {/* <View
          style={{
            height:height(70),
            width:width(100),
         
            alignItems: "center",
            justifyContent: "center",
          }}
        >
         {pdfFile !==null&&<Pdf
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
          />}
        </View> */}

        {/* <Button containerStyle={styles.btnStyle} title={"create  pdf "} onPress={() => generatePDF()} /> */}

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
