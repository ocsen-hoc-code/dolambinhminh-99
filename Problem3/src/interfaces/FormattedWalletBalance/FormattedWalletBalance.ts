import WalletBalance from "../WalletBalance/WalletBalance";

interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
  className: string;
}

export default FormattedWalletBalance;