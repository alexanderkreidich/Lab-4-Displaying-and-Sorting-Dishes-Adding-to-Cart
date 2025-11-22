// Массив объектов с блюдами
const dishes = [
  // Супы
  {
    keyword: 'gaspacho',
    name: 'Гаспачо',
    price: 195,
    category: 'soup',
    count: '350 г',
    image: 'images/gazpacho.png',
  },
  {
    keyword: 'mushroom-soup',
    name: 'Грибной суп-пюре',
    price: 185,
    category: 'soup',
    count: '330 г',
    image: 'images/mushroom-soup.png',
  },
  {
    keyword: 'norwegian-soup',
    name: 'Норвежский суп',
    price: 270,
    category: 'soup',
    count: '330 г',
    image: 'images/norwegian-soup.png',
  },

  // Главные блюда
  {
    keyword: 'fried-potatoes',
    name: 'Жареная картошка с грибами',
    price: 150,
    category: 'main-course',
    count: '250 г',
    image: 'images/fried-potatoes.png',
  },
  {
    keyword: 'lasagna',
    name: 'Лазанья',
    price: 385,
    category: 'main-course',
    count: '310 г',
    image: 'images/lasagna.png',
  },
  {
    keyword: 'cutlets',
    name: 'Котлеты из курицы с картофельным пюре',
    price: 225,
    category: 'main-course',
    count: '280 г',
    image: 'images/cutlets.png',
  },

  // Напитки
  {
    keyword: 'orange-juice',
    name: 'Апельсиновый сок',
    price: 120,
    category: 'drink',
    count: '300 мл',
    image: 'images/orange-juice.png',
  },
  {
    keyword: 'apple-juice',
    name: 'Яблочный сок',
    price: 90,
    category: 'drink',
    count: '300 мл',
    image: 'images/apple-juice.png',
  },
  {
    keyword: 'carrot-juice',
    name: 'Морковный сок',
    price: 110,
    category: 'drink',
    count: '300 мл',
    image: 'images/carrot-juice.png',
  },
]

// Объект для хранения выбранных блюд
const selectedDishes = {
  soup: null,
  'main-course': null,
  drink: null,
}

// Сортировка блюд по алфавиту
function sortDishesByName(dishesArray) {
  return dishesArray.sort((a, b) => a.name.localeCompare(b.name, 'ru'))
}

// Создание HTML для карточки блюда
function createDishCard(dish) {
  const card = document.createElement('div')
  card.className = 'dish-card'
  card.setAttribute('data-dish', dish.keyword)

  card.innerHTML = `
        <img src="${dish.image}" alt="${dish.name}" />
        <p class="dish-price">${dish.price}₽</p>
        <p class="dish-name">${dish.name}</p>
        <p class="dish-weight">${dish.count}</p>
        <button>Добавить</button>
    `

  // Добавляем обработчик клика на карточку
  card.addEventListener('click', () => selectDish(dish))

  return card
}

// Отображение блюд на странице
function displayDishes() {
  const categories = [
    { name: 'soup', selector: '.menu-section:nth-of-type(2) .dishes-grid' },
    {
      name: 'main-course',
      selector: '.menu-section:nth-of-type(3) .dishes-grid',
    },
    { name: 'drink', selector: '.menu-section:nth-of-type(4) .dishes-grid' },
  ]

  categories.forEach((category) => {
    const grid = document.querySelector(category.selector)
    if (grid) {
      // Очищаем секцию
      grid.innerHTML = ''

      // Фильтруем и сортируем блюда для текущей категории
      const categoryDishes = dishes.filter(
        (dish) => dish.category === category.name
      )
      const sortedDishes = sortDishesByName(categoryDishes)

      // Добавляем карточки блюд
      sortedDishes.forEach((dish) => {
        grid.appendChild(createDishCard(dish))
      })
    }
  })
}

// Выбор блюда
function selectDish(dish) {
  selectedDishes[dish.category] = dish
  updateOrderDisplay()
}

// Обновление отображения заказа
function updateOrderDisplay() {
  const orderBlock = document.querySelector('.order-block')

  // Проверяем, есть ли хотя бы одно выбранное блюдо
  const hasSelection = Object.values(selectedDishes).some(
    (dish) => dish !== null
  )

  if (!hasSelection) {
    // Если ничего не выбрано
    orderBlock.innerHTML = `
            <h3>Ваш заказ</h3>
            <p>Ничего не выбрано</p>
        `
    return
  }

  // Формируем HTML для заказа
  let orderHTML = '<h3>Ваш заказ</h3>'

  // Суп
  if (selectedDishes.soup) {
    orderHTML += `
            <p><strong>Суп</strong></p>
            <p>${selectedDishes.soup.name} ${selectedDishes.soup.price}₽</p>
        `
  } else {
    orderHTML += `
            <p><strong>Суп</strong></p>
            <p>Блюдо не выбрано</p>
        `
  }

  // Главное блюдо
  if (selectedDishes['main-course']) {
    orderHTML += `
            <p><strong>Главное блюдо</strong></p>
            <p>${selectedDishes['main-course'].name} ${selectedDishes['main-course'].price}₽</p>
        `
  } else {
    orderHTML += `
            <p><strong>Главное блюдо</strong></p>
            <p>Блюдо не выбрано</p>
        `
  }

  // Напиток
  if (selectedDishes.drink) {
    orderHTML += `
            <p><strong>Напиток</strong></p>
            <p>${selectedDishes.drink.name} ${selectedDishes.drink.price}₽</p>
        `
  } else {
    orderHTML += `
            <p><strong>Напиток</strong></p>
            <p>Напиток не выбран</p>
        `
  }

  // Подсчет стоимости
  const totalPrice = calculateTotalPrice()
  orderHTML += `
        <p><strong>Стоимость заказа</strong></p>
        <p>${totalPrice}₽</p>
    `

  orderBlock.innerHTML = orderHTML
}

// Подсчет итоговой стоимости
function calculateTotalPrice() {
  let total = 0
  Object.values(selectedDishes).forEach((dish) => {
    if (dish) {
      total += dish.price
    }
  })
  return total
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  displayDishes()
  updateOrderDisplay()
})
