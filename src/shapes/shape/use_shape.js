import { useCallback } from "react";


const get_absolute_degree = (point_index, total_points, mirror) => {
    let deg = (360 / total_points) * point_index;
    if (mirror) {
        deg += 360 / total_points / 2;
    }
    if (deg < 0) return 360 + deg;
    else return deg;
}

const get_alpha_degree = (degree) => {
    if (degree >= 0 && degree < 90) {
        return 90 - degree
    } else if (degree >= 90 && degree < 180) {
        return degree % 90;
    } else if (degree >= 180 && degree < 270) {
        return 270 - degree;
    } else {
        return (degree || 0) % 270;
    }
}

const get_width_sign = (degree) => {
    // let deg = (360 / total_points) * point_index;
    // if (deg < 0) deg = 360 + deg;
    // if (deg >= 0 && deg <= 180) return 1;
    // else return -1;
    if (degree >= 0 && degree <= 180) return 1;
    else return -1
}

const get_height_sign = (degree) => {
    // let deg = (360 / total_points) * point_index;
    // if (deg < 0) deg = 360 + deg;
    // if (deg >= 90 && deg <= 270) return 1;
    // else return -1;
    if (degree >= 90 && degree <= 270) return 1;
    else return -1
}

const useShape = (dimention, points_list, max_value, mirror) => {
    
    const get_center_positions = useCallback(() => {
        const points = [];
        points_list.filter(point => point !== null).map((point, point_index) => {
            const absolute_degree = get_absolute_degree(point_index, points_list.length, mirror)
            const alpha = get_alpha_degree(absolute_degree);
            const point_position = {
                width: dimention * point * parseFloat(Math.cos(alpha * Math.PI / 180).toFixed(10)) / (2 * max_value) * get_width_sign(absolute_degree),
                height: dimention * point * parseFloat(Math.sin(alpha * Math.PI / 180).toFixed(10)) / (2 * max_value) * get_height_sign(absolute_degree),
                value: point,
                alpha: alpha,
                absolute_degree: absolute_degree
            }
            points.push(point_position);
            return null;
        })
        return points;
    }, [dimention, points_list, max_value]);


    const get_absolute_position = useCallback((center_positions) => {
        const points = [];
        center_positions.map(center_item => {
            const point = {
                width: (dimention / 2) + center_item.width,
                height: (dimention / 2) + center_item.height,
                center_width: center_item.width,
                center_height: center_item.height,
                value: center_item.value,
                alpha: center_item.alpha,
                absolute_degree: center_item.absolute_degree,
            }
            points.push(point);
            return null;
        });
        return points;
    }, [dimention, points_list, max_value]);

    const center_positions = get_center_positions();
    const absolute_positions = get_absolute_position(center_positions);


    return [center_positions, absolute_positions]
}


export default useShape;