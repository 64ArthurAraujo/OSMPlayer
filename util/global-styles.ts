import { StyleSheet } from 'react-native';
import Colors from './colors';

const sizeProgression = {
  s1: 5,
  s2: 10,
  s3: 15,
  s4: 20,
  s5: 25,
  s6: 30,
};

export const border = {
  ...sizeProgression,
};

export const margin = {
  ...sizeProgression,
};

export const padding = {
  ...sizeProgression,
};

export const font = {
  type: {
    ui: 'Poppins',
    regular: 'Roboto',
  },
  size: {
    h1: 30,
    h2: 25,
    h3: 20,
    h4: 15,
    h5: 10,
    h6: 5,
  },
};

export const globalStyles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
  },
  uiTextPrimary: {
    fontFamily: font.type.ui,
    color: Colors.white.regular,
    textAlign: 'center',
  },
  uiTextSecondary: {
    fontFamily: font.type.ui,
    color: Colors.white.darker,
    textAlign: 'center',
  },
  regularTextPrimary: {
    fontFamily: font.type.regular,
    color: Colors.white.regular,
  },
  regularTextSecondary: {
    fontFamily: font.type.regular,
    color: Colors.white.darker,
  },
  header: {
    width: '100%',
    height: 50,
    marginTop: margin.s1,
    justifyContent: 'center',
  },
  tabTitleText: {
    fontFamily: font.type.ui,
    fontWeight: '500',
    color: Colors.white.regular,
    marginLeft: margin.s2,
    fontSize: font.size.h1,
    alignSelf: 'flex-start',
  },
});
