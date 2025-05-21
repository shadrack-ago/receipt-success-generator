
import { useState } from "react";
import ReceiptForm from "@/components/ReceiptForm";
import ReceiptPreview from "@/components/ReceiptPreview";

export type ReceiptData = {
  date: string;
  amount: string;
  phoneNumber: string;
  transactionNumber: string;
  paidTo: string;
  payerMethodRef: string;
  counterName: string;
  counterCode: string;
  customerReference: string;
};

const Index = () => {
  const [receiptData, setReceiptData] = useState<ReceiptData>({
    date: new Date().toLocaleString("en-GB", {
      day: "2-digit", 
      month: "short", 
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    }),
    amount: "",
    phoneNumber: "",
    transactionNumber: "",
    paidTo: "Noble Forex",
    payerMethodRef: "",
    counterName: "",
    counterCode: "",
    customerReference: "N/A",
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-receipt-purple py-6">
        <div className="container mx-auto flex items-center justify-center">
          <img 
            src="/lovable-uploads/6368c4b0-08d7-49bd-b942-ee5ae8bcde3d.png" 
            alt="Noble Forex" 
            className="h-16 mr-4" // Increased from h-12 to h-16
          />
          <h1 className="text-white text-3xl font-bold text-center">Receipt Generator</h1>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-6 text-receipt-darkPurple">Enter Receipt Details</h2>
            <ReceiptForm receiptData={receiptData} setReceiptData={setReceiptData} />
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-6 text-receipt-darkPurple">Receipt Preview</h2>
            <ReceiptPreview receiptData={receiptData} />
          </div>
        </div>
      </main>

      <footer className="bg-receipt-lightPurple py-4 mt-8">
        <div className="container mx-auto text-center text-receipt-darkPurple">
          <p>© {new Date().getFullYear()} Noble Forex Receipt Generator</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
