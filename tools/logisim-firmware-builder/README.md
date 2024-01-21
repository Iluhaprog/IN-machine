Для использования данной утилиты необходимо:
1. Перейти в директорию tools/logisim-firmware-buildre
2. Прописать команду
```npm install -g ,```
3. Запустить следующим образом
```cfbu  --docs docs\rom-firmware --output ./build --source-circuit .\logisim-model\PC_with_ROM_CU.circ --open-in-logisim```

> В случае отображения ошибок необходимо добавить дополнительные параметры 
> указывающие нахождение java и logisim-eveolution. 
> ```cfbu ...  --path-to-java '{path}' --path-to-logisim '{path}' ```