# Jack's Travel log

### What is this?

This is intended to be a simple cross-platform travel application. The idea is that you can manage your trips, and for each day of your trip enter a journal entry and media (photos / videos). 

### How is it built?

The container for this app is Electron, a framework maintained by Github which allows native desktop applications to be built with web technologies - ie HTML, CSS, Javascript. 

Within Electron, this app is built with React JS as the "front-end." The Electron app also hosts a Node.js server with Express.js for back-end features and leverages a SQLite database for data storage. 

### How to run

```
git clone https://github.com/jack-ditto/Travel-App.git
cd Travel-App
npm install
```
To start the React app:
```
npm run start
```
To start the Electron container:
```
npm run electron-start
```


### Current progess

Currently this app has a functional user interface implemented with React and a function back-end server. The back-end componet of the application is still being tested and has yet to be integrated with the front-end component. 

### TODO

- [ ] Fix / possibly re-design UI/UX
- [ ] Finish testing back-end server
- [ ] Integrate front-end and back-end
    - [ ] Figure out media uploads
- [ ] Additional final testing
- [ ] Honestly probably built a website to market / provide download space
