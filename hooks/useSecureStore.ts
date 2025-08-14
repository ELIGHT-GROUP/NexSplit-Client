// useSecureStore.ts
import { useState, useEffect, useCallback } from 'react';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

async function webGetItem(key: string) {
  return Promise.resolve(localStorage.getItem(key));
}

async function webSetItem(key: string, value: string) {
  localStorage.setItem(key, value);
  return Promise.resolve();
}

async function webDeleteItem(key: string) {
  localStorage.removeItem(key);
  return Promise.resolve();
}

export function useSecureStore(key: string) {
  const [value, setValue] = useState<string | null>(null);

  const getValue = useCallback(async () => {
    const result =
      Platform.OS === 'web'
        ? await webGetItem(key)
        : await SecureStore.getItemAsync(key);

    setValue(result);
    return result;
  }, [key]);

  const setSecureValue = useCallback(async (newValue: string) => {
    if (Platform.OS === 'web') {
      await webSetItem(key, newValue);
    } else {
      await SecureStore.setItemAsync(key, newValue);
    }
    setValue(newValue);
  }, [key]);

  const deleteValue = useCallback(async () => {
    if (Platform.OS === 'web') {
      await webDeleteItem(key);
    } else {
      await SecureStore.deleteItemAsync(key);
    }
    setValue(null);
  }, [key]);

  useEffect(() => {
    getValue();
  }, [getValue]);

  return { value, getValue, setSecureValue, deleteValue };
}
