
import { Check } from "lucide-react";
import { ReceiptData } from "@/pages/Index";

interface ReceiptPreviewProps {
  receiptData: ReceiptData;
}

const ReceiptPreview = ({ receiptData }: ReceiptPreviewProps) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg max-w-md mx-auto">
      <div className="p-6 bg-gray-50 text-center">
        <div className="flex items-center justify-center mb-2">
          <span className="text-lg font-medium">Payment Successful</span>
          <span className="ml-2 bg-receipt-success rounded-full p-1">
            <Check className="h-4 w-4 text-white" />
          </span>
        </div>
        <p className="text-gray-500">{receiptData.date}</p>

        <h1 className="text-4xl font-bold text-receipt-blue mt-4">
          KES {receiptData.amount || "0.00"}
        </h1>

        <p className="mt-4 mb-2">Thank you for making your payment.</p>
      </div>

      <div className="border-t border-dashed">
        <div className="p-5 bg-gray-100">
          <table className="w-full">
            <tbody>
              <tr>
                <td className="py-2 text-gray-500">Phone Number</td>
                <td className="py-2 text-right">{receiptData.phoneNumber || "-"}</td>
              </tr>
              <tr>
                <td className="py-2 text-gray-500">Transaction Number</td>
                <td className="py-2 text-right">{receiptData.transactionNumber || "-"}</td>
              </tr>
              <tr>
                <td className="py-2 text-gray-500">Paid to</td>
                <td className="py-2 text-right">{receiptData.paidTo || "-"}</td>
              </tr>
              <tr>
                <td className="py-2 text-gray-500">Payer Method Ref</td>
                <td className="py-2 text-right">{receiptData.payerMethodRef || "-"}</td>
              </tr>
              <tr>
                <td className="py-2 text-gray-500">Counter Name</td>
                <td className="py-2 text-right">{receiptData.counterName || "-"}</td>
              </tr>
              <tr>
                <td className="py-2 text-gray-500">Counter Code</td>
                <td className="py-2 text-right">{receiptData.counterCode || "-"}</td>
              </tr>
              <tr>
                <td className="py-2 text-gray-500">Customer Reference</td>
                <td className="py-2 text-right">{receiptData.customerReference}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="p-5 bg-gray-100 border-t">
          <div className="flex justify-between">
            <span className="text-gray-500">Amount Paid</span>
            <span>KES {receiptData.amount || "0"}</span>
          </div>
        </div>
      </div>

      <div className="p-6 text-center">
        <h3 className="uppercase font-medium mb-2">Any questions & comment?</h3>
        <p className="text-gray-500 mb-4">Feel Free to Get In Touch</p>
        <div className="space-y-2 text-sm text-gray-500">
          <p>support@receiptgenerator.com</p>
          <p>+254700000000</p>
        </div>
      </div>
    </div>
  );
};

export default ReceiptPreview;
