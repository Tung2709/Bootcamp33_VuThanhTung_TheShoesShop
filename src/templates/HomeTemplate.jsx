import React from 'react'
import HomeFooter from '../Components/HomeFooter'
import {Outlet} from 'react-router-dom'
import HomeHeader from '../Components/HomeHeader'
export default function HomeTemplate() {
  return (
	<div>
		<HomeHeader/>
		<Outlet></Outlet>
		<HomeFooter/>
	</div>
  )
}
