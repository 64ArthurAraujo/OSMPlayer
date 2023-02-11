import { StyleSheet } from 'react-native';
import Home from '../../assets/images/svg/home.svg';
import Library from '../../assets/images/svg/library.svg';
import Folders from '../../assets/images/svg/folders.svg';
import Colors from '../../util/colors';
import { margin } from '../../util/global-styles';

export function iconFor(label, isFocused?) {
  switch (label) {
    case 'Home':
      return (
        <Home
          style={styles.buttonIcon}
          fill='none'
          stroke={isFocused ? Colors.accent.regular : Colors.white.darker}
        />
      );
    case 'Library':
      return (
        <Library
          style={styles.buttonIcon}
          fill='none'
          stroke={isFocused ? Colors.accent.regular : Colors.white.darker}
        />
      );
    case 'Folders':
      return (
        <Folders
          style={styles.buttonIcon}
          fill='none'
          stroke={isFocused ? Colors.accent.regular : Colors.white.darker}
        />
      );
  }
}

const styles = StyleSheet.create({
  buttonIcon: {
    height: 20,
    width: 20,
    alignSelf: 'center',
    marginBottom: margin.s1,
  },
});
