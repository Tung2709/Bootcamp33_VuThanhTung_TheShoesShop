import React, { useState, useEffect } from 'react'
/**
 * 
 * @param {*} props props: nhận vào là ojbect {component:<abc />, mobileComponent: <xyz/>}
 * @returns 
 */



export default function ResponsiveItem(props) {
	const [screen, setScreen] = useState({
		width: window.innerWidth,
		height: window.innerHeight,
	});

	useEffect(() => {
		const handleSetScreen = ()=> setScreen({
			width: window.innerWidth,
			height: window.innerHeight,
		});
		//Khi kích thước màn hình thay đổi sẽ cập nhật vào state
		window.onresize = handleSetScreen
		return () => {
			// Khi screen.width thay đổi hoặc component mất khỏi giao diện sẽ clear sự kiện onresize
			window.addEventListener('resize',handleSetScreen)
		}
	}, [screen.width]) //nếu width thay đổi thì sẽ chạy code này

	let Component = props.component
	if(screen.width < 765 && props.mobileComponent){
		Component = props.mobileComponent
	}

	return (
		<Component/>
	)
}
