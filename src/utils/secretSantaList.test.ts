import { uniq } from "lodash";
import { User } from "../page/Layout";
import { makeFamilies, mySecretSanta } from "./secretSantaList";

const participants = [
  { NO_ID_FIELD: "5XKh19DgDHbY4O0LkHxXq12keM43", family: "Bertella / Cantù" },
  { NO_ID_FIELD: "KqDmv9pkW5TX70DMcg325m90Z3D3", family: "Bertella / Sala" },
  {
    NO_ID_FIELD: "NZ5DIQbvISffXhbZX5T9GEqbWR02",
    family: "Bertella / Martoccia",
  },
  {
    NO_ID_FIELD: "Yg3GeATdHsMf1UBlf0OZxrmvAA02",
    family: "Bertella / Cazzaniga",
  },
  {
    NO_ID_FIELD: "byI1kdaOkkg1nVkseaHGA8BhxYQ2",
    family: "Bertella / Martoccia",
  },
  { NO_ID_FIELD: "dkZf5r1lBVcENeCxbfwxfg786ku1", family: "Bertella / Mercier" },
  { NO_ID_FIELD: "k8RQA3FxbNMXPvqWgaGq2RoXIXz2", family: "Bertella / Cantù" },
  { NO_ID_FIELD: "pV73gyifDHVUH19OA3fzLWvhpVt1", family: "Bertella / Mercier" },
  {
    NO_ID_FIELD: "t4hq233XmaWBEd4TpRyK426foZJ3",
    family: "Bertella / Cazzaniga",
  },
  { NO_ID_FIELD: "xLxQMlfVkQNAzwes4IXHPwFLPsU2", family: "Bertella / Sala" },
] as User[];

const families = makeFamilies(participants);

describe("stress test", () => {
  it("should not throw in 100 attempt with 10 people and 5 families", () => {
    for (let index = 0; index < 100; index++) {
      expect(mySecretSanta(participants)).toBeDefined();
    }
  });
});

describe("Making secret santa list", () => {
  let choices = mySecretSanta(participants);
  type Choices = keyof typeof choices;
  it.each(Object.entries(choices))(
    "should create a map between ids",
    (key, uid) => {
      expect(key).toBeTruthy();
      expect(uid).toBeTruthy();
    }
  );

  it("should not duplicate entries", () => {
    expect(Object.keys(choices)).toHaveLength(10);
    expect(Object.values(choices)).toHaveLength(10);
    expect(uniq(Object.keys(choices))).toHaveLength(10);
    expect(uniq(Object.values(choices))).toHaveLength(10);
  });

  it.each(Object.entries(choices))(
    "should avoid to match people from same family to be togheter",
    (key, uid) => {
      const ownFamily = families.find((family) => family.includes(key));
      expect(ownFamily?.includes(uid)).toBeFalsy();
    }
  );

  it.each(Object.entries(choices))(
    "should avoid for any given couple to be associate to another couple",
    (key, uid) => {
      const ownFamily = families.find((family) => family.includes(key));
      const [partner] = ownFamily?.filter((u) => u !== uid) as Choices[];
      let partnerChoiceFamily = families.find((family) =>
        family.includes(partner)
      );

      expect(partnerChoiceFamily?.includes(uid)).toBeFalsy();
    }
  );
});
