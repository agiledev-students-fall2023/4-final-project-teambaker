![ah](https://github.com/agiledev-students-fall2023/4-final-project-teambaker/assets/100020447/b4320f2b-92c8-4dbf-8604-4aca64a8414e)
## I. Get Started
TBD--Instruction for how to set up and run this app.

## II.  Contributing Members
- Nina Xiao (Product Owner): @
- Tracy Zhang (Scrum Master): yz5835 (https://github.com/Ceiceiceii)
- Lesley Zhao: tz2074  [@lesleyzhao](https://github.com/lesleyzhao)
- Richard Lee: cl5515 (https://github.com/lunnnnnn)
- Charlotte Ma: @


  
 #### Contribute to this project
 please refer [CONTRIBUTING.md](https://github.com/agiledev-students-fall2023/4-final-project-teambaker/blob/master/CONTRIBUTING.md) to see how to contribute to this project.
## III. What and why?
This is an engaging and educational map application, inspired by the scattered information about art history online. There is no a unified website to summarize all historical periods in art history, which posed challenge for art education. This application will allow users to explore random artwork and music in different historical time periods and regions across Europe. 
The user can select a year in the history, and the map will display corresponding geometric features at that time. When the user click on some location, the application will collect information online and display a random image of artwork and a soundtrack specific to the year and location. In this way, the user can gain a more comprehensive understanding of artworks and compositions relative to countries, time periods, and historical details.
#### Product Vision Statement: 
GoodOldMap will be an one-stop educational map application enabling students and art lovers to learn different art movements via interactive map and exploration on random artwork across different time periods.
## IV. For whom?
This application is for children and teenagers who are curious to learn about art and culture. The user can explore different art and music of different regions and time periods, building a more comprehensive undertanding of art and cultural with a geometric understanding.
## V. How?
The platform is composed of three main themes below, as well as ordinary functionalities like sign up an account, login with password, and reset password.
1. Art Map:
   - The user will be able to drag the timeline bar to learn about historial art & music based on the unit of the year. The bar will display specific art movement like "The Renaissance" when being dragged and change its content based on years. When the user drag the timeline bar, the map will show the boundaries of countires, cities, and general time periods like "The Renaissance."
   - When clicking a point of the map, the user will see a popup window that shows random artwork and hear a random composition specific to the location and time.
2. Art/Music Description:
   - When the user clicks on the popup window from the previous step, he/she will find a detailed explanation of the artwork and the composition. He/she will also find roughly 10 related works completed at this time and location. He/she will be able to learn more about them by clicking on each.
   - The users are able to add specific artwork or music to their favorite item list, and access this favorite list later in their profile page.
3. Profile & My Favorite List
    - The users can check any previously collected art pieces in their personal profile page, under "My Favorite".
    - The users can sign up for an account, and the system will match a landscape painting by Van Gogh as their profile photo.
    - The users can reset their personal information like email address, user name, and password on the profile page.
   
## VI. Scope
This project requires percise map building technology and web scraping skill. With instruction, a group of 4-6 is able to complete it in the semester.

# Instruction on how to set up and run the project 
## Git Workflow

   To make any editions to the project, please follow the below procedures.
    - Clone the master repository and work on your cloned copy. Do not fork a copy of the master repository.
    - Remember to follow the standard feature branch workflow for all user stories. 
    - After done with the changes on local copy, use git status to check the status to the project
    - Use git add . to stage the changes
    - Use git commit -m "summary of the staged changes"
    - git push origin master(main branch) and create a pull request.
    - When creating a pull request, please follow the syntax:

   
### Description

Please include a summary of the changes and the related issue. 
Please also include relevant motivation and context.
List any dependencies that are required for this change.

### Change List

Please delete options that are not relevant.

- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] This change requires a documentation update

### Testing

Please describe the tests that you ran to verify your changes.
Provide instructions so we can reproduce. Please also list any relevant details for your test configuration

To resolve any merge conflicts, we recommend you to use rebase to resolve conflicts or simply use web merge conflicts editor.


## Set Up Environment
Please run the following commands to initialize the local host: 

Front-end setup:
```
git clone https://github.com/agiledev-students-fall2023/4-final-project-teambaker.git
cd 4-final-project-teambaker/front-end
npm install
npm run dev
```
Back-end setup:
```
cd 4-final-project-teambaker/back-end
npm install
nodemon src/server.mjs
```
## Build & Test the Project

   - We use React as the front-end, so when you want to build the project, open the terminal and type npm -start. Make sure to copy paste the localhost and the corresponding port website to your browser.
   - We use mocha, chai, and c8 to perform unit testings on all of our codes. To enable testing, please run the following script to set up testing: 
      ```
      cd 4-final-project-teambaker/back-end
      npm install --save-dev c8 mocha chai supertest chai-http
      npm test
      ```
   -  To view the coverage report generated by c8, please run the above commands and look for a directory called 'coverage' under the root directory 'back-end', open index.html in a browser to see the coverage report.
