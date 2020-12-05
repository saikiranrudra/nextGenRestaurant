import _ from "lodash";
import QRcode from "qrcode";
import fileDownload from 'js-file-download';
import uniqid from "uniqid";

export const getTableNo = (tables, tableId) => {
    for(let i = 0; i < tables.length; i++) {
        if(tables[i]._id === tableId) {
            return tables[i].tableNo;
        }
    }
    return "None"
}

export const getFormatedDate = (dateStr) => {
    let date = new Date(dateStr);
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
}

export const timeFormat = (dateStr) => {
    let date = new Date(dateStr);
    return `${date.getHours()}:${date.getMinutes()}`
}

export const totalCostOforders = (orders) => {
    let total = 0;
    orders.forEach(order => {
        total += order.totalPrice;
    })
    return total;
}

export const getItemsFromOrders = (orders) => {
    let items = [];

    items = orders.map(order => order.items);
    items = _.flatten(items);

    return items;
}

export const countOrdersBaseOnState = (orders=[], states=[]) => {
    let count = 0;
    orders.forEach(order => {
        if(states.includes(order.state)) {
            count++;
        }
    })
    return count;
}

export const formatDate = (date) => {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

export const loadScript = (src) => {
    return new Promise((resolve) => {

      const script = document.createElement("script");
      
      script.src = src;
      
     
      script.onload = () => {
        resolve(true);
      }
     
      script.onerror = () => {
        resolve(false)
      }
      document.body.appendChild(script);
    })     
}

const blobToFile = (theBlob, fileName) => {
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    theBlob.lastModifiedDate = new Date();
    theBlob.name = fileName;
    return theBlob;
}

const dataURItoBlob = (dataURI) => {
    let byteStr;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteStr = atob(dataURI.split(',')[1]);
    else
        byteStr = unescape(dataURI.split(',')[1]);

    let mimeStr = dataURI.split(',')[0].split(':')[1].split(';')[0];

    let arr= new Uint8Array(byteStr.length);
    for (let i = 0; i < byteStr.length; i++) {
        arr[i] = byteStr.charCodeAt(i);
    }

    return new Blob([arr], {type:mimeStr});
}

// export const printQR = (text) => {
//     QRcode.toDataURL(text, { errorCorrectionLevel: 'H', version: 5 }, (err, dataURL) => {
//         if(err) {
//             console.log("============== QR ERROR ===============")
//             console.log(err);
//             return alert("error while generating QR")
//         }

//         const blob = dataURItoBlob(dataURL);
//         const qrFile = blobToFile(blob, uniqid());
//         fileDownload(qrFile, `${qrFile.name}.${qrFile.type.split("/")[1]}`);
//     })
// }

export const printQR = (text, filename) => {
    QRcode.toDataURL(text, { errorCorrectionLevel: 'H', version: 5 }, (err, dataURL) => {
        if(err) {
            console.log("============== QR ERROR ===============")
            console.log(err);
            return alert("error while generating QR")
        }

        const blob = dataURItoBlob(dataURL);
        const qrFile = blobToFile(blob, uniqid());
        fileDownload(qrFile, `${filename}.${qrFile.type.split("/")[1]}`);
    })
}