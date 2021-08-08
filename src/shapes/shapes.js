import React, { useCallback } from 'react';
import Shape from './shape/shape';



const Shapes = ({ dimention = 0, data = [], keys = [], max_value = null, index_by = '', dot, border, shape, mirror }) => {

    const get_features = useCallback(() => {
        const features = [];
        data.map(data_item => {
            if (data_item[index_by] && features.indexOf(data_item[index_by]) === -1) {
                features.push(data_item[index_by]);
            }
            return null;
        });
        return features;
    }, [data, keys, index_by]);

    const get_max_value = useCallback((shape_list) => {
        if(!!max_value || max_value === 0) {
            return max_value;
        } else {
            let max = 0;
            shape_list.map(shape_points => {
                shape_points.map(shape_point => {
                    if(shape_point > max) {
                        max = shape_point;
                    }
                })
            });
            return max;
        }
    }, [max_value, data]);


    const get_shape_list = useCallback(() => {
        const features = get_features();
        const shape_list = [];
        keys.map(key_item => {
            shape_list.push(features.map(feature => {
                return data.find(data_item => data_item[index_by] === feature)[key_item] || null
            }))
        });
        return shape_list;
    }, [data, keys, index_by])

    const shape_list = get_shape_list();


    return (
        <>
            {
                shape_list.map((shape_item, shape_index) => {
                    return (
                        <Shape max_value={get_max_value(shape_list)}
                            mirror={mirror}
                            shape_index={shape_index}
                            shape={shape}
                            border={border}
                            dot={dot}
                            key={shape_index}
                            points_list={shape_item}
                            dimention={dimention} />
                    )
                })
            }
        </>
    )
}


export default Shapes;