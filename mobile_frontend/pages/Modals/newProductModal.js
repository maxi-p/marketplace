/* eslint-disable prettier/prettier */
import React, {useContext, useState, useEffect, useCallback} from 'react';
import { Alert, Button, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import { UserContext } from '../../logic/UserContext';
import { buildPath } from '../../logic/NetworkLogic';
import IntrestList from '../../Components/IntrestList';
import UserButton from '../../Components/Buttons/UserButton';

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

    const {user, setUser} = useContext(UserContext);
    // const user = {username: 'maxi-p'};

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
            IntrestFetch(product._id, user.id, 'api/interestAddition');
            product.usersInterested.push(user.id);
            setInterested(true);
            console.log("Intrest Added");
        }
    };
    const remIntrest = (event) => {
        console.log('Removing Intrest');
        if (interested){
            IntrestFetch(product._id, user.id, 'api/interestDeletion');
            var Index = product.usersInterested.indexOf(user.id);
            if (Index > -1) {
                product.usersInterested.splice(Index ,1);
            }
            setInterested(false);
            console.log("Intrest Remove");
        }
    };

    const IntrestFetch = async (postID, userID, path) => {
        var js = JSON.stringify({
            userId: userID,
            postId: postID,
        });
        try {
            console.log(path + ' Fetch');
            const result = await fetch(buildPath(path),
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
            console.log(path + ' Finished');
        }

    };
    const editItem = (event) => {
        navigation.navigate('SellUpdateModal', {
            product: product,
        });
    };


    const deletePost = async () => {
        var obj = {
            id: product._id,
        };
        console.log('Deleting Post');
        try {
            const result = await fetch(buildPath('api/deletePost'),
            {
                method: 'POST',
                body: JSON.stringify(obj),
                headers:{'Content-Type': 'application/json'},
            });
            const response = JSON.parse(await result.text());
            console.log(JSON.stringify(response, null, 4));
            if (response.error) {
                throw new Error(response.error);
            }
            console.log('post removed');
        } 
        catch (e) {
            console.error(e.name + '\n\t' + e.message);
            Alert.alert(e.name, e.message);
            goBack(navigation);
            return null;
        }
    };

    const deletePress = () => {
        Alert.alert('Delete Post?', 'Do you want to delete this post?', [
            {
                text: 'Delete',
                onPress: () => {
                    deletePost();
                    Alert.alert('Post deleted');
                    navigation.goBack();
                },
            },
            {
                text: 'Cancel',
                onPress: () => {
                    Alert.alert('Post not deleted');
                },
                style: 'cancel',
            },
        ]);
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
        <View style={styles.background}>
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
                    <IonIcons name="arrow-back" size={30} color="black"/>
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

                {/* Delete Item */}
                {product?.isSeller && (
                    <Pressable style={styles.deleteBox}
                    onPress={deletePress}
                    >
                        <MatIcon name="delete-forever"
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
                        <View style={{maxWidth: '60%'}}>
                            <Text style={[styles.text]}>Condition:</Text>
                            <Text style={[styles.text, styles.conditionText]}
                            numberOfLines={1}
                            >
                                {product.condition ?? 'N/A'}
                            </Text>
                        </View>
                        <Text style={[styles.text, styles.priceText]}
                        numberOfLines={1}
                        >
                            ${product.price ?? 'N/A'}
                        </Text>
                    </View>

                    {/* Catagory and Seller Row */}
                    <View style={[styles.row, styles.catSellerRow]}>
                        <View style={{flex:1}}>
                            <Text style={[styles.text]}>Catagory:</Text>
                            <Text style={[styles.text, styles.catagoryText]}
                            numberOfLines={1}
                            >
                                {product.catagory ?? 'N/A'}
                            </Text>
                        </View>
                        <UserButton seller={product.seller} navigation={navigation}
                        />
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
                            onPress={interested ? remIntrest : addIntrest}
                            title={
                                interested ?
                                'Remove Interest' :
                                'Add Interest'
                                }
                            color={interested? 'darkred' : 'purple'}
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
        </View>
    );
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
    },
    imageBox: {
        height: '30%',
        backgroundColor: 'white',
        borderRadius: 20,
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
        borderWidth: 1,
        color: 'black',
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
    deleteBox: {
        position: 'absolute',
        backgroundColor: 'tomato',

        margin: 5,
        padding: 3,
        top: 50,
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
        margin: 10,
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
    conditionPriceRow: {
        marginBottom: 10,
    },
    conditionText: {
    },
    priceText: {
        maxWidth: '30%',
        fontSize: 20,
        color: 'dimgray',
    },
    catSellerRow: {
        marginBottom: 10,
    },
    catagoryText: {
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
        alignSelf: 'center',
    },
    discText: {
        fontSize: 15,
        color: 'dimgray',
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
    intrestListRow: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        flex:1,
        width: '100%',
        marginBottom: 20,
    },
    intrestList: {
        width: '95%',
    },
});

export default ProductModal;
