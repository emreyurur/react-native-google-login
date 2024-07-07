import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
    ProposalDetailScreen: { title: string; description: string };
    ProposalScreen: undefined;
};

type ProposalDetailScreenRouteProp = RouteProp<RootStackParamList, 'ProposalDetailScreen'>;

type Props = {
    route: ProposalDetailScreenRouteProp;
};

const ProposalDetailScreen: React.FC<Props> = ({ route }) => {
    const { title, description } = route.params;
    const [hasVoted, setHasVoted] = useState(false);

    const handleVote = (vote: string) => {
        setHasVoted(true);
        Alert.alert('Vote Recorded', `You voted ${vote} on "${title}"`);
    };

    return (
        <View style={styles.container}>
            <View style={styles.borderContainer}>
                <Text style={styles.title}>{title}</Text>
            </View>
            <View style={styles.borderContainer}>
                <Text style={styles.description}>{description}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity 
                    style={[
                        styles.button, 
                        styles.yesButton, 
                        hasVoted && styles.disabledButton
                    ]} 
                    onPress={() => handleVote('Yes')}
                    disabled={hasVoted}
                >
                    <Text style={styles.buttonText}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[
                        styles.button, 
                        styles.noButton, 
                        hasVoted && styles.disabledButton
                    ]} 
                    onPress={() => handleVote('No')}
                    disabled={hasVoted}
                >
                    <Text style={styles.buttonText}>No</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
    },
    borderContainer: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 16,
        marginBottom: 16,
        borderRadius: 4,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
    },
    description: {
        fontSize: 16,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 16,
    },
    button: {
        paddingVertical: 12,
        paddingHorizontal: 48,
        borderRadius: 4,
    },
    yesButton: {
        backgroundColor: '#4CAF50',
    },
    noButton: {
        backgroundColor: '#F44336',
    },
    buttonText: {
        fontSize: 24,
        color: 'white',
        fontWeight: 'bold',
    },
    disabledButton: {
        backgroundColor: '#9E9E9E',
    },
});

export default ProposalDetailScreen;
