# dogMonitorDesktop

## To run in debug mode execute:

npm run start

## To generate installer execute (.EXE in dogMonitorDesktop\dist\win-unpacked):

npm run build-intaller

## Cambios

- Merged con la rama más reciente
- Arreglado la responsividad de la grafica al redimensionar la ventana
- Añadido funcionalidad de paneo de la grafica
- Eliminar las etiquetas repetidas del lado izquierdo
- Arreglar los rangos de tiempo al momento de reiniciarlos
- Al momento de filtrar los datos se reinicia el zoom
- Cambiado el estilo del chart
- Ocultado el menu de la aplicacion
- Pasar los label de milisegundos a segundos de la forma `mm:ss.SSS`
- Pulir y optimizar el movimiento de la grafica
- arreglar el funcionamiento del rango de tiempo

## To do

- arreglar el freezeo cuando sale un alert

## A futuro

- Posibilidad de añadir marcas de tiempo ![Marcas de tiempo](https://help.apple.com/assets/624CD263C8F66A56E56A8D17/624CD265C8F66A56E56A8D26/es_ES/dfb13758aab7e195b3acc0db8d9094d6.png)
