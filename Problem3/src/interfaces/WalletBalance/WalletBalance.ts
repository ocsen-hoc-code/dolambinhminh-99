interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string;
  usdValue?: number;
}

export default WalletBalance;