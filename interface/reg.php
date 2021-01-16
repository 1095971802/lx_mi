<?php

    include('./library/conn.php');
    $unername = $_REQUEST['username'];
    $password = $_REQUEST['username'];
    $email = $_REQUEST['email'];
    $phone = $_REQUEST['phone'];

    $sql = "select * from userlist where username='$username'";

    $resuslt = $mysqli->query($sql);
    if($resuslt->num_rows>0){
        echo '<script>alert("用户名已存在");</script>';
        echo '<script>location.href="../src/html/zhuce.html"</script>';
        
        $mysqli ->close();
        die();
    }


    $insertSql = "insert into users (username,password,email,phone,) values ('$username','$password','$email','$phone',)";

    $res = $mysqli->query($insertSql);  
    $mysqli->close();

    if($res){
        echo '<script>alert("注册成功");</script>';
        echo '<script>location.href="../src/html/denglu.html"</script>';
    }
?>