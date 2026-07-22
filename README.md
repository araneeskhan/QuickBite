# QuickBite 🍔🍕

**QuickBite** is a modern, feature-rich React Native mobile food ordering application built for browsing, customizing, ordering, and real-time tracking of meals (Pizzas & Burgers). It features an entirely on-device, zero-latency **AI Engine** for search, recommendations, order ETA predictions, and smart cross-selling.

---

## 🧠 On-Device AI Intelligence (`src/utils/AIEngine.js`)

QuickBite runs a client-side Artificial Intelligence engine that operates completely locally on the device without requiring external API calls, guaranteeing zero latency and complete user privacy.

* **🔍 Semantic Search (TF-IDF):** Natural language processing that calculates Term Frequency scores to match queries against titles, descriptions, and ingredients with dynamic relevance boosting.
* **💡 Content-Based Recommendation Engine (Jaccard Similarity):** Mathematical set-intersection algorithm analyzing ingredient profiles of user favorites to recommend personalized items. Includes cold-start fallback to top-rated items.
* **⏱️ Dynamic Prep-Time Predictor (Multiple Linear Regression Simulation):** Calculates order ETAs in real-time based on cart item quantity, item category complexity (e.g., Pizza vs. Burger multipliers), and base prep durations.
* **🛒 Smart Cart "Apriori" Cross-Selling:** Analyzes cart items to detect meal gaps and dynamically suggest high-converting, statistically complementary items (e.g., suggesting a top-rated Burger when ordering a Pizza).
* **📷 Computer Vision Scanner UI:** Animated TFLite object-detection pipeline simulation (`ScanScreen.js`) for scanning physical food items via camera.

---

## ✨ Key Features

### 👤 Authentication & Onboarding
* **Onboarding Flow:** Interactive onboarding slides introducing core features to new users.
* **Firebase Authentication:** Secure Sign-In and Sign-Up flows using Firebase Auth.

### 🍽️ Food Discovery & Ordering
* **Category Filtering & Search:** Real-time semantic search and category filtering (Pizzas, Burgers).
* **Interactive Meal Customization:** Customization options for item sizes, quantity adjustments, and special instructions.
* **Restaurant Details & Reviews:** View restaurant details, ratings, user reviews, and submit custom ratings.

### 🛒 Cart & Checkout
* **Dynamic Cart Management:** Add/remove items, adjust quantities, view item price breakdown, and real-time prep time prediction.
* **Payment Processing:** Support for multiple payment methods (Credit Card, Apple Pay, Google Pay, Cash on Delivery).
* **Checkout Flow:** Address selection, order breakdown, voucher codes, and seamless order placement.

### 📦 Order Tracking & History
* **Real-Time Order Tracking:** Visual timeline of order progress (Order Received, Preparing, Out for Delivery, Delivered).
* **Order History:** Detailed log of previous orders, itemized receipts, and quick re-ordering.

### ⚙️ State Management & UI/UX
* **Zustand Store (`src/store/Store.js`):** Lightweight, centralized state management with immer & storage persistence.
* **Polished UI/UX:** Smooth animations with `lottie-react-native`, linear gradients, glassmorphism UI elements, Skeleton loaders, Toast notifications, and FontAwesome vectors.

---

## 📱 Application Screens

| Screen | Description |
| :--- | :--- |
| `OnBoarding.js` | Intro slides highlighting app features for first-time users |
| `SignIn.js` / `SignUp.js` | User authentication forms integrated with Firebase Auth |
| `HomeScreen.js` | Main dashboard displaying categories, featured meals, and AI recommendations |
| `SearchScreen.js` | TF-IDF powered semantic search screen |
| `DetailsScreen.js` | Detailed item page with size picker, ingredients list, and cart addition |
| `RestaurantDetailsScreen.js` | Restaurant profile, opening hours, ratings, and customer reviews |
| `CartScreen.js` | Cart overview, Apriori cross-sell recommendations, and prep-time estimation |
| `CheckoutScreen.js` | Address selection, discount applied, order summary |
| `PaymentScreen.js` | Secure checkout with multiple payment gateway options |
| `OrderTrackingScreen.js` | Live timeline tracking of ongoing delivery orders |
| `OrderHistoryScreen.js` | Past orders listing with re-order capabilities |
| `FavoriteScreen.js` | Saved items list used by the Jaccard similarity AI engine |
| `ProfileScreen.js` | User account settings, saved addresses, and profile details |
| `ScanScreen.js` | Animated camera scanner interface for food recognition |

---

## 🛠️ Tech Stack

* **Framework:** [React Native](https://reactnative.dev/) (v0.73.0)
* **Language:** JavaScript / React (v18.2.0)
* **Navigation:** [React Navigation](https://reactnavigation.org/) (Stack Navigator & Bottom Tabs)
* **State Management:** [Zustand](https://github.com/pmndrs/zustand) (v4.4.7) with [Immer](https://github.com/immerjs/immer)
* **Backend & Database:** [Firebase](https://firebase.google.com/) (Auth & Cloud Firestore v18.7.3)
* **UI Components & Styling:**
  * React Native Paper
  * React Native Linear Gradient
  * React Native Vector Icons & FontAwesome
  * React Native Reanimated & Gesture Handler
* **Animations:** [Lottie React Native](https://github.com/lottie-react-native/lottie-react-native)
* **Async Storage:** `@react-native-async-storage/async-storage`

---

## 📂 Project Structure

```
QuickBite/
├── android/                 # Native Android project configuration
├── ios/                     # Native iOS project configuration
├── FireStore/               # Firestore configuration & database helpers
└── src/
    ├── assets/              # Static assets (Images, Icons)
    ├── components/          # Reusable UI Components
    │   ├── ActionSheet.js   # Action modal component
    │   ├── AddressCard.js   # User address display card
    │   ├── CategoryCard.js  # Category selector card
    │   ├── FoodCard.js      # Individual food item card
    │   ├── OrderTimeline.js # Real-time delivery progress timeline
    │   ├── PriceBreakdown.js# Item cost breakdown
    │   ├── QuantitySelector.js# Add/subtract item count
    │   ├── SkeletonLoader.js# Loading placeholder UI
    │   └── Toast.js         # Custom notification toasts
    ├── data/                # Mock data & initial datasets
    ├── lottie/              # Lottie JSON animation files
    ├── navigation/          # Navigation stack & tab definitions
    ├── screens/             # App screen components (Home, Cart, Details, etc.)
    ├── store/               # Zustand global store (`Store.js`)
    ├── theme/               # Application theme (Colors, Fonts, Spacing)
    └── utils/               # AI Engine (`AIEngine.js`) & utilities
```

---

## 📦 Installation & Setup

### Prerequisites
* **Node.js**: `>= 18.x`
* **npm** or **yarn**
* **React Native CLI** environment set up for Android and/or iOS development.

### 1. Clone Repository
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

### 4. Firebase Configuration
1. Create a project in the [Firebase Console](https://console.firebase.google.com/).
2. Add an Android app (`google-services.json` placed under `android/app/`).
3. Add an iOS app (`GoogleService-Info.plist` placed under `ios/`).
4. Enable **Authentication** (Email/Password) and **Cloud Firestore Database**.

---

## 🚀 Running the App

### Start Metro Bundler
```bash
npm start
# or
yarn start
```

### Run on Android
```bash
npm run android
# or
yarn android
```

### Run on iOS
```bash
npm run ios
# or
yarn ios
```

---

## 🧪 Testing & Code Quality

```bash
# Run ESLint check
npm run lint

# Run Jest tests
npm test
```

---

## 📄 License

This project is licensed under the **MIT License**.
