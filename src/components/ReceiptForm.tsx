
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ReceiptData } from "@/pages/Index";
import { generatePDF } from "@/utils/generatePDF";
import { toast } from "sonner";

interface ReceiptFormProps {
  receiptData: ReceiptData;
  setReceiptData: React.Dispatch<React.SetStateAction<ReceiptData>>;
}

const ReceiptForm = ({ receiptData, setReceiptData }: ReceiptFormProps) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setReceiptData((prev) => ({ ...prev, [name]: value }));
  };

  const isFormValid = () => {
    return (
      receiptData.amount &&
      receiptData.phoneNumber &&
      receiptData.transactionNumber &&
      receiptData.paidTo &&
      receiptData.counterName
    );
  };

  const handleGeneratePDF = async () => {
    if (!isFormValid()) {
      toast.error("Please fill all required fields");
      return;
    }

    setIsGenerating(true);
    
    try {
      await generatePDF(receiptData);
      toast.success("Receipt generated successfully!");
    } catch (error) {
      console.error("Failed to generate PDF:", error);
      toast.error("Failed to generate receipt");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-2">
          <Label htmlFor="amount" className="text-receipt-darkPurple">Amount (KES)*</Label>
          <Input
            id="amount"
            name="amount"
            placeholder="e.g. 1,450.00"
            value={receiptData.amount}
            onChange={handleChange}
            required
            className="border-receipt-purple/30 focus:border-receipt-purple focus:ring-receipt-purple"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phoneNumber" className="text-receipt-darkPurple">Phone Number*</Label>
          <Input
            id="phoneNumber"
            name="phoneNumber"
            placeholder="e.g. 254798695477"
            value={receiptData.phoneNumber}
            onChange={handleChange}
            required
            className="border-receipt-purple/30 focus:border-receipt-purple focus:ring-receipt-purple"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="transactionNumber" className="text-receipt-darkPurple">Transaction Number*</Label>
          <Input
            id="transactionNumber"
            name="transactionNumber"
            placeholder="e.g. 1887196860"
            value={receiptData.transactionNumber}
            onChange={handleChange}
            required
            className="border-receipt-purple/30 focus:border-receipt-purple focus:ring-receipt-purple"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="paidTo" className="text-receipt-darkPurple">Paid To*</Label>
          <Input
            id="paidTo"
            name="paidTo"
            placeholder="e.g. Noble Forex"
            value={receiptData.paidTo}
            onChange={handleChange}
            required
            className="border-receipt-purple/30 focus:border-receipt-purple focus:ring-receipt-purple"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="payerMethodRef" className="text-receipt-darkPurple">Payer Method Ref</Label>
          <Input
            id="payerMethodRef"
            name="payerMethodRef"
            placeholder="e.g. RJJIWTORDB"
            value={receiptData.payerMethodRef}
            onChange={handleChange}
            className="border-receipt-purple/30 focus:border-receipt-purple focus:ring-receipt-purple"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="counterName" className="text-receipt-darkPurple">Counter Name*</Label>
          <Input
            id="counterName"
            name="counterName"
            placeholder="e.g. Noble FX Traders"
            value={receiptData.counterName}
            onChange={handleChange}
            required
            className="border-receipt-purple/30 focus:border-receipt-purple focus:ring-receipt-purple"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="counterCode" className="text-receipt-darkPurple">Counter Code</Label>
          <Input
            id="counterCode"
            name="counterCode"
            placeholder="e.g. 173927"
            value={receiptData.counterCode}
            onChange={handleChange}
            className="border-receipt-purple/30 focus:border-receipt-purple focus:ring-receipt-purple"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="customerReference" className="text-receipt-darkPurple">Customer Reference</Label>
          <Input
            id="customerReference"
            name="customerReference"
            placeholder="e.g. N/A"
            value={receiptData.customerReference}
            onChange={handleChange}
            className="border-receipt-purple/30 focus:border-receipt-purple focus:ring-receipt-purple"
          />
        </div>
      </div>

      <Button 
        className="w-full mt-6 bg-receipt-purple hover:bg-receipt-darkPurple" 
        onClick={handleGeneratePDF} 
        disabled={isGenerating || !isFormValid()}
      >
        {isGenerating ? "Generating..." : "Download Receipt"}
      </Button>
    </div>
  );
};

export default ReceiptForm;
