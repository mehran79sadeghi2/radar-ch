import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const GridDiv = styled.div`
    position: absolute;
    width: ${(props) => props.first_render ? props.dimention : 0}px;
    height: ${(props) => props.first_render ? props.dimention : 0}px;
    border-radius: 50%;
    background-color: ${props => props.background_color};
    opacity: ${props => props.opacity};
    transition: ${props => props.transition}s;
    border-style: solid;
    border-width: ${props => props.border_width};
    border-color: ${props => props.border_color};
`;

const Grid = ({ dimention, opacity, background_color, transition, border_width, border_color }) => {
    
    const [first_render, set_first_render] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            set_first_render(true)
        }, 50);
    }, []);

    return (
        <GridDiv dimention={dimention}
            first_render={first_render}
            opacity={opacity}
            background_color={background_color}
            transition={transition}
            border_width={border_width}
            border_color={border_color}
        />
    )
}


export default Grid;