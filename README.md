# Dock Sales Demo

## Overview

The Dock Sales Demo showcases the integration of KYC, biometric services, and verifiable credentials to demonstrate the capabilities of Dock's API and wallet. It simulates a customer journey through KYC verification, credential issuance, and verification across various scenarios, emphasizing integration ease and user experience.

### Workflow Steps

1. 🚀 User initiates the KYC process.
2. 🔒 Biometric verification is conducted by scanning a QR code.
3. ✅ Upon successful verification, the user is issued verifiable credentials.
4. 🔍 The user presents the credentials for verification.

*Note: The Dock wallet app, with the biometric service plugin enabled, is required.*

## Technologies Used 

- Next.js 12.2.3
- Dock API for decentralized identity and credential management.
- Integration with biometric verification services on the mobile app.

##  📚 Libraries and Dependencies

Our project, "dock-demo," incorporates a variety of technologies for optimal performance, state management, and UI aesthetics:

- **Next.js:** The core framework provides server-side rendering and static site generation.
- **React:** Enables building our UI with a component-based approach.
- **Tailwind CSS:** Allows for efficient styling within JSX, promoting rapid UI development.
- **Axios:** Facilitates promise-based HTTP requests for external API communication.
- **React Hook Form:** Optimizes form handling with minimal re-renders.
- **Lucide-react:** Enhances UI design with customizable vector icons.
- **Zustand:** Simplifies global state management with a minimalistic store.
- **Date-fns:** Offers comprehensive JavaScript date manipulation tools.
- **Radix UI & TanStack React Table:** Provides low-level UI primitives and a lightweight table component for creating accessible, custom designs.
- **PostCSS & Autoprefixer:** Transforms CSS with JS for future-proofing and cross-browser compatibility.
- **ESLint:** Maintains code quality and consistency.
- **Shadcn-ui/ui:** A UI component library from [shadcn-ui/ui on GitHub](https://github.com/shadcn-ui/ui), enhancing our application with a set of pre-designed, customizable UI components for a consistent and modern interface.

Each library and dependency has been carefully selected for its performance, reliability, and the support it offers to our development process.

## 📁 Folder Structure

- `/pages/api` - Server side API integration and communication with Dock.
- `/pages/org` - Organization pages for testing functionality.
- `/components/ui` - Interface components from ShadCn library.
- `/_credentials` - Credential Schemas used for issuing credentials.
- `/hooks` - Handle QR generation and verification and revoke credentials. 
- `/store` - State management for user information and Qr code Status.
- `/utils` - Utility functions for API and server side communication for credentials and qr code.

Note: Most of the functions are documented inside of each file.

## Main Functions & Methods

### State management 

The Qr code state is handle by `/store/qrCodeStore.js` folder, using the Zustand library, for updating the proof template Id and verification state.
Qr code track this states: 

    proofTemplateId -> Dock Cert Verification template id

    qrCodeUrl -> Generated url from generateQR() function

    proofID -> Unique Id for each Qr code generated

    isLoading -> Boolean for loading code generation 

    verified -> Is verified by user, default to false

    verificationError -> Boolean state for error handling

    retrievedData -> Credential data retrieved when is verified

Each value also contain setter function.

### Main Functions

Under folder `/utils` are the files that handle all the communication with Dock API service.

`createRegistry(policyDid, type)` -> Creates Registry for a new credential.

`createCredential(registryId, credential)` -> Create new credential from registryId & credential schema.

`distributeCredential(credential)` -> Send a signed credential to a Did or email.        

`issueRevokableCredential = async (credential, setRevokableCredential)` -> Entire process that carrie all previews functions.
revokeCredential = async (registryId, credentialId) -> Revoke credit score credential with a given registry and credential ids.
    

### Methods

There is 3 important methods under `/hooks` folder wich make the application workflow:

`useQrCode = ({ proofTemplateId })` -> 
The useQrCode hook orchestrates the generation of QR codes associated with proof requests. It leverages state management through qrCodeStore, handling loading states, verification flags, and potential errors. Upon calling handleGenerateQR, it sets up the necessary parameters, initiates QR code creation via handleCreateQr, and updates relevant states accordingly.

`useVerifyProof = ()` -> 
This React hook, useVerifyProof, facilitates verifying proof requests tied to a QR code. It utilizes intervals to periodically check the verification status. Upon successful verification, it updates relevant states, such as user DID, verification status, and retrieved data. In case of errors, it handles retries and sets a verification error flag.

### Main Component

`QrCodeAuthentication`

Hooks methods are use in single component `components/qrcode/qr-auth.jsx` with two responsabilities, generate and verify a Qr code using the previews hooks `useQrCode` & `useVerifyProof`.

The `QrCodeAuthentication` component manages QR code authentication flow. It renders UI elements conditionally based on whether the QR code is verified or not. If not verified, it displays QR code verification UI provided by VerifyQrCode component along with optional descriptive texts before and after. Upon verification, it shows a refresh icon to allow users to retry the authentication process. Additionally, it lists required credentials using CredentialCards component.

## 🎮 Running the Project

### 📓Prerequisites

- Node.js and npm installed.
- Dock account with API access.

### 🔑 Configuration

To configure the project, set up environment variables. Copy the `.env.example` file to a new file named `.env` and fill in the variables:

- `NEXT_PUBLIC_DOCK_API_URL`: URL to the Dock API, set to the testnet endpoint.
- `DOCK_API_TOKEN`: Your API token for authenticating with the Dock API.
- `DOCK_API_DID`: The DID to use for the issuer. You can generate a DID [here](https://certs.dock.io/dids).
- `NEXT_PUBLIC_SERVER_URL`: The URL of your server, defaulting to `http://localhost:3000` for local development.

### Proof-Request Template IDs and Organization Profiles

Create these IDs from [Certs Dock](https://certs.dock.io/). Fill in the template IDs and issuer IDs for your proof requests and organization profiles. These are crucial for the functioning of your verifiable credentials within the demo.

Ensure all these configurations are set properly in your `.env` file before running the project to ensure smooth operation and connectivity to the necessary services.

### 🛠️ Installation and Deployment

1. Clone the repo: `git clone <repo_url>`
2. Install dependencies: `npm install` or `yarn`
3. Start the project: `npm start` or `yarn dev`

## 🧪 Testing the Project Workflow

Before starting, remember to get the Dock Wallet mobile app, with the biometric service plugin enabled, is required. The Dock Wallet app is available on PlayStore or AppStore.

The demo workflow consists of going through the KYC process filling the formularies and scanning each QR code to get authenticated and test the organizations ecosystems.

It's based on 3 ecosystems:

**Quotient:** Get BankId and Credit Score credentials and Apply for an auto loan.

**Equinet:** Revoke Credit Score credential and issue a new one.

**Urbanscape:** Apply for an apartment providing your BankId and Credit Score credentials.

**1. Create a Bank account:** On the main page organizations click on “New Bank Account” from Quotient.

Fill the formulary required data and click on “Submit Application”. This will take you to the first QR code we need to scan with the Dock Wallet app using the option “Scan”. This QR code will trigger the biometric verification process on the mobile to get the Biometric credential.

Once QR code verification is successful, you will receive 2 credentials in your Dock Wallet, “Credit Score credential” and “BankId credential”.

**2. Obtain Auto Loan:** On the main page click on “Obtain Auto Loan” from Quotient.

Identify yourself scanning the QR code using your Dock Wallet app and select the required credentials: Biometric, BankId, and Credit Score.

On verification success will automatically fill the fields “First Name, Last Name, Street Address”, from your BankId credential details, then click on “Submit Application” to continue.

On the success page, you will find a second QR code to scan with the Dock Wallet to proof your Credit Score from your credential.

**3. Revoke & Reissue Credit Score:** On the main page click on “Visit Site” from Equinet. This page is the representation of a Credit Score credential history. You can revoke the actual Credit Score credential and issue another with one action. Click on “Revoke and Issue New credential” to test the functionality. Note: you need to complete previous steps to own this credential and revoke it.

**4. Apply for an apartment:** On the main page click on “Visit Site” from Urbanscape. Identify yourself scanning the QR code using your Dock Wallet app and select the required credentials: Biometric, BankId, and Credit Score. 

On verification success will automatically fill the fields “First Name, Last Name, Street Address”, from your BankId credential details, then click on “Submit Application” to continue.

On the success page, you will find a second QR code to scan and proof your Credit Score from your credential.

With this, we finish the workflow from the application where we can have an overview of some usage of the decentralized identity and credentials management.

## Resources

- [Dock](https://www.dock.io/)
- [Dock API Documentation](https://docs.api.dock.io/)
- [Next.js](https://nextjs.org/)
