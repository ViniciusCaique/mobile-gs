

import { View, Text, TouchableOpacity, TextInput, } from "react-native";
import { useState, useEffect } from 'react';

import uuid from 'react-native-uuid';


import { db } from "../../../config/firebase";
import { doc, setDoc, collection, addDoc } from "firebase/firestore";
import { serverTimestamp } from "firebase/firestore";




export default function FormDoenca({ navigation }) {

    const [ name, setName ] = useState('')
    const [ description, setDescription ] = useState('')
    const [ recomendations, setRecomendations ] = useState('')
    const [ diseases, setDiseases ] = useState([]) 


    async function createDoenca() {
        try {

            // const id = uuid.v4();

            const newDisease = {
                id: uuid.v4(),
                name: name,
                description: description,
                recomendations: recomendations,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
            }

            const diseasesCollection = collection(db, 'diseases')
            addDoc(diseasesCollection, newDisease)

            const updatedDiseases = [...diseases, newDisease]

            setDiseases(updatedDiseases)

            setName('')
            setDescription('')
            setRecomendations('')

        } catch (error) {
          throw new Error('Erro ao inserir dados: ', error)
        }
    }


    return(
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", paddingTop: 30, backgroundColor: "#343A40" }}>
            <View style={{ alignItems: "center", width: "100%", height: "90%", padding: 20, backgroundColor: "#6c757d" }}>
                <Text style={{  color: 'white', fontSize: 25, padding: 20 }}>Cadastrar Pacote</Text>
                <Text>Nome</Text>
                <TextInput
                    style={{ width: 200, borderWidth: 1, borderStyle: "solid", borderColor: '#000000', borderRadius: 5 , borderRadius: 10, padding: 4 }}
                    placeholder='Nome'
                    onChangeText={setName}
                    value={name}
                />
                <Text>Descrição</Text>
                <TextInput 
                    style={{ width: 200, borderWidth: 1, borderStyle: "solid", borderColor: '#000000', borderRadius: 10, marginBottom: 5 ,padding: 4 }}
                    placeholder='Descrição'
                    onChangeText={setDescription}
                    value={description}
                />
                <Text>Reomendacoes</Text>
                <TextInput 
                    style={{ width: 200, borderWidth: 1, borderStyle: "solid", borderColor: '#000000', borderRadius: 10, marginBottom: 5 ,padding: 4 }}
                    placeholder='Tipo'
                    onChangeText={setRecomendations}
                    value={recomendations}
                />

                <TouchableOpacity
                    style={{ borderWidth: 2, borderRadius: 6, borderColor: 'black', padding: 4}}
                    onPress={() => createDoenca()}
                >
                    <Text> Salvar </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}