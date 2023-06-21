import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface CryptoContextValue {
  currency: string;
  setCurrency: (currency: string) => void;
  symbol: string;
}

const Crypto = createContext<CryptoContextValue | undefined>(undefined);

const CryptoContext: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<string>("INR");
  const [symbol, setSymbol] = useState<string>("₹");

  useEffect(() => {
    if (currency === "MY") setSymbol("RM");
    else if (currency === "USD") setSymbol("$");
  }, [currency]);

  const value: CryptoContextValue = {
    currency,
    setCurrency,
    symbol,
  };

  return <Crypto.Provider value={value}>{children}</Crypto.Provider>;
};

export default CryptoContext;

export const CryptoState = (): CryptoContextValue => {
  const context = useContext(Crypto);
  if (!context) {
    throw new Error("CryptoState must be used within a CryptoContextProvider");
  }
  return context;
};
