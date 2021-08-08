import React from 'react';
import styled from 'styled-components';

const get_width_sign = (degree) => {
    if (degree >= 0 && degree <= 180) return 1;
    else return -1;
}

const get_height_sign = (degree) => {
    if (degree >= 90 && degree <= 270) return 1;
    else return -1;
}


const LabelCom = styled.div`
    position: absolute;
    transform: translate(${props => props.width}px, ${props => props.height}px);
    transition: 0.3s;
    font-size: ${props => props.font_size}px;
`;

const Label = ({ dimention = 0, absolute_degree, alpha_degree, label_key, offset = 20, font_size = 20, custom }) => {

    let height = (dimention / 2) * Math.sin(alpha_degree * Math.PI / 180);
    let width = (dimention / 2) * Math.cos(alpha_degree * Math.PI / 180);

    height += offset * Math.sin(alpha_degree * Math.PI / 180);
    width += offset * Math.cos(alpha_degree * Math.PI / 180);

    height *= get_height_sign(absolute_degree);
    width *= get_width_sign(absolute_degree);


    return (
        <LabelCom width={width} height={height} font_size={font_size} >
            {
                (!!custom && typeof custom === 'function') ?
                    custom(label_key, absolute_degree) : label_key
            }
        </LabelCom>
    )
}


export default Label;