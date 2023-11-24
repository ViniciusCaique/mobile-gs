
import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, TextInput, View, TouchableOpacity, FlatList } from "react-native";

import { Feather } from '@expo/vector-icons'

import { api } from '../../libs/axios'
import { apiKey } from '../../libs/axios'
import Card from "../../components/Card";

import { db } from "../../config/firebase";
import { collection, getDocs, query, doc, deleteDoc, getDoc } from "firebase/firestore";


export default function Home({ navigation }){

    const [ diseases, setDiseases ] = useState([])
    const [ location, setLocation ] = useState('')
    const [ getWeatherData, setWeatherData ] = useState([])

    const getData = async (url) => {
        await api.get(url, {
            params: {
                q: location,
                units: "metric",
                appid: apiKey
            }
        })
            .then(response => {
                const data = response.data
                const locWeather = {
                    nome: data.name,
                    temp: data.main.temp,
                    humidity: data.main.humidity,
                    cond: data.weather[0].description,
                }
                setWeatherData(locWeather)
            })
            .catch((err) => {
                // n e a melhor forma que eu fiz, mas assim o erro 404 passa e eu consigo pegar os dados das cidades que eu quero,
                // se eu deixasse vazio o array do useEffect, eu teria que fazer um botao pra atualizar a pagina e renderizar os novos dados
            })
    }

    const loadDiseases = async () => {
        const diseasesCollection = query(collection(db, 'diseases'))
        const querySnapshot = await getDocs(diseasesCollection)

        let diseases = []

        querySnapshot.forEach((doc) => {
            diseases.push(doc.data(), doc.id);
        });
        
        setDiseases(diseases)
    }

    const deleteDiseases = async (item) => {

        console.log('id atual: ' + item)
        await deleteDoc(doc(db, 'diseases', item))
        const updatedDiseases = diseases.filter(item => item !== item);
        console.log('test teste tste' + updatedDiseases)
        setDiseases(updatedDiseases)

    }

    useEffect(() => {
        loadDiseases();
    })

    // addDoc(userCollection, {
    //     id,
    //     name,
    //     description,
    //     recomendations,
    //     createdAt: serverTimestamp(),
    //     updatedAt: serverTimestamp(),
    // })

    return(
        <SafeAreaView className="flex justify-center items-center bg-zinc-800 w-full h-full">
            <View>
                <View className="items-center m-2">
                    <TouchableOpacity className="">
                        <Feather name='plus-circle' size={25} color={'white'}
                            onPress={() => navigation.navigate("New")}
                        />
                    </TouchableOpacity>
                </View>
                <TextInput
                    placeholder="Search any city"
                    placeholderTextColor="#FFF"
                    keyboardAppearance="dark"
                    value={location}
                    onChangeText={(value) => setLocation(value)}
                    onBlur={() => getData()}
                    style={{borderWidth: 2, borderColor: 'white', padding: 5, marginTop: 10, borderRadius: 10}}
                /> 
                <FlatList 
                    data={diseases}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => 
                        <Card item={item} humidity={getWeatherData == '' ? null : `${getWeatherData.humidity}%`} onDelete={deleteDiseases} />
                    }
                />

            </View>
        </SafeAreaView>
    )
}


