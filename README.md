
# Devshowcase

This is where people who code, can connect, can showcase their development projects in front of whole coder's community. Get hired by startups to build their developer expertise.

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

