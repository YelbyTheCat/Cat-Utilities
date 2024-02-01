# Hello, welcome to Cat Utilities!

This is a web app that is currently under development. The current purpose of this app is to store jobs that have been applied for, storing simple information. Also for knowing how much money a person has and has spent.

### Uses
Database: Google Sheets\
UI/UX: React w/ Bootstrap\
Backend: Node.Js / Express / Javascript
NPM

## Setup

### Google Api
1. Go to [Google Cloud](https://console.cloud.google.com/projectselector2/apis/dashboard?supportedpurview=project) and create a project\
![image](https://github.com/YelbyTheCat/Cat-Utilities/assets/41715570/6e189889-58ab-48f5-8f2d-3491c398f032)\
![image](https://github.com/YelbyTheCat/Cat-Utilities/assets/41715570/863c966b-b050-4e65-823d-5436bf104980)
2. Now enable the `Sheets` Api\
![image](https://github.com/YelbyTheCat/Cat-Utilities/assets/41715570/ff5bbfe2-e049-40f1-9b24-48089e79118d)\
![image](https://github.com/YelbyTheCat/Cat-Utilities/assets/41715570/a87549ab-6c3b-4a8f-9e41-0d50be511c58)\
![image](https://github.com/YelbyTheCat/Cat-Utilities/assets/41715570/b68101df-bf35-421f-a7b5-4bc3427ccfc3)
3. Create Credentials\
![image](https://github.com/YelbyTheCat/Cat-Utilities/assets/41715570/8c9864df-ec74-4bb7-98e9-9dab02583378)\
   a. Hit `Next` and give it a name, then hit `Create and Continue` then hit `Done`
4. Go to `Credentials` Tab and click on the `Service Account` you just made\
![image](https://github.com/YelbyTheCat/Cat-Utilities/assets/41715570/1dcd4cb3-ce4f-4637-b09e-0e03219a5cf8)
5. Go to `Keys` and `Add Key -> Create New Key`\
![image](https://github.com/YelbyTheCat/Cat-Utilities/assets/41715570/6e352bd4-6906-4273-90c2-e64f29a3db65)\
6. Select `JSON` and hit `Create` it should automatically download a `.json` file which we will rename to `secret.json`
7. Go to `Details` and grab the `email` it generates

### Goole Sheets
1. Create a Google sheet\
![image](https://github.com/YelbyTheCat/Cat-Utilities/assets/41715570/0b65aade-6433-48cf-9c19-b0f46a2fdeb3)
2. Name it to something useful
3. Click on `Share` in the top right\
![image](https://github.com/YelbyTheCat/Cat-Utilities/assets/41715570/0ef4ddd6-4e93-4281-bf37-0e6bfeb3653a)
4. Paste the `email` we got in the last step of the previous section into the box that says `Add People, groups, and calendar events` and make sure its set as an Editor then hit `Share`
5. Rename `sheet1` at the bottom to `jobs`
6. Add these headers into `row 1`
```
id	companyName	position	dateApplied	rangeMax	rangeMin	location	heardBack	heardBackDate	heardBackResponse	inProgress	denied	deniedResponse	companySummary	tasks	requirements	benefits	jobUrl
```
7. Extract the `sheet id` from the URL its the string of numbers/letters/symbols between `spreadsheets/d/` and `/edit#` this will be needed later.

### Git / Edits
1. Find a destination on your computer and pull the repository to it, such as `git clone https://github.com/YelbyTheCat/Cat-Utilities.git` and wait for it to download
2. Using the same `terminal/command prompt` do `cd Cat-Utilities` or similar to travel into the folder
3. Assuming `npm` is installed, run `npm i` to install everything
4. Locate the `.example.env` file and remove the `.example`
5. Where it says `BS_THEME` I prefer dark, so it can say `BS_THEME=dark` but if you prefer light mode you can change it to `light` instead of `dark`
6. Where it says `PORT` you can choose the port, I've preferred `3000` so it'll look like `PORT=3000`
7. Put your sheet id from the previous section where it says `SHEET_ID` so it looks like `SHEET_ID=Random_Numbers_And_Letters`
8. Where it says `GOOGLE_APPLICATION_CREDENTIALS` append to the end `./secret.json` or whatever the local path is to your `secret.json`
9. Put the `secret.json` file from two sections ago into the root folder (aka same folder package.json is in)
10. Now everything should be done run it by doing `npm run start` then go to [localhost:3000](http://localhost:3000/)

https://console.cloud.google.com/apis/api/sheets.googleapis.com/metrics?project=apitest-350820
