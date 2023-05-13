// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getFirestore, setDoc, addDoc, doc, updateDoc,deleteDoc, getDoc, query, collection, where, getDocs, onSnapshot  } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
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
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
console.log(app);


submitData.addEventListener('click', (e) => {
    var name = document.getElementById('name').value;
    var age = document.getElementById('age').value;
    
    const docRef = addDoc(collection(db, "users"), {
        name: name,
        age: age
    });

    alert('User added');
    });

    // Get all the data
    getAllData.addEventListener('click', (e) => {
       
        getDocs(collection(db, "users")).then(docSnap => {
            let tableBody = document.getElementById('table-body');
            tableBody.innerHTML = '';
    
            let ages = [];
            let labels = [];
    
            docSnap.forEach((doc)=> {
                let data = doc.data();
                let row = `<tr>
                  <td>${data.name}</td>
                  <td>${data.age}</td>
                  <td><button onclick="editUser('${doc.id}')">Edit</button>
                  <button onclick="deleteUser('${doc.id}')">Delete</button></td>
               </tr>`;
                tableBody.insertAdjacentHTML('beforeend', row);
    
                ages.push(data.age);
                labels.push(data.name);
            });
    
            let chartData = {
                labels: labels,
                datasets: [{
                    label: 'Age',
                    data: ages,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }]
            };
    
            let chartOptions = {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            };
    
            let ageChart = new Chart(document.getElementById('age-chart'), {
                type: 'bar',
                data: chartData,
                options: chartOptions
            });
        });
    });
    

    
 
  
  
  
  
  
  
  