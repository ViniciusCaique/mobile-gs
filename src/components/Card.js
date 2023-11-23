
import { Text, View, TouchableOpacity } from "react-native";
import { Feather } from '@expo/vector-icons'



export default function Card({ humidity, item, onDelete }){
    // console.log('nao sei' + item)
    return(
        <View className="bg-zinc-800 max-w-xs p-4 mt-10 rounded-xl">
            <View className="gap-1 items-center">
                <Text className="text-2xl font-bold text-white">{item.name}</Text>
                <Text className="text-white text-lg">{item.description}</Text>
                <Text className="text-white text-lg">{item.recomendations}</Text>
                <Text className="text-white text-lg">{humidity}</Text>
                <View>
                    <TouchableOpacity>
                        <Feather
                            style={{ color: 'white' }}
                            name='trash-2'
                            size={25}
                            onPress={() => onDelete(item)}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}