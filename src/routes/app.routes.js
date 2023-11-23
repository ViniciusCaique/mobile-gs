
import { useEffect, useState } from "react"

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../screens/Home"
import Login from "../screens/Login"
import Register from "../screens/Register"
import Profile from "../screens/Profile";
import NewDisease from '../screens/Home/new'

import { app } from '../config/firebase'
import { getAuth, onAuthStateChanged } from "firebase/auth"

const auth = getAuth(app)

export function AppRoutes() {

    const [ user, setUser ] = useState(null)

    useEffect(() => {
        const authUser = onAuthStateChanged(auth, setUser)
        return authUser;
    }, [])

    const Tabs = createBottomTabNavigator()
    const ProfileStack = createNativeStackNavigator()
    const DiseasesStack = createNativeStackNavigator()


    const LoginStackScreen = () => {
        return(
            <ProfileStack.Navigator
                initialRouteName="Login"
                screenOptions={{ headerShown: false }}
            >
                <ProfileStack.Screen name="Login" component={Login} />
                <ProfileStack.Screen name="Register" component={Register} />
            </ProfileStack.Navigator>
        )
    }

    const DiseasesStackScreen = () => {
        return(
            <DiseasesStack.Navigator
                initialRouteName="Home"
                screenOptions={{ headerShown: false }}
            >
                <DiseasesStack.Screen name="Home" component={Home} />
                <DiseasesStack.Screen name="New" component={NewDisease} />
                {/* <DiseasesStack.Screen name="Edit" component={EditPacote} /> */}
            </DiseasesStack.Navigator>
        )
    }

    const MainBottomBar = () => {
        return(
            <Tabs.Navigator screenOptions={{ 
                headerShown: true,
                headerShadowVisible: false,
                headerStyle: { backgroundColor: "rgb(9 9 11)", elevation: 0, shadowOpacity: 0, borderBottomWidth: 0 },
                headerTitleStyle: { color: 'white' },
                tabBarShowLabel: false,
                tabBarStyle: { backgroundColor: "rgb(9 9 11)" },
                tabBarActiveTintColor: "rgb(250 204 21)",
                tabBarInactiveTintColor: "rgb(156 163 175)",
            }}>
                <Tabs.Screen name="HomePage" component={DiseasesStackScreen} />
                {!user ? 
                <Tabs.Screen name="Registration" component={LoginStackScreen} 
                    // options={{ tabBarIcon: ({ color }) => ( <Feather name='user' size={25} color={color} /> )}}
                />
                :
                <Tabs.Screen name="Profile" component={Profile} 
                    // options={{ tabBarIcon: ({ color }) => ( <Feather name='user' size={25} color={color} /> )}}
                />}
            </Tabs.Navigator>
        )
    }

    return(
        <MainBottomBar />
    )
}