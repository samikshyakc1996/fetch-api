document.addEventListener("DOMContentLoaded", function () {
  const calcBMR = document.getElementById("calcBMR");
  const resultBMR = document.getElementById("resultBMR");
  const resultBMI = document.getElementById("resultBMI");
  calcBMR.addEventListener(`submit`, function (e) {
    e.preventDefault();
    let age = document.getElementById("age");
    let genders = document.querySelectorAll(`input[name="gender"]`);
    let selectedSize = "";
    for (const item of genders) {
      if (item.checked) {
        selectedGender = item.value;

        break;
      }
    }
    let height = document.getElementById("height");
    let weight = document.getElementById("weight");
    height = Number(height.value);
    weight = Number(weight.value);
    age = age.value;
    gender = gender.value;

    //console.log(height + weight);

    fetch(
      `https://bmr-and-tmr.p.rapidapi.com/calculate-bmr?weight=${weight}&height=${height}&age=${age}&sex=${selectedGender}&inImperial=false`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "bmr-and-tmr.p.rapidapi.com",
          "x-rapidapi-key":
            "87cd0412d2msh09018f4c8886585p19026cjsn805829dfedc5",
        },
      }
    )
      .then((response) => response.json())
      .then((res) => {
        let bmr = Math.floor(res.bmr);
        resultBMR.innerHTML = `Your BMR is: ${bmr}`;
      })
      .catch((err) => {
        console.error(err);
      });

    fetch(
      `https://body-mass-index-bmi-calculator.p.rapidapi.com/metric?weight=${weight}&height=${
        height / 100
      }`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "body-mass-index-bmi-calculator.p.rapidapi.com",
          "x-rapidapi-key":
            "87cd0412d2msh09018f4c8886585p19026cjsn805829dfedc5",
        },
      }
    )
      .then((response) => response.json())

      .then((response) => {
        let bmi = Math.floor(response.bmi);
        resultBMI.innerHTML = `Your BMI is: ${bmi}.<br/> `;
        let linkToBMI = document.createElement("p");
        linkToBMI.style.fontSize = "1.5rem";
        linkToBMI.style.color = "#0c233f";

        linkToBMI.innerHTML = ` Not sure what BMI number means? 
            Check this out:<a href="https://www.thebodypro.com/article/bmi-chart" target=_blank>Learn more about BMI</a>`;
        document.body.appendChild(linkToBMI);
      })
      .catch((err) => {
        console.error(err);
      });
  });
});
