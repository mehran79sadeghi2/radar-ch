import React from "react";
import Grid from "./grid/grid";

const Grids = ({ dimention = 0, level = 5, stroke = "transparent", stroke_width = 0, fill = 'transparent', opacity = null, transition = 500 }) => {
    return (
        <>
            {
                new Array(level).fill(null).map((_, grid_index) => {
                    return (
                        <Grid
                            key={grid_index}
                            dimention={dimention * ((level - grid_index) / level)}
                            opacity={opacity || 1 / level}
                            background_color={fill}
                            transition={transition}
                            border_width={stroke_width}
                            border_color={stroke}
                        />
                    )
                })
            }
        </>
    );
};

export default Grids;
