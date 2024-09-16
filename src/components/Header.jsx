import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
	background-color: #fff;
	border-bottom: 1px solid rgba(0, 0, 0, 0.08);
	padding: 0 24px;
	position: sticky;
	top: 0;
	left: 0;
	z-index: 10;
`;

const Content = styled.div`
	display: flex;
	align-items: center;
	margin: 0 auto;
	height: 100%;
	max-width: 1128px;
`;

const Logo = styled.span`
	margin-right: 8px;
	font-size: 0;
`;

const Search = styled.div`
	opacity: 1;
	flex-grow: 1;
	position: relative;
	@media (max-width: 768px) {
		flex-grow: unset;
	}
	& > div {
		max-width: 280px;
		input {
			border: none;
			box-shadow: none;
			background-color: #eef3f8;
			border-radius: 2px;
			color: rgba(0, 0, 0, 0.9);
			width: 218px;
			padding: 0 8px 0 40px;
			line-height: 1.75;
			font-weight: 400;
			font-size: 14px;
			height: 34px;
			vertical-align: text-top;
			border-color: #dce6f1;
			@media (max-width: 768px) {
				width: 140px;
			}
		}
	}
`;

const SearchIcon = styled.div`
	width: 40px;
	z-index: 1;
	position: absolute;
	top: 22px;
	left: 5px;
	border-radius: 0 2px 2px 0;
	margin: 0;
	pointer-events: none;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Nav = styled.nav`
	margin-left: auto;
	display: block;
	@media (max-width: 768px) {
		position: fixed;
		left: 0;
		bottom: 0;
		background: white;
		width: 100%;
	}
`;

const NavListWrap = styled.ul`
	display: flex;
	flex-wrap: nowrap;
	list-style-type: none;
	justify-content: space-between;
	.active {
		span::after {
			content: "";
			transform: scaleX(1);
			border-bottom: 2px solid var(--white, #fff);
			position: absolute;
			left: 0;
			bottom: 0;
			transition: transform 0.2s ease-in-out;
			width: 100%;
			border-color: rgba(0, 0, 0, 0.9);
		}
	}
`;

const NavList = styled.li`
	display: flex;
	align-items: center;
	a {
		align-items: center;
		background: transparent;
		display: flex;
		flex-direction: column;
		font-size: 12px;
		font-weight: 400;
		justify-content: center;
		line-height: 1.5;
		min-height: 52px;
		min-width: 80px;
		position: relative;
		text-decoration: none;
		span {
			color: rgba(0, 0, 0, 0.6);
			display: flex;
			align-items: center;
			text-align: center;
		}
		@media (max-width: 768px) {
			min-width: 50px;
			font-size: 9px;
			span > img {
				width: 40%;
			}
		}
	}
	&:hover,
	&:active {
		a {
			span {
				color: rgba(0, 0, 0, 0.9);
			}
		}
	}
`;

const DropdownMenu = styled.div`
	position: absolute;
	top: 45px;
	right: 0;
	background: white;
	border-radius: 0 0 5px 5px;
	width: 150px;
	box-shadow: 0 2px 5px rgba(0,0,0,0.2);
	overflow: hidden;
	display: ${({ visible }) => (visible ? 'block' : 'none')};
	z-index: 15;
`;

const DropdownItem = styled.div`
	padding: 10px;
	font-size: 16px;
	text-align: center;
	cursor: pointer;
	&:hover {
		background-color: #f0f0f0;
	}
`;

const SignOutMobile = styled.div`
	display: none;
	@media (max-width: 768px) {
		display: flex;
		padding-left: 1rem;
		font-size: 14px;
	}
`;

const User = styled(NavList)`
	position: relative;
	a > img {
		border-radius: 50%;
		width: 25px;
		height: 25px;
	}
	span {
		display: flex;
		align-items: center;
		cursor: pointer;
	}
`;

const Work = styled(User)`
	border-left: 1px solid rgba(0, 0, 0, 0.08);
`;

function Header() {
	const [user, setUser] = useState(null); // Local state for user
	const [dropdownVisible, setDropdownVisible] = useState(false); // State for dropdown visibility
	const location = useLocation(); // Get the current route
	const navigate = useNavigate();

	useEffect(() => {
		// Retrieve user data from localStorage or other local source
		const storedUser = JSON.parse(localStorage.getItem('user'));
		setUser(storedUser);
	}, []);

	const handleSignOut = () => {
		localStorage.removeItem('user'); // Remove user data from localStorage
		setUser(null); // Clear local state
		setDropdownVisible(false); // Hide dropdown
		navigate("/");
	};

	const toggleDropdown = () => {
		setDropdownVisible(!dropdownVisible);
	};

	const handleNavigate = (path) => {
		navigate(path);
		setDropdownVisible(false); // Hide dropdown after navigation
	};

	// Determine if the current path is the profile page
	const isProfilePage = location.pathname === '/profile';

	return (
		<Container>
			<Content>
				<Logo>
					<Link to="/feed">
						<img src="/images/home-logo.svg" alt="Home Logo" />
					</Link>
				</Logo>
				<Search>
					<div>
						<input type="text" placeholder="Search" />
					</div>
					<SearchIcon>
						<img src="/images/search-icon.svg" alt="Search Icon" />
					</SearchIcon>
				</Search>
				<SignOutMobile onClick={handleSignOut}>
					<a>Sign Out</a>
				</SignOutMobile>
				<Nav>
					<NavListWrap>
						<NavList className="active">
							<Link to="/feed">
								<img src="/images/nav-home.svg" alt="Home" />
								<span>Home</span>
							</Link>
						</NavList>
						<NavList>
							<Link to="/feed">
								<img src="/images/nav-network.svg" alt="My Network" />
								<span>My Network</span>
							</Link>
						</NavList>
						<NavList>
							<Link to="/feed">
								<img src="/images/nav-jobs.svg" alt="Jobs" />
								<span>Jobs</span>
							</Link>
						</NavList>
						<NavList>
							<Link to="/feed">
								<img src="/images/nav-messaging.svg" alt="Messaging" />
								<span>Messaging</span>
							</Link>
						</NavList>
						<NavList>
							<Link to="/feed">
								<img src="/images/nav-notifications.svg" alt="Notifications" />
								<span>Notifications</span>
							</Link>
						</NavList>
						<User onClick={toggleDropdown}>
							<a>
								<img src={user && user.photoURL ? user.photoURL : "/images/avatar.png"} alt="User" />
								<span>
									Me <img src="/images/down-icon.svg" alt="Down Icon" />
								</span>
							</a>
							<DropdownMenu visible={dropdownVisible}>
								<DropdownItem onClick={() => handleNavigate(isProfilePage ? '/feed' : '/profile')}>
									{isProfilePage ? 'Homepage' : 'View Profile'}
								</DropdownItem>
								<DropdownItem onClick={handleSignOut}>Sign Out</DropdownItem>
							</DropdownMenu>
						</User>
						<Work>
							<a>
								<img src="/images/nav-work.svg" alt="Work" />
								<span>
									Work <img src="/images/down-icon.svg" alt="Down Icon" />
								</span>
							</a>
						</Work>
					</NavListWrap>
				</Nav>
			</Content>
		</Container>
	);
}

export default Header;
