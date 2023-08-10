import { memo, useEffect, useRef } from "react";
import ImageResizer from "./ImageResizer.js";

const ResizeImage = (props) => {
    console.log(props)

    const imgRef = useRef(null);

    useEffect(() => {

        const img = imgRef.current;

        if (!img) return

        const targetWidth = img.clientWidth;
        const targetHeight = img.clientHeight;

        let animationFrameId;

        let resizeOptions = {
            url: props.src,
            width: targetWidth,
            height: targetHeight,
            successCb: (src) => {
                animationFrameId = requestAnimationFrame(() => {
                    img.src = src;
                    img.style.opacity = 1;
                });
            },
            errorCb: () => {
                console.log("error loading image");
            }
        }
        console.log(resizeOptions)

        ImageResizer.resize(resizeOptions);

        return () => {
            cancelAnimationFrame(animationFrameId);
            resizeOptions.successCb = () => { };
            resizeOptions.errorCb = () => { };
        }

    }, [props.src]);

    return <img ref={imgRef} {...props} />

}

export default memo(ResizeImage);