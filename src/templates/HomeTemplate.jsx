import React from 'react'
import FooterHome from '../Components/FooterHome'
import {Outlet} from 'react-router-dom'
import HeaderHome from '../Components/HeaderHome'
export default function HomeTemplate() {
  return (
	<div >
		<HeaderHome/>
		<div style={{minHeight:700}}>
		<Outlet></Outlet>
		</div>
		<FooterHome/>
	</div>
  )
}
