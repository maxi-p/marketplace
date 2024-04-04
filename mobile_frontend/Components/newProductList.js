/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Alert, FlatList, StyleSheet, Text, View} from 'react-native';
import ProductCard, { LoadingCard } from './Cards/ProductCard';

import * as testData from "../TestData/TestProducts.json"
import SearchBar from './SearchBar';

// Test Settings
const localTest = true;
const DelayTime = 3e3;
const fetchAmount = 5;

// Test Functions
function resolveAfterDelay(Delay, x) {
    return new Promise((resolve) => { 
        setTimeout(() => {
            resolve(x);
        }, Delay);
     });
}
async function fetchData(index) {
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

    // Render Functions
    const renderItem = ({item}) => {
        var onTouchEvent=null;
        var onSellerTouchEvent=null;
        if (props.onTouch)
        {
            onTouchEvent = () => {props.onTouch(item)};
        }
        if (props.onSellerTouch)
        {
            onSellerTouchEvent = () => {props.onTouch(item)};
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
                <SearchBar 
                    clicked={searchClicked}
                    setClicked={setSearchClicked}
                    searchPhrase={searchText}
                    setSearchPhrase={setSearchText}
                />
            </View>
    );};


    // Fetch Data -- First Load
    useEffect(() => {
        const addData = async () => {
            var inData = await fetchData(0);
            setData(inData.data);
            setLoading(false);
            setIndex(inData.data.length);
        };
        setLoading(true);
        addData();
    }, []);

    const getData = async () => {
        if (loading === false) {
            setLoading(true);
            var inData = await fetchData(index);
            setData([...data, ...(await inData).data]);
            setIndex(index + inData.data.length);
            setLoading(false);
        }
    };
    const refresh = async () => {
        if (loading === false){
            setLoading(true);
            setRefreshing(true);
            var inData = await fetchData(0);
            setData([...(await inData).data]);
            setIndex(inData.data.length);
            setRefreshing(false);
            setLoading(false);
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
        backgroundColor:'white',
    },
    container: {
        backgroundColor: 'white',
    },
});
export default ProductList;
