# QuickBite 🍔🍕

QuickBite is a feature-rich React Native food ordering application designed to provide a seamless and visually appealing experience for browsing, ordering, and managing food deliveries (specifically Pizzas and Burgers).

## 🧠 Local AI Intelligence

QuickBite distinguishes itself with a rigorous, entirely on-device Artificial Intelligence engine (`src/utils/AIEngine.js`) that runs flawlessly without relying on external API calls, ensuring maximum privacy and zero latency.

*   **Semantic NLP Search (TF-IDF):** Advanced text search that calculates Term Frequency scores to match natural language queries against item descriptions and ingredients.
*   **Recommendation Engine (Jaccard Similarity):** A Content-Based Filtering algorithm that calculates the mathematical overlap of ingredients from your Favorites list to suggest highly personalized items.
*   **Dynamic Prep-Time Predictor:** A Multiple Linear Regression simulation that predicts order ETAs based on cart complexity, item weights, and sizes.
*   **Smart Cart "Apriori" Cross-Selling:** Analyzes current cart data to heuristically boost and suggest statistically complimentary items (Frequently Bought Together).
*   **Computer Vision Scanner Mock:** A beautiful, animated UI simulating an on-device TFLite object detection pipeline for scanning food items via camera.

## 🚀 Features

*   **User Authentication Flow:** Secure sign-in and sign-up powered by Firebase Auth.
*   **Onboarding Experience:** Engaging onboarding screens for new users.
*   **Dynamic Menu:** Browse through categories (Pizzas, Burgers) with real-time filtering and search functionality.
*   **Cart Management:** Add, remove, and update quantities of items in the cart with instant price calculation.
*   **Favorites System:** Save your favorite meals for quick access later.
*   **Order History:** View past orders and payment details.
*   **Payment Processing UI:** Dedicated payment screen for checkout.
*   **State Management:** Robust and efficient global state management using Zustand.
*   **Beautiful UI/UX:** Responsive design with smooth animations (Lottie), gradient backgrounds, and custom icons.

## 🛠️ Tech Stack

*   **Framework:** [React Native](https://reactnative.dev/)
*   **Navigation:** [React Navigation](https://reactnavigation.org/) (Stack & Bottom Tabs)
*   **State Management:** [Zustand](https://github.com/pmndrs/zustand)
*   **Backend & DB:** [Firebase](https://firebase.google.com/) (Authentication & Firestore)
*   **UI Components & Styling:** 
    *   React Native Paper
    *   React Native Linear Gradient
    *   React Native Vector Icons
    *   FontAwesome
*   **Animations:** [Lottie React Native](https://github.com/lottie-react-native/lottie-react-native)

## 📦 Installation & Setup

Follow these steps to run the project locally.

### Prerequisites
*   Node.js (>= 18)
*   npm or Yarn
*   React Native CLI setup for Android and/or iOS

### 1. Clone the repository

```bash
git clone https://github.com/araneeskhan/QuickBite.git
cd QuickBite
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. iOS Setup (macOS only)

```bash
cd ios
pod install
cd ..
```

### 4. Setup Firebase

*   Create a new project on [Firebase Console](https://console.firebase.google.com/).
*   Add an Android app and an iOS app to the Firebase project.
*   Download `google-services.json` and place it in the `android/app/` directory.
*   Download `GoogleService-Info.plist` and place it in the `ios/` directory using Xcode.
*   Enable Authentication (Email/Password) and Firestore Database in your Firebase project.

### 5. Run the Application

**Start Metro Bundler:**
```bash
npm start
# or
yarn start
```

**Run on Android:**
```bash
npm run android
# or
yarn android
```

**Run on iOS:**
```bash
npm run ios
# or
yarn ios
```

## 📂 Project Structure

```
src/
├── assets/         # Images, fonts, etc.
├── components/     # Reusable UI components (Cards, Headers, etc.)
├── data/           # Mock data or data models
├── lottie/         # Animation JSON files
├── navigators/     # Stack and Tab navigators
├── screens/        # Main application screens (Home, Cart, Details, etc.)
├── store/          # Zustand store for global state management
└── theme/          # Global styles, colors, and fonts
```

## 📄 License

This project is licensed under the MIT License.
