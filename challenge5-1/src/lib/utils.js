module.exports = {
  age(timestamp) {
    const today = new Date();
    const birthDate = new Date(timestamp);

    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    const day = today.getDate() - birthDate.getDate();

    if (month < 0 || (month == 0 && day < 0) || day == 0) {
      age = age - 1;
    }

    return age;
  },
  date(timestamp) {
    const date = new Date(timestamp)

    const year = date.getUTCFullYear()
    const month = `0${date.getUTCMonth() + 1}`.slice(-2)
    const day = `0${date.getUTCDate()}`.slice(-2)

    return {
      day,
      month,
      year,
      iso: `${year}-${month}-${day}`,
      birthDay: `${day}/${month}`
    }
  },
  graduation(graduate) { 
    if (graduate == 'medio'){
      return "Ensino Médio Completo"
    }
    else if (graduate == 'superior'){
      return "Ensino Superior Completo"
    }
    else if (graduate == 'mestrado'){
      return "Mestrado"
    }
    else {
      return "Doutorado"
    }
  },  
  fixSchool(year) {
    if(year == '1EM'){
      return year = '1&deg; ano Ensino Médio'
    }
    else if (year == '2EM'){
      return year = '2&deg; ano Ensino Médio'
    }
    else if (year == '3EM'){
      return year = '3&deg; ano Ensino Médio'
    }
    else if (year == '5EF'){
      return year = '5&deg; ano Ensino Fundamental'
    }
    else if (year == '6EF'){
      return year = '6&deg; ano Ensino Fundamental'
    }
    else if (year == '7EF'){
      return year = '7&deg; ano Ensino Fundamental'
    }
    else if (year == '8EF'){
      return year = '8&deg; ano Ensino Fundamental'
    }
    else if (year == '9EF'){
      return year = '9&deg; ano Ensino Fundamental'
    }
  }
};
