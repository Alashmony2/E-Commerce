import React from 'react'
import {Spinner} from "@heroui/react";


export default function LoadingScreen() {
    return (
        <div className="flex justify-center items-center h-[70vh]">
            <Spinner color="default" size='lg' />
        </div>
    )
}
