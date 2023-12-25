'use client'
import { Progress, Typography } from "@material-tailwind/react"
import anime from "animejs"
import Image from "next/image"
import React, { useEffect, useState } from "react"

const SplashScreen = ({ finishLoading }) => {
    const [progress, setProgress] = useState(0)
    const animate = () => {
        const loader = anime.timeline({
            complete: () => finishLoading()
        })
        loader

            .add({
                targets: '#logo',
                delay: 0,
                scale: 1,
                duration: 500,
                easing: "easeInOutExpo",
            })
            .add({
                targets: '#logo',
                delay: 0,
                scale: 2,
                duration: 500,
                easing: "easeInOutExpo",
            })
            .add({
                targets: '#logo',
                delay: 0,
                scale: 1,
                duration: 500,
                easing: "easeInOutExpo",
            })
            .add({
                targets: '#progress-bar',
                width: '100%', // Assuming your progress bar fills the width
                duration: 1000, // Adjust the duration based on your requirements
                easing: "easeInOutExpo",
                update: function (anim) {
                    setProgress(anim.progress * 100);
                }
            })
    }

    useEffect(() => {
        const timeout = setTimeout(() => animate(), 1000)
        return () => clearTimeout(timeout)
    }, [])

    return (
        <div className='flex h-screen w-full items-center flex-col justify-center bg-black'>
            <Image id='logo' src={'/white-logo.jpg'} height={60} width={60} alt='splash-screen' />
            <Typography className=" lg:text-2xl mt-10 text-white p-10 animate-pulse">Welcome to the community of the chosen ones!</Typography>
            <div className="w-1/2 flex justify-center items-center">
                <Progress size="sm" id="progress-bar" value={progress} className="w-1/2" />
            </div>
        </div>
    )
}

export default SplashScreen
