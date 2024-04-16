/* eslint-disable prettier/prettier */
import React, { useEffect, useState, useContext } from 'react';
import { Alert, Button, Image, KeyboardAvoidingView, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useForm, SubmitHandeler, Controller } from 'react-hook-form';
import IonIcons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {launchImageLibrary} from 'react-native-image-picker';
import { buildPath } from '../logic/NetworkLogic';
import { UserContext } from '../logic/UserContext';

const SellUpdateProduct = ({product, route, navigation}) => {
    // Constants
    const tempImage = require('../Images/PlaceHolder.png');
    const {user, setUser} = useContext(UserContext);
    const username = user.username ?? 'N/A';

    const uProduct = product ?? route?.params?.product ?? null;

    // States
    const [PhotoUpdate, setPhotoUpdate] = useState(false);
    // Form
    const {
        handleSubmit,
        formState: {errors},
        control,
        setValue,
        getValues,
    } = useForm({
        defaultValues: {
            title: '',
            genre: '',
            condition: '',
            price: 0.0,
            desc: '',
            photo: null,
        },
    });

    // Effects
    // Prefill Data if editing Post
    useEffect( () => {
        if (uProduct) {
            setValue('title', uProduct.title);
            setValue('genre', uProduct.catagory);
            setValue('condition', uProduct.condition);
            setValue('price', uProduct.price);
            setValue('desc', uProduct.desc);
            if (uProduct.image) {
                setValue('photo', {
                    type: uProduct.image.image.contentType,
                    uri: `data:${uProduct.image.image.contentType};base64,${uProduct.image.image.data}`,
                    name: uProduct.image.name,
                });
            }
        }
    }, [uProduct, setValue]);

    // Functions
    const createPost = async (inData) =>
    {
        const formData = new FormData();
        console.log(inData);
        formData.append('name', inData.title);
        formData.append('username', user.username);
        formData.append('genre', inData.genre);
        formData.append('price', inData.price);
        formData.append('desc', inData.desc);
        formData.append('condition', inData.condition);
        formData.append('image', (inData.photo && PhotoUpdate) ? {
            type: inData.photo.type,
            uri:inData.photo.uri,
            name:inData.photo.fileName} :
            null
        );

        Alert.alert('Upload Product: ' + inData.title + '?', null,
        [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'OK',
                onPress: async () => {
                    try {
                        await Upload(formData, 'api/createPost');
                        Alert.alert('Upload Successful');
                        goBack(false);
                    } catch (error) {
                        Alert.alert(error.toString());
                    }
                },
                style: 'default',
        }]);
    };
    const updatePost = async (inData) =>
    {
        const formData = new FormData();
        console.log(inData);
        formData.append('id', uProduct._id);
        formData.append('username', username);
        formData.append('name', inData.title);
        formData.append('genre', inData.genre);
        formData.append('price', inData.price);
        formData.append('desc', inData.desc);
        formData.append('condition', inData.condition);
        console.log('Update: ' + PhotoUpdate);
        formData.append('image', (inData.photo && PhotoUpdate) ? {
            type: inData.photo.type,
            uri:inData.photo.uri,
            name:inData.photo.fileName} :
            null
        );

        Alert.alert('Update Product ' + inData.title + '?', null,
        [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'OK',
                onPress: async () => {
                    try {
                        await Upload(formData, 'api/editPost');
                        Alert.alert('Update Successful');
                        goBack(true);
                    } catch (error) {
                        Alert.alert(error.toString());
                    }
                },
                style: 'default',
        }]);

    };
    const Upload = async (formData, ApiPath) => {
        console.log(formData.toString());
        console.log('Uploading Files ...');

        try {
            let response = await fetch(buildPath(ApiPath), {
                method: 'POST',
                body:formData,
                headers:{'Content-Type': 'multipart/form-data'},
            });
            console.log(response.toString());
            let result = await response.json();
            console.log(result);
            if (result.error)
            {
                throw new Error(result.error);
            }
        }
        catch (e) {
            console.error(e);
            Alert.alert(e.toString());
            throw e;
        }
        finally {
            console.log('done uploading to ' + ApiPath);
        }
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

    function goBack( Update) {
        let active = 1;
        if (!navigation || (!active) ) {
            Alert.alert('Backbutton Pressed');
            console.log('Backbutton Pressed');
            return;
        }
        if (Update) {
        navigation.navigate('ProductModal', {
            updateID: uProduct._id,
        });
        return;
        }
        navigation.goBack();
        return;
    }

    // HTML
    return (
        <View style={styles.background}>
            <View style={styles.container}>
                <KeyboardAvoidingView
                    behavior="padding"
                    keyboardVerticalOffset={30}
                >
                    <ScrollView style={styles.scroll}>
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
                                                    setPhotoUpdate(true);
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
                                <IonIcons name="arrow-back" size={30} color="black"/>
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
                                        style={[styles.textInput, styles.title, errors.title && styles.titleError]}
                                        placeholder="TITLE"
                                        placeholderTextColor="darkgray"
                                        numberOfLines={1}
                                        autoCapitalize="sentences"
                                        textAlign="center"
                                        borderBottomWidt={5}

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
                        {/* Genee */}
                        <Controller
                            name="genre"
                            control={control}
                            rules={{
                                required: 'This Value is Required',
                            }}
                            render={({field: {onChange, onBlur, value}}) =>
                            {
                                return (
                                <RegInput
                                    header="Genre"
                                    placeholder="HERE"

                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    error={errors.genre}
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
                                    beforeText="$"

                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value.toString()}
                                    error={errors.price}
                                />);
                            }}
                        />

                        {/* Description */}
                        <Controller
                            name="desc"
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
                                    error={errors.desc}
                                />);
                            }}
                        />
                    <View style={styles.submitButton}>
                        <Button
                            title={uProduct ? 'Update Product' : 'Create Product'}
                            onPress={handleSubmit(uProduct ? updatePost : createPost)}
                        />
                    </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        </View>
    );
};

// Regulated Input
const RegInput = ({header, onBlur, onChangeText, value, error, placeholder, beforeText, ...props}) =>
{

    return (
        <View style={styles.row}>
            {header && (
                <View styles={[styles.row, styles.headerRow, props.headerStyle]}>
                    <Text style={[styles.text, styles.headerText]}>{header}</Text>
                </View>
            )}
            <View style={[styles.textInputBox, error? styles.textInputBoxError: styles.textInputBoxGood]}>
            <Text
                style={[styles.textInputText, error ? styles.textInputTextError : styles.textInputTextGood]}
            >
            {beforeText}
            </Text>
            <TextInput
                {...props}
                placeholder={placeholder}
                onBlur={onBlur}
                onChangeText={onChangeText}
                value={value}
                style={error ? styles.textInputError : styles.textInput}
            />
            </View>
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
    background: {
        width: '100%',
        height: '100%',
        backgroundColor: 'mediumorchid',
    },
    container: {
        backgroundColor: 'floralwhite',
        borderRadius: 20,
        minHeight: '95%',
        marginTop: '5%',
        marginHorizontal: 5,
        elevation: 10,
        flexDirection: 'column',
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
        opacity: 0.5,
    },
    content: {},
    text: {
        color: 'black',
        fontSize: 17,
    },
    scroll: {
    },


    row: {
        marginBottom: 10,
    },
    header: {},
    headerText: {},

    errorRow: {
        margin: 5,
        marginTop: 0,
        marginLeft: 40,
        paddingTop: 0,
        textAlignVertical: 'top',
    },
    errorText: {
        color: 'red',
        fontSize: 12,

    },
    textInputBox: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderWidth: 1,
        margin: 10,
        color:'black',
        alignItems: 'center',

    },
    textInputBoxError: {
        borderColor: 'red',
        color: 'red',
    },
    textInputBoxGood: {
        color: 'black',
    },
    textInputText: {
        color: 'black',
        paddingLeft: 10,
    },
    textInputTextGood: {},
    textInputTextError: {},

    textInput: {
        flex: 1,
        padding: 0,
        marginLeft: 5,
        color: 'black',
    },
    textInputError: {
        flex: 1,
        padding: 0,
        marginLeft: 5,
        color: 'red',
    },

    titleRow: {
        alignItems: 'center',
        paddingBottom: 10,
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        borderWidth: 0,
        borderBottomWidth: 1,
        width: '75%',
        backgroundColor: 'floralwhite',
        color: 'black',
        borderColor: 'black',
    },
    titleError: {

        borderColor: 'red',
    },
    titleRowError: {},
    titleErrorText: {
        marginLeft: '25%',
    },

    backButton: {
        backgroundColor: 'lavender',
        position: 'absolute',
        top: 5,
        left: 5,
        borderRadius: 50,
        borderWidth: 1,
    },
    submitButton: {
        marginHorizontal: 10
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

export default SellUpdateProduct;
