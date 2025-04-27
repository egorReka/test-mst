# Работа со спрайтами

В этой папке хранятся SVG-иконки для создания спрайта. Спрайт автоматически собирается из всех `.svg` файлов в папке `source/img/sprite/*.svg`.
Имя файла будет использоваться в ID спрайта (например: `icon.svg` → `sprite-icon` и `sprite-spirit-view`)

## Использование спрайта

### Как SVG:

```html
<svg>
  <use xlink:href="./__spritemap#sprite-icon"></use>
</svg>
```

### Как IMG:

```html
<img src="./__spritemap#sprite-spiriit-view" />
```

### Как background-image:

```css
background-image: url('../__spritemap#sprite-spirit-view');
```

---

[Документация vite-plugin-svg-spritemap](https://github.com/SpiriitLabs/vite-plugin-svg-spritemap?tab=readme-ov-file)
