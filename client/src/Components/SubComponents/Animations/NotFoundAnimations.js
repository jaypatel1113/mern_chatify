import React from 'react';
import Lottie from "react-lottie";

import animationData from "../../../Animations/404-not-found.json";

const NotFoundAnimations = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    return (
        <Lottie 
            options={defaultOptions}
            width={400}
            height={400}
        />
    )
}

export default NotFoundAnimations;