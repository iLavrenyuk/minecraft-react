import React from 'react';
import grass from './img/grass.jpg'
import { RepeatWrapping, TextureLoader } from 'three';
import { usePlane } from 'use-cannon';


export const Ground = (props) => {
    // Добавляю физические свойства земле
    //Специальный хук из пакета Cannon
    const [ref] = usePlane(() => ({
        rotation: [-Math.PI / 2, 0, 0], ...props //Поворачиваем Plane горизонтально
    }))

    const texture = new TextureLoader().load(grass);
    //Повторяю текстуру
    texture.wrapS = RepeatWrapping;
    texture.wrapT = RepeatWrapping;
    // Сколько раз ей нужно повториться
    texture.repeat.set(240, 240)

    {/*3-d element (three.js library) Чтобы в плоскости на земле рисовались тени*/ }
    return (
        <mesh mesh ref={ref} receiveShadow >
            {/*Плоскость*/}
            <planeBufferGeometry attach="geometry" args={[1000, 1000]} />
            {/*Teкстура которую использую*/}
            <meshStandardMaterial map={texture} attach="material" />
        </mesh >
    );
}