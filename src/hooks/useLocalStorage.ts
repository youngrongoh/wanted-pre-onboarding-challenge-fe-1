import { useEffect, useState } from 'react';

const PREFIX = 'wtd-obd_';


// Q: KS에 number, symbol이 포함되나?
const useLocalStorage = <KS extends string | string[], T = { [K in KS extends string ? KS : KS[number]]: unknown }>(key?: KS) => {
  const [storage, setStorage] = useState<T | null>(null);

  useEffect(() => {
    let initialStorage = Object.entries(localStorage)
      .filter(([savedKey]) => savedKey.indexOf(PREFIX) === 0)
      .filter(([savedKey]) => {
        const originalKey = savedKey.replace(PREFIX, '');
        if (Array.isArray(key)) {
          return key.includes(originalKey);
        } else if (typeof key === 'string') {
          return key === originalKey;
        } else {
          return true;
        }
      })
      .reduce((acc, [savedKey, value]) => {
        const originalKey = savedKey.replace(PREFIX, '') as keyof T;
        acc[originalKey] = JSON.parse(value);
        return acc;
      }, {} as T);
    setStorage(initialStorage);
  }, []);

  const getValue = (key: keyof T) => {
    if (storage == null) return;
    return storage[key];
  }

  const setValue = (key: keyof T, value: T[keyof T]) => {
    localStorage.setItem(PREFIX + (key as string), JSON.stringify(value));
    setStorage(storage => {
      if (storage == null) return storage;
      const copied = { ...storage };
      copied[key] = value;
      return copied;
    })
  }

  const removeValue = (key: keyof T) => {
    localStorage.removeItem(PREFIX + (key as string));
    setStorage(storage => {
      if (storage == null) return storage;
      const copied = { ...storage };
      delete copied[key];
      return copied;
    })
  }

  return {
    data: storage,
    get: getValue,
    set: setValue,
    remove: removeValue,
  }
}

export default useLocalStorage;