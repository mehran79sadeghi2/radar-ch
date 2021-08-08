import { useCallback, useEffect, useState } from "react";


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

const calc_distance = (point, second_point) => {
    const distance = parseFloat(Math.sqrt(Math.pow(point.width - second_point.width, 2) + Math.pow(point.height - second_point.height, 2)).toFixed(10));
    return distance;
}


const get_after_cubic_height = (degree) => {
    if (degree >= 0 && degree < 90) {
        return 1;
    } else if (degree >= 90 && degree < 180) {
        return 1;
    } else if (degree >= 180 && degree < 270) {
        return -1;
    } else {
        return -1;
    }
}
const get_after_cubic_width = (degree) => {
    if (degree >= 0 && degree < 90) {
        return 1;
    } else if (degree >= 90 && degree < 180) {
        return -1;
    } else if (degree >= 180 && degree < 270) {
        return -1;
    } else {
        return 1;
    }
}

const get_before_cubic_height = (degree) => {
    if (degree >= 0 && degree < 90) {
        return -1;
    } else if (degree >= 90 && degree < 180) {
        return -1;
    } else if (degree >= 180 && degree < 270) {
        return 1;
    } else {
        return 1;
    }
}
const get_before_cubic_width = (degree) => {
    if (degree >= 0 && degree < 90) {
        return -1;
    } else if (degree >= 90 && degree < 180) {
        return 1;
    } else if (degree >= 180 && degree < 270) {
        return 1;
    } else {
        return -1;
    }
}

const useShapePath = (points, coefficient = 0, dimention = 0) => {

    const [first_render, set_first_render] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            set_first_render(true);
        }, 50);
    }, [])

    const get_curve = (points, point_index, after) => {

        if (!first_render) {
            return `${dimention / 2}, ${dimention / 2} `
        }

        const current_point = points[point_index];
        const side_point = after ? find_next_point(points, point_index) : find_prev_point(points, point_index);

        const vertical_distance = parseInt(calc_distance(current_point, side_point) * coefficient);

        const edge_size = parseFloat(Math.sqrt(Math.pow(current_point.center_width, 2)
            + Math.pow(current_point.center_height, 2)).toFixed(10));

        const common_size = parseFloat(Math.sqrt(Math.pow(edge_size, 2) + Math.pow(vertical_distance, 2)).toFixed(10));

        const point_height = parseFloat((edge_size * Math.sin(current_point.alpha * Math.PI / 180)).toFixed(10));
        const point_width = parseFloat((edge_size * Math.cos(current_point.alpha * Math.PI / 180)).toFixed(10));

        const teta = parseFloat((Math.asin(vertical_distance / common_size) * 180 / Math.PI).toFixed(10));
        const gama = current_point.alpha - teta;

        const new_point_height = parseFloat((Math.sin(gama * Math.PI / 180) * common_size).toFixed(10));
        const new_point_width = parseFloat((Math.cos(gama * Math.PI / 180) * common_size).toFixed(10));

        const bezier_height = parseFloat((Math.abs(new_point_height - point_height)).toFixed(10));
        const bezier_width = parseFloat((Math.abs(new_point_width - point_width)).toFixed(10));

        const bezier_height_sign = after ? get_after_cubic_height(current_point.absolute_degree) : get_before_cubic_height(current_point.absolute_degree);
        const bezier_width_sign = after ? get_after_cubic_width(current_point.absolute_degree) : get_before_cubic_width(current_point.absolute_degree);

        return `${current_point.width + (bezier_width * bezier_width_sign)}, ${current_point.height + (bezier_height * bezier_height_sign)} `
    }

    const get_path_d = useCallback(() => {
        let path_d = '';
        points.map((point, point_index) => {
            if (point_index === 0) {
                path_d += `M ${!first_render ? dimention / 2 : point.width},${!first_render ? dimention / 2 : point.height} `;
            } else {
                path_d += `C ${get_curve(points, point_index - 1, true)} ${get_curve(points, point_index, false)} ${!first_render ? dimention / 2 : point.width},${!first_render ? dimention / 2 : point.height} `;
            }
        })
        path_d += `C ${get_curve(points, points.length - 1, true)} ${get_curve(points, 0, false)} ${!first_render ? dimention / 2 : points[0].width},${!first_render ? dimention / 2 : points[0].height} z`;
        return path_d;
    }, [points, coefficient, first_render]);

    const path_d = get_path_d();

    return [path_d, first_render];
}


export default useShapePath;