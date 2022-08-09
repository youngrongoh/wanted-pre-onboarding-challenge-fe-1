import React, { useContext, useMemo } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const StorageContext = React.createContext({} as { [K in string]: any });

export const StorageProvider = ({ children }: { children: React.ReactNode }) => {
  const storage = useLocalStorage();
  
  return (
    <StorageContext.Provider value={storage}>
      {children}
    </StorageContext.Provider>
  )
}

export const useStorage = <KS extends string | string[], T = { [K in KS extends string ? string : KS[number]]: unknown }>(key?: KS) => {
  const { data, ...storage } = useContext(StorageContext);
  
  const filteredData = useMemo(() => {
    if (data == null) return null;
    return Object.entries(data)
      .filter(([_key]) => {
        if (Array.isArray(key)) {
          return key.includes(_key);
        } else if (typeof key === 'string') {
          return key === _key;
        } else {
          return true;
        }
      })
      .reduce((acc, [key, value]) => {
        acc[key as keyof T] = value as T[keyof T];
        return acc;
      }, {} as {[K in keyof T]: T[keyof T]})
  }, [data, key]);

  return { ...storage, data: filteredData } as ReturnType<typeof useLocalStorage<KS, T>>
}