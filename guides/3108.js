// Cursed Antaroth's Abyss
//
// made by HSDN / Yuyuko / Owyn / icebrog

const util = require("util");

module.exports = (dispatch, handlers, guide, lang) => {
	let two_slash_time = 0;
	let blue_sword = false;
	let stack_red = 0;
	let stack_blue = 0;
	let stack_yellow = 0;
	let buff_merciless = false;

	function two_slash_event() {
		const now_time = new Date();

		if ((now_time - two_slash_time) > 1800 && (now_time - two_slash_time) < 2250) {
			handlers.text({ sub_type: "message", message: "Back Stun", message_RU: "Задняя" });
		}

		two_slash_time = now_time;
	}

	function cage_colour_event() {
		const format = `%s: ${stack_red} | %s: ${stack_blue} | %s: ${stack_yellow}`;
		const format_cc = `  [c=#ff7777]%s: ${stack_red}[/c]    [c=#7777ff]%s: ${stack_blue}[/c]    [c=#ffff77]%s: ${stack_yellow}[/c]`;

		handlers.event([
			{
				type: "text",
				sub_type: "message",
				message: util.format(format, "Red", "Blue", "Yellow"),
				message_RU: util.format(format, "Красный", "Синий", "Желтый"),
				speech: false
			},
			{
				type: "text",
				sub_type: "notification",
				message: util.format(format_cc, "Red", "Blue", "Yellow"),
				message_RU: util.format(format_cc, "Красный", "Синий", "Желтый"),
				speech: false
			}
		]);
	}

	return {
		"nd-3108-1000": [
			{ type: "stop_timers" },
			{ type: "despawn_all" }
		],
		"h-3108-1000-64": [{ type: "text", sub_type: "message", message: "64%", message_RU: "64%" }],
		"h-3108-1000-40": [{ type: "text", sub_type: "message", message: "40%", message_RU: "40%" }],

		"ab-3108-1000-40004011": [{ type: "func", func: () => buff_merciless = true }], // resonance 31+ effect

		"s-3108-1000-105-0": [{ type: "text", sub_type: "message", message: "Target Cage", message_RU: "Клетка (таргет)" }],
		"s-3108-1000-107-0": [
			{ type: "text", sub_type: "message", message: "Random Jump", message_RU: "Прыжок (стан)" },
			{ type: "text", sub_type: "message", message: "Spin soon", message_RU: "Скоро круговая", check_func: () => buff_merciless, delay: 1000 }
		],
		"s-3108-1000-107-1": [{ type: "spawn", func: "circle", args: [false, 553, 0, 85, 12, 250, 0, 2000] }],
		"s-3108-1000-113-0": [
			{ type: "text", sub_type: "message", message: "Front | Back Stun", message_RU: "Передний | Задний" },
			{ type: "spawn", func: "circle", args: [true, 553, 0, 325, 12, 325, 0, 2000] },
			{ type: "spawn", func: "circle", args: [true, 553, 0, -325, 12, 325, 500, 2000] },
			{ type: "text", sub_type: "message", message: "Spin soon", message_RU: "Скоро круговая", check_func: () => buff_merciless, delay: 500 }
		],
		"s-3108-1000-115-0": [{ type: "text", sub_type: "message", message: "Spin Attack", message_RU: "Круговая" }],
		"s-3108-1000-131-0": [{ type: "text", sub_type: "message", message: "Front Knockup", message_RU: "Подкид вперед" }],
		"s-3108-1000-120-0": [{ type: "text", sub_type: "message", message: "Energy Beam (Slow)", message_RU: "Волна (медленно)" }],
		"s-3108-1000-122-0": [{ type: "text", sub_type: "message", message: "Energy Beam (Slow)", message_RU: "Волна (медленно)" }],
		"s-3108-1000-204-0": [{ type: "text", sub_type: "message", message: "Energy Beam (Fast)", message_RU: "Волна (быстро)" }],
		"s-3108-1000-309-0": [{ type: "text", sub_type: "message", message: "AoE", message_RU: "АоЕ" }],
		"s-3108-1000-310-0": [{ type: "text", sub_type: "message", message: "Puddles", message_RU: "Лужи" }],
		"s-3108-1000-311-0": "s-3108-1000-310-0",
		"s-3108-1000-312-0": "s-3108-1000-310-0",
		"s-3108-1000-313-0": "s-3108-1000-310-0",
		"s-3108-1000-314-0": "s-3108-1000-310-0",
		"s-3108-1000-315-0": [{ type: "text", sub_type: "message", message: "Pushback (Kaia)", message_RU: "Откид (кайа)" }],
		"s-3108-1000-400-0": [{ type: "text", sub_type: "message", message: "Clones: Beam", message_RU: "Копии: волны" }],
		"s-3108-1000-401-0": [{ type: "text", sub_type: "message", message: "Clones: Spin", message_RU: "Копии: круговые" }],

		// Back stun mech
		"s-3108-1000-104-0": [{ type: "func", func: two_slash_event }],
		"s-3108-1000-119-0": [
			{ type: "spawn", func: "circle", args: [true, 553, 0, -325, 12, 325, 0, 2000] },
			{ type: "text", sub_type: "message", message: "Spin soon", message_RU: "Скоро круговая", check_func: () => buff_merciless, delay: 500 }
		],

		// Waves mech
		"s-3108-1000-201-0": [{ type: "func", func: () => blue_sword = false }],
		"s-3108-1000-207-0": [{ type: "func", func: () => blue_sword = true }],
		"s-3108-1000-109-0": [
			{ type: "text", sub_type: "message", message: "Left", message_RU: "Лево" },
			{ type: "text", sub_type: "message", message: "Inward (In > Out)", message_RU: "Внутрь (к нему > от него)", check_func: () => !blue_sword, delay: 1000 },
			{ type: "text", sub_type: "message", message: "Unstable (In > In > Mid)", message_RU: "Двойные (к нему > к нему > середина)", check_func: () => blue_sword, delay: 1000 },
			{ type: "spawn", func: "vector", args: [553, 0, 0, 180, 500, 0, 1500] },
			{ type: "spawn", func: "vector", args: [553, 0, 0, 0, 500, 0, 1500] },
			{ type: "spawn", func: "semicircle", args: [0, 180, 912, 0, 0, 20, 160, 0, 1500] },
			{ type: "spawn", func: "semicircle", args: [0, 180, 912, 0, 0, 12, 220, 0, 1500] },
			{ type: "spawn", func: "semicircle", args: [0, 180, 912, 0, 0, 10, 300, 0, 1500] },
			{ type: "spawn", func: "semicircle", args: [0, 180, 912, 0, 0, 8, 360, 0, 1500] },
			{ type: "spawn", func: "marker", args: [false, 270, 300, 0, 1500, true, null] },
			{ type: "spawn", func: "circle", args: [false, 445, 0, 0, 18, 157, 1500, 4000] },
			{ type: "spawn", func: "circle", args: [false, 445, 0, 0, 12, 307, 1500, 4000] }
		],
		"s-3108-1000-111-0": [
			{ type: "text", sub_type: "message", message: "Right", message_RU: "Право" },
			{ type: "text", sub_type: "message", message: "Outward (Out > In)", message_RU: "Наружу (от него > к нему)", check_func: () => !blue_sword, delay: 1000 },
			{ type: "text", sub_type: "message", message: "Unstable (Mid > In > Mid)", message_RU: "Двойные (середина > к нему > середина)", check_func: () => blue_sword, delay: 1000 },
			{ type: "spawn", func: "vector", args: [553, 0, 0, 180, 500, 0, 1500] },
			{ type: "spawn", func: "vector", args: [553, 0, 0, 0, 500, 0, 1500] },
			{ type: "spawn", func: "semicircle", args: [180, 360, 912, 0, 0, 20, 160, 0, 1500] },
			{ type: "spawn", func: "semicircle", args: [180, 360, 912, 0, 0, 12, 220, 0, 1500] },
			{ type: "spawn", func: "semicircle", args: [180, 360, 912, 0, 0, 10, 300, 0, 1500] },
			{ type: "spawn", func: "semicircle", args: [180, 360, 912, 0, 0, 8, 360, 0, 1500] },
			{ type: "spawn", func: "marker", args: [false, 90, 300, 0, 1500, true, null] },
			{ type: "spawn", func: "circle", args: [false, 445, 0, 0, 18, 157, 1500, 4000] },
			{ type: "spawn", func: "circle", args: [false, 445, 0, 0, 12, 307, 1500, 4000] }
		],

		// Orbs mech
		"s-3108-1000-206-0": [{ type: "text", sub_type: "message", message: "Orbs", message_RU: "Шары" }],
		"s-3108-1000-320-0": [
			{ type: "text", sub_type: "message", message: "Left: Blue | Right: Red", message_RU: "Лево: синий | Право: красный" },
			{ type: "spawn", func: "marker", args: [false, 90, 300, 0, 6000, "red", null] },
			{ type: "spawn", func: "marker", args: [false, 270, 300, 0, 6000, "purple", null] },
			{ type: "spawn", func: "vector", args: [553, 0, 0, 180, 500, 0, 6000] },
			{ type: "spawn", func: "vector", args: [553, 0, 0, 0, 500, 0, 6000] }
		],
		"s-3108-1000-321-0": [
			{ type: "text", sub_type: "message", message: "Left: Red | Right: Blue", message_RU: "Лево: красный | Право: синий" },
			{ type: "spawn", func: "marker", args: [false, 270, 300, 0, 6000, "red", null] },
			{ type: "spawn", func: "marker", args: [false, 90, 300, 0, 6000, "purple", null] },
			{ type: "spawn", func: "vector", args: [553, 0, 0, 180, 500, 0, 6000] },
			{ type: "spawn", func: "vector", args: [553, 0, 0, 0, 500, 0, 6000] }
		],

		// Pushback mech
		"ab-3108-1000-31083063-1": [{ type: "text", sub_type: "notification", message: "Stack 1", message_RU: "Стак 1" }],
		"ab-3108-1000-31083063-2": [{ type: "text", sub_type: "notification", message: "Stack 2", message_RU: "Стак 2" }],
		"ab-3108-1000-31083063-3": [{ type: "text", sub_type: "notification", message: "Stack 3", message_RU: "Стак 3" }],
		"ab-3108-1000-31083064": [
			{ type: "text", sub_type: "notification", message: "Charged", message_RU: "Заряжен", speech: false },
			{ type: "text", sub_type: "alert", message: "Pushback soon", message_RU: "Скоро откид" }
		],
		"s-3108-1000-209-0": [{ type: "text", sub_type: "message", message: "Dodge!", message_RU: "Эвейд!", delay: 500 }],
		"s-3108-1000-211-0": "s-3108-1000-209-0",

		// Cage mech
		"qb-3108-1000-31083002": [{ type: "text", sub_type: "message", message: "Cage", message_RU: "Клетка" }],
		"s-3108-1000-317-0": [
			{ type: "func", func: cage_colour_event, delay: 100 },
			{ type: "func", func: cage_colour_event, delay: 3750 },
			{ type: "func", func: cage_colour_event, delay: 7500 }
		],
		"s-3108-1000-318-0": "s-3108-1000-317-0",
		"ab-3108-1000-31083070-8": [{ type: "func", func: () => stack_red = 8 }],
		"ab-3108-1000-31083070-7": [{ type: "func", func: () => stack_red = 7 }],
		"ab-3108-1000-31083070-6": [{ type: "func", func: () => stack_red = 6 }],
		"ab-3108-1000-31083070-5": [{ type: "func", func: () => stack_red = 5 }],
		"ab-3108-1000-31083070-4": [{ type: "func", func: () => stack_red = 4 }],
		"ab-3108-1000-31083070-3": [{ type: "func", func: () => stack_red = 3 }],
		"ab-3108-1000-31083070-2": [{ type: "func", func: () => stack_red = 2 }],
		"ab-3108-1000-31083070-1": [{ type: "func", func: () => stack_red = 1 }],
		"ad-3108-1000-31083070": [{ type: "func", func: () => stack_red = 0 }],
		"ab-3108-1000-31083071-8": [{ type: "func", func: () => stack_yellow = 8 }],
		"ab-3108-1000-31083071-7": [{ type: "func", func: () => stack_yellow = 7 }],
		"ab-3108-1000-31083071-6": [{ type: "func", func: () => stack_yellow = 6 }],
		"ab-3108-1000-31083071-5": [{ type: "func", func: () => stack_yellow = 5 }],
		"ab-3108-1000-31083071-4": [{ type: "func", func: () => stack_yellow = 4 }],
		"ab-3108-1000-31083071-3": [{ type: "func", func: () => stack_yellow = 3 }],
		"ab-3108-1000-31083071-2": [{ type: "func", func: () => stack_yellow = 2 }],
		"ab-3108-1000-31083071-1": [{ type: "func", func: () => stack_yellow = 1 }],
		"ad-3108-1000-31083071": [{ type: "func", func: () => stack_yellow = 0 }],
		"ab-3108-1000-31083072-8": [{ type: "func", func: () => stack_blue = 8 }],
		"ab-3108-1000-31083072-7": [{ type: "func", func: () => stack_blue = 7 }],
		"ab-3108-1000-31083072-6": [{ type: "func", func: () => stack_blue = 6 }],
		"ab-3108-1000-31083072-5": [{ type: "func", func: () => stack_blue = 5 }],
		"ab-3108-1000-31083072-4": [{ type: "func", func: () => stack_blue = 4 }],
		"ab-3108-1000-31083072-3": [{ type: "func", func: () => stack_blue = 3 }],
		"ab-3108-1000-31083072-2": [{ type: "func", func: () => stack_blue = 2 }],
		"ab-3108-1000-31083072-1": [{ type: "func", func: () => stack_blue = 1 }],
		"ad-3108-1000-31083072": [{ type: "func", func: () => stack_blue = 0 }]
	};
};
