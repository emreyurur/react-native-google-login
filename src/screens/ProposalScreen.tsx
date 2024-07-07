import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

type Proposal = {
    id: string;
    title: string;
    description: string;
};

const proposals: Proposal[] = [
    { id: '1', title: 'Kütüphanede sesli çalışma alanları olmaması', description: 'Çanakkale Onsekiz Mart Üniversitesi kütüphane alanlarının yetersizliği, öğrencilerin ders çalışma ve araştırma yapma imkanlarını kısıtlamaktadır. Özellikle sınav dönemlerinde oturacak yer bulmak neredeyse imkansız hale gelmektedir. Kütüphane içerisindeki mevcut alanlar, artan öğrenci sayısını karşılamakta yetersiz kalmaktadır. Bu durum, öğrencilerin verimli çalışma ortamından mahrum kalmasına ve akademik başarılarının olumsuz etkilenmesine neden olmaktadır.' },
    { id: '2', title: 'Otobüs seferlerinin yetersizliği', description: 'Detaylı açıklama 2' },
    { id: '3', title: 'Sosyal alanların az olması', description: 'Detaylı açıklama 3' },
    // Daha fazla proposal ekleyebilirsiniz
];

type RootStackParamList = {
    ProposalDetail: { title: string; description: string };
    ProposalScreen: undefined;
};

type ProposalScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'ProposalScreen'
>;

type ProposalScreenRouteProp = RouteProp<RootStackParamList, 'ProposalScreen'>;

type Props = {
    navigation: ProposalScreenNavigationProp;
    route: ProposalScreenRouteProp;
};

const ProposalScreen: React.FC<Props> = ({ navigation }) => {
    const renderItem = ({ item }: { item: Proposal }) => (
        <TouchableOpacity 
            style={styles.proposalItem} 
            onPress={() => navigation.navigate('ProposalDetailScreen', { title: item.title, description: item.description })}
        >
            <Text style={styles.proposalText}>{item.title}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={proposals}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    proposalItem: {
        backgroundColor: '#f9f9f9',
        padding: 16,
        marginVertical: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
    },
    proposalText: {
        fontSize: 20,
        fontWeight: "bold"
    },
});

export default ProposalScreen;
