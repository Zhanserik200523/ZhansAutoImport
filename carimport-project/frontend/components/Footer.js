'use client'
export default function Footer() {
    return (
        <footer className="bg-gray-100 text-gray-600 mt-20">
            <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
                {/* Бренд */}
                <div>
                    <h3 className="text-xl font-bold text-blue-600 mb-2">ZhansAutoImport</h3>
                    <p>Экспорт автомобилей из Кореи в Казахстан и другие страны.</p>
                </div>

                {/* Ссылки */}
                <div>
                    <h4 className="font-semibold mb-2">Полезное</h4>
                    <ul className="space-y-1">
                        <li><a href="/cars" className="hover:text-blue-600 transition">Каталог машин</a></li>
                        <li><a href="/profile" className="hover:text-blue-600 transition">Личный кабинет</a></li>
                        <li><a href="/favorites" className="hover:text-blue-600 transition">Избранное</a></li>
                        <li><a href="/chat" className="hover:text-blue-600 transition">Чат с менеджером</a></li>
                    </ul>
                </div>

                {/* Контакты / Соцсети */}
                <div>
                    <h4 className="font-semibold mb-2">Контакты</h4>
                    <p>Тел: +7 (777) 123-45-67</p>
                    <p>Email: info@zhansauto.kz</p>
                    <div className="flex gap-3 mt-3">
                        <a href="https://t.me/zhans_auto" target="_blank" className="hover:text-blue-500">Telegram</a>
                        <a href="https://instagram.com/zhansauto" target="_blank" className="hover:text-pink-500">Instagram</a>
                    </div>
                </div>
            </div>

            {/* Низ футера */}
            <div className="text-center border-t text-xs text-gray-400 py-4">
                 ZhansAutoImport. Все права защищены.
            </div>
        </footer>
    )
}
