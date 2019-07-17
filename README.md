# Description

This app is to allow anyone to search the iTunes store using their API! There are two parts to it:

1. **Frontend**: React
2. **Backend**: Node.js/Express

You can see a live demo of the website [here](https://itunes.sidd.dev).

## File structure

The app is split out into two folders:

- `client` (Frontend)
- `server` (Backend)

## Installation

To install the dependencies the app, run these commands in two separate terminal windows from the root:
(If you do not have yarn installed you can substitude `yarn` for `npm`)

**Client**

```bash
cd client/
yarn install
yarn start
```

Client app should now be running on localhost:3000

**Server**

```bash
cd server/
yarn install
yarn start
```

Client app should now be running on localhost:8080

**Todo**

- [ ] Handle no results

- [ ] Mobile styling

- [ ] Split apart SCSS

- [ ] Refactor results and likes component

- [ ] Page and UI animations
