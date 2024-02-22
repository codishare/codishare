# Codishare

This is a web application built with Next.js that allows users to share their open source projects and find collaborators. The app is designed to be simple and user-friendly.

# Features

- Project sharing: Users can share their open source projects by creating a new project and providing details such as project name description, and GitHub repository link.
- Project search: Users can search for projects based on keywords, tags, or project name.
- Collaborator search: Users can search for collaborators based on skills, interests, or location.
- User profiles: Users can create a profile that showcases their skills, interests, and projects they have contributed to.
- Project dashboard: Users can view all their projects and collaborators in one place.

# Getting Started

To get started with the app, clone the repo and then run the following commands:

```
npm install
npm run dev
```

or

```
yarn
yarn dev
```

The app should now be running on localhost:3000.

# E2E Testing

Create your own cypress.env.json file. Cypress will check and import it to use in Authorization process testing. 

```
{
    "CYPRESS_EMAIL": "sample@email",
    "CYPRESS_PASSWORD": "random_password"
}
```

# Sentry

Sentry is an error monitoring platform that allows you to identify, diagnose, and fix issues in your application. It integrates real-time error tracking, instant notifications, and provides detailed information to facilitate issue resolution.

Setup your sentry token on .env and handle errors on sentry. 

```
https://codishare.sentry.io/
```

# Contributing

Contributions are always welcome! If you have any suggestions or find any bugs, please create an issue or submit a pull request.

# License

This project is licensed under the MIT License - see the LICENSE.md file for details.
