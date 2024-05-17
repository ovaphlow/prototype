const races = [
    {
        en: "Human",
        zhCN: "人类",
        image:
            "https://bg3.wiki/w/images/thumb/6/6c/Race_Human.png/100px-Race_Human.png",
        speed: "9m",
        weapon: ["Spears", "Pikes", "Halberds", "Glaives"],
        armour: ["轻甲", "盾"],
    },
    {
        en: "Elf",
        zhCN: "精灵",
        image:
            "https://bg3.wiki/w/images/thumb/e/ec/Race_Elf.png/100px-Race_Elf.png",
        weapon: ["Shortswords", "Longswords", "Shortbows", "Longbows"],
        subraces: [
            {
                en: "High Elf",
                zhCN: "高等精灵",
                speed: "9m",
            },
            {
                en: "Wood Elf",
                zhCN: "木精灵",
                speed: "10.5m",
            },
        ],
    },
    {
        en: "Drow",
        zhCN: "卓尔",
        image:
            "https://bg3.wiki/w/images/thumb/1/1a/Race_Drow.png/100px-Race_Drow.png",
        speed: "9m",
        weapon: ["Rapiers", "Shortswords", "Hand Crossbows"],
        skills: ["Perception"],
        subraces: [
            {
                en: "Lolth-Sworn Drow",
                zhCN: "萝丝卓尔",
            },
            {
                en: "Seldaing Drow",
                zhCN: "席尔达琳卓尔",
            },
        ],
    },
    {
        en: "Half-Elf",
        zhCN: "半精灵",
        image:
            "https://bg3.wiki/w/images/thumb/d/dd/Race_Half-Elf.png/100px-Race_Half-Elf.png",
        weapon: ["Spears", "Pikes", "Halberds", "Glaives"],
        armour: ["轻甲"],
        subraces: [
            {
                en: "High Half-Elf",
                zhCN: "半高精灵",
                speed: "9m",
            },
            {
                en: "Wood Half-Elf",
                zhCN: "半木精灵",
                speed: "10.5m",
            },
            {
                en: "Drow Half-Elf",
                zhCN: "半卓尔精灵",
                speed: "9m",
            },
        ],
    },
    {
        en: "Half-Orc",
        zhCN: "半兽人",
        image:
            "https://bg3.wiki/w/images/thumb/a/ad/Race_Half-Orc.png/100px-Race_Half-Orc.png",
        speed: "9m",
    },
    {
        en: "Halfling",
        zhCN: "半身人",
        image:
            "https://bg3.wiki/w/images/thumb/3/35/Race_Halfling.png/100px-Race_Halfling.png",
        speed: "7.5m",
        subraces: [
            {
                en: "Lightfoot Halfling",
                zhCN: "轻足半身人",
            },
            {
                en: "Strongheart Halfling",
                zhCN: "半身人",
            },
        ],
    },
    {
        en: "Dwarf",
        zhCN: "矮人",
        image:
            "https://bg3.wiki/w/images/thumb/d/d3/Race_Dwarf.png/100px-Race_Dwarf.png",
        speed: "7.5m",
        weapons: ["Battleaxes", "Handaxes", "Light Hammers", "Warhammers"],
        subraces: [
            {
                en: "Gold Dwarf",
                zhCN: "黄金矮人",
            },
            {
                en: "Shield Dwarf",
                zhCN: "盾矮人",
                armours: ["轻甲", "中甲"],
            },
            {
                en: "Duergar",
                zhCN: "灰矮人",
            },
        ],
    },
    {
        en: "Gnome",
        zhCN: "侏儒",
        image:
            "https://bg3.wiki/w/images/thumb/c/cd/Race_Gnome.png/100px-Race_Gnome.png",
        speed: "7.5m",
        subraces: [
            {
                en: "Forest Gnome",
                zhCN: "森林侏儒",
            },
            {
                en: "Deep Gnome",
                zhCN: "地底侏儒",
            },
            {
                en: "Rock Gnome",
                zhCN: "岩石侏儒",
                skills: [],
            },
        ],
    },
    {
        en: "Tiefling",
        zhCN: "提夫林",
        image:
            "https://bg3.wiki/w/images/thumb/6/66/Race_Tiefling.png/100px-Race_Tiefling.png",
        speed: "9m",
        subraces: [
            {
                en: "Asmodeus Tiefling",
                zhCN: "阿斯莫德提夫林",
            },
            {
                en: "Mephistopheises Tiefling",
                zhCN: "梅菲斯托菲提夫林",
            },
            {
                en: "Zariel Tiefling",
                zhCN: "扎瑞尔提夫林",
            },
        ],
    },
    {
        en: "Githyanki",
        zhCN: "吉斯洋基人",
        image:
            "https://bg3.wiki/w/images/thumb/a/af/Race_Githyanki.png/100px-Race_Githyanki.png",
        speed: "9m",
        weapons: ["Shortswords", "Longswords", "Greatswords"],
        armours: ["轻甲", "中甲"],
    },
    {
        en: "Dragonborn",
        zhCN: "龙裔",
        image:
            "https://bg3.wiki/w/images/thumb/a/a6/Race_Dragonborn.png/100px-Race_Dragonborn.png",
        speed: "9m",
        subraces: [
            {
                en: "Black Dragonborn",
                zhCN: "黑龙裔",
            },
            {
                en: "Blue Dragonborn",
                zhCN: "蓝龙裔",
            },
            {
                en: "Brass Dragonborn",
                zhCN: "黄铜龙裔",
            },
            {
                en: "Bronze Dragonborn",
                zhCN: "青铜龙裔",
            },
            {
                en: "Copper Dragonborn",
                zhCN: "铜龙裔",
            },
            {
                en: "Gold Dragonborn",
                zhCN: "金龙裔",
            },
            {
                en: "Green Dragonborn",
                zhCN: "绿龙裔",
            },
            {
                en: "Red Dragonborn",
                zhCN: "红龙裔",
            },
            {
                en: "Silver Dragonborn",
                zhCN: "银龙裔",
            },
            {
                en: "White Dragonborn",
                zhCN: "白龙裔",
            },
        ],
    },
];

export const listRaces = () => races.map((iter) => Object.assign({
    "title": iter.zhCN,
    "image": iter.image,
}));

/**
 * @param {string} race
 */
export const listSubraces = (race) =>
    races.find((iter) => iter.zhCN === race)?.subraces?.map(({ zhCN }) => zhCN);
