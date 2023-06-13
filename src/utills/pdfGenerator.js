import React, { useEffect } from "react";
import { Button } from "react-native";
import RNHTMLtoPDF from "react-native-html-to-pdf";

//  const htmlContent = `
//         <html>
//           <head>
//             <style>
//               body {
//                 font-family: Arial, sans-serif;
//               }
//               h1 {
//                 color: #333;
//                 text-align: center;
//               }
//               .logo {
//                 display: block;
//                 margin: 0 auto;
//                 text-align: center;
//               }
//               .report-table {
//                 width: 100%;
//                 border-collapse: collapse;
//               }
//               .report-table th,
//               .report-table td {
//                 border: 1px solid #333;
//                 padding: 8px;
//               }
//               .report-table th {
//                 background-color: #f0f0f0;
//               }
//             </style>
//           </head>
//           <body>
//             <h1>PDF Report</h1>
//             <img src="https://example.com/logo.png" class="logo" alt="Logo" />
//             <table class="report-table">
//               <tr>
//                 <th>Column 1</th>
//                 <th>Column 2</th>
//                 <th>Column 3</th>
//               </tr>
//               <tr>
//                 <td>Data 1</td>
//                 <td>Data 2</td>
//                 <td>Data 3</td>
//               </tr>
//               <tr>
//                 <td>Data 4</td>
//                 <td>Data 5</td>
//                 <td>Data 6</td>
//               </tr>
//             </table>
//           </body>
//         </html>
//       `;

const PDFGenerator = () => {
  const generatePDF = async () => {
    try {
      // Define the HTML content to convert to PDF
      const htmlContent = `<h1>Hello, World!</h1>`; // Replace with your HTML content

      // Generate PDF options
      const options = {
        html: htmlContent,
        fileName: "example",
        directory: "Documents",
      };

      // Generate the PDF using react-native-html-to-pdf
      const pdf = await RNHTMLtoPDF.convert(options);

      console.log("PDF file generated:", pdf.filePath);
    } catch (error) {
      console.log(error);
    }
  };

  return <Button title="Generate PDF" onPress={generatePDF} />;
};

export default PDFGenerator;
