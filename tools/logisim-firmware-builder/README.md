Для использования данной утилиты необходимо:
1. Перейти в директорию tools/logisim-firmware-buildre
2. Прописать команду
```sh
npm install -g .
```
3. Запустить следующим образом
```sh
cfbu  --docs docs\rom-firmware --output ./build --source-circuit .\logisim-model\PC_with_ROM_CU.circ --open-in-logisim
```

> В случае отображения ошибок необходимо добавить дополнительные параметры 
> указывающие нахождение java и logisim-eveolution. 
> ```sh
> cfbu ...  --path-to-java '{path}' --path-to-logisim '{path}' 
> ```