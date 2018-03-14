import Firebase from 'firebase'

const firebaseApp = Firebase.initializeApp({
  apiKey: "AIzaSyD1FVvjFhWG99Je_baRNSTAlvUawi06Cqc",
  authDomain: "app-adroid-e1f6f.firebaseio.com",
  storageBucket: "app-adroid-e1f6f.firebaseio.com",
  messagingSenderId: "130461315515",
  databaseURL: 'https://app-adroid-e1f6f.firebaseio.com/'
});

// Export the database for components to use.
// If you want to get fancy, use mixins or provide / inject to avoid redundant imports.
export const db = firebaseApp.database();






