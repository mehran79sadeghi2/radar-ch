import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { colors } from '../constans';


const Point = styled.div`
    position: absolute;
    width: ${props => props.diameter}px;
    height: ${props => props.diameter}px;
    transform: translate(${props => props.translate_x}px, ${props => props.translate_y}px);
    border-radius: 50%;
    border-style: solid;
    border-color: ${props => props.border_color};
    border-width: ${props => props.border_width}px;
    background-color: ${props => props.background_color};
    opacity: ${props => props.opacity};
    transition: 0.3s;
`;



const Points = ({ points, r = 3, border_color = 'transparent', border_width = 1, background_color = null, dynamic_background_color = null, dynamic_border_color = null, shape_index }) => {
    const [first_render, set_first_render] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            set_first_render(true);
        }, 200);
    }, [])

    return points.map((point_item, index) => {
        let point_background_color = background_color;
        if (!!dynamic_background_color && typeof dynamic_background_color === 'function') {
            point_background_color = dynamic_background_color(point_item.value);
        }

        let point_border_color = border_color;
        if (!!dynamic_border_color && typeof dynamic_border_color === 'function') {
            point_border_color = dynamic_border_color(point_item.value)
        }

        return (
            <Point key={index}
                diameter={r * 2}
                translate_x={first_render ? point_item.width : 0}
                translate_y={first_render ? point_item.height : 0}
                opacity={first_render ? 1 : 0}
                border_color={point_border_color}
                border_width={border_width}
                background_color={point_background_color ? point_background_color : colors['radar_ch'][shape_index % colors.radar_ch.length]}
            />
        )
    })
}


export default Points;