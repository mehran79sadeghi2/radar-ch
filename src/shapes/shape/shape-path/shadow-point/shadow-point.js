import React from 'react';
import styled from 'styled-components';


const find_next_point = (points, point_index) => {
    if (point_index === points.length - 1) {
        return points[0];
    } else {
        return points[point_index + 1];
    }
}

const find_prev_point = (points, point_index) => {
    if (point_index === 0) {
        return points[points.length - 1];
    } else {
        return points[point_index - 1];
    }
}

const calc_distance = (first_point, second_point) => {
    const distance = parseFloat(Math.sqrt(Math.pow(first_point.width - second_point.width, 2) + Math.pow(first_point.height - second_point.height, 2)).toFixed(10));
    return distance;
}

const Circle = styled.circle`
    filter: blur(${props => props.shadow_blur}px);
    transition: 0.3s;
`;

const ShadowPoint = ({ points, point_index, shape_index, shadow_color, shadow_blur }) => {

    const current_point = points[point_index];
    const next_point = find_next_point(points, point_index);
    const prev_point = find_prev_point(points, point_index);

    let min_distance = Math.min(calc_distance(current_point, next_point), calc_distance(current_point, prev_point));
    points.map((point, index) => {
        if (index !== point_index) {
            if (calc_distance(current_point, point) < min_distance) {
                min_distance = calc_distance(current_point, point)
            }
        }
    })

    const shadow_size = min_distance / 2;


    return (
        <Circle clipPath={`url(#${`clip-path-${shape_index}`})`}
            cx={current_point.width}
            cy={current_point.height}
            r={shadow_size}
            fill={shadow_color(current_point.value)}
            shadow_blur={shadow_blur} />
    )
} 


export default ShadowPoint;