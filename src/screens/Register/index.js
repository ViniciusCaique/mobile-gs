
import { Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import { useState } from "react";

import uuid from 'react-native-uuid';

import { createUserWithEmailAndPassword } from "firebase/auth";
import { app } from '../../config/firebase'
import { getAuth } from "firebase/auth"
import { db } from "../../config/firebase";
import { doc, setDoc, collection, addDoc } from "firebase/firestore";
import { serverTimestamp } from "firebase/firestore";

const auth = getAuth(app)

export default function Register({ navigation }){

    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ username, setUsername ] = useState('')


    const registerUser = async () => {
        await createUserWithEmailAndPassword(auth, email, password)
            .then((cred) => {
                const user = cred.user;
                const id = uuid.v4();

                // const userColletion = collection(db, 'users')
                // userColletion.doc(user.uid).setDoc({
                //     id,
                //     username,
                //     email,
                //     password
                // })
                const userCollection = collection(db, 'users')
                addDoc(userCollection, {
                    id,
                    username,
                    email,
                    password,
                    createdAt: serverTimestamp(),
                    updatedAt: serverTimestamp(),
                })
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode)
                console.log(errorMessage)
            })
    }

    return(
        <View style={{ flex: 1, justifyContent: "center", paddingRight: 32, paddingLeft: 32, paddingTop: 30, backgroundColor: "rgb(39 39 42)" }}>
            <View style={{ alignItems: "center", paddingTop: 200, paddingBottom: 250 }}>
                <Text style={{  color: 'white', fontSize: 25, padding: 20 }}>Criar Conta</Text>
                <TextInput
                    style={{ color: 'white', width: 200, backgroundColor: 'rgb(82 82 91)', borderRadius: 5 ,margin: 10, padding: 5 }}
                    placeholder="Nome"
                    placeholderTextColor="#FAF9F6"
                    type="text"
                    onChangeText={(username) => setUsername(username)}
                    value={username}
                />
                <TextInput
                    style={{ color: 'white', width: 200, backgroundColor: 'rgb(82 82 91)', borderRadius: 5 ,margin: 10, padding: 5 }}
                    placeholder="E-mail"
                    placeholderTextColor="#FAF9F6"
                    keyboardAppearance="dark"
                    type="text"
                    onChangeText={(email) => setEmail(email)}
                    value={email}
                />
                <TextInput
                    style={{ color: 'white', width: 200, backgroundColor: 'rgb(82 82 91)',borderRadius: 5 ,margin: 10, padding: 5 }}
                    placeholder="Senha"
                    placeholderTextColor="#FAF9F6"
                    keyboardAppearance="dark"
                    secureTextEntry={true}
                    type="text"
                    onChangeText={(pass) => setPassword(pass)}
                    value={password}
                />
                <TouchableOpacity style={{ borderWidth: 2, borderRadius: 6, borderColor: 'white', padding: 4, margin: 10, backgroundColor: 'white',  marginTop:15}} onPress={registerUser}>
                    <Text style={{fontWeight: 'bold', fontSize: 16, width: 100, textAlign: 'center'}}>Criar Conta</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ borderWidth: 2, borderRadius: 6, borderColor: 'white', padding: 4, margin: 10, backgroundColor: 'white',  marginTop:15}} onPress={() => navigation.navigate('Login')}>
                    <Text style={{fontWeight: 'bold', fontSize: 16, width: 100, textAlign: 'center'}}>Fazer Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}