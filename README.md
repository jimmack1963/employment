# Movie API Code Test

## Pre-requisites

* An IDE or text editor of your choice
* [Sqlite3](http://www.sqlitetutorial.net/)
* JRM: chose not to use extension that allows for JSON data, went old school on genre field as data set is small, 
  so optimized on speed not memory use.
* JRM: would push back on data design in many ways, lol, but decided to code as if I could not change them.  For 
  example, not aware how to do joins when in two different db files.  Could not find correct sqlite3 multi-table 
  loading that worked reliably

## Task
Your task is to create an API on top of a couple different databases.  It should conform to the user stories provided below.  You are free to use whatever language you prefer, however our tech stack features NodeJS, Java and Ruby. If you're comfortable with any of these, try to favor them.  Google and the interwebs are at your disposal.

**The Databases**
The databases are provided as a SQLite3 database in `db/`.  It does not require any credentials to login.  You can run SQL queries directly against the database using:

```
sqlite <path to db file>
```

`.tables` will return a list of available tables and `.schema <table>` will provide the schema.

## Considerations
When developing your solution, please consider the following:

* Structure of your endpoints - Can you easily extend the API to support new endpoints as feature requests come in?
  * JRM: a REST library will already do that for us, possibly either by hooking into the ORM or dynamically loading 
    and registering from a folder
* Quality of your code - Does your code demonstrate the use of design patterns?
* Testability - Is your code testable?
  * JRM: npm run test, uses a subset of movies (only 1963 releases, cause that's the best year for releases, lol)
* Can your solution be easily configured and deployed?  Consider guidelines from [12 Factor App](http://12factor.net/)


## User Stories

#### List All Movies
AC:

* An endpoint exists that lists all movies
* JRM: order not specified, so added querystring order.
  * did not have time to limit to valid fields, suspect you use data library which may have some features (including 
    interfacing with REST) 
* List is paginated: 50 movies per page, the page can be altered with the `page` query params
  * JRM: added limit parameter
* Columns should include: imdb id, title, genres, release date, budget
  * JRM: I would normally expect ability to specify field list as well; it helps keep traffic low
* Budget is displayed in dollars
  * JRM: formatting should be on client, so would ask questions to determine reasoning behind this spec

#### Movie Details
AC:

* An endpoint exists that lists the movie details for a particular movie
* Details should include: imdb id, title, description, release date, budget, runtime, average rating, genres, original language, production companies
* Budget should be displayed in dollars
* Ratings are pulled from the rating database
  * JRM: could not accomplish average rating in time allowed, could not find useful sqlite help

#### Movies By Year
AC:

* An endpoint exists that will list all movies from a particular year 
* List is paginated: 50 movies per page, the page can be altered with the `page` query params
* List is sorted by date in chronological order
  * JRM: can be overridden by order query parameter, within date range
* Sort order can be descending
  * JRM: added query param desc to all endpoints returning multiple records
* Columns include: imdb id, title, genres, release date, budget

#### Movies By Genre
AC:

* An endpoint exists that will list all movies by a genre
  * Not specified, so allows id or name match
* List is paginated: 50 movies per page, the page can be altered with the `page` query params
* Columns include: imdb id, title, genres, release date, budget

## Tips

* This is a test of your abilities and not how fast you can crank through random stories.  As such, it is more important to produce well structured code that meets the criteria in the user stories rather than getting all stories done.
* If you get stuck, please ask someone.  We want to know how you work both as an individual and as part of a team.  You will not lose points for asking for help on something that is unclear or where you are stuck.
  * I'm not afraid of asking for help, but the 3 day weekend intruded 
  
* I normally commit to git often, but chose not to in this test as I didn't want you to see how many hours I ended 
  up working on it
