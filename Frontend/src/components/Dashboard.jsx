import { useEffect } from "react";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";

import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
export const Dashboard = ({ setIslogin }) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const d = new Date().toISOString().split("T")[0];
  // const [dates,setdates]=useState("");
  const [check, setcheck] = useState(true);
  const [Type, setType] = useState("");
  const [income, setincome] = useState(0);
  const [expense, setexpense] = useState(0);
  const [balance, setbalance] = useState(0);

  
// const [search, setsearch] = useState("");
// const [dat, setdat] = useState("");
  // const todayd =
  //   String(d.getDate()).padStart(2, "0") + "/" +
  //   String(d.getMonth() + 1).padStart(2, "0") + "/" +
  //   d.getFullYear();

  const categories = [
    "🍔 Food & Dining",
    "🛒 Groceries",
    "🚕 Transport",
    "⛽ Fuel",
    "🏠 Rent",
    "💡 Utilities",
    "📶 Internet & Mobile",
    "🛍️ Shopping",
    "🎮 Entertainment",
    "✈️ Travel",
    "🏥 Health & Medical",
    "📚 Education",
    "💳 EMI / Loan",
    "🛡️ Insurance",
    "🎧 Subscriptions",
    "💇 Personal Care",
    "🎁 Gifts & Donations",
    "🏢 Business Expense",
    "🔧 Maintenance",
    "🧾 Taxes",
    "📦 Miscellaneous",
  ];
const [date, setDate] = useState(null);
  const [list, setlist] = useState([]);
  const [tracker, settracker] = useState({
    date: "",
    category: "",
    note: "",
    amount: "",
    type: "",
  });

  const exphandler = (e) => {
    settracker({ ...tracker, [e.target.name]: e.target.value });
  };

  const addexpenseh = async (e) => {
    e.preventDefault();
    const newExpense = {
      ...tracker,
      date: d,
      type: Type,
    };

    setlist((prev) => [...prev, newExpense]);

    const response = await fetch(`${API_URL}/api/expense`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newExpense),
    });

    const data = await response.json();
    // console.log(data.message, data.expense);
    settracker({
      date: "",
      category: "",
      note: "",
      amount: "",
      type: "",
    });
    setcheck(true);
    setType("");
    getexp();           //change-------------------
  };

  const logouthandler = async () => {
    const response = await fetch(`${API_URL}/api/users/islogout`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(),
    });

    const data = await response.json();
    console.log("aacha= ", data.message);
    if (data.message === "logout successfully") {
      setIslogin(false);
      navigate("/");

      // window.location.reload();
    }
  };

  const getexp = async () => {
    const response = await fetch(`${API_URL}/api/expense`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(),
    });

    const data = await response.json();
    // console.log(data.message, data.expense);
    // const data = await response.json();
    // console.log(data.message, data.expense ,data.incomet ,data.expenset);
    setlist(data.expenses);

    setincome(data.incomet);
    setexpense(data.expenset);
    const bal = data.incomet - data.expenset;
    console.log("BAL:", bal);
    setbalance(bal);

//     console.log("income:", income);
// console.log("expense:", expense);
// console.log("balance:", balance);
  };

  const delexp = async (id) => {
    console.log(id);
    if (!id) return;
    setlist((prev) => prev.filter((it) => it._id !== id));

    const response = await fetch(`${API_URL}/api/expense/${id}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(),
    });

    const data = await response.json();
    // console.log(data.message, data.expense);
     getexp();           //change-------------------
  };




  
  const filterhandlerNots = async (e) => {

    // console.log("before filter msg date= ",typeof(val) ,val);
    // if (val === "") {
    //   getexp(); // saare expenses fetch karo
    //   return;
    // }
    const search=e.target.value;
   

    const response = await fetch(
      `${API_URL}/api/expense/search?search=${search}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify(),
      },
    );

    const data = await response.json();
   
    setlist(data.expenses);
  };



  
  
  const filterhandlerDats = async (e) => {

    // console.log("before filter msg date= ",typeof(val) ,val);
    // if (val === "") {
    //   getexp(); // saare expenses fetch karo
    //   return;
    // }
    const datee=e.target.value;
    
   
   console.log("URL = ", `${API_URL}/api/expense/date?datee=${datee}`);
    const response = await fetch(
      `${API_URL}/api/expense/date?datee=${datee}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify(),
      },
    );

    const data = await response.json();
  
    setlist(data.expenses);
  };




  
  
  const filterhandlerCategory = async (e) => {

    // console.log("before filter msg date= ",typeof(val) ,val);
    // if (val === "") {
    //   getexp(); // saare expenses fetch karo
    //   return;
    // }
    const category=e.target.value;
    
 
 
    const response = await fetch(
      `${API_URL}/api/expense/category?category=${category}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify(),
      },
    );

    const data = await response.json();
   
    setlist(data.expenses);
  };




  
useEffect(() => {
   getexp();
}, []);

  useEffect(() => {
  window.flatpickr("#datePicker", {
    dateFormat: "Y-m-d",
    disableMobile: true,
  });
}, []);


  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <div className="sidebar-menu">
          <h3>ExpenseTracker</h3>

          <button onClick={() => navigate("/")}>Dashboard</button>

          <button onClick={() => navigate("/profile")}>Profile</button>
        </div>
        <button className="logout-btn" onClick={logouthandler}>
          Logout
        </button>
      </aside>

      <main className="main-content">
        <h2>Dashboard</h2>
        <p className="main-subtitle">
          Here's what's happening with your money today.
        </p>

        <div className="stats-grid">
          <div className="stat-box expense">
            <h4>Total Expense</h4>
            <h3>{expense}</h3>
          </div>
          <div className="stat-box budget">
            <h4>Income</h4>
            <h3>{income}</h3>
          </div>
          <div className="stat-box remaining">
            <h4>Remaining</h4>
            <h3>{balance}</h3>
          </div>
        </div>

        <div className="form-container">
          <h3>⚡ Quick Add Expense</h3>
          <form className="quick-add-form" onSubmit={addexpenseh}>
            <div className="input-block">
              <label>Expense Note</label>
              <input
                value={tracker.note}
                name="note"
                onChange={(e) => exphandler(e)}
                type="text"
                placeholder="e.g., Pizza"
                required
              />
            </div>

            <div className="input-block width-150">
              <label>Amount (₹)</label>

              {check ? (
                <select
                  value={tracker.type}
                  style={{ cursor: "pointer" }}
                  defaultValue=""
                  onChange={(e) => {
                    setType(e.target.value);
                    setcheck(false);
                  }}
                >
                  <option value="" disabled>
                    Select income Type
                  </option>
                  <option value="expense">Expense</option>
                  <option value="income">Income</option>
                </select>
              ) : (
                <input
                  value={tracker.amount}
                  name="amount"
                  onChange={(e) => exphandler(e)}
                  type="number"
                  placeholder="0"
                  required
                />
              )}
            </div>
            <div className="input-block width-150">
              <label>Category</label>
              <select
                value={tracker.category}
                style={{ cursor: "pointer" }}
                defaultValue=""
                name="category"
                onChange={(e) => exphandler(e)}
              >
                <option value="" disabled>
                  Select Category
                </option>
                {categories.map((c, i) => {
                  return (
                    <>
                      <option key={i}>{c}</option>
                    </>
                  );
                })}
              </select>
            </div>
            <button type="submit" className="add-btn">
              Add
            </button>
          </form>
        </div>

        <div className="filter-bar">
          <h3>Recent Expenses</h3>

          <div className="filter-controls">
            <input
             onChange={(e) =>filterhandlerNots(e)}
              name="nots"
              type="text"
              placeholder="Search expenses..."
              className="search-input"
            />

            {/* <input
               onChange={(e) =>filterhandlerDats(e)}
              name="dats"
              style={{ border: "none", padding: "1vw" }}
              type="date"
                
            />
    */}

<input
  id="datePicker"
  placeholder="DD-MM-YYYY"
  onChange={filterhandlerDats}
/>

            <select
              onChange={(e) => filterhandlerCategory(e)}
              className="filter-dropdown"
              value={tracker.category}
              style={{ cursor: "pointer" }}
              defaultValue=""
              name="category"
              
            >
              <option value="" disabled>
                Select Category
              </option>
              {categories.map((c, i) => {
                return (
                  <>
                    <option key={i}>{c}</option>
                  </>
                );
              })}
            </select>
          </div>
        </div>

        <div className="table-container">
          <table className="expense-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Category</th>
                <th>Note</th>
                <th>Amount</th>
                <th>Delete</th>
              </tr>
            </thead>

            <tbody>
              {list?.map((item, index) => {
                console.log(item);

                return (
                  <tr key={index}>
                    <td>{new Date(item.date).toLocaleDateString("en-GB")}</td>
                    <td>{item.category}</td>
                    <td>{item.note}</td>
                    <td
                      style={{
                        color: item.type === "expense" ? "red" : "green",
                      }}
                      className="neg-amount"
                    >
                      {item.type === "expense" ? "-" : "+"}
                      {item.amount}
                    </td>
                    <td>
                      <FaTimes
                        onClick={() => delexp(item._id)}
                        style={{ color: "red", cursor: "pointer" }}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};
