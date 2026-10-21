/**
 * Official bank websites — each verified on 2026-10-21 to load on the RBI-mandated .bank.in domain
 * (or to redirect there from the bank's older domain).
 * Phone numbers are deliberately NOT listed: numbers change, and fake "customer care" numbers are a
 * top scam. Users are told to take the number from their card, passbook, official app or this site.
 */
export const BANKS_VERIFIED_ON = "2026-10-21";

export const banks: { name: string; url: string }[] = [
  { name: "State Bank of India (SBI)", url: "https://sbi.bank.in" },
  { name: "HDFC Bank", url: "https://www.hdfc.bank.in" },
  { name: "ICICI Bank", url: "https://www.icici.bank.in" },
  { name: "Axis Bank", url: "https://www.axis.bank.in" },
  { name: "Kotak Mahindra Bank", url: "https://www.kotak.bank.in" },
  { name: "Punjab National Bank (PNB)", url: "https://pnb.bank.in" },
  { name: "Bank of Baroda", url: "https://bankofbaroda.bank.in" },
  { name: "Canara Bank", url: "https://www.canarabank.bank.in" },
  { name: "Union Bank of India", url: "https://www.unionbankofindia.bank.in" },
  { name: "Indian Bank", url: "https://indianbank.bank.in" },
  { name: "IDFC FIRST Bank", url: "https://www.idfcfirst.bank.in" },
  { name: "YES Bank", url: "https://www.yes.bank.in" },
  { name: "IndusInd Bank", url: "https://www.indusind.bank.in" },
];
