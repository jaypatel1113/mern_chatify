import React from 'react';
import Lottie from "react-lottie";

import animationData from "../../../Animations/typing.json";

const TypingAnimation = () => {
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
            width={50}
            height={20}
            style={{ marginBottom: 15, marginLeft: 0 }}
        />
    )
}

export default TypingAnimation;