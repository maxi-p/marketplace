/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Alert, FlatList, StyleSheet, Text, View} from 'react-native';
import ProductCard, { LoadingCard } from './Cards/ProductCard';

import * as testData from "../TestData/TestProducts.json"
import SearchBar from './SearchBar';
import { buildPath } from '../logic/NetworkLogic';

// Test Settings
const localTest = false;
const DelayTime = 3e3;
const fetchAmount = 7;

// Test Functions
function resolveAfterDelay(Delay, x) {
    return new Promise((resolve) => { 
        setTimeout(() => {
            resolve(x);
        }, Delay);
     });
 }
async function fetchDataTest(index) {
    var retval = {data: [], endReached: false};
    var datalen = testData.data.length;
    if (index >= datalen) {
        retval.endReached = true;
        return retval;
    }
    retval.data = testData.data.slice(index, index + fetchAmount);
    if (index + fetchAmount >= datalen) {
        retval.endReached = true;
    }
    await resolveAfterDelay(DelayTime, null);
    return retval;

}

// Functions
async function fetchData(index, search = '') {
    if (localTest) {
        return fetchDataTest(index);
    }
    return fetchData_Real(index, search);
}

async function fetchData_Real(index, search = '') {
    var retval = {data: [], endReached: false, cnt: 0};
    var obj = {
        username: search,
        name: search,
        genre: search,
        minIndex: index,
        maxIndex: index - 1 + fetchAmount,
    };


    var js = JSON.stringify(obj);
    console.log('Fetching Products');
    try {
        const result = await fetch(buildPath('api/searchPost'),
            {
                method: 'POST',
                body:js,
                headers:{'Content-Type': 'application/json'},
            });
            const response = JSON.parse(await result.text());

            response.results.forEach(element => {
               retval.data.push( {
                _id: element._id,
                seller: element.username,
                title: element.name,
                catagory: element.genre,
                price: element.price,
                desc: element.desc,
                condition: element.condition,
                image: element.image,
               });
            });
    }
    catch (e) {
        console.error(e.name + '\n\t' + e.message);
        Alert.alert(e.name, e.message);
    }
    finally {
        console.log('Fetch Products Finished');
        retval.cnt = retval.data.length;
        retval.cnt < fetchAmount ? retval.endReached = true : null;
        console.log(JSON.stringify(retval, null, 4));
        return retval;
    }

}


// const defaultProduct = {
//     title: 'ListItem',
//     catagory: 'Catagory?',
//     price: '$???',
//     seller: 'Seller?',
//     condition: 'Condition?',
//     disc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ' +
//     'incididunt ut labore et dolore magna aliqua. Sit amet justo donec enim diam vulputate ' +
//     'ut pharetra sit. Nunc congue nisi vitae suscipit tellus mauris a diam. Fermentum posuere ' +
//     'urna nec tincidunt praesent. Turpis nunc eget lorem dolor sed viverra ipsum nunc aliquet. ' +
//     'Vivamus arcu felis bibendum ut tristique et egestas quis ipsum. Sed ullamcorper morbi ' +
//     'tincidunt ornare massa eget egestas purus. Integer vitae justo eget magna fermentum. ' +
//     'Nisi quis eleifend quam adipiscing vitae proin sagittis. Lacus sed viverra tellus in. ' +
//     'Amet est placerat in egestas erat imperdiet sed.',
// };
// Props For ProductList
// onTouch, onSellerTouch, children

function ProductList(props) {
    // States
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [index, setIndex] = useState(0);
    const [refreshing, setRefreshing] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [searchClicked, setSearchClicked] = useState(false);
    const [end, setEnd] = useState(false);

     const OpenProduct = (item) => {
        props.navigation.navigate('ProductModal', {
            product: item,
        });
     };
    // Render Functions
    const renderItem = ({item}) => {
        var onTouchEvent = () => OpenProduct(item);
        var onSellerTouchEvent = null;
        if (props.onTouch)
        {
            onTouchEvent = () => {props.onTouch(item);};
        }
        if (props.onSellerTouch)
        {
            onSellerTouchEvent = () => {props.onTouch(item);};
        }
        return (
            <ProductCard product={item}
            onTouch={onTouchEvent}
             onSellerTouch={onSellerTouchEvent}
            />
        );
    };
    // Inner Elements
    const footer = () => {
        if (loading) {
            return <LoadingCard />;
        }
        return null;
    };

    const header = () =>
    {
        return (
            <View
             style={styles.header}
            >
                <View style={styles.inHeader} >
                    <SearchBar
                        clicked={searchClicked}
                        setClicked={setSearchClicked}
                        searchPhrase={searchText}
                        setSearchPhrase={setSearchText}
                    />
                </View>
            </View>
    );};


    // Fetch Data -- First Load
    useEffect(() => {
        const addData = async () => {
            var inData = await fetchData(0, searchText);
            setData(inData.data);
            setLoading(false);
            setIndex(inData.cnt);
            setEnd(inData.endReached);
        };
        setLoading(true);
        addData();
    }, [searchText]);

    const getData = async () => {
        if (loading === false && end === false) {
            setLoading(true);
            var inData = await fetchData(index, searchText);
            setData([...data, ...(await inData).data]);
            setIndex(index + inData.cnt);
            setLoading(false);
        }
    };
    const refresh = async () => {
        if (loading === false){
            setLoading(true);
            setRefreshing(true);
            var inData = await fetchData(0, searchText);
            setData([...(await inData).data]);
            setIndex(inData.cnt);
            setRefreshing(false);
            setLoading(false);
            setEnd(inData.endReached);
        }
    };


    return (
        <View
         style={styles.container}
        >
            <FlatList
                data={data}
                renderItem={renderItem}
                extraData={[loading, data]}
                ListFooterComponent={footer}
                onEndReached={getData}
                onEndReachedThreshold={1}
                onRefresh={refresh}
                refreshing={refreshing}
                style={props.style}

                ListHeaderComponent={header}
                stickyHeaderIndices={[0]}
                fadingEdgeLength={4}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        justifyContent:'center',
        alignItems:'center',
    },
    inHeader: {
        justifyContent:'center',
        width: '90%',
        elevation: 10,
        paddingTop: 10,
    },
    container: {
        backgroundColor: 'white',
    },
});

export default ProductList;
