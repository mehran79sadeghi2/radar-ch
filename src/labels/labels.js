import React, { useCallback } from 'react';
import Label from './label/label';



const get_absolute_degree = (label_index, total_labels, mirror) => {
    let deg = (360 / total_labels) * label_index;
    if(mirror) {
        deg += 360 / total_labels / 2
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


const Labels = ({ dimention, data, index_by, label, mirror }) => {

    const get_features = useCallback(() => {
        const features = [];
        data.map(data_item => {
            if (data_item[index_by] && features.indexOf(data_item[index_by]) === -1) {
                features.push(data_item[index_by]);
            }
            return null;
        });
        return features;
    }, [data, index_by]);


    const features_list = get_features();

    const labels = [];

    features_list.map((feature, feature_index) => {
        const label_object = {
            label_key: feature,
            absolute_degree: get_absolute_degree(feature_index, features_list.length, mirror),
            alpha_degree: get_alpha_degree(get_absolute_degree(feature_index, features_list.length, mirror))
        }
        labels.push(label_object);
    });

    return labels.map((label_item) => {
        return (
            <Label {...label_item} {...label} key={label_item.label_key} dimention={dimention} />
        )
    })
}

export default Labels;