# Pinboard

## Background
Pinboard is a [Pinterest](https://www.pinterest.com/) clone built on react and rails.

See it live here: [Pinboard](https://pin-board-8f19ce7d10cc.herokuapp.com/)

## Technologies
- `React` including `Redux state` for frontend, including `CSS` for styling
- `Ruby on rails` for backend 
- `AWS S3` for hosting images
- `Webpack` to bundle code and `npm` to manage project dependencies

## Functionalities
In Pinboard, users are able to:

- Sign up for an account; current users can login and log out
    - Two demo user accounts are available for non-users to look at
- Create, edit, and delete Pins
- Create, edit, and delete Boards that contain Pins

## Features walk through / Instructions

#### Logging in and viewing Demo User accounts

Non users can login as Demo User 1 (testuser7) or Demo User 2 (green_yogi) to view the site. These two profiles provide two different ways to look at how someone might use the site (for ex. Demo User 1 has more food/recipe focused boards, while Demo User 2 has a home design board).



#### Create, edit, and delete Pins

Pins are virtual "pins" - users will upload pictures for each pin, which is a virtual visual bookmark for an idea, that can be linked to a webpage such as a blog post or article.

#### Create, edit, and delete Boards that contain Pins

In order to organize pins, users can create virtual "boards" to save pins to. Users are able to save a pin to a different board than the board a pin is currently saved in. 

## Implementation/Project Highlights

- Styling and UI/UX of Pins/Boards
- Custom dropdown using global util functions

## Future Features
- Home page: adding transitions to home splash page 
- User Profile: ability to edit profile, including addin/updating profile picture
- Feed: implement a home "feed" where users can see pins created by other users, similar to pins a user has already saved, so that users can save these pins for further inspiration. Currently users only see their own created pins and boards.
- Search: search pins by tagged topics 
- Comments: ability to comment on pins

## Asset Attribution
- SVG Elements and styling design taken from Pinterest
- Images taken directly from linked blog/website in "pin"

