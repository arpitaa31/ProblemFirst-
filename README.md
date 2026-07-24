# ProblemFirst

Live Demo

https://problem-first.vercel.app/

No setup required. Just go to the site and start using it!

## What is ProblemFirst?
---
ProblemFirst is a website that focuses on giving people clarity on real-world problems that are brought to the system.

Unlike other AI systems that jump straight to solutions, I made ProblemFirst have a focus on understanding the underlying factors of a given problem. The user just has to input their problems in natural language and let the AI parse them into easily digestible sections for better comprehension and subsequent action.

I created this project in order to provide an alternative to other general-purpose AI assistants that I felt jumped straight to providing solutions, while ProblemFirst focuses on first solving the problem.


## How it Works


As mentioned earlier, the process is simple: you type in a problem, the AI parses it and responds with relevant information about potential underlying causes, possible courses of action, as well as when it would be advisable to seek the help of a professional.

You can continue asking the AI about the problem in order to get different options as well as further understand the potential causes and consequences of the issue.


## Features

-Google Gemini API for problem parsing and responses

-Clean UI/UX with great readability

-Google sign-in with Firebase

-Explore page for different problem categories

-Trending page for the most common problems

-Business page (a showcase version)


## Frontend

I must say that I have invested a lot of time into the frontend of the application.

In order to make a website that did not feel overwhelming to the user and was a big difference from other AI assistants, I worked extensively on the spacing, color schemes, typography, cards, buttons, and general layout. The UI makes use of modern design elements such as gradients, glassmorphism, transitions, and responsive design. On top of that, I also followed a consistent theming across all pages in order to allow for a coherent experience throughout the application. While many of these improvements were done via code, some of these were done manually by trial and error in order to get a UI that looked good.

Other than that, the rest of the tech stack used includes:

-Next.js (App Router)

-TypeScript

-Tailwind CSS

-Firebase Authentication

-Gemini API

-Vercel


## Why I Built It

The main reason for building this application was simple: sometimes people need help not necessarily for an end solution but rather for navigating the landscape of the issue at hand.

By creating ProblemFirst, I sought to create a tool that focused on first solving the problem rather than jumping to solutions, thus helping people better understand their issues and potential courses of action.


## Limitations

Of course, ProblemFirst has some limitations too. For one, it relies on the Gemini API for its responses and parsing of problems. In the case that the Gemini API is not available, ProblemFirst will rely on fallback responses programmed into the system, which are limited.


# Final Thoughts
---
ProblemFirst began as nothing more than just an idea but has since evolved into the application that you see today. Throughout the development process, I have worked extensively on both the AI side as well as the frontend in order to make sure that the application was intuitive and easy to navigate. While there is certainly still more to do, I couldn't be happier with the end-result!
