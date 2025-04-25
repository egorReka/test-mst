// Импортируем необходимые библиотеки
// sharp - для работы с изображениями
import sharp from 'sharp';
// globSync - для поиска файлов по маске
import { globSync } from 'glob';
// cliProgress - для отображения прогресса в консоли
import cliProgress from 'cli-progress';

// Ищем все файлы с расширениями png, jpg и jpeg в папке source и её подпапках
const files = globSync('source/**/*.{png,jpg,jpeg}');

// Создаём индикатор прогресса в консоли
const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

// Запускаем индикатор прогресса, указывая общее количество файлов
bar1.start(files.length, 0);

// Создаём массив промисов для асинхронной конвертации каждого файла
const work = files.map(async (file) => {
  // Получаем имя файла без расширения
  const [fileName] = file.split('.');
  // Формируем новое имя файла с расширением webp
  const webpFileName = `${fileName}.webp`;

  // Конвертируем файл в формат webp
  // sharp(file) - открываем исходный файл
  // .webp() - конвертируем в webp
  // .toFile() - сохраняем результат
  await sharp(file)
    .webp()
    .toFile(webpFileName);

  // TODO: добавить уменьшение размера для изображений @2x
  // Увеличиваем прогресс на 1
  bar1.increment();
});

// Ждём завершения конвертации всех файлов
// После завершения останавливаем индикатор прогресса
Promise.all(work).then(() => {
  bar1.stop();
});
