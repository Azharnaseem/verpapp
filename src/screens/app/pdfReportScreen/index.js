import React, { useEffect, useState } from "react";
import { View, Text, PermissionsAndroid ,Alert} from "react-native";
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
// import Share from 'react-native-share';
import RNFetchBlob from "rn-fetch-blob";
import { set } from "react-native-reanimated";
export default function PdfReportScreen({ navigation, route }) {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserMeta);
  const [pdfFile, setPdfFile] = useState(null);
  const a1 = "https://nodejs.org/static/images/logo.svg";

  console.log("pdf file is :", pdfFile);
  let name = "Azhar";
  // Sample data in an array of objects

  // Get the table body element
  // document.addEventListener('DOMContentLoaded', function() {
  //   const tableBody = document.getElementById('tableBody');

  //   // Sample data in an array of objects
  //   const data = [
  //     { column1: 'Value 1', column2: 'Value 2', column3: 'Value 3', column4: 'Value 4', column5: 'Value 5', column6: 'Value 6',column7: 'Value 7', column8: 'Value 8' },
  //     { column1: 'Value 1', column2: 'Value 2', column3: 'Value 3', column4: 'Value 4', column5: 'Value 5', column6: 'Value 6',column7: 'Value 7', column8: 'Value 8' },
  //     { column1: 'Value 1', column2: 'Value 2', column3: 'Value 3', column4: 'Value 4', column5: 'Value 5', column6: 'Value 6',column7: 'Value 7', column8: 'Value 8' },
  //   ];

  //   // Iterate over the data and create table rows
  //   data.forEach(rowData => {
  //       const row = document.createElement('tr');

  //       // Iterate over the properties of the object and create table cells
  //       Object.values(rowData).forEach(cellData => {
  //           const cell = document.createElement('td');
  //           cell.textContent = cellData;
  //           row.appendChild(cell);
  //       });

  //       // Append the row to the table body
  //       tableBody.appendChild(row);
  //   });
  // });

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
  // <th>
  //   <th class="column-header">QTY</th>
  //   <th class="column-header">ITEM/PART NO</th>
  //   <th class="column-header">DESCRIPTION</th>
  //   <th class="column-header">LT *</th>
  //   <th class="column-header">WARRANTY<br>(MONTH)</th>
  //   <th class="column-header">STATE</th>
  //   <th class="column-header">UNIT PRICE</th>
  //   <th class="column-header">TOTAL</th>
  // </th>
  // <tr id="tableBody">
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
  //   <script src="script.js"></script>
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
  // //       <tr>
  // //   <td class="column-data">1.00</td>
  // //   <td class="column-data">0M40TH</td>
  // //   <td class="column-data">DELL 8TB, SAS, 12GBPS, 7.2K RPM</td>
  // //   <td class="column-data">16-18</td>
  // //   <td class="column-data">3</td>
  // //   <td class="column-data">Refurb</td>
  // //   <td class="column-data">514.80</td>
  // //   <td class="column-data">514.80</td>
  // // </tr>

  //       // Generate the PDF using react-native-html-to-pdf
  //       const pdf = await RNHTMLtoPDF.convert(options);
  //       setPdfFile(pdf?.filePath);
  //       console.log("PDF file generated:", pdf.filePath);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  useEffect(() => {
    // Generate the HTML content for the table
    const tableData = [
      {
        column1: "1.00",
        column2: "0M40TH",
        column3: "DELL 8TB, SAS, 12GBPS, ",
        column4: "16-18",
        column5: "3",
        column6: "Refurb",
        column7: "122.99",
        column8: "11,213,11",
      },
      {
        column1: "1.00",
        column2: "0GWFRY",
        column3: "3Refurb 263.35DELL 300GB, ",
        column4: "16-18",
        column5: "3",
        column6: "Refurb",
        column7: "208.21",
        column8: "1212.99",
      },
      {
        column1: "1.00",
        column2: "O393NFJ",
        column3: "HP 1TB, 7200RPM,",
        column4: "16-18",
        column5: "3",
        column6: "Refurb",
        column7: "289.00",
        column8: "6279,21",
      },
      // { column1: '1.00', column2: 'O393NFJ', column3: 'HP 1TB, 7200RPM,SAS, FW HPD9', column4: '16-18', column5: '3', column6: 'Refurb',column7: '289.00', column8: '6279,21', },
    ];
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
    
      margin-top:15px
    }
    
    .company-info-text {
      padding:3px;
      margin-bottom: 5px;
    }
    .box {
    
      padding: 10px;
      max-width: 200px; /* Adjust the value to your desired fixed width */
      border: 2px solid #40464D;
      background-color:  #BFBFBF;
      word-break: break-word;

    }

    .box-row {
      // background-color: green;
      // inline-size: 150px;
      // overflow-wrap: ;
      margin-bottom: 2px;
    }
    .header-container {
      margin-top:10px;
      // display: flex;
      // justify-content: space-between;
      background-color: darkblue;
      width: 100%;
    }
    
    .heading {
      font-size:15px;
      color: white;
      padding: 5px;
    }
    .heading-wrapper {
      display: flex;
      justify-content: space-between;
      width: 68%;
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
      padding: 10px;
      text-align: center;
      border: 1px solid #40464D;
    }
    
    th {
      background-color: #BFBFBF;
      color: black;
      font-weight:bold;
    }
    .custom-table {
      margin-top:20px;
      width: 100%;
      border-collapse: collapse;
    }
    
    .column-header, .column-data {
      padding: 10px;
      text-align: center;
      border: 1px solid #40464D;
    }
    
    .column-header {
      background-color: #BFBFBF;
      color: black;
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
      <img src="https://lh3.googleusercontent.com/p/AF1QipPSI5wGdZMdCQ4XMo7hr-blFoaczv6TOXK2T5bP=s1360-w1360-h1020" alt="Company Logo" width="150" height="150">
    </div>
    <div class="quotation-heading">QUOTATION</div>
  </div>

<div class="document-container">
  <div class="document-info">
    <div class="company-info-text">Document No</div>
    <div class="company-info-text">Document Date</div>
    <div class="company-info-text">Quote Subject</div>
  </div>
  <div class="box">
    <div class="box-row">OP-PK-01-0109</div>
    <div class="box-row">10/02/2021</div>
    <div class="box-row">Re:Required Prices:Hard Devic</div>
  </div>
</div>

<div class="header-container">
  <div class="heading-wrapper">
     <h1 class="heading">Customer</h1>
    <h1 class="heading">Delivery Address</h1>
  </div>
</div>


<div class="main-container">
  <div class="inner-container">
     <div class="company-info-texts"><b>Customer:</b>Premier Star Technology (Private) Limited </div>
     <div class="company-info-texts"><b>Atn:</b>Muhammad Zaheed Khan</div>
     <div class="company-info-texts"><b>Address:</b>Suite No. 305, 3rd Floor, Shah Tower, Main Double Road, E-11/2, Islamabad, Pakistan</div>
  </div>
  <div class="inner-container">
        <div class="company-info-texts"><b>Country:</b>Pakistan</div>
        <div class="company-info-texts"><b>City:</b>Islamabad</div>
       
  </div>
</div>

<div class="main-container">
  <div class="inner-container">
     <div class="company-info-texts"><b>Contact No:</b>+92-51-230 4998 </div>
     <div class="company-info-texts"><b>Email:</b>zaheed@pstechnology.ae</div>
     
  </div>
  <div class="inner-container">
        <div class="company-info-texts"><b>* LT = Lead Time (Working Days)</b></div>
        <div class="company-info-texts"><b>Quote Validity = 7 Days or while stock last</b></div>
       
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
    <td>MUHAMMAD FAKHAR ALI</td>
    <td>m.fakhar@agriusit.com</td>
    <td>Pre-Payment</td>
    <td>DDP</td>
    <td>US$</td>
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

${tableData
  .map(
    (rowData) => `
   <tbody>
      <td>${rowData.column1}</td>
      <td>${rowData.column2}</td>
      <td>${rowData.column3}</td>
      <td>${rowData.column4}</td>
      <td>${rowData.column5}</td>
      <td>${rowData.column6}</td>
      <td>${rowData.column7}</td>
      <td>${rowData.column8}</td>
      </tbody>
  `
  )
  .join("")}



</table>



<div class="document-container">
  <div class="document-info">
    <div class="company-info-text">Sub Total</div>
    <div class="company-info-text">GST/SST</div>
    <div class="company-info-text">Total</div>
  </div>
  <div class="box">
    <div class="box-row">1,933,33</div>
    <div class="box-row">123.00</div>
    <div class="box-row">3,333,3.00</div>
  </div>
</div>


  </div>
  <script src="script.js"></script>
</body>
</html>

      `;
    // const htmlContent = `
    //   <html>
    //     <body>
    //       <table>
    //         <thead>
    //           <tr>
    //             <th>Column 1</th>
    //             <th>Column 2</th>
    //             <th>Column 3</th>
    //           </tr>
    //         </thead>
    //         <tbody>
    //           ${tableData
    //             .map(
    //               (rowData) => `
    //               <tr>
    //                 <td>${rowData.column1}</td>
    //                 <td>${rowData.column2}</td>
    //                 <td>${rowData.column3}</td>
    //               </tr>
    //             `
    //             )
    //             .join('')}
    //         </tbody>
    //       </table>
    //     </body>
    //   </html>
    // `;

    // Generate PDF from HTML content
    const createPDF = async () => {
      try {
        const options = {
          html: htmlContent,
          fileName: "table.pdf",
          directory: "Documents",
        };

        const pdf = await RNHTMLtoPDF.convert(options);
        console.log("PDF generated", pdf.filePath);
        setPdfFile(pdf?.filePath);
      } catch (error) {
        console.error("Error generating PDF", error);
      }
    };

    createPDF();
  }, []);
  const requestStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: "VERP App Storage Permission",
          message:
            "VERP App needs access to your camera " +
            "so you can take awesome PDF.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        downloadPdf();
        console.log("You can Download the Pdf");
      } else {
        console.log("File permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const downloadPdf = async () => {
    dispatch(setAppLoader(true));
    const { config, fs } = RNFetchBlob;
    const fileDir = fs.dirs.DownloadDir;
    const date=new Date();
    

    config({
      // add this option that makes response data to be stored as a file,
      // this is much more performant.
      fileCache: true,
      addAndroidDownloads:
      {
        useDownloadManager:true,
        notification:true,
        path:fileDir+"/dowmload_"+Math.floor(date.getDate()+date.getSeconds()/2)+".pdf",
        description:"File DownlLoad"
      }
    })
      .fetch("GET", 'https://www.africau.edu/images/default/sample.pdf', {
        //some headers ..
      })
      .then((res) => {
        dispatch(setAppLoader(false));
        // the temp file path
        alert("File DownlLoaded Successfully")
        console.log("The file saved to ", res.path());
      });
  };
  const sharePDf=()=>{
    Share.open(options)
  .then((res) => {
    console.log("===================",res);
  })
  .catch((err) => {
    err && console.log(err);
  });
  }

  return (
    <ScreenWrapper
      scrollEnabled
      headerUnScrollable={() => {
        return (
          <View>
            <PageHeader
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
              trustAllCerts={false}
              source={{
                uri: pdfFile,
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
          )
          }
        </View>

        <View
          style={{
            width: width(80),
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Button
            containerStyle={styles.btnStyle}
            title={"Download"}
            onPress={() => {
              pdfFile !== null && requestStoragePermission();
            }}
          />
          <Button
            containerStyle={styles.btnStyle}
            title={"Share"}
            //  onPress={() => sharePDf()}
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
