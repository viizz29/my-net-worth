"use client";

import React, { createContext, useCallback, useContext, useMemo, useState } from "react";

type StorageValue = string | number | boolean | object | null;

type StorageContextType = {
  get: <T = StorageValue>(key: string, defaultValue?: T) => T;
  set: (key: string, value: StorageValue) => void;
  remove: (key: string) => void;
  clear: () => void;
};

const StorageContext = createContext<StorageContextType | undefined>(
  undefined
);

const readStorageSnapshot = (): Record<string, StorageValue> => {
  if (typeof window === "undefined") {
    return {};
  }

  const data: Record<string, StorageValue> = {};

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key) continue;

    try {
      const value = JSON.parse(localStorage.getItem(key) as string);
      data[key] = value;
    } catch {
      data[key] = localStorage.getItem(key);
    }
  }

  return data;
};

export const LocalStorageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [store, setStore] = useState<Record<string, StorageValue>>(() =>
    readStorageSnapshot()
  );

  // Get value
  const get = useCallback(<T,>(key: string, defaultValue?: T): T => {
    if (key in store) {
      return store[key] as T;
    }
    return defaultValue as T;
  }, [store]);

  // Set value
  const set = useCallback((key: string, value: StorageValue) => {
    setStore((prev) => ({ ...prev, [key]: value }));
    localStorage.setItem(key, JSON.stringify(value));
  }, []);

  // Remove key
  const remove = useCallback((key: string) => {
    setStore((prev) => {
      const updated = { ...prev };
      delete updated[key];
      return updated;
    });
    localStorage.removeItem(key);
  }, []);

  // Clear all
  const clear = useCallback(() => {
    setStore({});
    localStorage.clear();
  }, []);

  const value = useMemo(
    () => ({ get, set, remove, clear }),
    [get, set, remove, clear]
  );

  return (
    <StorageContext.Provider value={value}>{children}</StorageContext.Provider>
  );
};

// Hook
export const useStorage = () => {
  const context = useContext(StorageContext);
  if (!context) {
    throw new Error("useStorage must be used within LocalStorageProvider");
  }
  return context;
};
