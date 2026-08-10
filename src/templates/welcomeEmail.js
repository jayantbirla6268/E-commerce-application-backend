const welcomeEmail = (name) => {

return `

<!DOCTYPE html>

<html>

<body style="font-family:Arial;background:#f5f5f5;padding:20px">

<div style="
background:white;
padding:30px;
border-radius:10px;
max-width:600px;
margin:auto;
">

<h1 style="color:#16a34a">
Welcome to Jayant Store 🎉
</h1>


<p>
Hello ${name},
</p>


<p>
Your account has been created successfully.
</p>


<p>
Thank you for joining us.
</p>


<h3>
Happy Shopping 🛒
</h3>


</div>

</body>

</html>

`;

};


module.exports = welcomeEmail;