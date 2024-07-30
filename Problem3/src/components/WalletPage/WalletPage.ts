import React, { useMemo } from "react";

import FormattedWalletBalance from "../../interfaces/FormattedWalletBalance/FormattedWalletBalance";
import WalletBalance from "../../interfaces/WalletBalance/WalletBalance";
import WalletPageProps from "../../interfaces/WalletPageProps/WalletPageProps";

const WalletPage: React.FC<WalletPageProps> = (props: WalletPageProps) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  const getPriority = (blockchain: string): number => {
    switch (blockchain) {
      case "Osmosis":
        return 100;
      case "Ethereum":
        return 50;
      case "Arbitrum":
        return 30;
      case "Zilliqa":
        return 20;
      case "Neo":
        return 20;
      default:
        return -99;
    }
  };

  const formattedBalances: FormattedWalletBalance[] = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => getPriority(balance.blockchain) > -99 && balance.amount > 0)
      .sort((lhs: WalletBalance, rhs: WalletBalance) => getPriority(rhs.blockchain) - getPriority(lhs.blockchain))
      .map((balance: WalletBalance) => ({
        ...balance,
        formatted: balance.amount.toFixed(2),
        usdValue: prices[balance.currency] * balance.amount,
      }));
  }, [balances, prices]);

  const rows = formattedBalances.map(
    (balance: FormattedWalletBalance, index: number) => {
      return (
        <WalletRow
          className={balance.className}
          key=`${index}-${balance.currency}`
          amount={balance.amount}
          usdValue={balance.usdValue}
          formattedAmount={balance.formatted}
        />
      );
    }
  );

  return <div {...rest}>{rows}</div>;
};

export default WalletPage;