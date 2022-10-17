/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { BottomTabBar } from './components/bottomTabBar';

export type SelectedProfileTab = 'schedule' | 'history';

export function ProfileStack() {
  return (
    <BottomTabBar />
  );
}
