import { useEffect, useState } from 'react';
import { LOCALSTORAGE_PREFIX } from './../const/index';

// Q: KS에 number, symbol이 포함되나?
const useLocalStorage = <KS extends string | string[], T = { [K in KS extends string ? string : KS[number]]: unknown }>() => {
  const [storage, setStorage] = useState<T | null>(null);

  useEffect(() => {
    let initialStorage = Object.entries(localStorage)
      .filter(([savedKey]) => savedKey.indexOf(LOCALSTORAGE_PREFIX) === 0)
      .reduce((acc, [savedKey, value]) => {
        const originalKey = savedKey.replace(LOCALSTORAGE_PREFIX, '') as keyof T;
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
    localStorage.setItem(LOCALSTORAGE_PREFIX + (key as string), JSON.stringify(value || String(value)));
    setStorage(storage => {
      if (storage == null) return storage;
      const copied = { ...storage };
      copied[key] = value;
      return copied;
    })
  }

  const removeValue = (key: keyof T) => {
    localStorage.removeItem(LOCALSTORAGE_PREFIX + (key as string));
    setStorage(storage => {
      if (storage == null) return storage;
      const copied = { ...storage };
      delete copied[key];
      return copied;
    });
  }

  return {
    data: storage,
    get: getValue,
    set: setValue,
    remove: removeValue,
  }
}

export default useLocalStorage;