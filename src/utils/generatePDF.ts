
import { ReceiptData } from "@/pages/Index";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const generatePDF = async (receiptData: ReceiptData): Promise<void> => {
  // We need to create a temporary element that looks exactly like our receipt
  // This is because we can't directly access the DOM element from the React component
  const receiptElement = document.createElement("div");
  receiptElement.className = "bg-white rounded-lg overflow-hidden shadow-lg";
  receiptElement.style.width = "350px";
  receiptElement.style.margin = "0 auto";
  receiptElement.style.fontFamily = "Arial, sans-serif";

  const successHeader = `
    <div style="padding: 24px; background-color: #f9fafb; text-align: center;">
      <div style="display: flex; align-items: center; justify-content: center; margin-bottom: 8px;">
        <span style="font-size: 18px; font-weight: 500;">Payment Successful</span>
        <span style="margin-left: 8px; background-color: #22c55e; border-radius: 50%; padding: 4px;">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </span>
      </div>
      <p style="color: #6b7280;">${receiptData.date}</p>

      <h1 style="font-size: 28px; font-weight: 700; color: #214584; margin-top: 16px;">
        KES ${receiptData.amount}
      </h1>

      <p style="margin-top: 16px; margin-bottom: 8px;">Thank you for making your payment.</p>
    </div>
  `;

  const detailsSection = `
    <div style="border-top: 1px dashed #e5e7eb;">
      <div style="padding: 20px; background-color: #f3f4f6;">
        <table style="width: 100%;">
          <tbody>
            <tr>
              <td style="padding: 8px 0; color: #6b7280;">Phone Number</td>
              <td style="padding: 8px 0; text-align: right;">${receiptData.phoneNumber}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280;">Transaction Number</td>
              <td style="padding: 8px 0; text-align: right;">${receiptData.transactionNumber}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280;">Paid to</td>
              <td style="padding: 8px 0; text-align: right;">${receiptData.paidTo}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280;">Payer Method Ref</td>
              <td style="padding: 8px 0; text-align: right;">${receiptData.payerMethodRef}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280;">Counter Name</td>
              <td style="padding: 8px 0; text-align: right;">${receiptData.counterName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280;">Counter Code</td>
              <td style="padding: 8px 0; text-align: right;">${receiptData.counterCode}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280;">Customer Reference</td>
              <td style="padding: 8px 0; text-align: right;">${receiptData.customerReference}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style="padding: 20px; background-color: #f3f4f6; border-top: 1px solid #e5e7eb;">
        <div style="display: flex; justify-content: space-between;">
          <span style="color: #6b7280;">Amount Paid</span>
          <span>KES ${receiptData.amount}</span>
        </div>
      </div>
    </div>
  `;

  const footerSection = `
    <div style="padding: 24px; text-align: center;">
      <h3 style="text-transform: uppercase; font-weight: 500; margin-bottom: 8px;">Any questions & comment?</h3>
      <p style="color: #6b7280; margin-bottom: 16px;">Feel Free to Get In Touch</p>
      <div style="font-size: 14px; color: #6b7280;">
        <p>support@receiptgenerator.com</p>
        <p>+254700000000</p>
      </div>
    </div>
  `;

  receiptElement.innerHTML = successHeader + detailsSection + footerSection;
  
  document.body.appendChild(receiptElement);
  
  try {
    // Capture the receipt as canvas
    const canvas = await html2canvas(receiptElement, {
      scale: 2,
      backgroundColor: "#ffffff",
      logging: false,
    });

    // Create PDF
    const pdf = new jsPDF("p", "mm", "a4");
    
    // A4 dimensions
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    
    // Canvas dimensions
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    
    // Calculate the scaling ratio to fit the canvas in A4
    const ratio = Math.min(pdfWidth / canvasWidth, pdfHeight / canvasHeight);
    
    // Calculate the centered position
    const xPos = (pdfWidth - canvasWidth * ratio) / 2;
    const yPos = 20; // Top margin
    
    // Add the image to the PDF
    pdf.addImage(
      canvas.toDataURL("image/png"), 
      "PNG", 
      xPos, 
      yPos, 
      canvasWidth * ratio, 
      canvasHeight * ratio
    );
    
    // Save the PDF
    pdf.save(`Receipt-${receiptData.transactionNumber || "payment"}.pdf`);
  } finally {
    // Clean up
    document.body.removeChild(receiptElement);
  }
};
