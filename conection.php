<?php
$conexion=mysqli_connect("localhost","root","","dulces_express") or die(mysql_error($mysqli));

insertar($conexion);

function insertar($conexion){
    $Nombre = $_POST['Nombre'];
    $Apellido = $_POST['Apellido'];
    $Email = $_POST['Email'];
    $Asunto = $_POST['Asunto'];
    $Detalle = $_POST['Detalle'];
    
$consulta = "INSERT INTO  contacto(Nombre, Apellido, Email, Asunto, Detalle)
VALUES ('$Nombre','$Apellido','$Email','$Asunto','$Detalle')";
mysqli_query($conexion,$consulta);
mysqli_close($conexion);
}
?>
