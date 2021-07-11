import { FaBars } from 'react-icons/fa';
import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';
import Session from './SignIn';

const Nav = styled.nav`
// background: #6B6B6B;
background: black;
height: 100px;
display: flex;
justify-content: space-between;
padding: 0.4rem calc((100vw - 1000px) / 2);
z-index: 12;
`;

const NavLink = styled(Link)`
// color: #808080;
color: white;
display: flex;
align-items: center;
text-decoration: none;
padding: 0 1rem;
height: 100%;
cursor: pointer;
&.active {
	color: #28ACEA;
}
`;

const Bars = styled(FaBars)`
display: none;
color: #808080;
@media screen and (max-width: 768px) {
	display: block;
	position: absolute;
	top: 0;
	right: 0;
	transform: translate(-100%, 75%);
	font-size: 1.8 rem;
	cursor: pointer;
}
`;

const NavMenu = styled.div`
display: flex;
align-items: center;
margin-right: -24px;
@media screen and (max-width: 768px) {
	display: none;
}
`;

const NavBtn = styled.nav`
display: flex;
align-items: center;
margin-right: 24px;
@media screen and (max-width: 768px) {
	display: none;
}
`;

const NavBtnLink = styled(Link)`
border-radius: 4px;
background: #808080;
padding: 10px 22px;
color: #000000;
outline: none;
border: none;
cursor: pointer;
transition: all 0.2s ease-in-out;
text-decoration: none;
/* Second Nav */
margin-left: 24px;
&:hover {
	transition: all 0.2s ease-in-out;
	background: #fff;
	color: #808080;
}
`;

const Navbar = () => {
    const pageReload = () => {
        window.location.reload()
    }
    	
    return (
        <>
         {/* <Nav>
            <ul >



            {localStorage.getItem('SessionEmail') === null ? <li><Signin/></li> : ''}

            {localStorage.getItem('SessionEmail') !== null ? <li><Logout/></li> : ''}
            </ul>
        </Nav> */}
        <Nav>
            <Bars />
            <NavMenu>
                <NavLink to='/' activeStyle>
                    <img src="https://i.ibb.co/0jsWS9h/Screen-Shot-2021-06-14-at-10-31-13-PM-removebg-preview.png" class="img-fluid" />
                </NavLink>
                <NavLink to='/' activeStyle>
                Home
                </NavLink>
                <NavLink to='/show' activeStyle>
                View Your Favorite Video
                </NavLink>
                <Session className='session' onClick={pageReload}/>
            </NavMenu>
        </Nav>
        </>
      );
    };
    
    export default Navbar;