import React from 'react';
import styled from 'styled-components';
import Points from './points/points';
import ShapePath from './shape-path/shape-path';
import useShape from './use_shape';


const DynamicSvg = styled.svg`
    width: ${props => props.dimention || 0}px;
    height: ${props => props.dimention || 0}px;
    position: absolute;
`;



const Shape = ({ dimention, points_list, max_value = null, shape_index, dot, border, shape, mirror }) => {

    const [center_positions, absolute_positions] = useShape(dimention, points_list, max_value, mirror);

    return (
        <>
            <DynamicSvg overflow={'visible'} dimention={dimention} viewBox={`0 0 ${dimention} ${dimention}`}>
                <ShapePath {...border} {...shape} shape_index={shape_index} dimention={dimention} points={absolute_positions} />
            </DynamicSvg>
            <Points {...dot} shape_index={shape_index} points={center_positions} />
            
        </>
    )
}


export default Shape;