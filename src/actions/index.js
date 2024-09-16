import {SET_USER, SET_LOADING_STATUS, GET_ARTICLES} from "./actionType"


export function setUser(payload) {
    return {
        type: SET_USER,
        user: payload,
    };
}

export function setLoading(status) {
    return {
        type: SET_LOADING_STATUS,
        status: status,
    };
}

export function getArticles(payload, id) {
    return {
        type: GET_ARTICLES,
        payload: payload,
        id: id,
    };
}

// For simplicity, local persistence doesn't have authentication. You may simulate user authentication with default values.

export function getUserAuth() {
    return (dispatch) => {
        const user = JSON.parse(localStorage.getItem('user')) || null;
        dispatch(setUser(user));
    };
}

export function signInAPI() {
    return (dispatch) => {
        // Simulate user sign-in and save user to local storage
        const simulatedUser = {
            email: "user@example.com",
            displayName: "John Doe",
            photoURL: "https://example.com/photo.jpg",
        };
        localStorage.setItem('user', JSON.stringify(simulatedUser));
        dispatch(setUser(simulatedUser));
    };
}

export function signOutAPI() {
    return (dispatch) => {
        localStorage.removeItem('user');
        dispatch(setUser(null));
    };
}

export function postArticleAPI(payload) {
    return async (dispatch) => {
        dispatch(setLoading(true));

        // Helper function to save image to local storage
        const saveImageToLocalStorage = (image, imageName) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const imageBlob = new Blob([reader.result], { type: image.type });
                    console.log(imageBlob)
                    localStorage.setItem(imageName, URL.createObjectURL(imageBlob));
                    resolve(URL.createObjectURL(imageBlob));
                };
                reader.onerror = reject;
                reader.readAsArrayBuffer(image);
            });
        };

        // Function to save article to local storage
        const saveArticle = async () => {
            let sharedImgURL = "";

            // Process image upload if an image is present
            if (payload.image) {
                const imageName = `image_${Date.now()}.png`; // Unique file name
                sharedImgURL = await saveImageToLocalStorage(payload.image, imageName);
                console.log("hjdhd", sharedImgURL)
            }

            const user = JSON.parse(localStorage.getItem('user')) || {};
            const articleData = {
                actor: {
                    description: user.email || "Anonymous",
                    title: user.displayName || "Anonymous",
                    date: payload.timestamp,
                    image: user.photoURL || "",
                },
                video: payload.video || "",
                sharedImg: sharedImgURL,
                likes: {
                    count: 0,
                    whoLiked: [],
                },
                comments: 0,
                description: payload.description,
            };

            // Load existing articles from local storage
            const articles = JSON.parse(localStorage.getItem('articles')) || [];
            articles.push(articleData);

            // Save updated articles to local storage
            localStorage.setItem('articles', JSON.stringify(articles));

            dispatch(setLoading(false));
        };

        try {
            await saveArticle();
        } catch (error) {
            console.error("Error posting article:", error);
        } finally {
            dispatch(setLoading(false));
        }
    };
}

export function getArticlesAPI() {
    return (dispatch) => {
        dispatch(setLoading(true));
        
        // Simulate fetching articles from local storage
        const articles = JSON.parse(localStorage.getItem('articles')) || [];
        const ids = articles.map((_, index) => index.toString()); // Generating a simple ID list
        
        dispatch(getArticles(articles, ids));
        dispatch(setLoading(false));
    };
}

export function updateArticleAPI(payload) {
    return (dispatch) => {
        const articles = JSON.parse(localStorage.getItem('articles')) || [];
        const index = articles.findIndex((_, idx) => idx.toString() === payload.id);

        if (index !== -1) {
            // Update the article
            articles[index] = { ...articles[index], ...payload.update };

            // Save back to local storage
            localStorage.setItem('articles', JSON.stringify(articles));
        }
    };
}