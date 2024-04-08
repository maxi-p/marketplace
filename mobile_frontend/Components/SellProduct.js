/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Alert, Button, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useForm, SubmitHandeler, Controller } from 'react-hook-form';
import IonIcons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {launchImageLibrary} from 'react-native-image-picker';


const SellProduct = () => {
    // Constants
    const tempImage = require('../Images/PlaceHolder.png');

    // States
    const [ProductData, setProductData] = useState(
        {
            id: null,
            title: '',
            genere: '',
            condition: '',
            price: 0,
            desc: '',
    });
    const [ImageData, setImageData] = useState(null);
    // Form
    const {
        handleSubmit,
        formState: {errors},
        control,
    } = useForm({
        defaultValues: {
            id: null,
            title: '',
            genere: '',
            condition: '',
            price: 0.0,
            disc: '',
            photo: null,
        },
    });

    // Functions
    const submitForm = (formData) =>
    {
        Alert.alert('Submitted?');
        console.log(formData);
    };
    const getPhoto = () => {
        const options = {
            mediaType: 'photo',
            includeBase64: true,
        };
        return launchImageLibrary(options).then( (response) => {
            if (response.didCancel || response.errorCode) {
                Alert.alert('error, photo not recived');
                return null;
            }
            if (response.assets[0].fileSize < 14e6)
            {
                return response.assets;
            }
            Alert.alert('File Size too Large');
            return null;


        });
    };

    function goBack(navigation) {
        let active = 1;
        if (!navigation || (!active) ) {
            Alert.alert('Backbutton Pressed');
            console.log('Backbutton Pressed');
            return;
        }
        navigation.goBack();
        return;
    }

    // HTML
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                {/* Photo Picker */}
                <Controller 
                    name="photo"
                    control={control}
                    render={({field: {onChange, value}}) => {
                        return (
                            <>
                            <Image source={value?.uri ? {uri: value.uri} : tempImage} style={styles.image}/>
                            <View style={styles.loadImageButton}>
                                <Pressable style={{transform:[{rotate: '90deg'}]}}
                                onPress={() => {
                                    getPhoto().then( (retval) => {
                                        onChange(retval[0]);
                                        });
                                    }}
                                >
                                    <AntDesign name="upload" size={40} color="white"/>
                                </Pressable>
                            </View>
                            </>
                    );}}
                />


                {/* Back Button */}
                <Pressable style={styles.backButton}
                onPress={() => goBack()}
                >
                    <IonIcons name="arrow-back" size={30}/>
                </Pressable>
            </View>

            {/* Title */}
            <View style={[styles.row, styles.titleRow]}>
                <Controller
                    name="title"
                    control={control}
                    rules={{
                        required: 'This Value is Required',
                    }}
                    render={({field: {onChange, onBlur, value} }) => {
                        return (
                        <TextInput
                            style={[styles.textInput, styles.title]}
                            placeholder="TITLE"

                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                        );
                    }}
                />
            </View>
            {errors.title && (
                <View style={[styles.row, styles.errorRow, styles.titleRowError]}>
                    <Text style={[styles.text, styles.errorText, styles.titleErrorText]}>
                    {errors.title.message || "ERROR HERE"}
                    </Text>
                </View>
            )}
            <ScrollView style={styles.scroll}>
                {/* Genere */}
                <Controller
                    name="genere"
                    control={control}
                    rules={{
                        required: 'This Value is Required',
                    }}
                    render={({field: {onChange, onBlur, value}}) =>
                    {
                        return (
                        <RegInput
                            header="Genere"
                            placeholder="HERE"

                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            error={errors.genere}
                        />);
                    }}
                />

                {/* Condition */}
                <Controller
                    name="condition"
                    control={control}
                    rules={{
                        required: 'This Value is Required',
                    }}
                    render={({field: {onChange, onBlur, value}}) =>
                    {
                        return (
                        <RegInput
                            header="Condition"
                            placeholder="HERE"

                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            error={errors.condition}
                        />);
                    }}
                />

                {/* Price */}
                <Controller
                    name="price"
                    control={control}
                    rules={{
                        required: 'This Value is Required',
                    }}
                    render={({field: {onChange, onBlur, value}}) =>
                    {
                        return (
                        <RegInput
                            header="Price"
                            placeholder="HERE"

                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            error={errors.price}
                        />);
                    }}
                />

                {/* Description */}
                <Controller
                    name="disc"
                    control={control}
                    rules={{
                        required: 'This Value is Required',
                    }}
                    render={({field: {onChange, onBlur, value}}) =>
                    {
                        return (
                        <RegInput
                            header="Description"
                            placeholder="HERE"

                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            error={errors.disc}
                        />);
                    }}
                />
            </ScrollView>
            <View style={styles.submitButton}>
                <Button title="Submit" onPress={handleSubmit(submitForm)} />
            </View>
        </View>
    );
};

// Regulated Input
const RegInput = ({header, onBlur, onChangeText, value, error, placeholder, ...props}) =>
{

    return (
        <View style={styles.row}>
            {header && (
                <View styles={[styles.row, styles.headerRow, props.headerStyle]}>
                    <Text style={[styles.text, styles.headerText]}>{header}</Text>
                </View>
            )}
            <TextInput
                {...props}
                placeholder={placeholder}
                onBlur={onBlur}
                onChangeText={onChangeText}
                value={value}
            />
            {error && (
                <View style={[styles.row, styles.errorRow, props.errorRowStyle]}>
                    <Text style={[styles.text, styles.errorText, props.errorTextStyle]}>
                        {error.message || 'Error Here'}
                    </Text>
                </View>
            )}
        </View>
    );
};

const Heights = {
    image: {w: '100%', h: 250},
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'floralwhite',
        borderRadius: 20,
        minHeight: '95%',
        marginTop: '5%',
        marginHorizontal: 5,
        elevation: 10,
        flexDirection: 'column',
        flex: 1,
    },
    imageContainer: {
        borderTopRightRadius: 20,
        backgroundColor: 'black',
        borderTopLeftRadius: 20,
    },
    image: {
        width: Heights.image.w,
        height: Heights.image.h,
        resizeMode: 'cover',
        overflow: 'hidden',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        opacity: 0.5
    },
    content: {},
    text: {},
    scroll: {
        flex: 1,
    },


    row: {},
    header: {},
    headerText: {},

    errorRow: {},
    errorText: {},
    textInput: {},

    titleRow: {},
    title: {},
    titleRowError: {},
    titleErrorText: {},

    backButton: {
        backgroundColor: 'lavender',
        position: 'absolute',
        top: 5,
        left: 5,
        borderRadius: 50,
    },
    submitButton: {
        marginBottom: 20,
        marginHorizontal: 10,
    },
    loadImageButton: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default SellProduct;
