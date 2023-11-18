
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Home from "../screens/Home"


export function AppRoutes() {

    const Tabs = createBottomTabNavigator()

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
                <Tabs.Screen name="Home" component={Home} />
            </Tabs.Navigator>
        )
    }

    return(
        <MainBottomBar />
    )
}