(function($) {
  'use strict';

  /*
  Vamos estruturar um pequeno app utilizando módulos.
  Nosso APP vai ser um cadastro de carros. Vamos fazê-lo por partes.
  A primeira etapa vai ser o cadastro de veículos, de deverá funcionar da
  seguinte forma:
  - No início do arquivo, deverá ter as informações da sua empresa - nome e
  telefone (já vamos ver como isso vai ser feito)
  - Ao abrir a tela, ainda não teremos carros cadastrados. Então deverá ter
  um formulário para cadastro do carro, com os seguintes campos:
    - Imagem do carro (deverá aceitar uma URL)
    - Marca / Modelo
    - Ano
    - Placa
    - Cor
    - e um botão "Cadastrar"

  Logo abaixo do formulário, deverá ter uma tabela que irá mostrar todos os
  carros cadastrados. Ao clicar no botão de cadastrar, o novo carro deverá
  aparecer no final da tabela.

  Agora você precisa dar um nome para o seu app. Imagine que ele seja uma
  empresa que vende carros. Esse nosso app será só um catálogo, por enquanto.
  Dê um nome para a empresa e um telefone fictício, preechendo essas informações
  no arquivo company.json que já está criado.

  Essas informações devem ser adicionadas no HTML via Ajax.

  Parte técnica:
  Separe o nosso módulo de DOM criado nas últimas aulas em
  um arquivo DOM.js.

  E aqui nesse arquivo, faça a lógica para cadastrar os carros, em um módulo
  que será nomeado de "app".
  */

  function app() {
    return {
      init: function init() {
        this.companyInfo();
        this.initEvents();
        this.getCarsRegisterInServer();
      },

      carInfo: function carInfo() {
        var myCar = {
          image: $('[data-js="img"]').get().value,
          brandModel: $('[data-js="brand-model"]').get().value,
          year: $('[data-js="year"]').get().value,
          plate: $('[data-js="plate"]').get().value,
          color: $('[data-js="color"]').get().value
        };
        return myCar;
      },

      registerNewCarInServer: function registerNewCarInServer() {
        var car = app().carInfo();
        var newCar = new XMLHttpRequest();
        newCar.open('POST', 'http://localhost:3000/car');
        newCar.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        newCar.send('image='+car.image+'&brandModel='+car.brandModel+'&year='+car.year+'&plate='+car.plate+'&color='+car.color);

        newCar.addEventListener('readystatechange', function() {
          if (newCar.readyState === 4) {
            console.log('Cadastro realizado com sucesso!');
            app().clearFieldsAndSetFocus();
            window.location.reload();
          }
        });
      },

      getCarsRegisterInServer: function getCarsRegisterInServer() {
        var getCars = new XMLHttpRequest();
        getCars.open('GET', 'http://localhost:3000/car');
        getCars.send();

        getCars.addEventListener('readystatechange', this.putDataInTable, false);
      },

      putDataInTable: function putDataInTable() {
        if (this.readyState === 4) {
          var cars = JSON.parse(this.responseText);
          var $tableCar = $('[data-js="table-car"]').get();
          var $fragment = document.createDocumentFragment();

          cars.forEach(function(car) {
            var $tr = document.createElement('tr');
            var $tdImage = document.createElement('td');
            var $imageURL = document.createElement('img');
            var $tdBrand = document.createElement('td');
            var $tdYear = document.createElement('td');
            var $tdPlate = document.createElement('td');
            var $tdColor = document.createElement('td');
            var $tdRemove = document.createElement('td');
            var $removeButton = document.createElement('img');

            $removeButton.setAttribute('data-id', 'removeButton');
            $removeButton.setAttribute('src', 'images/remove.png');
            $tdRemove.appendChild($removeButton);

            $imageURL.setAttribute('src', car.image);
            $tdBrand.textContent = car.brandModel;
            $tdYear.textContent = car.year;
            $tdPlate.textContent = car.plate;
            $tdColor.textContent = car.color;

            $tdImage.appendChild($imageURL);
            $tr.appendChild($tdImage);
            $tr.appendChild($tdBrand);
            $tr.appendChild($tdYear);
            $tr.appendChild($tdPlate);
            $tr.appendChild($tdColor);
            $tr.appendChild($tdRemove);

            $fragment.appendChild($tr);

            $tdRemove.addEventListener('click', app().removeCarRegister, false);
          })
          return $tableCar.appendChild($fragment);
        }
      },

      removeCarRegister: function removeCarRegister() {
        this.parentNode.remove();
      },

      companyInfo: function companyInfo() {
        var info = new XMLHttpRequest();
        info.open('GET', 'company.json', true);
        info.send();

        info.addEventListener('readystatechange', this.getCompanyInfo, false);
      },

      getCompanyInfo: function getCompanyInfo() {
        if ( !app().isReady.call(this) )
          return;

        var data = JSON.parse(this.responseText);
        var $companyName = $('[data-js="company-name"]').get();
        var $companyPhone = $('[data-js="company-phone"]').get();

        $companyName.textContent = data.name;
        $companyPhone.textContent = data.phone;
      },

      isReady: function isReady() {
        return this.readyState === 4 && this.status === 200;
      },

      initEvents: function initEvents() {
        $('[data-js="form"]').on('submit', this.handleSubmit);
      },

      handleSubmit: function handleSubmit(e) {
        e.preventDefault();
        app().registerNewCarInServer();
      },

      clearFieldsAndSetFocus: function clearFieldsAndSetFocus() {
        $('[data-js="img"]').get().value = '';
        $('[data-js="brand-model"]').get().value = '';
        $('[data-js="year"]').get().value = '';
        $('[data-js="plate"]').get().value = '';
        $('[data-js="color"]').get().value = '';

        $('[data-js="img"]').get().focus();
      },
    }
  }

  app().init();
})(window.DOM);
