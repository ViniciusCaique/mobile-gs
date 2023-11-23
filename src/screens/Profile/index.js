
import { Text, TouchableOpacity, View } from "react-native";

import { app } from '../../config/firebase'
import { getAuth } from "firebase/auth"


const auth = getAuth(app)

export default function Profile(){

    const handleSignOut = () => {
        auth.signOut()
    }

    return(
        <View>
            <Text>Profile</Text>
            <TouchableOpacity onPress={handleSignOut}>
                <Text>Sair</Text>
            </TouchableOpacity>
        </View>
    )
}