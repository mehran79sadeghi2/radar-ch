import { useEffect, useState } from 'react';


const useContainerDimensions = (myRef, alarm) => {
    const getDimensions = () => ({
        width: myRef.current ? myRef.current.offsetWidth ? myRef.current.offsetWidth : 0 : 0,
        height: myRef.current ? myRef.current.offsetHeight ? myRef.current.offsetHeight : 0 : 0,
    })

    const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

    useEffect(() => {
        setTimeout(() => {
            setDimensions(getDimensions())
        }, 500);
        const handleResize = () => {
            setDimensions(getDimensions())
        }

        if (myRef.current) {
            setDimensions(getDimensions())
        }

        window.addEventListener("resize", handleResize)

        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [myRef, alarm])

    return dimensions;
};


export default useContainerDimensions;