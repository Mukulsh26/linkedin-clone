import React from 'react';
import Header from './Header';
import Left from './Left';
import Right from './Right';
import styled from 'styled-components';

const Container = styled.div`
	max-width: 100%;
`;

const Content = styled.div`
	max-width: 1128px;
	margin: auto;
`;


const Layout = styled.div`
	display: grid;
	grid-template-areas: "left main right";
	grid-template-columns: minmax(0, 5fr) minmax(0, 12fr) minmax(300px, 7fr);
	column-gap: 25px;
	row-gap: 25px;
	margin: 30px 0;
	@media (max-width: 768px) {
		display: flex;
		flex-direction: column;
		padding: 0 5px;
	}
`;

const ProfileCard = () => {
  return (
    <>
    <Header/>
    <Container>
      <Content>
    <Layout>
    <div className="profile-card">
      <div className="profile-card-header">
        <div className="profile-card-image">
          <img src="/images/avatar.png" alt="profile" />
        </div>
        <div className="profile-card-info">
          <h2 className="profile-card-name">Mukul Sharma</h2>
          <span className="profile-card-pronoun">(He/Him)</span>
          <p className="profile-card-title">
            Associate Software Engineer at Accenture || React.js || Next.js || MySql ||
            Javascript || API's || Node.js
          </p>
          <p className="profile-card-location">New Delhi, Delhi, India</p>
          <a href="#" className="profile-card-link">Contact info</a>
        </div>
        <div className="profile-card-company">
          <div className="profile-card-company-logo">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-chevron-right"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </div>
          <span className="profile-card-company-name">Accenture</span>
        </div>
      </div>
      <div className="profile-card-body">
        <div className="profile-card-portfolio">
          <a href="#" className="profile-card-link">Portfolio</a>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-external-link"
          >
            <path d="M18 13V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v7"></path>
            <polyline points="10 14 15 9 20 14"></polyline>
          </svg>
        </div>
        <p className="profile-card-connections">500+ connections</p>
        <div className="profile-card-buttons">
          <button style={{backgroundColor: '#007bff'}} className="profile-card-button">Open to</button>
          <button style={{backgroundColor: '#007bff'}} className="profile-card-button">Add profile section</button>
          <button style={{backgroundColor: '#007bff'}} className="profile-card-button">Enhance profile</button>
          <button style={{backgroundColor: '#007bff'}} className="profile-card-button">More</button>
        </div>
        <div className="profile-card-open-to-work">
          <div className="profile-card-open-to-work-title">Open to work</div>
          <p className="profile-card-open-to-work-description">
            Frontend Developer and Software Developer roles
          </p>
          <a href="#" className="profile-card-link">Show details</a>
        </div>
      </div>
    </div>
					<Right />
				</Layout>
        </Content>
        </Container>
    </>
  );
};

export default ProfileCard;
