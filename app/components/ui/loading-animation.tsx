import React, { ReactNode, useEffect, useState } from 'react';
import Popup from './popup';
import { Hourglass } from "react-loader-spinner";



export const LoadingAnimation: React.FC = () => {
    const delay = 500;
    const [step, setStep] = useState<number>(0);


    useEffect(() => {

        const delayInputTimeoutId = setTimeout(() => {

            setStep(step > 2 ? 0 : step + 1);
        }, delay);
        return () => clearTimeout(delayInputTimeoutId);
    });



    return (
        <Popup title="" zindex={50} width={40}>
            <div className="flex flex-col justify-center items-center w-40">
                <Hourglass
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="hourglass-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    colors={['#306cce', '#72a1ed']}
                />
                <span className="text-[20px] text-black my-8">Working {".".repeat(step)}</span>
            </div>
        </Popup>
    );
};


export function useLoadingAnimation(): [ReactNode, () => void, () => void] {
    const [show, setShow] = useState<boolean>(false);

    const activateLoadingAnimation = () => { setShow(true); }

    const hideLoadingAnimation = () => { setShow(false); }

    const loadingAnimation = show ? <LoadingAnimation /> : <></>;

    return [loadingAnimation, activateLoadingAnimation, hideLoadingAnimation];
}