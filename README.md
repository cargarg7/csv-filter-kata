# CSV Filter

## Reglas
- Es válido que algunos campos estén vacíos, apareciendo dos comas seguidas o una coma final.
- El número de factura no puede estar repetido, si lo estuviese eliminaremos todas las líneas con repetición.
- Los impuestos IVA e IGIC son excluyentes, es decir, sólo puede aplicarse uno de los dos. Si alguna línea tiene contenido en ambos campos debe quedarse fuera.
- Los campos CIF y NIF son excluyentes, sólo se puede usar uno de ellos.
- El neto es el resultado de aplicar al bruto el correspondiente impuesto. Si algún neto no está bien calculado la línea se queda fuera.

## Ejemplo datos (CSV)
Num _factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente
1,02/05/2019,1008,810,19,,ACERLaptop,B76430134,
2,03/08/2019,2000,2000,,8,MacBook Pro,,78544372A
3,03/12/2019,1000,2000,19,8, LenovoLaptop,,78544372A

## Posibles test / casos de uso
- Un fichero con una sola factura donde todo es correcto, debería producir como salida la misma línea
- Un fichero con una sola factura donde IVA e IGIC están rellenos, debería eliminar la línea
- Un fichero con una sola factura donde el neto está mal calculado, debería ser eliminada
- Un fichero con una sola factura donde CIF y NIF están rellenos, debería eliminar la línea
- Si el número de factura se repite en varias líneas, se eliminan todas ellas (sin dejar ninguna línea).
- Una lista vacía producirá una lista vacía de salida
- Un fichero de una sola línea es incorrecto porque no tiene cabecera
