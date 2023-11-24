

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
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", paddingTop: 30, backgroundColor: "rgb(39 39 42)" }}>
            <View style={{ alignItems: "center", width: "100%", height: "90%", padding: 20, backgroundColor: "rgb(39 39 42)" }}>
                <Text style={{  color: 'white', fontSize: 25, padding: 20 }}>Cadastrar Doença</Text>
                <Text style={{  color: 'white', fontSize: 15, margin: 5 }}> Nome</Text>
                <TextInput
                    style={{padding: 5, borderRadius: 10, width: 200, backgroundColor: 'rgb(82 82 91)'}}
                    placeholder='Nome'
                    placeholderTextColor = "#FFF"
                    onChangeText={setName}
                    value={name}
                />
                <Text style={{  color: 'white', fontSize: 15, margin: 5 }} >Descrição</Text>
                <TextInput 
                    style={{padding: 5, borderRadius: 10, width: 200, backgroundColor: 'rgb(82 82 91)'}}
                    placeholder='Descrição'
                    placeholderTextColor = "#FFF"
                    onChangeText={setDescription}
                    value={description}
                />
                <Text style={{  color: 'white', fontSize: 15, margin: 5 }}>Reomendações</Text>
                <TextInput 
                    style={{padding: 5, borderRadius: 10, width: 200, backgroundColor: 'rgb(82 82 91)'}}
                    placeholder='Recomendação'
                    placeholderTextColor = "#FFF"
                    onChangeText={setRecomendations}
                    value={recomendations}
                />

                <TouchableOpacity
                    style={{ borderWidth: 2, borderRadius: 6, borderColor: 'white', padding: 4, margin: 10, backgroundColor: 'white',  marginTop:15}}
                    onPress={() => createDoenca()}
                >
                    <Text style={{fontWeight: 'bold', fontSize: 16, width: 100, textAlign: 'center'}}> Salvar </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}