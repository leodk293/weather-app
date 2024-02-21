"use strict";

var inputCity = document.querySelector("input");
var icon = document.querySelector("img");
var btn = document.querySelector("button");
var country = document.querySelector(".country");
var CurrentTime = document.querySelector(".data>:nth-child(1)");
var city = document.querySelector("h1");
var temperature = document.querySelector(".temperature");
var skyState = document.querySelector(".skyState");
btn.addEventListener("click", fetchData);

function fetchData() {
  var url, options, response, result, current, location, temperatureCalcul;
  return regeneratorRuntime.async(function fetchData$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          url = "https://weatherapi-com.p.rapidapi.com/current.json?q=".concat(inputCity.value);
          options = {
            method: 'GET',
            headers: {
              'X-RapidAPI-Key': '4685e83adbmshbe621af8b52500bp19db03jsna57eb0a7e344',
              'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
            }
          };
          _context.prev = 2;
          _context.next = 5;
          return regeneratorRuntime.awrap(fetch(url, options));

        case 5:
          response = _context.sent;
          _context.next = 8;
          return regeneratorRuntime.awrap(response.json());

        case 8:
          result = _context.sent;
          console.log(result);
          current = result.current;
          location = result.location;
          country.textContent = "located In : ".concat(location.country);

          if (result) {
            city.textContent = location.name;
            CurrentTime.style.display = "block";

            if (current.condition.text === "Clear") {
              icon.src = "images/sun.svg";
            } else if (current.condition.text === "Sunny") {
              icon.src = "images/sun.svg";
            } else {
              icon.src = "images/sunCloudly.svg";
            }

            temperatureCalcul = (current.temp_f - 32) * 5 / 9;
            temperature.textContent = "Temperature : ".concat(temperatureCalcul.toFixed(2), " \xB0C");
            skyState.textContent = current.condition.text;
          } else {
            CurrentTime.textContent = "City could not be found";
          }

          _context.next = 19;
          break;

        case 16:
          _context.prev = 16;
          _context.t0 = _context["catch"](2);
          console.error(_context.t0);

        case 19:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 16]]);
}

fetchData();