# Pieces of code

## Google Sheet:

1. Set header to lowercase and set '-' to spaces

```js
let headers = sheet.getRange(1, 1, 1, NUMBER_COLUMN).getValues()[0];
let newHeaders = headers.map((string) => {
    const stringEnMinusculas = string.toLowerCase();
    const stringConGuiones = stringEnMinusculas.replace(/\s+/g, "-");
    return stringConGuiones;
});
```

2. validatio of date YYYY-MM-DD `dateFormatYearMonthDay='2023-06-17'`

```js
  // Validation of the correct date
  let formatoFecha = /^\d{4}-\d{1,2}-\d{1,2}$/;  
  if (formatoFecha.test(dateFormatYearMonthDay) === false) {
    console.log('formato de fecha no es valido! salir de proceso');
    return result;
  }
```
