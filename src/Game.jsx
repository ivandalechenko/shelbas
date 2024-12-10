import { useEffect, useRef } from 'react';
import { Application, Assets, Sprite } from 'pixi.js';
import './scss/Game.scss';
import { gameStore } from './gameStore';

export default () => {
    const gameRef = useRef(null);

    useEffect(() => {
        let app
        app = new Application();
        const initGame = async () => {
            await app.init({
                backgroundAlpha: 0,
                width: window.innerWidth,
                height: window.innerHeight
            });
            app.ticker.maxFPS = 60;
            app.ticker.minFPS = 60;
            if (!gameRef.current) return;
            gameRef.current.appendChild(app.canvas);

            const loadAssets = async () => {
                // Загрузка текстур
                const bulletTexture = await Assets.load('/img/bullet.png');
                const logoTexture = await Assets.load('/img/logo.png');

                setup(app, bulletTexture, logoTexture);
            };

            loadAssets();

            let bullets = [];
            let mouseTarget;

            const setup = (app, bulletTexture, logoTexture) => {
                // Создаем область мишени
                mouseTarget = new Sprite(logoTexture);
                mouseTarget.anchor.set(0.5);
                mouseTarget.width = 100;
                mouseTarget.height = 100;
                app.stage.addChild(mouseTarget);

                // Обновляем положение мишени по движению мыши
                // Обновляем положение мишени по движению мыши
                app.stage.interactive = true;

                window.addEventListener('pointermove', (event) => {
                    if (!gameStore.gameOver) {

                        const rect = app.view.getBoundingClientRect();
                        const mouseX = event.clientX - rect.left;
                        const mouseY = event.clientY - rect.top;
                        mouseTarget.position.set(mouseX, mouseY);
                    }
                });


                // Добавляем пулю при нажатии
                app.stage.on('pointerdown', () => {
                    if (gameStore.bullets < 10) {

                        const bullet = new Sprite(bulletTexture);
                        bullet.anchor.set(0.5);

                        let startX = app.screen.width / 2;
                        let startY = app.screen.height / 2;

                        // Проверяем расстояние до курсора
                        const dx = startX - mouseTarget.x;
                        const dy = startY - mouseTarget.y;
                        const distance = Math.sqrt(dx * dx + dy * dy);

                        // Если пуля появляется ближе чем 200 пикселей к курсору, смещаем её
                        if (distance < 200) {
                            const angle = Math.atan2(dy, dx);
                            startX = mouseTarget.x + Math.cos(angle) * 200;
                            startY = mouseTarget.y + Math.sin(angle) * 200;
                        }

                        bullet.x = startX;
                        bullet.y = startY;

                        // Случайное направление
                        bullet.vx = (Math.random() - 0.5) * 10 * (document.body.clientWidth / 1000);
                        bullet.vy = (Math.random() - 0.5) * 10 * (document.body.clientWidth / 1000);

                        // Устанавливаем угол поворота
                        bullet.rotation = Math.atan2(bullet.vy, bullet.vx);

                        bullets.push(bullet);
                        app.stage.addChild(bullet);

                        gameStore.addBullet()
                    }

                });



                app.ticker.add(() => {
                    bullets.forEach((bullet, index) => {
                        bullet.vx *= 1.001
                        bullet.vy *= 1.001
                        bullet.x += bullet.vx;
                        bullet.y += bullet.vy;

                        // Обновляем угол поворота
                        bullet.rotation = Math.atan2(bullet.vy, bullet.vx);

                        // Проверка на столкновение с краями
                        if (bullet.x <= 0 || bullet.x >= app.screen.width) {
                            bullet.vx *= -1;
                        }
                        if (bullet.y <= 0 || bullet.y >= app.screen.height) {
                            bullet.vy *= -1;
                        }

                        // Проверка попадания в мишень
                        const dx = bullet.x - mouseTarget.x;
                        const dy = bullet.y - mouseTarget.y;
                        if (Math.sqrt(dx * dx + dy * dy) < 50) {
                            // Удаление всех пуль
                            bullets.forEach(b => app.stage.removeChild(b));
                            bullets.length = 0;

                            // Удаление мишени
                            app.stage.removeChild(mouseTarget);

                            // Вызов функции поражения
                            gameStore.loose();
                        }
                    });
                });

            };
        }
        initGame()


        return () => {
            // cancelAnimationFrame(animationFrameId);
            if (app) {
                app.destroy(true, { children: true, texture: true, baseTexture: true });
            }
            if (gameRef.current) {
                gameRef.current.innerHTML = '';
            }
        };
    }, []);

    return <div className="Game" ref={gameRef}></div>;
};
