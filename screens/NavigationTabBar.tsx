import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Colors from '../util/colors';
import { font, margin } from '../util/global-styles';
import { iconFor } from './util/Util';

export default function NavigationTabBar({ state, descriptors, navigation }) {
  return (
    <View style={styles.tabbar}>
      {state.routes.map((route, index) => {
        if (route.name.startsWith('@')) return; // Invisible

        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole='button'
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            key={label}
            style={styles.tabButton}
          >
            {iconFor(label, isFocused)}
            <Text
              style={[
                { color: isFocused ? Colors.accent.regular : Colors.white.darker },
                styles.buttonText,
              ]}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabbar: {
    flexDirection: 'row',
    backgroundColor: Colors.black.darker,
    height: 60,
    justifyContent: 'space-evenly',
  },
  tabButton: {
    justifyContent: 'flex-end',
    alignContent: 'center',
    width: 75,
  },
  buttonText: {
    fontFamily: font.type.regular,
    width: '100%',
    textAlign: 'center',
    marginBottom: margin.s1,
  },
});
