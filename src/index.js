const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//sdk mercado pago

const mercadopago = require("mercadopago");

//middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))


// Agrega credenciales
mercadopago.configure({
    access_token: "APP_USR-8195117506199050-091200-31ab1cbab56cf46c34b02d6b8f89cdf4-1190151765",
  });
  

//routes

app.post('/checkout', function(req, res) {


 

    let preference = {
        items: [
          {
            title: "Mi producto",
            unit_price: 100,
            quantity: 1,
          },
        ],
      };
      
      mercadopago.preferences
        .create(preference)
        .then(function (response) {
          // En esta instancia deberás asignar el valor dentro de response.body.id por el ID de preferencia solicitado en el siguiente paso
   
          res.redirect(response.body.init_point); 
          //window.location.replace(response.body.init_point);
        })
        .catch(function (error) {
          console.log(error);
        });
})



//server

app.listen(3000,() =>{
    console.log('server on port 3000');
});