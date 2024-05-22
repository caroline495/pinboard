# Pinboard

## Background
Pinboard is a [Pinterest](https://www.pinterest.com/) clone built on react and rails.

See it live here: [📌 Pinboard](https://pin-board-8f19ce7d10cc.herokuapp.com/)

## Technologies
- `React` including `Redux state` for frontend, including `CSS` for styling
- `Ruby on rails` for backend 
- `AWS S3` for hosting images
- `Webpack` to bundle code and `npm` to manage project dependencies

## Functionalities
In Pinboard, users are able to:

- Sign up for an account; current users can login and log out
    - Two demo user accounts are available for non-users to look at
- Create, edit, and delete Pins (full CRUD)
- Create, edit, and delete Boards that contain Pins (full CRUD)

## Features Walk Through / Instructions

#### Logging In and Viewing Demo User Accounts

Non users can login as Demo User 1 (testuser7) or Demo User 2 (green_yogi) to view the site. These two profiles provide two different ways to look at how someone might use the site (for ex. Demo User 1 has more food/recipe focused boards, while Demo User 2 has a home design board).

![Screenshot 2024-05-17 at 10 49 05 PM](https://github.com/caroline495/pinboard/assets/141605699/bea3073a-069c-4d97-b821-5973329751a2)
![Screenshot 2024-05-17 at 10 49 18 PM](https://github.com/caroline495/pinboard/assets/141605699/78f6d896-7b69-4372-94ed-f6373bf3e759)


#### Create and Edit Pins

Pins are virtual "pins" - users will upload pictures for each pin, which is a virtual visual bookmark for an idea, that can be linked to a webpage such as a blog post or article. A User can create a pin by clicking on "create" from the nav bar, which will take them to a create pin form. Users must upload a picture, but do not need to fill in the other fields to create a pin. 

Once a pin is created successfully, a popup window will appear that allows a user to go to that pin's individual page. Users can then further edit a pin by clicking on the three dots located at the top, which will display an edit modal with options to edit fields and delete the pin. Users can also switch the board that the pin is currently saved to, from a dropdown displayed in the top right hand corner. The current board will show first, followed by all the other boards a user has created.

#### Create and Edit Boards

In order to organize pins, users can create virtual "boards" to save pins to. Users are able to save a pin to a different board than the board a pin is currently saved in. Users are able to create a board by navigating to their user page and clicking on a "+" button located before their pins/boards displayed, which will show the option to create a board. 

Once a board is created, it will contain no pins initially. Users can navigate to their user page and click on the "created" area to see all the boards they have, and look at inidividual boards. Once on an individual board page users can edit/delete boards, by clicking on the three dots on the page. Users can add pins to their board from clicking into individual pins, and change the board that a pin is saved to.

## Implementation/Project Highlights

- Styling and UI/UX of Pins/Boards to match Pinterest site
- Custom dropdown using global util functions

## Future Features
- Home page: adding transitions to home splash page 
- User Profile: ability to edit profile, including adding/updating profile picture
- Feed: implement a home "feed" where users can see pins created by other users, similar to pins a user has already saved, so that users can save these pins for further inspiration. Currently users only see their own created pins and boards.
- Search: search pins by tagged topics 
- Comments: ability to comment on pins

## Asset Attribution
- SVG Elements and styling design taken from Pinterest
- Images taken directly from linked blog/website in "pin"

