// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDoc, getDocs, collection, getFirestore, doc, query, where } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCaI2X2VPvYQIvgH5GuH72AStmgMffmkVM",
    authDomain: "vanlife-6c818.firebaseapp.com",
    projectId: "vanlife-6c818",
    storageBucket: "vanlife-6c818.appspot.com",
    messagingSenderId: "790290293583",
    appId: "1:790290293583:web:b9f86e84bf982fc60fdb3a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

const vansCollectionRef = collection(db, "vans")

export async function getVans() {
    const snapshot = await getDocs(vansCollectionRef)

    const vans = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))

    return vans
}

export async function getVan(id) {
    const docRef = doc(db, "vans", id)
    const snapshot = await getDoc(docRef)

    return {
        ...snapshot.data(),
        id: snapshot.id
    }
}

// export async function getVans(id) {
//     const url = id ? `/api/vans/${id}` : "/api/vans"
//     const res = await fetch(url)
//     if (!res.ok) {
//         throw {
//             message: "Failed to fetch vans",
//             statusText: res.statusText,
//             status: res.status
//         }
//     }
//     const data = await res.json()
//     return data.vans
// }

export async function getHostVans() {
    const q = query(vansCollectionRef, where("hostId", "==", "789"))
    const snapshot = await getDocs(q)

    const vans = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))

    return vans
}

// export async function getHostVans(id) {
//     const url = id ? `/api/host/vans/${id}` : "/api/host/vans"
//     const res = await fetch(url)
//     if (!res.ok) {
//         throw {
//             message: "Failed to fetch vans",
//             statusText: res.statusText,
//             status: res.status
//         }
//     }
//     const data = await res.json()
//     return data.vans
// }

export async function loginUser(creds) {
    const res = await fetch("/api/login",
        { method: "post", body: JSON.stringify(creds) }
    )
    const data = await res.json()

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }

    return data
}