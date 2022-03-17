# Devshowcase App

## Tech Stack -> Next JS, Tailwind CSS, REST API

## Rules for Contribution

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

