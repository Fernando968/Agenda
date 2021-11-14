const firebaseConfig = {
    apiKey: "AIzaSyAX5A2Z0jCenJdcszaYl_l7MmHuDyeTWFQ",
    authDomain: "ra-prueba-ecfa4.firebaseapp.com",
    projectId: "ra-prueba-ecfa4",
    storageBucket: "ra-prueba-ecfa4.appspot.com",
    messagingSenderId: "281703637945",
    appId: "1:281703637945:web:50c88f5c6483deb17f8c68"
  };

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

let nombre = document.getElementById("name");
let cel = document.getElementById("celphone");
let save_btn = document.getElementById("save-btn");
let lista = document.getElementById("lista")

save_btn.addEventListener("click", ()=>{
  let data = {
    nombre:nombre.value,
    celular:cel.value
  };
  save_data_firebase(data);
});

const save_data_firebase = (d)=>{
  db.collection("contactos").add(d)
  .then((docRef) => {
    console.log("Document written with ID: ", docRef.id);
    get_data_firebase();
  })
  .catch((error) => {
    console.error("Error adding document: ", error);
  });
};

let contactos_arr = []

const get_data_firebase = ()=>{
  contactos_arr = [];
  db.collection("contactos")
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
    console.log(doc.data());
    contactos_arr.push(doc.data())
    });
    buildList();
  });
}

const buildList= ()=>{
  lista.innerHTML = "";
  contactos_arr.forEach(e=>{
    lista.insertAdjacentHTML('beforeend',`
    <li class="line">${e.nombre}  -  ${e.celular}</li>
    `)
  })
}

get_data_firebase();