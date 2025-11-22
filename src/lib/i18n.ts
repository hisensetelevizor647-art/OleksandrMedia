import { writable } from 'svelte/store';

export type Language = 'en' | 'ru' | 'uk' | 'sk';

export const translations = {
	en: {
		// Header
		home: 'Home',
		trending: 'Trending',
		subscriptions: 'Subscriptions',
		history: 'History',
		liked: 'Liked Videos',
		myVideos: 'My Videos',
		watchLater: 'Watch Later',
		upload: 'Upload',
		login: 'Sign In',
		logout: 'Sign Out',
		settings: 'Settings',
		studio: 'Creator Studio',
		myChannel: 'My Channel',

		// Video
		views: 'views',
		subscribers: 'subscribers',
		subscribe: 'Subscribe',
		subscribed: 'Subscribed',
		like: 'Like',
		dislike: 'Dislike',
		share: 'Share',
		analytics: 'Analytics',
		editVideo: 'Edit Video',

		// Comments
		comments: 'Comments',
		addComment: 'Add a comment...',
		comment: 'Comment',
		reply: 'Reply',
		addReply: 'Add a reply...',
		cancel: 'Cancel',
		pinnedBy: 'Pinned by author',
		heartComment: 'Heart Comment',
		removeHeart: 'Remove Heart',
		pinComment: 'Pin Comment',
		unpin: 'Unpin',

		// Upload
		uploadVideo: 'Upload Video',
		dragDrop: 'Drag and drop video file here',
		selectFile: 'Select File',
		title: 'Title',
		description: 'Description',
		thumbnail: 'Thumbnail',
		uploading: 'Uploading...',

		// Settings
		profileSettings: 'Profile Settings',
		channelAppearance: 'Channel Appearance',
		username: 'Username',
		email: 'Email',
		avatarImage: 'Avatar Image',
		bannerImage: 'Banner Image',
		saveChanges: 'Save Changes',
		currentAvatar: 'Current avatar',
		currentBanner: 'Current banner',
		newAvatar: 'New avatar (not saved yet)',
		newBanner: 'New banner (not saved yet)',

		// Studio
		dashboard: 'Dashboard',
		content: 'Content',
		totalViews: 'Total Views',
		videos: 'Videos',
		likes: 'Likes',
		latestVideos: 'Latest Videos',
		noVideos: 'No videos yet',
		uploadFirst: 'Upload your first video',
		edit: 'Edit',
		delete: 'Delete',
		deleteConfirm: 'Delete this video?',

		// Auth
		signIn: 'Sign In',
		signUp: 'Sign Up',
		register: 'Register',
		password: 'Password',
		dontHaveAccount: "Don't have an account?",
		alreadyHaveAccount: 'Already have an account?',

		// Common
		loading: 'Loading...',
		save: 'Save',
		search: 'Search',
		noResults: 'No results found',
		error: 'Error',
		success: 'Success',
		channelNotFound: 'Channel not found',
		videoNotFound: 'Video not found',

		// Time
		justNow: 'just now',
		minutesAgo: 'minutes ago',
		hoursAgo: 'hours ago',
		daysAgo: 'days ago',
		weeksAgo: 'weeks ago',
		monthsAgo: 'months ago',
		yearsAgo: 'years ago',

		// Sidebar
		library: 'Library',

		// Theme
		darkTheme: 'Dark Theme',
		lightTheme: 'Light Theme',

		// Studio Analytics
		overview: 'Overview',
		performance: 'Performance',

		// Video Stats
		video: 'Video',
		views24h: '24h Views',
		totalLikes: 'Total Likes',
		avgViewDuration: 'Avg. View Duration',

		// Misc
		ago: 'ago',
		minute: 'minute',
		minutes: 'minutes',
		hour: 'hour',
		hours: 'hours',
		day: 'day',
		days: 'days',
		week: 'week',
		weeks: 'weeks',
		month: 'month',
		months: 'months',
		year: 'year',
		years: 'years',

		// Pages
		searchResultsFor: 'Search results for',
		searching: 'Searching...',
		noVideosFound: 'No videos found',
		noTrendingVideos: 'No trending videos yet',
		noWatchHistory: 'No watch history yet. Start watching videos!',
		noWatchLater: 'No videos saved for later',
		noLikedVideos: 'No liked videos yet. Start liking videos you enjoy!',
		yourVideos: 'Your Videos',
		youHaventUploaded: "You haven't uploaded any videos yet.",
		noCommentsYet: 'No comments yet',
		on: 'On',
		subscribers_other: 'subscribers',
		videos_other: 'videos',
	},
	ru: {
		// Header
		home: 'Главная',
		trending: 'В тренде',
		subscriptions: 'Подписки',
		history: 'История',
		liked: 'Понравившиеся',
		myVideos: 'Мои видео',
		watchLater: 'Смотреть позже',
		upload: 'Загрузить',
		login: 'Войти',
		logout: 'Выйти',
		settings: 'Настройки',
		studio: 'Творческая студия',
		myChannel: 'Мой канал',

		// Video
		views: 'просмотров',
		subscribers: 'подписчиков',
		subscribe: 'Подписаться',
		subscribed: 'Вы подписаны',
		like: 'Нравится',
		dislike: 'Не нравится',
		share: 'Поделиться',
		analytics: 'Аналитика',
		editVideo: 'Редактировать',

		// Comments
		comments: 'Комментарии',
		addComment: 'Введите комментарий...',
		comment: 'Комментировать',
		reply: 'Ответить',
		addReply: 'Введите ответ...',
		cancel: 'Отмена',
		pinnedBy: 'Закреплено автором',
		heartComment: 'Отметить сердечком',
		removeHeart: 'Убрать сердечко',
		pinComment: 'Закрепить',
		unpin: 'Открепить',

		// Upload
		uploadVideo: 'Загрузка видео',
		dragDrop: 'Перетащите видеофайл сюда',
		selectFile: 'Выбрать файл',
		title: 'Название',
		description: 'Описание',
		thumbnail: 'Превью',
		uploading: 'Загрузка...',

		// Settings
		profileSettings: 'Настройки профиля',
		channelAppearance: 'Оформление канала',
		username: 'Имя пользователя',
		email: 'Email',
		avatarImage: 'Аватар',
		bannerImage: 'Баннер',
		saveChanges: 'Сохранить изменения',
		currentAvatar: 'Текущий аватар',
		currentBanner: 'Текущий баннер',
		newAvatar: 'Новый аватар (не сохранён)',
		newBanner: 'Новый баннер (не сохранён)',

		// Studio
		dashboard: 'Панель управления',
		content: 'Контент',
		totalViews: 'Всего просмотров',
		videos: 'Видео',
		likes: 'Лайки',
		latestVideos: 'Последние видео',
		noVideos: 'Нет видео',
		uploadFirst: 'Загрузите первое видео',
		edit: 'Изменить',
		delete: 'Удалить',
		deleteConfirm: 'Удалить это видео?',

		// Auth
		signIn: 'Войти',
		signUp: 'Регистрация',
		register: 'Зарегистрироваться',
		password: 'Пароль',
		dontHaveAccount: 'Нет аккаунта?',
		alreadyHaveAccount: 'Уже есть аккаунт?',

		// Common
		loading: 'Загрузка...',
		save: 'Сохранить',
		search: 'Поиск',
		noResults: 'Ничего не найдено',
		error: 'Ошибка',
		success: 'Успешно',
		channelNotFound: 'Канал не найден',
		videoNotFound: 'Видео не найдено',

		// Time
		justNow: 'только что',
		minutesAgo: 'минут назад',
		hoursAgo: 'часов назад',
		daysAgo: 'дней назад',
		weeksAgo: 'недель назад',
		monthsAgo: 'месяцев назад',
		yearsAgo: 'лет назад',

		// Sidebar
		library: 'Библиотека',

		// Theme
		darkTheme: 'Темная тема',
		lightTheme: 'Светлая тема',

		// Studio Analytics
		overview: 'Обзор',
		performance: 'Производительность',

		// Video Stats
		video: 'Видео',
		views24h: 'Просмотры за 24ч',
		totalLikes: 'Всего лайков',
		avgViewDuration: 'Ср. длительность',

		// Misc
		ago: 'назад',
		minute: 'минута',
		minutes: 'минуты',
		hour: 'час',
		hours: 'часа',
		day: 'день',
		days: 'дня',
		week: 'неделя',
		weeks: 'недели',
		month: 'месяц',
		months: 'месяца',
		year: 'год',
		years: 'года',

		// Pages
		searchResultsFor: 'Результаты поиска для',
		searching: 'Поиск...',
		noVideosFound: 'Видео не найдено',
		noTrendingVideos: 'Пока нет популярных видео',
		noWatchHistory: 'История просмотра пуста. Начните смотреть видео!',
		noWatchLater: 'Нет видео, сохраненных для просмотра позже',
		noLikedVideos: 'Пока нет понравившихся видео. Начните ставить лайки!',
		yourVideos: 'Ваши видео',
		youHaventUploaded: 'Вы еще не загрузили ни одного видео.',
		noCommentsYet: 'Пока нет комментариев',
		on: 'К',
		subscribers_other: 'подписчиков',
		videos_other: 'видео',
	},
	uk: {
		// Header
		home: 'Головна',
		trending: 'В тренді',
		subscriptions: 'Підписки',
		history: 'Історія',
		liked: 'Сподобалось',
		myVideos: 'Мої відео',
		watchLater: 'Переглянути пізніше',
		upload: 'Завантажити',
		login: 'Увійти',
		logout: 'Вийти',
		settings: 'Налаштування',
		studio: 'Творча студія',
		myChannel: 'Мій канал',

		// Video
		views: 'переглядів',
		subscribers: 'підписників',
		subscribe: 'Підписатися',
		subscribed: 'Ви підписані',
		like: 'Вподобати',
		dislike: 'Не подобається',
		share: 'Поділитися',
		analytics: 'Аналітика',
		editVideo: 'Редагувати',

		// Comments
		comments: 'Коментарі',
		addComment: 'Введіть коментар...',
		comment: 'Коментувати',
		reply: 'Відповісти',
		addReply: 'Введіть відповідь...',
		cancel: 'Скасувати',
		pinnedBy: 'Закріплено автором',
		heartComment: 'Вподобати коментар',
		removeHeart: 'Прибрати вподобайку',
		pinComment: 'Закріпити',
		unpin: 'Відкріпити',

		// Upload
		uploadVideo: 'Завантаження відео',
		dragDrop: 'Перетягніть відеофайл сюди',
		selectFile: 'Вибрати файл',
		title: 'Назва',
		description: 'Опис',
		thumbnail: 'Прев\'ю',
		uploading: 'Завантаження...',

		// Settings
		profileSettings: 'Налаштування профілю',
		channelAppearance: 'Оформлення каналу',
		username: 'Ім\'я користувача',
		email: 'Email',
		avatarImage: 'Аватар',
		bannerImage: 'Банер',
		saveChanges: 'Зберегти зміни',
		currentAvatar: 'Поточний аватар',
		currentBanner: 'Поточний банер',
		newAvatar: 'Новий аватар (не збережено)',
		newBanner: 'Новий банер (не збережено)',

		// Studio
		dashboard: 'Панель керування',
		content: 'Контент',
		totalViews: 'Всього переглядів',
		videos: 'Відео',
		likes: 'Вподобайки',
		latestVideos: 'Останні відео',
		noVideos: 'Немає відео',
		uploadFirst: 'Завантажте перше відео',
		edit: 'Змінити',
		delete: 'Видалити',
		deleteConfirm: 'Видалити це відео?',

		// Auth
		signIn: 'Увійти',
		signUp: 'Реєстрація',
		register: 'Зареєструватися',
		password: 'Пароль',
		dontHaveAccount: 'Немає акаунту?',
		alreadyHaveAccount: 'Вже є акаунт?',

		// Common
		loading: 'Завантаження...',
		save: 'Зберегти',
		search: 'Пошук',
		noResults: 'Нічого не знайдено',
		error: 'Помилка',
		success: 'Успішно',
		channelNotFound: 'Канал не знайдено',
		videoNotFound: 'Відео не знайдено',

		// Time
		justNow: 'щойно',
		minutesAgo: 'хвилин тому',
		hoursAgo: 'годин тому',
		daysAgo: 'днів тому',
		weeksAgo: 'тижнів тому',
		monthsAgo: 'місяців тому',
		yearsAgo: 'років тому',

		// Sidebar
		library: 'Бібліотека',

		// Theme
		darkTheme: 'Темна тема',
		lightTheme: 'Світла тема',

		// Studio Analytics
		overview: 'Огляд',
		performance: 'Ефективність',

		// Video Stats
		video: 'Відео',
		views24h: 'Перегляди за 24год',
		totalLikes: 'Всього вподобайок',
		avgViewDuration: 'Сер. тривалість',

		// Misc
		ago: 'тому',
		minute: 'хвилина',
		minutes: 'хвилини',
		hour: 'година',
		hours: 'години',
		day: 'день',
		days: 'дні',
		week: 'тиждень',
		weeks: 'тижні',
		month: 'місяць',
		months: 'місяці',
		year: 'рік',
		years: 'роки',

		// Pages
		searchResultsFor: 'Результати пошуку для',
		searching: 'Пошук...',
		noVideosFound: 'Відео не знайдено',
		noTrendingVideos: 'Поки немає популярних відео',
		noWatchHistory: 'Історія перегляду порожня. Почніть дивитися відео!',
		noWatchLater: 'Немає відео, збережених для перегляду пізніше',
		noLikedVideos: 'Поки немає вподобаних відео. Почніть вподобувати відео!',
		yourVideos: 'Ваші відео',
		youHaventUploaded: 'Ви ще не завантажили жодного відео.',
		noCommentsYet: 'Поки немає коментарів',
		on: 'На',
		subscribers_other: 'підписників',
		videos_other: 'відео',
	},
	sk: {
		// Header
		home: 'Domov',
		trending: 'Trendy',
		subscriptions: 'Odbery',
		history: 'História',
		liked: 'Páčilo sa',
		myVideos: 'Moje videá',
		watchLater: 'Pozrieť neskôr',
		upload: 'Nahrať',
		login: 'Prihlásiť sa',
		logout: 'Odhlásiť sa',
		settings: 'Nastavenia',
		studio: 'Štúdio pre tvorcov',
		myChannel: 'Môj kanál',

		// Video
		views: 'zobrazení',
		subscribers: 'odberateľov',
		subscribe: 'Odoberať',
		subscribed: 'Odoberané',
		like: 'Páči sa mi to',
		dislike: 'Nepáči sa mi to',
		share: 'Zdieľať',
		analytics: 'Analytika',
		editVideo: 'Upraviť video',

		// Comments
		comments: 'Komentáre',
		addComment: 'Pridať komentár...',
		comment: 'Komentovať',
		reply: 'Odpovedať',
		addReply: 'Pridať odpoveď...',
		cancel: 'Zrušiť',
		pinnedBy: 'Pripnuté autorom',
		heartComment: 'Dať srdiečko',
		removeHeart: 'Odobrať srdiečko',
		pinComment: 'Pripnúť',
		unpin: 'Odopnúť',

		// Upload
		uploadVideo: 'Nahrať video',
		dragDrop: 'Presuňte video súbor sem',
		selectFile: 'Vybrať súbor',
		title: 'Názov',
		description: 'Popis',
		thumbnail: 'Náhľad',
		uploading: 'Nahráva sa...',

		// Settings
		profileSettings: 'Nastavenia profilu',
		channelAppearance: 'Vzhľad kanála',
		username: 'Používateľské meno',
		email: 'Email',
		avatarImage: 'Avatar',
		bannerImage: 'Banner',
		saveChanges: 'Uložiť zmeny',
		currentAvatar: 'Aktuálny avatar',
		currentBanner: 'Aktuálny banner',
		newAvatar: 'Nový avatar (neuložené)',
		newBanner: 'Nový banner (neuložené)',

		// Studio
		dashboard: 'Panel',
		content: 'Obsah',
		totalViews: 'Celkový počet zobrazení',
		videos: 'Videá',
		likes: 'Páči sa mi to',
		latestVideos: 'Najnovšie videá',
		noVideos: 'Zatiaľ žiadne videá',
		uploadFirst: 'Nahrajte svoje prvé video',
		edit: 'Upraviť',
		delete: 'Vymazať',
		deleteConfirm: 'Vymazať toto video?',

		// Auth
		signIn: 'Prihlásiť sa',
		signUp: 'Registrácia',
		register: 'Zaregistrovať sa',
		password: 'Heslo',
		dontHaveAccount: 'Nemáte účet?',
		alreadyHaveAccount: 'Už máte účet?',

		// Common
		loading: 'Načítava sa...',
		save: 'Uložiť',
		search: 'Hľadať',
		noResults: 'Žiadne výsledky',
		error: 'Chyba',
		success: 'Úspešne',
		channelNotFound: 'Kanál sa nenašiel',
		videoNotFound: 'Video sa nenašlo',

		// Time
		justNow: 'práve teraz',
		minutesAgo: 'pred minútami',
		hoursAgo: 'pred hodinami',
		daysAgo: 'pred dňami',
		weeksAgo: 'pred týždňami',
		monthsAgo: 'pred mesiacmi',
		yearsAgo: 'pred rokmi',

		// Sidebar
		library: 'Knižnica',

		// Theme
		darkTheme: 'Tmavý režim',
		lightTheme: 'Svetlý režim',

		// Studio Analytics
		overview: 'Prehľad',
		performance: 'Výkon',

		// Video Stats
		video: 'Video',
		views24h: 'Zobrazenia za 24h',
		totalLikes: 'Celkovo Páči sa mi to',
		avgViewDuration: 'Priem. doba pozerania',

		// Misc
		ago: 'dozadu',
		minute: 'minúta',
		minutes: 'minúty',
		hour: 'hodina',
		hours: 'hodiny',
		day: 'deň',
		days: 'dni',
		week: 'týždeň',
		weeks: 'týždne',
		month: 'mesiac',
		months: 'mesiace',
		year: 'rok',
		years: 'roky',

		// Pages
		searchResultsFor: 'Výsledky vyhľadávania pre',
		searching: 'Hľadám...',
		noVideosFound: 'Video sa nenašlo',
		noTrendingVideos: 'Zatiaľ žiadne trendy videá',
		noWatchHistory: 'História pozerania je prázdna. Začnite pozerať videá!',
		noWatchLater: 'Žiadne videá uložené na neskôr',
		noLikedVideos: 'Zatiaľ žiadne obľúbené videá. Začnite lajkovať videá!',
		yourVideos: 'Vaše videá',
		youHaventUploaded: 'Ešte ste nenahrali žiadne videá.',
		noCommentsYet: 'Zatiaľ žiadne komentáre',
		on: 'Na',
		subscribers_other: 'odberateľov',
		videos_other: 'videí',
	}
};

export function detectBrowserLanguage(): Language {
	if (typeof navigator === 'undefined') return 'en';

	const lang = navigator.language.toLowerCase();

	if (lang.startsWith('ru')) return 'ru';
	if (lang.startsWith('uk')) return 'uk';
	if (lang.startsWith('sk')) return 'sk';
	return 'en';
}

// Create language store with browser detection
function createLanguageStore() {
	// Try to get from localStorage first, then detect browser language
	const stored = typeof localStorage !== 'undefined' ? localStorage.getItem('language') : null;
	const initial = (stored as Language) || detectBrowserLanguage();

	const { subscribe, set } = writable<Language>(initial);

	return {
		subscribe,
		set: (lang: Language) => {
			if (typeof localStorage !== 'undefined') {
				localStorage.setItem('language', lang);
			}
			set(lang);
		}
	};
}

export const language = createLanguageStore();

// Helper function to get translation
export function t(key: keyof typeof translations.en, lang: Language = 'en'): string {
	return translations[lang]?.[key] || translations.en[key] || key;
}
