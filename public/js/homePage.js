const hamburger = document.querySelector(".hamburger");
const mobile_nav_section = document.querySelector(".mobile-nav-section");

hamburger.addEventListener("click" , () => {
    console.log("hamburger clicked!!");
    mobile_nav_section.classList.toggle("show");
})

async function addExpense(){
    try {
        let category = document.getElementById("category");
        let description = document.getElementById("description");
        let amount = document.getElementById("amount");

        let category_value = category.value.trim();
        let description_value = description.value.trim();
        let amount_value = amount.value.trim();

        const currentDate = new Date();
        const day = currentDate.getDate();
        const month = currentDate.getMonth();
        const year = currentDate.getFullYear();

        const formattedDay = day < 10 ? `0${day}` : day;
        const formattedMonth = month < 10 ? `0${month}` : month;

        const formatted_date = `${formattedDay}/${formattedMonth}/${year}`;

        console.log(category_value , description_value , amount_value , formatted_date);

        await axios.post("http://localhost:3000/expense/addExpense" , {
            date : formatted_date,
            category : category_value,
            description : description_value,
            amount : amount_value
        }).then((res) => {
            if(res.status == 200){
                window.location.reload();
            }else{
                console.log("There are some error while adding new expense.");
            }
        }).catch((err) => {
            console.error(err);
        })

        category.value = "";
        description.value = "";
        amount.value = "";
        
    } catch (error) {
        console.error(error);
    }
}

const expense_form = document.getElementById("expense-form");

expense_form.addEventListener("submit" , (event) => {
    event.preventDefault();
    addExpense();
});


const buyPremiumBtn = document.getElementById("buyPremiumBtn");
const reportsLink = document.getElementById("reportsLink");
const leaderboardLink = document.getElementById("leaderboardLink");

async function buyPremium(e) {
    const token = localStorage.getItem("token");
    const res = await axios.get(
      "http://localhost:3000/purchase/premiumMembership",
      { headers: { Authorization: token } }
    );
    console.log(res);
    var options = {
      key: res.data.key_id, // Enter the Key ID generated from the Dashboard
      order_id: res.data.order.id, // For one time payment
      // This handler function will handle the success payment
      handler: async function (response) {
        const res = await axios.post(
          "http://localhost:3000/purchase/updateTransactionStatus",
          {
            order_id: options.order_id,
            payment_id: response.razorpay_payment_id,
          },
          { headers: { Authorization: token } }
        );
  
        console.log(res);
        alert(
          "Welcome to our Premium Membership, You have now Excess to Reports and LeaderBoard"
        );
        localStorage.setItem("token", res.data.token);
      },
    };
    const rzp1 = new Razorpay(options);
    rzp1.open();
    e.preventDefault();
  }
  
  async function isPremiumUser() {
    const token = localStorage.getItem("token");
    const res = await axios.get("http://localhost:3000/user/isPremiumUser", {
      headers: { Authorization: token },
    });
    if (res.data.isPremiumUser) {
      buyPremiumBtn.innerHTML = "Premium Member &#128081";
      reportsLink.removeAttribute("onclick");
      leaderboardLink.removeAttribute("onclick");
    }
  }
  
  buyPremiumBtn.addEventListener("click", buyPremium);
  addExpenseBtn.addEventListener("click", addExpense);
  document.addEventListener("DOMContentLoaded", isPremiumUser, getAllExpenses);
