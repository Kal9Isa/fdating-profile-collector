# Test project

## Topic

Retrieve profile data from [fdating](https://fdating.com/) and save them in a directory with
each profile as a directory named after `profileId` consisting of an `info.json` and images of
user.

Requirements:

1. Get search filters from user

2. User must be able to limit rate of requests

3. User must be able to continue search after interrupting a previous one without changing search filters

## Solution

To meet problem's 2nd requirements, we have utilized [BullMQ](https://docs.bullmq.io/guide/introduction) to distribute work among the workers that can scale horizontally while being able to limit the rate of request for all or each worker individually.

3rd requirement can easily be addressed by saving the page we're at when the process stops and checking if filters have changed at each startup, so if the case was using previous filters, we can pick up where we left off.

- One consideration is to either save profile links in batch or individually. Obviously, saving links only and `profileId` as key is a better solution while using redis, since it will prevent duplicated keys from entering the key space, thus skipping over existing profiles and only saving new ones.

## Setup

1.  Clone the project, navigate into directories _master_ and _worker_ and run

        `$ npm i `

- Make sure you have the [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) and [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslintlink) and [Draw.io](https://marketplace.visualstudio.com/items?itemName=hediet.vscode-drawio) extensions installed if on _VSCode_.

- Also enable code link feature while on draw.io intergration

2.  Open the `app.config.ts` file to modify connection to `Redis` and rate limiting features.

3.  Install `ts-node` using

        `$ npm i -g ts-node`

## Want results?

1.  Make sure your `Redis` instance is running, head to _master_ dir and run

        `$ npm start -g < gender 0 | 1 > -s <startAge 18 - 99 > -e <endAge 18 - 99 > -p <photo true | false >`

- If no args given, default values of _0_, _18_, _99_, _true_ are chosen

2.  Head to _worker_ dir and run

        `$ npm start`

Then folders must be created in a _data_ folder inside _worker_ directory

## Performance

TBT

## View the logical flow diagram

Using [Draw.io](https://marketplace.visualstudio.com/items?itemName=hediet.vscode-drawio) extension, navigate to _diagrams_ directory and click on the `.drawio` file to see the diagram in _VSCode_.

## Known Bugs

See [this list](https://github.com/Kal9Isa/fdating-profile-collector/issues).

## Todo

- Fix bugs
- Add `dockerfiles` and automate deployment with `skaffold`
- Write tests if have enough time
