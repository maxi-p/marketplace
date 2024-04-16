/* eslint-disable prettier/prettier */
// Search Bar Element Based on https://blog.logrocket.com/create-react-native-search-bar-from-scratch/
import React, { useEffect, useRef, useState } from 'react';
import { Keyboard, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';

const SearchBar = ({clicked, searchPhrase, setSearchPhrase, setClicked}) => {
    const [currentValue, setCurrentValue] = useState(`${searchPhrase}`);
    const searchBarRef = useRef(null);
    
    useEffect(() => {
        if (clicked) {
            searchBarRef.current.focus();
        }
        else {
            setSearchPhrase('');
            searchBarRef.current.blur();
        }
    }, []);

    return (
        <View style={styles.container}>
            <View style={[styles.searchBar, styles.searchBar__clicked]}>
            <FontAwesome name="search" size={20} color="black"/>
            <TextInput
                style={styles.input}
                placeholder="Search"
                placeholderTextColor="dimgray"
                value={currentValue}
                onChangeText={setCurrentValue}
                onEndEditing={() => {
                    console.log(currentValue);
                    setSearchPhrase(currentValue);}
                }
                onFocus={ () => {setClicked(true);} }
                ref={searchBarRef}
            />
            {clicked && (
                <Entypo name="cross" size={20}
                    color="black"
                    onPress={() => {
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
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection:'row',
        height: 'auto',
        borderRadius: 50,
    },
    searchBar: {
        paddingHorizontal: 10,
        backgroundColor:'lavender',
        color:'#d9dbda',
        borderRadius:50,
        borderWidth: 1,
        alignItems: 'center',
        flexDirection: 'row',
    },
    searchBar__clicked: {
        justifyContent: 'space-evenly',
    },
    input: {
        width:'90%',
        color:'black',
        marginHorizontal: 10,
    },
    text: {
        color:'deepskyblue',
        margin: 15,
    },
});

export default SearchBar;
