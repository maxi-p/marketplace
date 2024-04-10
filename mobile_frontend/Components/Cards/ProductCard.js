/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useEffect, useRef } from 'react';
import { Alert, Animated, Easing, Image, Pressable, StyleSheet, Text, View } from 'react-native';

const defaultProduct = {
    catagory: 'Catagory?',
    price: '$???',
    title: '???',
    seller: 'Seller?',
    condition: 'Condition?',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ' +
    'incididunt ut labore et dolore magna aliqua. Sit amet justo donec enim diam vulputate ' +
    'ut pharetra sit. Nunc congue nisi vitae suscipit tellus mauris a diam. Fermentum posuere ' +
    'urna nec tincidunt praesent. Turpis nunc eget lorem dolor sed viverra ipsum nunc aliquet. ' +
    'Vivamus arcu felis bibendum ut tristique et egestas quis ipsum. Sed ullamcorper morbi ' +
    'tincidunt ornare massa eget egestas purus. Integer vitae justo eget magna fermentum. ' +
    'Nisi quis eleifend quam adipiscing vitae proin sagittis. Lacus sed viverra tellus in. ' +
    'Amet est placerat in egestas erat imperdiet sed.',
};
const ProductCard = ({product, onTouch, onSellerTouch}) => {
    product ??= defaultProduct;
    onTouch ??= () => {
        Alert.alert('Card Touched', product.catagory + '\n' + product.dise);
    };
    onSellerTouch ??= () => {
        Alert.alert('Seller Touched', product.seller);
    };

    // Image
    const staticImage = require('../../Images/PlaceHolder.png');
    // Card
    return (
        <View style={[styles.itemContainter]}>
            <Pressable onPress={onTouch}
            android_ripple={{color: 'gray', foreground: true}}
            >

                {/* Image, Catagory and Seller */}
                <View style={styles.imageBox} >
                    <Image
                        source={
                            product?.image?.image ?
                                {uri: `data:${product.image.image.contentType};base64,${product.image.image.data}`} :
                                staticImage
                        }
                        style={styles.image}
                    />
                    <View style={styles.catagoryBox}>
                        <Text
                        style={[styles.text, styles.catagoryText]}
                        numberOfLines={1}
                        >
                            {product.catagory ?? 'catagory'}
                        </Text>
                    </View>
                    <Pressable onPress={onSellerTouch}
                        style={styles.sellerBox}
                        android_ripple={{
                            color :'gray',
                            foreground: true,
                        }}>
                        <Image source={staticImage} style={styles.sellerImage} />
                        <Text style={[styles.text, styles.sellerText]}
                        numberOfLines={1}
                        >
                            {product.seller ?? 'N/A'}
                        </Text>
                    </Pressable>
                </View>
                <View style={styles.rows} >
                    {/* Title */}
                    <View style={[styles.row, styles.titleRow]}>
                        <Text style={[styles.text, styles.titleText]}
                        numberOfLines={1}
                        >
                            {product.title ?? 'N/A'}
                        </Text>
                    </View>
                    {/* Condition and Price */}
                    <View style={[styles.row, styles.conditionRow]}>
                        <Text style={[styles.text, styles.conditionText]}
                        numberOfLines={2}
                        >
                            {product.condition ?? 'N/A'}
                        </Text>
                        <View style={styles.priceBox}>
                            <Text
                            style={[styles.text, styles.priceText]}
                            numberOfLines={1}
                            >
                                {product.price ?? '$N/A'}
                            </Text>
                        </View>
                    </View>
                    {/* discription */}
                    <View style={[styles.row, styles.descRow]}>
                        <Text style={[styles.text, styles.descText]}
                        numberOfLines={3}
                        >
                            {product.desc ?? 'N/A'}
                        </Text>
                    </View>
                </View>
            </Pressable>
        </View>
    );
};

export const LoadingCard = () => {
    const fadeAnim = useRef(new Animated.Value(0.3)).current;
    useEffect(() => {

        const [startValue, endValue] = [0.3, 0.7];
        const loopTime = 4e3;
        const easing = Easing.ease;

        Animated.loop(
            Animated.sequence([
                Animated.timing(fadeAnim, {
                    toValue: endValue,
                    duration: loopTime / 2,
                    useNativeDriver: true,
                    easing: easing,
                    isInteraction: false,
                }),
                Animated.timing(fadeAnim, {
                    toValue: startValue,
                    duration: loopTime / 2,
                    useNativeDriver: true,
                    easing: easing,
                    isInteraction: false,
                }),
        ])).start();
    }, [fadeAnim]);
    return (
        <Animated.View style={[styles.itemContainter,
        {
            backgroundColor:'#ccc', elevation: 2,
            opacity: fadeAnim,
        }]}>
            <View style={{
                height: 200,
                backgroundColor: '#777',
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                }}/>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    itemContainter: {
        backgroundColor: 'floralwhite',
        borderRadius: 20,
        elevation: 10,
        margin: 10,
        minHeight: 310,
    },
    imageBox: {},
    image: {
        width: '100%',
        height: 200,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    catagoryBox: {
        position: 'absolute',
        top: 5,
        right: 5,
        borderWidth: 1,
        padding: 3,
        borderRadius: 50,
        backgroundColor: 'white',
        maxWidth: 150,
    },
    catagoryText: {
        textAlignVertical: 'center',
        top: -1,
    },
    rows: {
        padding: 10,
        paddingTop: 0,
    },
    row: {
    },
    text: {
        color: 'black',
        fontSize: 16,
    },
    titleRow: {
        alignItems: 'center',
    },
    titleText: {
        fontWeight: 'bold',
        fontSize: 25,
    },
    conditionRow: {
        minHeight: 40,
        justifyContent: 'center',
    },
    conditionText: {
        maxWidth: 190,
        fontSize: 18,
    },
    sellerBox: {
        position: 'absolute',
        backgroundColor: 'lavender',
        bottom: 5,
        right: 5,
        borderWidth: 0.8,
        borderRadius: 50,

        flexDirection: 'row',
        alignItems: 'center',
    },
    sellerImage: {
        width: 40,
        height: 40,
        borderRadius: 50,
    },
    sellerText: {
        paddingHorizontal: 5,
        maxWidth: 130,
    },
    priceBox: {
        position: 'absolute',
        right:0,
        maxWidth: 150,
    },
    priceText: {
        fontSize: 20,
        color: 'dimgray',
    },
    descRow: {
    },
    descText: {
    },
});

export default ProductCard;
