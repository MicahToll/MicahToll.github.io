function a_function() {
    let some_text = "hey look a string! maybe i'll puts some numbers in here, like a date. or maybe a time. monday, April 21, 2025 is a date. and 1:56 PM - 2:56 PM PDT is a time.";
    let re_date = new RegExp("day, [A-Za-z]* (3[01]|[12][0-9]|0?[1-9]), ([0-9]{2})?[0-9]{2}")
    let re_time = new RegExp("[0-9]*:[0-9]* [AP]M - [0-9]*:[0-9]* [AP]M PDT")
    let n_date = some_text.search(re_date);
    let n_time = some_text.search(re_time);
    console.log(n_date);
    console.log(n_time);
}