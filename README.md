# Welcome to Taskrat!
### A full-stack [Taskrabbit](https://www.taskrabbit.com/) clone with a post-apocalyptic twist.

#### *Inspired by the [Fallout](https://en.wikipedia.org/wiki/Fallout_(series)) series, Taskrat allows users to live out their wasteland fantasy. Pick up tasks and complete them to earn bottlecaps, or, if those mutant hounds are too much for you to handle on your own, post your own task! Once you complete a task, be sure to leave a review. Check out other users' profiles to see their reviews and decide if you want to work with them.*

### Check out the live site [here](https://taskrat.herokuapp.com/about)!

## Technologies used
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![Heroku](https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white)

## Home
![home](https://user-images.githubusercontent.com/100968885/182058873-cffcd913-194f-4125-8d61-91a125a851ac.png)

## Features
#### [Users](https://github.com/Irving-Develops/task-rat/wiki/Feature-List#users)
#### [Tasks](https://github.com/Irving-Develops/task-rat/wiki/Feature-List#tasks)
#### [Reviews](https://github.com/Irving-Develops/task-rat/wiki/Feature-List#reviews)
#### [Tags](https://github.com/Irving-Develops/task-rat/wiki/Feature-List#tags)
#### [Profile](https://github.com/Irving-Develops/task-rat/wiki/Feature-List#profile-page)

## Local Setup
1. Clone this repository

   ```bash
   git clone https://github.com/Irving-Develops/task-rat
   ```

2. Install dependencies

      ```bash
      pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment
   
4. Setup your PostgreSQL user, password and database and make sure it matches your **.env** file

5. Get into your pipenv, migrate your database, seed your database, and run your flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```
6. Open a new terminal and cd into the react-app folder

7. Install front-end dependencies and start the server

      ```bash
   npm install
   ```
   
      ```bash
   npm start
   ```
8. If browser does not open right away, navigate to localhost:3000 and enjoy!

## Meet the Pack Rats!
### *Taskrat made possible by these four nerds:*
#### [Irving Arreola Palacios](https://github.com/Irving-Develops)
#### [Wesley Blackburn](https://github.com/wesleyblackburn90)
#### [Jay Hutts](https://github.com/jay-bean)
#### [Angie Maidt](https://github.com/angMaidt)
