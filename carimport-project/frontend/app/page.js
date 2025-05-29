'use client'
import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'


export default function Home() {
    useEffect(() => {
        AOS.init({ once: true, duration: 800 })
    }, [])
    return (
        <div className="font-sans">
            {/* Hero */}
            <section data-aos="fade-up" className="bg-gradient-to-r from-blue-50 to-white py-20 text-center">
                <h1 className="text-5xl font-extrabold text-blue-600 mb-4">ZhansAutoImport</h1>
                <p className="text-xl text-gray-700">Экспорт автомобилей из Кореи в Казахстан и другие страны</p>
            </section>

            {/* О нас */}
            <section data-aos="fade-up" className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center px-6 py-16">
                <img
                    src="https://mikado-auto.ru/netcat_files/31/46/1_0.jpg"
                    alt="Авто"
                    className="rounded-xl shadow-xl"
                />
                <div>
                    <h2 className="text-3xl font-bold mb-4">О нас</h2>
                    <p className="text-gray-700 mb-3">
                        Мы занимаемся подбором, оформлением и логистикой автомобилей из Южной Кореи.
                        Наша цель — сделать покупку автомобиля за границей понятной, прозрачной и безопасной.
                    </p>
                    <p className="text-gray-700">
                        Через нашу платформу вы можете просматривать автомобили, отправлять заявки, общаться с менеджером и отслеживать статус заказа.
                    </p>
                </div>
            </section>

            {/* Преимущества */}
            <section className="bg-white py-12">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-6">
                    <div
                        className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-lg transition"
                        data-aos="fade-up"
                        data-aos-delay="0"
                    >
                        <h3 className="text-xl font-bold mb-2">✅ Надёжность</h3>
                        <p className="text-gray-600">Работаем только с проверенными партнёрами и заводами.</p>
                    </div>
                    <div
                        className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-lg transition"
                        data-aos="fade-up"
                        data-aos-delay="100"
                    >
                        <h3 className="text-xl font-bold mb-2">🚗 Поддержка на каждом этапе</h3>
                        <p className="text-gray-600">От подбора до доставки — мы всегда на связи.</p>
                    </div>
                    <div
                        className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-lg transition"
                        data-aos="fade-up"
                        data-aos-delay="200"
                    >
                        <h3 className="text-xl font-bold mb-2">📦 Полный контроль</h3>
                        <p className="text-gray-600">Онлайн-заявки, статусы, чат — всё в одном месте.</p>
                    </div>
                </div>
            </section>


            {/* Как мы работаем */}
            <section className="py-16 px-6 text-center">
                <h2 data-aos="fade-up" className="text-3xl font-bold mb-10">Как мы работаем</h2>
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div
                        className="p-6 bg-white rounded-lg shadow hover:shadow-xl transition"
                        data-aos="zoom-in"
                        data-aos-delay="0"
                    >
                        <div className="text-4xl mb-2">🔍</div>
                        <h4 className="font-semibold mb-1">1. Подбор машины</h4>
                        <p className="text-gray-600 text-sm">Выбираете авто по фильтрам или с менеджером</p>
                    </div>
                    <div
                        className="p-6 bg-white rounded-lg shadow hover:shadow-xl transition"
                        data-aos="zoom-in"
                        data-aos-delay="100"
                    >
                        <div className="text-4xl mb-2">📝</div>
                        <h4 className="font-semibold mb-1">2. Оформление заявки</h4>
                        <p className="text-gray-600 text-sm">Заполняете форму — мы начинаем проверку и оформление</p>
                    </div>
                    <div
                        className="p-6 bg-white rounded-lg shadow hover:shadow-xl transition"
                        data-aos="zoom-in"
                        data-aos-delay="200"
                    >
                        <div className="text-4xl mb-2">📦</div>
                        <h4 className="font-semibold mb-1">3. Отправка</h4>
                        <p className="text-gray-600 text-sm">Организуем доставку в вашу страну</p>
                    </div>
                    <div
                        className="p-6 bg-white rounded-lg shadow hover:shadow-xl transition"
                        data-aos="zoom-in"
                        data-aos-delay="300"
                    >
                        <div className="text-4xl mb-2">✅</div>
                        <h4 className="font-semibold mb-1">4. Получение авто</h4>
                        <p className="text-gray-600 text-sm">Вы получаете авто, оформленное и проверенное</p>
                    </div>
                </div>
            </section>

            <section className="bg-gray-50 py-16 px-6">
                <h2 data-aos="fade-up" className="text-3xl font-bold text-center mb-10">Примеры автомобилей</h2>
                <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {[
                        "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/0Lexus_ES_300h2.jpg/1200px-0Lexus_ES_300h2.jpg",
                        "https://kazautorent.kz/wp-content/uploads/2024/05/9-1.png",
                        "https://upload.wikimedia.org/wikipedia/commons/8/8b/BMW_5-Series_G38_Li_Facelift_Shishi_01_2022-04-23.jpg",
                        "https://storage.yandexcloud.net/likvi/2024/01/mersedes-s-probegom-1024x782.jpg",
                        "https://cdn.kia.ru/resize/1920x960/media-data/infographic/file/2c68c6a7-55c7-4920-a017-86d6b064ae3b.jpeg",
                        "https://mikado-auto.ru/netcat_files/userfiles/korea_articles/Populyarnye_Hyundai_iz_Korei/5_Tucson.png",
                    ].map((src, i) => (
                        <div
                            key={i}
                            className="overflow-hidden rounded-xl shadow hover:shadow-xl transition"
                            data-aos="zoom-in"
                            data-aos-delay={i * 100}
                        >
                            <img
                                src={src}
                                alt={`Машина ${i + 1}`}
                                className="w-full h-60 object-cover hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                    ))}
                </div>
            </section>

            <section className="py-16 bg-white px-6">
                <h2 data-aos="fade-up" className="text-3xl font-bold text-center mb-10">Отзывы клиентов</h2>
                <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 text-left">
                    <div
                        className="bg-gray-100 p-6 rounded-xl shadow"
                        data-aos="fade-up"
                        data-aos-delay="0"
                    >
                        <p className="text-gray-700 mb-2">“Привезли авто из Кореи за 3 недели, всё как обещали. Спасибо менеджеру за поддержку!”</p>
                        <p className="text-sm font-semibold">— Айбек, Алматы</p>
                    </div>
                    <div
                        className="bg-gray-100 p-6 rounded-xl shadow"
                        data-aos="fade-up"
                        data-aos-delay="100"
                    >
                        <p className="text-gray-700 mb-2">“Отличный сервис! Все прозрачно и удобно — видно, что команда работает честно.”</p>
                        <p className="text-sm font-semibold">— Аружан, Астана</p>
                    </div>
                    <div
                        className="bg-gray-100 p-6 rounded-xl shadow"
                        data-aos="fade-up"
                        data-aos-delay="200"
                    >
                        <p className="text-gray-700 mb-2">“Очень удобно, что можно отслеживать статус и сразу писать менеджеру. Всем советую.”</p>
                        <p className="text-sm font-semibold">— Ермек, Шымкент</p>
                    </div>
                </div>
            </section>

            <section className="bg-blue-50 py-16 px-6">
                <h2 data-aos="fade-up" className="text-3xl font-bold text-center mb-10">
                    Почему выбирают ZhansAutoImport
                </h2>
                <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 text-center">
                    <div data-aos="fade-up" data-aos-delay="0">
                        <div className="text-4xl mb-2">📄</div>
                        <h4 className="font-bold mb-1">Прозрачные условия</h4>
                        <p className="text-gray-600 text-sm">Нет скрытых комиссий — всё чётко и поэтапно</p>
                    </div>
                    <div data-aos="fade-up" data-aos-delay="100">
                        <div className="text-4xl mb-2">🧑‍💼</div>
                        <h4 className="font-bold mb-1">Менеджер всегда на связи</h4>
                        <p className="text-gray-600 text-sm">Мы сопровождаем клиента до получения авто</p>
                    </div>
                    <div data-aos="fade-up" data-aos-delay="200">
                        <div className="text-4xl mb-2">📊</div>
                        <h4 className="font-bold mb-1">Отчётность на каждом этапе</h4>
                        <p className="text-gray-600 text-sm">Вы всегда знаете, что происходит с заказом</p>
                    </div>
                </div>
            </section>




            {/* CTA */}
            <section
                className="mt-16 bg-[url('https://a.d-cd.net/XyeClLqjaio2pyUUTzUNPTgY9uc-1920.jpg')] bg-cover bg-center text-white py-24 px-6 rounded-xl shadow-xl text-center"
                onClick={() => window.location.href = '/cars'}
            >
                <h2 className="text-4xl font-extrabold mb-4 drop-shadow-lg">Выберите своё авто уже сегодня</h2>
                <p className="text-lg mb-6 drop-shadow">Каталог с фильтрами, фото и удобной заявкой</p>
                <span className="inline-block bg-white text-blue-600 px-6 py-2 rounded-full font-bold hover:bg-gray-200 transition">
    Перейти к подбору 🚘
  </span>
            </section>




        </div>
    )
}
