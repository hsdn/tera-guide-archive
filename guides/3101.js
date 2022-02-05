// Gossamer Vault
//
// made by michengs / Emilia-s2

module.exports = (dispatch, handlers, guide, lang) => {
	return {
		// 1 BOSS
		"nd-3101-1000": [
			{ type: "stop_timers" },
			{ type: "despawn_all" }
		],
		"s-3101-1000-104-0": [{ type: "text", class_position: "tank", sub_type: "message", message: "Stun Frontal", message_RU: "Стан (танк)" }],
		"s-3101-1000-112-0": [{ type: "text", sub_type: "message", message: "Left + Right", message_RU: "Лево + Право" }],
		"s-3101-1000-139-0": [
			{ type: "text", sub_type: "message", message: "Back + Front (Fast)", message_RU: "Вперед + Назад (фаст)" },
			{ type: "spawn", func: "vector", args: [553, 2, 0, 70, 800, 0, 2500] },
			{ type: "spawn", func: "vector", args: [553, 2, 0, 110, 800, 0, 2500] },
			{ type: "spawn", func: "vector", args: [553, 2, 0, 250, 800, 0, 2500] },
			{ type: "spawn", func: "vector", args: [553, 2, 0, 290, 800, 0, 2500] }
		],
		"s-3101-1000-124-0": [{ type: "text", class_position: "tank", sub_type: "message", message: "Stun Frontal", message_RU: "Стан (танк)" }],
		"s-3101-1000-127-0": [
			{ type: "text", sub_type: "message", message: "Back (Fast)", message_RU: "Полоса (фаст)" },
			{ type: "spawn", func: "vector", args: [553, 90, 139, 173, 800, 0, 2000] },
			{ type: "spawn", func: "vector", args: [553, 270, 139, -173, 800, 0, 2000] }
		],
		"s-3101-1000-131-0": [
			{ type: "text", sub_type: "message", message: "Back Wave (Fast)", message_RU: "Волна назад (фаст)" },
			{ type: "spawn", func: "vector", args: [553, 0, 100, 112, 800, 0, 2000] },
			{ type: "spawn", func: "vector", args: [553, 0, 100, -112, 800, 0, 2000] }
		],
		"s-3101-1000-132-0": [{ type: "text", sub_type: "message", message: "Left + Right (Fast)", message_RU: "Лево + Право (фаст)" }],
		"s-3101-1000-133-0": [
			{ type: "text", sub_type: "message", message: "Jump (Fast)", message_RU: "Прыжок (фаст)" },
			{ type: "text", sub_type: "message", delay: 1400, message: "Dodge!", message_RU: "Эвейд!" }
		],
		"s-3101-1000-138-0": [
			{ type: "text", sub_type: "message", message: "Jump P (Fast)", message_RU: "Прыжок (фаст)" },
			{ type: "text", sub_type: "message", delay: 1400, message: "Dodge!", message_RU: "Эвейд!" }
		],
		"s-3101-1000-148-0": [
			{ type: "text", sub_type: "message", message: "Right Hand (Flying)", message_RU: "Правая рука (подлет)" },
			{ type: "spawn", func: "circle", args: [false, 553, 20, 150, 10, 320, 0, 4000] }
		],
		"s-3101-1000-149-0": [
			{ type: "text", sub_type: "message", message: "Left Hand (Flying)", message_RU: "Левая рука (подлет)" },
			{ type: "spawn", func: "circle", args: [false, 553, 340, 150, 10, 320, 0, 4000] }
		],
		"s-3101-1000-151-0": [{ type: "text", sub_type: "message", message: "Stun Attack!", message_RU: "Стан!" }],
		"s-3101-1000-313-0": [
			{ type: "text", sub_type: "message", message: "Circles (Slow)", message_RU: "Кольцо" },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 75, 10, 300, 0, 6000] }
		],
		"s-3101-1000-314-0": [
			{ type: "text", sub_type: "message", message: "Circles (Fast)", message_RU: "Кольцо (фаст)" },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 75, 10, 300, 0, 6000] }
		],

		// 2 BOSS
		"nd-3101-2000": [
			{ type: "stop_timers" },
			{ type: "despawn_all" }
		],
		"s-3101-2000-108-0": [{ type: "text", sub_type: "message", message: "Back Attack!", message_RU: "Откид назад!" }],
		"s-3101-2000-150-0": [{ type: "text", sub_type: "message", message: "Phantom", message_RU: "Фантом" }],
		"s-3101-2000-228-0": [{ type: "text", sub_type: "message", message: "Team Up", message_RU: "Камни (вместе)!" }],
		"s-3101-2000-230-0": [
			{ type: "text", sub_type: "message", message: "AOE", message_RU: "АОЕ" },
			{ type: "text", sub_type: "message", delay: 1300, message: "Dodge!", message_RU: "Эвейд!" }
		],
		"s-3101-2000-231-0": [
			{ type: "text", sub_type: "message", message: "Out Safe", message_RU: "От него" },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, 10, 300, 0, 3000] }
		],
		"s-3101-2000-232-0": [
			{ type: "text", sub_type: "message", message: "In Safe", message_RU: "К нему" },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, 10, 300, 0, 3000] },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, 3, 1000, 0, 3000] }
		],
		"s-3101-2000-235-0": [{ type: "text", sub_type: "message", message: "Debuffs", message_RU: "Дебаффы" }],
		"s-3101-2000-236-0": [{ type: "text", sub_type: "message", message: "Counter Attack (Bait)", message_RU: "Конус вперед (байт)" }]
	};
};