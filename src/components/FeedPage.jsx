import React from "react";
import { Link } from 'react-router-dom';
import styled from "styled-components";
import Left from "./Left";
import Main from "./Main";
import Right from "./Right";
import Header from "./Header";

const Container = styled.div`
	max-width: 100%;
`;

const Content = styled.div`
	max-width: 1128px;
	margin: auto;
`;

const Section = styled.section`
	min-height: 50px;
	margin: 16px 0 -30px;
	box-sizing: content-box;
	text-align: center;
	text-decoration: underline;
	display: flex;
	justify-content: center;
	h5 {
		color: #0a66c2;
		font-size: 14px;
		margin-block-start: 0;
		margin-block-end: 0;
		a {
			font-weight: 700;
		}
	}
	p {
		font-size: 14px;
		color: #434649;
		margin-block-start: 0;
		margin-block-end: 0;
		font-weight: 600;
	}

	@media (max-width: 768px) {
		flex-direction: column;
		padding: 0 5px;
		margin: 16px 0;
	}
`;

const Layout = styled.div`
	display: grid;
	grid-template-areas: "left main right";
	grid-template-columns: minmax(0, 5fr) minmax(0, 12fr) minmax(300px, 7fr);
	column-gap: 25px;
	row-gap: 25px;
	margin: 25px 0;
	@media (max-width: 768px) {
		display: flex;
		flex-direction: column;
		padding: 0 5px;
	}
`;

function Home({ user }) {
	return (
    <>
    <Header/>
		<Container>
			{!user && <Link to="/" />}
			<Content>
				<Section>
					<h5>
						<a>Hiring in a hurry..?</a>
					</h5>
					<p>- Find talented pros in record time with LinkedIn and keep business moving.</p>
				</Section>
				<Layout>
					<Left />
					<Main user={user} />
					<Right />
				</Layout>
			</Content>
		</Container>
    </>
	);
}

export default Home;
