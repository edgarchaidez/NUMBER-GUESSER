import React, { useState, useRef, useEffect } from 'react'; //useRef allows object to survive rerendering
// useEffect allows to run logic after every render cycle
import { View, Text, StyleSheet, Button, Alert, ScrollView, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import Color from '../constants/color';
import DefaultStyles from '../constants/default-styles';
import MainButton from '../components/MainButton';
import BodyText from '../components/BodyText';


const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min) + min);
    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }
};

const renderListItem = (listLength, itemData) => (
    <View style={styles.listItem}>
        <BodyText>Guess # {listLength - itemData.index}</BodyText>
        <BodyText>{itemData.item}</BodyText>
    </View>);

const GameScreen = props => {
    const initialGuess = generateRandomBetween(1, 100, props.userChoice);
    const [currentGuess, setCurrentGuess] = useState([initialGuess.toString()]);
    //let squared = props.userChoice * props.userChoice;

    const [pastGuesses, setPastGuesses] = useState([]);
    const currentLow = useRef(1); // Initial boundaries
    const currentHigh = useRef(100);

    const { userChoice, onGameOver } = props;

    useEffect(() => {
        if (currentGuess === userChoice) {
            onGameOver(pastGuesses.length);
        }
    }, [currentGuess, userChoice, onGameOver]);

    const nextGuessHandler = direction => {
        if ((direction === 'lower' && currentGuess < props.userChoice) ||
            (direction === 'greater' && currentGuess > props.userChoice)) {
            Alert.alert('So you think you just gon cheat?!', 'You can\'t finesse a finesser.', [
                { text: 'Loser!', style: 'cancel', }]);

            return;
        }

        if (direction === 'lower') {
            currentHigh.current = currentGuess;
        } else {
            currentLow.current = currentGuess + 1;
        }
        const nextNumber = generateRandomBetween(
            currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber);
        //setRounds(curRounds => curRounds + 1);
        setPastGuesses(curPastGuesses => [nextNumber.toString(), ...curPastGuesses]);
    };

    return (
        <View style={styles.screen}>
            <Text style={DefaultStyles.title}>Opponent's Guess</Text>
            <NumberContainer >
                {currentGuess}
            </NumberContainer>
            <Text>Is your number</Text>
            <Card style={styles.buttonContainer}>
                <MainButton onPress={nextGuessHandler.bind(this, 'lower')} >
                    {/*<Ionicons name="md-remove" size={24} color="white" />*/}
                    LOWER
                    </MainButton>
                <MainButton onPress={nextGuessHandler.bind(this, 'greater')} >
                    {/*<Ionicons name="md-add" size={24} color="white" />*/}
                    GREATER
                </MainButton>
            </Card>
            <View style={styles.listContainer}>
                {/*<ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses.map((guess, index) => (
                        renderListItem(guess, pastGuesses.length - index)
                    ))}
                </ScrollView>*/}
                <FlatList 
                keyExtractor={(item) => item} 
                data={pastGuesses} 
                renderItem={renderListItem.bind(this, pastGuesses.length)} 
                contentContainerStyle={styles.list}/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
        width: 400,
        maxWidth: '90%',
        padding: 5,
    },
    listItem: {
        borderColor: Color.primary,
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        borderRadius: 20,
    },
    listContainer: {
        width: '60%',
        flex: 1, // allows scrolling in android when you exceed boundaries
    },
    list: {
        //alignItems: 'center',
        justifyContent: 'flex-end',
        //justifyContent: 'flex-start',
        flexGrow: 1, // Allows the scroll view to grow from bottom properly
    }
});

export default GameScreen;