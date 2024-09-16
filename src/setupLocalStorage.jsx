const initArticles = [
    {
        id: 1, // Add unique ID
        actor: {
            displayName: "Mukul",
            description: "user1@example.com",
            title: "User One",
            date: new Date().toISOString(),
            image: "/images/avatar.png",
        },
        video: "",
        sharedImg: "/images/shared-image.jpg",
        likes: {
            count: 5,
            whoLiked: ["user2@example.com"],
        },
        comments: 2,
        description: "This is a sample article",
    },
    // Add more sample articles with unique IDs
];
