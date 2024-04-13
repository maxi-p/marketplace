/* eslint-disable prettier/prettier */
import React, {useContext, useState, useEffect, useCallback} from 'react';
import { Alert, Button, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { UserContext } from '../../logic/UserContext';
import { buildPath } from '../../logic/NetworkLogic';
import IntrestList from '../../Components/IntrestList';

// Debugging settings
const Debugging = false;
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

    // const {user, setUser} = useContext(UserContext);
    const user = {username: 'use'};

    const inDataPart = route?.params.product ?? defaultProduct;
    const inData = {
            isSeller: Debugging ? true : (inDataPart.seller == user.username),
            ...inDataPart,
    };
    

    const [product, setProduct] = useState(inData);
    const [interested, setInterested] = useState(product.usersInterested.includes(user.id));

    //EFFFECTS
    useEffect(() => {
        const updateID = route.params.updateID;
        console.log("TEST UPdateID: " + updateID);
        if (updateID) {
            const Post = GetPostFromID(updateID, user.username);
            Post.then((retVal) => {
            setProduct(retVal);
            });
        }
    }, [route.params, GetPostFromID, user.username]);

    // Events TODO

    const addIntrest = (event) => {
        console.log('Adding Intrest');
        if (!interested){
            addIntrestFetch(product._id, user.id);
            product.usersInterested.push(user.id);
            setInterested(true);
            console.log("Intrest Added");
        }
    };

    const addIntrestFetch = async (postID, userID) => {
        var js = JSON.stringify({
            userId: userID,
            postId: postID,
        });
        try {
            console.log('Adding Interest Fetch');
            const result = await fetch(buildPath('api/interestAddition'),
                {
                    method: 'POST',
                    body:js,
                    headers:{'Content-Type': 'application/json'},
                });
            console.log(JSON.stringify(result, null, 4));
            const response = JSON.parse(await result.text());
            console.log(JSON.stringify(response, null, 4));
            if (response.error){
                throw new Error(response.error);
            }
        }
        catch (e) {
            console.error(e.name + '\n\t' + e.message);
            Alert.alert(e.name, e.message);
            goBack(navigation);
            return null;
        }
        finally {
            console.log('IntrestAddition Finished');
        }

    };
    const editItem = (event) => {
        navigation.navigate('SellUpdateModal', {
            product: product,
        });
    };


    const GetPostFromID = useCallback(async (ID, username) => {
        var obj = {
            postId: ID.toString(),
        };
        var js = JSON.stringify(obj);
        try {
            const result = await fetch(buildPath('api/getPost'),
                {
                    method: 'POST',
                    body:js,
                    headers:{'Content-Type': 'application/json'},
                });
            console.log(JSON.stringify(result, null, 4));
            const response = JSON.parse(await result.text());
            console.log(JSON.stringify(response, null, 4));
            if (response.error){
                throw new Error(response.error);
            }
            var retval = {
                _id: ID,
                seller: response.post.username,
                title: response.post.name,
                catagory: response.post.genre,
                price: response.post.price,
                desc: response.post.desc,
                condition: response.post.condition,
                image: response.post.image,
                isSeller: Debugging ? true : (response.post.username == username),
                usersInterested: response.post.usersInterested,
            };
        }
        catch (e) {
            console.error(e.name + '\n\t' + e.message);
            Alert.alert(e.name, e.message);
            goBack(navigation);
            return null;
        }
        finally {
            console.log('Post Fectch  Finished');
            return retval;
        }
    }, [navigation]);

    if (!product) {
        goBack(navigation);
    }
    return (
        <View style={styles.container}>
            {/* Image View */}
            <Pressable style={styles.imageBox}
             onPress={() => goToImage(navigation,
                product?.image?.image ?
                    {uri: `data:${product.image.image.contentType};base64,${product.image.image.data}` } :
                    tempImage
             )}
            >
                <Image
                 source={
                    product?.image?.image ?
                    {uri: `data:${product.image.image.contentType};base64,${product.image.image.data}` } :
                        tempImage
                 }
                 style={styles.image}
                />
            </Pressable>

            {/* Back Button */}
            <Pressable style={styles.backButton}
            onPress={() => goBack(navigation)}
            >
                <IonIcons name="arrow-back" size={30}/>
            </Pressable>

            {/* Edit Item */}
            {product?.isSeller && (
                <Pressable style={styles.editBox}
                onPress={editItem}
                >
                    <FontAwesome name="pencil"
                        size={30}
                        color="black"
                    />
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
                        {product.desc ?? 'N/A'}
                    </Text>
                </ScrollView>
            </View>
            {/*Button*/}
            {
                !(product?.isSeller) &&
                <View style={[styles.buttonRow]}>
                    <View style={styles.button}>
                    <Button
                        onPress={addIntrest}
                        title={
                            interested ?
                            "I'm Interested" :
                            'Add Interest'
                            }
                        color={'purple'}
                        disabled={interested}
                    />
                    </View>
                </View>
            }
            {/* Intrest List */}
            {
                product?.isSeller &&
                <View style={styles.intrestListRow}>
                    <IntrestList
                        UserIDs={product.usersInterested}
                        style={styles.intrestList}
                    />
                </View>
            }
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
        backgroundColor: '#AF9FC9',

        margin: 5,
        padding: 3,
        right: 0,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems:'center',

        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 50,
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
    intrestListRow: {},
    intrestList: {},
});

export default ProductModal;
