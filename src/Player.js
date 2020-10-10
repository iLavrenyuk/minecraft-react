import React from 'react';
import { useSphera } from 'use-cannon';
import { useFrame, useThree } from 'react-three-fiber';

export const Player = (props) => {
    //Ссылка на камеру текущую
    const { camera } = useThree();

    // Вместо игрока физический элемент СФЕРА
    const [ref, api] = useSphera(() => ({
        mass: 1,
        type: "Dynamic",
        position: [0, 10, 0], //Мы вначале будем падать на землю
        ...props
    }))

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