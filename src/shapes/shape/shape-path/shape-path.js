import React, { useCallback } from 'react';
import styled from 'styled-components';
import useShapePath from './use-shape-path';
import { colors } from '../constans';
import ShadowPoint from './shadow-point/shadow-point';


const MainPath = styled.path`
    transition: 0.3s;
    mix-blend-mode: ${props => props.mix_blend_mode};
    opacity: ${props => props.path_opacity};
`;



const ShapePath = ({ shape_index, dimention = 0, points, width = 2, color = null, opacity = 0.3, shadow_color = null, shadow_blur = 40, fill = null, mix_blend_mode = 'multiply', coefficient }) => {
    
    const [path_d, first_render] = useShapePath(points, coefficient, dimention);

    return (
        <>
            <defs>
                <clipPath id={`clip-path-${shape_index}`}>
                    <MainPath path_opacity={first_render ? 1 : 0} mix_blend_mode={'unset'} d={path_d} />
                </clipPath>
            </defs>
            <MainPath stroke={color ? color : colors['radar_ch'][shape_index % colors['radar_ch'].length]}
                fillOpacity={opacity}
                path_opacity={first_render ? 1 : 0} 
                strokeWidth={`${width}px`}
                d={path_d}
                mix_blend_mode={mix_blend_mode}
                fill={fill ? fill : colors['radar_ch'][shape_index % colors['radar_ch'].length]} />
            {
                (!!shadow_color && typeof shadow_color === 'function') &&
                points.map((_, point_index) => {
                    return (
                        <ShadowPoint shadow_color={shadow_color}
                            shape_index={shape_index}
                            points={points}
                            shadow_blur={shadow_blur}
                            point_index={point_index} />
                    )
                })
            }
        </>
    )
}

export default ShapePath;