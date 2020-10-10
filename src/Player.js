import React from 'react';
import { useSphere } from 'use-cannon';
import { useFrame, useThree } from 'react-three-fiber';
import { PointerLockControls } from './PointerLockControls';

export const Player = (props) => {
    //Ссылка на камеру текущую
    const { camera } = useThree();

    // Вместо игрока физический элемент СФЕРА
    const [ref, api] = useSphere(() => ({
        mass: 1,
        type: "Dynamic",
        position: [0, 10, 0],
        ...props,
    }));

    //Сдвиг камеры за физическим объектом при смене координат
    useFrame(() => {
        camera.position.copy(ref.current.position)
    })

    return (
        <>
        <PointerLockControls />
            <mesh ref={ref} />
        </>
    )
}