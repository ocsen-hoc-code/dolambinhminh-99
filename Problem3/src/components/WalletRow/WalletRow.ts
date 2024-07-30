import React from "react";
import WalletRowProps from "../../interfaces/WalletRowProps/WalletRowProps";

const WalletRow: React.FC<WalletRowProps> = ({
  amount,
  usdValue,
  formattedAmount,
  className,
}) => {
  return (
    <div className={`${className}`}>
      <div>{formattedAmount}</div>
      <div>{amount}</div>
      <div>{usdValue}</div>
    </div>
  );
};

export default WalletRow;
