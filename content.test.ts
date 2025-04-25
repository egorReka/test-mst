import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

// Путь к HTML файлу, который будем тестировать
const HTML_FILE_PATH = path.join('source', 'index.html');

// Основной набор тестов для проверки содержимого сайта
describe('Content Tests', () => {
  // Читаем содержимое HTML файла для тестирования
  const html = fs.readFileSync(HTML_FILE_PATH, 'utf-8');

  // Проверяем наличие обязательных мета-тегов
  // - кодировка utf-8
  // - настройки viewport для адаптивности
  it('should have valid meta tags', () => {
    expect(html).toMatch(/<meta\s+charset="utf-8"\s*>/i);
    expect(html).toMatch(/<meta\s+name="viewport"\s+content="width=device-width,\s*initial-scale=1"\s*>/i);
  });

  // Проверяем наличие главной навигации
  // Важно: класс должен быть main-nav
  it('should have main navigation', () => {
    expect(html).toMatch(/<nav\s+class="main-nav"/i);
  });

  // Проверяем наличие футера
  // Важно: класс должен быть footer
  it('should have footer', () => {
    expect(html).toMatch(/<footer\s+class="footer"/i);
  });

  // Примеры других тестов, которые можно добавить:
  // - проверка заголовков (h1, h2, ...)
  // - проверка наличия определенных секций
  // - проверка атрибутов доступности
  // - проверка форм и их атрибутов
  // - проверка изображений и их атрибутов
  // - проверка ссылок
});
