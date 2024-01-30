// import { useState, useEffect } from 'react';

// export function getSessionStorageOrDefault(key: string, defaultValue: string) {
//      const stored = sessionStorage.getItem(key);
//      if (!stored) {
//           return defaultValue;
//      }
//      return JSON.parse(stored);
// }

// export function useSessionStorage(key: string, defaultValue: string) {
//      const [value, setValue] = useState(
//           getSessionStorageOrDefault(key, defaultValue)
//      );

//      useEffect(() => {
//           sessionStorage.setItem(key, JSON.stringify(value));
//      }, [key, value]);

//      return [value, setValue];
// }

// export function clearSessionStorage() {
//      // sessionStorage.removeItem("datepicker")
//      // sessionStorage.removeItem("savedEvents")
//      // sessionStorage.removeItem("linechartPickerType")
// }