В примере содеджаться 4 файла и дирректории rom-build и logisim-build

Создание фалов для запуска в моделе, которая находится в logism'e используется
следущая команда:
```sh
jmasm --source '.\jumps-example.jmasm' --output './logisim-build/jumps-example'
```

Для создания bin файла, который можно использовать для прошивки ROM
```sh
jmasm --source '.\jumps-example.jmasm' --output './rom-build/jumps-example.bin' --format BIN_FILE
```

> Содержимое созданных файлов соответствует общей спецификации.