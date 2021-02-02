# Smart_Mirror

##  Please read this carefully
##  Before developping a new feature do this :

git checkout master
git pull

then you create a new branch feature (you need to be on master):

git checkout -b feature/'branch-name'

##You want to push your modification :
###Only do that if your code runs correctly without error in terminal and in console (on your browser):

npm run lint
-> fix all errors given by the lint script then: 

git add .
git commit -m "explain here what you developed"
git push

Then go on github and create pull request.
Assign a referent of your domain as reviewer and assign yoursefl on the PR.


## To improve FRONT :
### -> go to the folder FRONT and read README.md

## To improve BACK :
### -> go to the folder BACK and read README.md
