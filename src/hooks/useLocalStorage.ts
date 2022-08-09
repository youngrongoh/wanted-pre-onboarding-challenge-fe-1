import { useEffect, useState } from 'react';

const PREFIX = 'wtd-obd_';

const useLocalStorage = (key?: string | string[]) => {
  const [storage, setStorage] = useState<{ [K in string]: any } | null>(null);

  useEffect(() => {
    const initialStorage = Object.entries(localStorage)
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
        const originalKey = savedKey.replace(PREFIX, '');
        acc[originalKey] = JSON.parse(value);
        return acc;
      }, {} as Exclude<typeof storage, null>);
    setStorage(initialStorage);
  }, []);

  const getValue = (key: string) => {
    if (storage == null) return;
    return storage[key];
  }

  const setValue = (key: string, value: unknown) => {
    const jsonValue = localStorage.setItem(PREFIX + key, JSON.stringify(value));
    setStorage(storage => {
      const copied = {...storage};
      copied[key] = jsonValue;
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