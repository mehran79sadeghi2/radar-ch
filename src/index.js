import React, { useCallback, useRef } from "react";
import useContainerDimensions from "./hooks/use-container-dimentions/use-container-dimentions";
import Grids from "./grids/grids";
import Shapes from "./shapes/shapes";
import styles from "./index.module.css";
import Labels from "./labels/labels";

const Radar = ({ grid, max_value, data, keys, index_by, dot, border, shape, label, mirror = false }) => {
    const radar_ref = useRef(null);
    const { width, height } = useContainerDimensions(radar_ref);

    const get_dimention = useCallback(() => {
        return Math.min(width, height);
    }, [width, height]);

    return (
        <div ref={radar_ref} className={styles.radar}>
            {!!width && !!height && (
                <>
                    <Grids {...grid} dimention={get_dimention()} />
                    <Shapes data={data}
                        keys={keys}
                        index_by={index_by}
                        max_value={max_value}
                        dimention={get_dimention()}
                        dot={dot}
                        mirror={mirror}
                        border={border}
                        shape={shape} />
                    <Labels label={label}
                        mirror={mirror}
                        dimention={get_dimention()}
                        data={data}
                        index_by={index_by} />
                </>
            )}
        </div>
    );
};

export default Radar;
