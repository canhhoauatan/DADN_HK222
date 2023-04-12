import React, { useState } from 'react'
import { Slider } from '@mui/material'




const RangeSlider = (props) => {
    const minDistance = props.minDistance;

    const [value, setValue] = useState(props.defaultValue);

    const handleOnChange = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            return;
        }
        if (activeThumb === 0) {
            setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
        } else {
            setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
        }
    };

    return (

        <Slider
            getAriaLabel={() => 'Minimum distance'}
            value={props.value}
            max={props.max}
            onChange={(event, newValue, activeThumb) => {
                handleOnChange(event, newValue, activeThumb);
                props.onChange(event, newValue, activeThumb);
            }}
            onChangeCommitted={props.onChangeCommitted}
            disableSwap
            className='mx-5'
            step={props.step}
        />

    )
}

export default RangeSlider