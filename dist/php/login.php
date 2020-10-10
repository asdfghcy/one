<?php
    header("Content-type:text/html;charset=utf-8");

    // var_dump($_POST);
    //模拟官方的返回，生成对应的内容
    $responseData = array("code" => 0, "msg" => "");

    // var_dump($_POST);
    //将数据取出
    $username = $_POST['username'];
    $password = $_POST['password'];

    //初步的判断
  if(!$username){
    $responseData['code'] = 1;
    $responseData['msg'] = "用户名不能为空";
    echo json_encode($responseData);
    exit;
  }

  if(!$password){
    $responseData['code'] = 2;
    $responseData['msg'] = "密码不能为空";
    echo json_encode($responseData);//数据结构转字符串
    exit;
  }
  //验证数据库是否有同名的用户
  //1、链接数据库
  $link = mysql_connect("127.0.0.1", "root", "123456");
  //2、判断数据库是否链接成功
  if(!$link){
    $responseData['code'] = 4;
    $responseData['msg'] = "服务器忙";
    echo json_encode($responseData);
    exit;
  }

  //3、设置访问字符集
  mysql_set_charset("utf8");

  //4、选择数据库
  mysql_select_db("qd2004");   
  //   5 判断是否登录成功  密码与加密密码一样
  $password = md5(md5(md5($password)."qianfeng")."qingdao");
  //6拼接sql语句 判读
  $sql = "SELECT * FROM users WHERE username='{$username}' AND password='{$password}'";

  //   echo $sql;//验证是否正确
  //   发送sql语句
  $res = mysql_query($sql);
  $row = mysql_fetch_assoc($res);

//   var_dump($row);
  if($row){
      $responseData['msg'] = "登陆成功";
      echo json_encode($responseData);
  }else{
    $responseData['code'] = 5;
    $responseData['msg'] = "用户名或密码错误";
    echo json_encode($responseData);
    exit;
  }
  mysql_close($link);

?>