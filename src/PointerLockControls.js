import React, { useEffect, useRef } from 'react';
import { PointerLockControls as PointerLockControlsImpl } from 'three/examples/jsm/controls/PointerLockControls';
import { extend, useThree } from 'react-three-fiber';

extend({ PointerLockControlsImpl });

export const PointerLockControls = (props) => {
    const { camera, gl } = useThree();
    const controls = useRef();

    useEffect(() => {
        document.addEventListener("click", () => {
            controls.current.lock()
        })
    }, []);    // Лок мышки

    return (
        <pointerLockControlsImpl
            ref={controls}
            args={[camera, gl.domElement]}
            {...props}
        />
    )

}