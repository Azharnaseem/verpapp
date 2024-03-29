import { Button } from "~components";
import RNHTMLtoPDF from "react-native-html-to-pdf";
import { showMessage } from "react-native-flash-message";
export function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}
export function PDFGenerator() {
  const generatePDF = async () => {
    try {
      // Define the HTML content to convert to PDF
      const htmlContent = "<h1>Hello, World!</h1>"; // Replace with your HTML content

      // Generate PDF options
      const options = {
        html: htmlContent,
        fileName: "example",
        directory: "Documents",
      };

      // Generate the PDF using react-native-html-to-pdf
      const pdf = await RNHTMLtoPDF.convert(options);

      // console.log("PDF file generated:", pdf.filePath);
    } catch (error) {
      console.log(error);
    }
  };

  return <Button title="Generate PDF" onPress={generatePDF} />;
}

// export default PDFGenerator;
export function successMessage(
  description = "",
  message = "Success",
  duration = 1000
) {
  showMessage({
    position: "top",
    message: message,
    description: description,
    type: "success",
    duration: duration,
  });
}
export function erroMessage(
  description = "",
  message = "Error",
  duration = 2000
) {
  showMessage({
    position: "top",
    message: message,
    description: description,
    type: "danger",
    duration: duration,
  });
}