# Phrase Factory

### User Stories

1. **Create Post with Preset Words:**
   As a user, I want to make a post on each prompt page using a preset list of words, so I can create an answer to the prompt efficiently.

2. **Navigate Through Prompts:**
   As a user, I want to navigate through different prompts, so I can find and interact with various challenges.

3. **View and Upvote Answers:**
   As a user, I want to see other users' answers to the prompts listed by upvotes and upvote the ones I like, so I can engage with and appreciate the best responses.

4. **Introduction to the Game:**
   As a user, I want an introduction to the game/idea on the landing page, so I know how to interact with the app effectively.

5. **User Authentication with Clerk:**
   As a user, I want to sign in using Clerk and have my user ID associated with my data, so I can have a personalized experience.

6. **Enhance UX with Component Library:**
   As a developer, I want to use a component library to enhance the user experience, so the application is visually appealing and user-friendly.

7. **Mobile Compatibility:**
   As a user, I want the application to work on mobile devices, so I can use it conveniently on the go.

### Strech Goals

1. **User-Generated Prompts:**
   As a user, I want to create my own prompts (either by submitting or live creation) so I can contribute to the community and see how others respond.

2. **Most Popular Answers Grid Layout:**
   As a user, I want a page that shows the most popular answers to all prompts together in a grid layout with the prompt above each answer on the same card, so I can easily browse the best responses.

3. **Most Used and Upvoted Words:**
   As a user, I want a page that displays the most used words and the most upvoted words, so I can see which words are trending and highly rated.

4. **Different Reactions:**
   As a user, I want to give different reactions (like laugh, shocked, etc.) to the answers, so I can express my emotions beyond just upvoting.

### Deploying the Project

To deploy this project, complete the following steps:

1. **Fork/Clone the Project Locally:**
   Navigate to our [GitHub Repo](https://github.com/Cxndr/week12-finalproject) and click Fork in the upper right hand corner. Once Forked, find the copy of this repo under your repositories. Next click the large green Code button and copy the SSH key. Then open your terminal and run `git clone` followed by this copied SSH key and hit enter. This will obtain a local copy. Then run `npm i` to install the relevant packages.

2. **Create the database tables:**
   Navigate to your local copy and open with your prefered Code Editor/IDE. Open the `schema.sql` file and create all the tables in your prefered database host provider by running each create table query.

3. **Link your database:**
   Create a .env.local file and copy the following template:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
DATABASE_URL=
```

Place your database URL after the DATABASE_URL=

4. **Link Clerk Application:**
   To manage login, create a new clerk project [here](https://dashboard.clerk.com/apps/new). Create an account with clerk if you haven't got one already. Once the project is created with prefered login methods, under Configure >> Developers >> API Keys. Copy the keys from the Quick Copy window located in the upper right hand corner and place them into your `.env.local`, replacing them existing empty entries.

5. **Seed the Database:**
   Open the `seed.js` file and uncomment the `fillWithWords()` and `fillPrompts()` functions. Then run `node seed.js` in your terminal.
   This will populate the tables with default values. If you wish to reset the tables to their default configuration uncomment `emptyAllTables()` to remove everything.

6. **Validate Functionality:**
   Run `npm run build` followed by `npm run start` and visit http://localhost:3000 to validate that the site functions as intended with the provided .env.local configuration.

7. **Deploy to Host:**
   To deploy this project navaigate to your prefered hosting provider. I recommend [Vercel](https://vercel.app/) for quick and easy Next App deployments. Steps may vary depending on host however generally you will login with GitHub and create a new project. Find your GitHub repo in the list (or copy the URL from your Forked project if it isn't listed). Go back to your Code Editor/IDE and copy the contents of the `.env.local` to clipboard. Add these to the Environment Variables for the project. With Vercel you can paste them all in at once and click save. Remember to name the project for easier navigation later. Then hit deploy and wait a moment for it to build.

You should now have a deployed copy of Phrase Factory!
