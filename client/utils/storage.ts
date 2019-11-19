import { AsyncStorage } from 'react-native';
import { User, Post, StartData } from './types';

export async function persistUser(data: User) {
  try {
    const dataStr = JSON.stringify(data);
    await AsyncStorage.setItem('user', dataStr);
  } catch (error) {
    console.log('> Failed to persist user', error);
  }
}

export async function getPersistedUser() {
  try {
    const userStr = await AsyncStorage.getItem('user');
    return JSON.parse(userStr) as User;
  } catch (error) {
    console.log('> Failed to get persisted user', error);
    return null;
  }
}

export async function persistMemes(data: Post[]) {
  try {
    const dataStr = JSON.stringify(data);
    await AsyncStorage.setItem('meme', dataStr);
  } catch (error) {
    console.log('> Failed to persist meme', error);
  }
}

export async function getPersistedMemes() {
  try {
    const memeStr = await AsyncStorage.getItem('meme');
    return memeStr ? (JSON.parse(memeStr) as Post[]) : [];
  } catch (error) {
    console.log('> Failed to get persisted user', error);
    return [];
  }
}

export async function persistCategories(data: StartData['selectedCategories']) {
  try {
    const dataStr = JSON.stringify(data);
    await AsyncStorage.setItem('categories', dataStr);
  } catch (error) {
    console.log('> Failed to persist categories', error);
  }
}

export async function getPersistedCategories() {
  try {
    const categoriesStr = await AsyncStorage.getItem('categories');
    return categoriesStr
      ? (JSON.parse(categoriesStr) as StartData['selectedCategories'])
      : null;
  } catch (error) {
    console.log('> Failed to get persisted categories', error);
    return null;
  }
}

export async function clear() {
  await AsyncStorage.removeItem('user');
  await AsyncStorage.removeItem('meme');
  await AsyncStorage.removeItem('categories');
}
