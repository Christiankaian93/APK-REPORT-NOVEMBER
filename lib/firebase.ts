import { initializeApp, getApps, getApp } from "firebase/app";
import { 
  getFirestore, 
  initializeFirestore, 
  persistentLocalCache, 
  persistentMultipleTabManager, 
  CACHE_SIZE_UNLIMITED,
  memoryLocalCache 
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCo7nhrC71USVhIVQNJkB6GuV77--zqAKc",
  authDomain: "apkreportnov.firebaseapp.com",
  projectId: "apkreportnov",
  storageBucket: "apkreportnov.firebasestorage.app",
  messagingSenderId: "625920361912",
  appId: "1:625920361912:web:1081c2eb085bfe7cc93b4d"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

let firestoreDb: any;

try {
  firestoreDb = getFirestore(app);
} catch {
  // Not initialized yet
}

if (!firestoreDb) {
  try {
    firestoreDb = initializeFirestore(app, {
      localCache: persistentLocalCache({
        tabManager: persistentMultipleTabManager(),
        cacheSizeBytes: CACHE_SIZE_UNLIMITED
      })
    });
  } catch {
    try {
      firestoreDb = getFirestore(app);
    } catch {
      try {
        firestoreDb = initializeFirestore(app, {
          localCache: memoryLocalCache()
        });
      } catch {
        firestoreDb = getFirestore(app);
      }
    }
  }
}

export const db = firestoreDb;
export const auth = getAuth(app);
export { app };