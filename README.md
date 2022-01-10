Doctolib Home Test

The goal is to write an algorithm that returns the availabilities of a calendar depending on openings and the scheduled events. The main method takes a start date as input and looks for the availabilities over the next 7 days.

There are two kinds of events:

opening, are the openings for a specific day and they can be recurring week by week (e.g. every monday starting from a certain date)
appointment, times when the doctor is already booked
The entire product specifications are described in the provided test files. In other words, the test files describe the behavior we expect from the algorithm.

Your Mission

Pick either the Ruby or the JavaScript version of our home test

Ruby

Javascript

Write an algorithm that passes all the tests we provided. Please do not modify the provided tests.

Think beyond those provided cases, specifically:

Add tests to make sure all nominal cases are covered

Add tests to cover all edge cases you can identify

Do not edit the provided tests, only add some

Please do not add any extra files. Use the existing files that you’ll find in the zip file.

Your code should be

Maintainable: simple, clean and easy to understand.

Performant: it must be production-ready. Pay attention to your SQL queries, consider the complexity of your algorithm.

Secure: follow basic security standards.

Be careful, your code must be able to run

With the Ruby or NodeJS version specified in the .ruby-version or .nvmrc files.

Only with the libraries we provided in the skeleton. Please don’t upgrade the library versions.

With the latest version of SQLite.

Side notes
You can read about our values here

Please, DO NOT host your project on public repositories!

FAQ
How to start working on the code challenge?

Unzip the archive

cd into the extracted folder and create a new Git repository

git init

git config user.name '<YOUR NAME>'

git config user.email '<YOUR REAL EMAIL ADDRESS, OR WRITE fake@email.com>'

If you went with JavaScript run npm install. If you went with Ruby, run bundle install.

Now start coding and adding your own tests! Make sure to git commit at least once.

How to launch the test suite?

Ruby

Run ruby test/event_test.rb.

JavaScript

Run npm run test.

How to hand in the test

We ask you to package your repository as a Git bundle before sending it back to us. Here is how to do it.

cd into your code directory.

Run git bundle create doctolib-test.bundle HEAD master. If you worked with a branch different from master, replace master in the command with yours.
Finally, send us the doctolib-test.bundle file you just created at step 2.