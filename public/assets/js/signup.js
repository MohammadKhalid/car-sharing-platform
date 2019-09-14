function proceedToMap() {
    var name = $("#name").val();
    var phone = $("#phone").val();
    var password = $("#password").val();
    var repassword = $("#repassword").val();
    var email = $("#email").val();

    if (
        name != "" && name != null && typeof name !== "undefined" &&
        phone != "" && phone != null && typeof phone !== "undefined" &&
        password != "" && password != null && typeof password !== "undefined" &&
        repassword != "" && repassword != null && typeof repassword !== "undefined" &&
        email != "" && email != null && typeof email !== "undefined") {
        if (password == repassword) {
            $("#addressContainer").toggle();
            $("#addressMapContainer").toggle();
            $("#nameContainer").toggle();
            $("#phoneContainer").toggle();
            $("#passwordContainer").toggle();
            $("#repasswordContainer").toggle();
            $("#emailContainer").toggle();
            $("#proceedContainer").toggle();
            $("#signupButtonContainer").toggle();

            user.name = name;
            user.phone = phone;
            user.email = email;
            user.password = password;

            initMap();
        }
        else {
            alert("Password does not match");
        }
    }
    else{
        alert("Please fill all the fields");
    }
}

function signup() {
    var address = $("#address").val();
    user.address = address;
    $.post('/api/user', user).then(
        function (res) {
            location.href = '/success-signup.html';
        },
        function (err) {
            alert("There was an error in signing up");
        }
    )
}

var user = {
    name: "name",
    phone: "phone",
    email: "email",
    password: "password",
    address: "address",
}