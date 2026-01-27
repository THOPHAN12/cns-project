# CNS Ecommerce Website

## Description
The project is sponsored by Phuong Mai of University of Economics Ho Chi Minh City (UEH). Developed by Mr. Toan Nguyen of Ho Chi Minh University of Technology (HCMUT)

## How to run this project
### Prerequisite
Here are the framework you need to install before running this project locally:
- Git: install git [here](https://git-scm.com/install/). Choose the operating system you are using, then download the installer
- Nodejs: install Nodejs [here](https://nodejs.org/en/download/current). Choose the operating system you are using, then download the installer

Feel free to ask Mr. Toan if you have any problem during installing (Zalo: 0764161116)

### Setup environment
1. Clone this project to your repo

**Windows 11 systems:**
- Create a new folder anywhere in file explorer:
- Open this folder, right-click at the space in this explorer, then choose "Run as terminal"
- Copy this command to the terminal just opened:
```
git clone https://github.com/minhtoan-nmt/cns-project.git
```

**Other systems:**
- Create a new folder anywhere in your computer
- Use your terminal and access that folder.

``` 
cd <your-directory>
```
For example, if your newly created folder's address is `D:\cns\project_src`, then paste the following one by one:
```
D:
cd D:\cns\project_src
```
- Copy this command to the terminal just opened:
```
git clone https://github.com/minhtoan-nmt/cns-project.git
```

You will see the files there. **Please keep the terminal open for the next steps**

2. Install the dependency
- Paste the following to the terminal to access the /frontend folder.
```
cd .\frontend\
```
(You can type `cd fr` then press Tab for auto-completion.
- Paste the following to install dependency **(IMPORTANT)**
```
npm i
```
3. Run the frontend project
- Run this command on your terminal.
```
npm run dev
```
Then Ctrl+Click on the link _localhost:<port>_ appear on the terminal.
From now on, whenever you want to run the project, just access to frontend, open the terminal and run `npm run dev`
