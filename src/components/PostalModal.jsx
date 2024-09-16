import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import styled from 'styled-components';
import { toast } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toast

// Styled components
const Container = styled.div`
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 11;
	background-color: rgba(0, 0, 0, 0.8);
	animation: fadeIn 0.3s ease;
`;

const Content = styled.div`
	width: 100%;
	max-width: 552px;
	max-height: 90%;
	background-color: #fff;
	overflow: initial;
	border-radius: 5px;
	position: relative;
	display: flex;
	flex-direction: column;
	top: 32px;
	margin: 0 auto;
`;

const Header = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 10px 20px;
	border-bottom: 1px solid rgba(0, 0, 0, 0.15);
	font-size: 20px;
	line-height: 1.5;
	color: rgba(0, 0, 0, 0.9);

	button {
		width: 40px;
		height: 40px;
		min-width: auto;
		border: none;
		outline: none;
		background: transparent;

		img, svg {
			pointer-events: none;
		}
	}
`;

const SharedContent = styled.div`
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	overflow-y: auto;
	background: transparent;
	padding: 5px 12px;
`;

const UserInfo = styled.div`
	display: flex;
	align-items: center;
	padding: 10px 24px;

	img {
		width: 48px;
		height: 48px;
		border-radius: 50%;
		border: 2px solid transparent;
	}
	
	span {
		font-weight: 600;
		font-size: 16px;
		line-height: 1.5;
		margin-left: 5px;
	}
`;

const ShareCreation = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 10px 24px 10px 16px;
`;

const AttachAsset = styled.div`
	display: flex;
	align-items: center;
`;

const AssetButton = styled.button`
	display: flex;
	align-items: center;
	height: 40px;
	min-width: auto;
	margin-right: 8px;
	border-radius: 50%;
	border: none;
	outline: none;
	justify-content: center;
	background: transparent;

	&:hover {
		background: rgba(0, 0, 0, 0.08);
	}
`;

const ShareComment = styled.div`
	padding-left: 8px;
	margin-right: auto;
	border-left: 1px solid rgba(0, 0, 0, 0.08);

	${AssetButton} {
		border-radius: 50px;
		padding: 5px 10px;

		span {
			font-size: 16px;
			font-weight: 600;
			color: rgba(0, 0, 0, 0.6);
			padding: 0 5px;
		}
	}
`;

const PostButton = styled.button`
	min-width: 60px;
	padding: 0 16px;
	border-radius: 20px;
	background: ${(props) => (props.disabled ? '#b8b8b8' : '#0a66c2')};
	color: ${(props) => (props.disabled ? '#5a5a5a' : '#fff')};
	font-size: 16px;
	letter-spacing: 1.1px;
	border: none;
	outline: none;

	&:hover {
		background: ${(props) => (props.disabled ? '#b8b8b8' : '#004182')};
	}
`;

const Editor = styled.div`
	padding: 12px 24px;

	textarea {
		width: 100%;
		min-height: 100px;
		resize: none;
	}

	input {
		width: 100%;
		height: 35px;
		font-size: 16px;
		margin-bottom: 20px;
	}
`;

const UploadImage = styled.div`
	text-align: center;

	img {
		width: 100%;
	}
`;

// Component function
function PostalModal({ user = { photoURL: '/images/avatar.png', displayName: 'Mukul' }, showModal, clickHandler, onPostCreation }) {
	const [editorText, setEditorText] = useState('');
	const [imageFile, setImageFile] = useState(null);
	const [videoFile, setVideoFile] = useState('');
	const [assetArea, setAssetArea] = useState('');

	const reset = (event) => {
		setEditorText('');
		setImageFile(null);
		setVideoFile('');
		setAssetArea('');
		clickHandler(event);
	};

	const handleImage = (event) => {
		const image = event.target.files[0];
		if (image && image.type.startsWith('image/')) {
			setImageFile(image);
		} else {
			toast.error('Selected file is not an image.');
		}
	};

	const switchAssetArea = (area) => {
		setImageFile(null);
		setVideoFile('');
		setAssetArea(area);
	};

	const postArticle = async (event) => {
		event.preventDefault();
		if (event.target !== event.currentTarget) return;

		const saveImageToLocalStorage = (image, imageName) => {
			return new Promise((resolve, reject) => {
				const reader = new FileReader();
				reader.onloadend = () => {
					const imageBlob = new Blob([reader.result], { type: image.type });
					const imageURL = URL.createObjectURL(imageBlob);
					localStorage.setItem(imageName, imageURL);
					resolve(imageURL);
				};
				reader.onerror = reject;
				reader.readAsArrayBuffer(image);
			});
		};

		const payload = {
			image: imageFile,
			video: videoFile,
			description: editorText,
			timestamp: new Date().toISOString(), // Store as ISO string
		};

		try {
			let sharedImgURL = '';

			if (payload.image) {
				const imageName = `image_${Date.now()}.png`;
				sharedImgURL = await saveImageToLocalStorage(payload.image, imageName);
			}

			const storedUser = JSON.parse(localStorage.getItem('user')) || {};
			const articleData = {
				actor: {
				  description: storedUser.email || 'Associate Software Engineer',
				  title: storedUser.displayName || 'Mukul',
				  date: new Date(payload.timestamp), // Convert ISO string to Date object
				  image: storedUser.photoURL || '',
				},
				video: payload.video || '',
				sharedImg: sharedImgURL,
				likes: {
					count: 0,
					whoLiked: [],
				},
				comments: '',
				description: payload.description,
			};

			const articles = JSON.parse(localStorage.getItem('articles')) || [];
			articles.push(articleData);
			localStorage.setItem('articles', JSON.stringify(articles));

			toast.success('Article posted successfully!');
			reset(event);

			if (onPostCreation) {
				onPostCreation();
			}
		} catch (error) {
			console.error('Error posting article:', error);
			toast.error('Failed to post article. Please try again.');
		}
	};

	return (
		<>
			{showModal === 'open' && (
				<Container>
					<Content>
						<Header>
							<h2>Create a post</h2>
							<button onClick={(event) => reset(event)}>
								<img src="/images/close-icon.svg" alt="Close" />
							</button>
						</Header>
						<SharedContent>
							<UserInfo>
								<img src={user.photoURL || '/images/avatar.png'} alt="User" />
								<span>{user.displayName || 'Mukul'}</span>
							</UserInfo>
							<Editor>
								<textarea
									value={editorText}
									onChange={(event) => setEditorText(event.target.value)}
									placeholder="What do you want to talk about?"
									autoFocus
								/>
								{imageFile && (
									<UploadImage>
										<img src={URL.createObjectURL(imageFile)} alt="Preview" />
									</UploadImage>
								)}
								{videoFile && <ReactPlayer url={videoFile} controls />}
							</Editor>
							<ShareCreation>
								<AttachAsset>
									<AssetButton onClick={() => switchAssetArea('image')}>
										<img src="/images/photo-icon.svg" alt="Image" />
									</AssetButton>
									<AssetButton onClick={() => switchAssetArea('video')}>
										<img src="/images/video-icon.svg" alt="Video" />
									</AssetButton>
								</AttachAsset>
								<ShareComment>
									{assetArea === 'image' && (
										<input
											type="file"
											accept="image/*"
											onChange={handleImage}
										/>
									)}
									{assetArea === 'video' && (
										<input
											type="text"
											placeholder="Enter video URL"
											value={videoFile}
											onChange={(event) => setVideoFile(event.target.value)}
										/>
									)}
								</ShareComment>
								<PostButton
									disabled={!editorText.trim() && !imageFile && !videoFile}
									onClick={postArticle}
								>
									Post
								</PostButton>
							</ShareCreation>
						</SharedContent>
					</Content>
				</Container>
			)}
		</>
	);
}

export default PostalModal;
