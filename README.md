# What The Fact

### A site that helps gauge whether a claim is true or not.
![What the Fact](Assets/FinishedProduct.png)

## Table of Contents
* [Technologies Used](Technologies_Used)
* [Deployed Site](Deployed)
* [Features](Features)
* [Other](Other)
* [Usage](Usage)
* [Author](Author)
* [Credits](Credits)
* [License](License)

## Technologies_Used
* JavaScript 
* HTML
* CSS
* [express.js](https://expressjs.com/)
* [express-sessions](https://www.npmjs.com/package/express-session)
* [node.js](https://www.npmjs.com/)
* [mysql](https://www.mysqltutorial.org/)
* [jQuery](https://jquery.com/)
* [passport.js](http://www.passportjs.org/)
* [sequelize](https://github.com/sequelize/sequelize/)
* [bcrypt.js](https://www.npmjs.com/package/bcryptjs) 
* [Semantic UI](https://semantic-ui.com/)
* [Google Fact Check API](https://developers.google.com/fact-check/tools/api)

## Deployed Site
[What-the-Fact](https://what-the-fact.herokuapp.com/)

## Features 


### __1. A Claim Search__

_What?_

A search that allows you not to simply search terms, but identify claims associated with terms and rates whether they are true or not. 

_Why?_

Even if you are smart, even if you are aware of the daily news and consider yourself a critical thinker, on occasion, something will slip by you. Some little tidbit, some little piece of something will weasel itself into your brain and you will "KNOW" it, you will share it, you will argue for it and you will convince your friends and family member that this is the truth. That this is the fact. So, we wanted to help create a better tool, an easy one to use that will allow you to stop the misinformation and maybe, will help you exclaim "what the fact!?!?!" 

_How?_

Our claim search is primarily done using google's fact checker [API](https://developers.google.com/fact-check/tools/api). 

 -------Description of the API Goes Here--------

The biggest challenge using this API was figuring out where to call it and  getting it to display on English results (as our site is only in English). In order to resolve our language issue we inserted a bit of code into the original API code that set the language to en


### __2. Easy to View Claim Searches__

_What?_



_Why?_

One of the most important points we all agreed on early in the build of this project was that we wanted to create something beautiful and easy to use. Being able to easily select the claim and have it show up nicely was paramount.

_How?_

![Search-Results](Assets/CodeSnippet01)

### __3. A User profile__

_What?_

A simple page built just for you to keep your searches. 

_Why?_

So that users can save their searches and their data. Sure you can copy the information down into a word document or onto a piece of paper but, that's not always convenient, is it? Unless you are a scientist working in a remote rain forest it is unlikely you will carry a notebook and pen with you where ever you go. And if you wanted to ever refer back to your search you might be willing to go through the whole process of searching up all the different terms again or you might want things to save conveniently to your own profile. 


_How?_

This was a complex task to achieve as a developer. Not because the page was overly difficult to design but because it was difficult to conceptualize. How were we going to get the data that the user called to save on the page-Jerri and Rachael spent hours discussing the file paths and how they would get from the search to the save data. There were many ideas. 
    1. Create a members only website, where you have to log in to use the fact check and you can save your searches 
    2. Create a front end search and a user search that has a button that allows you to save your searches into
        a. a database
        b. local storage    

 

### __4. A saved search__
_What?_

_Why?_

_How?_

### __5. Model View Control Design__
_What?_

_Why?_

_How?_


##  Other

 __For later builds__



 twitter fact check -reads through tweets and uses response to enter into the fact check api
 Comments section
 Icons/images that show up with claims


 __What we have to say about this project__

 _Aaron_

 _Janessa_

  
_Rachael_  



## Usage
### This site is for anyone. Anyone who finds themselves lost in the world of information that the modern world grants us and would like a little more clarity, insight and direction in that world. 
    

## Authors 

Aaron Diggdon

* [linkedin] (https://www.linkedin.com/in/rachael-kelm-southworth-87a3831b3) 

* [github] (https://github.com/aarondig)

* [portfolio](https://rksouth.github.io/responsive_portfolio/)

Janessa Fong

* [linkedin] (hhttps://www.linkedin.com/in/janessafong) 

* [github] (https://github.com/janessaref)

* [portfolio](https://rksouth.github.io/responsive_portfolio/)

Rachael Kelm-Southworth

* [linkedin] (https://www.linkedin.com/in/rachael-kelm-southworth-87a3831b3) 

* [github] (https://github.com/RKSouth/)

* [portfolio](https://rksouth.github.io/responsive_portfolio/)

 ## Credits

I would like to thank Kerwin, Manuel, Roger, Jerome and all my classmates for helping me understand this subject matter and anyone that contributed to make the base code.

## License
[MIT](https://choosealicense.com/licenses/mit/)




