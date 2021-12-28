/* En esta queremos sacar mediante los clientes cual es maxima unidad */
db.ventas.aggregate([
    
    { $group: {
             _id: "$cliente",
             maximaunidad: {$max:"$unidades"},
            numeroGrupo:{$sum:1} }}
        ]
            )
/* En esta queremos sacar la media de los precios por cada vendedor */ 
db.ventas.aggregate([
    
    { $group: {
             _id: "$empleado_vendedor",
             medioprecio: {$avg:"$precio_articulo"},
            numeroGrupo:{$sum:1} }
         }
    ])
    /* En esta consulta queremos saber la rentabilidad de los productos de nuestra tienda 
    y saber cual de ellos podemos sacar más dinero */
db.ventas.aggregate([

    {$group: {

            _id: "$articulo",
           rentabilidad:  {$sum:
            {$subtract: [ "$precio_articulo", "$precio_coste" ] }}
    }}
])
/* En esta, queremos calcular cuanto dinero podemos sacar sabiendo la cantidad que hay de cada artiuclo y multiplicarlo
por su precio de venta y saber cuanto nos llevamos si vendemos todas sus unidades */ 
db.ventas.aggregate([

    {$group: {

            _id: "$articulo",
           totalprecio:  {$sum:
            {$multiply: [ "$precio_articulo", "$unidades" ] }}
    }}
])
db.ventas.aggregate([

    {$group: {

            _id: "$articulo",
           totalprecio:  {$sum:
            {$divide: [ "$precio_articulo", "$unidades" ] }}
    }}
])
db.tienda.aggregate([
    
    { $group: {
             _id: "$articulo",
             mediacantidad: {$lte: [new Date (2021-07-01), new Date (2021-12-31)]}}
            
         }
    ])


