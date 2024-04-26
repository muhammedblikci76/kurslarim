import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ManageCource from './screens/ManageCource';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RecentCources from './screens/RecentCources';
import AllCources from './screens/AllCources';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function CourseOverview() {
  return (
    <Tab.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: 'pink' },
        headerTintColor: 'white',
        tabBarStyle: { backgroundColor: 'pink' },
        tabBarActiveTintColor: 'darkblue',
        headerRight: () => (
          <Pressable
            style={({ pressed }) => pressed && styles.pressed}
            onPress={() => {
              navigation.navigate('ManageCource');
            }}
          >
            <View style={styles.iconContainer}>
              <AntDesign name="plus" size={24} color="white" />
            </View>
          </Pressable>
        ),
      })}
    >
      <Tab.Screen
        name="RecentCources"
        component={RecentCources}
        options={{
          title: 'Yakın Zamanda Kaydolunanlar',
          tabBarLabel: 'Yakın Zamanda',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="hourglass" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="AllCources"
        component={AllCources}
        options={{
          title: 'Tüm Kurslar',
          tabBarLabel: 'Tüm Kurslar',
          tabBarIcon: ({ color, size }) => (
            <Entypo name="list" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="CourseOverview"
          component={CourseOverview}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="ManageCource" component={ManageCource} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.5,
  },
  iconContainer: {
    marginHorizontal: 8,
    marginVertical: 2,
  },
});
