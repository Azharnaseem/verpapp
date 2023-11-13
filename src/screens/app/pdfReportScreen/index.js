import React, { useEffect, useState } from "react";
import { View, Text, PermissionsAndroid, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import RNHTMLtoPDF from "react-native-html-to-pdf";
import Pdf from "react-native-pdf";
import { Button, PageHeader, ScreenWrapper } from "~components";
import { setAppLoader } from "~redux/slices/config";
import { selectUserMeta, setIsLoggedIn, setUserMeta } from "~redux/slices/user";
import styles from "./styles";
import AppColors from "~utills/AppColors";
import { height, width } from "~utills/Dimension";
import { Logo } from "~assets/images";
import { ActivityIndicator } from "react-native";
import Share from "react-native-share";
// import RNFetchBlob from "rn-fetch-blob";
import { set } from "react-native-reanimated";
import axios from "axios";
import dayjs from "dayjs";
export default function PdfReportScreen({ navigation, route }) {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserMeta);
  var   stringify=JSON.parse(userInfo);
  const [pdfFile, setPdfFile] = useState(null);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [pdfData, setPdfData] = useState(null);
  const [subTotal, setSubTotal] = useState(null);
  console.log("============dss===============", totalPage);


  var stringify = JSON.parse(userInfo);
  console.log("-----------------eee--->>",stringify?.DataBaseName);
  const a1 = "https://nodejs.org/static/images/logo.svg";

  // console.log("pdf file is :", pdfFile);
  let name = "Azhar";

  useEffect(() => {
    getPdfData();
    createPDF();
  }, [pdfData != null]);
  const subTotalCalculate = () => {
    let total = 0;
    pdfData?.map((i) => {
      // console.log("subItem============", i?.qty * i?.price);
      total += i?.qty * i?.price;
    });
    // console.log("===============__>>>>", total);
    /// setSubTotal(total);
    return total;
    // console.log("callllleddd ==========>", total);
  };
  // console.log("++++++++++++++++++",subTotalCalculate());

  const createPDF = async () => {
    const {
      companyName,
      customerName,
      address1,
      phone,
      email1,
      countryName,
      city,
      email,
      taxAmount,
      opportunityName,
      docNo,
      docDate,
      fullname,
      partNo,
      title,
      incoTerms,
      currency_code,
    } = pdfData[0];
    // console.log("=======================iteeeeeeeeeeeeeeeem",companyName,customerName,address1,phone,email1);

    // const tableData = pdfData
    //   ? pdfData
    //   : [
    //       {
    //         column1: "1.00",
    //         column2: "0M40TH",
    //         column3: "DELL 8TB, SAS, 12GBPS, ",
    //         column4: "16-18",
    //         column5: "3",
    //         column6: "Refurb",
    //         column7: "122.99",
    //         column8: "11,213,11",
    //       },
    //       {
    //         column1: "1.00",
    //         column2: "0GWFRY",
    //         column3: "3Refurb 263.35DELL 300GB, ",
    //         column4: "16-18",
    //         column5: "3",
    //         column6: "Refurb",
    //         column7: "208.21",
    //         column8: "1212.99",
    //       },
    //       {
    //         column1: "1.00",
    //         column2: "O393NFJ",
    //         column3: "HP 1TB, 7200RPM,",
    //         column4: "16-18",
    //         column5: "3",
    //         column6: "Refurb",
    //         column7: "289.00",
    //         column8: "6279,21",
    //       },
    //       {
    //         column1: "1.00",
    //         column2: "O393NFJ",
    //         column3: "HP 1TB, 7200RPM,",
    //         column4: "16-18",
    //         column5: "3",
    //         column6: "Refurb",
    //         column7: "289.00",
    //         column8: "6279,21",
    //       },
    //       {
    //         column1: "1.00",
    //         column2: "O393NFJ",
    //         column3: "HP 1TB, 7200RPM,",
    //         column4: "16-18",
    //         column5: "3",
    //         column6: "Refurb",
    //         column7: "289.00",
    //         column8: "6279,21",
    //       },
    //       {
    //         column1: "1.00",
    //         column2: "O393NFJ",
    //         column3: "HP 1TB, 7200RPM,",
    //         column4: "16-18",
    //         column5: "3",
    //         column6: "Refurb",
    //         column7: "289.00",
    //         column8: "6279,21",
    //       },
    //       // { column1: '1.00', column2: 'O393NFJ', column3: 'HP 1TB, 7200RPM,SAS, FW HPD9', column4: '16-18', column5: '3', column6: 'Refurb',column7: '289.00', column8: '6279,21', },
    //     ];
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
      color:red,
    }

    .header {
      display: flex;
      align-items: center;
    }

    .quotation-heading {
      font-size: 36px;
      font-weight: bold;
      margin-left: 20px;
      color:#002157;
      font-family: 'Bahnschrift', sans-serif;
    }

    .header img {
      align-items: center;
      max-width: 100%;
      height: auto;
    
    }
    .document-container {
      margin-top:10px;
      background-color:"red";
      display: flex;
      justify-content: flex-end;
    }
    
    .document-info {
      margin-right: 20px;
      align-items:center;
      justify-content:center;
      margin-top:8.5px
    }
    
    .company-info-text {
      padding:1px;
      margin-bottom: 3px;
      font-size: 10px;
      // font-weight: bold;
      font-family: 'Bahnschrift', sans-serif;
      // color:red
    } 
    .company-name-text {
      padding:1px;
      margin-bottom: 3px;
      font-size: 16px;
      font-weight: bold;
      color:#002157;
      font-family: 'Bahnschrift', sans-serif;
      
    }
    .company-info-outbox {
      padding:1px;
      margin-bottom: 3px;
      font-size: 9.5px;
       font-weight: bold;
      // color:#002157;
      font-family: 'Bahnschrift', sans-serif;
    }
    .company-info-texts{
      padding:1px;
      margin-bottom: 3px;
      font-size: 9.5px;
      // font-weight: bold;
      // color:#002157;
      font-family: 'Bahnschrift', sans-serif;
    }
    .company-info-lead {
      padding:1px;
      margin-bottom: 3px;
      font-size:8px;
      // font-weight: bold;
      // color:#002157;
      font-family: 'Bahnschrift', sans-serif;
    }
    .box {
    
      padding: 10px;
      max-width: 200px; /* Adjust the value to your desired fixed width */
      border: 2px solid #808080 ;
     
      background-color:  #E8E8E8;
      word-break: break-word;

    }

    .box-row {
      // background-color: green;
      // inline-size: 150px;
      // overflow-wrap: ;
      font-size:9.5px;
      // color: white;
      margin-bottom: 2px;
    }
    .header-container {
      margin-top:10px;
      // display: flex;
      // justify-content: space-between;
      background-color: #002157;
      width: 100%;
    }
    
    .heading {
      font-size:9.5px;
      font-family: 'Bahnschrift', sans-serif;
      font-weight: bold;
      color: white;
      padding: 0px;
    }
    .headingg {
      font-size:9.5px;
      font-family: 'Bahnschrift', sans-serif;
      font-weight: bold;
      color: white;
      padding: 0px;
      padding-left:5px;
    }
    .heading-wrapper {
      display: flex;
      justify-content: space-between;
      width: 62%;
    }
    .main-container {
      margin-top:10px;
      display: flex;
      justify-content: space-between;
      width: 100%;
    }
    
    .inner-container {
      padding: 1px;
      width: 48%;
      // background-color:green
    }
    
    table {
      margin-top:10px;
      width: 100%;
      border-collapse: collapse;
    }
    
    th, td {
      padding: 6px;
      text-align: center;
      border: 1px solid #808080;
      font-size:9px;
      font-family: 'Bahnschrift', sans-serif;
      
    }
    
    th {
      background-color: #E8E8E8;
      color: black;
      font-size:9px;
      font-family: 'Bahnschrift', sans-serif;
      font-weight: bold;
    }
    .custom-table {
      margin-top:20px;
      width: 100%;
      border-collapse: collapse;
    }
    
    .column-header, .column-data {
      padding: 2px;
      text-align: center;
      border: 1px solid #808080;
      color:red
      font-size:9px;
      font-family: 'Bahnschrift', sans-serif;
   
      
    }
    
    .column-header {
      background-color: #E8E8E8;
      font-size:9px;
      color:black;
      font-family: 'Bahnschrift', sans-serif;
     
    }
    .header {
      background-color:red;
    }
    
    
  </style>
</head>
<body>
<div class="mainContainer">
  <div class="container">
    <div class="company-info">
      <div class="company-name-text">AGRIUS IT (PVT) LTD</div>
      <div class="company-info-text">Office No. 509, 5th Floor, Gulberg Empire, Civic Center, Gulberg Green, Islamabad.</div>
      <div class="company-info-text">Tel No: +92 51 2362020</div>
      <div class="company-info-text">Email: info@agriusit.com</div>
      <div class="company-info-text">Website: www.agriusit.com</div>
    </div>
    <div class="header">
      <img src="https://lh3.googleusercontent.com/p/AF1QipPSI5wGdZMdCQ4XMo7hr-blFoaczv6TOXK2T5bP=s1360-w1360-h1020" alt="Company Logo" width="180" height="20" >
    </div>
    <div class="quotation-heading">QUOTATION</div>
  </div>

<div class="document-container">
  <div class="document-info">
    <div class="company-info-outbox">Document No</div>
    <div class="company-info-outbox">Document Date</div>
    <div class="company-info-outbox">Quote Subject</div>
  </div>
  <div class="box">
    <div class="box-row">${docNo ? docNo : "Nill"}</div>
    <div class="box-row">${
      docDate ? dayjs(docDate).format("DD/MM/YYYY") : "Nill"
    }</div>
    <div class="box-row">${opportunityName ? opportunityName : "Nill"}</div>
  </div>
</div>

<div class="header-container">
  <div class="heading-wrapper">
     <h1 class="headingg">Customer</h1>
    <h1 class="heading">Delivery Address</h1>
  </div>
</div>


<div class="main-container">
  <div class="inner-container">
     <div class="company-info-texts"><b>Customer:</b>${
       companyName ? companyName : "Nill"
     } </div>
     <div class="company-info-texts"><b>Atn:</b>${
       customerName ? customerName : "Nill"
     }</div>
     <div class="company-info-texts"><b>Address:</b>${
       address1 ? address1 : "Nill"
     }</div>
  </div>
  <div class="inner-container">
        <div class="company-info-texts"><b>Country:</b>${
          countryName ? countryName : "Nill"
        }</div>
        <div class="company-info-texts"><b>City:</b>${
          city ? city : "Nill"
        }</div>
       
  </div>
</div>

<div class="main-container">
  <div class="inner-container">
     <div class="company-info-texts"><b>Contact No:</b>${
       phone ? phone : "Nill"
     } </div>
     <div class="company-info-texts"><b>Email:</b>${
       email1 ? email1 : "Nill"
     }</div>
     
  </div>
  <div class="inner-container">
        <div class="company-info-lead"><b>* LT = Lead Time (Working Days)</b></div>
        <div class="company-info-lead"><b>Quote Validity = 7 Days or while stock last</b></div>
       
  </div>
</div>

<table>
  <tr>
    <th>Sales Person</th>
    <th>Email</th>
    <th>Payment Terms</th>
    <th>INCOTERMS</th>
    <th>CURRENCY</th>
  </tr>
  <tr>
    <td>${fullname ? fullname : "Nill"}</td>
    <td>${email ? email : "Nill"}</td>
    <td>${title ? title : "Nill"}</td>
    <td>${incoTerms ? incoTerms : "Nill"}</td>
    <td>${currency_code ? currency_code : "Nill"}</td>
  </tr>
</table>
   



<table class="custom-table">
  <th class="column-header">QTY</th>
  <th class="column-header">ITEM/PART NO</th>
  <th class="column-header">DESCRIPTION</th>
  <th class="column-header">LT *</th>
  <th class="column-header">WARRANTY<br>(MONTH)</th>
  <th class="column-header">STATE</th>
  <th class="column-header">UNIT PRICE</th>
  <th class="column-header">TOTAL</th>

${pdfData
  ?.map(
    (rowData) => `
   <tbody>
      <td>${rowData.qty}</td>
      <td>${rowData.partNo}</td>
      <td>${rowData.description}</td>
      <td>${rowData.leadTime}</td>
      <td>${rowData.warranty}</td>
      <td>${rowData.status}</td>
      <td>${rowData.price.toFixed(2)}</td>
      <td>${(rowData.price * rowData.qty).toFixed(2)}</td>
      </tbody>
  `
  )
  .join("")}



</table>



<div class="document-container">
  <div class="document-info">
    <div class="company-info-outbox">Sub Total</div>
    <div class="company-info-outbox">${stringify?.DataBaseName==='AIT Pak'?"GST/SST":"VAT"}</div>
    <div class="company-info-outbox">Total</div>
  </div>
  <div class="box">
    <div class="box-row">${subTotalCalculate().toFixed(2)}</div>
    <div class="box-row">${((subTotalCalculate() * taxAmount) % 100).toFixed(
      2
    )}</div>
    <div class="box-row">${(
      subTotalCalculate() +
      ((subTotalCalculate() * taxAmount) % 100)
    ).toFixed(2)}</div>
  </div>
</div>


  </div>
 
  <script src="script.js"></script>
</body>
</html>

      `;

    try {
      const options = {
        html: htmlContent,
        fileName: "Report",
        directory: "Documents",
      };
      // subTotalCalculate();
      // console.log("=========11===========",subTotal);
      // if(subTotal !=null){
      const pdf = await RNHTMLtoPDF.convert(options);
      // console.log("PDF generated", pdf?.numberOfPages);
      // setTotalPage(pdf?.numberOfPages);
      setPdfFile(pdf?.filePath);
      // }
    } catch (error) {
      console.error("Error generating PDF", error);
    }
  };
  const getPdfData = async () => {
    try {
      dispatch(setAppLoader(true));
      let res = await axios
        .get(
          `http://192.168.0.220:8080/api/Opportunity/GetOpportunityHardwareReport/OpportunityHardwareReport?Databasename=${stringify?.dbName}&OpportunityId=${route?.params?.opportunityId}`
        )
        .catch((error) => {
          dispatch(setAppLoader(false));
          console.log("error11111 in list by main catagory", error);
        });
      // console.log("========..............api>>>>==== pdfffffff", res);
      if (res != null) {
        setPdfData(res);
        dispatch(setAppLoader(false));
      } else {
        console.log("data is nilllllll");
        dispatch(setAppLoader(false));
      }
    } catch (error) {
      console.log("error is  lear getting", error);
      dispatch(setAppLoader(false));
    }
  };
  // const requestStoragePermission = async () => {
  //   try {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  //       {
  //         title: "VERP App Storage Permission",
  //         message:
  //           "VERP App needs access to your camera " +
  //           "so you can take awesome PDF.",
  //         buttonNeutral: "Ask Me Later",
  //         buttonNegative: "Cancel",
  //         buttonPositive: "OK",
  //       }
  //     );
  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       downloadPdf();
  //       // console.log("You can Download the Pdf");
  //     } else {
  //       console.log("File permission denied");
  //     }
  //   } catch (err) {
  //     console.warn(err);
  //   }
  // };
  // const downloadPdf = async () => {
  //   dispatch(setAppLoader(true));
  //   const { config, fs } = RNFetchBlob;
  //   const fileDir = fs.dirs.DownloadDir;
  //   const date = new Date();

  //   config({
  //     // add this option that makes response data to be stored as a file,
  //     // this is much more performant.
  //     fileCache: true,
  //     addAndroidDownloads: {
  //       useDownloadManager: true,
  //       notification: true,
  //       path:
  //         fileDir +
  //         "/dowmload_" +
  //         Math.floor(date.getDate() + date.getSeconds() / 2) +
  //         ".pdf",
  //       description: "File DownlLoad",
  //     },
  //   })
  //     .fetch("GET", "https://www.africau.edu/images/default/sample.pdf", {
  //       //some headers ..
  //     })
  //     .then((res) => {
  //       dispatch(setAppLoader(false));
  //       // the temp file path
  //       alert("File DownlLoaded Successfully");
  //       // console.log("The file saved to ", res.path());
  //     });
  // };
  // const sharePDf = () => {
  //   Share.open(options)
  //     .then((res) => {
  //       // console.log("===================",res);
  //     })
  //     .catch((err) => {
  //       err && console.log(err);
  //     });
  // };

  return (
    <ScreenWrapper
      // scrollEnabled
      headerUnScrollable={() => {
        return (
          <View>
            <PageHeader
              containerViewStyle={{ marginbottom: height(4) }}
              pageTitle="PDF Report"
              onPressBack={() => navigation.goBack()}
            />
            {/* <SearchField onPressBar={()=>navigation.navigate(ScreenNames.SEARCHSCREEN)} editable={false} placeholder={"Search Leads"} containerStyle={{marginVertical:height(1)}} /> */}
          </View>
        );
      }}
    >
      <View style={styles.mainViewContainer}>
        <View
          style={{
            // height:height(70),
            // width:width(100),
            // // flex: 1,
            // backgroundColor: AppColors.red,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {pdfFile === null ? (
            <ActivityIndicator size="large" color={AppColors.primary} />
          ) : (
            <Pdf
              // page={}
              trustAllCerts={false}
              source={{
                uri: pdfFile,
                cache: true,
              }}
              onLoadComplete={(numberOfPages, filePath) => {
                console.log(`Number of pages=========: ${numberOfPages}`);
              }}
              onPageChanged={(page, numberOfPages) => {
                console.log(`Current page: ${page} ${numberOfPages}`);
                // setCurrentPage(page);
                // setTotalPage(numberOfPages)
              }}
              onError={(error) => {
                console.log("ddddddd pdf rrr", error);
              }}
              onPressLink={(uri) => {
                // console.log(`Link pressed: ${uri}`);
              }}
              style={styles.pdf}
              spacing={10}
            />
          )}
        </View>

        <View
          style={{
            width: width(80),
            // flexDirection: "row",
            // justifyContent: "space-between",
          }}
        >
          {/* <Button
            containerStyle={styles.btnStyle}
            title={"Download"}
            onPress={() => {
              pdfFile !== null && requestStoragePermission();
            }}
          /> */}
          <Button
            containerStyle={styles.btnStyle}
            title={"Share Report"}
            onPress={() => {
              const options = {
                url: `file://${pdfFile}`,
                message: "PDF Report",
              };
              Share.open(options);
            }}
          />
        </View>

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
