import { listRaces } from "./rule-race.js";
import { listClasses } from "./rule-classes.js";

document.addEventListener("alpine:init", () => {
    Alpine.store("character", {
        init() {
            console.info("Character store initialized");
        },

        raceList: listRaces(),
        classList: listClasses(),

        stage: { level: 0 },
        steps: [],
        level: 0,
        race: [],
        classes: [],

        prepLevelUp() {
            if (this.level >= 12) {
                return
            }
            this.stage.level = this.level
            this.stage.level++
            this.steps = []
            if (this.stage.level === 1) {
                this.steps.push({ title: "race", finished: false })
                this.steps.push({ title: "class", finished: false })
            }
            this.steps.forEach(step => {
                if (step.title === "race") {
                    document.querySelector("#pick-race").showModal()
                }
            })
        },

        postLevelUp() {
            console.info("Level up submit")
            console.info(this.stage)
            console.info(this.steps)
            this.steps.forEach((it) => {
                if (!it.finished) {
                    if (it.title === "race") {
                        document.querySelector("#pick-race").showModal()
                    } else if (it.title === "class") {
                        document.querySelector("#pick-class").showModal()
                    }
                    return
                }
            })
            this.level = this.stage.level
            this.race = this.stage.race
        },

        reset() {
            this.level = 0
            this.race = []
            this.classes = []
        },
    });
});

Alpine.start();
