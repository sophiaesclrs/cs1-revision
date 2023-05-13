// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBHy3Gihw8S_mt9_DfJtig77IDzqs5mamA",
//   authDomain: "casestudy1-dc7ed.firebaseapp.com",
//   projectId: "casestudy1-dc7ed",
//   storageBucket: "casestudy1-dc7ed.appspot.com",
//   messagingSenderId: "795551283591",
//   appId: "1:795551283591:web:c8721a89279c5629137b22",
//   measurementId: "G-9QM42NYXW1"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);


import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.19.0/firebase-analytics.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/9.19.0/firebase-auth.js";
import { getFirestore, setDoc, addDoc, doc, updateDoc,deleteDoc, getDoc, query, collection, where, getDocs, onSnapshot  } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

const firebaseConfig = {
apiKey: "AIzaSyBHy3Gihw8S_mt9_DfJtig77IDzqs5mamA",
authDomain: "casestudy1-dc7ed.firebaseapp.com",
projectId: "casestudy1-dc7ed",
storageBucket: "casestudy1-dc7ed.appspot.com",
messagingSenderId: "795551283591",
appId: "1:795551283591:web:c8721a89279c5629137b22",
measurementId: "G-9QM42NYXW1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore();
connectFirestoreEmulator(db, 'localhost', 8080);
console.log(app);
      
  
  //----- Logout code start	  
  document.getElementById("signout").addEventListener("click", function() {
    signOut(auth).then(() => {
      // Sign-out successful.
      console.log('Sign-out successful.');
      alert('Sign-out successful.');
      document.getElementById('signout').style.display = 'none';
      window.location.href = "index.html";

    }).catch((error) => {
      // An error happened.
      console.log('An error happened.');
    });		  		  
  });
  //----- End

  
  // ---------------------------------Add Data -------------------------//
  
  window.AddData = function(){
  const AddBtn = document.querySelector("#addButton")
  AddBtn.addEventListener("click", async () =>{
  try {
    const collectionRef = collection(db, "covid")
    const newUser = await addDoc(collectionRef,{
  
      country: document.getElementById("countryAdd").value,
      who_reg: document.getElementById("regAdd").value,
      cases: document.getElementById("caseAdd").value,
      death: document.getElementById("deathAdd").value,
  
    })
    console.log(`Create new user: ${newUser.id}`)
  } catch (error) {
    console.log(error)
  }
  })
  }
  
  // // Move the event listener outside of the AddData() function
  // document.getElementById("addNewData").addEventListener("submit", async (event) => {
  //   event.preventDefault();
  //   try {
  //     const collectionRef = collection(db, "covid");
  //     const newUser = await addDoc(collectionRef, {
  //       country: document.getElementById("countryAdd").value,
  //       who_reg: document.getElementById("regAdd").value,
  //       cases: document.getElementById("caseAdd").value,
  //       death: document.getElementById("deathAdd").value,
  //     });
  //     console.log(`Create new user: ${newUser.id}`);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // });
  
  // // Remove the click event listener from the AddData() function
  // window.AddData = function() {}
  
  
  
  
  
  //------------------------------------Get Data------------------------------------------//
  var dataNo =0;
  var datasets = [];
  var tbody = document.getElementById('tbody1');
  
  
  function AddItemToTable(country, who_reg, cases, death, id){
    var trow = document.createElement('tr');
    // var td0 = document.createElement('td'); 
    var td1 = document.createElement('td');
    var td2 = document.createElement('td');
    var td3 = document.createElement('td');
    var td4 = document.createElement('td');
    var td5 = document.createElement('td');
  
    // td0.innerHTML = ''; 
    td1.innerHTML = ++dataNo;
    td2.innerHTML = country;
    td3.innerHTML = who_reg;
    td4.innerHTML = cases;
    td5.innerHTML = death;
    datasets.push([country, who_reg, cases, death, id]);
  
    // trow.appendChild(td0); 
    trow.appendChild(td1);
    trow.appendChild(td2);
    trow.appendChild(td3);
    trow.appendChild(td4);
    trow.appendChild(td5);
  
    var ControlDiv = document.createElement('div');
    ControlDiv.innerHTML = '<span class="fa-solid fa-file-pen actions" style="color: #0B6623" data-bs-toggle="modal" data-toggle="tooltip" title="Update" data-bs-target="#staticBackdrop1" onclick="FillTboxes(' + dataNo + ',\'' + id + '\')"></span>';
    
    ControlDiv.innerHTML += '<span class="fa-solid fa-file-circle-xmark actions" style="color:#7C0A02;" data-toggle="modal" data-toggle="tooltip" title="Delete" onclick="DelButt(\'' + id + '\')"></span>';
  
    trow.appendChild(ControlDiv);
    tbody.appendChild(trow);
  
  }
  
  
  function populateTableList(UserDocList){
    dataNo=0;
    tbody.innerHTML="";
    UserDocList.forEach(element => {
      AddItemToTable(element.country, element.who_reg, element.cases, element.death, element.id);
  
    })
  }
  
  
  function GetAllDataRealtime(){
    const q = query(collection(db, "covid"))
    const list = onSnapshot(q, (querySnapshot) => {
       var datasetss = [];
  
      querySnapshot.forEach(doc => {
        const data = doc.data();
        datasetss.push({...data, id: doc.id}); 
        console.log(doc.id)
      })
      populateTableList(datasetss)
    })
  }
  
  window.onload = GetAllDataRealtime;
  
  //------------------------------------Edit Data------------------------------------------//
  
  var edCountry = document.getElementById('countryEd');
  var edReg = document.getElementById('regEd');
  var edCase = document.getElementById('caseEd');
  var edDeath = document.getElementById('deathEd');
  var EditBtn = document.querySelector("#edButton");
  
  window.FillTboxes = function(id, docId) {
    --id;
    edCountry.value = datasets[id][0];
    edReg.value = datasets[id][1];
    edCase.value = datasets[id][2];
    edDeath.value = datasets[id][3];
    EditBtn.dataset.id = docId;
  };
  
  const saveEdit = document.querySelector("#edButton")
  saveEdit.addEventListener("click", async () =>{
    try {
      const docRef = doc(db, "covid", EditBtn.dataset.id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        await setDoc(docRef, {
          country: edCountry.value,
          who_reg: edReg.value,
          cases: edCase.value,
          death: edDeath.value,
  
        });
      }
    } catch (error) {
      console.log(error)
    }
  });
  
  //------------------------------------Delete Data------------------------------------------//
  window.DelButt = async function(id) {
    const docRef = doc(db, "covid", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      await deleteDoc(docRef);
      setData(data.filter((item)=> item.id !==id));
      console.log(doc.id)
    } else {
      console.log("Document does not exist");
    }
  }
  
  
  