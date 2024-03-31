/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Alert, FlatList, Text, View} from 'react-native';
import ProductCard, { LoadingCard } from './Cards/ProductCard';

import * as testData from "../TestData/TestProducts.json"

// Test Settings
const localTest = true;
const DelayTime = 3e3;
const fetchAmount = 5;
var index = 0;

// Test Functions
function resolveAfterDelay(Delay, x) {
    return new Promise((resolve) => { 
        setTimeout(() => {
            resolve(x);
        }, Delay);
     });
}
async function fetchData() {
    var retval = {data: [], endReached: false};
    var datalen = testData.data.length;
    if (index >= datalen) {
        retval.endReached = true;
        return retval;
    }
    retval.data = testData.data.slice(index, index + fetchAmount);
    if (index + fetchAmount >= datalen) {
        index = datalen;
        retval.endReached = true;
    }
    else {
        index += fetchAmount;
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
        return false;
    };


    // Fetch Data
    useEffect(() => {
        const addData = async () => {
            var getData = fetchData();
            setData((await getData).data);
            setLoading(false);
        };
        setLoading(true);
        addData();
    }, []);

    const getData = async () => {
        if (loading === false) {
            setLoading(true);
            var inData = await fetchData();
            setData([...data, ...(await inData).data]);
            setLoading(false);
        }
    };


    return (
        <FlatList
            data={data}
            renderItem={renderItem}
            extraData={[loading, data]}
            ListFooterComponent={footer}
            ListHeaderComponent={props.children}
            onEndReached={getData}
            onEndReachedThreshold={1}
        />
    );
}

export default ProductList;
