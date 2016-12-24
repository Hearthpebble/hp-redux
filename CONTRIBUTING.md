# Contributing

### Implementing an action
1. Add action creator in src/actions.js.
2. Add a test to test/actions.js to ensure the action creator works.
3. Add case statement to each reducer that handles the action. Multiple reducers can handle the same action.
4. Add test to test/reducers/(reducer name) to ensure it handles the action correctly.

### Line Endings
We are using Unix line endings so before you do anything set the line ending option of your text editor to `LF`. Also configure your git to not auto set line endings by running `git config --global core.autocrlf false` in your console.

### Steps
1. Fork this repo
2. Clone your fork
3. Pick an issue and write a comment that you are going to do it
4. Checkout a new branch--don't make any changes to master
5. Make your changes on the new branch
  * Ensure that all tests pass
  * Write new tests when appropriate
  * Ensure there are no lint errors. If there are lint errors that aren't appropriate open a new issue.
6. Push your branch to your fork
7. Open a pull request
  * Each pull request should only handle one issue. If you want to solve multiple issues then open one pull request per issue
  
