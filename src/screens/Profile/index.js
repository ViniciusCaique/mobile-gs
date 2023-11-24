
import { Text, TouchableOpacity, View } from "react-native";

import { app } from '../../config/firebase'
import { getAuth } from "firebase/auth"


const auth = getAuth(app)

export default function Profile(){

    const handleSignOut = () => {
        auth.signOut()
    }

    return(
        <View style={{flex: 1, justifyContent: "center", paddingRight: 32, paddingLeft: 32, paddingTop: 30, backgroundColor: "rgb(39 39 42)", alignItems: 'center'}}>
            <Text style={{  color: 'white', fontSize: 25, padding: 20, textAlign: 'center' }}>Profile</Text>
            <TouchableOpacity style={{ borderWidth: 2, borderRadius: 6, borderColor: 'white', padding: 4, margin: 10, backgroundColor: 'white',  marginTop:15, width: 100, alignItems: 'center'}} onPress={handleSignOut}>
                <Text style={{fontWeight: 'bold', fontSize: 16, textAlign: 'center'}}>Sair</Text>
            </TouchableOpacity>
        </View>
    )
}