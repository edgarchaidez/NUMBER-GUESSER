import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Color from '../constants/color';
import TitleText from './TitleText';

const Header = props => {
    return (
        <View style={styles.header}>
            <TitleText style={styles.headerTitle}>{props.title}</TitleText>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 90,
        paddingTop: 36,
        backgroundColor: Color.primary,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: 'black',
        borderBottomWidth: .5 ,
    },
    headerTitle: {
        color: 'black',
        fontFamily: 'open-sans-bold',
        fontSize: 20
    }
});

export default Header;