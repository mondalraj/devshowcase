
# Devshowcase

This is where programmers can connect and showcase their work to the broader programming community. Even better, they can find jobs with startups to gain expertise as developers.  
Developers can create a profile by including details about their schooling, projects they have worked on, and prior employment experience.  
For coders who are too busy writing code and don't have time to build their portfolio in addition to the resume/CV, their profile serves as a developer portfolio.  
They can also send the recruiters the URLs to their profiles.  
Developers can examine each other's profiles for ideas and communicate with their projects by leaving comments on each other's work.  
People can also write the developer directly with a message that is posted to the developer's email.  
This is a one-stop shop for developers to advertise their abilities and current projects.

[Feartures (Included and to be included in the later days)](https://docs.google.com/document/d/1vdRhU8_GdUo2eJItNpvOnjtkwQYZ3NKtkj-UScJ0wqs/edit#)


## Demo

https://devshowcase-22.vercel.app/


## Tech Stack

**Frontend:** React JS, Next JS, TailwindCSS, Framer Motion, Google Auth, Mailjet

**Backend:** Node JS, JWT, MongoDB, Mongoose, Cloudinary API


## Run Locally

Clone the project

```bash
  git clone https://github.com/mondalraj/devshowcase.git
```

Go to the project directory

```bash
  cd devshowcase
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env.local file

`MONGODB_URL` 

`NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`

`NEXT_PUBLIC_CLOUDINARY_KEY` 

`CLOUDINARY_SECRET`

`NEXT_PUBLIC_GOOGLE_CLIENT_ID` 

`MAILJET_PUBLIC_KEY` 

`MAILJET_PRIVATE_KEY` 

`NODE_ENV` = 'dev'
## Contributing

Contributions are always welcome!

First Fork and Clone this repository on your local machine.

Start working on a new feature:

```bash
git checkout master
git pull origin master
git checkout -b feature-branch
[...work on the feature...]
git add --all
git commit -m 'My super-duper feature'
git push -u origin feature-branch
```

After Testing and validating. If more changes are required:

```bash
git checkout feature-branch
git pull origin master
[add more commits]
git push
```

Once everything is validated:

```bash
git checkout master
git pull origin master
git merge feature-branch
git push origin master
```

