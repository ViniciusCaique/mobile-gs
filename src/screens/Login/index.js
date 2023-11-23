
import { Text, TouchableOpacity, View, TextInput } from "react-native";
import { useState } from "react";

import { signInWithEmailAndPassword } from "firebase/auth";
import { app } from '../../config/firebase'
import { getAuth } from "firebase/auth"


const auth = getAuth(app)

export default function Login({ navigation }){

    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')

    const loginUser = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user
                    if(user.apiKey !== null) {
                        navigation.navigate('Home')
                    }
                })
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode)
            console.log(errorMessage)
        }
    }

    return(
        <View style={{ flex: 1, justifyContent: "center", paddingRight: 32, paddingLeft: 32, paddingTop: 30, backgroundColor: "#6c757d" }}>
            <View style={{ alignItems: "center", paddingTop: 250, paddingBottom: 250 }}>
                <Text style={{ color: 'white' }}>Entrar</Text>
                <TextInput
                    style={{ color: 'white', width: 200, borderWidth: 1, borderStyle: "solid", borderColor: '#000000', borderRadius: 5 ,margin: 10, padding: 5 }}
                    placeholder="E-mail"
                    placeholderTextColor="#FAF9F6"
                    keyboardAppearance="dark"
                    type="text"
                    onChangeText={(email) => setEmail(email)}
                    value={email}
                />
                <TextInput
                    style={{ color: 'white', width: 200, borderWidth: 1, borderStyle: "solid", borderColor: '#000000', borderRadius: 5 ,margin: 10, padding: 5 }}
                    placeholder="Senha"
                    placeholderTextColor="#FAF9F6"
                    keyboardAppearance="dark"
                    secureTextEntry={true}
                    type="text"
                    onChangeText={(pass) => setPassword(pass)}
                    value={password}
                />
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style={{ color: 'white' }}>Criar Conta</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={loginUser}>
                    <Text style={{ color: 'white' }}>Entrar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}