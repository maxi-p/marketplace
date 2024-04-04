/* eslint-disable prettier/prettier */
// Search Bar Element Based on https://blog.logrocket.com/create-react-native-search-bar-from-scratch/
import React, { useState } from 'react';
import { Keyboard, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';

const SearchBar = ({clicked, searchPhrase, setSearchPhrase, setClicked}) => {
    const [currentValue, setCurrentValue] = useState(`${searchPhrase}`);
    return (
        <View style={styles.container}>
            <View style={[styles.searchBar,
            clicked? styles.searchBar__clicked : styles.searchBar__unclicked]}>
            <FontAwesome name="search" size={20} color="black"/>
            <TextInput
                style={styles.input}
                placeholder="Search"
                placeholderTextColor="dimgray"
                value={currentValue}
                onChangeText={setCurrentValue}
                onEndEditing={() => setSearchPhrase(currentValue)}
                onFocus={ () => {setClicked(true);} }
            />
            {clicked && (
                <Entypo name="cross" size={20}
                    color="black"
                    onPress={() => {
                        setSearchPhrase('');
                        setClicked(false);
                    }}
                />
            )}
            </View>
        </View>
   );
};

const styles = StyleSheet.create({
    container: {
        margin:15,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection:'row',
        height: 'auto',
    },
    searchBar: {
        paddingHorizontal: 10,
        backgroundColor:'lavender',
        color:'#d9dbda',
        borderRadius:15,
        alignItems: 'center',
        flexDirection: 'row',
    },
    searchBar__clicked: {
        justifyContent: 'space-evenly',
    },
    searchBar__unclicked: {
    },
    input: {
        width:'85%',
        color:'black',
    },
    text: {
        color:'deepskyblue',
        margin: 15,
    }
});

export default SearchBar;
