import React, { useCallback, useState } from 'react'
import Cropper from 'react-easy-crop';
import getCroppedImg from "./crop";


function ImageCropper({ image }: any) {
    const [crop, setCrop] = useState<any>({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>();
    const [croppedImage, setCroppedImage] = useState<any>();

    const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels: any) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const showCroppedImage = useCallback(async () => {
        try {
            const croppedImage = await getCroppedImg(
                image,
                croppedAreaPixels,
            );
            console.log("donee", { croppedImage });
            setCroppedImage(croppedImage);
        } catch (e) {
            console.error(e);
        }
    }, [croppedAreaPixels, image]);

    const onClose = useCallback(() => {
        setCroppedImage(null);
    }, []);

    return (
        <div>
            <button
                // style={{
                //     display: image === null || croppedImage !== null ? "none" : "block",
                // }}
                onClick={showCroppedImage}
            >
                Crop
            </button>
            <div
                className="container"
            // style={{
            //     display: image === null || croppedImage !== null ? "none" : "block",
            // }}
            >
                <div className="crop-container">
                    <Cropper
                        image={image}
                        crop={crop}
                        zoom={zoom}
                        zoomSpeed={4}
                        maxZoom={3}
                        zoomWithScroll={true}
                        showGrid={true}
                        aspect={4 / 3}
                        onCropChange={setCrop}
                        onCropComplete={onCropComplete}
                        onZoomChange={setZoom}
                    />
                </div>
            </div>
            <div className="cropped-image-container">
                {croppedImage && (
                    <img className="cropped-image" src={croppedImage} alt="cropped" />
                )}
                {croppedImage && <button onClick={onClose}>close</button>}
            </div>
        </div>

    )
}

export default ImageCropper