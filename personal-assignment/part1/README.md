# Assignment1
(Please read this assignment after 9/24.) Now, new codebase is here! You can pull the upstream `develop` to your local machine and merge them. You will see two directory. The frontend one has some new features, which added are as follows:
1. Material Tailwind has been integrated, allowing you to quickly implement pre-made component styles. This library is also compatible with Tailwind (you can refer to the [official documentation](https://www.material-tailwind.com/)).
2. We have created a `ChattingRoom` component for you to use. In future product projects, you are likely to utilize this feature, so it's a good opportunity to get familiar with it now.
  
Please note that this assignment **does not test any front-end skills**; the main focus will be on the back-end. Therefore, there is nothing you need to modify front-end code now; understanding the general logic is sufficient.
  
## Backend Assignment

For this assignment, your task is to create a dynamic web-based chat application. This will involve several steps to ensure a seamless interaction for users, integrated with the power of OpenAI's capabilities.

### Part 1
Begin by cloning the specified project from GitHub. Once you've secured the project on your local environment, navigate to the project's directory. From here, install all necessary dependencies. Your first milestone is to successfully get the Express server running without any hitches.

### Part 2
Your next objective is to establish a connection between your application and MongoDB. Whether you're using a local instance or a cloud-based service, the goal is the same. Install any required MongoDB packages or drivers for Express. Then, make sure that your Express application can both read from and write to the database without issues.

### Part 3
With the basic infrastructure in place, start developing the chat API. This should include a route that fetches chat messages via a GET request and another route that enables the posting of new chat messages with a POST request.

### Part 4
To give users control over their messages, you need to add a delete functionality. Create an endpoint in your application that lets users delete specific chat messages. On the backend, ensure that once a message is selected for deletion, it's completely removed from MongoDB.

### Part 5
Now, for an exciting part! Integrate your application with the OpenAI API. If you haven't already, set up an account with OpenAI and get the necessary API keys. Design a segment of your application that communicates with OpenAI's API. The goal is to have the application generate auto-responses using OpenAI whenever a user sends a message.

### Part 6
Finally, Based on the front-end codebase we provided, please integrate the API. The one that needs to be integrated is getSessionById.

That wraps up the assignment! As a quick reminder, always ensure that sensitive information like API keys and database credentials are kept confidential. Avoid pushing them to public repositories directly. Good luck!

## How to hand-in?
Create a branch named `assignment_part_1` and push to your repo. And then just send a PR to your branch in upstream. Note that if your want to modify your assignment, **just push the same branch to your repo**. Because the pull request is still there, github will automatically track your commit.
