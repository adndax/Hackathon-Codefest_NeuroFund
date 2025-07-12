<h1 align="center">NeuroFund</h1>

<p align="center">
  <img src="app/frontend/public/neurofund_logo.png" alt="NeuroFund"/>
</p>

## Table of Contents
- [Description](#description)
- [Program Structure](#program-structure)
- [How to Start](#how-to-start)
- [Made by NeuroFund Team](#made-by-neurofund-team)

## Description
This website is designed to serve two main types of users: researchers and investors, leveraging Internet Computer Protocol (ICP) for secure login and investment processes.

**For Researchers**
- *Secure Research Upload*, 
Researchers can safely upload their research works (proposals, ongoing projects, or completed publications) to the platform. Uploaded files are securely stored and tamper-proof.
- *ICP Login Authentication*, 
Researchers use their ICP wallet to log in and manage their research entries, ensuring a decentralized and secure identity system.

**For Investors**
- *Funding Research Projects*, 
Investors can browse through listed research projects and choose to fund the ones they are passionate about. Investment transactions are handled using ICP tokens directly on the platform.
- *ICP Wallet Integration*, 
Investors log in using their ICP wallet, enabling secure and verifiable interaction with the platform and researchers.

## Program Structure
```
├── README.md
├── app
│   ├── backend
│   ├── frontend
│   ├── src
│   ├── .env
│   ├── dfx.json
└── doc
```
- **README.md** : Contains general information about the project, main features, installation instructions, and contribution guidelines.
- **app/backend** : Contains the backend logic deployed as Internet Computer canisters, handling features such as ICP login authentication and investment processing.
- **app/frontend** : The user-facing interface built with Next.js, including pages for researcher login, research submission, investment dashboard, and more.
- **app/src** : Contains auto-generated TypeScript and JavaScript bindings that allow the frontend to interact with the backend canister defined by backend.did. These files are essential for calling Internet Computer canister methods from the frontend.
- **app/dfx.json** : Configuration file for the Dfinity project, defining the canisters, build settings, and local/remote network environments.

## How to Start
Before running the program, follow these steps:
1. Clone this repository
    ```bash
    git clone https://github.com/adndax/codefest-neurofund
    ```
2. Navigate to the project directory
    ```bash
    cd codefest-neurofund
    ```
3. Run dfx in the background
    ```bash
    dfx start --clean --background
    dfx deploy
    ```
4. Install dependencies and run Next.js dev server
    ```bash
    cd app/frontend
    npm install
    nom run dev
    ```
5. Open your browser and go to http://localhost:3000 to see the application running.

## Made by ElectroIn Team
- Adinda Putri
- Fajar Asyraf
- Heleni Gratia
- M. Faiz
- Ranashahira Reztaputri
