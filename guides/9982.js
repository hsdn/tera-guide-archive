// Grotto of Lost Souls (Hard)
//
// made by michengs / HSDN

module.exports = (dispatch, handlers, guide, lang) => {

	let color = 0;
	let debuff = 0;
	let print_wave = true;
	let awakening_one = false;
	let awakening_two = false;
	let stack_level = 0;

	function stacks_level_event() {
		if (!awakening_one) return;

		stack_level++;

		if ((!awakening_two && stack_level > 0) || (awakening_two && stack_level > 2)) {
			handlers.text({
				sub_type: "notification",
				message: `Stack ${stack_level}`,
				message_RU: `Стак ${stack_level}`,
				speech: false
			});
		}

		if (stack_level === 4) {
			handlers.text({
				sub_type: "alert",
				message: "Explosion soon",
				message_RU: "Скоро взрыв"
			});
		}
	}

	return {
		// 1 BOSS
		"nd-982-1000": [
			{ type: "stop_timers" },
			{ type: "despawn_all" }
		],
		"s-982-1000-106-0": [{ type: "text", class_position: "tank", sub_type: "message", message: "Heavy", message_RU: "Тяжелый удар" }],
		"s-982-1000-107-0": [
			{ type: "text", class_position: "dps", sub_type: "message", message: "Pushback", message_RU: "Откид назад" },
			{ type: "text", class_position: "heal", sub_type: "message", message: "Pushback (Kaia)", message_RU: "Откид назад (кайа)" },
			{ type: "spawn", func: "vector", args: [553, 90, 30, 140, 600, 1000, 2000] },
			{ type: "spawn", func: "vector", args: [553, 270, 30, -140, 600, 1000, 2000] }
		],
		"s-982-1000-108-0": [
			{ type: "text", sub_type: "message", message: "Bait Front (Flying)", message_RU: "Байт вперед (подлет)" }
		],
		"s-982-1000-108-1": [
			{ type: "spawn", func: "vector", args: [553, 90, 140, 5, 620, 0, 1500] },
			{ type: "spawn", func: "vector", args: [553, 270, 140, 355, 620, 0, 1500] }
		],
		"s-982-1000-109-0": [{ type: "text", sub_type: "message", message: "Rocks (Small)", message_RU: "Камни (малые)" }],
		"s-982-1000-110-0": [{ type: "text", sub_type: "message", message: "Rocks (Large)", message_RU: "Камни (большие)" }],
		"s-982-1000-111-0": [
			{ type: "text", sub_type: "message", message: "Stun (Dodge)", message_RU: "Стан (эвейд)", delay: 1500 },
			{ type: "spawn", func: "circle", args: [true, 553, 180, 50, null, 350, 1500, 2000] }
		],
		"s-982-1000-113-0": [{ type: "text", sub_type: "message", message: "Thorns (Bleed)", message_RU: "Колючки (кровоток)" }],
		"s-982-1000-116-0": [
			{ type: "text", sub_type: "message", message: "AoE", message_RU: "АоЕ" },
			{ type: "text", sub_type: "message", message: "Dodge", message_RU: "Эвейд", delay: 2000 }
		],
		"s-982-1000-301-0": [
			{ type: "text", sub_type: "message", message: "Flower Stuns", message_RU: "Оглушающие цветы" },
			{ type: "text", sub_type: "message", message: "Dodge", message_RU: "Эвейд", delay: 2000 }
		],
		"s-982-1000-307-0": [{ type: "text", sub_type: "message", message: "Cage (Don't move)", message_RU: "Клетка (не двигаться)" }],
		// Flowers mech
		"ab-982-1003-98200161": [
			{ type: "text", sub_type: "message", message: "Green", message_RU: "Зеленый" },
			{ type: "func", func: () => color = 1 }
		],
		"ab-982-1003-98200162": [
			{ type: "text", sub_type: "message", message: "Violet", message_RU: "Фиолетовый" },
			{ type: "func", func: () => color = 2 }
		],
		"ae-0-0-98200148": [{ type: "func", func: () => debuff = 1 }], // green
		"ae-0-0-98200149": [{ type: "func", func: () => debuff = 2 }], // violet
		"s-982-1000-201-0": [{ type: "text", sub_type: "alert", message: "Change Debuff", message_RU: "Сменить дебаф", check_func: () => debuff !== 0 && color !== debuff, delay: 5000 }],
		"s-982-1000-309-0": [
			{ type: "text", sub_type: "message", message: "One Flower", message_RU: "Один цветок" },
			{ type: "text", sub_type: "alert", message: "Dodge the flower!", message_RU: "Заэвейдить цветок!", check_func: () => color === debuff, delay: 1500 }
		],
		"s-982-1000-310-0": [
			{ type: "text", sub_type: "message", message: "Two Flowers", message_RU: "Два цветка" },
			{ type: "text", sub_type: "alert", message: "Dodge ONE flower!", message_RU: "Заэвейдить один цветок!", check_func: () => color !== debuff, delay: 1500 }
		],
		"s-982-1000-312-0": [
			{ type: "text", sub_type: "message", message: "Break Golden Flower", message_RU: "Разбить золотой цветок" },
			{ type: "text", sub_type: "alert", message: "Dodge the Flower!", message_RU: "Заэвейдить цветок!", check_func: () => color === debuff, delay: 1500 }
		],
		"s-982-1000-308-0": [
			{ type: "func", func: () => color = 0 },
			{ type: "func", func: () => debuff = 0 }
		],

		// 2 BOSS
		"nd-982-2000": [
			{ type: "stop_timers" },
			{ type: "despawn_all" }
		],
		"s-982-2000-105-0": [{ type: "text", sub_type: "message", message: "Spin", message_RU: "Кувырок" }],
		"s-982-2000-108-0": [{ type: "text", sub_type: "message", message: "Shot Forward", message_RU: "Выстрел вперед" }],
		"s-982-2000-109-0": [{ type: "text", sub_type: "message", message: "Wave Forward", message_RU: "Волна вперед" }],
		"s-982-2000-112-0": [{ type: "text", sub_type: "message", message: "Kick Forward", message_RU: "Удар вперед" }],
		"s-982-2000-113-0": [
			{ type: "text", sub_type: "message", message: "Stun (AoE)", message_RU: "Стан (АоЕ)" },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, null, 310, 0, 3000] }
		],
		"s-982-2000-114-0": [
			{ type: "text", sub_type: "message", message: "Get In", message_RU: "К нему" },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, null, 260, 0, 5000] },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, null, 600, 0, 5000] }
		],
		"s-982-2000-116-0": [
			{ type: "text", sub_type: "message", message: "Front | Back", message_RU: "Передняя | Задняя" },
			{ type: "spawn", func: "vector", args: [553, 0, 0, 270, 500, 0, 5000] },
			{ type: "spawn", func: "vector", args: [553, 180, 0, 90, 500, 0, 5000] }
		],
		"s-982-2000-117-0": "s-982-2000-116-0",
		"s-982-2000-301-0": [
			{ type: "text", sub_type: "message", message: "Get Out | Dodge", message_RU: "От него | Эвейд" },
			{ type: "text", sub_type: "message", message: "Dodge", message_RU: "Эвейд", delay: 3700 },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, null, 260, 0, 3000] },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, null, 650, 0, 3000] }
		],
		"s-982-2000-302-0": [
			{ type: "text", sub_type: "message", message: "Get In | Dodge", message_RU: "К нему | Эвейд" },
			{ type: "text", sub_type: "message", message: "Dodge", message_RU: "Эвейд", delay: 3700 },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, null, 260, 0, 3000] },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, null, 650, 0, 3000] }
		],
		"s-982-2000-307-0": [{ type: "text", sub_type: "message", message: "Target", message_RU: "Таргет" }],
		"s-982-2000-307-2": [{ type: "text", sub_type: "message", message: "Dodge", message_RU: "Эвейд" }],

		// 3 BOSS
		"nd-982-3000": [
			{ type: "stop_timers" },
			{ type: "despawn_all" }
		],
		"h-982-3000-99": [
			{ type: "func", func: () => print_wave = true },
			{ type: "func", func: () => awakening_one = false },
			{ type: "func", func: () => awakening_two = false },
			{ type: "func", func: () => stack_level = 0 }
		],
		"h-982-3000-80": [{ type: "text", sub_type: "message", message: "80%", message_RU: "80%" }],
		"h-982-3000-30": [{ type: "text", sub_type: "message", message: "30%", message_RU: "30%" }],
		"s-982-3000-109-0": [{ type: "text", sub_type: "message", message: "Front Throw (Target)", message_RU: "Удар вперед (таргет)" }],
		"s-982-3000-134-0": [{ type: "text", sub_type: "message", message: "Front Throw (Target)", message_RU: "Удар вперед (таргет)" }],
		"s-982-3000-118-0": [{ type: "text", sub_type: "message", message: "Front Triple", message_RU: "Передняя комба" }],
		"s-982-3000-143-0": [
			{ type: "text", sub_type: "message", message: "Left Rear", message_RU: "Слева сзади" },
			{ type: "spawn", func: "circle", args: [true, 553, 200, 330, null, 280, 0, 3000] }
		],
		"s-982-3000-145-0": "s-982-3000-143-0",
		"s-982-3000-144-0": [
			{ type: "text", sub_type: "message", message: "Right Rear", message_RU: "Справа сзади" },
			{ type: "spawn", func: "circle", args: [true, 553, 160, 330, null, 280, 0, 3000] }
		],
		"s-982-3000-147-0": "s-982-3000-144-0",
		"s-982-3000-146-0": [
			{ type: "text", sub_type: "message", message: "Pulses Left", message_RU: "Бублики слева" },
			{ type: "spawn", func: "circle", args: [true, 553, 200, 350, null, 280, 500, 2000] },
			{ type: "spawn", func: "marker", args: [false, 215, 370, 5300, 3000, true, null] }, // 1
			{ type: "spawn", func: "circle", args: [false, 445, 215, 370, 15, 160, 2000, 6000] },
			{ type: "spawn", func: "circle", args: [false, 445, 215, 370, 12, 320, 2000, 6000] },
			{ type: "spawn", func: "circle", args: [false, 445, 215, 370, 10, 480, 2000, 6000] },
			{ type: "spawn", func: "circle", args: [false, 445, 215, 370, 8, 640, 2000, 6000] },
			{ type: "spawn", func: "circle", args: [false, 445, 215, 370, 6, 800, 2000, 6000] }
		],
		"s-982-3000-154-0": [
			{ type: "text", sub_type: "message", message: "Pulses Left", message_RU: "Бублики слева" },
			{ type: "spawn", func: "circle", args: [true, 553, 200, 350, null, 280, 500, 2000] },
			{ type: "spawn", func: "marker", args: [false, 215, 370, 4200, 4000, true, null] }, // 2
			{ type: "spawn", func: "circle", args: [false, 445, 215, 370, 15, 160, 2000, 6000] },
			{ type: "spawn", func: "circle", args: [false, 445, 215, 370, 12, 320, 2000, 6000] },
			{ type: "spawn", func: "circle", args: [false, 445, 215, 370, 10, 480, 2000, 6000] },
			{ type: "spawn", func: "circle", args: [false, 445, 215, 370, 8, 640, 2000, 6000] },
			{ type: "spawn", func: "circle", args: [false, 445, 215, 370, 6, 800, 2000, 6000] }
		],
		"s-982-3000-148-0": [
			{ type: "text", sub_type: "message", message: "Pulses Right", message_RU: "Бублики справа" },
			{ type: "spawn", func: "circle", args: [true, 553, 160, 350, null, 280, 500, 2000] },
			{ type: "spawn", func: "marker", args: [false, 155, 388, 5300, 3000, true, null] }, // 1
			{ type: "spawn", func: "circle", args: [false, 445, 155, 388, 15, 160, 2000, 6000] },
			{ type: "spawn", func: "circle", args: [false, 445, 155, 388, 12, 320, 2000, 6000] },
			{ type: "spawn", func: "circle", args: [false, 445, 155, 388, 10, 480, 2000, 6000] },
			{ type: "spawn", func: "circle", args: [false, 445, 155, 388, 8, 640, 2000, 6000] },
			{ type: "spawn", func: "circle", args: [false, 445, 155, 388, 6, 800, 2000, 6000] }
		],
		"s-982-3000-155-0": [
			{ type: "text", sub_type: "message", message: "Pulses Right", message_RU: "Бублики справа" },
			{ type: "spawn", func: "circle", args: [true, 553, 160, 350, null, 280, 500, 2000] },
			{ type: "spawn", func: "marker", args: [false, 155, 388, 4200, 4000, true, null] }, // 2
			{ type: "spawn", func: "circle", args: [false, 445, 155, 388, 15, 160, 2000, 6000] },
			{ type: "spawn", func: "circle", args: [false, 445, 155, 388, 12, 320, 2000, 6000] },
			{ type: "spawn", func: "circle", args: [false, 445, 155, 388, 10, 480, 2000, 6000] },
			{ type: "spawn", func: "circle", args: [false, 445, 155, 388, 8, 640, 2000, 6000] },
			{ type: "spawn", func: "circle", args: [false, 445, 155, 388, 6, 800, 2000, 6000] }
		],
		"s-982-3000-161-0": [
			{ type: "text", sub_type: "message", message: "Front | Back", message_RU: "Вперед | Назад" },
			{ type: "spawn", func: "circle", args: [true, 553, 180, 310, null, 290, 3000, 2500] }
		],
		"s-982-3000-162-0": [
			{ type: "text", sub_type: "message", message: "Front | Back", message_RU: "Вперед | Назад" },
			{ type: "spawn", func: "circle", args: [true, 553, 180, 310, null, 290, 3000, 2500] }
		],
		"s-982-3000-213-0": [{ type: "text", sub_type: "message", message: "Tail", message_RU: "Хвост" }],
		"s-982-3000-215-0": [{ type: "text", sub_type: "message", message: "Tail (Combo)", message_RU: "Хвост (комба)" }],
		"s-982-3000-139-0": [
			{ type: "text", sub_type: "message", message: "Wave + Wing (Left Safe)", message_RU: "Волна (лево сейф)", check_func: () => print_wave },
			{ type: "despawn_all", tag: "wave" },
			{ type: "spawn", func: "vector", args: [912, 90, 0, 0, 600, 100, 3000], tag: "wave" },
			{ type: "spawn", func: "vector", args: [912, 270, 0, 180, 600, 100, 3000], tag: "wave" },
			{ type: "spawn", func: "marker", args: [false, 270, 200, 100, 4000, true, null], tag: "wave" },
			{ type: "func", func: () => print_wave = false },
			{ type: "func", func: () => print_wave = true, delay: 8000 }
		],
		"s-982-3000-139-1": "s-982-3000-139-0",
		"s-982-3000-139-2": "s-982-3000-139-0",
		"s-982-3000-150-0": "s-982-3000-139-0", //
		"s-982-3000-150-1": "s-982-3000-139-0",
		"s-982-3000-150-2": "s-982-3000-139-0",
		"s-982-3000-141-0": [
			{ type: "text", sub_type: "message", message: "Wave + Wing (Right Safe)", message_RU: "Волна (право сейф)", check_func: () => print_wave },
			{ type: "despawn_all", tag: "wave" },
			{ type: "spawn", func: "vector", args: [912, 90, 0, 0, 600, 100, 3000], tag: "wave" },
			{ type: "spawn", func: "vector", args: [912, 270, 0, 180, 600, 100, 3000], tag: "wave" },
			{ type: "spawn", func: "marker", args: [false, 90, 200, 100, 4000, true, null], tag: "wave" },
			{ type: "func", func: () => print_wave = false },
			{ type: "func", func: () => print_wave = true, delay: 8000 }
		],
		"s-982-3000-141-1": "s-982-3000-141-0",
		"s-982-3000-141-2": "s-982-3000-141-0",
		"s-982-3000-152-0": "s-982-3000-141-0", //
		"s-982-3000-152-1": "s-982-3000-141-0",
		"s-982-3000-152-2": "s-982-3000-141-0",
		"s-982-3000-300-0": [
			{ type: "text", sub_type: "message", message: "Dodge! (Awakening 1)", message_RU: "Эвейд! (Пробуждение 1)", delay: 800 }, // <80%
			{ type: "func", func: () => awakening_one = true },
			{ type: "func", func: () => stack_level = 0 }
		],
		"s-982-3000-399-0": [
			{ type: "text", sub_type: "message", message: "Dodge! (Awakening 2)", message_RU: "Эвейд! (Пробуждение 2)", delay: 1400 }, // <30%
			{ type: "func", func: () => awakening_two = true },
			{ type: "func", func: () => stack_level = 0 }
		],
		"s-982-3000-360-0": [
			{ type: "text", sub_type: "message", message: "Dodge! (Explosion)", message_RU: "Эвейд! (взрыв)" },
			{ type: "func", func: () => stack_level = 0 }
		],
		"ab-982-3000-98200399": [{ type: "func", func: stacks_level_event }],
		"s-982-3000-351-0": [
			{ type: "text", sub_type: "message", message: "Stones", message_RU: "Камни" },
			{ type: "text", sub_type: "message", message: "Dodge", message_RU: "Эвейд", delay: 2000 },
			{ type: "text", sub_type: "message", message: "Line up to the plate", message_RU: "Выстроиться к плите", delay: 4000 },
			{ type: "text", sub_type: "message", message: "Kaia!", message_RU: "Кайа!", delay: 9500 }
		],
		"s-982-3011-352-0": [
			{ type: "text", sub_type: "message", message: "Break Sphere", message_RU: "Разбить сферу", check_func: () => !awakening_two },
			{ type: "text", sub_type: "message", message: "Break Three Spheres", message_RU: "Разбить три сферы", check_func: () => awakening_two }
		],
		"s-982-3012-353-0": "s-982-3011-352-0"
	};
};