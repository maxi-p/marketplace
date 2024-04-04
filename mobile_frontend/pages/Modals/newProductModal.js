/* eslint-disable prettier/prettier */
import React from 'react';
import { Alert, Button, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
// Debugging settings
const Debugging = true;
const defaultProduct = {
    catagory: 'Catagory??????????????????????????????????',
    price: '$????????????',
    title: '??????????????????????????????????????????????????????????????????????????????????',
    seller: 'Seller???????????????????????????????????????????????????????????????',
    condition: 'Condition????????????????????????????????????????????????????????????',
    disc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ' +
    'incididunt ut labore et dolore magna aliqua. Sit amet justo donec enim diam vulputate ' +
    'ut pharetra sit. Nunc congue nisi vitae suscipit tellus mauris a diam. Fermentum posuere ' +
    'urna nec tincidunt praesent. Turpis nunc eget lorem dolor sed viverra ipsum nunc aliquet. ' +
    'Vivamus arcu felis bibendum ut tristique et egestas quis ipsum. Sed ullamcorper morbi ' +
    'tincidunt ornare massa eget egestas purus. Integer vitae justo eget magna fermentum. ' +
    'Nisi quis eleifend quam adipiscing vitae proin sagittis. Lacus sed viverra tellus in. ' +
    'Amet est placerat in egestas erat imperdiet sed.' +
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ' +
    'incididunt ut labore et dolore magna aliqua. Sit amet justo donec enim diam vulputate ' +
    'ut pharetra sit. Nunc congue nisi vitae suscipit tellus mauris a diam. Fermentum posuere ' +
    'urna nec tincidunt praesent. Turpis nunc eget lorem dolor sed viverra ipsum nunc aliquet. ' +
    'Vivamus arcu felis bibendum ut tristique et egestas quis ipsum. Sed ullamcorper morbi ' +
    'tincidunt ornare massa eget egestas purus. Integer vitae justo eget magna fermentum. ' +
    'Nisi quis eleifend quam adipiscing vitae proin sagittis. Lacus sed viverra tellus in. ' +
    'Amet est placerat in egestas erat imperdiet sed.',
};

function goBack(navigation) {
    let active = 1;
    if (!navigation || (!active && Debugging)) {
        Alert.alert('Backbutton Pressed');
        console.log('Backbutton Pressed');
        return;
    }
    navigation.goBack();
    return;
}

function goToImage(navigation, image) {
    let active = 1;
    if (!navigation || (!active && Debugging)) {
        Alert.alert('Backbutton Pressed');
        console.log('Backbutton Pressed');
        return;
    }
    navigation.navigate('ImageModal', {
            image: image,
        });
    return;
}

const ProductModal = ({route, navigation}) => {
    // Const Values
    const tempImage = require('../../Images/PlaceHolder.png');
    const isSeller = true;

    const product = route?.params.product ?? defaultProduct;

    // Events TODO
    const addIntrest = (event) => {
        Alert.alert('Add Intrest', 'TODO');
        console.log('TODO: Add Intrest');
    };
    const getIntrest = (event) => {
        Alert.alert('Get Intrest', 'TODO');
        console.log('TODO: Get Intrest');
    };
    const editItem = (event) => {
        Alert.alert('Edit Item', 'TODO');
        console.log('TODO: edit Intrest');
    };

    if (!product) {
        goBack(navigation);
    }
    return (
        <View style={styles.container}>
            {/* Image View */}
            <Pressable style={styles.imageBox}
             onPress={() => goToImage(navigation, tempImage)}
            >
                <Image source={tempImage} style={styles.image} />
            </Pressable>

            {/* Back Button */}
            <Pressable style={styles.backButton}
            onPress={() => goBack(navigation)}
            >
                <IonIcons name="arrow-back" size={30}/>
            </Pressable>

            {/* Edit Item */}
            {isSeller && (
                <Pressable style={styles.editBox}
                onPress={editItem}
                >
                    <Text style={[styles.text, styles.editText]}>
                        Edit Product
                    </Text>
                </Pressable>
            )}

            {/* Content Section */}
            <View style={styles.content}>

                {/* Title Row */}
                <View style={[styles.row, styles.titleRow]}>
                    <Text style={[styles.text, styles.titleText]}
                     numberOfLines={1}
                    >
                        {product.title ?? 'N/A'}
                    </Text>
                </View>

                {/* Condition and Price Row */}
                <View style={[styles.row, styles.conditionPriceRow]}>
                    <Text style={[styles.text, styles.conditionText]}
                     numberOfLines={1}
                    >
                        {product.condition ?? 'N/A'}
                    </Text>
                    <Text style={[styles.text, styles.priceText]}
                     numberOfLines={1}
                    >
                        {product.price ?? 'N/A'}
                    </Text>
                </View>

                {/* Catagory and Seller Row */}
                <View style={[styles.row, styles.catSellerRow]}>
                    <Text style={[styles.text, styles.catagoryText]}
                     numberOfLines={1}
                    >
                        {product.catagory ?? 'N/A'}
                    </Text>
                    <Pressable onPress={null}
                        style={styles.sellerBox}
                        android_ripple={{
                            color :'gray',
                            foreground: true,
                        }}>
                        <Image source={tempImage} style={styles.sellerImage} />
                        <Text style={[styles.text, styles.sellerText]}
                        numberOfLines={1}
                        >
                            {product.seller ?? 'N/A'}
                        </Text>
                    </Pressable>
                </View>
                {/* Disc Row */}
                <ScrollView style={[styles.discRow]}
                 fadingEdgeLength={40}
                >
                    <Text style={[styles.text, styles.discText]}>
                        {product.disc ?? 'N/A'}
                    </Text>
                </ScrollView>
            </View>
            {/*Button*/}
            <View style={[styles.buttonRow]}>
                <View style={styles.button}>
                <Button
                    onPress={isSeller ? getIntrest : addIntrest}
                    title={isSeller ? 'Get Intrest' : "I'm Interested"}
                    color={'purple'}
                />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'floralwhite',
        borderRadius: 20,
        minHeight: '95%',
        marginTop: '5%',
        marginHorizontal: 5,
        elevation: 10,
    },
    imageBox: {
        height: '30%',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        overflow: 'hidden',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    backButton: {
        backgroundColor: 'lavender',
        position: 'absolute',
        top: 5,
        left: 5,
        borderRadius: 50,
    },
    editBox: {
        position: 'absolute',
        backgroundColor: 'lavender',
        margin: 5,
        padding: 3,
        right: 0,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 50,
        alignItems: 'center',
    },
    editText: {
        fontSize: 15,
    },
    content: {
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    text: {
        color: 'black',
        fontSize: 17,
    },
    titleRow: {
        justifyContent: 'center',
    },
    titleText: {
        fontSize: 25,
        fontWeight: 'bold',
    },
    conditionPriceRow: {},
    conditionText: {
        maxWidth: '70%',
    },
    priceText: {
        maxWidth: '30%',
    },
    catSellerRow: {},
    catagoryText: {
        maxWidth: '50%',
    },
    sellerBox: {
        backgroundColor: 'lavender',
        borderWidth: 0.8,
        borderRadius: 50,

        margin: 5,
        flexDirection: 'row',
        alignItems: 'center',
        maxWidth: "50%",
    },
    sellerImage: {
        width: 40,
        height: 40,
        borderRadius: 50,
    },
    sellerText: {
        paddingHorizontal: 5,
        maxWidth: "80%"
    },
    discRow: {
        maxHeight: 340,
    },
    discText: {
        fontSize: 15,
    },
    buttonRow: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 3,
        width: '100%',
    },
    button: {
        maxWidth: 250,
    },
});

export default ProductModal;
