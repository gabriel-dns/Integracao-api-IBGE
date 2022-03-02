const axios = require('axios');


async function getData() {
    try {
     const response = await axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados/');
     manipulateData(response.data)

    } catch (error) {
      console.error(error);
    }
  }
    
    function manipulateData(data){
        let regLength = [];
        let size = [];

        for(var i=1; i < data.length; i++){
            regLength[i] = data.filter(function(datas) {
                return datas.regiao.id == i;
              });
        }
        regLength.splice(0,1);
        for(var i=0; regLength[i].length != 0; i++){
              size[i]  = regLength[i].length;
        }

         csvWritter(size)
    }

function csvWritter(data){
    const createCsvWriter = require('csv-writer').createObjectCsvWriter;
    const csvWriter = createCsvWriter({
        path: 'csv/estados.csv',
        header: [
            {id: 'regiao', title: 'Regiao'},
            {id: 'qtd', title: 'Qtd. Estados'}
        ]
    });
    const records = [
        {regiao: 'Norte',  qtd: data[0]},
        {regiao: 'Sul', qtd: data[3]},
        {regiao: 'Nordeste', qtd: data[1]},
        {regiao: 'Sudeste', qtd: data[2]},
        {regiao: 'Centro-Oeste', qtd: data[4]}
    ];
    csvWriter.writeRecords(records)       // returns a promise
        .then(() => {
            console.log('Done');
        });
    
}


getData()




