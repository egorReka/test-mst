# Папка для скриптов

```shell
└── source/
    └── js/
        ├── modules/              # Папка для JavaScript модулей и компонентов
        ├── utils/                # Папка для вспомогательных утилит и функций
        ├── vendor/               # Папка для сторонних JavaScript библиотек
        └── main.js               # Точка входа для JavaScript
```

## Правила
- привязывайте js не на `.class`, а на дата атрибуты `[data-validate]`
- вместо модификаторов `.block--active` используем утилитарные классы `.is-active || .is-open || .is-invalid` и проие.
- обязателен нейминг в два слова) `.select.select--opened ❌ ---> [data-select].is-open ✅`
- выносим все в дата атрибуты - url до иконок пинов карты, настройки автопрокрутки слайдера, url к json и т.д.
- используйте `.closest(el)`
- для адаптивного JS используейтся `matchMedia и addListener`:
```js
const breakpoint = window.matchMedia(`(min-width:1024px)`);
const breakpointChecker = () => {
  if (breakpoint.matches) {
  } else {
  }
};
breakpoint.addListener(breakpointChecker);
breakpointChecker();
```
