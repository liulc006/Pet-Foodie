import { Rating } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';

const RatingStar = (prop) => {
    //this component needs an productId to know which product to show the rating
    const dispatch = useDispatch();
    const { ratings } = useSelector(state => state);
    const [ average, setAverage ] = useState(0);

    const productRating = ratings.filter(rate => rate.productId === prop.id);

    const avgValue = productRating.reduce((acc, value)=>{
        acc += value.star;
        return acc;
    },0)/productRating.length;

    useEffect(()=>{
        setAverage(avgValue);
    }, [avgValue]);

    return (
        <div 
            style={{
                // 'border': '1px solid black',
                'display':'flex',
                'height':'2rem',
                'alignItems': 'center'}}
            >
            <Rating name="half-rating-read" 
                value={average*1} precision={0.5} readOnly 
            />
            <Box>{productRating.length} Reviews</Box>
        </div>
    );
};

export default RatingStar;