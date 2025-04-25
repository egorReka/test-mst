// Импорт плагина для оптимизации изображений (сжатие и конвертация)
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
// Импорт плагина для создания SVG-спрайтов
import VitePluginSvgSpritemap from '@spiriit/vite-plugin-svg-spritemap';
// Импорт плагина для минификации HTML
// import { ViteMinifyPlugin } from 'vite-plugin-minify';

/** @type {import('vite').UserConfig} */
export default {
  plugins: [
    // Настройка создания SVG-спрайта из иконок в папке sprite
    VitePluginSvgSpritemap('source/img/sprite/*.svg', {
      styles: false, // Не создавать CSS файл для спрайта
      injectSVGOnDev: true, // Внедрять спрайт в HTML при разработке
    }),
    // Настройки для HTML минификации
    // ViteMinifyPlugin({}),

    // Настройка оптимизации изображений
    ViteImageOptimizer({
      test: /\.(jpe?g|png|svg)$/i, // Обрабатывать файлы с этими расширениями
      includePublic: false, // Не обрабатывать файлы из public директории
      logStats: true, // Выводить статистику оптимизации
      ansiColors: true, // Использовать цветной вывод в консоли

      // Настройки оптимизации SVG
      svg: {
        multipass: true, // Многопроходная оптимизация
        plugins: [
          {
            name: 'preset-default',
            params: {
              overrides: {
                cleanupNumericValues: false, // Не округлять числовые значения
                convertPathData: {
                  floatPrecision: 2, // Точность округления для путей
                  forceAbsolutePath: false, // Не преобразовывать в абсолютные пути
                  utilizeAbsolute: false, // Не использовать абсолютные пути
                },
                removeViewBox: false, // Сохранять viewBox атрибут
                cleanupIds: false, // Не очищать ID атрибуты
              },
            },
          },
          'removeDimensions', // Удалять width/height атрибуты
        ],
      },

      // Настройки оптимизации PNG
      png: {
        // https://sharp.pixelplumbing.com/api-output#png
        quality: 80, // Качество сжатия (0-100)
        palette: true // Использовать палитру цветов
      },

      // Настройки оптимизации JPEG
      jpeg: {
        // https://sharp.pixelplumbing.com/api-output#jpeg
        quality: 80,
        progressive: true
      },

      // Настройки оптимизации JPG
      jpg: {
        // https://sharp.pixelplumbing.com/api-output#jpeg
        quality: 80,
        progressive: true
      },

      // Настройки кэширования
      cache: true, // Включить кэширование
      cacheLocation: './.cache', // Путь к папке кэша
    }),
  ],

  // Настройки CSS
  css: {
    devSourcemap: true, // Генерировать source maps для CSS
    preprocessorOptions: {
      scss: {
        outputStyle: 'expanded',
        sourceMapContents: true,
        sourceMap: true,
        logger: {
          warn: function(message) {
            // eslint-disable-next-line no-console
            console.warn(message);
          },
          error: function(error) {
            // eslint-disable-next-line no-console
            console.error(error);
          }
        },
        quietDeps: true
      }
    }
  },

  // Основные настройки проекта
  publicDir: 'public', // Директория для статических файлов
  root: './source', // Корневая директория проекта
  build: {
    outDir: '../dist', // Папка для собранного проекта
  },
  base: './', // Базовый путь для всех ресурсов
  server: {
    port: 3000,
    watch: {
      usePolling: true,
      interval: 100,
    }
  }
};
