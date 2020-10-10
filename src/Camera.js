import React, { useEffect, useRef } from 'react';
import { useThree } from 'react-three-fiber';

export const Camera = (props) => {
    {/*Выдергнул камеру при помощи JSX елемента*/}
    const ref = useRef();
    {/*Set default camera (three.js)*/}
    const { setDefaultCamera } = useThree();

    {/*Создаю эффект появления на ту камеру, что отрендерили*/}
    useEffect(() => {
        setDefaultCamera(ref.current)
    }, [])


    return <perspectiveCamera ref={ref} {...props} />
}