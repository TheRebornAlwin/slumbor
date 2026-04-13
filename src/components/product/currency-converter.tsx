"use client";

import { useState, useEffect } from "react";

const rates: Record<string, { symbol: string; rate: number }> = {
  USD: { symbol: "$", rate: 1 },
  EUR: { symbol: "\u20AC", rate: 0.92 },
  GBP: { symbol: "\u00A3", rate: 0.79 },
  CAD: { symbol: "CA$", rate: 1.36 },
  AUD: { symbol: "A$", rate: 1.53 },
  JPY: { symbol: "\u00A5", rate: 149 },
  KRW: { symbol: "\u20A9", rate: 1320 },
  INR: { symbol: "\u20B9", rate: 83 },
  BRL: { symbol: "R$", rate: 4.97 },
  MXN: { symbol: "MX$", rate: 17.1 },
  SEK: { symbol: "kr", rate: 10.4 },
  NOK: { symbol: "kr", rate: 10.5 },
  DKK: { symbol: "kr", rate: 6.87 },
  CHF: { symbol: "CHF", rate: 0.88 },
  NZD: { symbol: "NZ$", rate: 1.63 },
};

const localeMap: Record<string, string> = {
  "en-US": "USD",
  "en-GB": "GBP",
  "en-CA": "CAD",
  "en-AU": "AUD",
  "ja-JP": "JPY",
  "ko-KR": "KRW",
  "pt-BR": "BRL",
  "es-MX": "MXN",
  "de-DE": "EUR",
  "fr-FR": "EUR",
  "sv-SE": "SEK",
  "nb-NO": "NOK",
  "da-DK": "DKK",
  "de-CH": "CHF",
  "en-NZ": "NZD",
  "hi-IN": "INR",
};

export function useCurrency() {
  const [currency, setCurrency] = useState("USD");

  useEffect(() => {
    const saved = sessionStorage.getItem("slumbor-currency");
    if (saved && rates[saved]) {
      setCurrency(saved);
    } else {
      const lang = navigator.language;
      const detected = localeMap[lang] || "USD";
      setCurrency(detected);
      sessionStorage.setItem("slumbor-currency", detected);
    }
  }, []);

  const convert = (usd: number) => {
    const r = rates[currency];
    if (!r) return { formatted: `$${usd.toFixed(2)}`, isUSD: true };

    const converted = usd * r.rate;
    const rounded =
      currency === "JPY" || currency === "KRW"
        ? Math.round(converted / 100) * 100
        : Math.round(converted * 100) / 100;

    return {
      formatted: `${r.symbol}${rounded.toLocaleString()}`,
      isUSD: currency === "USD",
    };
  };

  const setAndSave = (c: string) => {
    setCurrency(c);
    sessionStorage.setItem("slumbor-currency", c);
  };

  return { currency, setCurrency: setAndSave, convert, currencies: Object.keys(rates) };
}
