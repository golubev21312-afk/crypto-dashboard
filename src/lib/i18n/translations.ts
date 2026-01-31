/**
 * Переводы приложения
 * Поддерживаемые языки: English, Русский, ไทย, 中文
 * 
 * ---
 * 
 * Application translations
 * Supported languages: English, Russian, Thai, Chinese
 */

export const locales = ['en', 'ru', 'th', 'zh'] as const;
export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  en: 'English',
  ru: 'Русский',
  th: 'ไทย',
  zh: '中文',
};

export const translations: Record<Locale, Record<string, string>> = {
  en: {
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.coins': 'Coins',
    'nav.portfolio': 'Portfolio',

    // Dashboard
    'dashboard.title': 'Dashboard',
    'dashboard.subtitle': 'Cryptocurrency market overview',
    'dashboard.totalMarketCap': 'Total Market Cap',
    'dashboard.volume24h': '24h Volume',
    'dashboard.btcDominance': 'BTC Dominance',
    'dashboard.activeCoins': 'Active Coins',
    'dashboard.topCryptos': 'Top Cryptocurrencies',
    'dashboard.viewAll': 'View All →',
    'dashboard.quickActions': 'Quick Actions',
    'dashboard.managePortfolio': 'Manage Portfolio',
    'dashboard.browseCoins': 'Browse All Coins',

    // Coins
    'coins.title': 'Cryptocurrencies',
    'coins.subtitle': 'Browse and search all available cryptocurrencies',
    'coins.search': 'Search coins...',
    'coins.rank': '#',
    'coins.coin': 'Coin',
    'coins.price': 'Price',
    'coins.change24h': '24h',
    'coins.marketCap': 'Market Cap',
    'coins.loadMore': 'Load More',
    'coins.noCoins': 'No coins found',
    'coins.noAvailable': 'No coins available',

    // Coin Details
    'coinDetail.backToCoins': '← Back to Coins',
    'coinDetail.rank': 'Rank',
    'coinDetail.priceChanges': 'Price Changes',
    'coinDetail.marketData': 'Market Data',
    'coinDetail.volume': '24h Volume',
    'coinDetail.circulatingSupply': 'Circulating Supply',
    'coinDetail.range24h': '24h Range',
    'coinDetail.high': 'High',
    'coinDetail.low': 'Low',
    'coinDetail.allTime': 'All-Time',
    'coinDetail.ath': 'All-Time High',
    'coinDetail.atl': 'All-Time Low',
    'coinDetail.about': 'About',
    'coinDetail.errorLoading': 'Error loading coin',

    // Chart
    'chart.title': 'Price Chart',
    'chart.period': 'Period',

    // Portfolio
    'portfolio.title': 'Portfolio',
    'portfolio.subtitle': 'Track your cryptocurrency investments',
    'portfolio.addAsset': '+ Add Asset',
    'portfolio.totalValue': 'Total Value',
    'portfolio.totalInvested': 'Total Invested',
    'portfolio.profitLoss': 'Profit / Loss',
    'portfolio.empty': 'Your portfolio is empty',
    'portfolio.emptyHint': 'Add your first asset to start tracking',
    'portfolio.asset': 'Asset',
    'portfolio.amount': 'Amount',
    'portfolio.value': 'Value',
    'portfolio.remove': 'Remove',
    'portfolio.avgPrice': 'Avg',
    'portfolio.pl': 'P/L',

    // Modal
    'modal.addAsset': 'Add Asset',
    'modal.addAssetDesc': 'Add a cryptocurrency to your portfolio',
    'modal.selectCoin': 'Select coin...',
    'modal.coin': 'Coin',
    'modal.purchasePrice': 'Purchase Price (USD)',
    'modal.cancel': 'Cancel',
    'modal.add': 'Add',

    // Trending
    'trending.title': 'Trending',

    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.errorLoading': 'Failed to load data',
  },

  ru: {
    // Navigation
    'nav.dashboard': 'Главная',
    'nav.coins': 'Монеты',
    'nav.portfolio': 'Портфель',

    // Dashboard
    'dashboard.title': 'Главная',
    'dashboard.subtitle': 'Обзор криптовалютного рынка',
    'dashboard.totalMarketCap': 'Капитализация',
    'dashboard.volume24h': 'Объём 24ч',
    'dashboard.btcDominance': 'Доминация BTC',
    'dashboard.activeCoins': 'Активных монет',
    'dashboard.topCryptos': 'Топ криптовалют',
    'dashboard.viewAll': 'Все →',
    'dashboard.quickActions': 'Быстрые действия',
    'dashboard.managePortfolio': 'Управление портфелем',
    'dashboard.browseCoins': 'Все монеты',

    // Coins
    'coins.title': 'Криптовалюты',
    'coins.subtitle': 'Поиск и просмотр всех криптовалют',
    'coins.search': 'Поиск монет...',
    'coins.rank': '#',
    'coins.coin': 'Монета',
    'coins.price': 'Цена',
    'coins.change24h': '24ч',
    'coins.marketCap': 'Капитализация',
    'coins.loadMore': 'Загрузить ещё',
    'coins.noCoins': 'Монеты не найдены',
    'coins.noAvailable': 'Нет доступных монет',

    // Coin Details
    'coinDetail.backToCoins': '← Назад к монетам',
    'coinDetail.rank': 'Ранг',
    'coinDetail.priceChanges': 'Изменения цены',
    'coinDetail.marketData': 'Рыночные данные',
    'coinDetail.volume': 'Объём 24ч',
    'coinDetail.circulatingSupply': 'В обращении',
    'coinDetail.range24h': 'Диапазон 24ч',
    'coinDetail.high': 'Макс',
    'coinDetail.low': 'Мин',
    'coinDetail.allTime': 'За всё время',
    'coinDetail.ath': 'Исторический максимум',
    'coinDetail.atl': 'Исторический минимум',
    'coinDetail.about': 'О монете',
    'coinDetail.errorLoading': 'Ошибка загрузки монеты',

    // Chart
    'chart.title': 'График цены',
    'chart.period': 'Период',

    // Portfolio
    'portfolio.title': 'Портфель',
    'portfolio.subtitle': 'Отслеживайте ваши инвестиции',
    'portfolio.addAsset': '+ Добавить',
    'portfolio.totalValue': 'Общая стоимость',
    'portfolio.totalInvested': 'Инвестировано',
    'portfolio.profitLoss': 'Прибыль / Убыток',
    'portfolio.empty': 'Портфель пуст',
    'portfolio.emptyHint': 'Добавьте первый актив',
    'portfolio.asset': 'Актив',
    'portfolio.amount': 'Кол-во',
    'portfolio.value': 'Стоимость',
    'portfolio.remove': 'Удалить',
    'portfolio.avgPrice': 'Сред',
    'portfolio.pl': 'П/У',

    // Modal
    'modal.addAsset': 'Добавить актив',
    'modal.addAssetDesc': 'Добавьте криптовалюту в портфель',
    'modal.selectCoin': 'Выберите монету...',
    'modal.coin': 'Монета',
    'modal.purchasePrice': 'Цена покупки (USD)',
    'modal.cancel': 'Отмена',
    'modal.add': 'Добавить',

    // Trending
    'trending.title': 'В тренде',

    // Common
    'common.loading': 'Загрузка...',
    'common.error': 'Ошибка',
    'common.errorLoading': 'Ошибка загрузки данных',
  },

  th: {
    // Navigation
    'nav.dashboard': 'แดชบอร์ด',
    'nav.coins': 'เหรียญ',
    'nav.portfolio': 'พอร์ตโฟลิโอ',

    // Dashboard
    'dashboard.title': 'แดชบอร์ด',
    'dashboard.subtitle': 'ภาพรวมตลาดคริปโต',
    'dashboard.totalMarketCap': 'มูลค่าตลาดรวม',
    'dashboard.volume24h': 'ปริมาณ 24 ชม.',
    'dashboard.btcDominance': 'BTC Dominance',
    'dashboard.activeCoins': 'เหรียญที่ใช้งาน',
    'dashboard.topCryptos': 'คริปโตยอดนิยม',
    'dashboard.viewAll': 'ดูทั้งหมด →',
    'dashboard.quickActions': 'การดำเนินการด่วน',
    'dashboard.managePortfolio': 'จัดการพอร์ต',
    'dashboard.browseCoins': 'ดูเหรียญทั้งหมด',

    // Coins
    'coins.title': 'คริปโตเคอร์เรนซี',
    'coins.subtitle': 'ค้นหาและเรียกดูคริปโตทั้งหมด',
    'coins.search': 'ค้นหาเหรียญ...',
    'coins.rank': '#',
    'coins.coin': 'เหรียญ',
    'coins.price': 'ราคา',
    'coins.change24h': '24 ชม.',
    'coins.marketCap': 'มูลค่าตลาด',
    'coins.loadMore': 'โหลดเพิ่ม',
    'coins.noCoins': 'ไม่พบเหรียญ',
    'coins.noAvailable': 'ไม่มีเหรียญ',

    // Coin Details
    'coinDetail.backToCoins': '← กลับ',
    'coinDetail.rank': 'อันดับ',
    'coinDetail.priceChanges': 'การเปลี่ยนแปลงราคา',
    'coinDetail.marketData': 'ข้อมูลตลาด',
    'coinDetail.volume': 'ปริมาณ 24 ชม.',
    'coinDetail.circulatingSupply': 'หมุนเวียน',
    'coinDetail.range24h': 'ช่วง 24 ชม.',
    'coinDetail.high': 'สูงสุด',
    'coinDetail.low': 'ต่ำสุด',
    'coinDetail.allTime': 'ตลอดกาล',
    'coinDetail.ath': 'สูงสุดตลอดกาล',
    'coinDetail.atl': 'ต่ำสุดตลอดกาล',
    'coinDetail.about': 'เกี่ยวกับ',
    'coinDetail.errorLoading': 'ไม่สามารถโหลดข้อมูลเหรียญ',

    // Chart
    'chart.title': 'กราฟราคา',
    'chart.period': 'ช่วงเวลา',

    // Portfolio
    'portfolio.title': 'พอร์ตโฟลิโอ',
    'portfolio.subtitle': 'ติดตามการลงทุนของคุณ',
    'portfolio.addAsset': '+ เพิ่ม',
    'portfolio.totalValue': 'มูลค่ารวม',
    'portfolio.totalInvested': 'ลงทุนแล้ว',
    'portfolio.profitLoss': 'กำไร / ขาดทุน',
    'portfolio.empty': 'พอร์ตว่างเปล่า',
    'portfolio.emptyHint': 'เพิ่มสินทรัพย์แรก',
    'portfolio.asset': 'สินทรัพย์',
    'portfolio.amount': 'จำนวน',
    'portfolio.value': 'มูลค่า',
    'portfolio.remove': 'ลบ',
    'portfolio.avgPrice': 'เฉลี่ย',
    'portfolio.pl': 'กำไร/ขาดทุน',

    // Modal
    'modal.addAsset': 'เพิ่มสินทรัพย์',
    'modal.addAssetDesc': 'เพิ่มคริปโตในพอร์ต',
    'modal.selectCoin': 'เลือกเหรียญ...',
    'modal.coin': 'เหรียญ',
    'modal.purchasePrice': 'ราคาซื้อ (USD)',
    'modal.cancel': 'ยกเลิก',
    'modal.add': 'เพิ่ม',

    // Trending
    'trending.title': 'กำลังมาแรง',

    // Common
    'common.loading': 'กำลังโหลด...',
    'common.error': 'ข้อผิดพลาด',
    'common.errorLoading': 'โหลดข้อมูลไม่สำเร็จ',
  },

  zh: {
    // Navigation
    'nav.dashboard': '仪表板',
    'nav.coins': '币种',
    'nav.portfolio': '投资组合',

    // Dashboard
    'dashboard.title': '仪表板',
    'dashboard.subtitle': '加密货币市场概览',
    'dashboard.totalMarketCap': '总市值',
    'dashboard.volume24h': '24小时交易量',
    'dashboard.btcDominance': 'BTC主导地位',
    'dashboard.activeCoins': '活跃币种',
    'dashboard.topCryptos': '热门加密货币',
    'dashboard.viewAll': '查看全部 →',
    'dashboard.quickActions': '快捷操作',
    'dashboard.managePortfolio': '管理投资组合',
    'dashboard.browseCoins': '浏览所有币种',

    // Coins
    'coins.title': '加密货币',
    'coins.subtitle': '浏览和搜索所有加密货币',
    'coins.search': '搜索币种...',
    'coins.rank': '#',
    'coins.coin': '币种',
    'coins.price': '价格',
    'coins.change24h': '24小时',
    'coins.marketCap': '市值',
    'coins.loadMore': '加载更多',
    'coins.noCoins': '未找到币种',
    'coins.noAvailable': '暂无币种',

    // Coin Details
    'coinDetail.backToCoins': '← 返回',
    'coinDetail.rank': '排名',
    'coinDetail.priceChanges': '价格变化',
    'coinDetail.marketData': '市场数据',
    'coinDetail.volume': '24小时交易量',
    'coinDetail.circulatingSupply': '流通量',
    'coinDetail.range24h': '24小时范围',
    'coinDetail.high': '最高',
    'coinDetail.low': '最低',
    'coinDetail.allTime': '历史',
    'coinDetail.ath': '历史最高',
    'coinDetail.atl': '历史最低',
    'coinDetail.about': '关于',
    'coinDetail.errorLoading': '加载币种失败',

    // Chart
    'chart.title': '价格图表',
    'chart.period': '时间段',

    // Portfolio
    'portfolio.title': '投资组合',
    'portfolio.subtitle': '跟踪您的投资',
    'portfolio.addAsset': '+ 添加',
    'portfolio.totalValue': '总价值',
    'portfolio.totalInvested': '已投资',
    'portfolio.profitLoss': '盈亏',
    'portfolio.empty': '投资组合为空',
    'portfolio.emptyHint': '添加第一个资产',
    'portfolio.asset': '资产',
    'portfolio.amount': '数量',
    'portfolio.value': '价值',
    'portfolio.remove': '删除',
    'portfolio.avgPrice': '均价',
    'portfolio.pl': '盈亏',

    // Modal
    'modal.addAsset': '添加资产',
    'modal.addAssetDesc': '添加加密货币到组合',
    'modal.selectCoin': '选择币种...',
    'modal.coin': '币种',
    'modal.purchasePrice': '购买价格 (USD)',
    'modal.cancel': '取消',
    'modal.add': '添加',

    // Trending
    'trending.title': '热门趋势',

    // Common
    'common.loading': '加载中...',
    'common.error': '错误',
    'common.errorLoading': '加载数据失败',
  },
};
